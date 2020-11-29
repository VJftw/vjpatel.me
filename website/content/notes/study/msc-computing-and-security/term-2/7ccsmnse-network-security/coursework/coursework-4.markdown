---
date: "2017-04-15T00:26:19+01:00"
course: "MSc Computing and Security"
module: "7CCSMNSE Network Security"
title: "Coursework 4"
latex: true
---

## Coursework 4

### 1. What are main characteristics of Mix Networks?

### 2. Consider a sender `$A$` sending a message `$M$`to a receiver `$B$` over a chain of `$n$` mixes:
  * Specify the cryptographic details of how `$A$` would prepare the message `$M$` to be sent to `$B$` over the chain of `$n$` mixes.
  * How could the first mix in the chain generate a receipt for the message received from `$A$` ?
  * How could `$A$` ensure that `$B$` can reply to the anonymous sender with a return message `$M'$` ?

### 3. Describe Onion Routing.

Onion routing hides a message source by routing it randomly. Routers don't know if the source sender was the real source or another router. The routing info for each link is encrypted with the router's public key. Therefore, each router only learns the identity of the next router.

A client proxy establishes a symmetric session key and circuit with *Onion Router #1*. The client can then extend its circuit by establishing a symmetric session key with *Onion Router #2* by tunnelling through *Onion Router #1*. The client can further extend its circuit by establishing a symmetric session key with *Onion Router #3* by tunnelling through *Onion Router #1* and *Onion Router #2*. and so on. Datagrams are then decrypted and reencrypted at every link.

### 4. Describe the dining cryptographers protocol.

A clever idea on how to make a message public in a perfectly untraceable manner. It guarantees information-theoretic anonymity for message senders. This is an **unusually strong** form of security where it defeats an adversary with unlimited computational power.

The Dining cryptographers problem presents a situation where there are **3 cryptographers** having dinner. Either the NSA is paying for dinner, or one of them but they wish to remain anonymous.

1. Each diner flips a coin and shows it to their left neighbour. Every diner sees 2 coins, their own and their neighbour to the right.
2. Each diner announces whether the two coins are the same. If they are paying, they lie about the coins being the same.
3. If there is:
  * Odd number of *Same*, then the NSA is paying.
  * Even number of *Same*, then one of the cryptographers is paying. **A non-payer cannot tell which of the other two are paying.**
