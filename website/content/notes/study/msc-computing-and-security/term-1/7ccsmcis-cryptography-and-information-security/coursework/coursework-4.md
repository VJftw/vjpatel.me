---
date: "2016-11-25T14:26:19+01:00"
course: "MSc Computing and Security"
module: "7CCSMCIS Cryptography and Information Security"
title: "Coursework 4"
latex: true
---

> What is a one-way function and what are its properties?

A function {{<latex i="f: X \rightarrow Y" />}} is a one-way function, if {{<latex i="f" />}} is *easy* to compute for all {{<latex i="x \in X" />}} but {{<latex i="f^{-1}" />}} is *hard* (or *infeasible*) to compute.

> What is a trapdoor one-way function? Give one example.

A trapdoor one-way function {{<latex i="f_k: X \rightarrow Y" />}} is a one-way function where given the {{<latex i="k" />}} it becomes feasible to compute {{<latex i="f^{-1}_k" />}} but is infeasible otherwise.
e.g. modular cube roots when we know {{<latex i="p" />}} and {{<latex i="q" />}}.

---

> Use both Euclid's algorithm and Extended Euclid's algorithm to compute {{<latex i="gcd(1970, 1066)" />}}, showing all steps of the computations.

```
Euclid(a, b):
    if b == 0:
        return a
    else
        return Euclid(b, a % b)
```

**Extended Euclid's** (Unravelling):

Remember:

- {{<latex i="d = d_{i-1}" />}}
- {{<latex i="x = y_{i-1}" />}}
- {{<latex i="y = x_{i-1} - (q \times x)" />}}


| {{<latex i="a" />}}    | {{<latex i="b" />}}    | {{<latex i="q = [a/b]" />}} | {{<latex i="d" />}} | {{<latex i="x" />}}    | {{<latex i="y" />}}                           |
| ---------------------- | ---------------------- | --------------------------- | ------------------- | ---------------------- | --------------------------------------------- |
| {{<latex i="1970" />}} | {{<latex i="1066" />}} | {{<latex i="1" />}}         | {{<latex i="2" />}} | {{<latex i="-204" />}} | {{<latex i="173 - (1 \times -204) = 377" />}} |
| {{<latex i="1066" />}} | {{<latex i="904" />}}  | {{<latex i="1" />}}         | {{<latex i="2" />}} | {{<latex i="173" />}}  | {{<latex i="-31 - (1 \times 173) = -204" />}} |
| {{<latex i="904" />}}  | {{<latex i="162" />}}  | {{<latex i="5" />}}         | {{<latex i="2" />}} | {{<latex i="-31" />}}  | {{<latex i="18 - (5 \times -31) = 173" />}}   |
| {{<latex i="162" />}}  | {{<latex i="94" />}}   | {{<latex i="1" />}}         | {{<latex i="2" />}} | {{<latex i="18" />}}   | {{<latex i="-13 - (1 \times 18) = -31" />}}   |
| {{<latex i="94" />}}   | {{<latex i="68" />}}   | {{<latex i="1" />}}         | {{<latex i="2" />}} | {{<latex i="-13" />}}  | {{<latex i="5 - (1 \times -13) = 18" />}}     |
| {{<latex i="68" />}}   | {{<latex i="26" />}}   | {{<latex i="2" />}}         | {{<latex i="2" />}} | {{<latex i="5" />}}    | {{<latex i="-3 - (2 \times 5) = -13" />}}     |
| {{<latex i="26" />}}   | {{<latex i="16" />}}   | {{<latex i="1" />}}         | {{<latex i="2" />}} | {{<latex i="-3" />}}   | {{<latex i="2 - (1 \times -3) = 5" />}}       |
| {{<latex i="16" />}}   | {{<latex i="10" />}}   | {{<latex i="1" />}}         | {{<latex i="2" />}} | {{<latex i="2" />}}    | {{<latex i="-1 - (1 \times 2) = -3" />}}      |
| {{<latex i="10" />}}   | {{<latex i="6" />}}    | {{<latex i="1" />}}         | {{<latex i="2" />}} | {{<latex i="-1" />}}   | {{<latex i="1 - (1 \times -1) = 2" />}}       |
| {{<latex i="6" />}}    | {{<latex i="4" />}}    | {{<latex i="1" />}}         | {{<latex i="2" />}} | {{<latex i="1" />}}    | {{<latex i="0 - (1 \times -1) = -1" />}}      |
| {{<latex i="4" />}}    | {{<latex i="2" />}}    | {{<latex i="1" />}}         | {{<latex i="2" />}} | {{<latex i="0" />}}    | {{<latex i="1 - (2 \times 0) = 1" />}}        |
| {{<latex i="2" />}}    | {{<latex i="0" />}}    | {{<latex i="-" />}}         | {{<latex i="2" />}} | {{<latex i="1" />}}    | {{<latex i="0" />}}                           |

