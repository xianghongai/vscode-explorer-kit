import { FileType, window, workspace, type Uri } from 'vscode';
import { spawn } from 'child_process';

const ENABLE_SETTING_KEY = 'explorerKit.enableExplorerOpenInCode';
// 支持本地文件和 WSL/SSH remote 场景
// 已知限制：WSL Remote 下跨编辑器打开（如从 Insiders 启动 Code stable）可能失败，
// 因为每个编辑器只向 WSL 注入自己的 remote-cli，无法启动其他版本。
const SUPPORTED_SCHEMES = new Set(['file', 'vscode-remote']);

type ExternalEditor = 'code' | 'code-insiders';

function isFeatureEnabled(): boolean {
  return workspace.getConfiguration().get<boolean>(ENABLE_SETTING_KEY, false);
}

function resolveResource(resource?: Uri): Uri | undefined {
  if (resource && SUPPORTED_SCHEMES.has(resource.scheme)) {
    return resource;
  }

  const activeUri = window.activeTextEditor?.document.uri;
  if (activeUri && SUPPORTED_SCHEMES.has(activeUri.scheme)) {
    return activeUri;
  }

  return undefined;
}

async function launchEditor(
  editor: ExternalEditor,
  resource?: Uri,
): Promise<void> {
  if (!isFeatureEnabled()) {
    window.showInformationMessage('请先启用设置 explorerKit.enableExplorerOpenInCode');
    return;
  }

  const target = resolveResource(resource);
  if (!target) {
    window.showInformationMessage('请在资源管理器中选择文件或文件夹');
    return;
  }

  let args: string[];
  if (target.scheme === 'file') {
    // 本地文件直接用 fsPath
    args = ['--new-window', target.fsPath];
  } else {
    // remote URI 需要通过 --folder-uri / --file-uri 传递完整 URI 字符串
    let stat;
    try {
      stat = await workspace.fs.stat(target);
    } catch {
      window.showErrorMessage('无法访问目标资源');
      return;
    }
    const uriFlag =
      stat.type & FileType.Directory ? '--folder-uri' : '--file-uri';
    args = ['--new-window', uriFlag, target.toString()];
  }

  let child;
  try {
    child = spawn(editor, args, {
      detached: true,
      stdio: 'ignore',
      shell: process.platform === 'win32',
    });
  } catch {
    window.showErrorMessage(`启动 ${editor} 失败，请确认命令已加入 PATH`);
    return;
  }

  child.on('error', () => {
    window.showErrorMessage(`启动 ${editor} 失败，请确认命令已加入 PATH`);
  });

  child.unref();
}

export function openInCode(resource?: Uri): Promise<void> {
  return launchEditor('code', resource);
}

export function openInCodeInsiders(resource?: Uri): Promise<void> {
  return launchEditor('code-insiders', resource);
}
