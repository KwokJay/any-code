# Tasks: Add Global Font Size Settings

## 1. 基础设施
- [x] 1.1 在 `typography.css` 中定义字体缩放 CSS 变量 (`--session-font-scale`, `--ui-font-scale`)
- [x] 1.2 创建 `FontContext.tsx` 管理字体大小状态
- [x] 1.3 在 `main.tsx` 中集成 FontProvider

## 2. 设置 UI
- [x] 2.1 在 `GeneralSettings.tsx` 中添加"会话字体大小"滑块组件
- [x] 2.2 在 `GeneralSettings.tsx` 中添加"界面字体大小"滑块组件
- [x] 2.3 添加重置按钮

## 3. 全局应用
- [x] 3.1 在 `main.tsx` 中 FontProvider 包裹主应用和会话窗口
- [x] 3.2 CSS 变量通过 document.documentElement.style 动态更新

## 4. 持久化与验证
- [x] 4.1 实现设置自动保存到 localStorage
- [x] 4.2 应用启动时加载保存的字体设置
- [x] 4.3 构建验证通过
