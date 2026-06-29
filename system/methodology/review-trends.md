# Review Trends Methodology

审阅趋势用于发现单章评分看不出的长期退化。

## 追踪维度

- 最近 5 章平均分
- 最近 20 章平均分
- 低于 7 的维度重复次数
- 爽点机制重复度
- 主题漂移风险
- 支线发散风险
- 关系线越界风险
- 事实显露停滞或提前风险

## 趋势触发

- 同一评分维度连续 3 次低于 7：下一次 chapter_plan 必须修正。
- 最近 5 章综合均分下降超过 0.8：触发 stage_review_5ch。
- 最近 20 章没有闭环：触发 stage_review_20ch。
- 爽点机制连续 3 次同质：触发 plan_adjust。

## 输出位置

趋势结果写入：

- `state/current-state.md` 的质量风险
- stage review run log
- 必要时写入下一章 `serial_risks`
