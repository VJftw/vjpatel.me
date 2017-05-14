+++
date = "2017-04-15T00:26:19+01:00"
title = "7CCSMNSE Network Security - Coursework 2"
markup = "mmark"
+++

## Coursework 2

### 1. What is a firewall?

### 2. What can a firewall protect from? What can't it protect from? Describe at least two examples of firewall limitations.

### 3. Describe packet-filter firewalls, explaining their advantages and disadvantages (give at least two each).

### 4. Describe the two possible default policies of packet-filter firewalls and give the two rules that formalize them.

### 5. Describe the following rule set.

| action  | src           | port  | dest  | port  | flags | comment
|---------|---------------|-------|-------|-------|-------|-----------
| allow   | {some hosts}  | *     | *     | 25    |       | ...
| allow   | *             | 25    | *     | *     | ACK   | ...

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
