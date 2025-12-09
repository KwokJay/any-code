## ADDED Requirements

### Requirement: Session Font Size Setting
用户 MUST 能够在常规设置中调整会话区域的字体大小，范围为 75% 到 150%，默认值为 100%。

#### Scenario: 用户调整会话字体大小
- **WHEN** 用户在常规设置中拖动"会话字体大小"滑块
- **THEN** 会话消息区域的字体大小实时变化
- **AND** 设置自动保存

#### Scenario: 会话字体大小全局生效
- **WHEN** 用户设置会话字体大小为 125%
- **THEN** 所有会话标签页的消息区域都应用该字体大小
- **AND** 新建会话也使用该字体大小

---

### Requirement: UI Font Size Setting
用户 MUST 能够在常规设置中调整非会话区域（侧边栏、工具栏、设置面板等）的字体大小，范围为 75% 到 150%，默认值为 100%。

#### Scenario: 用户调整界面字体大小
- **WHEN** 用户在常规设置中拖动"界面字体大小"滑块
- **THEN** 侧边栏、工具栏、设置面板等非会话区域的字体大小实时变化
- **AND** 设置自动保存

#### Scenario: 界面字体大小不影响会话区域
- **WHEN** 用户只调整界面字体大小
- **THEN** 会话消息区域的字体大小不受影响

---

### Requirement: Font Size Persistence
字体大小设置 MUST 持久化存储，应用重启后保留用户设置。

#### Scenario: 应用重启后恢复字体设置
- **WHEN** 用户关闭并重新打开应用
- **THEN** 之前设置的字体大小自动恢复

---

### Requirement: Font Size Reset
用户 MUST 能够一键重置字体大小到默认值（100%）。

#### Scenario: 用户重置字体大小
- **WHEN** 用户点击"重置"按钮
- **THEN** 会话字体大小和界面字体大小都恢复为 100%
