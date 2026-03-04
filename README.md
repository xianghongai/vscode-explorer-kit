<p>
  <h1 align="center">VSCode Explorer Kit</h1>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=NicholasHsiang.vscode-explorer-kit">
    <img src="https://img.shields.io/visual-studio-marketplace/v/NicholasHsiang.vscode-explorer-kit?style=flat-square&label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=NicholasHsiang.vscode-explorer-kit">
    <img src="https://img.shields.io/visual-studio-marketplace/d/NicholasHsiang.vscode-explorer-kit?style=flat-square&label=Downloads" alt="Downloads">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=NicholasHsiang.vscode-explorer-kit">
    <img src="https://img.shields.io/visual-studio-marketplace/r/NicholasHsiang.vscode-explorer-kit?style=flat-square&label=Rating" alt="Rating">
  </a>
  <a href="https://github.com/xianghongai/vscode-react-router-snippets/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/xianghongai/vscode-react-router-snippets?style=flat-square" alt="License">
  </a>
</p>

A Swiss Army knife VS Code extension. 

[English](./README.en.md)

## 功能

### 快速查找

无需先选中文本，无需弹出查找框——光标落在哪里，就从哪里开始。自动识别光标所在位置的字符范围，一键跳转或发起全局搜索。

| 命令 | 快捷键 | 说明 |
|------|--------|------|
| Next Occurrence | `F4` | 在当前文件中向下跳转到下一个匹配项 |
| Prev Occurrence | `Ctrl+F4` | 在当前文件中向上跳转到上一个匹配项 |
| Search Word Globally | `Ctrl+Shift+F4` | 直接发起全局搜索 |

### 在外部编辑器中打开

在资源管理器右键菜单中将文件/文件夹用另一个版本的 VS Code 打开。支持本地和 WSL/SSH Remote 场景。

需先启用设置项：

- `explorerKit.enableExplorerOpenInCode`：默认 `false`，开启后右键菜单显示：
  - **Open in Code**
  - **Open in Code Insiders**

> **已知限制**：WSL Remote 下跨编辑器打开（如从 Insiders 打开 Code stable，或反向）可能不工作。这是 VS Code 平台限制——每个编辑器只向 WSL 注入自己的 remote-cli，无法启动其他版本。本地环境及同编辑器场景不受影响。

## License

MIT License
