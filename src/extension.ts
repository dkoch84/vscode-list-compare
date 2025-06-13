import * as vscode from 'vscode';

// Decoration types for highlighting
let matchDecorationType: vscode.TextEditorDecorationType;
let noMatchDecorationType: vscode.TextEditorDecorationType;

export function activate(context: vscode.ExtensionContext) {
    console.log('List Compare extension is now active!');

    // Create decoration types
    matchDecorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'rgba(0, 255, 0, 0.3)', // Green background for matches
        isWholeLine: true
    });

    noMatchDecorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: 'rgba(0, 0, 255, 0.3)', // Blue background for non-matches
        isWholeLine: true
    });

    // Register the compare command
    let compareDisposable = vscode.commands.registerCommand('listCompare.compare', () => {
        compareLists();
    });

    // Register the clear command
    let clearDisposable = vscode.commands.registerCommand('listCompare.clear', () => {
        clearHighlighting();
    });

    context.subscriptions.push(compareDisposable);
    context.subscriptions.push(clearDisposable);
}

function compareLists() {
    // Get all visible text editors
    const visibleEditors = vscode.window.visibleTextEditors;
    
    if (visibleEditors.length !== 2) {
        vscode.window.showErrorMessage('Please open exactly 2 files side by side to compare lists.');
        return;
    }

    const editor1 = visibleEditors[0];
    const editor2 = visibleEditors[1];

    if (!editor1.document || !editor2.document) {
        vscode.window.showErrorMessage('Unable to access document content.');
        return;
    }

    // Get the text content from both editors
    const lines1 = editor1.document.getText().split('\n');
    const lines2 = editor2.document.getText().split('\n');

    // Create sets for fast lookup
    const set1 = new Set(lines1.map(line => line.trim()).filter(line => line.length > 0));
    const set2 = new Set(lines2.map(line => line.trim()).filter(line => line.length > 0));

    // Clear existing decorations
    editor1.setDecorations(matchDecorationType, []);
    editor1.setDecorations(noMatchDecorationType, []);
    editor2.setDecorations(matchDecorationType, []);
    editor2.setDecorations(noMatchDecorationType, []);

    // Analyze and decorate editor1
    const matchRanges1: vscode.Range[] = [];
    const noMatchRanges1: vscode.Range[] = [];

    for (let i = 0; i < lines1.length; i++) {
        const line = lines1[i].trim();
        if (line.length === 0) continue; // Skip empty lines

        const range = new vscode.Range(i, 0, i, lines1[i].length);
        
        if (set2.has(line)) {
            matchRanges1.push(range);
        } else {
            noMatchRanges1.push(range);
        }
    }

    // Analyze and decorate editor2
    const matchRanges2: vscode.Range[] = [];
    const noMatchRanges2: vscode.Range[] = [];

    for (let i = 0; i < lines2.length; i++) {
        const line = lines2[i].trim();
        if (line.length === 0) continue; // Skip empty lines

        const range = new vscode.Range(i, 0, i, lines2[i].length);
        
        if (set1.has(line)) {
            matchRanges2.push(range);
        } else {
            noMatchRanges2.push(range);
        }
    }

    // Apply decorations
    editor1.setDecorations(matchDecorationType, matchRanges1);
    editor1.setDecorations(noMatchDecorationType, noMatchRanges1);
    editor2.setDecorations(matchDecorationType, matchRanges2);
    editor2.setDecorations(noMatchDecorationType, noMatchRanges2);

    // Show summary
    const matches1 = matchRanges1.length;
    const noMatches1 = noMatchRanges1.length;
    const matches2 = matchRanges2.length;
    const noMatches2 = noMatchRanges2.length;

    vscode.window.showInformationMessage(
        `Comparison complete! File 1: ${matches1} matches, ${noMatches1} unique. File 2: ${matches2} matches, ${noMatches2} unique.`
    );
}

function clearHighlighting() {
    // Get all visible text editors and clear decorations
    const visibleEditors = vscode.window.visibleTextEditors;
    
    for (const editor of visibleEditors) {
        editor.setDecorations(matchDecorationType, []);
        editor.setDecorations(noMatchDecorationType, []);
    }
    
    vscode.window.showInformationMessage('Highlighting cleared.');
}

export function deactivate() {
    // Clean up decoration types
    if (matchDecorationType) {
        matchDecorationType.dispose();
    }
    if (noMatchDecorationType) {
        noMatchDecorationType.dispose();
    }
}