---
date: "2017-04-15T00:26:19+01:00"
course: "MSc Computing and Security"
module: "7CCSMNSE Network Security"
title: "Coursework 2"
---

## Coursework 2

### 1. What is a firewall?

A firewall is a computer or network security system that sits between your internal network and the rest of the network. It attempts to prevent bad things from happening without preventing good things from happening.

### 2. What can a firewall protect from? What can't it protect from? Describe at least two examples of firewall limitations.

A firewall can protect from the direction of which services are used. e.g. You may allow HTTP requests to be sent (web browsing) but not serve HTTP requests out (host a web server).

A firewall **cannot** protect against:
 * Attacks that bypass a firewall (side doors).
 * Malware imported via a laptop.

### 3. Describe packet-filter firewalls, explaining their advantages and disadvantages (give at least two each).

A packet-filter firewall applies a set of rules to each incoming and outgoing IP packet and forwards or discards the packet.

It's advantages are that it is the fastest and simplest firewall.

However it's disadvantages are:
* It does not examine upper-layer data.
* There is limited log information.
* It is vulnerable to spoofing addresses.
* Due to a small of variables used in decisions, they are most susceptible to security breaches due to improper configuration.


### 4. Describe the two possible default policies of packet-filter firewalls and give the two rules that formalize them.

**Discard**:  that which is not expressly permitted is prohibited.

| Action | Src | Port | Dest | Flags | Comment |
| ------ | --- | ---- | ---- | ----- | ------- |
| Block  | *   | *    | *    | *     | ...     |

This is a more conservative policy. Initially, everything is blocked and services must be added on a case-by-case basis. Users will see the firewall as more of a hindrance, but is more likely to be preferred by businesses and government organisations.

**Forward**: that which is not expressly prohibited is permitted.

| Action | Src | Port | Dest | Flags | Comment |
| ------ | --- | ---- | ---- | ----- | ------- |
| Allow  | *   | *    | *    | *     | ...     |

This policy may be used by more open organisations, such as univerisites.

### 5. Describe the following rule set.

| action | src          | port | dest | port | flags | comment |
| ------ | ------------ | ---- | ---- | ---- | ----- | ------- |
| allow  | {some hosts} | *    | *    | 25   |       | ...     |
| allow  | *            | 25   | *    | *    | ACK   | ...     |

The first rule allows **some hosts** to send IP packets destined for port 25 at any destination. The second rule allows incoming packets from any host and port 25 with the `ACK` flag set to any destination host on any port.


### 6. Consider the following packet filter firewall rule set for an imaginary network of IP addresses that range from 192.168.1.0 to 192.168.1.254. Describe the effect of each rule.

| #   | action | src         | port | dest        | port  | ... |
| --- | ------ | ----------- | ---- | ----------- | ----- | --- |
| 1   | allow  | *           | *    | 192.168.1.0 | >1023 | ... |
| 2   | deny   | 192.168.1.1 | *    | *           | *     | ... |
| 3   | deny   | *           | *    | 192.168.1.1 | *     | ... |
| 4   | allow  | 192.168.1.0 | *    | *           | *     | ... |
| 5   | allow  | *           | *    | 192.168.1.0 | SMTP  | ... |
| 6   | allow  | *           | *    | 192.168.1.2 | HTTP  | ... |
| 7   | deny   | *           | *    | 192.168.1.3 | *     | ... |

1. Allow return TCP connections to internal subnet.
2. Prevent firewall system itself from directly connecting to anything.
3. Prevent external users from directly accessing the firewall system.
4. Internal users can access external servers.
5. Allow external users to send email in.
6. Allow external users to access WWW server.
7. Everything not previously allowed is explicitly denied.

### 7. Describe two attacks to packet-filter firewalls and the possible countermeasures.

Two attacks and countermeasures to packet-filter firewalls are:
* IP address spoofing: where an Attacker could transmit packets from the outside with the source set as an internal address. This can be countered by dropping inbound packets that are *apparently* an internal IP address.
* Tiny fragment attacks: An attacker can send small fragments of a packet in the hope to bypass a packet-filter that makes decisions on the first packet fragment. This can be countered by dropping fragmented packets or reassembling them before making a decision.


### 8. Describe stateful packet-filter firewalls, explaining their advantages and disadvantages.

A stateful packet-filter firewall keeps track of current TCP connections in a directory. There is an entry for each currently established connection. The packet-filter will only allow incoming traffic to high-numbered ports that fit the profile of a TCP connection in the directory. A disadvantage is that it is slower than a packet-filter firewall.


### 9. Describe application-level gateways, explaining their advantages and disadvantages (give at least two of each).

An application-level gateway acts as a relay of application-level traffic which has full access to the protocol. It does not permit an end-to-end connection.

1. The user contacts the gateway using a TCP/IP application (e.g. FTP, Telnet).
2. The gateway asks user for the name of remote host to be accessed.
3. The user responds and provides valid user ID and authentication information.
4. The gateway contacts the application on the remote host and relays TCP segments containing application data.

Two advantages for this are:
 * They tend to be more secure because they work by whitelisting applications as proxy code needs to be written per application.
 * It is easy to log and audit all incoming traffic at the application level.

Two disadvantages are:
 * There is additional processing overhead on each connection.
 * We need separate proxies for each service.

### 10. Describe circuit-level gateways.

A circuit-level gateway sets up and relays 2 TCP connections. One of which is between itself and the inner host; and the other is between itself and the outside host. Once a connection is established, the gateway typically relays TCP segments without examining their contents. It is typically used when the administrator trusts internal users as it allows general outbound connections.

It does not permit an end-to-end TCP connection.

The gateway can configured to support application-level proxies.


### 11. What is a bastion host?

A bastion host is a system identified by the firewall administrator as a critical strong point in the network's security. It typically serves a platform for an application-level or circuit-level gateway. It is potentially exposed to hostile elements and is secured to withstand those.


### 12. What is a DMZ network, where can it be put in a firewall configuration, and what types of systems would you expect to find on a DMZ network?

A DMZ network is a DeMilitarised Zone. It is the area between an external and internal firewall which consist of systems which are externally accessible but need some protection. e.g. a web site, email server, dns server.

The external firewall provides access control and protection for systems in the DMZ (e.g. allow HTTP inbound) and a basic level of protection for the rest of the network.

The internal firewall provides stricter filtering of inbound connections (e.g. deny HTTP inbound) and prevents internal attacks from the remainder of the network and attacks to the internal network from the DMZ.

### 13. What is a VPN?

VPN stands for Virtual Private Network. It is a network of private computers connected over an insecure network (the internet) using encryption and special protocols to provide security.
