+++
date = "2016-10-13T23:26:19+01:00"
course = "MSc Computing and Security"
module = "7CCSMWIN Web Infrastructure"
title = "Notes"
latex = true
+++


## Internet Architecture Evolution

### Network Architecture

*A set of high-level design principles that guides the technical design of the network, espescially the engineering of its protocols and algorithms.*

A network Architecture must specify:

1. Where and how state is maintained and how its removed.
2. What entites are named.
3. How naming, addressing and routing functions inter-relate and how they are performed.
4. How communication functions are modularized. e.g. into "layers" to form a "protocol stack".
5. How network resources are divided between flows and how end-systems react to this division.
6. Where security boudaries are drawn and how they are enforced.
7. How management boundaries are drawn and selectively pierced.
8. How many difference QoS (Quality of Service) is requested and achieved.

### Internet Architecture

#### The End-to-End argument
intelligent edges and dumb network. The infrastructure should be as simple as possible. This allows new applications to be added without changing the core network.

Different end-to-end services are implemented by the transport (or application) layer above. Addresses are fixed sized numerical quantity (IPv4 -> IPv6).

**The network must also:**

- Support multiple types of services.
    - e.g. real time (the reason why TCP/IP is in two adjacent layers)
- Allow distributed management.
    - Each autonomous system can handle the IP traffic traversing the network.
- Allow host attachment with low level of effort
- Be cost effective
    - In terms of header overhead, retransmissions and routers capabilities.

##### What IP gives us today

 - *connectionless service* i.e. each datagram is independent of all others.
 - Equal treatment of all datagrams.
 - Unreliable: the is no guaranteed delivery.
 - Fragmentation/Reassembly based on MTU
 - Routing
 - Error detection (link layer)


### Quality of Service (QoS)

*QoS is the measure of how good a service is, as presented to the user. It is expressed in user understandable language and manifests itself in a number of parameters, all of which have either subjective or objective values.*

- Internet hasa single "best effort" class of service.
- No assurance of when or how many packets will be delivered, no admission control.
- Internet applications are very heterogenous in terms of delay requirements (some require tighter deadlines).
- New applications include real-time or interactive applications (video games).
- We need additional network support for real-time applications to support QoS.

#### QoS Performance Guarantees

 - Best effort
 - Negotiation and guarantees

 Type types of guarantee:

  - Statistica guratantee
    - Determined by average numbers observed over a period of time
  - Deterministic Guarantees
    - A limit is provided for the parameters
    - e.g.
        - Will not exceed X for the whole session.
        - Will not average above X over a certain session.
        - Will not exceed X over 5 times in a  certain session.

#### Different classes of service
3 separate queues on routers (one for each type) of differing priorities.

 - Guaranteed
    - Maximum delay and jitter specified.
    - Level of bandwidth guaranteed.
 - Controlled load
    - No firm guarantees provided.
    - But flow obtains a constant (reasonable) level of service.
 - Best effort
    - For applications that don't require QoS.


#### DiffServ and IntServ

##### Stateless Architecture (DiffServ)
Introduced to solve the scalability problem of IntServ. The basic philosophy is to cluster services based in the *traffic class* octet of IPv4 in order to mark a packet and receive a particular forwarding treatment (PHB).


##### Stateful Architecture (IntServ)

#### Resource Reservation (RSVP: ReSerVation Protocol)
Is primarilt for connection oriented networks.

During connection setup:

1. Request resources (e.g. Buffer space, connection bandwidth) from the network.
2. If the network has enough available resources to support the new connection, the connection will be established.
3. Otherwise the connection will be rejected.

##### Route Pinning
Problem: Asymmetric routes.

Solution: Use `PATH` to remember the direct path from S -> R (route pinning).

---

## Transmission Control Protocol (TCP)
Resides on the Transport layer, offering *flow control*, *congestion control* and *congestion avoidance*. TCP establishes an end-to-end *full-duplex* connection between nodes which is maintained by the **end-points** and not by the network itself.

**Provides**:

- Application addressing via port numbers.
- Reliable delivery - Ensures that all information sent is received.
- In-order delivery - Data is delivered to an application in the same order it was sent.
- Flow control - Sending transmission rate should not exceed receiving applications processing rate.
- Congestion control - Ensuring that congestion in the internet remains at an acceptable level. This is the most important functionality and the reason why the internet has not collapsed under the expontentially increasing rates of traffic over the years.

