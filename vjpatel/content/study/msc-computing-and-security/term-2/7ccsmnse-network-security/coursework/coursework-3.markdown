+++
date = "2017-04-15T00:26:19+01:00"
course = "MSc Computing and Security"
module = "7CCSMNSE Network Security"
title = "Coursework 3"
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

In transport mode, the Authentication Header (AH) protocol provides end-to-end protection between IPSec enabled systems. It inserts the Authentication Header after the original IP header and before the Transport Header.

In tunnel mode, the Authentication Header (AH) protocol provides the entire packet to be authenticated. The AH header is inserted before the original IP header, and after a new IP header. The inner IP header carries the ultimate destination for the packet.


### 7. Describe how the protocol ESP works in transport mode and how it works in tunnel mode (consider only the case of IPv4).

In transport mode, the ESP header provides end-to-end encryption between hosts that support IPSec.

In tunnel mode, the ESP header can be used to set up a VPN by terminating tunnels at each gateway to internal networks. Hosts are able to avoid implementing secure communication themselves with this method.

### 8. What is Perfect Forward Secrecy and how can it be achieved?

Perfect forward secrecy is a property of key establishment protocols ensuring that a session key derived from long term keys cannot be compromised given that a long term key is compromised in the future. To achieve this we generate temporary session keys that are discarded at the end of the session and cannot be derivable from any information on a node.

### 9. What are the main objectives of the IKE protocol?

The Internet Key Exchange (IKE) protocol aims to establish and maintain Security Associations (SAs). In Phase 1, the two parties negotiate a Security Association.


### 10. Describe the SSL Handshake protocol, illustrating all of its different steps.

1. Establish security Capabilities:
    * `client hello` $A \rightarrow B: A, \text{Na}, \text{Sid}, \text{Pa}$
    * `server hello` $B \rightarrow A: \text{Nb}, \text{Sid}, \text{Pb}$
2. Exchange Server certificate:
    * `server certificate` $B \rightarrow A: \text{certificate}(B, K_B)$
3. Client Key Exchange:
    * **Optional** `client certificate` $A \rightarrow B: \text{certificate}(A, K_A)$
    * `client key exchange` $A \rightarrow B: \\{ \text{PMS} \\}_{K_B}$
    * **Optional** `client verify` $A \rightarrow B: \left \\{\text{hash}(...)\right \\}_{K_A^{-1}}$
4. Finish establishing connection:
    * `client finished` $A \rightarrow B: \left \\{ \text{Finished} \right \\}_{\text{client}K}$
    * `server finished` $B \rightarrow A: \left \\{ \text{Finished} \right \\}_{\text{server}K}$


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
