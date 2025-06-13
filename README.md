# vscode-list-compare
A vscode extension that compares lists

The extension should use Typescript. It should require that two files are open, in each of the 2 panes of vscode side by side). The use case for this extension is needing to compare two lists of the same type of data. An example would be to compare a list of repos from one Org to a list of repos from another Org, to find similarities and differences, similar to how diff works. Diffing is inappropriate here because the files do not have a shared history, could be wildly different.

This is an effort to avoid having to use bash scripts or other code to iterate over one list, and check for a matching line in the other list, printing or saving the results for evaluation.

This should compare whole lines. It should highlight matches green, and non-matching blue. The highlights should be applied on top of the existing files if possible, or in a new temporary editor that shows both.
