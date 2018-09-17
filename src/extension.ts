'use strict';
import { window, commands, ExtensionContext, TextEditor, Range } from 'vscode';

export function activate(context: ExtensionContext) {
    // 半角英字を全角英字に変換
    commands.registerCommand('extension.widenAlphabet', () => {
        if (window.activeTextEditor) {
            offsetCharCode(window.activeTextEditor, /[A-Za-z&,.]/g, 65248);
        }
    });
    // 全角英字を半角英字に変換
    commands.registerCommand('extension.narrowAlphabet', () => {
        if (window.activeTextEditor) {
            offsetCharCode(window.activeTextEditor, /[Ａ-Ｚａ-ｚ＆，．]/g, -65248);
        }
    });

    // 半角数字を全角数字に変換
    commands.registerCommand('extension.widenNumber', () => {
        if (window.activeTextEditor) {
            offsetCharCode(window.activeTextEditor, /[0-9]/g, 65248);
        }
    });
    // 全角数字を半角数字に変換
    commands.registerCommand('extension.narrowNumber', () => {
        if (window.activeTextEditor) {
            offsetCharCode(window.activeTextEditor, /[０-９]/g, -65248);
        }
    });

    // 半角記号を全角記号に変換
    commands.registerCommand('extension.widenPunctuation', () => {
        if (window.activeTextEditor) {
            offsetCharCode(window.activeTextEditor, /[!?]/g, 65248);
        }
    });
    // 全角記号を半角記号に変換
    commands.registerCommand('extension.narrowPunctuation', () => {
        if (window.activeTextEditor) {
            offsetCharCode(window.activeTextEditor, /[！？]/g, -65248);
        }
    });
}

// 文字単位の変換
function offsetCharCode(editor: TextEditor, regEx:RegExp, offset:number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        editor.edit((editBuilder) => {
            const document = editor.document;
            const text = document.getText();
            let match;
            while (match = regEx.exec(text)) {
                editBuilder.replace(
                    new Range(document.positionAt(match.index), document.positionAt(match.index + 1)),
                    String.fromCharCode(match[0].charCodeAt(0) + offset)
                );
            }
        }).then(success => {
            resolve();
        });
    });
}

export function deactivate() {
}