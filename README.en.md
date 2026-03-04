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

## Features

### Quick Find

No text selection required. No find dialog popup. It starts right where your cursor lands — automatically picks up the word at the cursor position, then jumps or searches instantly.

| Command | Keybinding | Description |
|---------|------------|-------------|
| Next Occurrence | `F4` | Jump to the next match in the current file |
| Prev Occurrence | `Ctrl+F4` | Jump to the previous match in the current file |
| Search Word Globally | `Ctrl+Shift+F4` | Trigger a workspace-wide search |

### Open in External Editor

Open files/folders in another version of VS Code from the Explorer context menu. Works with both local and WSL/SSH Remote workspaces.

Enable via settings:

- `explorerKit.enableExplorerOpenInCode`: defaults to `false`. When enabled, the context menu shows:
  - **Open in Code**
  - **Open in Code Insiders**

> **Known limitation**: Cross-editor launching (e.g. opening Code stable from Insiders, or vice versa) may not work under WSL Remote. This is a VS Code platform constraint — each editor only injects its own remote-cli into WSL and cannot launch other versions. Local and same-editor scenarios are unaffected.

## License

MIT License