---

> Consider the primes {{<latex i="p = 11" />}} and {{<latex i="q = 23" />}}.
> Calculate {{<latex i="n" />}} and {{<latex i="\phi(n)" />}}

For this we should know:
- {{<latex i="n = pq" />}}
- {{<latex i="\phi(n) = (p - 1)(q - 1)" />}}

{{<latex>}}
n = 11 \times 23 = 253
{{</latex>}}

{{<latex>}}
\begin{aligned}
\phi(n) &= (11 - 1)(23 - 1)\\
 &= 10 \times 22\\
\phi(n) &= 220
\end{aligned}
{{</latex>}}

> Explain which of the values {{<latex i="e = 3" />}} or {{<latex i="e = 5" />}} is usable as a public key for this given {{<latex i="n" />}}.

We have to choose an {{<latex i="e" />}} where {{<latex i="gcd(\phi(n), e) = 1" />}} and {{<latex i="1 < e < \phi(n)" />}}.

Let's try {{<latex i="gcd(220, 3)" />}} first.

| {{<latex i="a" />}}   | {{<latex i="b" />}} | {{<latex i="q = [a/b]" />}} | {{<latex i="d" />}} | {{<latex i="x" />}} | {{<latex i="y" />}} |
| --------------------- | ------------------- | --------------------------- | ------------------- | ------------------- | ------------------- |
| {{<latex i="220" />}} | {{<latex i="3" />}} | {{<latex i="73" />}}        |                     |                     |
| {{<latex i="3" />}}   | {{<latex i="1" />}} | {{<latex i="3" />}}         |                     |                     |
| {{<latex i="1" />}}   | {{<latex i="0" />}} | {{<latex i="-" />}}         |                     |                     |

As we can see, {{<latex i="gcd(220, 3) = 1" />}}. Let's try {{<latex i="gcd(220, 5)" />}} just to show the difference.

| {{<latex i="a" />}}   | {{<latex i="b" />}} | {{<latex i="q = [a/b]" />}} | {{<latex i="d" />}} | {{<latex i="x" />}} | {{<latex i="y" />}} |
| --------------------- | ------------------- | --------------------------- | ------------------- | ------------------- | ------------------- |
| {{<latex i="220" />}} | {{<latex i="5" />}} | {{<latex i="44" />}}        |                     |                     |
| {{<latex i="5" />}}   | {{<latex i="0" />}} | {{<latex i="-" />}}         |                     |                     |

As we can see, {{<latex i="gcd(220, 5) = 5" />}}, therefore {{<latex i="e = 5" />}} is **NOT** suitable. {{<latex i="e = 3" />}} is suitable.


> Use the Extended Euclid's algorithm to calculate {{<latex i="d" />}} with the {{<latex i="e" />}} you have chosen.

We find our {{<latex i="d" />}} by finding the top value of {{<latex i="y" />}} in our previous table. We use the following rules (going backwards)

- {{<latex i="d = d_{i-1}" />}}
- {{<latex i="x = y_{i-1}" />}}
- {{<latex i="y = x_{i-1} - (q \times x)" />}}