The size of a TCP packet is dependent on the Maximum Segment Size (MSS), typically between 536-1500 bytes.


- When a packet is transmitted a timer is maintained waiting for the other end to acknowledge the packet (ACK).
- TCP maintains a checksum in the header to detect errors.
- The receiver must be able to discard duplicate packets.

### TCP Structure

| IP Header | TCP Header | Payload |
| --------- | ---------- | ------- |
| 20 bytes  | 20 bytes   |


- **Sequence number**:
- **Acknowledgement number**:
- **Window size**:

A 5-tuple identifies a connection:
1. Source IP address
2. Source port number
3. Destination IP address
4. Destination port number
5. Protocol type (e.g. TCP)

**TCP uses a 3-way handshake to establish a connection**:
1. Client sends `SYN` to server
2. Server acknowledges (`ACK`) `SYN` packet and sends a new `SYN` packet to client.
3. Client acknowledges (`ACK`) `SYN` packet received from server.

**Connection termination**:
1. Client sends `FIN` to server.
2. Server sends `ACK` of received `FIN` to client.
3. Server sends `FIN` to client.
4. Client sends `ACK` of received `FIN` to server.

### Window based flow control

#### Sliding Window protocol

Window size minimum of:

 - Receivers advertised window (buffer of receiver)
 - Congestion window (determined by sender)

 The ack-clock helps maintain an *equilibrium* by sending new data when old data is `ACK`'d.

### Window based congestion control

- Congestion windows size bounds the amount of data that can be sent per-roud-trip (RTT)

- For window size {{<latex i="W" />}}, the achievable throughput {{<latex i="T" />}} will be: {{<latex i="T <= \frac{W}{RTT}" />}}.
- If {{<latex i="\text{Ideal size} = \text{delay} \times \text{bandwidth}" />}}: Delay bandwidth product.
- If {{<latex i="\text{window size} < \text{delay} \times \text{bandwidth}" />}}: Wasted bandwidth
- If {{<latex i="\text{window size} > \text{delay} \times \text{bandwidth}" />}}: Queueing at routers and potentially packet loss.

#### Detecting packet loss

We can detect packet loss via retransmission timeouts (RTO) and duplicate acknowledgements.

##### Using RTO (retransmission timeout)
At any time, TCP sets retransmission timer for only one packet. If the `ACK` failed for the timed paccket, it is assumed that the packet is lost. The RTO is dynamically calculated!

- **Exponential Backoff**: Double RTO on each timeout.
- **Fast retransmission**: Duplicate `ACK`s could mean packet loss or out of order delivery. TCP sender assumes packet loss has occured if it receives three duplicate `ACK`s in a row.

**Congestion Control**: On detecting packet loss, TCP sender assumes network congestion has occurred. On detecting packet loss, TCP reduces the congestion window (cwnd). Reducing the window reduces the amount of data sent per RTT, thus decreasing the throughput.

**Congestion Avoidance**: Start with a period called *slow start* where the congestion window is 1 MSS (Maximum Segment Size). The period ends when a threshold is reached. We double the window size for each round.


---

## Hypertext Transfer Protocol (HTTP)

Is designed for communicating enriched documents between computers on the application layer.

### Request-Response Chains

A chain of intermediary nodes can be placed between client and server, to partly process messages, pass firewalls etc. (Black boxes). A clients request is passed through the chain until it reaches the final server. The server's response is then passed back down the chain to the client. The intermediary nodes can provide caching, translation and other features.

#### Proxies

A Proxy acts on behalf of other clients and presents requests from other clients to a server. The proxy appears as a server to the client and a client to the server and have 2 main uses:

 - **Security intermediary**: The proxy may offer secured access to the external internet.
 - **Different versions of HTTP**: If the client and server are running different versions of HTTP, the proxy can translate between them.

#### Gateways

A client talks to a gateway host as if it is the final server. The gateway passes this data onto the final server.

