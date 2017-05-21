+++
date = "2017-04-15T00:26:19+01:00"
title = "7CCSMNSE Network Security - Coursework 2"
markup = "mmark"
+++

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

**Discard**: `BLOCK * * * *`

**Forward**: `ALLOW * * * *`

### 5. Describe the following rule set.

| action  | src           | port  | dest  | port  | flags | comment
|---------|---------------|-------|-------|-------|-------|-----------
| allow   | {some hosts}  | *     | *     | 25    |       | ...
| allow   | *             | 25    | *     | *     | ACK   | ...

This allows some external mail servers to send SMTP mail to the internal network. It allows SMTP connections outbound.

### 6. Consider the following packet filter firewall rule set for an imaginary network of IP addresses that range from 192.168.1.0 to 192.168.1.254. Describe the effect of each rule.

| # | action  | src           | port  | dest        | port  | ...
|---|---------|---------------|-------|-------------|-------|------
| 1 | allow   | *             | *     | 192.168.1.0 | >1023 | ...
| 2 | deny    | 192.168.1.1   | *     | *           | *     | ...
| 3 | deny    | *             | *     | 192.168.1.1 | *     | ...
| 4 | allow   | 192.168.1.0   | *     | *           | *     | ...
| 5 | allow   | *             | *     | 192.168.1.0 | SMTP  | ...
| 6 | allow   | *             | *     | 192.168.1.2 | HTTP  | ...
| 7 | deny    | *             | *     | 192.168.1.3 | *     | ...

### 7. Describe two attacks to packet-filter firewalls and the possible countermeasures.


### 8. Describe stateful packet-filter firewalls, explaining their advantages and disadvantages.


### 9. Describe application-level gateways, explaining their advantages and disadvantages (give at least two of each).

### 10. Describe circuit-level gateways.


### 11. What is a bastion host?


### 12. What is a DMZ network, where can it be put in a firewall configuration, and what types of systems would you expect to find on a DMZ network?

### 13. What is a VPN?