| {{<latex i="a" />}}   | {{<latex i="b" />}} | {{<latex i="q = [a/b]" />}} | {{<latex i="d" />}} | {{<latex i="x" />}} | {{<latex i="y" />}}                       |
| --------------------- | ------------------- | --------------------------- | ------------------- | ------------------- | ----------------------------------------- |
| {{<latex i="220" />}} | {{<latex i="3" />}} | {{<latex i="73" />}}        | {{<latex i="1" />}} | {{<latex i="1" />}} | {{<latex i="0 - (73 \times 1) = -73" />}} |
| {{<latex i="3" />}}   | {{<latex i="1" />}} | {{<latex i="3" />}}         | {{<latex i="1" />}} | {{<latex i="0" />}} | {{<latex i="1 - (3 \times 0) = 1" />}}    |
| {{<latex i="1" />}}   | {{<latex i="0" />}} | {{<latex i="-" />}}         | {{<latex i="1" />}} | {{<latex i="1" />}} | {{<latex i="0" />}}                       |


We get {{<latex i="y = -73" />}}, therefore {{<latex i="d = -73 \bmod 220 = 247" />}}.

> Encrypt {{<latex i="M = 165" />}} and then decrypt the resulting ciphertext.

We use {{<latex i="C = M^e \bmod n" />}}.

{{<latex>}}
\begin{aligned}
C &= 165^3 \bmod 253\\
C &=
\end{aligned}
{{</latex>}}

**Decryption**:

Using {{<latex i="M = C^d \bmod n" />}}.

{{<latex>}}
\begin{aligned}
M &= C^{147} \bmod 253\\
M &=
\end{aligned}
{{</latex>}}

---

> Consider the RSA algorithm with {{<latex i="n = 55" />}} and {{<latex i="e = 7" />}}.

> - Encipher the plaintext {{<latex i="M = 10" />}}.

Use {{<latex i="C = M^e \bmod 55" />}}.

> - Break the cipher by finding {{<latex i="p" />}}, {{<latex i="q" />}} and {{<latex i="d" />}}.

We know:

- {{<latex i="n = pq" />}}, {{<latex i="n = 55" />}}

We can guess {{<latex i="p = 5" />}}, {{<latex i="q = 11" />}} as 2 primes.

- {{<latex i="\phi(n) = (p - 1)(q - 1) = 40" />}}

To find {{<latex i="d" />}}, we know {{<latex i="d = e^{-1} \bmod \phi(n)" />}}.

{{<latex i="d = 7^{-1} \bmod 40" />}}. We can use Extended-Euclid's Algorithm.

| {{<latex i="a" />}}  | {{<latex i="b" />}} | {{<latex i="q = [a/b]" />}} | {{<latex i="d" />}} | {{<latex i="x" />}}  | {{<latex i="y" />}}                       |
| -------------------- | ------------------- | --------------------------- | ------------------- | -------------------- | ----------------------------------------- |
| {{<latex i="40" />}} | {{<latex i="7" />}} | {{<latex i="5" />}}         | {{<latex i="1" />}} | {{<latex i="3" />}}  | {{<latex i="-2 - (5 \times 3) = -17" />}} |
| {{<latex i="7" />}}  | {{<latex i="5" />}} | {{<latex i="1" />}}         | {{<latex i="1" />}} | {{<latex i="-2" />}} | {{<latex i="1 - (1 \times -2) = 3" />}}   |
| {{<latex i="5" />}}  | {{<latex i="2" />}} | {{<latex i="2" />}}         | {{<latex i="1" />}} | {{<latex i="1" />}}  | {{<latex i="0 - (2 \times 1) = -2" />}}   |
| {{<latex i="2" />}}  | {{<latex i="1" />}} | {{<latex i="2" />}}         | {{<latex i="1" />}} | {{<latex i="0" />}}  | {{<latex i="1 - (2 \times 0) = 1" />}}    |
| {{<latex i="1" />}}  | {{<latex i="0" />}} | {{<latex i="-" />}}         | {{<latex i="1" />}} | {{<latex i="1" />}}  | {{<latex i="0" />}}                       |

