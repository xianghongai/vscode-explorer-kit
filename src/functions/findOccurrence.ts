import { Range, Selection, TextEditorRevealType, window, workspace } from 'vscode';
import { kebabCase, camelCase, upperFirst } from 'lodash';
import { getTextToSearch, buildWordSeparators } from './getTextToSearch';

/** 全字匹配的零宽断言 */
const WORD_BOUNDARY_BEFORE = '(?<![\\w-])';
const WORD_BOUNDARY_AFTER = '(?![\\w-])';

/**
 * 查找下一个匹配项并跳转
 */
export function findNextOccurrence() {
  findOccurrence('next');
}

/**
 * 查找上一个匹配项并跳转
 */
export function findPrevOccurrence() {
  findOccurrence('prev');
}

/**
 * 查找匹配项并跳转的通用函数
 */
function findOccurrence(direction: 'next' | 'prev') {
  const editor = window.activeTextEditor;
  if (!editor) {
    window.showInformationMessage('没有打开的编辑器');
    return;
  }

  const editorConfig = workspace.getConfiguration('editor');
  const wordSeparators = buildWordSeparators(editorConfig.get('wordSeparators', ''));

  const selectedText = getTextToSearch(editor, wordSeparators);
  if (!selectedText) {
    window.showInformationMessage('没有选中文本或光标位置没有有效单词');
    return;
  }

  const document = editor.document;
  const text = document.getText();
  const currentPosition = direction === 'next' ? editor.selection.end : editor.selection.start;
  const currentOffset = document.offsetAt(currentPosition);

  // 构造候选搜索词：原词 + 命名风格转换
  const candidates = buildCandidates(selectedText);

  let matchOffset: number;
  if (direction === 'next') {
    matchOffset = findFirstMatch(candidates, (word) => findNext(text, word, currentOffset));
    // wrap around: 从头开始找
    if (matchOffset === -1) {
      matchOffset = findFirstMatch(candidates, (word) => findNext(text, word, -1));
    }
  } else {
    matchOffset = findFirstMatch(candidates, (word) => findPrev(text, word, currentOffset));
    // wrap around: 从尾部开始找
    if (matchOffset === -1) {
      matchOffset = findFirstMatch(candidates, (word) => findPrev(text, word, text.length));
    }
  }

  if (matchOffset === -1) {
    window.showInformationMessage(
      `没有找到 "${selectedText}" 的${direction === 'next' ? '下' : '上'}一个匹配项`
    );
    return;
  }

  const matchPosition = document.positionAt(matchOffset);
  const newSelection = new Selection(matchPosition, matchPosition);

  editor.selection = newSelection;
  editor.revealRange(
    new Range(matchPosition, matchPosition),
    TextEditorRevealType.InCenter
  );
}

/**
 * 构造候选搜索词列表：原词优先，然后是命名风格转换后的词
 */
function buildCandidates(word: string): string[] {
  const candidates = [word];

  if (isPascalCase(word)) {
    candidates.push(kebabCase(word));
  } else if (isKebabCase(word)) {
    candidates.push(toPascalCase(word));
  }

  return candidates;
}

/**
 * 依次尝试候选词，返回第一个找到的 offset
 */
function findFirstMatch(candidates: string[], search: (word: string) => number): number {
  for (const word of candidates) {
    const offset = search(word);
    if (offset !== -1) {
      return offset;
    }
  }
  return -1;
}

/**
 * 从 startOffset 之后查找下一个匹配
 */
function findNext(text: string, searchText: string, startOffset: number): number {
  const searchTarget = text.slice(startOffset + 1);
  const pattern = `${WORD_BOUNDARY_BEFORE}${escapeRegExp(searchText)}${WORD_BOUNDARY_AFTER}`;
  const regex = new RegExp(pattern, 'g');

  const match = regex.exec(searchTarget);
  if (match) {
    return startOffset + 1 + match.index;
  }
  return -1;
}

/**
 * 从 startOffset 之前查找上一个匹配
 */
function findPrev(text: string, searchText: string, startOffset: number): number {
  const searchTarget = text.slice(0, startOffset);
  const pattern = `${WORD_BOUNDARY_BEFORE}${escapeRegExp(searchText)}${WORD_BOUNDARY_AFTER}`;
  const regex = new RegExp(pattern, 'g');

  let lastMatch = -1;
  let match;
  while ((match = regex.exec(searchTarget)) !== null) {
    lastMatch = match.index;
  }

  return lastMatch;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isKebabCase(input: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(input);
}

function isPascalCase(input: string): boolean {
  return /^[A-Z][a-zA-Z0-9]*$/.test(input);
}

function toPascalCase(input: string): string {
  return upperFirst(camelCase(input));
}
