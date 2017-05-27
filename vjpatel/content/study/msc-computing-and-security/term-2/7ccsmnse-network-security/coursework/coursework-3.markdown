+++
date = "2017-04-15T00:26:19+01:00"
title = "7CCSMNSE Network Security - Coursework 3"
markup = "mmark"
+++

## Coursework 3

### 1. Which are the 3 main subprotocols of IPsec and what security properties do they provide?

* **Authentication Header (AH)**: Protects the integrity and authenticity of IP datagrams.
* **Encapsulating Security Protocol (ESP)**: Protects the confidentiality and optionally integrity of IP datagrams.
* **Internet Key Exchange (IKE)**: Key management.

### 2. Describe at least 3 benefits of using IPsec.

* It gives transport layer security without modification to applications.
* Allows security agnostic applications to be used securely.

### 3. In the context of IPsec, what is a Security Association?

A security association is a one-way relationship between sender and receiver defining security services. e.g. $$\text{Alice} \rightarrow \text{Bob}: \text{Encrypt with 3DES; Authenticate with MD5}$$

### 4. What is the role of the database SAD and SPD in IPsec?

The security association database is used to record the security association peer IPs are using. the security policy database is used to define which security associations a range of IPs are allowed to use.


### 5. Describe how IPsec processes outbound and inbound traffic.

**Outbound**:

1. When data is passed down from a higher layer, an IP packet is formed.
2. IPSec searches the Security Policy Database (SPD) for a match to this packet.
    * If no match is found, the packet is discarded and an error message is generated.
    * If a match is found, further processing is determined by the first matching entry in the Security Policy Database (SPD). If the policy matches:
        * `DISCARD`: The packet is discarded.
        * `BYPASS`: There is no further  IPSec processing and the packet is forwarded to the network for transmission.
        * `PROTECT`: The Security Association Database (SAD) is search for a matching entry.
            * If no entry is found, Internet Key Exchange (IKE) is invoked to create a Security Association with the appropriate keys.

**Inbound**:

1. IPSec examines inbound packets to determine whether they are an unsecured IP packet or one that has ESP or AH headers.
  * If the packet is **unsecured**, IPsec searches the Security Policy Database (SPD) for a match to this packet. If the policy matches:
      * `BYPASS`: The IP header is processed and stripped off and the packet body is delivered to the higher layer (Transport).
      * `PROTECT` or `DISCARD`: The packet is discarded.
  * If the packet is **secured**, IPSec searches the Security Association Database (SAD):
      * If no match is found, the packet is discarded.
      * Otherwise, IPSec applies appropriate ESP or AH processing; the IP header is processed and stripped off and the packet body is delivered to the higher layer (Transport).

### 6. Describe how the protocol AH works in transport mode and how it works in tunnel mode.

### 7. Describe how the protocol ESP works in transport mode and how it works in tunnel mode (consider only the case of IPv4).

### 8. What is Perfect Forward Secrecy and how can it be achieved?

### 9. What are the main objectives of the IKE protocol?


### 10. Describe the SSL Handshake protocol, illustrating all of its different steps.
