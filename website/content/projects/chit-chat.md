---
date: "2017-05-13T21:17:53+01:00"
title: "Chit Chat"
dev_status: "complete"
description: "Our MSc Group Project at KCL in which we created a secure, distributed chat application with an Elixir backend, Java desktop client and Java Android app."
github_address: "https://github.com/MonarchsofCoding/chitchat"
---

For our MSc Group Project, we were tasked to create a secure, distributed chat application with 2 separate client applications.

## Tech Stack

We opted to create an Android app as a mobile client, written in Java and a Desktop client written in Java as most of our team had learnt Java previously.
We also created our backend using Elixir to take advantage of distributed Erlang and as an opportunity to learn a new language.

Our backend was hosted on AWS ECS w/ WeaveNet (to provide multicast gossip discovery of additional Erlang nodes), and we utilised AWS S3 for publishing of released artefacts. We also utilised Travis CI to run our tests and publish development artefacts

## Security Design

Our clients generate an asymmetric 4096 bit RSA key on launch which are used to encrypt messages end-to-end between users. For example:
_Alice_ wishes to send an encrypted message to _Bob_.

1. _Alice_ and _Bob_'s clients generate a 4096 bit RSA key on launch.
2. Both of their clients send their public keys _APub_ and _BPub_ to the backend as registration.
3. _Alice_ sees that _Bob_ is online after his client has registered.
4. _Alice_ composes the message she'd like to send to _Bob_ and clicks send.
5. _Alice_'s client downloads _Bob_'s public key, encrypts it and then sends the encrypted message to the server which brokers it to _Bob_.
6. _Bob_ receives the encrypted message and decrypts it with his public key, _BPub_.

This design does have it's flaws, most notably that users have to trust the server.

For more information:

- see the GitHub repository here: https://github.com/MonarchsofCoding/chitchat
- Artefacts/Binaries here: https://s3-eu-west-1.amazonaws.com/kcl-chit-chat-artifacts/index.html
