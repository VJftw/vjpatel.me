+++
date = "2020-04-29T18:26:19+01:00"
title = "Capturing Flags"
+++

# 1. Enumerate for services

1. Get open ports.
```
nmap -F <target>
```
  * If http server, find php files `gobuster -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u http://<target> -x php`

2. Use `searchsploit` to find known exploits.
