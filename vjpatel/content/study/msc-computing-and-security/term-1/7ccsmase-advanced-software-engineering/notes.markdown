+++
date = "2016-10-13T23:26:19+01:00"
title = "7CCSMASE Advanced Software Engineering notes"
markup = "mmark"
+++

## Nutshell

**Learning objectives**:

 - View the big picture of software quality in the context of software development and organisation.
 - Introduce the range of software verification and validation activities.
 - Provide a rationale for selecting and combining them within a software development process.

### Verification vs Validation

- **Verification**: Is ensuring that a product has been built according to the requirements and design specifications. *Are we building the software right?*
- **Validation**: Is ensuring that the product actually meets the user's needs. *Are we building the right software?*

Verifications and Validation start as soon as we decide to build a software product.

In the feasibility study of a new project, the required qualities and their impact on the overall cost must be taken into account. Validation and Verification continues far beyond the product delivery as long as the software is in use.

### Dependability

 - **Availability**: Measures the quality of service in terms of up-time.
 - **Mean time between failures (MTBF)**: Measures the quality of service in terms of average time between failures.
 - **Reliability**: The probability that a product will work for a stated period of time.


Can be measured in different ways, e.g. Say we had a 50 interactions terminating with a credit card charge. The software operates flawlessly up until the credit card charge where it fails 50% of the time.
 - If we count every interaction, we have 99% reliability as only 1 operation in 100 fails.
 - If we count entire sessions, we have 50% reliability as half the sessions fail.

#### Assessing Dependability

- Randomly generated tests
- **Alpha test**: Tests performed by users in a controlled environment, observed by the development organisation.
- **Beta test**: Tests performed by real users in their own environment, performing actual tasks without interference or close monitoring.


Test and analysis does not stop after the first release as software products operate for many years and undergo many changes. We should have test and analysis of new and modified code, re-execution of system tests and extensive record keeping.


---

## A Framework for Testing and Analysis


- **Optimistic inaccuracy**: We may accept some programs that do not possess the property (i.e. it may not detect all violations)
- **Pessimistic inaccuracy**: It is not guaranteed to accept a program even if the program does possess the property being analysed.
- **Simplified properties**: Reduce the degree of freedom for simplifying the property to check.

### Testing vs Analysis

#### Testing
Examines individual program executions where the results only apply to the executions examined.

- Finds faults (*Debug* testing). A test is successful if the program fails.
- Provides confidence (*Acceptance* testing) of reliability (and probable correctness) and detection (therefore absence) of particular faults.

#### Static Analysis
Examines all possible executions of text in the artefact for:
  - proof of correctness
  - deadlock detection
  - safety

Formal proof of software properties. Gives a compromise between the complexity of analysis and accuracy of the result.

Generally in engineering there are 3 principles:
 - Partition: divide and conquer.
  - Divide testing into unit, integration, subsystem and system testing. We'll have different types of faults at different stages.
  - We can use stubs to abstract other parts of the model so dependent parts of code can be tested without the full system being implemented.
 - Visibility: making information accessible, measuring progress against goals.
  - $$x$$ *Visibility*: ability to judge on how we are doing on $$X$$. Are we ahead or behind schedule? Does quality meet our objectives?
  - Set goals that can be assessed at each stage of development.
 - Feedback: tuning the development process.
  - Each project provides information to improve on the next (learning from experience).

Specific A&T principles:
 - Sensitivity: better to fail every time than sometimes.
  - **Machine independency**
  - every run of the test should provide the same result.
 - Redundancy: Making intentions explicit.
  - Static type checking is made redundant with dynamic type checking, but still reveals mismatches earlier (upon compilation).
 - Restriction: Making the problem easier.
  - Can reduce hard (unsolvable) problems to be simpler (solvable) problems.
  - A weaker spec may be easier to check. e.g. It is difficult to show that pointers are used correctly, whereas it is easy to show the pointers are initialised before use.


### The Quality Process

A set of activities and responsibilities focused on ensuring adequate dependability. It is concerned with project schedule or usability and provides a framework for selecting and arranging activities and trade-offs with other goals.

#### Trade-offs

**High-dependability** vs **time to market**:

- Mass market products
  - Is better to achieve a reasonably high level of dependability on a tighter schedule.
- Critical medical devices
  - Better to achieve ultra-high dependability on a longer schedule.

