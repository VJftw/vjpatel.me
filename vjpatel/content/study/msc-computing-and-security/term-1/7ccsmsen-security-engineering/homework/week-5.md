+++
date = "2016-10-26T23:26:19+01:00"
course = "MSc Computing and Security"
module = "7CCSMSEN Security Engineering"
title = "Homework 5"
+++

Q1: Imagine you are researching security products (e.g. CCTV, alarms etc.) on a helpful website. They ask you for your address details? Think about where this can be bad for you.

A: An adversary is likely able to conclude that you don't have any security for your house if you are looking for security products for your address. They may also be able to find out which security system you are installing at your address and exploit any known vulnerabilities.


Q2: What can an attacker that controls the network do to a communication between a client and a server?

A: They could very easily perform a Man in the Middle (MitM) attack where they can masquerade as the client to the server and the server to the client.


Q3: Before starting a TCP connection, client and servers perform a three-way handshake. Describe how can this three-way handshake be abused by an attacker?

A: An attacker could spam SYN requests and never complete the handshake. The server will keep track of the handshake state for each of these requests and thus an attacker could cause the server to run out of memory.


Q4: Consider the following simple mutual authentication protocol:

$$A \rightarrow B: N_a$$

$$B \rightarrow A: \left \{N_A, N_B\right \}_{K_{AB}} $$

$$ A \rightarrow B: N_b $$

Explain how an attacker $$B'$$ can launch an impersonation attack by intercepting all messages for $$B$$ and make $$A$$ decrypt her own challenges.

A: The attacker $$B'$$ can simply deflect $$A$$'s messages back to her to appear as a friend. For example:

 1. $$A \rightarrow B': N_A$$. $$A$$ initiates a challenge with a nonce.
 2. $$B' \rightarrow A: N_A$$. $$B'$$ initiates a challenge with the same nonce $$A$$ provided and waits for $$A$$ to respond.
 3. $$A \rightarrow B': \left \{N_A, N^{'}_A\right \}_{K_{AB}}$$. $$A$$ responds to $$B'$$'s challenge as soon as possible.
 4. $$B' \rightarrow A: \left \{N_A, N^{'}_A\right \}_{K_{AB}}$$. $$B'$$ responds to $$A$$'s challenge with what $$A$$ replied to their challenge, which $$A$$ accepts as it has been encrypted under the key $$K_{AB}$$ and contains the correct challenge.
 5. $$A \rightarrow B': N^{'}_A$$. $$A$$ completes the protocol by sending $$N^{'}_A$$.


Q5: What is the main problem with the following authentication protocol where $$A$$ sends $$B$$ a mutually shared key?

$$ A \rightarrow B: K_{ab} $$

A: The key is sent in clear text.

Q6: Nonces are unpredictable random numbers used in protocols. Consider the following protocol

$$ A \rightarrow B: N $$

$$ B \rightarrow A: \left \{N + 1\right \}_{K_{ab}} $$

Write down three facts that $$A$$ can infer after this protocol has been successfully completed?

A:
 - $$B$$ has recieved the message as it can't just be deflected back on the network as the response requires calculation.
 - $$B$$ could only have generated their answer after the initial message as $$N$$ is always new and random.
 - The response must have come from $$B$$ if only $$A$$ and $$B$$ know the key $$K_{AB}$$.


Q7: Write down a protocol which establishes a secret key between $$A$$ and $$B$$ using a mutually trusted third party $$S$$. You can assume $$A$$ and $$S$$, respectfully $$B$$ and $$S$$, share secret keys.

A:

 1. $$A \rightarrow S: A, B$$. ($$A$$ tells $$S$$ that they would like to speak to $$B$$.)
 2. $$S \rightarrow A: \left \{ K_{AB} \right \}_{K_{AS}} $$ and $$ \left \{ \left \{ K_{AB} \right \}_{K_{BS}} \right \}_{K_{AS}} $$. ($$S$$ responds with a shared key $$K_{AB}$$ in two forms. One form for $$A$$ after $$A$$ has decrypted and the other encrypted so that only $$B$$ can decrypt it.)
 3. $$A \rightarrow B: \left \{ K_{AB} \right \}_{K_{BS}}$$. ($$A$$ sends the key that only $$B$$ can decrypt to $$B$$.)
 4. $$A \rightarrow B: \{m \}_{K_{AB}}$$. ($$A$$ sends message $$m$$ to $$B$$ that only they can decrypt.)


Q8: Consider the following protocol between a car and a key transponder:

1. $$C$$ generates a random number $$N$$
2. $$C$$ calculates $$(F, G) = \left \{N\right \}_K$$
3. $$C \rightarrow T: N, F$$
4. $$T$$ calculates $$(F', G') = \left \{N\right \}_K$$
5. $$T$$ checks that $$F = F'$$
6. $$T \rightarrow C: N, G'$$
7. $$C$$ checks that $$G = G'$$

In Step 2 and 4 a message is split into two halves. Explain what the purpose of this split is? Assume the key $$K$$ is shared only between the car and the transponder. Does the protocol achieve that the transponder $$T$$ authenticates itself to the car $$C$$? Does the car authenticate itself to the transponder?

A: The purpose of splitting the message is to allow the Car and Transponder to know if their communication channel has been tampered with. A person-in-the-middle is unable to decrypt half of a message and forward it onto the Car or Transponder. Only a complete message can be decrypted and re-encrypted, but the Car and Transponder expect message halves. This results in the *Car* being able to authenticate the *Transponder*.


Q9: (Optional) This is question is for you to provide regular feedback to me, for example what were the most interesting, or confusing parts in this lecture? Please feel free to share any other questions or concerns.

A: The handout was extremely useful for revising the protocols this week and it really helped to write down and go through the interlock protocol slowly in my own time.

<script src='https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'></script>
