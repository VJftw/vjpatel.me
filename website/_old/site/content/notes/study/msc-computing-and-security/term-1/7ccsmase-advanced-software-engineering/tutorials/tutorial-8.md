+++
date = "2016-11-20T01:03:19+00:00"
course = "MSc Computing and Security"
module = "7CCSMASE Advanced Software Engineering"
title = "Tutorial 8"
latex = true
+++

>1. Consider the deceptively simple program below. Consider the three initial values of `a`, `b` and `c` to be inputs to the program. So the search space for test data generation is a vector of three values `<a, b, c>`. In this exercise, we are concerned with branch and target coverage. There are four targets: 1, 2, 3, 4 in the program for which we wish to generate test data.

```java
int a, b, c

if (a>b)
    c = 1 /* target 1 */ ;
else {
    c = 2;

    if (b==c)
    /* target 2 */ ;
}

if (c==3)
    do something; /* target 3 */ ;
if (b==42)
    do something else; /* target 4*/ ;
```
>a). Consider the following 3 input vectors and show what each output each produces.

> i). `<1, 2, 3>`

The program will reach `/* target 2 */` and end with `<1, 2, 2>`.

> ii). `<-1, -1, 4>`

The program will end with `<-1, -1, 2>`.

> iii). `<24, 52, 1>`

The program will end with `<24, 52, 2>`.

> iv). None of these cover target 1. Which comes closest?

ii). comes closest as it gets closest to `a > b`.

>b). Explain why it is not possible to cover target 3 in this program. Which input vector or vectors come closest to hitting target 3?

Because of the first if-else statement, `c` is always set to either `1` or `2`. When `a < b`, then `c = 2` and that is the closest the program gets to hitting target 3.

> c). Which input vectors hit target 4?

`<1, 42, 2>`

> d). Is it possible to achieve 100% branch coverage? If yes, give the test suite with 100% coverage. If not, explain why not and construct a test suite that covers all the reachable branches.

It is not possible to attain 100% branch coverage as target 3 is unreachable. The following test suite covers the other branches:

- {{<latex i="TC_1" />}}: `<3, 2, 1>` (target 1)
- {{<latex i="TC_2" />}}: `<1, 2, 1>` (target 2)
- {{<latex i="TC_3" />}}: `<1, 42, 1>` (target 4)

This could be done with 2 test cases, but then you are combining 2 targets into one test.

>2. Assume you have a part of a program:

```java
if ((a && b) || c) do X;
else do Y;
```

> Construct a test suite that gives 100% condition coverage; 100% branch coverage; 100% MC/DC.

**Test Suite**:
 - {{<latex i="TC_1" />}}: `TTT`
 - {{<latex i="TC_2" />}}: `TTF`
 - {{<latex i="TC_3" />}}: `TFF`
 - {{<latex i="TC_4" />}}: `FFF`
 - {{<latex i="TC_5" />}}: `FFT`
 - {{<latex i="TC_6" />}}: `FTT`
 - {{<latex i="TC_7" />}}: `FTF`
 - {{<latex i="TC_8" />}}: `TFT`

$(a \\&\\& b) || c$

```
a:
  TTF = T x
  FTF = F x
b:
  TTF = T
  TFF = F x
c:
  TFT = T x
  TFF = F
```


>3. Calculate the McCabe Number (cyclomatic complexity) for the following graphs:

- a). {{<latex i="e - n + c = 1 - 2 + 2 = 1" />}}
- b). {{<latex i="e - n + c = 4 - 4 + 2 = 2" />}}
- c). {{<latex i="e - n + c = 2 - 4 + 2 = 0" />}}
- d). {{<latex i="e - n + 2 = 15 - 13 + 2 = 4" />}}

a, b, c) are control flow graphs, whereas d is an arbitrary graph.