We have {{<latex i="y = -17" />}}, therefore {{<latex i="d = -17 \bmod 40 = 23" />}}.

---

> Perform encryption and decryption using the RSA algorithm for the following:

> {{<latex i="p = 3" />}}, {{<latex i="q = 11" />}}, {{<latex i="d = 7" />}}, {{<latex i="M = 5" />}}

1. {{<latex i="n = pq = 33" />}}
2. {{<latex i="\phi(n) = (p-1)(q-1) = 20" />}}
3. Select {{<latex i="e" />}} such that {{<latex i="gcd(\phi(n), e) = 1" />}} and {{<latex i="1 < e < \phi(n)" />}}.
4. Use Extended-Euclid's algorithm to find {{<latex i="d" />}}.

Let's try {{<latex i="e = 3" />}}

| {{<latex i="a" />}}  | {{<latex i="b" />}} | {{<latex i="q = [a/b]" />}} | {{<latex i="d" />}} | {{<latex i="x" />}}  | {{<latex i="y" />}}                     |
| -------------------- | ------------------- | --------------------------- | ------------------- | -------------------- | --------------------------------------- |
| {{<latex i="20" />}} | {{<latex i="3" />}} | {{<latex i="6" />}}         | {{<latex i="1" />}} | {{<latex i="-1" />}} | {{<latex i="1 - (6 \times -1) = 7" />}} |
| {{<latex i="3" />}}  | {{<latex i="2" />}} | {{<latex i="1" />}}         | {{<latex i="1" />}} | {{<latex i="1" />}}  | {{<latex i="0 - (1 \times 1) = -1" />}} |
| {{<latex i="2" />}}  | {{<latex i="1" />}} | {{<latex i="2" />}}         | {{<latex i="1" />}} | {{<latex i="0" />}}  | {{<latex i="1 - (2 \times 0) = 1" />}}  |
| {{<latex i="1" />}}  | {{<latex i="0" />}} | {{<latex i="-" />}}         | {{<latex i="1" />}} | {{<latex i="1" />}}  | {{<latex i="0" />}}                     |

{{<latex i="gcd(20, 3) = 1" />}}, therefore {{<latex i="e = 3" />}} is a good candidate. {{<latex i="y = 7" />}}, therefore {{<latex i="d = 7 \bmod 20 = 7" />}}.

**Encryption**:

We know {{<latex i="C = M^e \bmod n" />}}

{{<latex>}}
\begin{aligned}
C &= 5^3 \bmod 33\\
 &= 125 \bmod 33\\
C &= 26
\end{aligned}
{{</latex>}}


**Decryption**:

We know {{<latex i="M = C^d \bmod n" />}}

{{<latex>}}
\begin{aligned}
M &= 26^7 \bmod 33\\
 &= (26^2 \times 26^2 \times 26^2 \times 26) \bmod 33\\
 &= (676 \times 676 \times 676 \times 26) \bmod 33\\
 &= (16 \times 16 \times 16 \times 26) \bmod 33\\
 &= (256 \times 16 \times 26) \bmod 33\\
 &= (25 \times 16 \times 26) \bmod 33\\
 &= (650 \times 16) \bmod 33\\
 &= (23 \times 16) \bmod 33\\
 &= (23 \times 16) \bmod 33\\
 &= 368 \bmod 33\\
M &= 5
\end{aligned}
{{</latex>}}


> {{<latex i="p = 5" />}}, {{<latex i="q = 11" />}}, {{<latex i="e = 3" />}}, {{<latex i="M = 9" />}}

1. {{<latex i="n = pq = 55" />}}
2. {{<latex i="\phi(n) = (p-1)(q-1) = 40" />}}
3. Select {{<latex i="e" />}} such that {{<latex i="gcd(\phi(n), e) = 1" />}} and {{<latex i="1 < e < \phi(n)" />}}. {{<latex i="e = 3" />}}
4. Use Extended-Euclid's algorithm to find {{<latex i="d" />}}.


