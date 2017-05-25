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


### Class Diagrams

**Class Diagrams** represent the structure of the system.

*NOTE: DIAGRAM (Slide 40 of Lecture1b)*


### Sequence Diagrams

**Sequence Diagrams** represent the behaviour of a system as messages (interactions) between different objects.

### Statechart Diagrams

**Statechart diagrams** represent the behaviour of a single object with interesting dynamic behaviour.

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
