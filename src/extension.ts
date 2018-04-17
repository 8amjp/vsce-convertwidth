'use strict';
import { window, commands, ExtensionContext, TextEditor, Range } from 'vscode';

export function activate(context: ExtensionContext) {
    // 半角英字を全角英字に変換
    commands.registerCommand('extension.convertWidthAlphabet', () => {
        if (window.activeTextEditor) {
            let editor = window.activeTextEditor;
            // Markdownとプレーンテキストの時だけ実行
            if (editor.document.languageId === "markdown" || editor.document.languageId === "plaintext") {
                convertWidth(editor, /[A-Za-z]/g);
            }
        }
    });
    // 半角数字を全角数字に変換
    commands.registerCommand('extension.convertWidthNumber', () => {
        if (window.activeTextEditor) {
            let editor = window.activeTextEditor;
            // Markdownとプレーンテキストの時だけ実行
            if (editor.document.languageId === "markdown" || editor.document.languageId === "plaintext") {
                convertWidth(editor, /[0-9]/g);
            }
        }
    });
    // 半角記号を全角記号に変換
    commands.registerCommand('extension.convertWidthSymbol', () => {
        if (window.activeTextEditor) {
            let editor = window.activeTextEditor;
            // Markdownとプレーンテキストの時だけ実行
            if (editor.document.languageId === "markdown" || editor.document.languageId === "plaintext") {
                convertWidth(editor, /[!%&+,.?]/g);
            }
        }
    });
}

// 変換
function convertWidth(editor: TextEditor, regEx:RegExp): Promise<boolean> {
    return new Promise((resolve, reject) => {
        editor.edit((editBuilder) => {
            const document = editor.document;
            const text = document.getText();
            let match;
            while (match = regEx.exec(text)) {
                editBuilder.replace(
                    new Range(document.positionAt(match.index), document.positionAt(match.index + 1)),
                    String.fromCharCode(match[0].charCodeAt(0) + 65248)
                );
            }
        }).then(success => {
            resolve();
        });
    });
}

export function deactivate() {
}