| {{<latex i="a" />}}  | {{<latex i="b" />}} | {{<latex i="q = [a/b]" />}} | {{<latex i="d" />}} | {{<latex i="x" />}} | {{<latex i="y" />}}                       |
| -------------------- | ------------------- | --------------------------- | ------------------- | ------------------- | ----------------------------------------- |
| {{<latex i="40" />}} | {{<latex i="3" />}} | {{<latex i="13" />}}        | {{<latex i="1" />}} | {{<latex i="1" />}} | {{<latex i="0 - (13 \times 1) = -13" />}} |
| {{<latex i="3" />}}  | {{<latex i="1" />}} | {{<latex i="3" />}}         | {{<latex i="1" />}} | {{<latex i="0" />}} | {{<latex i="1 - (3 \times 0) = 1" />}}    |
| {{<latex i="1" />}}  | {{<latex i="0" />}} | {{<latex i="-" />}}         | {{<latex i="1" />}} | {{<latex i="1" />}} | {{<latex i="0" />}}                       |

{{<latex i="y = -13" />}}, therefore {{<latex i="d = -13 \bmod 40 = 27" />}}

**Encryption**:

We know: {{<latex i="C = M^e \bmod n" />}}

{{<latex>}}
\begin{aligned}
C &= 9^3 \bmod 55\\
 &= (9^2 \times 9) \bmod 55\\
 &= (26 \times 9) \bmod 55\\
 &= 234 \bmod 55\\
C &= 14
\end{aligned}
{{</latex>}}

**Decryption**:

We know: {{<latex i="M = C^d \bmod n" />}}

{{<latex i="M = 14^27 \bmod 55 = 9" />}}

---

> Consider the RSA algorithm with {{<latex i="p = 7" />}}, {{<latex i="q = 3" />}} and {{<latex i="e = 5" />}}.

> Encipher the plaintext {{<latex i="M = 4" />}}.

We know:
- {{<latex i="C = M^e \bmod n" />}}
- {{<latex i="n = pq = 21" />}}

{{<latex>}}
\begin{aligned}
C &= 4^5 \bmod 21\\
 &= (4^3 \times 4^2) \bmod 21\\
 &= (64 \times 16) \bmod 21\\
 &= (1 \times -5) \bmod 21\\
C &= 16
\end{aligned}
{{</latex>}}


> Decipher the resulting ciphertext {{<latex i="C" />}} to obtain again {{<latex i="M" />}}.

We know:
- {{<latex i="M = C^d \bmod n" />}}
- {{<latex i="d = e^{-1} \bmod \phi(n)" />}}
- {{<latex i="\phi(n) = (p-1)(q-1) = 12" />}}

{{<latex>}}
d = 5^{-1} \bmod 12
{{</latex>}}

| {{<latex i="a" />}}  | {{<latex i="b" />}} | {{<latex i="q = [a/b]" />}} | {{<latex i="d" />}} | {{<latex i="x" />}}  | {{<latex i="y" />}}                     |
| -------------------- | ------------------- | --------------------------- | ------------------- | -------------------- | --------------------------------------- |
| {{<latex i="12" />}} | {{<latex i="5" />}} | {{<latex i="2" />}}         | {{<latex i="1" />}} | {{<latex i="-2" />}} | {{<latex i="1 - (2 \times -2) = 5" />}} |
| {{<latex i="5" />}}  | {{<latex i="2" />}} | {{<latex i="2" />}}         | {{<latex i="1" />}} | {{<latex i="1" />}}  | {{<latex i="0 - (2 \times 1) = -2" />}} |
| {{<latex i="2" />}}  | {{<latex i="1" />}} | {{<latex i="2" />}}         | {{<latex i="1" />}} | {{<latex i="0" />}}  | {{<latex i="1 - (2 \times 0) = 1" />}}  |
| {{<latex i="1" />}}  | {{<latex i="0" />}} | {{<latex i="-" />}}         | {{<latex i="1" />}} | {{<latex i="1" />}}  | {{<latex i="0" />}}                     |

