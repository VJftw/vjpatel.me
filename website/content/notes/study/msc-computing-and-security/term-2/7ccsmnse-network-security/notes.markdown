---
date: "2017-01-29T14:26:19+01:00"
course: "MSc Computing and Security"
module: "7CCSMNSE Network Security"
title: "Notes"
latex: true
---

## Lecture 1

{{<latex>}}
\text{Security} = \text{Policy} + \text{Mechanism}
{{</latex>}}

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

| Policy Type     | Attack   | Solution (Mechanism)  |
| --------------- | -------- | --------------------- |
| Confidentiality | Sniffing | Encrypt               |
| Integrity       | Spoofing | Message Digest & Sign |
| Availability    | Jamming  | Account and Police    |

### Secure Email


* Confidentiality: Protection from snoopers.
* Authentication: Sender is who they say they are.
* Integrity: Message has not been modified.

Email also has an *availability* problem being **spam**. It is a problem because spam requires a lot of processing power which thus takes resources away from legitimate emails.

### Pretty Good Privacy (PGP)

#### Authentication ({{<latex i="\text{Alice} \rightarrow \text{Bob}" />}})

1. {{<latex i="\text{Alice}" />}} creates a message.
2. {{<latex i="\text{Alice}" />}} creates a 160-bit hash code of the message using SHA-1.
3. {{<latex i="\text{Alice}" />}} encrypts hash code with RSA using the her private key, attaching the result to the message.
4. {{<latex i="\text{Bob}" />}} uses RSA with $\text{Alice}$'s public key to decrypt and recover the hash code.
5. {{<latex i="\text{Bob}" />}} generates new hash code for message and compares it with the decrypted hash code. If they match, the message is accepted as authentic.

#### Confidentiality ({{<latex i="\text{Alice} \rightarrow \text{Bob}" />}})

1. {{<latex i="\text{Alice}" />}} generates a message and random 128-bit number to be used as a session key for this message only.
2. {{<latex i="\text{Alice}" />}} encrypts message using CAST-128/IDEA/3DES (**symmetric**) with session key.
3. {{<latex i="\text{Alice}" />}} encrypts session key using RSA with {{<latex i="\text{Bob}" />}}'s public key, then attached to the message.
4. {{<latex i="\text{Bob}" />}} uses RSA with his private key to decrypt and recover session key.
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

#### Berkeley Packet Filter

Programs like `tcpdump` need a lot of flexibility in what packets to capture. Thus, the naive solution would have the network card pass all packets to the filtering program. This is a performance issue because each time data has to be fetched, user code has to **trap the kernel** and have the buffer filled.
To get over this performance bottleneck, in the Berkeley Packet Filter, filtering commands are written as commands for a **virtual machine** interpreter run by the kernel. Just-in-time compilation of filtering regular expressions is used to decrease overheads.


---

## Lecture 4

### Control plane vs. Data plane attacks

Routers and switches are split into:

* **control plane**: For learning routes. This needs to be thorough.
* **data plane**: For doing forwarding. This needs to be fast.

Attacks can be carried out on both these planes.

### Off-path vs. On-path Adversaries

* **On-path** adversaries are more powerful than **Off-path** adversaries.

It is difficult for an **Off-path** adversary to insert data on the data plane.

An **On-path** adversary can use the connection state, however this is difficult to do at scale.


### BGP Route Hijacking

The Border Gateway Protocol controls the routes that packets take through autonomous systems. Autonomous systems advertise the IP ranges they serve as a CIDR e.g. `137.0.0.0/16`. BGP prefers the **longest** prefix e.g. `137.0.0.0/24` would override `137.0.0.0/16`. A **routing black hole** can be created if an autonomous system advertises for addresses that it doesn't serve.


### TCP Session Hijacking

**TCP**: Defines a connection: *Ordered sequence of bytes over an unordered IP network*. A Connection is defined by an IP address + Port. A sequence number gives an order of packet numbers.

#### TCP Connection set up

