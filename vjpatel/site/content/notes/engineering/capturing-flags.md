+++
date = "2020-04-29T18:26:19+01:00"
title = "Capturing Flags"
+++

# 1. Enumerate for services

1. Get open ports.
```
nmap -F <target>
```
  * If http server `gobuster -w /usr/share/wordlists/dirb/common.txt -u http://<target>`

2. Use `searchsploit` to find known exploits.
