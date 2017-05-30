+++
date = "2017-04-15T00:26:19+01:00"
title = "7CCSMSIA Software Engineering of Internet Applications notes"
markup = "mmark"
+++

## Lecture 1 - Why bother?

**Specification**: A detailed precise presentation or plan or proposal for something.

**Architecture**: The manner in which components of a computer or computer system are organised and integrated.

**Engineering**: The design and manufacture of complex products.

### Current Situation

We have new complexities:
* Large scale, distributed systems e.g. **Internet-centric computing**.
* Cheap microsystems, therefore a massive distribution. e.g. a car has 100s of microprocessors.
* Internet and web applications.

There is **no** silver bullet and software engineering is less clear cut than theoretical computer science. We use **techniques**, **methods** and **tools**, that can reduce the complexity of constructing systems.

**Software Engineering** is the practical application of scientific methods to the specification, design and implementation of programs and systems. We focus on **Semi-formal methods**.

A language is **formal** when:
 * It has a formal language (syntax)
 * whose meaning (semantics) is described in a mathematically precise way.

A development method is formal when:
 * it is based on a formal language and
 * there are semantically consistent transformation/proof rules.

**UML** is a semi-formal method: Often syntax with a mere hint of semantics.

### Modelling

The goal of development is to solve problems in the **real world**. *Structuring* and *abstraction* are critical as the real world is complex. Models are built in the early development phases with a goal of specifying the requirements and precisely whilst avoiding a premature commitment to algorithms or data-structures.

The **goal of models** is to specify the requirements clearly and precisely whilst not prematurely committing into any algorithm or data-structure.

* **Structuring** serves to organise/decompose the problem/solution.
* **Abstraction** aims to eliminate insignificant details.

Classical approaches to Structuring and abstraction are:
 * **Functional Decomposition**: Decomposition independent tasks.
 * **Parameterisation and generic development**: reusability.
 * **Model simplification**: To improve understanding of tasks and possible solutions.
 * **Information-hiding**: Interfaces and property-oriented descriptions.

**Interfaces** must be clearly described. An **interface** is an imagined or actual border between two functional entities with fixed rules for the transfer of data. They have:
 * **Syntactic properties**: The available rules, the types of their arguments etc.
 * **Semantic properties**: A description of the entities behaviour. The goal is support proper use of the entity.

 Interfaces also provide the basis for communicating and explaining (sub)systems between the specifier, implementer, and user.

---

## Lecture 1B - Model-Driven Development (MDD)

Envisages development of software systems as a process consisting of the **construction and transformation of software models** and **semi-automated generation of executable code from models** rather than focusing on manual construction of low level code.

It aims to make production of software systems more reliable and efficient by freeing developers from complexity of implementation on particular platforms and by retaining core functionality of a system despite changing technologies. This is very relevant for web applications because the technology for them changes often.

### Model Driven Architecture (MDA)

**Model Driven Architecture** aims to support cost-effective adaption of a system to new technologies and environments by separating technology-independent models of data and functionality of a system from technology-specific models.

