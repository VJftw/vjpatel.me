---
date: "2016-11-19T01:35:19+00:00"
course: "MSc Computing and Security"
module: "7CCSMSEN Security Engineering"
title: "Homework 8"
---

Q1: How can the hardness of the proof-of-work puzzles in Bitcoins be adjusted? What is the parameter that determines how the hardness is adjusted?

A: The 'target' parameter is adjusted so that on average a puzzle is completed within 10 minutes on the Bitcoin network.


Q2: What is the main data that is stored in Bitcoin's blockchain?

A: The transactions in the block, and a hash of the previous block.


Q3: What is the purpose of the proof-of-work puzzle in Bitcoins?

A: As Bitcoin uses a distributed database where peer nodes vote on a new valid block, it would be easy for an attacker to create mischevious blocks by launching arbitrary peer nodes to vote. The proof-of-work puzzles are currently considered very hard and resource heavy problems, which is good as they prevent and deter attackers from creating misleading blocks.


Q4: The department has large labs full of computers that are pretty much idle over night. Why is it a bad idea to let them mine for Bitcoins?

A: Mining Bitcoins today has now become more competitive and is only really profitable if your electricity/energy is free. A professor was also banned for mining bitcoins too!


Q5: Is it possible that Bitcoins can get lost (be irretrievable)?

A: Yes. As Bitcoins are attached to a public-key at any given time; loss of the private-key means that no-one can re-use those bitcoins in future transactions. There is no governing body that can restore these for you.


Q6: This question is for you to provide regular feedback to me, for example what were the most interesting, least interesting, or confusing parts in this lecture? Is there anything you like to have explained in the handouts? Please feel free to share any other questions or concerns.

A: It was really interesting to see how block-chains make use of existing cryptographic components (hashing for integrity, asymmetric keys for authentication) to function.