A gateway is a server that appears to the client as if it were an origin server. It acts on behalf of other servers that may not be able to communicate directly with a client and have 2 main uses:

 - **Security intermediary**: The client and server may be separated by a security intermediary such as a firewall, with the gateway on the server side of the firewall. Typically, the server is connected to a network protected by a firewal, with the client external to network.
 - **Non-HTTP Server**: Web browsers have capabilities to use different protocols (FTP, etc.). This capability can be provided by a gateway.


#### Tunnel
The client talks to the server as if the tunnel wasn't there. The tunnel performs no operations and only forwards messages.

Tunnels are used when there must be an intermediary system between the client and server *but it is not necessary for that system to understand the contents of messages*.


### Heavy Tail Distributions
Are probability distributions whose tails are not expontentially bounded; that is, they have heavier tails than the exponential distribution.

When applied to network traffic, these laws can be simplified to amplify the following 80-20 rule: *80% of the work is brought by 20% of the flows; in particular, 80% of internet packets are generated by 20% of the flows.*

Given the heavy-tailed nature of the internet flows-size distribution, one expects that incorporating flow size information in router, switch and caching algorithms will lead to improvements in performance. Such understanding means that will need to differentiate traffic per flow which will take us back to the discussions on providing QoS in the Internet.

### Pipelining

For efficiency, when a client has multiple requests to a server, it can pipeline them by sending the requests without having to wait for a resonse in between. The client ends a pipeline connection with `connection: close`

#### HTTP/1.0 (Non-persistent)

- One request/response per TCP connection
- Simple to implement
- Multiple connection setups (3-way handshake each time)
- Several extra round trips per transfer (2 RTTs to fetch an object)
- Multiple slow starts

#### HTTP/1.1 (Persistent)

- Multiple request/responses per TCP connection
- Client sends requests for all referenced objects as soon as it receives base HTML.
- Fewer RTTs, less slow start
- Server leaves connection open after sending response.


### HTTP Requests

#### Conditional `GET`
Request for only newer copy than cached.

1. The client can specify a date of cached copy in the request with `if-modified-since: <date>` header.
2. The server returns a status code with no content if the cached copy is up to date `HTTP 304 Not Modified`.


---

## TCP over Wireless

**Issues with Wireless Packet Transmission**:

 - Limited bandwidth/overall throughput
 - Short flows
 - Higher Bit Error Rate (BER)
 - Long Round trip times might lead to timeouts
 - Packet loss due to:
  - corruption of packets
  - sometimes congestion, not often but exists in higher-speed networks such as LTE
  - Wireless policies
  - Slow transmission

**Congestion avoidance** can be triggered by **packet loss**, therefore the performance of applications suffer.

### Solution Design

**Issues**:

- At which part of the network to implement a solution? Could be: sender, received, wired parts, wireless parts, proxies etc.
- At which layer to implement the solution? MAC layer (make the wireless link more reliable using link-level ACKs) or the TCP layer (making TCP aware of wireless loss).


#### Approaches

#### Link-layer
Hide packet losses which are not due to congestion from the sender by making the link appear to be more reliable.

**Advantages**:
 - Requires no change to existing sender behaviour.
 - Matches layered protocol model.

**Problems**:
 - Interactions with TCP, e.g. fast retransmission can be triggered by delays due to link-level time-out and retransmission.

#### Split-connection
Hide the wireless link entirely by terminating the TCP connection at the base station prior to the wireless link. We then use a special protocol or regular TCP over the wireless link. (Indirect TCP)

**Problems**:
 - Extra protocol overhead.
 - Violates end-to-end semantics of TCP.
 - Complicates handoff due to state information at the access point or base station where the protocol is *split*.

##### Indirect TCP

**Handover in Indirect TCP**: If the mobile host moves to a different proxy, the full TCP state will need to be transferred (Buffered data, sequence numbers and port).

**Indirect TCP advantages**:
 - Does not require changes to TCP at hosts in the fixed network.
 - Errors from wireless link are corrected at the TCP proxy and thus, do not propagate through the fixed network.
 - New protocol only affects a small part of the internet.
 - **Makes Optimisation possible** over the wireless link:
  - Variance in delay between proxy and mobile host.
  - Header compression etc.
  - Different transport protocol.

**Indirect TCP disadvantages**:
  - Loss of TCP's end-to-end semantics.
  - **Handoff overhead can be significant**
  - Overhead at proxy for per packet proccessing
  - TCP proxy must be trusted.

