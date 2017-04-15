+++
date = "2017-01-30T14:26:19+01:00"
title = "7CCSMMNSE - Lab 1"
markup = "mmark"
+++

## 1

a.
```
date
```

b.
```
man head
man tail
man touch
```

c.

- `head`: outputs the start of a file. `-n` is the number of lines to output.
- `tail`: outputs the end of a file. `-n` is the number of lines to output.
- `touch`: creates a blank new file.
- `more`: a filter for paging through text one screenfull at a time.
- `less`: similar to `more` but allows for backwards paging as well as additional enhancements.
- `man`: provides paging through program manuals.

d.

```
head -n3 /etc/passwd
tail -n5 /etc/passwd
```

e.

```
cd ~
ls
touch file.txt
ls
```

**Yes**

## 2

a. We do not see our own KCL usernames in the list because we are not local-users.

b.
```
cut -d: -f7 /etc/passwd
```

c.
```
cut -d: -f7 /etc/passwd | uniq
```

d.
```
cut -d: -f7 /etc/passwd | sort | uniq
```

ef.
```
ls /etc/password 1>~/logfile
```
 - `~/logfile` is empty.

```
ls /etc/passwd 1>~/logfile
```
 - `~/logfile` contains
 ```
 /etc/passwd
 ```

g1.

```
ls /etc/password 2>/dev/null || echo "Sorry, could not find file"
```

g2.

```
ls /etc/passwd && cut -d: -f7 /etc/passwd | sort | uniq
```


g3.
```
#!/bin/bash

if [ -a $1 ]; then
  cat $1
else
  echo "sorry, cant find file"
fi
```
