# Change: Add Global Font Size Settings

## Why
用户需要在常规设置中自定义字体大小，以便根据个人偏好和显示设备调整阅读体验。当前应用缺少字体大小配置选项，只能依赖默认值和媒体查询自适应。

## What Changes
- 在 **常规设置** 中新增两项全局字体大小设置：
  1. **会话字体大小** - 控制会话消息区域的字体大小
  2. **界面字体大小** - 控制非会话区域（侧边栏、设置面板、工具栏等）的字体大小
- 使用 CSS 变量实现动态缩放，确保全局生效
- 设置持久化到本地存储，应用重启后保留

## Impact
- Affected specs: `font-settings` (新建)
- Affected code:
  - `src/components/settings/GeneralSettings.tsx` - 新增字体设置 UI
  - `src/styles/typography.css` - CSS 变量定义
  - `src/contexts/` - 可能需要新增 FontContext 或扩展现有 Context
  - `src/lib/api.ts` - 设置存储接口
