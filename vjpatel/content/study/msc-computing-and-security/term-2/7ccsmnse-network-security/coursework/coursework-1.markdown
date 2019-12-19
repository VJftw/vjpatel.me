+++
date = "2017-04-15T00:26:19+01:00"
course = "MSc Computing and Security"
module = "7CCSMNSE Network Security"
title = "Coursework 1"
+++

## Coursework 1

### 1. Which are the types of ports available in a computer?

A computer has hardware (physical) and software (virtual) ports.

### 2. What is a software port and what is its purpose?

A software port is a port that applications use to communicate over. It is in the range of 0-65535.

### 3. What is port scanning? What is the main goal of port scanning? Give an example of a port scanning attack strategy.

Port scanning is finding out which entry points (ports or services) are open. It is analogous to checking for open windows/entry points on a house.


### 4. What are the three main techniques for port scanning? For each of them give at least one advantage and one disadvantage.

There are 3 attack strategies for port scanning:
 * **Simple port scanning**: Attacker searches entire (65535) port range noting all open ports.
 * **Strobe port scanning**: Attacker searches limited port range noting all open ports.
 * **Stealth port scanning**: Attacker searches only a few random ports over a long period of time to avoid detection.


### 5. Name at least 3 different port scanning types and explain each of them in detail.

**SYN Scanning**: Performs a TCP 3 way handshake where if the server is listening it returns `SYN+ACK`, the client then sends `RST+ACK` and if it is not listening it returns a `RST`.

**SYN Scanning**: Does not complete the 3 way handshake in an attempt to avoid detection. It does not send the `RST+ACK`

**TCP Stealth Scan**: Instead of sending `RST+ACK`, it sends `RST` in an attempt to tear down the connection as quickly as possible to stop the attempt appearing in logs.


### 6. How can one protect against port scanning?

You can use **non-standard ports** and **port scanning sniffing** software to protect against port scanning.


### 7. What is packet forgery? What can it be used for and how can it be detected?

Packet forgery is the process of interfering with an established network connection, by means of constructing packets to appear as if they are part of the normal communication stream.

Packet forgery can be used for:
 * Man-in-the-middle attacks.
 * Denial of Service attacks.
 * Disrupting services (file sharing, HTTP).
 * Compromising Wireless Access Points.
 * Exploiting functionality in online games.
 * Determining the presence of internet censorship.
 * Allows for custom packet designers to test their packets.
 * Simulation of specific network traffic.
 * Testing of network firewalls and IDS.
 * Computer network auditing.

Packet forgery can be detected by:
 * Packet analysers and sniffers.
 * Packet log showing inconsistencies.
 * TCP resets sent to both access points.
