---
date: "2016-12-03T01:35:19+00:00"
course: "MSc Computing and Security"
module: "7CCSMSEN Security Engineering"
title: "Homework 9"
---

Q1: We have seen during the lectures that automated vulnerability scans and penetration testing are similar activities but with significant differences. What are the similarities and what are the differences between them?

A: Both *vulnerability scanning* and *penetration testing* can be used to aid in determining the security of a system. However, whilst *vulnerability scanning* is quicker, it only checks for known vulnerabilities that is associated with software that is used and may have false positives. *Penetration testing* will simulate an attack and will likely find vulnerabilities that scanning will not. A *Penetration test* may include a vulnerability scan.


Q2: What are the differences between hacking, ethical hacking, and penetration testing?

A:
 - **Hacking**: Is breaking into a system without permission from the owners and usually fuelled with malicious intent (usually to steal information).
 - **Ethical Hacking**: Is breaking into a system with permission and therefore without malicious intent.
 - **Penetration Testing**: Is a methodical form of ethical hacking where a report is produced at the end.


Q3: What is footprinting / reconnaissance and what is it used for?

A: Is the process of gathering *Open Sourced* information about an organisation that anyone can obtain without the organisation knowing. e.g. IP address ranges, Operating systems, Employee information (from LinkedIn) etc. We use this information to scan and enumerate hosts, users. We could search for vulnerabilities using this information, e.g. vulnerable MySQL versions.


Q4: A friend of yours tells you that he has seen recent news about cyber-attacks and is very concerned about the local network they use in his bed-and-breakfast. He asks you whether you could make him the favour of looking at how easy it would be to hack into his network.

- a). Would you consider this to be ethical hacking or not?
- b). Would this be a penetration test? If so, explain why. Otherwise, explain how you could it make it a penetration test.

A:

- a). Assuming he owns the bed-and-breakfast, he should provide written and signed consent to allow you to do this. I think it will also be better to clearly define a scope about what you will do and tell him before hand so he can warn his customers. I would consider this ethical hacking if the above is followed.
- b). For this to be a penetration test, I would need to simulate an attack on the network and provide a final report detailing the vulnerabilities and counter-measures I have found.


Q5: What information about employees of a target organisation is important when it comes to a penetration test? Name at least 2 types of information and why they are important/useful.

A:

1. Their role within the organisation. This lets me know whom I should attempt to escalate my privileges to.
2. Their name, organisation email, username. Organisation password policy might encourage the use of derived passwords (e.g. first name of your child etc.).


Q6: In the context of a penetration test, what is scanning and why is it important?

A: Scanning reveals active hosts and services in the organisation's network. This can be illegal if you haven't obtained permission to do so. Scanning is important as it allows to find which hosts/services to enumerate and we could use automated vulnerability scanning to find known exploits of the services.
