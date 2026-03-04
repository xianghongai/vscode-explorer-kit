import { Range, type Position, type TextEditor } from 'vscode';

/**
 * 自定义单词分隔符，从 editor.wordSeparators 中移除 `-` 和 `_`，加入空格
 */
export function buildWordSeparators(originalWordSeparators: string): string {
  return originalWordSeparators
    .replace(/-/g, '')
    .replace(/_/g, '') + ' ';
}

/**
 * 获取需要搜索的文本：优先返回选中文本，否则返回光标处的单词
 */
export function getTextToSearch(editor: TextEditor, wordSeparators: string): string {
  const selection = editor.selection;

  if (!selection.isEmpty) {
    return editor.document.getText(selection);
  }

  const wordRange = getWordRangeAtPosition(editor, selection.active, wordSeparators);
  if (wordRange) {
    return editor.document.getText(wordRange);
  }

  return '';
}

/**
 * 获取指定位置的单词范围，使用自定义的单词分隔符，将横线和下划线视为单词的一部分
 */
function getWordRangeAtPosition(
  editor: TextEditor,
  position: Position,
  wordSeparators: string
): Range | undefined {
  const line = editor.document.lineAt(position.line).text;
  const wordSeparatorSet = new Set(wordSeparators);

  let start = position.character;
  let end = position.character;

  // 向左扩展直到遇到分隔符，保留横线和下划线
  while (start > 0 && (
    !wordSeparatorSet.has(line[start - 1]) ||
    line[start - 1] === '-' ||
    line[start - 1] === '_'
  )) {
    start--;
  }

  // 向右扩展直到遇到分隔符，保留横线和下划线
  while (end < line.length && (
    !wordSeparatorSet.has(line[end]) ||
    line[end] === '-' ||
    line[end] === '_'
  )) {
    end++;
  }

  if (start !== end) {
    return new Range(position.line, start, position.line, end);
  }

  return undefined;
}
