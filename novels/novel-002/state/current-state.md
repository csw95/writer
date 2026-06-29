# Current State — novel-002

## 基础状态
- **novel_id**: novel-002
- **title**: 群星埋葬
- **current_chapter**: 0（未开始章节生成）
- **lifecycle_state**: STATE_1（结构已生成，等待第一章规划）
- **last_updated**: 2026-06-29（世界观和人物画像已按更新规范丰富）

## 分类定位
- **channel**: 男频
- **category**: 科幻
- **subcategory**: 星际文明 / 文明考古 / 基因进化
- **secondary_categories**: [悬疑揭密, 势力争霸]
- **tags**: [废土回收, 文明遗言, 基因解锁, 坟场考古, 收割循环, 势力争霸]

## 篇幅规划
- **tier**: ultra_long
- **target_chapter_chars**: 3200
- **target_total_chars**: 4800000
- **chapter_char_range**: 2800-3800
- **total_chapters**: 1500

## 当前 Volume
- **name**: Volume 001 — 坟场觉醒与逃亡
- **current**: 0（Volume 内尚未开始）
- **total**: 100
- **volume_goal**: Ch1-30 内部逃亡与阶段胜利 → Ch45-50 苏翎医疗线登场 → Ch60-80 瓦伦追捕线抵达 → Ch80-100 最终伪装死亡逃出锈蚀三号、进入无主星海。源质烧伤在 Ch80-100 首次出现（第三层技术遗产代价）。

## 当前 Arc
- **name**: Arc 001 — 坟场觉醒
- **current**: 0（Arc 内尚未开始）
- **total**: 30
- **arc_goal**: 黄金三章完成底层处境、坟场共鸣触发和认知遗产解锁。Ch4-30 完成基因解锁适应期、老莫牺牲、灰烬视觉稳定化（第二层基因遗产），在锈蚀三号下层建立藏匿点。Arc 末取得内部阶段胜利——全站封锁中躲藏、芯片初步解密、但尚未离开锈蚀三号。
- **arc_end_state**: 陆沉在锈蚀三号废弃下层建立第一个安全藏匿点。灰烬视觉稳定。老莫芯片第一层解密。侦测分队抵达倒计时。最终逃出锈蚀三号保留到 Volume 001 卷高潮（Ch80-100）。

## 主角状态
- **name**: 陆沉
- **power_level**: F 级（源质亲和度）— 未觉醒坟场共鸣
- **power_value**: 0（F 级基准）
- **emotion**: 压抑/麻木——日常底层生存状态
- **resources**: [回收站基础工具包, 父亲遗留的旧星图芯片]
- **relationships**:
  - { character: "老莫（莫铁山）", relation_type: "类似师徒/父辈", intimacy: 6, last_change: "无" }
  - { character: "苏翎", relation_type: "中立/未建立", intimacy: 0, last_change: "无" }
  - { character: "零（Zero）", relation_type: "未建立", intimacy: 0, last_change: "无" }
- **current_goal**: 在回收站日复一日活下去，攒够离开边缘星域的路费
- **arc_state**: Want: 离开锈蚀三号 / Need: 尚未意识到（找到值得用命守护的东西）/ Lie: "我只是底层残次品" / Wound: 父亲被遗弃而死

## 敌对势力
- { name: "锈蚀回收公司（站长卡伦）", status: "活跃", current_action: "维持回收站日常运营和理事会合同", threat_level: 3, chapter_change: "无" }
- { name: "星约理事会", status: "活跃", current_action: "监控所有限制文明的源质读数，维护收割掩盖", threat_level: 10, chapter_change: "无" }
- { name: "收割者文明", status: "潜伏", current_action: "收割循环倒计时中，未知具体行动", threat_level: 10, chapter_change: "无" }
- { name: "理事会侦测分队（分队长瓦伦）", status: "未激活", current_action: "常规巡逻边缘星域", threat_level: 7, chapter_change: "无" }

