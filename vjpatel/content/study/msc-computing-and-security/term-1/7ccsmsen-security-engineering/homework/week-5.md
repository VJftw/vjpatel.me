+++
date = "2016-10-26T23:26:19+01:00"
course = "MSc Computing and Security"
module = "7CCSMSEN Security Engineering"
title = "Homework 5"
latex = true
+++

Q1: Imagine you are researching security products (e.g. CCTV, alarms etc.) on a helpful website. They ask you for your address details? Think about where this can be bad for you.

A: An adversary is likely able to conclude that you don't have any security for your house if you are looking for security products for your address. They may also be able to find out which security system you are installing at your address and exploit any known vulnerabilities.


Q2: What can an attacker that controls the network do to a communication between a client and a server?

A: They could very easily perform a Man in the Middle (MitM) attack where they can masquerade as the client to the server and the server to the client.


Q3: Before starting a TCP connection, client and servers perform a three-way handshake. Describe how can this three-way handshake be abused by an attacker?

A: An attacker could spam SYN requests and never complete the handshake. The server will keep track of the handshake state for each of these requests and thus an attacker could cause the server to run out of memory.


Q4: Consider the following simple mutual authentication protocol:

{{<latex>}}
A \rightarrow B: N_a
{{</latex>}}

{{<latex>}}
B \rightarrow A: \left\{ N_A, N_B \right\}
{{</latex>}}

{{<latex>}}
A \rightarrow B: N_b
{{</latex>}}

Explain how an attacker {{<latex i="B'" />}} can launch an impersonation attack by intercepting all messages for {{<latex i="B" />}} and make {{<latex i="A" />}} decrypt her own challenges.

A: The attacker {{<latex i="B'" />}} can simply deflect {{<latex i="A" />}}'s messages back to her to appear as a friend. For example:

 1. {{<latex i="A \rightarrow B': N_A" />}}. {{<latex i="A" />}} initiates a challenge with a nonce.
 2. {{<latex i="B' \rightarrow A: N_A" />}}. {{<latex i="B'" />}} initiates a challenge with the same nonce {{<latex i="A" />}} provided and waits for {{<latex i="A" />}} to respond.
 3. {{<latex i="A \rightarrow B': \left \{ N_A, N_{A}^{'} \right \}" />}} . {{<latex i="A" />}} responds to $B'$'s challenge as soon as possible.
 4. {{<latex i="B' \rightarrow A: \left\{ N_A, N_{A}^{'} \right\}" />}}. {{<latex i="B'" />}} responds to {{<latex i="A" />}}'s challenge with what {{<latex i="A" />}} replied to their challenge, which {{<latex i="A" />}} accepts as it has been encrypted under the key $K_{AB}$ and contains the correct challenge.
 5. {{<latex i="A \rightarrow B': N_{A}^{'}" />}}. {{<latex i="A" />}} completes the protocol by sending {{<latex i="N_{A}^{'}" />}}.
 5. {{<latex i="A \rightarrow B': N_{A}^{'}" />}}. {{<latex i="A" />}} completes the protocol by sending {{<latex i="N_{A}^{'}" />}}.


Q5: What is the main problem with the following authentication protocol where {{<latex i="A" />}} sends {{<latex i="B" />}} a mutually shared key?

{{<latex>}}
A \rightarrow B: K_{ab}
{{</latex>}}

A: The key is sent in clear text.

Q6: Nonces are unpredictable random numbers used in protocols. Consider the following protocol

{{<latex>}}
A \rightarrow B: N
{{</latex>}}

{{<latex>}}
B \rightarrow A: \left \{N + 1\right \}_{K_{ab}}
{{</latex>}}

Write down three facts that {{<latex i="A" />}} can infer after this protocol has been successfully completed?

A:
 - {{<latex i="B" />}} has recieved the message as it can't just be deflected back on the network as the response requires calculation.
 - {{<latex i="B" />}} could only have generated their answer after the initial message as {{<latex i="N" />}} is always new and random.
 - The response must have come from {{<latex i="B" />}} if only {{<latex i="A" />}} and {{<latex i="B" />}} know the key {{<latex i="K_{AB}" />}}.


Q7: Write down a protocol which establishes a secret key between {{<latex i="A" />}} and {{<latex i="B" />}} using a mutually trusted third party {{<latex i="S" />}}. You can assume {{<latex i="A" />}} and {{<latex i="S" />}}, respectfully {{<latex i="B" />}} and {{<latex i="S" />}}, share secret keys.

A:

 1. {{<latex i="A \rightarrow S: A, B" />}}. ({{<latex i="A" />}} tells {{<latex i="S" />}} that they would like to speak to {{<latex i="B" />}}.)
 2. {{<latex i="S \rightarrow A: \left \{ K_{AB} \right \}_{K_{AS}} " />}} and {{<latex i=" \left \{ \left \{ K_{AB} \right \}_{K_{BS}} \right \}_{K_{AS}} " />}}. ({{<latex i="S" />}} responds with a shared key {{<latex i="K_{AB}" />}} in two forms. One form for {{<latex i="A" />}} after {{<latex i="A" />}} has decrypted and the other encrypted so that only {{<latex i="B" />}} can decrypt it.)
 3. {{<latex i="A \rightarrow B: \left \{ K_{AB} \right \}_{K_{BS}}" />}}. ({{<latex i="A" />}} sends the key that only {{<latex i="B" />}} can decrypt to {{<latex i="B" />}}.)
 4. {{<latex i="A \rightarrow B: \{m \}_{K_{AB}}" />}}. ({{<latex i="A" />}} sends message {{<latex i="m" />}} to {{<latex i="B" />}} that only they can decrypt.)


Q8: Consider the following protocol between a car and a key transponder:

1. {{<latex i="C" />}} generates a random number {{<latex i="N" />}}
2. {{<latex i="C" />}} calculates {{<latex i="(F, G) = \left \{N\right \}_K" />}}
3. {{<latex i="C \rightarrow T: N, F" />}}
4. {{<latex i="T" />}} calculates {{<latex i="(F', G') = \left \{N\right \}_K" />}}
5. {{<latex i="T" />}} checks that {{<latex i="F = F'" />}}
6. {{<latex i="T \rightarrow C: N, G'" />}}
7. {{<latex i="C" />}} checks that {{<latex i="G = G'" />}}

In Step 2 and 4 a message is split into two halves. Explain what the purpose of this split is? Assume the key {{<latex i="K" />}} is shared only between the car and the transponder. Does the protocol achieve that the transponder {{<latex i="T" />}} authenticates itself to the car {{<latex i="C" />}}? Does the car authenticate itself to the transponder?

A: The purpose of splitting the message is to allow the Car and Transponder to know if their communication channel has been tampered with. A person-in-the-middle is unable to decrypt half of a message and forward it onto the Car or Transponder. Only a complete message can be decrypted and re-encrypted, but the Car and Transponder expect message halves. This results in the *Car* being able to authenticate the *Transponder*.


Q9: (Optional) This is question is for you to provide regular feedback to me, for example what were the most interesting, or confusing parts in this lecture? Please feel free to share any other questions or concerns.

A: The handout was extremely useful for revising the protocols this week and it really helped to write down and go through the interlock protocol slowly in my own time.