#### Properties of the Quality Process

- **Completeness**: Appropriate activities are planned to detect each important class of faults.
- **Timeliness**: Faults are detected at a point of high leverage (as early as possible).
- **Cost-effectiveness**: Activities are chosen depending on cost and effectiveness.

Quality goals can be achieved only through careful planning.

**Process Visibility**: A process is visible to the extent that one can answer *"How does our progress compare to our plan?"*

Quality activities should be placed as early as possible in the process. e.g.:
 - Test cases should be designed as early as possible instead of JIT.

Doing this motivates the use of *proxy* measures, where the number of faults in design or code is not a true measure of reliability; but we can count faults discovered in design inspections as an indicator of future potential quality problems.


#### Dependability Qualities

- **Reliability**: Probability of failure free.
- **Correctness**: A program is correct if it is consistent with its specification. Boolean, no middle ground. A correct program is reliable.
- **Robustness**: Acceptable/Degraded behaviour under extreme conditions. e.g. traffic lights in a power/communication cut.
- **Safety**: Preventing hazards. A safe program is robust.

A correct and safe system is not always useful!
 - A system that does nothing.
 - A system might be too slow, has terrible UI, no documentation or missing critical features.

***Example Traffic Light System***:
Letting traffic pass according to correct pattern and central scheduling satisfies *Correctness* and *Reliability*.
Providing degraded performance when necessary provides *Robustness* and *Safety*.


### Analysis

#### Manual inspection (Peer review?)

Can be applied to any document. But takes a considerable amount of time.

#### Automatic analysis

Limited applications, cannot be used with natural language documents. However are cost-effective and fast.


### Allocation of responsibilities

Example:
- Unit testing: Developer team.
- Integration, system and acceptance: Quality team, developers may produce scaffolding and oracles.
- Inspection and walk-through: mixed.
- Regression testing: Quality and maintenance teams.
- Process improvement: External specialists interacting with teams.

---

## Adequacy and Finite State Machines (FSM)

### Terminology

- **Test case**: A set of inputs, execution conditions and a pass/fail criterion.
- **Test case specification**: A requirement to be satisfied by one of more test cases (e.g. "two integer inputs").
- **Test obligation**: A partial test case specification, requiring some property deemed important for thorough testing (e.g. "check all statements").
- **Test suite**: A set of test cases.
- **Test** or **Test execution**: The activity of executing test cases and evaluating their results.
- **Adequacy criterion**: A predicate that defines what properties of a program must be exercised to constitute a through test.

### Test Obligations

Come from:
 - Functional (black box, specification-based). e.g. If specification requires robust recovery from power failure, the test obligations should include a simulated power failure.
 - Structural (White box, code-based). e.g. Traverse each program loop one or more times.
 - Model-based. e.g. Exercise all transitions in a communication protocol model.
 - Fault-based. e.g. Check for buffer overflow handling by testing very large inputs.

### Adequacy
If a system passes and adequate suite of test cases, then it must be *correct*. This is impossible as it is provably undecidable and so we have to settle with weaker indications for adequacy.

Adequacy is a **stopping** rule (sufficient amount of testing has been done) (statement coverage) and **provides measurements** of test quality (code coverage percentage).

**Adequacy criterion = set of test obligations**: A test suite passes an adequacy criterion if:
 - all the tests pass
 - Every test obligation in the criterion is satisfied by at least one of the test cases in the test suite.

**Subsumes**: means *includes*.


### Finite State Machines

N/A for me.

---

## Functional, Model based and Random Testing Techniques

### Testing Techniques

**Static**:
 - Review, Inspection
 - Static analysis

**Dynamic**:
 - **Black box**: not based on code
   - Functional testing
   - Model-based testing
   - Random testing
   - Combinatorial testing
   - Stress testing
 - **White Box**:
   - Data flow testing
   - Statement testing
   - Condition testing
   - Branch testing
   - Unit testing
 - **Grey Box**: Having some knowledge of the internals
   - Fault-based testing
 - Experienced based


### Testing Approaches

**Systematic Testing**:
  - Structural testing: White box testing, judging test suite thoroughness based on the structure of the program.
  - Functional testing: Black box testing, deriving test cases from specifications.

**General types of testing**:
  - Random testing
  - Stress testing


### Functional testing

Uses the specification to partition the input space. e.g. login programs suggest that username and passwords should match ones in the database.