![alt text](https://docs.google.com/drawings/d/1O24BtOgz6_BH3dl70udx6e_kRoxxPfn-zDuxwfdiFSw/pub?w=925&h=588 "TCP Connection set up")


#### TCP Connection hijacking

**On-path TCP connection hijacking**:

A man-in-the-middle (on-path) can alter a TCP stream without the receiver (Harambe) ever realising that there was an alteration. Mallory needs to know the sequence number in order to perform this.

![alt text](https://docs.google.com/drawings/d/1zfKYDJkVOXFrbWR-6t_8OQxOKQfQhFKXQfy7jyWYeLk/pub?w=925&h=588 "TCP Connection Hijacking")


**Steps to TCP connection hijacking**:

1. Sniff packets
2. Predict the sequence number.
3. Inject data.

Mallory can then use a hijacked stream to:

 * Spoof a client. e.g. performing actions as an authenticated user (sending money etc.)
 * Spoof a server. e.g. Send misinformation to client.

**Off-patch TCP connection hijacking**:

This is much harder as Mallory needs to guess the initial sequence number.

It is possible to guess the initial sequence by using your system clock.



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

#### SYN Scanning

#### TCP 3-way handshake

**If the server is listening on TCP port**:

1. Client sends `SYN+PORT`.
2. Server sends `SYN+ACK`.
3. Client sends `RST+ACK`.

**If there is no service on the TCP port**:

1. Client sends `SYN+PORT`.
2. Server sends `RST`

#### SYN Scanning (Half-open scanning)

An attacker does not complete all of the formal steps to create a TCP connection (doesn't do the 3rd step.).

```
Pros:
 - The attack is not easily detected as the server doesn't think a communication is being made.
Cons:
 - The server might find it suspicious not to receive the final message.
```

#### TCP Stealth Scan

Instead of sending `RST+ACK`, the attacker sends `RST` in an attempt to tear down the connection as quickly as possible prevent the attempt appearing in logs.

#### FIN Scanning

Attacker sends erroneous `FIN` (finish packet used to orderly close the connection) and listens for a response:

 * If a port is closed the attacker will receive a `RST`.
 * Open ports ignore the packet.

```
Pros:
 - It is difficult to recognise this attack as packets are random data.
Cons:
 - The error response could be dropped by a firewall and therefore an attacker could believe the port is open since it did not receive a response.
```

#### FTP bound scan

Bounce attack vulnerability in FTP servers allow somebody to request that the FTP server opens a connection to a third party on a particular port.

This way an attacker can force an FTP server to perform a port scan and send back the results.

```
Pros:
 - Hard to trace.
Cons:
 - Slower.
```


#### UDP Scanning

UDP is a connectionless protocol in which a packet transfer takes place without checking if there is a communication channel available between client and server. The data is just sent to the destination, assuming that the destination is available.

An attacker sends a UDP packet to a port, if the server responds with:

 * A UDP packet, then the port is open.
 * An ICMP port unreachable error type 3, code 3 then the port is closed.
 * An ICMP error type 3 and code 1, 2, 9, 10 or 13 then the port is filtered.
If there is no response, then the port is either open or filtered.

Neither UDP nor ICMP packets are guaranteed to arrive so UDP scanners must also implement retransmission.

### Port Scanning Attacks

* Ports are often used by administrators to verify security policies of their networks.
* Majority uses of port scans aren't malicious.

### Port Scanning Law

It is **NOT** illegal. It is analogous to someone ringing a doorbell. It is only illegal if a crime is committed.

### Protecting against port scanning

* Use non-standard ports
* Port scanning sniffing software

### Packet Forgery

**Packet Forgery** is the process of interfering with an established network connection, by means of constructing packets to appear as if they are part of the normal communication stream. They are commonly used in man-in-the-middle attacks and denial-of-service attacks.

**Uses**:

 * Disrupting services (file sharing, HTTP).
 * Compromising wireless access points.
 * Exploiting functionality in online games.
 * Determining the presence of internet censorship.
 * Allows for custom packet designers to test their packets.
 * Simulation of specific network traffic.
 * Testing of network firewalls and IDS.
 * Computer network auditing.

**Detecting Packet Forgery**:

* Packet analyzers and sniffers.
* Packet log showing inconsistencies.
* TCP resets are sent to both access points.


---

## Lecture 6 - Firewalls

Typically used to provide a **perimeter defence** with a single choke point as part of a comprehensive security strategy.

A Firewall is a computer or network security system that sits between your internal network and the rest of the network. It attempts to prevent bad things from happening without preventing good things from happening.

* A **firewall** forms a barrier through which all the traffic going in each direction must pass.
* A **firewall security policy** dictates which traffic is authorised to pass in each direction.
* A firewall is a **choke point** of control and monitoring.

It interconnects networks with differing trust levels where only authorised traffic is allowed.

**Techniques that firewalls use to control access and enforce the site's security policy**:

* **Service Control**: Determines the types of internet services that can be accessed, inbound or outbound.
* **Direction control**: Determines the direction in which particular service requests may be initiated and allowed to flow through the firewall.
* **User Control**: Controls access to a service according to which user is attempting to access it.
* **Behaviour Control**: Controls how particular services are used.


### Limitations

Cannot protect against:

 * Attacks that bypass the firewall (side doors)
 * Malware imported via laptop, PDA etc.
 * Access via WLAN if improperly secured. (insecure wireless)
 * Internal threats.


### Firewall Types

* Positive filter: Allow packets that meet a specific criteria.
* Negative filter: Reject packets that meet a specific criteria.


### Packet-Filter Firewall

The packet-filter firewall is the simplest, fastest firewall. It is the foundation of any firewall system. It examines each IP packet (without context) and permits/denies according to pre-defined rules.

*A* ***Packet-filter firewall*** *applies a set of rules to each incoming and outgoing IP packet and forwards of discards the packet.*

**Note:** Rules are applied top to bottom.

A packet filter firewall's default can be set to:

 * Discard: More conservative. Only specific ports are allowed. More likely used in governments.
 * Forward: Increases ease of use. More used in open organisations e.g. universities.

**Disadvantages**:

 * No examination of upper-layer data, therefore no prevention of attacks that employ application specific vulnerabilities.
 * Limited log information as there is little information available.
 * Vulnerable to spoofing addresses.
 * Due to a small amount of variables used in decisions, they are more susceptible to security breaches due to improper configuration.

#### Attacks and Countermeasures

**IP address spoofing**: An attacker could transmit packets from the outside with the source set as an internal address.  This can be countered by denying inbound packets that have an internal IP address.

**Source routing attacks**: An attacker could change the route a packet takes in the hope that it bypasses security measures. This can be countered by denying *source routed packets*).

**Tiny fragment attacks**: Typically a packet filter makes filtering decisions on the first fragment of a packet. An attacker can take advantage of this by splitting packet headers across different fragments. This can be countered by either discarding fragmented packet headers or reassembling them before checking.


### Stateful Packet-Filter (packet inspection) Firewall

A stateful packet inspection firewall tightens rules for TCP by creating a directory of outbound TCP connections. There will be an entry for each currently established connection.

The packet filter will now only allow incoming traffic to high-numbered ports for those packets that match one of the entries in the directory. It reviews the same information as a normal packet-filter firewall but also records information about TCP connections. e.g. sequence numbers.


### Application-level Gateway (Application Proxy)

An application-level gateway can be configured to only support specific features of an application that a network administrator considers acceptable whilst denying all other features.

If the gateway does not implement proxy code for the specific service, then the service is not supported. It can also be configured to support only specific features of an application.

**Advantages**:

 * Tend to be more secure than packet filters because They work by whitelisting applications by implementing proxy code for allowed applications.
 * It is easy to log and audit all incoming traffic at the application level.

**Disadvantages**:

 * Additional processing overhead on each connection.
 * Need separate proxies for each service.


### Circuit-level Gateway (Circuit level proxy)

A circuit-level gateway can be a standalone system or specialised function performed by an application level gateway.

It doesn't permit an end-to-end TCP connection.

It sets up and relays two TCP connections:

 * one between itself and the inner host.
 * one between itself and the outside host.

The security function is that **it determines which connections are allowed**.
The gateway can be configured to support application-level or proxy services on inbound connections and circuit-level for outbound connections. By doing this, we only have the processing overhead on inbound connections and not outbound connections.

Typically used when system admin trusts internal users by allowing general outbound connections.

e.g. **SOCKet Secure (SOCKS)**: An internet protocol that routes network packets between a client and server through a proxy server.


### Bastion Host

A system identified by the firewall administrator as a critical strong point in the network's security.

Typically a bastion host serves as a platform for an application-level or circuit-level gateway.

It is potentially exposed to *hostile* elements hence is secured to withstand this.


### Host-based firewall

A **host-based** firewall is a software module used to secure individual host. It is available in many operating systems. They filter and restrict packets like conventional stand-alone firewalls.

Advantages:

 * Can tailor rules to host environment.
 * Protection is provided independent of topology. (Roaming with laptops)
 * An additional layer of protection.


### Personal firewall

Controls traffic between a PC/workstation and the internet or enterprise network. They are typically much less complex than other firewall types. Their primary role is to deny unauthorised remote access to the computer and monitor outgoing activity for malware.


### Firewall Location and Configuration

#### DeMilitarised Zone (DMZ)

Area between an **external** and **internal** firewall. Systems which are externally accessible but need some protection e.g. Corporate web site, email server, DNS server.

An **external** firewall provides:

 * access control and protection for systems in the DMZ consistent with their need for external activity (allow HTTP inbound).
 * A basic level of protection for the remainder of the network.

An **internal** firewall provides:

 * More strict filtering capability to protect enterprise servers and workstations. (deny HTTP inbound)
 * Two-way protection with respect to the DMZ:
   * Remainder of network from attacks launched from DMZ systems (web server)
   * Protects DMZ systems from attacks launched from internal networks (corporate)


#### Virtual Private Network (VPN)

A network of private computers connected over an insecure network (internet) using encryption and special protocols to provide security. The most common protocol is **IPsec**.


#### Distributed Firewalls

Involves stand-alone and host-based firewalls working together under a central administrative control. It makes sense to have an internal and external DMZ. e.g. Web Servers that don't need much protection can placed in an external DMZ.

The most important aspect of this is **security monitoring** that includes log aggregation and analysis, firewall statistics, fine-grained remote monitoring of individual hosts.


---


## Lecture 7 - Network Security Protocols

Computer networks are:

 * **Physically**: A collection of segments that transmit bit streams.
 * **Logically**: A communication medium between two principals.

A **secure channel** another abstraction where other abstractions may concern **availability**, **privacy** of principals.

Neither TCP or IP layers provide security:

 * Addresses can be faked
 * Payload can be read or modified.

### IPsec

IPsec is a capability that can be added to IPv4 or IPv6 by means of additional headers.

Is between the TCP layer and IP layer. Therefore the OS changes but Applications and the TCP layer do not. All security-agnostic application can be secured using IPsec (Transparent to applications).

**Advantages**:

* Transport layer security without modification to applications.
* Transparent to end-users.
* Resistant to bypass if all traffic uses IP and the firewall is the only entrance.

**Disadvantages**:

* Only authenticates IP addresses.
* More is possible but requires changing the API.


encompasses three functional areas:

 * **Authentication**: Assures that a received packet was, in fact transmitted by the party identified as the source in the packet header, and that the packet has not been altered in transit.
 * **Confidentiality**: Enables communicating nodes to encrypt messages to prevent eavesdropping by third parties.
 * **Key management**: Concerned with secure exchange of keys.

It is able to do filtering based on a policy database as if there were a firewall between the two-ends. It is installed on OS for end-to-end security and security gateways.

**Applications**:

 * Secure branch/office connectivity over the internet.
 * Secure remote access over the internet.
 * Establishing extranet and intranet connectivity with partners.
 * Enhancing e-commerce security.


#### Standard

IPsec is an IETF standard covering protocols for a variety of standards:

 * **Authentication Header (AH)**: Protects the integrity and authenticity of IP datagrams (not confidentiality).
 * **Encapsulating Security Payload (ESP)**: Protects confidentiality and optionally integrity.
 * **Internet Key Exchange (IKE)**: Key management.

| Security                             | AH                                             | ESP                                            | ESP + AH                                       |
| ------------------------------------ | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| Access Control                       | <i class="fas fa-check" aria-hidden="true"></i> | <i class="fas fa-check" aria-hidden="true"></i> | <i class="fas fa-check" aria-hidden="true"></i> |
| Connectionless Integrity             | <i class="fas fa-check" aria-hidden="true"></i> |                                                | <i class="fas fa-check" aria-hidden="true"></i> |
| Data origin authentication           | <i class="fas fa-check" aria-hidden="true"></i> |                                                | <i class="fas fa-check" aria-hidden="true"></i> |
| Rejection of replayed packets        |                                                | <i class="fas fa-check" aria-hidden="true"></i> | <i class="fas fa-check" aria-hidden="true"></i> |
| Confidentiality                      |                                                | <i class="fas fa-check" aria-hidden="true"></i> | <i class="fas fa-check" aria-hidden="true"></i> |
| Limited traffic flow confidentiality |                                                | <i class="fas fa-check" aria-hidden="true"></i> | <i class="fas fa-check" aria-hidden="true"></i> |


#### Security Policy

The policy is determined primarily by the interaction of:

 * the **security association database (SAD)**
 * the **security policy database (SPD)**


##### Security Association Database (SAD)

A **security association** is a one-way relationship between sender and receiver defining security services. e.g.:

{{<latex>}}
\text{Alice} \rightarrow \text{Bob}: \text{Encrypt with 3DES; Authenticate with MD5}
{{</latex>}}

a security association is uniquely identified by three parameters:

 * **Security Parameters Index (SPI)**: A bit string assigned to this SA and having local significance only.
 * **IP Destination Address**: Address of destination endpoint of SA.
 * **Security Protocol Identifier**: A field from the outer IP header that indicates where SA is an AH or ESP SA.

##### Security Policy Database (SPD)

In its simplest form, an SPD contains entries, each of which defines a subset of IP traffic and points to a SA for that traffic.

Is means by which IP traffic is related to specific Security Associations (SAs); or no SA in the case of traffic being allowed to bypass IPsec.

In more complex environments there may be multiple entries that potentially relate to a single SA or multiple SAs associated with a single SPD entry.


##### IP traffic processing

IPsec is executed on a packet-by-packet bases:

 * Each outbound packet is processed by IPsec before transmission.
 * Each inbound packet is processed by IPsec after reception and before passing to the higher layer (TCP/UDP).


**Outbound**:

 1. When data is passed down from a higher layer (TCP/UDP), an IP packet is formed.
 2. IPsec searches SPD for a match to this packet.
    * If no match is found, the packet is discarded and an error message is generated.
    * If a match is found, further processing is determined by the first matching entry in SPD. If the policy matches:
        * `DISCARD`: the packet is discarded.
        * `BYPASS`: the is no further IPsec processing and the packet is forwarded to the network for transmission.
        * `PROTECT`: The Security Association Database (SAD) is searched for a matching entry.
            * If no entry is found, then Internet Key Exchange (IKE) is invoked to create a Security Association (SA) with the appropriate keys.


![alt text](https://docs.google.com/drawings/d/13K7uTILY81w3wywUmZUsEpurf2xX0dh32TtokQsdfw8/pub?w=885&h=719 "IPSec Outbound Processing")

**Inbound**:

1. IPsec examines inbound packets to determine whether it is an **unsecured** IP packet or one that **ESP or AH headers** by examining IP fields.
    * If the packet is **unsecured**, IPsec searches SPD for a match to this packet. If the policy matches:
      * `BYPASS`: The IP header is processed and stripped off and packet body is delivered to next higher layer (TCP/UDP).
      * `PROTECT` or `DISCARD`: The packet is discarded.
    * If the packet is **secured**, IPsec searches the SAD:
      * If no match is found, the packet is discarded.
      * Else, IPsec applies appropriate ESP or AH processing; the IP header is processed and stripped off and the packet body is delivered to higher layer (TCP/UDP).

![alt text](https://docs.google.com/drawings/d/1tpzYKhXRly5sMeIUG9My6htHE0ZmN2jU76Ob5sjUV5Q/pub?w=755&h=717 "IPSec Inbound Processing")


#### Authentication Header (AH)

Is an extra header between layers 3 and 4 that provides the destination enough information to identify the Security Association (SA). AH only guarantees integrity and protects part of the IP header.

**Sequence number** is initialized to zero and incremented by sender for each packet. Receiver stores incoming packets in a sliding window to order and sort duplicates as IP does not guarantee delivery or order.

##### AH Modes

**Transport Mode**:

* AH inserted after IP header, before IP payload.
* Message Authentication Code (MAC) taken of entire packet.
* Provides end-to-end protection between IPsec enabled systems.

![alt text](https://docs.google.com/drawings/d/1lmkpc01MC2z_Lc5Q7No-fkk41IMaG9Fy_ZMDD2zzrrs/pub?w=400&h=100 "IPSec AH Transport")


**Tunnel Mode**:

 * Entire original packet authenticated; new outer IP header.
 * Inner header carries ultimate source/destination address.
 * New outer header also protected (except mutable fields) and may contain different IP addresses, e.g. firewalls or security gateways.

 ![alt text](https://docs.google.com/drawings/d/1o8alIMFwrwBCn1KTSQGliRO3ZaSyAiALkddGfEDLK_M/pub?w=495&h=109 "IPSec AH Tunnel")


#### Encapsulating Security Payload (ESP)

The set of services provided depends on the options selected at the time of establishment of the Security Association (SA) on the location of the implementation in a network topology.

A **Header specifies encryption** and optional authentication.

**Transport Mode**:

 * Provides end-to-end encryption between hosts supporting IPsec.

 e.g. Hosts on internal networks uses internet for transport of data but do not interact with other hosts on the internet.


1. At the source, block of data consisting of ESP trailer plus entire transport-layer segment is encrypted and plaintext of this block is replaced with its ciphertext to form IP packet for transmission. Authentication is added if this option is selected.
2. Packet is then routed to destination. Each intermediate router needs to examine and process IP header plus and plaintext IP extension headers but does not need to examine ciphertext.
3. Destination node examines and processes IP header plus any plaintext IP extension headers. Then, on basis of SPI in ESP header, destination node decrypts remainder of packet to recover plaintext transport-layer segment.

**Disadvantage**: It is possible to do traffic analysis on the transmitted packets.

**Tunnel Mode**:

 * Can be used to set up a VPN by terminating tunnels at security gateways to each network. This implementation allows hosts avoid implementing security.

1. Source prepares an inner IP packet with a destination address of the target internal host.
  * This packet is prefixed by an ESP header; then packet and ESP header are encrypted and Authentication data may be added.
  * Outer IP packet: resulting block is encapsulated with a new IP header (base header + optional extensions) whose destination address is the firewall.
2. Outer packet is routed to destination firewall. Each intermediate router needs to examine and process outer IP header + any outer IP extension headers but does not need to examine ciphertext.
3. Destination firewall examines and processes outer IP header + other IP extension headers. Then on bases of the SPI in ESP header, destination node decrypts the remainder of packet to recover the plaintext inner IP packet. This packet is then transmitted in internal network.
4. Inner packet is routed through zero or more routers in internal network to destination host.


#### Combining Security Associations

An individual Security Association can implement either AH or ESP but not both. To combine Security Associations, a **Security Association Bundle** is used to refer to a sequence of Security Associations through which traffic must be processed to provide a desired set of IPsec services. The SAs in a bundle may terminate at different endpoints.

#### Key Management (IKE)

IKE is a protocol suite for establishing and maintaining SAs.

##### Phase 1

Two parties negotiate an SA. They agree on keying material and mechanisms.


##### Perfect Forward Secrecy (PFS)
A property of key-agreement protocols ensuring that a session key derived from a set of long term keys cannot be compromised if one of the long-term keys is compromised in the future. The key used to protect transmission of data must not be used to derive any additional keys, and if the key used to protect transmission of data is derived from some other keying material, then that material must not be used to derive any more keys. In this way, compromise of a single key permits access only to data protected by that single key.

The trick to achieving Perfect Forward Secrecy is to generate a temporary session key, not derivable from the information stored at the node and forgotten after the session concludes.


### SSL

The SSL protocol provides communications privacy over the Internet. The protocol allows client/server applications to communicate in a way that prevents eavesdropping, tampering, or message forgery.

**Goals**:

 * Secrecy
 * Integrity
 * Authentication (optionally mutual)

Works by setting up a one (or two) way authentic channel for secret communication using public-key certificates.

It consists of various subprotocols which run on top of TCP:

 * **SSL Handshake**: Initiates a connection.
 * **SSL Record**: Protocol for sending application data.

An **SSL Session** is an association between the client and server with an associated state that specifies encryption method, and server MAC secrets, encryption keys, etc. An **SSL connection** is basically a secure stream within a session.


#### Handshake

* {{<latex i="\text{Sid}" />}}: Session identifier.
* {{<latex i="\text{Pa}" />}}: A list of {{<latex i="A" />}}'s preferences for encryption and compression (e.g. Diffie-Hellmann, RSA).
* {{<latex i="\text{Pb}" />}}: is chosen from {{<latex i="\text{Pa}" />}}.

1. Establish security capabilities:
    * Client sends Hello: {{<latex i="A \rightarrow B: \text{Na}, \text{Sid}, \text{Pa}" />}}.
    * Server responds with Hello: {{<latex i="B \rightarrow A: \text{Nb}, \text{Sid}, \text{Pb}" />}}.
2. Exchange server certificate:
    * Server sends certificate: {{<latex i="B \rightarrow A: \text{certificate}(B, K_B)" />}}.
3. Client key exchange:
    * *Optional* Client certificate: {{<latex i="A \rightarrow B: \text{certificate}(A, K_A)" />}}
    * Client Key Exchange: {{<latex i="A \rightarrow B: \left \{ \text{PMS} \right \}_{K_B}" />}}
    * *Optional* Certificate verify: {{<latex i="A \rightarrow B: \left \{\text{hash}(...)\right \}_{K_A^{-1}}" />}}
5. Finish establishing connection:
    * Client finished: {{<latex i="A \rightarrow B: \left \{ \text{Finished} \right \}_\text{clientK}" />}}
    * Server finished: {{<latex i="B \rightarrow A: \left \{ \text{Finished} \right \}_\text{serverK}" />}}

#### Interpretation

The heart of this protocol are the exchanges:

 1. **server certificate**: {{<latex i="B \rightarrow A: \text{certificate}(B, K_B)" />}}
 2. **client key exchance**: {{<latex i="A \rightarrow B: \left \{ \text{PMS} \right \}_{K_B}" />}}

 If {{<latex i="A" />}}`shares one-sided key with a trusted CA and has a communication channel with `{{<latex i="B" />}} then (1) promotes this to an authentic channel.

 In (2), a non-authenticated agent {{<latex i="A" />}} sends keying material to {{<latex i="B" />}}. Effect of encryption/MAC-ing with this can be understood as follows:

  * When {{<latex i="A" />}} subsequently sends: we have a *sender invariant* channel.
  * When {{<latex i="B" />}} subsequently responds: channel is *receiver invariant*.
  * Both yield essentially a *secure channel with a pseudonym*. This cannot be promoted to a secure channel, where the sender's identity is authenticated. Therefore, SSL is often followed by additional client authentication.

---

## Lecture 8 - Privacy and Anonymity

**Privacy**: A state in which one is not observed or disturbed by others. *You choose what you let other people know*.

**Anonymity**: *A condition in which your true identity is not known*. **Unlinkability and Unobservability**.

Anonymity is difficult on a public network as **packet headers** identify recipients and **packet routes** can be tracked via traffic analysis.

An **Anonymity Set** is a group in which your actions cannot be distinguished from others in the group.

It is possible to attack Anonymity by:

 * Passive traffic analysis. By infering who is talking to whom. **The only way to hide your traffic is to carry other people's traffic**
 * Active traffic analysis. By Injecting packets.
 * Compromise of network nodes. It is best not trust any nodes.


### Proxies

Sending packets can be sent through a proxy which communicates with external server. It carries many people's traffic so enables some anonymity.

**Weaknesses**:

 * The proxy knows everything.
 * Traffic analysis is possible.

#### Cascaded Proxies with encryption

Assuming a client shares a key with proxy a single proxy solution is:


![alt text](https://drive.google.com/uc?export=view&id=0B8i5iuobK6DgVkZsOVZWT096WnM "Single Proxy with Encryption")

{{<latex i="k_p(M, S)" />}}: client {{<latex i="C" />}} encrypts message {{<latex i="M" />}} for proxy using proxy's public key `{{<latex i="k_p" />}} along with server address {{<latex i="S" />}}.

![alt text](https://drive.google.com/uc?export=view&id=0B8i5iuobK6DgNFhZMTVwcjNRTk0 "Chained Proxy with Encryption")

Traffic analysis is still possible.


### Mix Networks

Uses Public-key cryptography plus a trusted re-mailer (Mix). Public keys are used as persistent pseudonyms. It is designed to work in an environment with an active attacker whom:

1. Can learn original, destination(s), and representation of all messages in the communication system.
2. Can inject, remove, or modify messages.
3. However, cannot determine anything about the correspondences between a set of encrypted items and the corresponding set of unencrypted items or create forgeries.

A **Mix** is a server the processes (mail) items.

An adversary can know all senders and receivers, but cannot link a sent message with a received message.

To **foil traffic analysis**:

* Agents/mixes work with uniformly sized items (all messages are fixed sized blocks).
* The order of arrival is hidden by outputting items in batches.
* Repeated information must be blocked.
* Sufficient traffic from a large anonymity set is required. This solution involves clients regularly exchanging dummy messages.

#### Functionality of a Mix

![alt text](https://drive.google.com/uc?export=view&id=0B8i5iuobK6DgSk5tdlJxZHBna2c "Mix Functionality")

#### Generating Receipts

A mix can return a receipt {{<latex i="Y" />}} for messages received.

{{<latex>}}
Y = \left\{ c, \left\{ r_1, \left\{ r_0, M \right\}_{\text{pk}(B)}, B \right\}_{\text{pk}(\text{mix})} \right\}_{\text{priv}(\text{mix})}
{{</latex>}}

where {{<latex i="c" />}} is some large, known constant (e.g. string of zeros).

A participant can later prove he sent the message by supplying:

{{<latex>}}
X = \left\{ r_0, M \right\}_{\text{pk}(B)}, B
{{</latex>}}

as well as the retained string {{<latex i="r_1" />}}.

**The proof of receipt**:

{{<latex>}}
\left\{ Y \right\}_{\text{pk}(\text{mix})} = c, \left\{ r_1, X \right\}_{\text{pk}(\text{mix})}
{{</latex>}}

#### Weaknesses

A single mix has the same weakness as a single proxy. i.e. If you can compromise it, you know everything. The weakness can be lessened by forming a **mix network (or cascade)** where messages are sent through a sequence of mixes.

In a **Mix Network**, a sender prepares an item for every Mix in the cascade. Each mix then peals off(decrypts) the outermost layer, forwarding the resul. The Final mix processes the same data as in a single mix case.


#### Applying mixes to E-voting

A **digital pseudonym** can be given a public key used to verify signatures of an anonymous holder. A **roster** is a list of pseudonyms, which is publicised. Building a roster is nontrivial problem.

Voting can take place where votes are anonymously emailed with a digital pseudonym {{<latex i="K" />}}. Authorities **and public** can eliminate duplicates and tally votes without revealing voter identity.

#### Summary

**Advantages**:

 * Very high degree of anonymity.
  * No correlation between mix input and output.
  * Only some nonzero fraction of mixes need to be honest.
  * With enough dummy traffic, the anonymity set is the entire network.
 * Cryptography is used in a novel way.
  * With anonymous response, sender is anonymous even to the receiver.
  * Can also be used for anonymous "certified mail" where receipt is signed by receiver and every mix along the path.

**Disadvantages**:

 * Public-key encryption and decryption at each mix ad computationally expensive.
 * The dummy messages overhead.
 * There is high latency, which is okay for emails but not web browsing.


### Onion Routing

Hides a message source by routing it randomly. Routers don't know for sure if the apparent source of a message is the true sender or another router.

* The sender chooses a random sequence of routers. Some are honest, others can be controlled by an attacker.
* The routing info for each link is encrypted with the router's public key. Therefore, each router only learns the identity of the next router.


#### TOR Circuit setup
A client proxy establishes a symmetric session key and circuit with *Onion Router #1*. The client can then extend its circuit by establishing a symmetric session key with *Onion Router #2* by tunnelling through *Onion Router #1*. The client can further extend its circuit by establishing a symmetric session key with *Onion Router #3* by tunnelling through *Onion Router #1* and *Onion Router #2*. and so on. Datagrams are then decrypted and reencrypted at every link.


* Many application can share one circuit.
* TOR router doesn't need root privileges which encourages people to set up their own routers.
* Directory servers maintain a list of active onion routers etc. It controls how new routers join the network.

### Location Hidden Servers

A **Location hidden server** is one which is on the internet that anyone can connect to without knowing where it is or who runs it.

* Accessible from anywhere.
* Resistant to censorship.
* Can survive full-blown DoS attacks.
* Resistant to physical attacks.

#### Creating a Location Hidden Server

1. A server creates **introduction points** (other nodes on an onion routed network).
2. The server gives the **introduction points**' descriptors and addresses to a service lookup directory.
3. Client obtains service descriptor and introduction point address from the directory.

#### Using a Location Hidden Server

1. Client creates a circuit to a **rendezvous point**.
2. Client sends the address of the **rendezvous point** and any authorisation to the server through an **introduction point**.
3. If the server chooses to talk to the client, it connects to the **rendezvous point** which then the client and server circuits.

### Dining Cryptographers

A clever idea on how to make a message public in a perfectly untraceable manner. It guarantees information-theoretic anonymity for message senders. This is an **unusually strong** form of security where it defeats an adversary with unlimited computational power.

The Dining cryptographers problem presents a situation where there are **3 cryptographers** having dinner. Either the NSA is paying for dinner, or one of them but they wish to remain anonymous.

1. Each diner flips a coin and shows it to their left neighbour. Every diner sees 2 coins, their own and their neighbour to the right.
2. Each diner announces whether the two coins are the same. If they are paying, they lie about the coins being the same.
3. If there is:
  * Odd number of *Same*, then the NSA is paying.
  * Even number of *Same*, then one of the cryptographers is paying. **A non-payer cannot tell which of the other two are paying.**

**Superposed sending**:
This idea generalises to any group of size {{<latex i="N" />}}.

1. For each bit of the message, every user generates 1 random bit and sends it to 1 neighbour. Every uses learns 2 bits (his own and his neighbour's).
2. Each user announces their own bit `XOR` neighbour's bit.
3. Sender announces own bit `XOR` neighbour's bit `XOR` message bit.

The `XOR` of all announcements = message bit. This is because every randomly generated bit occurs twice and gets cancelled by `XOR`. The message bit occurs once.

---

## Lecture 9 - Web Security

### HTTP Headers
On each request, a client sends a HTTP header to a server. Normally headers are sent unencrypted.

**HTTPS** sends headers encrypted. It is the result of layering HTTP on top of SSL/TLS protocol.

Can also contain private information:

* `FROM`: The user's email address.
* `AUTHORIZATION`: Contains **authentication** information.
* `COOKIE`: A piece of data given to the client by the server and returned by the client to the server in subsequent requests.
* `REFERER`: The page from which the client came from.

### Cookies

A cookie is a small piece of data sent from a website and stored in a user's web browser while the user is browsing that website.

Cookies were introduced to allow session management.

#### Privacy

Cookies have received lots of criticism as they can be used to track users. Privacy can also be attacked in other ways:

 * Server logs.
 * Eavesdropping traffic.
 * Enforcing proxies.
 * Revealing browser logs.

### Authentication

**Basic authentication**:

 * login/password based.
 * Information is sent unencrypted.
 * credentials sent on every request.
 * Supported by nearly all server/clients and thus widely used.

**Digest authentication**:

 * Server sends nonce.
 * Client hashes nonce based on login/password.
 * Client sends only crpytographic hash over the net.
 * Seldom used.

#### OWASP Top 10 Common

**Protection**:

 * Validate inputs against positive specification (e.g. allowed character sets, min/max length, numeric ranges). Only server side validation can prevent these attacks.

An attacker tries to execute code on the server.

### SQL Injection

1. Browser sends malicious input to server.
2. Bad input validation and sanitisation on server leads to malicious SQL query.

e.g. Attacker sends username/password:

SQL code looks like:

```
SELECT * FROM users WHERE user="$username" AND passwd="$password"
```

Attacker sends:

```
username: Admin
password: " OR "1" = "1
```

would become:

```
SELECT * FROM users WHERE user="Admin" AND passwd="" OR "1" = "1"
```

**Other intents**:

* Bypassing authentication
* Privilege escalation
* Extracting data
* Adding or modifying data
* Performing DoS

**Other mechanisms**:

* Injection through user inputs.
* Injection through cookies.
* Injection through server variables.


### JavaScript sandbox and same origin policy

The JavaScript sandbox:

 * No access to memory of other programs, file system, network.
 * Only the current document is accessible.
 * Might want to make exceptions for trusted code.

**Same origin policy**: Access is only granted to documents from the same site as the script.

 * Prevents hostile script from tampering other pages in the browser.
 * Prevents script from snooping on input in other windows.
 * Verify URLs of target document and script that access a resource.


### Cross-Site Scripting (XSS)

Bad website sends innocent victim a script that steals information from an honest website.

1. Attacker posts a malicious script that is stored on the victim website.
2. The malicious script is shown to a victim user.
3. Victim user enters credentials.
4. Malicious script sends those credentials to attacker.

#### Different types of XSS

 * Stored XSS: Injected script is stored permanently on target servers.
 * Reflected XSS: Injected script is delivered to user via another route. e.g. email. (User clicks on email link that has script in url)
 * DOM-based XSS: Attack payload is executed as a result of modifying DOM in victim's browser by the original client script. The client side code therefore runs in an **unexpected** way.

* User trusts a badly implemented website.
* Attacker injects a script into the trusted website.
* User's browser executes attacker's script.

### Cross-Site Request Forgery (CSRF)

Bad website sends browser request to good website, using credentials of an innocent victim.

A malicious script can make forged requests to the "good" site using a user's cookie.

* A badly implemented website trusts the user.
* Attacker tricks user's browser into issuing requests.
* Website executes attacker's requests.