#### End-to-end (Snoop TCP)

Provides a reliable link layer that is TCP aware. There is a snoop agent at the access point which buffers data at the end of links for retransmission. It *snoops* on ACKs and filters duplicate ACKs.

The main idea is that the snoop agent discards duplicate ACKs from the mobile host.

**Advantages**:

 - Preserves End-to-end semantics.
 - Requires no changes in TCP for fixed hosts.
 - Automatic fallback to standard TCP.

**Disadvantages**:

 - Does not fully isolate wireless link errors from the fixed network.
 - Mobile host must be modified to handle NACKs for reverse (mobile to fixed) traffic.
 - Cannot snoop encrypted datagrams, therefore cannot be used when security is needed.

---

## Caching

We should cache content because:

 - **Client**: Avoid extra network transfers, speeding up access to content.
 - **Web Server**: Reduced load, cheaper and more efficient.
 - **Service Provider**: Reduced traffic, cheaper and more efficient.

Caching works because users tend to request the same object in succession and some objects are requested by many users.

### Local Caching (Browser)

Browsers have a local cache mechanism. e.g. When you press the back button, the browser loads the page from the local cache instead of requesting it again.

### Web Cache

When a web cache retrieves content from a server, it decides whether or not to copy the object to its local object store using *replacement* rules and *dynamic object* rules. *Replacement* rules is the general scheme that decides which objects to replace in the cache when it is full. *Dynamic object* rules examine the characteristics of an object to estimate its future value in the cache.

#### Replacement Rules

 - **Least Recently Used(LRU)**: Replace the object that has not been requested for the longest time.
 - **First in, First Out(FIFO)**: Replace the oldest object.
 - **Least Frequently Used(LFU)**: Replace the object that has the fewest requests.
 - **Next to Expire(NTE)**: Replace the object that is next forecast to expire.
 - **Largest File First(LFF)**: Replace the largest object. This will free up the most space for new objects.

#### Dynamic Object Rules

Use conditional `GET` requests.


### Proxies

#### Forward Proxy

Acts on behalf of a specific group of content consumers.

1. Client sends request to forward proxy:
```
GET http://www.content-networking.com/index.html
HTTP/1.1. Host: www.content-networking.com
User-Agent: Mozilla/6.0
Accept: text/html, image/gif, image/jpeg
```

2. The proxy doesn't currently have the content and thus makes the request that the client asked to `www.content-networking.com`.
3. `www.content-networking.com` responds with the `index.html` object and the proxy caches it.
4. The proxy responds to the client with the requested object.
5. When another client requests the same object from the proxy later, the proxy responds with the requested page in its cache.

**Advantages**:
 - As workgroup members are likely to have common interests, they will visit the same websites which results in more cache hits.
 - As there are more cache hits, the majority of traffic will be in the local network where it is faster and cheaper.
 - It is easy to install.

**Disadvantages**:
 - Users have to manually configure their clients to use the proxy.
 - Non-members who know the address of an unsecured proxy get a free-ride.

#### Reverse Proxy

Acts on behalf of the origin server and helps servers deliver content.

1. Client requests content. Request arrives at reverse proxy but object is not stored.
2. The proxy forwards the request to a server in a pool using an algorithm (e.g. round-robin).
3. Server responds to proxy, which copies the object to its cache.
4. Proxy responds to client across the internet with requested object.
5. Another client requests the same content. The proxy responds with the object stored in its cache.

**Advantages**:
 - Greatly reduced load on origin servers.
 - Improves scalability. More proxies could be added for cached content, rather than origin servers.

**Disadvantages**:
 - Performance savings may not be great to the client. The WAN traffic is not reduced and proxy needs to have good performance.

#### Interception Proxy

Serves network traffic delivered to it.

Commonly used by ISPs to save upstream bandwidth.

**Advantages**:
 - Cache hits are delivered to the client quickly as users tend to choose an ISP that is located close by.
 - Delays caused by origin servers are avoided.
 - Reduced need for WAN bandwidth between the ISP and content providers.


### Estimating Cache Hit Ratios

When engineering a network, it is important to estimate the savings a cache can provide.

