---
date: "2016-12-05T11:26:19+01:00"
course: "MSc Computing and Security"
module: "7CCSMCIS Cryptography and Information Security"
title: "Coursework 5"
latex: true
---

> Describe the man-in-the-middle attack to the Needham-Schroeder public key protocol and explain how it can be fixed.

The Needham-Schroeder protocol is as follows:

1. Alice sends Bob a nonce (random number) and her name $ A \rightarrow B: {{NA, A}_K}_B $.
2. Bob sends Alice her nonce back along with a nonce he has generated. $ B \rightarrow A: {{NA, NB}_K}_A $.
3. Alice sends Bob his nonce back $ A \rightarrow A: {{NB}_K}_B $.

The man-in-the-middle attack for this takes advantage of, in step 2, Alice not knowing where the new nonce NB is really from. A MITM could proxy the protocol between Alice and Bob whilst switching the answers with his key. The way to resolve this is having B send his name in step 2.


> Describe the Kerberos protocol, step by step.

1. User logs into workstation.
2. Workstation requests ticket-granting-ticket (long-term) from Kerberos Authentication Server (Authentication).
3. User decrypts long-term credentials using their password and sends a request for a short-term ticket from the TGS using the TGT and authenticator.
4. The TGS verifies the request and responds.



> Explain how the Kerberos protocol can be generalised to multiple realms

A realm is defined by a Kerberos server, where the server stores user and application server passwords for the realm. The servers register with each other and the TGS' in each realm would communicate to other realms' TGS' if the user needs it.