{{<latex i="y = 5" />}}, therefore {{<latex i="d = 5 \bmod 12" />}}.

**Decryption**:

{{<latex i="M = C^d \bmod n" />}}

{{<latex>}}
\begin{aligned}
M &= 16^5 \bmod 21\\
 &= (16^2 \times 16^2 \times 16) \bmod 21\\
 &= (172 \times 172 \times 16) \bmod 21\\
 &= (4 \times 4 \times 16) \bmod 21\\
 &= (16 \times 16) \bmod 21\\
 &= 172 \bmod 21\\
M &= 4
\end{aligned}
{{</latex>}}


> Why are these {{<latex i="p = 7" />}}, {{<latex i="q = 3" />}} and {{<latex i="e = 5" />}} not really a good choice for RSA?

They are very small numbers which can be brute-forced quite quickly. Normally RSA will use numbers represented by 1024+ bits.

---

> Consider a Diffie-Hellman key exchange with {{<latex i="\alpha = 2" />}}, {{<latex i="q = 11" />}}, {{<latex i="X_A = 9" />}}, {{<latex i="X_B = 3" />}}. Compute {{<latex i="Y_A" />}} and {{<latex i="Y_B" />}}, and the secret key {{<latex i="K" />}}.

We know:

- {{<latex i="Y_A = \alpha^{X_A} \bmod q" />}}
- {{<latex i="Y_B = \alpha^{X_B} \bmod q" />}}
- {{<latex i="K_A = Y_B^{X_A} \bmod q" />}}
- {{<latex i="K_B = Y_A^{X_B} \bmod q" />}}

{{<latex>}}
\begin{aligned}
Y_A &= 2^9 \bmod 11\\
 &= (2^4 \times 2^4 \times 2) \bmod 11\\
 &= (5 \times 5 \times 2) \bmod 11\\
 &= 50 \bmod 11\\
Y_A &= 6
\end{aligned}
{{</latex>}}

{{<latex>}}
\begin{aligned}
Y_B &= 2^3 \bmod 11\\
 &= 8 \bmod 11\\
Y_B &= 8
\end{aligned}
{{</latex>}}

{{<latex>}}
\begin{aligned}
K_A &= 8^9 \bmod 11\\
 &= (8^2 \times 8^2 \times 8^2 \times 8^2 \times 8) \bmod 11\\
 &= (9^2 \times 9^2 \times 8) \bmod 11\\
 &= (4^2 \times 8) \bmod 11\\
 &= (5 \times 8) \bmod 11\\
K_A &= 7
\end{aligned}
{{</latex>}}

{{<latex>}}
\begin{aligned}
K_B &= 6^3 \bmod 11\\
 &= (6^2 \times 6) \bmod 11\\
 &= (3 \times 6) \bmod 11\\
K_B &= 7
\end{aligned}
{{</latex>}}

Therefore {{<latex i="K = 7" />}}.

> Consider a Diffie-Hellman scheme with {{<latex i="\alpha = 3" />}}, {{<latex i="q = 17" />}}, {{<latex i="X_A = 7" />}}, {{<latex i="X_B = 4" />}}. Compute {{<latex i="Y_A" />}} and {{<latex i="Y_B" />}}, and the secret key {{<latex i="K" />}}.

We know:

- {{<latex i="Y_A = \alpha^{X_A} \bmod q" />}}
- {{<latex i="Y_B = \alpha^{X_B} \bmod q" />}}
- {{<latex i="K_A = Y_B^{X_A} \bmod q" />}}
- {{<latex i="K_B = Y_A^{X_B} \bmod q" />}}

