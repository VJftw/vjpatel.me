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