The factors we need to include are:
 - The number objects available on the Internet.
 - The size of the cache object store.
 - The average size on an object.
 - The expiration time of an object.
 - The fraction of objects that can be accurately cached. (Their cacheability)
 - The popularity distribution of objects on the Internet.


### Internet Cache Protocol (ICP)

Intended as a fast way to discover which cache has a certain object stored. Caches exchange ICP queries in order to learn which cache (if any) is most likely to have the object stored. The HTTP request is then sent to the identified cache to retrieve the object.

This protocol is implemented over `UDP` in order to speed up queries and minimise traffic. Caches can be identified as *siblings* or *parents*.

1. Client sends request for object to cache.
2. Cache does not have object, so it asks its *siblings* using ICP.
3. If any sibling responds with a hit message, the cache forwards the client's object request to the sibling. If no siblings respond, continue to 4.
4. The cache (Local Cache - LC) requests the object from the Parent Cache (PC).
5. The Parent Cache either responds with the object if it has it cached, or sends the request to the origin server and caches the response.
6. The Local Cache caches the response from the PC and sends the response to the client.

---

## Domain Name System (DNS)

DNS is used to translate a hostname into an IP address. It lives on the application layer for clients to query and resolve names.


### Host Aliasing

Hosts with complicated hostnames could one or more alias names.

e.g. host `relay1.west-coast.enterprise.com` could have an alias `www.enterprise.com`. Aliases are more mnemonic hostnames.

DNS performs load balancing among replicated servers.


### Decentralised!

DNS is decentralised:
 - No single point of failure: if there was, most internet services would go down if the single point went down.
 - Traffic Volume: A single server/network would not be able to cope with the traffic.
 - Databases can be distributed geographically. e.g. .uk TLDs can reside in more local DNS servers.
 - Management: would be a monopoly.


### 3 Classes of DNS servers

- Root DNS servers
- Top-level domain servers
- Authoritative DNS servers


### Iterative vs Recursive DNS resolution

**Iterative**: The local DNS server will contact the Root server, TLD DNS server and authoritative DNS servers.

**Recursive**: The local DNS server will contact the Root server. The root server then contacts the TLD DNS server, which then contacts the authoritative DNS server. The response returns through the chain of DNS servers.


### DNS Caching

DNS caches responses specified by their Time-To-Live(TTL) values.


---

## Cloud Computing

### SaaS

Software services. e.g. Trello, web applications selling stuff.

## PaaS

- Google App Engine.
- Heroku.
- Google Container Engine (Kubernetes).


### IaaS

- EC2

---

## Web Traffic Engineering

### Load Balancing

Distributing traffic (multiple requests) between nodes in a cluster.

Most load balancing is done with Round Robin or Weighted Round Robin.

A better solution is to have ***content-based request distribution***.


#### Round Robin (RR)

Iteratively selects a different cluster for each request.

#### Weighted Round Robin (WRR)

Distributes connections based on target values often determined by:
 - CPU load
 - Disk utilisation
 - Number of open connections

#### Content-Based Request Distribution (CBRD)

Front-end proxy takes into account both the service and content requested with current load on back-end nodes. This allows for improved performance as there will be increased hit-rates in back-end node's memory caches.

#### Locality Aware Request Distribution (LARD)

Route requests based on the requested URL to maximise locality and cache-use at backend servers. A load balancing scheme needs to be used in conjunction with this so that backends aren't overloaded. The frontend is required to inspect the request.

**High level view of strategy**:

 - A single backend node is assigned to a target. This assumes that the target by itself cannot exceed the capacity of one node.
 - The scheme measures load by the number of active connections.
 - The frontend maintains a 1-1 mapping of targets to backends.
 - The first request for a target is assigned to the least-loaded backend.
 - Subsequent requests for the target are directed to the assigned backend load. If overloaded, a new backend is assigned.

**Intuition**

Targets are distributed when they are first requested. Only when there is significant load imbalance does the strategy reassign targets as we do not want greatly diverging load values on different backends. On the otherhand, we do not want to reassign targets to smooth out temporary load imbalances.


 - **load**: the number of active connections
 - **T-low**: the load below which a backend is likely to have idle resources.
 - **T-high**: the load above which a node is likely to cause substantial delay when serving requests.

 Targets are moved when:
  - a backend has load higher than **T-high** whilst there is a backend that has load lower than **T-low**.
  - a backend has load higher than **2T-high**.