{{<latex>}}
\begin{aligned}
Y_A &= 3^7 \bmod 17\\
 &= (3^3 \times 3^3 \times 3) \bmod 17\\
 &= (10 \times 10 \times 3) \bmod 17\\
 &= (10 \times 13) \bmod 17\\
Y_A &= 11
\end{aligned}
{{</latex>}}

{{<latex>}}
\begin{aligned}
Y_B &= 3^4 \bmod 17\\
 &= (3^3 \times 3) \bmod 17\\
 &= (10 \times 3) \bmod 17\\
Y_B &= 13
\end{aligned}
{{</latex>}}

{{<latex>}}
\begin{aligned}
K_A &= 13^7 \bmod 17\\
 &= (13^2 \times 13^2 \times 13^2 \times 13) \bmod 17\\
 &= (16^2 \times 16 \times 13) \bmod 17\\
 &= (1 \times 16 \times 13) \bmod 17\\
K_A &= 4
\end{aligned}
{{</latex>}}

{{<latex>}}
\begin{aligned}
K_B &= 11^4 \bmod 17\\
 &= (11^2 \times 11^2) \bmod 17\\
 &= 2 \times 2 \bmod 17\\
K_B &= 4
\end{aligned}
{{</latex>}}

> Describe the man-in-the-middle attack to the Diffie-Hellman key exchange and how it could be prevented.

As Diffie-Hellman **doesn't provide authentication**, any attacker, Charlie, could place themselves inbetween unsuspected agents, Alice and Bob. Charlie can complete the DH protocol with both Alice and Bob by intercepting their messages and establish a shared key for Alice and a separate shared key for Bob.

This attack can prevented by the use of digital signature schemes.

> Describe the Diffie-Hellman key exchange protocol for three honest principals Alice, Bob and Carol. What would be the secret key for {{<latex i="n" />}} principals {{<latex i="A_1, A_2, ... A_n" />}}?

1. Alice, Bob and Carol all generate their random large private integer {{<latex i="X_A" />}}, {{<latex i="X_B" />}}, {{<latex i="X_C" />}} respectively and calculate their public integer {{<latex i="Y_i = \alpha^{X_i} \bmod q" />}}.
2. Each agent sends another agent's public integer raised with their private key to another agent (in a circular chain).
  - Alice sends Carol's public integer raised with her private integer ({{<latex i="Y_C^{X_A} \bmod q" />}}) to Bob.
  - Bob sends Alice's public integer raised with his private integer ({{<latex i="Y_A^{X_B} \bmod q" />}}) to Carol.
  - Carol sends Bob's public integer raised with her private integer ({{<latex i="Y_B^{X_C} \bmod q" />}}) to Alice.
3. Each agent calculates the shared key by raising what they receivied with their private integer.
  - Alice calculates {{<latex i="K = Y_B^{X_CX_A} \bmod q" />}}.
  - Bob calculates {{<latex i="K = Y_C^{X_AX_B} \bmod q" />}}.
  - Carol calculates {{<latex i="K = Y_A^{X_AX_C} \bmod q" />}}.


> Describe the El Gamal algorithm

El Gamal is a sped up version of DH where agent {{<latex i="B" />}}, can respond to {{<latex i="A" />}} with an encrypted message. In the following protocol:

1. {{<latex i="A \rightarrow B: Y_A" />}}. {{<latex i="A" />}} calculates {{<latex i="Y_A = \alpha^{X_A} \bmod q" />}} and sends it to $$B$.
2. {{<latex i="B \rightarrow A: (E(M, K), Y_B)" />}}. {{<latex i="B" />}} calculates {{<latex i="Y_B = \alpha^{X_B} \bmod q" />}} **AND** computes the shared key {{<latex i="K_B = Y_A^{X_B} \bmod q" />}} and uses it to encrypt a message {{<latex i="M" />}}.
3. {{<latex i="A" />}} calculates {{<latex i="Y_B^{X_A} \bmod q" />}} to get the shared key {{<latex i="K" />}}.


---