We can test each category and boundaries between them. There is no guarantee but experience suggests that most failures occur at boundaries e.g. age must be between 18-50.

Functional testing is the base-line technique for designing test cases:
 - Timely: Often used in refining specifications and assessing testability before code is written.
 - Effective: Find some classes of fault (e.g. missing login) that can elude other approaches.
 - Widely applicable: to any description of a program behaviour and at any level of granularity.
 - Economical: typically less expensive to design and execute than structural tests.

Only a description of intended behaviour is needed to design functional tests (even incomplete and informal specifications can be used). This makes functional testing useful for assessing testability.

Functional testing is best for *missing logic* faults.


#### Steps from Specification to Test cases

1. Decompose the specification.
2. Select representatives.
3. Form test specifications.
4. Produce and execute actual tests.


### Model Based Testing
A model is a description of a system's behaviour and are very useful to visualise a complex system.

 - It's cheaper in test design as it is quicker to model than manually design tests.
 - It is systematic.
 - Early detection of specification ambiguities which allows us to catch defects earlier.
 - A change in the model means we can regenerate tests.


#### Covering Finite State Machines

- **State coverage**: Every state in the model should be visited by at least one test case.
- **Transition coverage**: Every transition between states should be traversed by at least one test case. (This is the most commonly used as transition coverage subsumes state coverage).

If there is ***Path*** sensitive criteria:
 - **Single state path coverage**: Traverse each subpath that reaches each state at most once.
 - **Single transition path coverage**: Traverse each transition at most once.
 - **Boundary interior loop coverage**: Each distinct loop of the state machine must be exercised the minimum, an intermediate, and the maximum/large number of times. (Most common)


### Random Testing
Is a type of black-box testing where all of the test inputs are generated randomly. We use Random testing if we have a lot of time and our goal is to increase reliability. It takes a lot of time as we need to write a random test generator. We shouldn't use Random testing when there is a non-uniform distribution of faults e.g. in quadratic equation, we may obtain a divide by zero error when a = 0.

Random testing is *uniform* as it picks possible inputs uniformly, giving them all the same worth, whereas in systematic testing(*non-uniform*) inputs are biased by the test designer.

We can define some distribution over the set of possible inputs. e.g. with a thermostat, our distribution could use extreme temperatures or frequently occurring temperatures.

The data obtained from random testing can be used to estimate reliability. Use of random test inputs may save some time and effort the more thoughtful test input selection methods require.

Random test data can be selected from:
 - Random generation
 - Random sequences
 - Random selection from existing data sets

#### Steps for Random Testing

1. The input domain is identified.
2. Test inputs are selected independently from the domain.
3. The system under test is executed on these inputs. These inputs constitute a random test set.
4. The results are compared to the system specification. The test fails if any input leads to unexpected results, otherwise it passes.

---

## Structural Testing

Is judging the test suite thoroughness based on the structure of the program itself. It provides some confidence in how thorough a test suite is.

It can be used to answer what is **missing** from a test suite as it can tell you what parts of a program are executed during a test suite. A **part** can be:
 - a CFG element or combination of them
 - Fragments and combinations of conditions, paths and targets.

### Types of Structural Coverage

- **Statement Coverage**:
  - Every statement in the program has been invoked at least once.
- **Decision (Branch) Coverage**:
  - Every point of entry and exit in the program has been invoked at least once.
  - Every decision in the program has taken all possible outcomes at least once.
- **Condition Coverage**:
  - Every point of entry and exit in the program has been invoked at least once.
  - Every condition in a decision in the program has taken all possible outcomes at least once.
- **Condition/Decision Coverage**: (All criteria from Decision and Condition)
- **Modified Condition/Modified Decision (MC/DC)**:
  - All criteria from Condition/Decision.
  - Every condition in a decision has been shown to independently affect that decision's outcome.
- **Multiple Condition Coverage**:
  - All criteria from MC/DC.
  - Every combination of condition outcomes within a decision has been invoked at least once.


### Modified Condition/Modified Decision
Is a cut down version of Multiple Condition Coverage in order to test **important** combinations of conditions without test suite size increasing exponentially.

**Requires**:
 - For each basic condition $$c$$, two test cases.
 - Values of all evaluated conditions except $$c$$ are the same.
 - Compound condition as a whole evaluates to *true* for one and *false* for the other.

