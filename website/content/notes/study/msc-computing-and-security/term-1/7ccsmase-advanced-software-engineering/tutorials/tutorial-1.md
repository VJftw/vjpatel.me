---
date: "2016-10-13T23:26:19+01:00"
course: "MSc Computing and Security"
module: "7CCSMASE Advanced Software Engineering"
title: "Tutorial 1"
---

>A newly hired project manager at a company questions why the quality manager is involved in the feasibility study phase of project, rather than joining the team only when the project has been approved, as at the new manager’s previous company. What argument(s) might the quality manager offer in favour of her involvement in the feasibility study?

The quality manager will be able to decide if the quality requirements can be met. E.g. Some medical equipment that needs to be delivered in a short time might be of worser quality. Worser quality could risk people’s lives and so the project wouldn’t be feasible.

>A company procedures call for peer review not only of each source code module, but also of test cases and scaffolding for testing that module. Anita argues that inspecting test suites is a waste of time; any time spent on inspecting a test case designed to detect a particular class of fault could more effectively be spent inspecting the source code to detect that class of fault. Anita’s project manager on the other hand, argues that inspecting test cases and scaffolding can be cost-effective when considered over the whole lifetime of a software product. What argument(s) might Anita’s manager offer in favour of this conclusion?

If the test case is not inspected and updated, there is no quick verification (and potentially no verification at all if people forget to test the specific bug) to see if the bug has been fixed. This would result in the same bug potentially resurfacing down the line and thus more time spent fixing it.

>For each of the following statements, explain whether or not it is meaningful and if the statement is meaningless say whether there is a “quick fix" which could make the statement more meaningful.

 - **100C is the boiling point of water**: Meaningful
 - **Today is twice as hot as yesterday**: Meaningless. We don’t know when yesterday was and so we cannot extract how hot the day really was. If yesterday was 1C, then today would be 2C. If yesterday was 15C, then today would be 30C. State how hot yesterday was.
 - **The program is 50 lines of code long**: Meaningless. This could be meaningful if the programming language uses whitespace for semantics (i.e. Python)

>You manage an online service that sells downloadable video recording of classic movies. A
typical download take one hour, and an interrupted download must be restarted from the
beginning. The number of customers engaged in a download at any given time ranges from
10 to about 150 during the peak hours. On average, your system goes down (dropping all
connections) about two times per week, for an average of three minutes each time. If you
can double the availability or double mean time between failures, but not both, which will
you choose? Why?

- If we double the mean time between failures we get 1 failure per week with 6 minutes downtime:
10 people every 60 minutes. The download takes 1 hour. If the system goes down, those 10 people will have to restart their download and 1 person will not be able to connect, resulting in 11 people altogether.
150 people every 60 minutes. The download takes 1 hour. If the system goes down, those 150 people will have to restart their download and 15 people will not be able to connect, resulting in 165 people altogether.


- If we double the availability, we still have 2 failures per week but with 1.5 minutes downtime:
10 people every 60 minutes. The download takes 1 hour. If the system goes down, those 10 people will have to restart their download. With 2 failures a week this results in 20 people altogether.
150 people every 60 minutes. The download takes 1 hour. If the system goes down, those 150 people will have to restart their download and 7.5 people will not be able to connect, resulting in 315 people altogether.

As shown by the maths, doubling the mean time between failures would be the most appropriate choice in this scenario.
