---
date: "2020-05-13T18:26:19+01:00"
title: "Git"
Summary: "Git SCM tips and tricks"
---

# Committing Partial Changes in a Changed File
(credit: https://stackoverflow.com/a/1085191)
```bash
$ git add --patch <file>
# you'll be presented with a patch and asked:
# Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]?
```
The options are:
 - `y`: add this change to staged
 - `n`: do not stage this change
 - `s`: automatically split this change into smaller changes
 - `q`: do not stage this or any remaining changes
 - `?`: print help
 
Afterwords:
 - `git diff --staged <file>` will show you the staged changes for the file
 - `git reset -p` will undo the staged changes 
