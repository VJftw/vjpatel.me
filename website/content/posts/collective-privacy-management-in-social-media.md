---
date: "2016-04-24T23:09:26+01:00"
title: "Collective Privacy Management in Social Media"
excerpt: "Excerpts from my postgraduate dissertation"
latex: true
tags: ["university", "privacy", "social media"]
published: true
---

# Abstract

Over the recent years, social media has achieved huge popularity through users sharing original multimedia with their friends, family, colleagues and even the public. When people are depicted in media, mainly photos, they assume co-ownership of that media and should be able to manage their privacy accordingly. Social media sites currently only offer _all or nothing_ approaches of untagging or requesting that a photo is deleted. These approaches hinder sharing media to different groups of people (e.g. one user may have a privacy preference of “I don’t want Bob to see this photo”, but not mind if other friends see it.). Following this, a conflicting privacy preference may occur (e.g. another tagged user has a preference of “Why not? I want Bob to see this photo.”) and thus this also needs resolving via a mediator. This project explores creating a tool for users on Facebook to collectively manage their privacy.

# Acknowledgements

My supervisor, Dr. Jose M. Such. His guidance and expertise helped me deliver this functional project and understand the existing research that has gone into this topic.

My friends and family for supporting me throughout the duration of this project and to those who contributed feedback for the study.

# Introduction

Privacy plays an important role in society as it describes how people protect their information by choosing with whom they share it with. It is desirable to protect your own information as adversaries could use it to commit crimes such as fraud or cyberstalking against you, or lead to unintended consequences such as losing your job or tarnish your self-representation [^Such and Criado, 2016].

With the rise of Social Media and Social Network Services (SNS), billions of people are now involved in maintaining online relationships through sharing information with each other. Currently, in most popular SNS, the uploader of media manages the privacy policy for that media. However, what happens when a picture depicting multiple people or a different person is uploaded? e.g. Alice uploads a photo containing herself and Bob. In this scenario, Alice and Bob are co-owners of the photo, where something they are responsible for (themselves) is depicted [^Fogues et al., 2015]. Currently Bob has little power over whom gets to see the photo with current tools available on SNS’ [^Fogues et al., 2015] as no popular SNS offer support for collective decision making [^Misra and Such, 2016] and so co-owners are left to negotiate via other means or untagging.

## Project Aims and Objectives

The aim of this project is to develop a tool utilising the Facebook Graph API that facilitates reaching an agreement between co-owners on whom can access shared photos. The tool will automatically generate groups using community detection and detect conflicts from user-defined privacy policies. It will use an automated negotiation strategy to suggest a resolution for any given conflicts that arise.

To meet these aims, this tool has the following objectives:

- Co-owners should be aware of the audience that has access to a shared item.
- Allow users to define a privacy policy for groups discovered by a community detection algorithm.
- Use an automated negotiation algorithm to suggest resolutions to conflicts found.
  - Discover what other variables might influence conflict resolution through user feedback.
- Use non-identifiable information to evaluate how successful the algorithms are and identify further improvements.

## Background and Literature Survey

The articles read presented the initial problem of co-owners of photos having little option in managing their privacy for photos they had not uploaded. Most SNS enforce a policy where only the uploader can manage the privacy policy of shared items. Without complaining via other means, this leaves co-owners with the single option of un-tagging themselves from the photo (Such et al., 2017). However, untagging only prevents your unique friends from viewing the photo. Mutual friends, along with the uploader’s friends would still be able to view the photo depending on the uploader's privacy settings.

To resolve this, further research has been done on how to identify groups of people to apply a privacy policy to. Facebook is the only major SNS that offers an element of computer supported grouping. This comes in the form of “smart lists” where friend lists (groups) are automatically created based on friends that have a similar location, institution or other non-personal information. Most other SNS offer user-defined or pre-defined groups (Misra and Such, 2016). Misra, Such and Balogun implemented and compared 8 community detection algorithms to how 31 real users would grant access to photos for each friend individually. They found that the Clique-Percolation Method (CPM) was most effective but computationally expensive and not good enough for everyone (Misra, Jose M. Such and Balogun, 2016).