> Consider the El Gamal algorithm with {{<latex i="\alpha = 5" />}}, {{<latex i="q = 13" />}}, {{<latex i="X_A = 7" />}}, {{<latex i="X_B = 9" />}}.

> Consider the plaintext {{<latex i="M = 5" />}} and let symmetric encryption be just the multiplication of the plaintext and the key (not a good encryption, of course, but that is not the point here).

> Carry out the algorithm (for encryption).

{{<latex>}}
\begin{aligned}
Y_A &= \alpha^{X_A} \bmod q\\
A &\rightarrow B: Y_A\\
K_B &= Y_A^{X_B} \bmod q\\
Y_B &= \alpha^{X_B} \bmod q\\
E(M, K) = KM\\
B &\rightarrow A: (E(M, K_B), Y_B)\\
K_A &= Y_B^{X_A} \bmod q
\end{aligned}
{{</latex>}}

{{<latex>}}
\begin{aligned}
Y_A &= 5^{7} \bmod 13\\
 &= (5^2 \times 5^2 \times 5^2 \times 5) \bmod 13\\
 &= (12^2 \times 12 \times 5) \bmod 13\\
 &= (1 \times 60) \bmod 13\\
 &= 5\\
A &\rightarrow B: 5\\
K_B &= 5^{9} \bmod 13\\
 &= (5^3 \times 5^3 \times 5^3) \bmod 13\\
 &= (8^2 \times 8) \bmod 13\\
 &= (12 \times 8) \bmod 13\\
 &= 96 \bmod 13\\
 &= 5\\
Y_B &= 5^{9} \bmod 13\\
 &= 5
E(M, K) = 5 \times 5 = 25\\
B &\rightarrow A: (25, 5)\\
K_A &= 5^{7} \bmod 13
 &= 5
\end{aligned}
{{</latex>}}

> Why are these {{<latex i="\alpha = 5" />}}, {{<latex i="q = 13" />}}, {{<latex i="X_A = 7" />}}, {{<latex i="X_B = 9" />}} not adequate for El Gamal? Where is the problem? Would {{<latex i="\alpha = 3" />}} or {{<latex i="\alpha = 4" />}} be better?

They result in all of the keys being {{<latex i="5" />}}.


---

> Explain in detail the main characteristics of cryptographic hash functions and give an example of an application.

The motivation behind hash functions is to create a fingerprint. A **hash function**, {{<latex i="h(x)" />}} has the properties:

 - Compression: {{<latex i="h" />}} maps an input {{<latex i="x" />}} of arbitrary bit length to an output {{<latex i="h(x)" />}} of fixed bit length {{<latex i="n" />}}.
 - Polynomial time computable.

A **cryptographic hash function** is additionally:
 - One-way (where given {{<latex i="y" />}}, it is hard to compute an {{<latex i="x" />}} where {{<latex i="h(x) = y" />}}).
 - And either:
  - 2nd-preimage resistant: it is computationally infeasile to find a second input that has the same output as any specified input.
  - Collision resistant: it is difficult to find two distinct inputs {{<latex i="x" />}}, {{<latex i="x'" />}} where {{<latex i="h(x) = h(x')" />}}.

> Explain in detail how Message Authentication Codes (MAC) work.

Bob and Alice both share a secret key {{<latex i="k" />}}. Alice uses a one-way hash function with parameter {{<latex i="k" />}} to hash a message {{<latex i="m" />}} to obtain a MAC. Alice sends this MAC along with her message {{<latex i="m" />}} to Bob who then attempts to calculate the same MAC with {{<latex i="k" />}} and {{<latex i="m" />}} in the one-way hash function. He compares his result with the MAC Alice sent and if they match, it's valid. If they don't, he cannot trust the message.

> Explain in detail the main characteristics of a digital signature scheme. How can RSA be used for digital signatures?

Digital signatures take advantage of reversible public-key cryptosystems. A message can be encrypted with Alice's private key; thus anyone with Alice's public key (everyone) can decrypt the message, proving it was sent by Alice.