## 关键配角
- { name: "老莫（莫铁山）", profile_status: "完整画像", status: "在锈蚀三号回收站工作", location: "锈蚀三号下层工区", relation_to_protagonist: "父亲旧同事，暗中保护陆沉", fate_progress: "初始状态", chapter_change: "无" }
- { name: "苏翎", profile_status: "完整画像", status: "在锈蚀三号医疗站工作", location: "锈蚀三号医疗区", relation_to_protagonist: "尚未建立", fate_progress: "初始状态", chapter_change: "无" }
- { name: "零（Zero）", profile_status: "完整画像", status: "沉睡于灰烬文明残骸中的AI碎片", location: "群星坟场 / 禁区残骸黑晶", relation_to_protagonist: "尚未建立", fate_progress: "初始状态", chapter_change: "无" }
- { name: "分队长瓦伦", profile_status: "完整画像", status: "在边缘星域巡逻", location: "边缘星域巡逻航线", relation_to_protagonist: "尚未建立", fate_progress: "初始状态", chapter_change: "无" }

## 未解决冲突
- { description: "人类被理事会压制为限制文明", parties: ["人类文明", "星约理事会"], priority: "高", expected_resolution_chapter: 1500 }
- { description: "收割循环即将降临", parties: ["全银河文明", "收割者文明"], priority: "高", expected_resolution_chapter: 1400 }
- { description: "陆沉在回收站的底层压迫——第一阶段破局（躲入下层、全站封锁）", parties: ["陆沉", "锈蚀回收公司"], priority: "中", expected_resolution_chapter: 30 }
- { description: "陆沉在回收站的底层压迫——最终闭环（伪装死亡、逃出锈蚀三号）", parties: ["陆沉", "锈蚀回收公司", "理事会侦测分队"], priority: "高", expected_resolution_chapter: 100 }

## 剧情变量
- { name: "源质亲和度", current_value: "F", trend: "→", last_change_chapter: 0 }
- { name: "坟场共鸣", current_value: "未觉醒", trend: "→", last_change_chapter: 0 }
- { name: "基因解锁进度", current_value: "0个文明", trend: "→", last_change_chapter: 0 }
- { name: "收割循环意识", current_value: "完全无知", trend: "→", last_change_chapter: 0 }
- { name: "势力规模", current_value: "单人", trend: "→", last_change_chapter: 0 }
- { name: "理事会威胁感知", current_value: "0（未被注意）", trend: "→", last_change_chapter: 0 }

## 下一章目标
- **next_chapter_goal**: 在四十分钟氧气时限的禁区回收任务中，于三万年未知文明残骸内部触碰黑晶，触发坟场共鸣。
- **next_chapter_hook**: （无——第一章，自行建立悬念）
- **next_chapter_genre_promise**: 科幻底层处境建立 + 源质世界观的首次冲突性显露 + 坟场共鸣的悬念启动

## 初始化完成检查
- [x] premise 已完成一句话卖点、分类定位、类型承诺、黄金三章
- [x] premise 已声明 channel / category / subcategory / tags，且符合 novel-categories.md
- [x] premise 已声明 length_tier、目标章数、单章字数范围、目标总字数
- [x] 目标总字数与目标章数 × 单章正文字数的偏差不超过 10%（1500×3200=4800000，偏差0%）
- [x] world 已定义基础规则、源质体系、资源体系、社会结构、势力体系、关键地点、历史背景、代价体系和禁止事项
- [x] world 已定义开篇显露策略，第一章通过冲突、压迫、选择、代价、异常逐步显露
- [x] characters 已定义主角 Want/Need/Lie/Wound
- [x] long-term-arc 已拆出三幕、Part分段、阶段目标和全书分类服务点
- [x] length_tier = ultra_long，long-term-arc 已拆出 4 个 Part 级大阶段
- [x] volume-001 已定义分类服务点、压力阶梯、升级轴和伏笔计划
- [x] arc-001 已按篇幅档位规划第一阶段 30 章，并定义分类服务点
- [x] state 指向第 1 章目标
- [x] open_loops 使用标准台账格式（含 LOOP ID 和 Fact ID 绑定）
- [x] 开篇设定评估（2026-06-29）完成并执行修订
- [x] 时间轴统一为 Volume 001 Ch1-100：Ch30 阶段胜利 → Ch80-100 最终逃出
- [x] 灰烬遗言三层解锁节奏已锁定（世界规则→premise→arc→事实库统一）
- [x] 黄金三章降颗粒度——Ch3 不再包含伪装死亡、逃脱者后裔完整揭示、标记改写装置
- [x] 源质烧伤首次出现时间从 Ch29-30 后移至 Ch80-100

---
*初始化于 2026-06-29 / STATE_1*
*修订于 2026-06-29 — 按开篇设定评估结果执行时间轴、解锁规则、黄金三章、LOOP ID 四项修订*