Once users have defined privacy policies for groups and photos, some conflicts will likely occur. Such and Criado present a mechanism for detecting conflicts between co-owners’ privacy policy for a photo and suggesting a resolution by estimating a user’s willingness to concede based on their sensitivity to the item. They tested this along with generic mechanisms (uploader-overwrites, majority-voting and veto-voting) in how often they matched concession behaviours from a study of 50 people. The results show that their mechanism was the most successful, with an ~85% match rate, as the generic mechanisms were not flexible enough in different situations (Such and Criado, 2016).

# Main Result

## Theoretical Development

This section identifies what methods and tools will be used in the development of the project.

### Functional Specification

The functional specification, identifying the stakeholders in an agile fashion, for the system
follows:

- As a social media user, I want to log in with my Facebook account, in order to use the application.
- As a social media user, I want to see which photos I am tagged in, in order to be aware of which photos may breach my privacy.
- As a social media user, I want to add context tags to photos I am tagged in, in order to help a mediator and define my privacy policies.
- As a social media user, I want to define what contexts a group of friends can access, in order to define my privacy policies.
- As a social media user, I want a community detection algorithm to determine groups of friends, in order to reduce my burden.
- As a social media user, I want a mediator to suggest resolutions to conflicts in my friends and my privacy policies.

### Non-functional Specification

The non-functional specification and properties of this system are the following:

- The system must be highly available, in order to sustain lots of users.
- The system must be horizontally scalable, in order to be cost-efficient with varying amounts of users over time.
- The system must be asynchronous, in order to perform slow calculations without reducing availability for other users.
- The system must be accessible on different devices, in order for people to the application on the go or at a desktop.
- The application must be simple to use in order to engage most users.
- The system must be secure as it stores personally identifiable information about its users in order to comply with laws and protect user privacy.

### Methodology

This section outlines the development practices used whilst developing the system.

#### Agile Kanban

Kanban is a popular agile development methodology that uses the Just-In-Time (JIT) process to complete features of a project. It allows for a continuous flow of software releases (continuous delivery) and the whole team takes responsibility for moving features along the workflow (Radigan and Altassian, 2017).

#### Model-View-Controller (MVC)

MVC describes an architectural structure of developing applications that have a user interface. A model represents the domain-specific simulation of an entity, for example a Building. A view presents a user interface that shows data from models and can be composed of other views. A controller interfaces between models and views, defining the actions a user can take upon a model through a view (Krasner and Pope, 1988).

#### Inversion of Control (Dependency Injection)

Writing modular code results in an easily maintainable code-base. By writing small classes, modules and functions that have dependencies injected, we can stub out the dependencies
during testing without having to have finished the implementation of them (Fowler, 2004). This also means that those dependencies can be implemented as interfaces and the
implementation becomes swappable. E.g. a storage interface could be implemented by an SQL database class or a NOSQL database class.

#### Domain Driven Design/Development (DDD)

With MVC and Inversion of Control, Domain Driven Design helps organise a system by considering the domain context and models involved. This allows a system to be expanded easily by adding onto an existing core model (Evans, 2003).

#### Micro services

By splitting a system into smaller services that communicate with each other, we create an interchangeable system that is easier to understand architecturally as the services are simpler by being responsible for fewer tasks

#### Message Queueing

In this project, there will be computationally expensive algorithms that will delay responses if they were implemented in a simple HTTP request-response scenario and the service availability would be reduced. To solve this problem, message queues provide an asynchronous communication protocol where a producer that places messages onto a queue does not require a response immediately (Johansson, 2014). A consumer service (worker) can then pick up the messages one-by-one and perform the tasks without being overwhelmed.

#### Publish-Subscribe Pattern

To compliment Message Queueing, the project uses the publish-subscribe pattern to deliver an asynchronous message when a consumer finishes a task. The web application can connect to a web socket to receive these updates and update its local information accordingly.

#### Continuous Integration

