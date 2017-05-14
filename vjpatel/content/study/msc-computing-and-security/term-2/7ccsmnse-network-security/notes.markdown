+++
date = "2017-04-15T00:26:19+01:00"
title = "7CCSMNSE Network Security notes"
markup = "mmark"
+++

## Lecture 1

$$\text{Security} = \text{Policy} + \text{Mechanism}$$

Security design needs to ask and answer:

 * Who and what is being protected?
 * Who and what is attacking?
 * What are their powers?

The answer to these questions is called a **Threat Model**.


### Policies

A Policy codifies "desired" behaviour. e.g. Only root can execute this script.

Types of Policies:

 * **Confidentiality**: Protection of content being read by unauthorised sources.
 * **Integrity**: Protection of content being modified by unauthorised sources.
 * **Availability**: Prevents deliberate overload. Keeps the resource usable by legitimate users (DoS).

### Mechanism

A Mechanism is the means of enforcing a Policy.

e.g.

Policy: Only root can execute this script.
Mechanism: Use password for root & check that user id is root when executing the script.

Types of Mechanisms:

 * **Deter**: Make it too difficult to attack.
 * **Detect**: Monitor for attacks.
 * **Deny**: Prevent unauthorised access.
 * **Delay**: Slow down users (physically).
 * **Defend**: Take remedial steps after attack.
 * **Insure**: Pass consequences of risk to someone else.


### Different kinds of Attacks

* **Jamming**: Affecting availability for legitimate packets by flooding the communication channel. The link-layer is broadcast based so users are usually polite.
* **Sniffing**: Listening to conversations that are not meant for you. Network cards may be put in *promiscuous* mode to read all packets from a network.
* **Spoofing**: Pretending to be somebody you are not (masquerading). Can spoof IP addresses and/or MAC addresses.

| Policy Type       | Attack    | Solution (Mechanism)
|-------------------|-----------|-------------------------
| Confidentiality   | Sniffing  | Encrypt
| Integrity         | Spoofing  | Message Digest & Sign
| Availability      | Jamming   | Account and Police

### Secure Email


* Confidentiality: Protection from snoopers.
* Authentication: Sender is who they say they are.
* Integrity: Message has not been modified.

Email also has an *availability* problem being **spam**. It is a problem because spam requires a lot of processing power which thus takes resources away from legitimate emails.

### Pretty Good Privacy (PGP)

#### Authentication ($\text{Alice} \rightarrow \text{Bob}$)

1. $\text{Alice}$ creates a message.
2. $\text{Alice}$ creates a 160-bit hash code of the message using SHA-1.
3. $\text{Alice}$ encrypts hash code with RSA using the her private key, attaching the result to the message.
4. $\text{Bob}$ uses RSA with $\text{Alice}$'s public key to decrypt and recover the hash code.
5. $\text{Bob}$ generates new hash code for message and compares it with the decrypted hash code. If they match, the message is accepted as authentic.

#### Confidentiality ($\text{Alice} \rightarrow \text{Bob}$)

1. $\text{Alice}$ generates a message and random 128-bit number to be used as a session key for this message only.
2. $\text{Alice}$ encrypts message using CAST-128/IDEA/3DES (**symmetric**) with session key.
3. $\text{Alice}$ encrypts session key using RSA with $\text{Bob}$'s public key, then attached to the message.
4. $\text{Bob}$ uses RSA with his private key to decrypt and recover session key.
5. Session key is used to decrypt message.

We can use both services (Authentication and Confidentiality) on the same message:

1. Create signature and attach to message.
2. Encrypt both message and signature with session key
3. Attach session key encrypted with RSA.

By default, PGP compesses the message after signing but before encryption.

#### PGP Session Keys

A session key is needed for each message, these can vary from:
 * 56-bit DES
 * 128-bit CAST or IDEA
 * 168-bit 3DES

For entropy, it uses random inputs taken from previous uses and keystroke timing from the user.


#### PGP Key Rings

Every PGP user has a pair of keyrings:

* Public-key ring contains all the public-keys of other PGP users known to this user, indexed by Key ID.
* Private-key ring contains all the public/private key pairs for this user, indexed by key ID & encrypted from a hashed passphrase.

#### PGP Key Management

Rather than relying on Certificate Authorities, it uses a distributed social key management scheme where every user is their own Certificate Authority. Each user can sign keys for users they know directly, thus collectively forming a "web of trust".

PGP is create because in society, social networks are small world networks. Theoretically, we should be able to find small chains of trust linking legitimate users. In practice, the web of trust has millions of nodes and are singletons and cannot be used too bootstrap trust at all. It suffers from the network effect; it would be useful if everyone used it, but it is not useful until everyone does; which means not many people have started using it.


### Preventing Spam using a Web of Trust

Email is no longer reliable e.g. Job offers can go into spam folder etc.


---


<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true
    },
    "HTML-CSS": { availableFonts: ["TeX"] }
  });
</script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML'></script>