Key concepts:
 * **Platform-Independent Models (PIMs)**
 * **Platform-Specific Models (PSMs)**
 * **Model Transformations**

 A **Platform Independent Model** can transform into a **Platform Specific Model** which transforms into a language implementation.

 ![alt text](https://docs.google.com/drawings/d/12UTIUZSLnXkHMsk2ypaOCb6kDnRRXy032r2exvdRaCo/pub?w=521&h=256 "MDA Process Example")

A **Platform-Independent Model (PIM)** is a system specification or design model that models a system in terms of domain concepts and implementation-independent constructs. It expresses *business rules* that are the core definition of functionalities of a system. If a PIM is defined in a manner that abstracts from particular algorithms and computation procedures, then it can be referred to as a **Computation Independent Model**.

A **Platform-Specific Model (PSM)** is a system specification or design model of the system tailored to a specific software platform and programming language such and J2EE and Java or C++. It defines the functionalities of a system in sufficient enough detail to be directly programmed from the model.

A **Model Transformation** produces a new model from an existing model. This can be to:
 * improve the quality of the a model by removing redundancies
 * refine a PIM towards a PSM
 * refine a PSM to an implementation

### UML Notation

* **Use Case Diagrams**: Show services used by a system and which users/agents these services interact with.
* **Class Diagrams** and **Object Diagrams**: Describe the structure of entities involved in a system and relationships between these entities.
* **State machine diagrams**: Describe the behaviour of objects and execution steps of individual operations on objects.
* **Object Constraint Language (OCL)**
* **Interactions Diagrams**
* **Activity Diagrams**
* **Deployment Diagrams**

#### Rules

* **Rectangles** denote classes or instances.
* **Ovals** denote functions.
* Names of Classes are **not** underlined.
* Names of instances are underlined.
* An edge between two nodes denotes a relationship between the corresponding entities.


### Use Case Diagrams

**Use Case Diagrams** represent the functionality of the system from a user's point of view.

*NOTE: DIAGRAM (Slide 39 of Lecture1b)*

**Use cases** are a scenario-based technique in the UML which identify the actors in an interaction and which describe the interaction itself. That is, a use case is a set of scenarios tied together by a common user goal (which might succeed or fail). A set of use cases should describe all possible interactions with the system. Sequence diagrams may be used to add detail to use cases by showing the sequence of event processing in the system.

* **Actor**: Models an **external entity** which communicates with the system. They have a unique name and an optional description. e.g. `Client`: *A person in the train.*
* **Use Case**: A use case represents a **kind of task** provided by the system as an event flow. A use case consists of:
  * Unique name
  * Participating actors
  * Entry conditions
  * Flow of events
  * Exit conditions
  * Special requirements

Each **Use case** has:
* A **primary actor**, which calls on the system to deliver a service. It is the actor with the goal that the use-case attempts to satisfy, and are usually, but not always the initiator of the use-case. e.g. `Client` is the initiating actor of `Withdraw`.
* A **pre-condition** (or **entry-condition**) that describes what the system should ensure is true before the system allows the use case to begin. e.g. `Withdraw:Client` must have opened a bank account and received a bank card with pin.
* A **guarantee** (or **exit condition**) that describes what the system will ensure at the end of the use case. Success guarantees hold after a successful scenario; minimal guarantees hold after any scenario. *Success guarantees* hold after a successful scenario. *Minimal guarantees* hold after any scenario.
* A **trigger** that specifies the event that gets the use case started.

Each **step** in a use case is an element of interaction between an actor and the system. The step should be a simple statement and clearly show who is carrying out the step. The step should show the intent of the actor, not the mechanics of what the actor does. The User Interface is not described in the use case.

e.g.

1. `actor`:Authenticate
2. `system`: ATM displays options
3. `actor`: Client selects "Withdraw"
4. `system`: ATM queries amount
5. `actor`: Client enters amount
6. `system`: ATM returns bank card
7. `system`: ATM outputs specific amount


#### Reusing use cases
Common behaviour can be factorised using the `<<include>>` **stereotype**. e.g. `Withdraw` includes the `Authenticate` use case.

*DIAGRAM 1b 56*

**Pros**:
 * Convenient
 * Shorter descriptions
 * Common functionality = reusable components
 * Integration of existing components

**Cons**:
 * May lead to functional decomposition rather than an object-oriented model.
 * Requires more UML skills.

#### Sources to elicit use cases

* Client
* User
* Existing Documents
* Task Observations

#### Types of Scenarios

* **Visionary Scenarios**: Scenarios that reference future systems.
* **As-is Scenarios**: Scenarios that reference current systems. A user describes such system.
* **Evaluation scenarios**: The actor performs tasks against the system which is to be evaluated.
* **Training Scenarios**: Tasks which aid a novice user for the goal of using/learning.


### Class Diagrams

**Class Diagrams** represent the structure of the system.

#### Class identification approaches

* **Application Domain Approach**: Asking the application domain expert to define objects.
* **Syntactic Approach**: Analyse all the use cases to define objects.
* **Design Pattern Approach**: Apply design patterns.
* **Component-Based Approach**: Use existing solution classes.

#### Object kinds

* **Entity Object**: object that represents application domain context.
* **Boundary Object**: object that handles user-system interactions.
* **Control object**: object that is responsible of control tasks (coordination of entity and boundary objects) that is executed via the server.


*NOTE: DIAGRAM (Slide 40 of Lecture1b)*


### Sequence Diagrams

**Sequence Diagrams** represent the behaviour of a system as messages (interactions) between different objects.

### Statechart Diagrams

**Statechart diagrams** represent the behaviour of a single object with interesting dynamic behaviour.

Show the interactions of a system.

The **state** represents the value of a object. e.g. Individual Web pages.

The **transition** the event that causes a change of state. e.g. Actions performed on the web pages which can be links or submitted forms.

### Object Constraint Language (OCL)

OCL enables developers to describe properties of classes, associations and state machines in detail using a textual language.


---

## Lecture 2

### Object Models

**Object models** describe the system in terms of object classes and their associations.

An **Object class** is an abstraction over a set of objects with common attributes and the services (operations) provided by each object.

* Natural ways of reflecting the real-world entities manipulated by the system.
* More abstract entities are more difficult to model using this approach.
* Object class identification is recognised as a difficult process requiring a deep understanding of the application domain.
* Object classes reflecting domain entities are reusable across systems

**objects** are the main unit of abstraction. Objects carry out **activities**. The interface to objects is **event oriented**.



* A **clear** `diamond` represents an *aggregation* that denotes a "***consists-of***" hierarchy.


* A **solid** `diamond` represents a *composition* that denotes a strong *aggregation* where the life time of the component is controlled by the aggregate. i.e. "The whole controls/destroys the parts". The component **cannot exist without** the aggregate.


An **abstract** class cannot be directly instantiated. An abstract operation has no implementation, but is a pure declaration so that clients can bind to the abstract class. **NOTE**: It can be indicated by *italicizing* its name.

An **asbtract operaton** has no implementation but is a pure declaration so that clients can bind to the abstract class.

An **interface** is a class that has no implementation. An **interface** defines which messages an object can receive.

A **Class** describes objects with similar strucutre and behaviour.

A **Class diagram** describes the kind of objects in a system and their different static relationships. They represent the structure of a system.

#### Actor vs Class vs Object

- **Actor**: An entity outside the system to be modeled, interacting with the system.
- **Class**: An abstraction modeling an entity in the application or solution domain.
- **Object**: A specific instance of a class.

#### Attributes

**syntax**: `visibility name : type multiplicity = default {property-string}`

e.g. `- name: String [1] = "Untitled" {readOnly}`

* Visibility can be:
  * `+` public
  * `-` private
  * `~` package
  * `#` protected
* Property is additional, e.g.:
  * `readOnly` indicates that clients may not modify the property.
  * `frozen` indicates that the property is immutable.

#### Relationships

Objects of a class collaborate with objects of other classes.

UML supports modeling different relationships between objects or classes.

| Relationship    | Function                                                                        | Notation
|-----------------|---------------------------------------------------------------------------------|-----------------------
| Association     | Denotes a relationship between 2 classes.                                       | ![alt text](https://drive.google.com/uc?export=view&id=0B8i5iuobK6DgbV9LUG84MjBtaEk)
| Generalisation  | A relationship between a more general description and a more specific variety.  | ![alt text](https://drive.google.com/uc?export=view&id=0B8i5iuobK6DgbVdfdHRzTzQ4TlE)
| Dependency      | If changes to one model may change another.                                     | ![alt text](https://drive.google.com/uc?export=view&id=0B8i5iuobK6Dgc25GRnB1V0RfTTg)
| Realisation     | Relationship between a specification and its implementation.                    | ![alt text](https://drive.google.com/uc?export=view&id=0B8i5iuobK6DgYnNPZHlpR1hGelU)
| Usage           | Situation where one element requires another for proper functioning.            | ![alt text](https://drive.google.com/uc?export=view&id=0B8i5iuobK6Dgc25GRnB1V0RfTTg)

**Generalization** expresses a **kind-of** relationship. It is implemented by inheritance, where child classes inherit the attributes and operations of the parent class.

#### Operations

**syntax**: `visibility name (parameter-list) : return-type {property-string}`

#### Derived properties

Can be calculated based on other values. Notation: `/property -- {constraint}`.

#### Reference Objects and Value objects

A **reference** object is one that has an identity. e.g. a `Customer`. All changes to the object will be made available to all users.

A **value** object holds a value that is immutable.


#### Multiple Classification

* **Classification**: The relationships between an **object** and its **type**.
  * **Single Classification**: The object belongs to a single type.
  * **Multiple Classification**: The object may be described by several types. (Not usually possible in OO as each object must have one type even if it has multiple inheritance.)


#### Association Classes

Allow one to add attributes, operations and other features to associations.


----


## Web Applications

 * **Portability**: When the system is transported to a new environment, it should behave the same as when it was running in the old environment.
 * **Usability**: The users must not put unreasonable effort into using the system to achieve provided functionality.
 * **Accessibility**: The system must be easily accessible by disabled users.

### Web Services
Software functions that can be executed from remote applications. It enables integration of applications that are in remote locations so that these applications can behave like they are running in the same location.

**Reasons to transform a task into a web service**:

 * If it needs to access remote data or business-to-business interactions.
 * If it is a common sub-task in several business process.
 * If it does not require fine-grained interchange of data.
 * If it is not performance critical.

---

## EJB

### Objects

 * Implements the beans remote interface
 * When client invokes this interface, the interface delegates to the bean instance, which is in the pool.

## Web Services



---

## Lecture 6 - Enterprise Information Systems (EIS)

An EIS is a software system which holds core business data for a company or organisation and which performs operations involving this data.

These are usually large and complex systems, typically involving distributed processing and data.


### 5 Tier Architecture

1. **Client tier**: Has responsibility to display information and receive information from the user to transmit to the presentation tier.
2. **Presentation tier**: Has responsibility of managing presentation of information to clients and controlling what sequence of interaction should be followed.
    * Insulates the business tier from UI changes.
3. **Business tier**: Contains components implementing the business rules and data of the application.
    * Should be the most stable part of EIS.
4. **Integration tier**: Manages data retrieval, using interfaces such as JDBC. It insulates the higher tiers from direct knowledge of how data is stored and retrieved.
    * Insulates the business tier from changes in persistence engines.
5. **Resource tier**: Contains persistent data storage, such as database, and external resources such as credit card authorisation services.

### Beans

* **Session Bean**: Is a business component that is dedicated to a single client that lives only for the duration of the client's session. Is is not persistent. It can be used to model stateful or stateless interactions between the client and business tier components.
    * **Stateless**: Provide a service by a single method call. They do not hold client-specific state so can be shared between them.
    * **Stateful**: Provide an unsharable service to a single client. The cannot be shared and hold several related operations.

Session Beans should be introduced when the mix of business and view/control logic in the presentation tier becomes too complex. Or when business functionality needs to be made available to multiple applications.


* **Entity Bean**: A coarse-grained business component which provides an object view of persistent data. It is multiuser and long-lived. They act as an object-oriented facade for data of a system which may actually be stored as relational tables.


Entity beans should be introduced when persistent business components become complex, and require transaction management.

#### Container Managed Persistence

J2EE/Java EE provides automated synchronisation of entity bean data and stored data in the resource tier.

* Less code to write.
* Greater portability.

#### Bean Managed Persistence

Synchronisation is performed manually by the programmer in the bean using JDBC.

* Greater scope for customisation of database interface code.


### Separation of Code

Controller and view components are used for presentation processing.

Session beans are for business processing.

Entity beans are for complex business data.

### EIS Presentation Patterns

#### **1. Intercepting Filter**

The intercepting filter's purpose is to provide a flexible and configurable means to add filtering, pre and post processing, to presentation-tier request/response handling.

e.g.

* Is the clients IP address from a trusted network? (IP checker)
* Does the client have a valid session (Session checker)
* Is the client's browser supported (Browser checker)

**Architecture**:
*Diagram from L6 S35*

**Class Diagram**:
*Diagram from L6 S36*

#### **2. Front Controller**

The front controller's purpose is to provide a central entry point for an application that controls and manages web request handling. The controller component can control navigation and dispatching.

It makes it easier to impose consistent security, data and checks on requests.

**Architecture**:
*Diagram from L6 S41*

#### **3. Composite View**

The composite view's purpose is to manage views which are composed from multiple subviews.

Complex web pages are often built from multiple parts. e.g. Navigation, Header, Footer.

**Class Diagram**:
*Diagram from L6 S45*

### EIS Business Patterns

#### **4. Value Object**

The value object's purpose is to improve the efficiency of access to persistent data by grouping data and transferring data as a group of attribute values of each object.

It is inefficient to invoke an Entity Bean's `getAttribute()` value one-by-one. It also reduces data transfer costs.

**Class Diagram**:
*Diagram from L6 S48*

**Architecture**:
*Diagram from L6 S49*

#### **5. Session Facade**

The session facade's purpose is to encapsulate the details of complex interactions between business objects. A session facade for a group of business objects manages these objects and provides a simplified coarse-grained set of operations to clients.

**Architecture**:
*Diagram from L6 S53*

#### **6. Composite Entity**

The composite entity's purpose is to manage a set of interrelated persistent objects to improve efficiency.

This pattern groups related objects into a single entity bean.

**Class Diagram**:
*Diagram from L6 S56*


#### **7. Value List Handler**

The value list handler's purpose is to manage a list of data items/objects to be presented to clients.

The result data lists produced by database searches can be very large, so it is impractical to represent the whole set in memory at once.

**Class Diagram**:
*Diagram from L6 S61*

### EIS Integration Patterns

#### **8. Data Access Object**

The data access object's purpose is to abstract details from particular persistent storage mechanisms, hiding these details from the business layer.

**Class Diagram**:
*Diagram from L6 S64*
