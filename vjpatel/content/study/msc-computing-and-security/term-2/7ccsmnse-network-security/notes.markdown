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

Traditional whitelists suffer from:
* Spammers being able to forge sender addresses.
* Whitelists don't help with strangers.


The main idea of this is to whitelist senders based on friends-of-friends.

A recipient queries the sender's server to find mutual-friends. This however, reveals the sender's correspondents.


---

## Lecture 2

### Why use GNU/Linux

* A large fraction of internet servers run Unix. LAMP is an extremely popular software stack.
* Elegant software model.
  * Well-defined interface for both programmers POSIX and for (power) users GNU utils.
  * Serves as a good example for how to design software, in general, and how to secure it, in particular.

### Free and Open Source Software (FOSS)

Gives the following guarantees:
* The freedom to run the program as you wish, for and purpose.
* The freedom to study how the program works, and change it so it does your computing as you wish.
* The freedom to redistribute copies so you can help your neighbour.
* The freedom to distribute copies of your modified versions to others.


### Linux interface

![alt text](https://docs.google.com/drawings/d/1rnurDoB5i2vMTUT2VUNWwS-K0b11rrZwLboN8_HU3hY/pub?w=480&amp;h=360 "Linux Interface")

The shell gives us:

* **Environment**: `export HELLO="Hello World"; echo ${HELLO}`
* **Flow control**: `if`, `for`, `while` etc.
* **Job control**: list `jobs`, foreground `fg`, background `bg`.
* **Globbing**: `*/*`.

* **Pipe** `|`: Chain the output of one program into the input of another.
* **Sequence** `a ; b`: Perform a, then b.
* **Conditional execution**:
  * *Success* `a && b`: Perform `b` only if `a` returns 0.
  * *Failure* `a || b`: Perform `b` only if `a` does not succeed.
* **Background execution** `a &`: Perform `a` in the background.

### Shellshock

As `bash` operates both as a command interpreter and a command, it is possible to execute bash from within itself. When this happens, the original instance can export environment variables and function definitions into the new instance. The new instance of bash, scans its environment variable list for functions and converts them into internal functions, it performs this conversion by creating a fragment of code from the value and executing it. Affected versions do not verify that the fragment is a valid function definition.

```
env x='() {:;}; echo vulnerable' bash -c 'echo hello'
```

### Files?
---

## Lecture 3

### Spoofing Attack: ARP Spoofing

* Network layer: IP address
* Physical layer: MAC address

**ARP** (Address Resolution Protocol) functions by:

1. Getting the IP address of target.
2. Create request ARP message.
  * Fill sender **physical** address.
  * Fill sender **IP** address.
  * Fill target **IP** address.
  * Target **physical** address is filled with `0`.
3. Message is passed to data link-layer where it is encapsulated into a frame.
  * Source address: sender **physical** address.
  * Destination address: broadcast address.
4. Every host or router on the LAN receives the message.
  * All stations pass it to ARP.
  * All machines apart from the target drops the packet.
5. Target machine replies with **unicast** ARP message that contains its physical address.
6. Sender receives reply message and therefore discovers the physical address of the target.

ARP has a cache to avoid querying everytime. It is a **stateless** protocol so it can be updated regardless of whether a request was sent. The ARP cache can therefore be poisoned.

Given **Alice**(`10.0.0.1`, `aa:aa:aa:aa`) and **Bob**(`10.0.0.2`, `bb:bb:bb:bb`). An attacker, **Charlie**(`10.0.0.3`, `cc:cc:cc:cc`) can send an ARP message (`10.0.0.2`, `cc:cc:cc:cc`) to **Alice**, so that all of her packets intended for **Bob** are now sent to **Charlie** instead.

The ARP cache expires, but it would sufficient for **Charlie** to send the poison every ~40s.

An attacker can perform a **Man-in-the-middle** attack by doing this by also sending an ARP message (`10.0.0.1`, `cc:cc:cc:cc`) to **Bob**. Bob will also then send all of his packets intended for **Alice** to **Charlie** instead. **Charlie** can then relay these packets to **Alice**.

### Spoofing Attack: Smurfing (Amplification attack)

**Amplification attack**: Small amounts of traffic are converted into large amounts of traffic, enabling people with weaker connections to attack larger companies.

#### NTP DoS

The Network Time Protocol(NTP) can be used for an amplification attack. This is because the NTP reply is usually much bigger than the request (up to 206x). Therefore, an attacker **Charlie** could send **Bob**'s address to an NTP server which will then send its larger response to **Bob**'s computer.

### Sniffing Attack: Packet Sniffing

A network card may be put in ***promiscuous*** mode to read all packets from a network. This is usually used for debugging & diagnostic purposes.


---

## Lecture 4


### BGP Route Hijacking

The Border Gateway Protocol controls the routes that packets take through autonomous systems. Autonomous systems advertise the IP ranges they serve as a CIDR e.g. `137.0.0.0/16`. BGP prefers the **longest** prefix e.g. `137.0.0.0/24` would override `137.0.0.0/16`. A **routing black hole** can be created if an autonomous system advertises for addresses that it doesn't serve.


### TCP Session Hijacking

#### TCP
Defines a connection: *Ordered sequence of bytes over an unordered IP network*. A Connection is defined by an IP address + Port. A sequence number gives an order of packet numbers.


### DNS Poisoning

---

## Lecture 5

**Port**: In computer networking, a port is an application-specific or process-specific software construct serving as a communications endpoint in a computer's host operating system.

The **purpose of ports** is to uniquely identify different applications or processes running on a single computer and thereby enable them to share a single physical connection to a packet-switched network like the internet. Ports are like channels that carry information into; out of; and internal to a computer.

* **Ports to a computer are like windows or doors to a house**.

Port scanning strategy:
1. Determine what services are listening and reachable from the internet.
2. Analyse underlying weaknesses.
3. Exploit the weakness for later use.

The main goal of port scanning is to find out with ports are **open**, **closed** or **filtered**.

**Downfalls**:
* Attackers can only attack the type of communication which is carried on the specific port that they are accessing.
* Attackers cannot gain direct access to your computer's file system through port scanning.

### Port Scanning Techniques

#### Simple port scanning

Attacker searches all ports looking for, and noting, all open ports.
 * Tries each of the 65535 ports of the victim.
 * Sending a carefully constructed packet with a chosen port number.

```
Pros:
  - Attacker sees ALL available ports.
Cons:
  - Takes a long time.
  - Can be detected fairly easily (as a large amount of ports are being scanned).
  - Specific ports found may not be useful to attack.
```

#### Strobe port scanning

Attacker selects a certain range of ports to check for open ports.

```
Pros:
 - Quicker than a full scan.
Cons:
 - Does not give entire vulnerability profile of target.
 - Is somewhat easy to detect.
```

#### Stealth port scanning

Attacker searches only a few random ports at once over a long period of time (usually a day or more). Often jumping between different computers on a network.

```
Pros:
 - Hard to detect as individual port scans appear to be accidental communication attempts.
Cons:
 - Takes a long time.
```

### Port Scanning Types


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
