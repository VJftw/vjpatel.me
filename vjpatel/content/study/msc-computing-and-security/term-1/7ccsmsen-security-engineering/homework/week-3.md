+++
date = "2016-10-18T23:26:19+01:00"
title = "7CCSMSEN - Week 3"
+++
Q1: How does a buffer-overflow attack work? (Hint: What happens on the stack.)

A: An adversary abuses the size/length of allocated memory for an input string. For example, an input of 40 characters could be set to a variable that only has room for 20 characters, resulting in a buffer-overflow where lower addresses are overwritten.


Q2: Why is it crucial for a buffer-overflow attack that the stack grows from higher addresses to lower ones?

A: When the buffer overflows, it will overwrite higher addresses (lower down in the stack) which allows the adversary to modify what the program does next. e.g. execute code, dead functions etc.


Q3: What does it mean for the stack to be executable and why is is this important for a buffer-overflow attack?

A: If the stack is executable, an adversary is able to place references to other functions or programs in the stack. e.g. a function name or even '/bin/sh' will launch a shell.


Q4: If the attacker uses a buffer-overflow attack in order to inject code, why can this code not contain any zero bytes?

A: The C language assumes that all strings are terminated by a zero byte. The attacker should avoid these when they inject code to prevent only part of the code being executed.


Q5: How does a stack canary help with preventing a buffer-overflow attack?

A: A stack canary is a random number pushed just before local data is stored. If this random number is not intact when the function finishes, then a buffer-overflow has occurred.


Q6: Why does randomising the addresses from where programs are run help defending against buffer-overflow attacks?

A: If an attacker is able to obtain a copy of the program, they would be able to run it locally and find out which addresses are used. Randomising the addresses stops an attacker from being able to do this.


Q7: What is a format string attack?

A: This attack takes advantage of the string formatting feature of C. If we pass a "%s" to the string formatter, it will read variables from the stack when generating the final string.


Q8: Assume format string attacks allow you to read out the stack. What can you do with this information? (Hint: Consider what is stored in the stack.)

A: There might be encryption keys that are used in the application, memory addresses for different functions which can be useful for performing buffer-overflow attacks.


Q9: Assume you can crash a program remotely. Why is this a problem?

A: Being able to crash a program remotely can be one of the methods in a Denial of Service (DoS) attack. Take Friday 21st October's DoS attack from IoT devices on DynDNS's name servers. Their services were flooded and many third party services that relied on their DNS systems were affected. If a program crashes, it may also reveal some sensitive information in it's crash report/debugging.


10: How can the choice of a programming language help with buffer-overflow attacks? (Hint: Why are C-programs prone to such attacks, but not Java programs.)

A: The Java compiler performs some checks to help alleviate this and an exception is thrown when something unexpected happens.


11: When filling the buffer that is attacked with a payload (starting a shell), what is the purpose of padding the string at the beginning with NOP-instructions.

A: It increases the vulnerable address space so that an attacker doesn't need to find one specific address to refer to. The collection of NOP-instructions act as a slide to the final instruction that might start a shell.


12: (Optional) This question is for you to provide regular feedback to me, for example what were the most interesting, least interesting, or confusing parts in this lecture? Please feel free to share any other questions or concerns.

A: It was really interesting to see the ways in which an attacker can make their lives easier. e.g. the NOP slide.
