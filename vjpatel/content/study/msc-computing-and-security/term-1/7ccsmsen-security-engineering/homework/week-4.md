+++
date = "2016-10-18T23:26:19+01:00"
title = "7CCSMSEN - Week 4"
+++
Q1: What should the architecture of a network application under Unix be that processes potentially hostile data?

A: The application should split into two parts:
 - one that does the sensitive work and has high privileges.
 - one that "listens" to the internet and communicates in a sanitised way to the highly privileged part.


Q2: What is a Unikernel system and why is a Unikernel preferable on a web server system (in contrast to a traditional general purpose operating system like Linux). Hint: What is the idea of a Unikernel?

A: A Unikernel runs a single program that implements the functions of a service. It is ideal for hosters, over multi-purpose operating systems, as it gives a much faster startup time and more security as the host only performs the set functions that the developer has programmed. The attack surface is much smaller.


Q3: What does the principle of least privilege say?

A: A program should only be ran with the minimal amount of permissions it needs to perform its tasks. This helps reduce the attack surface by restricting what a program's user can do.


Q4: How can you exploit the fact that every night root has a cron job that deletes the files in `/tmp`? (Hint: cron-attack).

A: `/tmp` is readable, writable and executable by anyone. If there is a cron job that performs `rm /tmp/*/*`, the shell will first expand the `*/*` to give a listing of all of the files in the `/tmp` directory and then perform `rm /tmp/file1 /tmp/file2 etc.`. An attacker could abuse this as an under-privileged user by first creating a large amount of files in the /tmp directory so the shell expansion takes a long time. They can then create a symlink from a file thats going to be removed to `/etc/passwd` while the shell expansion is running. The cron will then remove the `/etc/passwd` file which will then allow the attacker to log in as `root`.


Q5: In which of the following situations can the access control mechanism of unix file permissions be used?

    - (a) Alice wants to have her files readable, except for her office mates.
    - (b) Bob and Sam want to share some secret files.
    - (c) Root wants some of her files to be public.

A: B and C.
for a). Alice could perform `chown alice:office <files>` `chmod 0704 <files>` so that her office mates are unable to read the files but herself and everyone else are, but users can drop their group memberships.
for b). Bob and Sam could create a group just for themselves called `bobsam` and then perform `chown bob:bobsam <files>` and `chmod 0770 <files>`. Of course they need to be wary of who administers the system as the administrator could add more people to their group.
for c). Root can perform `chmod 0777 <files>`


Q6: Explain what is meant by Kerckhoffs' principle.

A: Security by obscurity is not an option and so everything about the cryptosystem should be public knowledge apart from the key.


Q7: How can a system that separates between users and root be of any help with buffer overflow attacks?

A: If an attacked service is ran as root, then the attacker will be able to run arbitrary commands as root. Running the service as a user with less privileges limits what an attacker could do.


Q8: What does it mean that program `passwd` has the `setuid` bit set? Why is this necessary?

A: The `setuid` bit tells the operating system to run the program as the owner of the program. For example, a program owned by bob, but ran by john will normally run the program as john without the setuid bit. With the setuid bit, the program will always run as bob. It is necessary for the `passwd` program to have this in order to make changes to `/etc/passwd` when a user wants to change their own password.


Q9: Under Unix (for example BSD Unix, MacOSX) the `login` program has the `setuid` bit set. Why is this needed? In Linux `login` does not have `setuid` bit set. What are the consequences of this choice?

A: The main idea here is that it is possible to reduce your security level (`root` -> `user`) but it is not possie to elevate your security level.


Q10: The variable `PATH` is a shell variable in UNIX which lists all directories that should be automatically searched for a program. For example if `PATH` contains the directory `/usr/bin` abd the program `ls` is stored there, then a user does not need to type `/usr/bin/ls`, but `ls` suffices. The question is why is it a bad idea in general, but in particular for root, to have `.` as the first entry in ones variable `PATH`?

A: Having `.` in your path would result in every program in the current directory being callable by their just their filename (i.e. `program` instead of `./program`). An attacker could place a malicious executable called `ls` in a directory that root runs programs from, that will override the `/usr/bin/ls` program that root actually wanted to use.


Q11: A Unix directory might look as follows:

```
$ ls -ld . * */*
drwxr-xr-x 1 ping staff     32768  Apr 2  2010 .
-rw----r-- 1 ping students  31359  Jul 24 2011 manual.txt
-r--rw--w- 1 bob  students  4359   Jul 24 2011 report.txt
-rwsr--r-x 1 bob  students  141359 Jun 1  2013 microedit
dr--r-xr-x 1 bob  staff     32768  Jul 23 2011 src
-rw-r--r-- 1 bob  staff     81359  Feb 28 2012 src/code.c
-r--rw---- 1 emma students  959    Jan 23 2012 src/code.h
```

with group memberships as follows:

 - Members of group staff: ping, bob, emma
 - Members of group students: emma

 The file microedit is a text editor, which allows its users to open, edit and save files. Note carefully that microedit has set its setuid flag. Fill in the access control matrix below that shows for each of the above five files, whether ping, bob, or emma are able to obtain the right to read (R) or replace (W) its contents using the editor microedit.

A:

**If we only try to R/W through microedit**:

|      | manual.txt | report.txt | microedit | src/code.c | src/code.h
|------|------------|------------|-----------|------------|------------
| ping | R-         | R-         | RWX       | --         | --
| bob  | R-         | R-         | RWX       | --         | --
| emma | --         | --         | ---       | --         | --


**If we try to R/W via `cat` or `echo`**:

|      | manual.txt | report.txt | microedit | src/code.c | src/code.h
|------|------------|------------|-----------|------------|------------
| ping | RW         | -W         | R-X       | R-         | --
| bob  | R-         | R-         | RWX       | --         | --
| emma | --         | RW         | R--       | R-         | R-




Q12: In the context of which information flow should be protected, explain briefly the differences between the read rule of the Bell-LaPadula access policy and the Biba access policy. Do the same for the write rule.

A: The Bell-LaPadula and Biba policies offer secrecy and integrity, respectively.
The Bell-LaPadula's read rule allows a user to read an object if the user has the same or a higher security level than the object; whereas Biba's read rule states that a user can only read objects that are in a the same or higher security level.
A use case for Bell-LaPadula's read rule would be in a simple military scenario where some workers won't have clearance to read `TOP SECRET` documents (no read-up). Biba's read rule is better suited for maintaining integrity where workers can only look at 'approved' documents (no read-down).
The Bell-LaPadula's write rule allows a user to write to an object only if the object's security level is at least as high as the user's. Biba's write rule states that a user can only write to objects that are in the same or lower security levels.
A use case for Bell-LaPadula's write rule would be an electronic exam system. The students would write their answers to a higher security level where the examiners can mark their work, but other students cannot read their answers (no read-up). Biba's write rule could be used for preventing students writing the exam paper questions, but allowing the examiners to write the questions. (no write-up)


Q13: (Optional) This question is for you to provide regular feedback to me, for example what were the most interesting, least interesting, or confusing parts in this lecture? Please feel free to share any other questions or concerns.

A: I am unsure about what you were expecting for the first question. With regards to linux permissions, I had assumed that a file with rwx---rwx would still be readable by the group as it allows 'everyone' to, but it was really interesting to learn that this isn't the case!
