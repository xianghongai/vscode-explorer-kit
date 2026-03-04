<p>
  <h1 align="center">VSCode Explorer Kit</h1>
</p>

个人用的扩展。

## Functions

- 当前编辑器中，向下查找匹配项 (不选择文本，根据光标所在位置的字符范围)
- 当前编辑器中，向上查找匹配项 (同上)
- 发起全局搜索 (同上)
- 在资源管理器右键菜单中打开文件/文件夹到 `Code` 或 `Code Insiders`（可配置开关）

## Settings

- `explorerKit.enableExplorerOpenInCode`：默认 `false`。开启后，在资源管理器右键菜单显示：
  - `Open in Code`
  - `Open in Code Insiders`

> **已知限制**：在 WSL Remote 环境下，跨编辑器打开（例如从 Insiders 打开 Code stable，或反向）可能不工作。这是 VS Code 平台限制——每个编辑器只向 WSL 注入自己的 remote-cli，无法启动其他版本。本地环境及同编辑器场景不受影响。

## Development

- `npm run lint`：使用 ESLint Flat Config (`eslint.config.mjs`) 检查 `src/`
- `npm run compile`：编译 TypeScript 到 `out/`
- `npm test`：使用 `@vscode/test-cli` 运行扩展测试
- `npm run build`：打包 `.vsix`

## License 📃

MIT License
