# vscode-list-compare
A VSCode extension that compares two lists with visual highlighting

## Overview
This extension compares two lists of data and highlights matches and differences. It's designed for comparing lists of the same type of data (like repositories, users, or any line-based data) where traditional diff tools are inappropriate because the files don't share history.

## Features
- **Line-by-line comparison**: Compares whole lines between two files
- **Visual highlighting**: 
  - Green background for matching lines
  - Blue background for non-matching/unique lines
- **Side-by-side comparison**: Works with two files open side by side in VSCode
- **Summary statistics**: Shows count of matches and unique items in each file

## Usage
1. Open two files side by side in VSCode (split editor view)
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
3. Run the command "List Compare: Compare Lists"
4. The extension will highlight:
   - **Green lines**: Items that exist in both files
   - **Blue lines**: Items that are unique to each file
5. To clear highlighting, run "List Compare: Clear Highlighting"

## Use Cases
- Compare repository lists between organizations
- Compare user lists between systems
- Compare any two lists to find similarities and differences
- Avoid writing custom bash scripts for list comparison

## Development
This extension is built with TypeScript and uses the VSCode Extension API.

### Building
```bash
npm install
npm run compile
```