In general we need $$n + 1$$ test cases, where $$n$$ is the number of conditions $$c$$.


### Cyclomatic Complexity

Is a quantitative measure of the number of linearly independent paths through a program's source code. It measures how complex a source code's logic is.

For a CFG: $$\text{edges} - \text{nodes} + 2$$


### Boundary interior path testing

- Follow each path in the CFG up to the first repeated node.
- The set of paths from the root of the tree to each leaf is the required set of subpaths. i.e. each possible outcome from the loop.


---

### Test Driven Development


---

## Combinatorial Testing

We identify distinct attributes that can be varied. e.g.

 - Browser: Firefox | Chromium | Internet Explorer etc.
 - OS: Windows 10, Windows Vista, Windows XP, OSX

We then systematically generate combinations to be tested. e.g.

 - Firefox on Windows 10
 - Firefox on Windows XP
 - Firefox on OSX

The test cases should be varied and include possible *corner cases*.


### Category-partition testing

**Steps**:

1. Decompose specification into independently testable features.
2. identify relevant values, in this step we break the testable part into the properties we will test:
  - normal values
  - boundary values
  - special values
  - error values
3. Introduce constraints. e.g. one value may require that another is disabled.

1. **Analyse the specification** by identifying each functional part that can be tested separately.
2. **Identify categories** by thinking about what will be needed in the testing environment and parameters to test. e.g. Database (environmental) and field properties for an entity, length of string code, type checks etc.
3. **Partition categories** by coming up with test data pass the constraint and also test data that will fail the constraint.
4. **Identify constraints** by identifying the relationships. e.g. one value may require that another is disabled. Other fields might be required dependent on another field.
5. **Rewrite test specification**
6. **Generate test cases**


The downside to category partition testing is that the test suite size grows exponentially as the number of categories increases. It is most effective when the constraints reduce the amount of possible.

### Pairwise testing

We generate combinations that efficiently cover all pairs of classes. The rationale behind this is that most failures are triggered by single values or combinations of few values and we should be able to reveal most faults.

Given a test suite:

| Test ID | X | Y | Z
|---------|---|---|---
|    1    | A | C | E
|    2    | A | D | E
|    3    | A | C | F
|    4    | A | D | F
|    5    | B | C | E
|    6    | B | D | E
|    7    | B | C | F
|    8    | B | D | F

For each test case, we have 3 different combinations: `XY`, `XZ`, `YZ` and we can see if that combination has been tested elsewhere in the suite.

We can remove 4 constraints:

2. ADE because `AE`(1), `AD`(4), `DE`(6).
3. ACF because `AC`(1), `AF`(4), `CF`(7).
5. BCE because `BC`(7), `BE`(6), `DE`(6).
8. BDF because `BD`(6), `BF`(7), `DF`(4).


## Program Analysis

- **Optimistic inaccuracy**: We may accept some programs that do not possess the properties. i.e. it might not detect all violations.
- **Pessimistic inaccuracy**: It is not guaranteed to accept a program even if the program does possess the property being analysed.
- **Simplified properties**: reduce the degree of freedom by simplifying the property to check.

We use *Analysis* to exhaustively check properties that are difficult to test e.g.:
 - Faults that rarely cause failures
 - Faults that only cause failures under conditions that are difficult to control.

### Static vs Dynamic Analysis


**Static Analysis**: Examines program source code.

**Dynamic Analysis**: Examines program execution traces.


### Data-flow Analysis

 - A **definition-use** (def-use) (du) path associates a point in a program where a **value** is **produced** with a point where it is **used**.
 - A **definition-clear** path is a def-use path with only one defining point for the **value**.
 - **Reaching definitions** are how far a variable goes in a program.

 e.g.

```
public int kcl(in x, int y)
{
  int a; // def x, y
  int b;

  while (y <= 0) { // use y
    a = x*y; // def a; use x, y
    b = y-x; // def b; use x, y
    y++; // def y; use y
  }

  return a; // use a
}
```

### Concurrency Faults

 - **Deadlocks**: Threads blocked waiting for each others lock. (Dining Philosophers)
 - **Data races**: Concurrent access to modify shared resources.

These faults are **NON-DETERMINISTIC**.


### Memory Faults