## Markup Languages

Markup is adding annotations around pieces of text to explicitly indicate properties of those pieces.

A mark-up language is a format for a document, where tet is annotated with computer-parseable information on.

### XML

#### Declaration

```
<?xml
  version="1.0"
  encoding="UTF=16"
  standalone="yes"
?>
```

- `version`: The version of XML used.
- `encoding`: the character set used.
- `standalone`: Can the document be parsed on its own.


#### Namespaces

A single tag name may be used for different purposes and have different meanings. e.g.

`<title>` could mean the chapter title in a book or Mr/Mrs/Miss in an employee database.

A namespace is identified by a URI and every element and attribute name has a namespace.

##### Default Namespaces

You can set a default namespace using `xmlns` e.g.

```
<chapter xmlns="http://book.namespace">
  <section>
    <picture xmlns="http://pictures/">
  </section>
</chapter>
```


##### Namespace prefixes

We can set a prefix namespace using `xlmns:PREFIX = "NS-URI"`.

e.g.

```
<book:chapter
  xmlns:book = "http://book.namespace"
  xmlns:person = "http://person.namespace"

  person:author = "Simon Miles"
>
  <book:section>...</book:section>
</book:chapter>
```

---

## Internet Backbones, NAPs and ISPs

Internet is loosely hierarchial:

 - **Level 1** NAPs
 - **Level 2** National Backbones
 - **Level 3** Regional ISPs Commercial
 - **Level 4** Local ISPs
 - **Level 5** End user and Business Networks (LAN)

### Scalability
The internet has hierarchial addressing (aaa.bbb.ccc.ddd (4 octets in IPv4)).

## Internet Structure

 - **Tier 1** links: OC-192 (10 Gbps) links.
 - **Tier 2** links: somewhat slower, ranging from OC-48 (2.5 Gbps) to OC-12 (620 Mbps). Usually serve large scale ISPs
 - **Tier 3** links: speeds range from OC-12 (620 Mbps) to OC-3 (155 Mbps). Connect smaller ISPs, universities and large businesses


## Cloud computing
> In a nutshell, cloud computing provides computation, software,
data access, and storage resources without requiring cloud users
to know the location and other details of the computing
infrastructure. - Wiki

- Pay as you go
- Elastic resource scalability
- on-demand

### Mobile Cloud Computing
Computation happens away from a mobile device in an application.

 - Extends battery life/energy efficiency.
 - Task migration.
 - Faster on dedicated hardware than varying capabilities of mobile devices.


## Caching
**Two main reasons:**

 - Reduce latency
 - Reduce network traffic

- Browser cache
- Proxy cache

## Domain Name System (DNS)
Translate between human-readable names to machine addresses (IP addresses).

### Anycast

A *multicast* address is used for one-to-many communication, with delivery to multiple interfaces. An *anycast* address is used for one-to-one-of-many communication, with delivery to a single interface.



## Domain Name System (DNS)

- A distibuted hierarchy of many name servers.

### Hostnames
Translate human-memorable names into harder to remember IP addresses.

### Host Aliasing

- CNAME = Canonical Name.

### Load Distribution
- DNS performs load balancing among replicated servers.
- A load balancer forwards traffic from one address to multiple servers (proxying). This can also be done on the DNS level by adding more A? records.


#### Topology
- Root Domains
- Top-Lever Domains
- Authoritative


#### Authoritative DNS servers
Organisations use these to map their domains to their hosts' addresses. These can be hosted locally (BIND9) or via a third party service.


### DNS Caching
Caching occurs at various levels in order to reduce load on the higher-up/root servers.

### Records

 - **A**: Hostname to IP Address.
 - **NS**: Name server address that is authoritative for a domain.
 - **CNAME**: Canonical Name to make hostname aliases
 - **MX**: Mail Exchange address (email)


### DNS Messages



### DNS Security Threats

 - DNS Poisoning. Inserting bad records into the distributed database which replicates elsewhere. DNSSEC aims to secure this by adding keys to the domain.


### Exam
 - Difference between recursive and iterative queries.

## Cloud

## Web Traffic & Markup

## Security
