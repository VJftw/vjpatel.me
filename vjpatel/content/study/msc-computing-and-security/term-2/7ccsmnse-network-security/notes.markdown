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