- **Dangling pointers**: De-allocating memory accessible through pointers.
- **Memory leaks**: Failing to De-allocate memory that's not accessible anymore. Hard to detect as not an immediate failure and may lead to memory exhaustion after long periods of execution.

These can be prevented by using:
 - program constructs. Gives limited use of dynamic memory allocation.
 - analysis tools. Java checks for out-of-bounds objects.
 - Automatic garbage collection.

---

## Symbolic Execution

Is execution of a program using symbols as arguments. Unlike concrete execution, where the path taken is determined by the input, symbolic execution takes any feasible path.

**Uses**:
 - Test-input generation
 - Bug finding
 - Program verification
 - Worst case execution time estimation for real-time software


**Limitations**:
 - Does not scale when there is a large number of paths.
 - Source code is required for precise execution


## System, Acceptance and Regression Testing

### System Testing

 - **Type**: Verification
 - **Tests for**: Correctness, Completion.
 - **Tested by**: Development team.

Is a **comprehensive** test based on the specification of observable behaviour that is independent of design and implementation.

System tests are often used to measure project progress.

#### Independent Validation & Verification

System and acceptance testing can be performed by a different organisation who don't have any pressure to "accept" the programs. This is useful for critical systems but expensive.

Otherwise, if the development organisation controls system testing, it is best to develop system test cases early from the specification.

### Acceptance Testing

 - **Type**: Validation.
 - **Tests for**: Usefulness, Satisfaction.
 - **Tested by**: Users.

Formal testing with respect to user needs, requirements and business processes conducted to determine whether or not a system satisfies the acceptance criteria and to enable the user, customers or other authorised entity to determine whether or not to accept the system.

### Regression Testing

 - **Type**: Verification
 - **Tests for**: Accidental changes.
 - **Tested by**: Development team.

Tests must be re-ran after any change. A feature that was working might not work again after code changes and so we need to test features again.


### Stress Testing


### Usability Testing

A usable product:

 - is quickly learned
 - allows users to work efficiently
 - pleasant to use

Objective criteria:

 - Time and number of operations to perform a task
 - Frequency of user error


We can use **prototypes** in early stages for ***validation***. Developers can then ***verify*** during development.


---

## Fault Based Testing

Fault based testing is testing based on common software faults. e.g.:
 - division by zero
 - buffer overflow
 - memory management mistakes
 - array boundaries

The two strategies we discuss are:
 - Error seeding
 - Mutation testing

### Error Seeding

We judge the effectiveness of a test suite in finding real faults by measuring how well it finds seeded fake faults. This is valid to the extent that the seeded bugs are representative of real bugs.

### Mutation Testing

A ***mutant*** is a copy of the program with a change(mutation). The mutation is a syntactic change (bug) e.g. change `(i < 0)` to `(i <= 0)`.

We run the test suite on all of the mutant programs. A mutant is *killed* if it fails on a test suite. An effective test suite results in all the mutants being killed. The coverage/score is the percentage of mutants dead / total of mutants.

**Syntactic change operators**:
 - crp: constant for constant replacement. e.g. `(x < 5)` to `(x < 12)`.
 - ror: relational operator replacement. e.g. `(x <= 5)` to `(x < 5)`.
 - vie: variable initialisation elimination. e.g. `int x = 5;` to `int x;`.

A problem is that as there will be lots of mutants, running the test suite on these mutants will be expensive.

#### Weak Mutations

To solve this, we can create a meta-mutant that has many seeded faults and we can mark seeded faults killed as soon as a difference in an intermediate state is found.

#### Statistical Mutation

Another solution is to create a random sample of mutants.

### Fault Injection

- **Compile time injections**: Source code is modified to inject simulated faults into a system.
- **Run-time injections**: Makes use of a software trigger to inject a fault. They can be time-based triggers or interrupt-based triggers.

---

## Test Execution

### Scaffolding

Is code produced to support development activities. Not part of the product seen by the end user and may be temporary. It includes drivers(runner program), harnesses(environment) and stubs(substituted objects).

#### Software Observability

How easy it is to observer the behaviour of a program in terms of its outputs, effects on the environment and other software and hardware components.

Software that affects hardware devices, databases have low observability.

#### Software Controllability

How easy is it to provide a program with the needed input.


#### Generic Scaffolding

Reusable.

### Oracles

Did the test case succeed of fail.

Sometimes we have to capture and replay a test case to see how a test fails.

<script src='https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'></script>