During development, it is useful to test and deploy newer changes and iterations as soon as possible so that stakeholders can provide feedback. Continuous integration software can be used to run our automated tests on new commits to a repository and automatically deploy if those tests are successful. This project will use the hosted Travis CI service for continuous integration as it offers free builds for open-sourced projects. An alternative self-hosted solution would be to use Jenkins; however, this requires further set up, maintenance as well as cost.

## Analysis and Design

This section considers the different ways of implementing the system, explaining why some implementations are more suitable than others.

### Algorithms

To determine groups of users, the clique percolation method will be used as it was determined to be the most successful from Misra, Such and Balogun’s research as
mentioned in the Background and Literature Survey. They used libraries to determine cliques from an input, but these are made for traversing completed friendship graphs. Due
to the Facebook Graph API only showing mutual friends whom use the application, the graph of friendships that the application is aware of grows whenever new users join.
Existing users may also form new friendships with each other during the lifetime of the application, thus changing or merging existing cliques. This algorithm therefore must:

- Compare found cliques to existing cliques, where if
  - The clique already exists, make no changes.
  - An existing clique is a subset of a newly found clique, merge the subset
    cliques into the new clique.
- Only traverse necessary parts of the graph.
  Clique persistence can be achieved with bi-partites, assigning a many-to-many relationship between clique identifies and users (Kumpula et al., 2008).

To determine tie-strengths, profile information features can be compared, where friends that have more in common are deemed closer than friends that have less in common. This can be achieved by valuing each common feature as 1 (Misra, Jose M Such and Balogun, 2016).

To detect conflicts, every co-owner’s policy can be compared to find co-owners that disagree with each other on target friends (Such and Criado, 2016). To determine item sensitivity, tie-strengths between users are used. The friendship with the highest tiestrength in a set of conflicts will have their resolution suggested.

### Overall System

This section plans the implementation considering the Theoretical Development section.

Two ways that this system could be implemented are the client-server architecture or a peer-to-peer network. A peer-to-peer network offers better availability as it is decentralised and persistent storage could use distributed hash tables in a similar way to Bitcoin. The disadvantage of this architecture are that the client applications will be more complex and resource intensive, limiting the scope of users that can access the application. With the client-server model, ‘thin’ clients can be implemented as a lightweight application that submits tasks to much powerful backend computers. Persistent storage will contain personally identifiable information and should be destroyed at the end of the project. It is impossible to guarantee destruction in a peer-to-peer network whereas, in the client-server model, we have authority over database replication thus can delete replicas as necessary. These points favour the client-server model which will be used.

A synchronous system in the client-server model can result in fluctuations of latency where a burst of requests to resource intensive operations will make the system respond slower to
other requests and thus a Denial of Service (DoS) attack can be easily performed. By creating an asynchronous system, resource intensive tasks can be queued and performed at a constant rate without reducing the availability of other tasks for other users. We can also use bidirectional communication where the backend can send the client updates.

### Frontend Client

The client could be implemented in arbitrary languages as a desktop or mobile application. To meet the accessibility requirement, the application should be available on as many
devices as possible. JavaScript has gained massive popularity over recent years as most smartphones, tablets, desktops etc. have web browsers that can execute JavaScript based applications. This has allowed developers to build applications that are supported by a wide range of devices employing the write-once, run-anywhere slogan that Sun Microsystems pioneered with Java in the past.

Using frontend libraries and frameworks will help accelerate the development process and help conform to better programming practices. One of the most popular and feature filled
frameworks is Angular, which uses TypeScript, a superset of JavaScript that adds static typing, classes and many other features of an object-oriented programming language. For
the user interface, a User Interface framework will be used. Materialize CSS provides components that follow Google’s Material Design standards as well as card components
that can contain images which will be useful for displaying a grid of images. It also exposes a responsive grid for laying out components of a page which will be used for streamlining user
experiences across different screen sizes (mobile to desktop).

