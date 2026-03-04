# VS Code Explorer Kit

## 项目概述

个人使用的 VS Code 扩展，会渐进式开发各种实用功能。命令 ID 统一前缀：`extension.explorerKit.*`。

## 常用命令

```bash
pnpm run compile    # 编译 TypeScript → out/
pnpm run watch      # 监听模式编译
pnpm run lint       # ESLint 检查 src/
pnpm run build      # 打包 .vsix（内部先 lint + compile）
```

Node 版本：v20（见 .nvmrc），包管理器：pnpm

## 代码规范

- ESLint Flat Config（`eslint.config.mjs`），启用 `typescript-eslint` type-checked 规则
- 强制使用 `type` 导入（`consistent-type-imports`）
- TypeScript 严格模式（`strict: true`）
- UI 消息使用中文
