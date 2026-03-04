import { window, workspace, commands } from 'vscode';
import { getTextToSearch, buildWordSeparators } from './getTextToSearch';

export default function searchWordGlobally() {
  const editor = window.activeTextEditor;

  if (!editor) {
    return;
  }

  const editorConfig = workspace.getConfiguration('editor');
  const wordSeparators = buildWordSeparators(editorConfig.get('wordSeparators', ''));
  const text = getTextToSearch(editor, wordSeparators);

  if (!text) {
    window.showInformationMessage('没有选中文本或光标位置没有有效单词');
    return;
  }

  // @see https://github.com/microsoft/vscode/blob/92df7b670ebd0799b69de298359a57287b386885/src/vs/workbench/contrib/search/browser/searchActionsFind.ts#L40
  commands.executeCommand('workbench.action.findInFiles', {
    query: text,
    triggerSearch: true,
    isRegex: false,
    isCaseSensitive: true,
    matchWholeWord: true,
  });
}
