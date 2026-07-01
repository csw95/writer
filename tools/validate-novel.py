#!/usr/bin/env python3
"""Lightweight validator for the multi-novel writing system.

This tool checks the structural issues that are easy to miss in long-running
automation:
- chapter_plan required sections
- review scoring dimensions and narrative gates
- chapter body publishing hygiene
- state run-control, Part fields, and archive pressure
- Fact/Item/Loop cross references
- scoring weight drift between scoring.schema.md and review-rubric.md
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Optional


ROOT = Path(__file__).resolve().parents[1]
STATE_SIZE_LIMIT = 80 * 1024
SUMMARY_ACTIVE_WINDOW_LIMIT = 20
CAUSAL_ACTIVE_WINDOW_LIMIT = 10

SCORING_DIMS = [
    "conflict_strength",
    "pacing_speed",
    "satisfaction_level",
    "hook_strength",
    "genre_promise",
    "logic_consistency",
    "world_fidelity",
    "character_consistency",
    "setup_payoff",
    "causal_chain",
    "continuity_control",
    "power_resource_consistency",
    "novelty",
]

NARRATIVE_DIMS = [
    "scene_texture",
    "action_clarity",
    "prose_vividness",
    "pov_embodiment",
]

PLAN_SECTIONS = [
    "chapter_id",
    "volume_arc_position",
    "classification",
    "length_plan",
    "goal",
    "pre_write_state_check",
    "genre_promise",
    "emotional_curve",
    "conflict",
    "escalation",
    "antagonist_action_plan",
    "power_resource_plan",
    "time_location_continuity",
    "crisis_choice",
    "relationship_line_plan",
    "canon_fact_plan",
    "key_item_plan",
    "scenes",
    "must_have_events",
    "爽点机制",
    "ending_hook",
    "涉及角色",
    "伏笔操作",
    "剧情变量推进",
    "downstream_impact",
    "连载风险检查",
]

STATE_MARKERS = [
    "## 运行控制",
    "next_chapter_to_generate",
    "last_completed_chapter",
    "last_run_status",
    "last_run_completed_state",
    "pending_action",
    "run_lock.status",
    "recovery_note",
    "## State 归档索引",
    "## Active Context 状态",
    "## 最近章节摘要",
    "## 时间线与地点",
    "## 人物位置",
    "## 主角状态",
    "## 战力 / 能力 / 资源台账",
    "## 关键物品状态",
    "## 敌对势力状态",
    "## 关系线状态",
    "## 关键事实显露状态",
    "## 场景因果链记录",
    "## 节奏与质量风险",
    "## 审阅趋势",
    "## 子情节状态",
    "## 错误修复台账",
]

BODY_FORBIDDEN_PATTERNS = [
    ("chapter shorthand", r"\bCh\d+\b"),
    ("chapter label", r"\bChapter\s+\d+\b"),
    ("scene label", r"\bScene\s+\d+\b"),
    ("Fact ID", r"\bFACT-\d{3}\b"),
    ("Item ID", r"\bITEM-\d{3}\b"),
    ("Loop ID", r"\bLOOP-\d{3}\b"),
    ("Relationship ID", r"\bREL-[A-Z0-9-]+-\d{3}\b"),
    ("state label", r"\bSTATE(?:[_\s-]?\d+|_[A-Z0-9_]+)\b"),
    ("chapter_plan field", r"\bchapter_plan\b"),
    ("canon_fact_plan field", r"\bcanon_fact_plan\b"),
    ("key_item_plan field", r"\bkey_item_plan\b"),
    ("relationship_line_plan field", r"\brelationship_line_plan\b"),
    ("must_have_events field", r"\bmust_have_events\b"),
    ("pending_action field", r"\bpending_action\b"),
    ("run_lock field", r"\brun_lock\b"),
    ("novel_id field", r"\bnovel_id\b"),
    ("Planner AI role", r"\bPlanner\s+AI\b"),
    ("Writer AI role", r"\bWriter\s+AI\b"),
    ("Reviewer AI role", r"\bReviewer\s+AI\b"),
    ("State Manager AI role", r"\bState\s+Manager\s+AI\b"),
]


@dataclass
class Result:
    errors: list[str]
    warnings: list[str]

    def error(self, message: str) -> None:
        self.errors.append(message)

    def warn(self, message: str) -> None:
        self.warnings.append(message)


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def section_present(text: str, name: str) -> bool:
    return re.search(rf"^##+\s+.*{re.escape(name)}", text, re.M) is not None


def extract_weights(path: Path) -> dict[str, str]:
    weights: dict[str, str] = {}
    if not path.exists():
        return weights
    for line in read(path).splitlines():
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if len(cells) < 2:
            continue
        dim = cells[0]
        if not re.fullmatch(r"[a-z_]+", dim):
            continue
        for cell in cells[1:]:
            if re.fullmatch(r"[0-9]+%", cell):
                weights[dim] = cell
                break
    return weights


def validate_scoring_consistency(result: Result) -> None:
    schema = ROOT / "system/schemas/scoring.schema.md"
    rubric = ROOT / "system/methodology/review-rubric.md"
    schema_weights = extract_weights(schema)
    rubric_weights = extract_weights(rubric)

    for dim in SCORING_DIMS:
        if dim not in schema_weights:
            result.error(f"scoring.schema.md missing weight for {dim}")
            continue
        if dim not in rubric_weights:
            result.error(f"review-rubric.md missing weight for {dim}")
            continue
        if schema_weights[dim] != rubric_weights[dim]:
            result.error(
                f"weight drift for {dim}: scoring.schema={schema_weights[dim]}, "
                f"review-rubric={rubric_weights[dim]}"
            )


def validate_plan(novel_dir: Path, chapter: int, result: Result) -> None:
    plan = novel_dir / f"structure/chapter-plans/ch-{chapter:03d}.md"
    if not plan.exists():
        result.error(f"missing chapter plan: {plan}")
        return
    text = read(plan)
    for section in PLAN_SECTIONS:
        if not section_present(text, section):
            result.error(f"chapter plan missing section: {section}")

    if "FACT-" in text and not section_present(text, "canon_fact_plan"):
        result.error("chapter plan references FACT-* but lacks canon_fact_plan")
    if "ITEM-" in text and not section_present(text, "key_item_plan"):
        result.error("chapter plan references ITEM-* but lacks key_item_plan")
    if "REL-" in text and not section_present(text, "relationship_line_plan"):
        result.error("chapter plan references REL-* but lacks relationship_line_plan")


def validate_review(novel_dir: Path, chapter: int, result: Result) -> None:
    review = novel_dir / f"chapters/ch-{chapter:03d}-review.md"
    if not review.exists():
        result.error(f"missing chapter review: {review}")
        return
    text = read(review)
    for dim in SCORING_DIMS:
        if not re.search(rf"\|\s*{re.escape(dim)}\s*\|", text):
            result.error(f"review missing scoring dimension: {dim}")
    for dim in NARRATIVE_DIMS:
        if not re.search(rf"\|\s*{re.escape(dim)}\s*\|", text):
            result.error(f"review missing narrative gate: {dim}")


def body_span(text: str) -> Optional[tuple[int, int]]:
    match = re.search(r"^##\s+正文\s*$\n([\s\S]*?)(?=^---\s*$)", text, re.M)
    if not match:
        return None
    return match.start(1), match.end(1)


def validate_chapter_body(novel_dir: Path, chapter: int, result: Result) -> None:
    chapter_path = novel_dir / f"chapters/ch-{chapter:03d}.md"
    if not chapter_path.exists():
        result.error(f"missing chapter file: {chapter_path}")
        return

    text = read(chapter_path)
    span = body_span(text)
    if span is None:
        result.error(f"chapter missing body publishing section before ---: {chapter_path}")
        return

    start, end = span
    body = text[start:end]
    for label, pattern in BODY_FORBIDDEN_PATTERNS:
        for match in re.finditer(pattern, body):
            absolute = start + match.start()
            line_no = text.count("\n", 0, absolute) + 1
            line = text.splitlines()[line_no - 1].strip()
            result.error(
                f"chapter body leaks internal marker ({label}) at line {line_no}: "
                f"{match.group(0)} :: {line[:140]}"
            )


def section_block(text: str, title: str) -> str:
    pattern = rf"^##\s+{re.escape(title)}.*?$([\s\S]*?)(?=^##\s+|\Z)"
    match = re.search(pattern, text, re.M)
    return match.group(1) if match else ""


def count_table_rows(block: str) -> int:
    rows = 0
    for line in block.splitlines():
        stripped = line.strip()
        if not stripped.startswith("|"):
            continue
        if "---" in stripped or "章节" in stripped or "场景" in stripped:
            continue
        rows += 1
    return rows


def validate_state(novel_dir: Path, result: Result) -> None:
    state = novel_dir / "state/current-state.md"
    if not state.exists():
        result.error(f"missing state file: {state}")
        return
    text = read(state)
    for marker in STATE_MARKERS:
        if marker not in text:
            result.error(f"state missing marker: {marker}")

    if "篇幅档位**: ultra_long" in text or "length_tier: ultra_long" in text:
        for marker in ["当前 Part", "Part 进度"]:
            if marker not in text:
                result.error(f"ultra_long state missing {marker}")

    if state.stat().st_size > STATE_SIZE_LIMIT:
        result.error(
            f"state exceeds {STATE_SIZE_LIMIT} bytes; set pending_action: state_archive"
        )

    recent_rows = count_table_rows(section_block(text, "最近章节摘要"))
    causal_rows = count_table_rows(section_block(text, "场景因果链记录"))
    if recent_rows > SUMMARY_ACTIVE_WINDOW_LIMIT:
        result.error(
            f"recent_chapter_summaries has {recent_rows} rows; archive older rows"
        )
    if causal_rows > CAUSAL_ACTIVE_WINDOW_LIMIT:
        result.error(f"scene_causal_chains has {causal_rows} rows; archive older rows")


def defined_ids(text: str, prefix: str) -> set[str]:
    return set(re.findall(rf"\b{prefix}-\d{{3}}\b", text))


def validate_fact_item_loop_refs(novel_dir: Path, result: Result) -> None:
    facts_path = novel_dir / "canon/facts.md"
    items_path = novel_dir / "canon/items.md"
    loops_path = novel_dir / "open-loops/loops.md"
    if not facts_path.exists() or not items_path.exists() or not loops_path.exists():
        result.warn("skip Fact/Item/Loop cross-reference check; canon/items/loops file missing")
        return

    facts_text = read(facts_path)
    items_text = read(items_path)
    loops_text = read(loops_path)
    fact_defs = defined_ids(facts_text, "FACT")
    item_defs = defined_ids(items_text, "ITEM")
    loop_defs = defined_ids(loops_text, "LOOP")

    fact_refs_in_loops = defined_ids(loops_text, "FACT")
    item_refs_in_loops = defined_ids(loops_text, "ITEM")
    loop_refs_in_facts = defined_ids(facts_text, "LOOP")
    item_refs_in_facts = defined_ids(facts_text, "ITEM")
    fact_refs_in_items = defined_ids(items_text, "FACT")
    loop_refs_in_items = defined_ids(items_text, "LOOP")

    for fact_id in sorted(fact_refs_in_loops - fact_defs):
        result.error(f"open-loops references undefined {fact_id}")
    for item_id in sorted(item_refs_in_loops - item_defs):
        result.error(f"open-loops references undefined {item_id}")
    for loop_id in sorted(loop_refs_in_facts - loop_defs):
        result.error(f"canon/facts references undefined {loop_id}")
    for item_id in sorted(item_refs_in_facts - item_defs):
        result.error(f"canon/facts references undefined {item_id}")
    for fact_id in sorted(fact_refs_in_items - fact_defs):
        result.error(f"canon/items references undefined {fact_id}")
    for loop_id in sorted(loop_refs_in_items - loop_defs):
        result.error(f"canon/items references undefined {loop_id}")


def validate_active_context(novel_dir: Path, result: Result) -> None:
    cast_active = novel_dir / "characters/cast-active.md"
    facts_active = novel_dir / "canon/facts-active.md"
    items_active = novel_dir / "canon/items-active.md"
    if not cast_active.exists():
        result.error(f"missing active cast file: {cast_active}")
    if not facts_active.exists():
        result.error(f"missing active facts file: {facts_active}")
    if not items_active.exists():
        result.error(f"missing active items file: {items_active}")


def validate_schema_files(result: Result) -> None:
    required = [
        ROOT / "system/schemas/open-loops.schema.md",
        ROOT / "system/schemas/item.schema.md",
        ROOT / "system/methodology/items.md",
        ROOT / "system/templates/active-context-refresh.md",
    ]
    for path in required:
        if not path.exists():
            result.error(f"missing system file: {path}")


def validate_part_file(novel_dir: Path, result: Result) -> None:
    state = novel_dir / "state/current-state.md"
    if not state.exists():
        return
    text = read(state)
    if "篇幅档位**: ultra_long" not in text and "length_tier: ultra_long" not in text:
        return
    parts_dir = novel_dir / "structure/parts"
    if not parts_dir.exists() or not list(parts_dir.glob("part-*.md")):
        result.error("ultra_long novel missing structure/parts/part-*.md")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("novel_id", nargs="?", help="novel id under novels/")
    parser.add_argument("--chapter", type=int, help="chapter number to validate")
    args = parser.parse_args()

    result = Result(errors=[], warnings=[])
    validate_scoring_consistency(result)
    validate_schema_files(result)

    if args.novel_id:
        novel_dir = ROOT / "novels" / args.novel_id
        if not novel_dir.exists():
            result.error(f"novel not found: {novel_dir}")
        else:
            validate_state(novel_dir, result)
            validate_active_context(novel_dir, result)
            validate_part_file(novel_dir, result)
            validate_fact_item_loop_refs(novel_dir, result)
            if args.chapter is not None:
                validate_plan(novel_dir, args.chapter, result)
                validate_chapter_body(novel_dir, args.chapter, result)
                validate_review(novel_dir, args.chapter, result)

    for warning in result.warnings:
        print(f"WARN: {warning}")
    for error in result.errors:
        print(f"ERROR: {error}")

    if result.errors:
        print(f"FAILED: {len(result.errors)} error(s), {len(result.warnings)} warning(s)")
        return 1
    print(f"OK: 0 errors, {len(result.warnings)} warning(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
