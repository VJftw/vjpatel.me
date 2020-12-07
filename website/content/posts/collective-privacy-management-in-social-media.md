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



# Bibliography

[^Such and Criado, 2016]: Such, J. M. and Criado, N. (2016) ‘Resolving Multi-Party Privacy Conflicts in Social Media’, IEEE Transactions on Knowledge and Data Engineering, 28(7), pp. 1851–1863. doi: 10.1109/TKDE.2016.2539165.

[^Fogues et al., 2015]:

[^Misra and Such, 2016]:
