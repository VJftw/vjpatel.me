+++
date = "2016-11-03T23:26:19+01:00"
title = "7CCSMASE - Tutorial 4"
markup = "mmark"
+++

> Design Example:  A vending machine
 - Release item after receiving 15 cents
   - Single coin slot for dimes (10 ¢) and nickels (5 ¢) - assuming sensor specifies coin type
   - Machine does not give change

> Draw state diagram by considering the below input sequences:
 - 3 nickels
 - 2 nickels, dime
 - Nickel, dime
 - Dime, nickel
 - Two dimes

>**Inputs**: N, D, reset
>**Output**: Open

>*What would change if, for example, the machine had the option to dispense two types of chocolate bar? There would be two buttons to choose a bar (say, one for Mars and one for Snickers) and the machine would give change.*

![alt text](https://docs.google.com/drawings/d/1f_AUrQw5myo7kbfX6l3yus9hVj9Kt6ZNRTAmGZqefhw/pub?w=800&h=366 "Vending Machine")



>2. Suppose test suite A satisfies adequacy criterion C1. Test suite B satisfies adequacy criterion C2, and C2 subsumes C1. Can we be certain that faults revealed by A will also be revealed by B?

Yes. *Subsumes* is a synonym for *includes* and thus the tests in C2(B) include the tests in C1(A).