The technology used for the frontend follows in Figure 1.
| Technology      | Homepage                                                                                   | Purpose              |
| --------------- | ------------------------------------------------------------------------------------------ | -------------------- |
| TypeScript      | [typescriptlang.org](https://typescriptlang.org)                                           | Programming language |
| Angular 4       | [angular.io](https://angular.io)                                                           | MVC framework        |
| Materialize CSS | [materializecss.com](https://materializecss.com)                                           | UI framework         |
| Facebook SDK    | [developers.facebook.com/docs/javascript](https://developers.facebook.com/docs/javascript) | Facebook API calls   |
| TSLint          | [palantir.github.io/tslint](https://palantir.github.io/tslint)                             | Code linting         |

### Backend

An asynchronous system needs bi-directional communication between the backend and clients. We can use the WebSocket protocol (Fette et al., 2011) to achieve this. Whilst Python, PHP and Java dominate much of the current backend server software share, Go is a newer programming language maintained by Google that compiles into machine code with garbage collection. Its compilation makes it easy to place into minimal Docker containers.

For deploying services, Docker has taken the headlines in the dev-ops (developer operations) world as it allows containers to run with different configurations independently from each other on a host utilising Linux Containers (LXC). 

| Technology          | Homepage                                         | Purpose                |
| ------------------- | ------------------------------------------------ | ---------------------- |
| Go                  | [golang.org](https://golang.org)                 | Programming language   |
| Docker              | [docker.com](https://docker.com)                 | Linux Container engine |
| Terraform           | [terraform.io](https://terraform.io)             | Infrastructure as Code |
| Amazon Web Services | [aws.amazon.com](https://aws.amazon.com)         | Platform as a Service  |
| Travis CI           | [travis-ci.com](https://travis-ci.com)           | Continuous Integration |
| golint              | [github.com/golang/lint](github.com/golang/lint) | Code linting           |

#### Representational State Transfer (REST) API
The RESTful API will be the only publicly exposed endpoint of the backend as it will be easier to harden the system and monitor access from the internet. It will only interact with the cache so that it can maintain a low response time for all requests.

It will only implement the required REST endpoints, for example friends will be synced via a worker in the background, thus only GET for friends will need to be implemented.

#### Workers
Workers will collect resource intensive tasks from the queue service to execute. They will store results in the database and cache when necessary, also telling publish/subscribe channels to update user-sessions if appropriate.

#### Storage
Persistent storage will be used in the form of a relational database. Storing normalised data in a relational database allows for arbitrary queries to take place. A cache will be used to serve commonly used structures of data.

#### Persistent
The database will only store the minimum amount of information that can be used to derive other information. For example, instead of storing user attributes, only store the user ID as other attributes are not necessary. As mentioned in Algorithms, cliques will be stored in the form of bi-partites and it would not be necessary to store the whole friendship graph in the database.

#### Cache
The cache will be used to accelerate performance on common sets of information used by the REST API. It will store transient information such as the friendship graph and user profile information that is used during tie-strength calculation to save querying the Facebook Graph API excessively.

Redis is an in-memory data-structure store that offers O(1) complexity on many of its operations making it ideal for a cache on common operations. It also offers publish-subscribe capability, which will be used for updating user-sessions

#### Queues
As mentioned in the Overall System, queues will be used to hold collections of tasks to be carried out by worker services. The payload of a task should only hold enough information to identify what entities need processing so that fresh information is used when the task is carried out.

RabbitMQ will be used as it offers traditional message broking which the API will use to offload more resource intensive processes to be completed asynchronously (Humphrey, 2017). It also offers official support for Go.

## Implementation and Experimental Work
This section explains how the system was constructed and deployed.

### Service Overview
Figure 3 shows the overall system architecture on Amazon Web Services (AWS). The Application Load Balancer, Cluster management(containers) and Managed Database are provided from AWS as Software as a Service (SaaS). A managed database was desired because it offers simple backup and replication. The Application Load balancer from AWS integrates with the Elastic Container Service (ECS) to expose services behind a load balancer.

The cluster consists of 2 m4.large (2 CPU cores – 8GB memory) EC2 spot instances. The m4 series of instances are preferred over the cheaper t2 series because they guarantee constant performance. The t2 instance class varies in performance based on past usage making them more suited for mostly idle configurations (Amazon Web Services, 2017). Spot instances are variably priced based on Amazon Web Services’ spare capacity. These instances may be terminated and restarted in a different data centre at any time In Figure 3, the Cache and Queues also reside within this cluster as they store non-persistent data. They can also be configured to behave as a cache cluster and a queue cluster via Redis Sentinel (Sanfilippo, 2012) and RabbitMQ Highly Available Queues (Pivotal Software Inc., 2017).

Every service within the cluster and the clients communicate with JavaScript Object Notation (JSON) which is a lightweight data-interchange format (ECMA International, 2013).

### Infrastructure and Deployment
This system has been deployed to Amazon Web Services (AWS) via Hashicorp’s Terraform as infrastructure-as-code. Writing infrastructure-as-code allows us to pre-define complex infrastructures and spin them up or down on-demand. It also allows others to read how the system works without searching through a control panel. The following Amazon Web Services have been used:

* Elastic Compute Cloud (EC2) – Virtual machines running Ubuntu Linux 16.04.
* Route 53 – Domain Name Service (DNS) for routing the domain names.
* Relational Database Service (RDS) – Managed relational database solution offering automatic backup and replication.
* Elastic Container Service (ECS) – Docker container management solution.
* Virtual Private Cloud (VPC) – Private virtual networks to isolate the application.
* Identity and Access Management (IAM) – User and service access.
* Certificate Manager – Transport Layer Security (TLS) certificate provision.
* CloudWatch Logs – Service output logging.
* Simple Storage Service (S3) – Object storage used for frontend web application and secure key storage.
* CloudFront Content Delivery Network (CDN) – Frontend deployment for high availability.

Travis CI has been used for continuous integration by running code style checks and tests before deploying to a test environment.

### Frontend
The Angular 4 framework has been used to develop the frontend client. It is the simplest part of the system as it aims to be a ‘thin-client’ as mentioned in Overall System. It has been deployed to Amazon Web Services’ CloudFront CDN for high availability and it performs a small health check to verify that the backend services are reachable and coping with current load.

| File type        | Purpose                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `*.service.ts`   | These interact with the backend to provide a repository that manages the lifecycle of entities on the client. |
| `*.model.ts`     | These represent the entities used on the client.                                                              |
| `*.component.ts` | These are used to build a UI in Angular. These is one for each view, operating as a View/Controller in MVC.   |
| `*.module.ts`    | These are used to configure a library.                                                                        |

#### Promises
In the client, some object services provide a repository. These return an asynchronous guarantee for an object because a request to the backend server takes longer than accessing information already in memory. In JavaScript, this can be achieved using Promises (Mozilla Developer Network, 2017) and this works by programming the Promise object to first check a local in-memory structure for the existence of an object, resolving if it finds it
otherwise querying the backend server for the object and resolving. 

#### User Interface
This application has been developed using Materialize CSS which incorporates Google’s Material Design standards into a user interface framework. Using this user interface framework aids in keeping a consistent style and experience throughout the application.

The navigation system allows a user to go to any of the main sections of the application in one click on desktop and 2 touches on mobile. The main sections identified are:
* Photos a user is tagged in.
* Cliques a user belongs to. This page also displays tie-strengths next to other
members in a clique.
* Contexts a user has. This page also lists the global contexts.
* Submit Feedback for the application.

Figure 5 shows all the pages in the application and how a user interacts with the application to view them. Every page within the Authenticated and Navigation System container can navigate to Photos, Feedback, Friends and Contexts using the navigation system. This container also identifies pages which are only viewable once a user has been authenticated.

The appendix provides screenshots of how the application looks under User Interface Screenshots.

### Backend
All the following components are executed in separate Docker LXC (Linux Containers) as individual, scalable micro services.

The backend services share a lot of code thus have been developed in the same Go package. This package is built into a Docker container which is then started with different configurations across the cluster for the different API and worker services.

#### Go API
The API is started by setting the TYPE environment variable to ‘API’. This exposes a HTTP server on port 80. The API is RESTful and implements the following endpoints in Figure 6.

| Endpoint   | Method | Purpose                                                                                                        |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| `/v1/auth` | `POST` | Authenticate a short-lived access token and userID, returning a different authentication for use with the API. |
| `/v1/categories` | `GET` | Returns all categories including user-defined ones. |
| `/v1/categories` | `POST` | Creates a new user-defined category. |
| `/v1/friends?ids=["x","y","z"]` | `GET` | Returns user objects for the given friend IDs where the session-user is a friend. |
| `/v1/cliques` | `GET` | Returns the cliques that the session-user is a member of. |
| `/v1/cliques/{id}` | `PUT` | Updates the session-user's privacy preferences for a clique. |
| `/v1/photos` | `POST` | Registers a photo with the application. |
| `/v1/photos/{id}` | `PUT` | Updates a photo's categories. |
| `/v1/surveys` | `POST` | Submitting surveys. |
| `/v1/users?ids=["x","y","z"]` | `GET` | Returns the request user IDs that exist on the system for determining if a photo is negotiable. |
| `/v1/ws?authToken=x` | `GET` | Upgrades the conection to a WebSocket allowing the API to send updates for the session-user in real-time.

Where a session-user is involved (apart from the websocket endpoint `/v1/ws?authToken=x`), the session-user is identified by the `Authorization` header sent with requests. 

#### Go Workers
A worker is started by setting the `TYPE` environment variable to `WORKER` and setting the `QUEUE` environment variable to a valid queue name.

##### Long Lived Authentication Token Worker
This worker is started by setting the QUEUE environment variable to ‘auth-long-token’.

By default, Facebook returns short-lived access tokens that often only have a lifetime of two hours (Facebook Inc., 2017b). This worker obtains a long-lived access token from Facebook using the short-lived access token for use in further API calls. It also obtains and caches the IDs for each profile vector that is used in tie-strength determination.

This worker runs every time a user logs in to the application, obtaining a long-lived access token for that user and updating the cache with profile information. It then adds a message to the community detection queue for the logged in user’s friendship groups to be updated.

##### Synchronise Photo Tags Worker
This worker is started by setting the QUEUE environment variable to ‘photo-tags’.

The API exposes an endpoint for users to create photo objects on this application. Arbitrary information could be sent through this endpoint therefore the backend should obtain information about a photo from Facebook’s Graph API itself as it cannot always trust the input from a client. The client sends the photo ID and Facebook user ID which this worker then uses to obtain information about the photo using the Facebook user’s long-lived access token.

This worker runs whenever a new photo has been added.

##### Community Detection Worker
This worker is started by setting the QUEUE environment variable to ‘community-detection’.

As mentioned in Algorithms, a new implementation of the Clique-Percolation Method is
used for determining communities of users. 

###### Algorithm
This algorithm performs the following steps for a given user:
1. Find and save new friends for a user by,
   1. Using the user’s long-lived access token to query the Facebook Graph API for the user’s friends. 
   2. Iterates through all of the returned friends, checking if they already exist in the system and adding new bidirectional relationships for ones that do not exist.
2. Builds a local graph of only the user's friends and their friends.
3. Obtain the user's existing cliques and its members.
4. Find cliques by comparing the user's friends to each of their friend's friends using an array union operation. If the resulting array is longer than 3 items, a clique is found. If a clique is found,
   1. Verify that each member of the clique is in every other member's friends list.
   2. Verify that the clique is maximal by performing an array union on the members of clique's friends.
   3. Compare the new clique to existing cliques.
      1. If an existing subset clieque exists, migrate the existing clique to the newly found one.
      2. If an identical clique exists, ignore the new one.
      3. Otherwise, form a new clique.

###### Pseudocode

```javascript
function community_detection_for_user(u):
  pass
```

# Bibliography

[^Such and Criado, 2016]: Such, J. M. and Criado, N. (2016) ‘Resolving Multi-Party Privacy Conflicts in Social Media’, IEEE Transactions on Knowledge and Data Engineering, 28(7), pp. 1851–1863. doi: 10.1109/TKDE.2016.2539165.

[^Fogues et al., 2015]:

[^Misra and Such, 2016]:
