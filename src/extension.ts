'use strict';
import { commands, type ExtensionContext } from 'vscode';
import { findNextOccurrence, findPrevOccurrence } from './functions/findOccurrence';
import searchWordGlobally from './functions/searchWordGlobally';
import { openInCode, openInCodeInsiders } from './functions/openInExternalEditor';

export function activate({ subscriptions }: ExtensionContext) {
  const nextOccurrenceCommand = commands.registerCommand('extension.explorerKit.nextOccurrence', findNextOccurrence);
  const findPrevOccurrenceCommand = commands.registerCommand('extension.explorerKit.prevOccurrence', findPrevOccurrence);
  const searchWordGloballyCommand = commands.registerCommand('extension.explorerKit.searchWordGlobally', searchWordGlobally);
  const openInCodeCommand = commands.registerCommand('extension.explorerKit.openInCode', openInCode);
  const openInCodeInsidersCommand = commands.registerCommand('extension.explorerKit.openInCodeInsiders', openInCodeInsiders);


  subscriptions.push(
    nextOccurrenceCommand,
    findPrevOccurrenceCommand,
    searchWordGloballyCommand,
    openInCodeCommand,
    openInCodeInsidersCommand
  );
}

export function deactivate() {
  //
}
