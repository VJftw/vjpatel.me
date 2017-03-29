+++
date = "2016-11-25T14:26:19+01:00"
title = "7CCSMCIS - Coursework 4"
markup = "mmark"
+++

> What is a one-way function and what are its properties?

A function $$f: X \rightarrow Y$$ is a one-way function, if $$f$$ is *easy* to compute for all $$x \in X$$ but $$f^{-1}$$ is *hard* (or *infeasible*) to compute.

> What is a trapdoor one-way function? Give one example.

A trapdoor one-way function $$f_k: X \rightarrow Y$$ is a one-way function where given the $$k$$ it becomes feasible to compute $$f^{-1}_k$$ but is infeasible otherwise.
e.g. modular cube roots when we know $$p$$ and $$q$$.

---

> Use both Euclid's algorithm and Extended Euclid's algorithm to compute $$gcd(1970, 1066)$$, showing all steps of the computations.

```
Euclid(a, b):
    if b == 0:
        return a
    else
        return Euclid(b, a % b)
```

**Extended Euclid's** (Unravelling):

Remember:

- $$d = d_{i-1}$$
- $$x = y_{i-1}$$
- $$y = x_{i-1} - (q \times x)$$


|   $$a$$   |   $$b$$   | $$q = [a/b]$$ |   $$d$$   |   $$x$$   |   $$y$$
|-----------|-----------|---------------|-----------|-----------|-----------
| $$1970$$  | $$1066$$  | $$1$$         | $$2$$     | $$-204$$  | $$173 - (1 \times -204) = 377$$
| $$1066$$  | $$904$$   | $$1$$         | $$2$$     | $$173$$   | $$-31 - (1 \times 173) = -204$$
| $$904$$   | $$162$$   | $$5$$         | $$2$$     | $$-31$$   | $$18 - (5 \times -31) = 173$$
| $$162$$   | $$94$$    | $$1$$         | $$2$$     | $$18$$    | $$-13 - (1 \times 18) = -31$$
| $$94$$    | $$68$$    | $$1$$         | $$2$$     | $$-13$$   | $$5 - (1 \times -13) = 18$$
| $$68$$    | $$26$$    | $$2$$         | $$2$$     | $$5$$     | $$-3 - (2 \times 5) = -13$$
| $$26$$    | $$16$$    | $$1$$         | $$2$$     | $$-3$$    | $$2 - (1 \times -3) = 5$$
| $$16$$    | $$10$$    | $$1$$         | $$2$$     | $$2$$     | $$-1 - (1 \times 2) = -3$$
| $$10$$    | $$6$$     | $$1$$         | $$2$$     | $$-1$$    | $$1 - (1 \times -1) = 2$$
| $$6$$     | $$4$$     | $$1$$         | $$2$$     | $$1$$     | $$0 - (1 \times -1) = -1$$
| $$4$$     | $$2$$     | $$1$$         | $$2$$     | $$0$$     | $$1 - (2 \times 0) = 1$$
| $$2$$     | $$0$$     | $$-$$         | $$2$$     | $$1$$     | $$0$$

---

> Consider the primes $$p = 11$$ and $$q = 23$$.
> Calculate $$n$$ and $$\phi(n)$$

For this we should know:
- $$n = pq$$
- $$\phi(n) = (p - 1)(q - 1)$$

$$
n = 11 \times 23 = 253
$$

$$
\begin{aligned}
\phi(n) &= (11 - 1)(23 - 1)\\
 &= 10 \times 22\\
\phi(n) &= 220
\end{aligned}
$$

> Explain which of the values $$e = 3$$ or $$e = 5$$ is usable as a public key for this given $$n$$.

We have to choose an $$e$$ where $$gcd(\phi(n), e) = 1$$ and $$1 < e < \phi(n)$$.

Let's try $$gcd(220, 3)$$ first.

|   $$a$$   |   $$b$$   | $$q = [a/b]$$ |   $$d$$   |   $$x$$   |   $$y$$
|-----------|-----------|---------------|-----------|-----------|-----------
| $$220$$   | $$3$$     | $$73$$        |           |           |
| $$3$$     | $$1$$     | $$3$$         |           |           |
| $$1$$     | $$0$$     | $$-$$         |           |           |

As we can see, $$gcd(220, 3) = 1$$. Let's try $$gcd(220, 5)$$ just to show the difference.

|   $$a$$   |   $$b$$   | $$q = [a/b]$$ |   $$d$$   |   $$x$$   |   $$y$$
|-----------|-----------|---------------|-----------|-----------|-----------
| $$220$$   | $$5$$     | $$44$$        |           |           |
| $$5$$     | $$0$$     | $$-$$         |           |           |

As we can see, $$gcd(220, 5) = 5$$, therefore $$e = 5$$ is **NOT** suitable. $$e = 3$$ is suitable.


> Use the Extended Euclid's algorithm to calculate $$d$$ with the $$e$$ you have chosen.

We find our $$d$$ by finding the top value of $$y$$ in our previous table. We use the following rules (going backwards)

- $$d = d_{i-1}$$
- $$x = y_{i-1}$$
- $$y = x_{i-1} - (q \times x)$$


|   $$a$$   |   $$b$$   | $$q = [a/b]$$ |   $$d$$   |   $$x$$   |   $$y$$
|-----------|-----------|---------------|-----------|-----------|-----------
| $$220$$   | $$3$$     | $$73$$        | $$1$$     | $$1$$     | $$0 - (73 \times 1) = -73$$
| $$3$$     | $$1$$     | $$3$$         | $$1$$     | $$0$$     | $$1 - (3 \times 0) = 1$$
| $$1$$     | $$0$$     | $$-$$         | $$1$$     | $$1$$     | $$0$$


We get $$y = -73$$, therefore $$d = -73 \bmod 220 = 247$$.

> Encrypt $$M = 165$$ and then decrypt the resulting ciphertext.

We use $$C = M^e \bmod n$$.

$$
\begin{aligned}
C &= 165^3 \bmod 253\\
C &=
\end{aligned}
$$

**Decryption**:

Using $$M = C^d \bmod n$$.

$$
\begin{aligned}
M &= C^{147} \bmod 253\\
M &=
\end{aligned}
$$

---

> Consider the RSA algorithm with $$n = 55$$ and $$e = 7$$.

> - Encipher the plaintext $$M = 10$$.

Use $$C = M^e \bmod 55$$.

> - Break the cipher by finding $$p$$, $$q$$ and $$d$$.

We know:

- $$n = pq$$, $$n = 55$$

We can guess $$p = 5$$, $$q = 11$$ as 2 primes.

- $$\phi(n) = (p - 1)(q - 1) = 40$$

To find $$d$$, we know $$d = e^{-1} \bmod \phi(n)$$.

$$d = 7^{-1} \bmod 40$$. We can use Extended-Euclid's Algorithm.

|   $$a$$   |   $$b$$   | $$q = [a/b]$$ |   $$d$$   |   $$x$$   |   $$y$$
|-----------|-----------|---------------|-----------|-----------|-----------
| $$40$$    | $$7$$     | $$5$$         | $$1$$     | $$3$$     | $$-2 - (5 \times 3) = -17$$
| $$7$$     | $$5$$     | $$1$$         | $$1$$     | $$-2$$    | $$1 - (1 \times -2) = 3$$
| $$5$$     | $$2$$     | $$2$$         | $$1$$     | $$1$$     | $$0 - (2 \times 1) = -2$$
| $$2$$     | $$1$$     | $$2$$         | $$1$$     | $$0$$     | $$1 - (2 \times 0) = 1$$
| $$1$$     | $$0$$     | $$-$$         | $$1$$     | $$1$$     | $$0$$

We have $$y = -17$$, therefore $$d = -17 \bmod 40 = 23$$.

---

> Perform encryption and decryption using the RSA algorithm for the following:

> $$p = 3$$, $$q = 11$$, $$d = 7$$, $$M = 5$$

1. $$n = pq = 33$$
2. $$\phi(n) = (p-1)(q-1) = 20$$
3. Select $$e$$ such that $$gcd(\phi(n), e) = 1$$ and $$1 < e < \phi(n)$$.
4. Use Extended-Euclid's algorithm to find $$d$$.

Let's try $$e = 3$$

|   $$a$$   |   $$b$$   | $$q = [a/b]$$ |   $$d$$   |   $$x$$   |   $$y$$
|-----------|-----------|---------------|-----------|-----------|-----------
| $$20$$    | $$3$$     | $$6$$         | $$1$$     | $$-1$$    | $$1 - (6 \times -1) = 7$$
| $$3$$     | $$2$$     | $$1$$         | $$1$$     | $$1$$     | $$0 - (1 \times 1) = -1$$
| $$2$$     | $$1$$     | $$2$$         | $$1$$     | $$0$$     | $$1 - (2 \times 0) = 1$$
| $$1$$     | $$0$$     | $$-$$         | $$1$$     | $$1$$     | $$0$$

$$gcd(20, 3) = 1$$, therefore $$e = 3$$ is a good candidate. $$y = 7$$, therefore $$d = 7 \bmod 20 = 7$$.

**Encryption**:

We know $$C = M^e \bmod n$$

$$
\begin{aligned}
C &= 5^3 \bmod 33\\
 &= 125 \bmod 33\\
C &= 26
\end{aligned}
$$


**Decryption**:

We know $$M = C^d \bmod n$$

$$
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
$$


> $$p = 5$$, $$q = 11$$, $$e = 3$$, $$M = 9$$

1. $$n = pq = 55$$
2. $$\phi(n) = (p-1)(q-1) = 40$$
3. Select $$e$$ such that $$gcd(\phi(n), e) = 1$$ and $$1 < e < \phi(n)$$. $$e = 3$$
4. Use Extended-Euclid's algorithm to find $$d$$.


|   $$a$$   |   $$b$$   | $$q = [a/b]$$ |   $$d$$   |   $$x$$   |   $$y$$
|-----------|-----------|---------------|-----------|-----------|-----------
| $$40$$    | $$3$$     | $$13$$        | $$1$$     | $$1$$     | $$0 - (13 \times 1) = -13$$
| $$3$$     | $$1$$     | $$3$$         | $$1$$     | $$0$$     | $$1 - (3 \times 0) = 1$$
| $$1$$     | $$0$$     | $$-$$         | $$1$$     | $$1$$     | $$0$$

$$y = -13$$, therefore $$d = -13 \bmod 40 = 27$$

**Encryption**:

We know: $$C = M^e \bmod n$$

$$
\begin{aligned}
C &= 9^3 \bmod 55\\
 &= (9^2 \times 9) \bmod 55\\
 &= (26 \times 9) \bmod 55\\
 &= 234 \bmod 55\\
C &= 14
\end{aligned}
$$

**Decryption**:

We know: $$M = C^d \bmod n$$

$$M = 14^27 \bmod 55 = 9$$

---

> Consider the RSA algorithm with $$p = 7$$, $$q = 3$$ and $$e = 5$$.

> Encipher the plaintext $$M = 4$$.

We know:
- $$C = M^e \bmod n$$
- $$n = pq = 21$$

$$
\begin{aligned}
C &= 4^5 \bmod 21\\
 &= (4^3 \times 4^2) \bmod 21\\
 &= (64 \times 16) \bmod 21\\
 &= (1 \times -5) \bmod 21\\
C &= 16
\end{aligned}
$$


> Decipher the resulting ciphertext $$C$$ to obtain again $$M$$.

We know:
- $$M = C^d \bmod n$$
- $$d = e^{-1} \bmod \phi(n)$$
- $$\phi(n) = (p-1)(q-1) = 12$$

$$d = 5^{-1} \bmod 12$$

|   $$a$$   |   $$b$$   | $$q = [a/b]$$ |   $$d$$   |   $$x$$   |   $$y$$
|-----------|-----------|---------------|-----------|-----------|-----------
| $$12$$    | $$5$$     | $$2$$         | $$1$$     | $$-2$$    | $$1 - (2 \times -2) = 5$$
| $$5$$     | $$2$$     | $$2$$         | $$1$$     | $$1$$     | $$0 - (2 \times 1) = -2$$
| $$2$$     | $$1$$     | $$2$$         | $$1$$     | $$0$$     | $$1 - (2 \times 0) = 1$$
| $$1$$     | $$0$$     | $$-$$         | $$1$$     | $$1$$     | $$0$$

$$y = 5$$, therefore $$d = 5 \bmod 12$$.

**Decryption**:

$$M = C^d \bmod n$$

$$
\begin{aligned}
M &= 16^5 \bmod 21\\
 &= (16^2 \times 16^2 \times 16) \bmod 21\\
 &= (172 \times 172 \times 16) \bmod 21\\
 &= (4 \times 4 \times 16) \bmod 21\\
 &= (16 \times 16) \bmod 21\\
 &= 172 \bmod 21\\
M &= 4
\end{aligned}
$$


> Why are these $$p = 7$$, $$q = 3$$ and $$e = 5$$ not really a good choice for RSA?

They are very small numbers which can be brute-forced quite quickly. Normally RSA will use numbers represented by 1024+ bits.

---

> Consider a Diffie-Hellman key exchange with $$\alpha = 2$$, $$q = 11$$, $$X_A = 9$$, $$X_B = 3$$. Compute $$Y_A$$ and $$Y_B$$, and the secret key $$K$$.

We know:

- $$Y_A = \alpha^{X_A} \bmod q$$
- $$Y_B = \alpha^{X_B} \bmod q$$
- $$K_A = Y_B^{X_A} \bmod q$$
- $$K_B = Y_A^{X_B} \bmod q$$

$$
\begin{aligned}
Y_A &= 2^9 \bmod 11\\
 &= (2^4 \times 2^4 \times 2) \bmod 11\\
 &= (5 \times 5 \times 2) \bmod 11\\
 &= 50 \bmod 11\\
Y_A &= 6
\end{aligned}
$$

$$
\begin{aligned}
Y_B &= 2^3 \bmod 11\\
 &= 8 \bmod 11\\
Y_B &= 8
\end{aligned}
$$

$$
\begin{aligned}
K_A &= 8^9 \bmod 11\\
 &= (8^2 \times 8^2 \times 8^2 \times 8^2 \times 8) \bmod 11\\
 &= (9^2 \times 9^2 \times 8) \bmod 11\\
 &= (4^2 \times 8) \bmod 11\\
 &= (5 \times 8) \bmod 11\\
K_A &= 7
\end{aligned}
$$

$$
\begin{aligned}
K_B &= 6^3 \bmod 11\\
 &= (6^2 \times 6) \bmod 11\\
 &= (3 \times 6) \bmod 11\\
K_B &= 7
\end{aligned}
$$

Therefore $$K = 7$$.

> Consider a Diffie-Hellman scheme with $$\alpha = 3$$, $$q = 17$$, $$X_A = 7$$, $$X_B = 4$$. Compute $$Y_A$$ and $$Y_B$$, and the secret key $$K$$.

We know:

- $$Y_A = \alpha^{X_A} \bmod q$$
- $$Y_B = \alpha^{X_B} \bmod q$$
- $$K_A = Y_B^{X_A} \bmod q$$
- $$K_B = Y_A^{X_B} \bmod q$$

$$
\begin{aligned}
Y_A &= 3^7 \bmod 17\\
 &= (3^3 \times 3^3 \times 3) \bmod 17\\
 &= (10 \times 10 \times 3) \bmod 17\\
 &= (10 \times 13) \bmod 17\\
Y_A &= 11
\end{aligned}
$$

$$
\begin{aligned}
Y_B &= 3^4 \bmod 17\\
 &= (3^3 \times 3) \bmod 17\\
 &= (10 \times 3) \bmod 17\\
Y_B &= 13
\end{aligned}
$$

$$
\begin{aligned}
K_A &= 13^7 \bmod 17\\
 &= (13^2 \times 13^2 \times 13^2 \times 13) \bmod 17\\
 &= (16^2 \times 16 \times 13) \bmod 17\\
 &= (1 \times 16 \times 13) \bmod 17\\
K_A &= 4
\end{aligned}
$$

$$
\begin{aligned}
K_B &= 11^4 \bmod 17\\
 &= (11^2 \times 11^2) \bmod 17\\
 &= 2 \times 2 \bmod 17\\
K_B &= 4
\end{aligned}
$$

> Describe the man-in-the-middle attack to the Diffie-Hellman key exchange and how it could be prevented.

As Diffie-Hellman **doesn't provide authentication**, any attacker, Charlie, could place themselves inbetween unsuspected agents, Alice and Bob. Charlie can complete the DH protocol with both Alice and Bob by intercepting their messages and establish a shared key for Alice and a separate shared key for Bob.

This attack can prevented by the use of digital signature schemes.

> Describe the Diffie-Hellman key exchange protocol for three honest principals Alice, Bob and Carol. What would be the secret key for $$n$$ principals $$A_1, A_2, ... A_n$$?

1. Alice, Bob and Carol all generate their random large private integer $$X_A$$, $$X_B$$, $$X_C$$ respectively and calculate their public integer $$Y_i = \alpha^{X_i} \bmod q$$.
2. Each agent sends another agent's public integer raised with their private key to another agent (in a circular chain).
  - Alice sends Carol's public integer raised with her private integer ($$Y_C^{X_A} \bmod q$$) to Bob.
  - Bob sends Alice's public integer raised with his private integer ($$Y_A^{X_B} \bmod q$$) to Carol.
  - Carol sends Bob's public integer raised with her private integer ($$Y_B^{X_C} \bmod q$$) to Alice.
3. Each agent calculates the shared key by raising what they receivied with their private integer.
  - Alice calculates $$K = Y_B^{X_CX_A} \bmod q$$.
  - Bob calculates $$K = Y_C^{X_AX_B} \bmod q$$.
  - Carol calculates $$K = Y_A^{X_AX_C} \bmod q$$.


> Describe the El Gamal algorithm

El Gamal is a sped up version of DH where agent $$B$$, can respond to $$A$$ with an encrypted message. In the following protocol:

1. $$A \rightarrow B: Y_A$$. $$A$$ calculates $$Y_A = \alpha^{X_A} \bmod q$$ and sends it to $$B$.
2. $$B \rightarrow A: (E(M, K), Y_B)$$. $$B$$ calculates $$Y_B = \alpha^{X_B} \bmod q$$ **AND** computes the shared key $$K_B = Y_A^{X_B} \bmod q$$ and uses it to encrypt a message $$M$$.
3. $$A$$ calculates $$Y_B^{X_A} \bmod q$$ to get the shared key $$K$$.


---

> Consider the El Gamal algorithm with $$\alpha = 5$$, $$q = 13$$, $$X_A = 7$$, $$X_B = 9$$.

> Consider the plaintext $$M = 5$$ and let symmetric encryption be just the multiplication of the plaintext and the key (not a good encryption, of course, but that is not the point here).

> Carry out the algorithm (for encryption).

$$
\begin{aligned}
Y_A &= \alpha^{X_A} \bmod q\\
A &\rightarrow B: Y_A\\
K_B &= Y_A^{X_B} \bmod q\\
Y_B &= \alpha^{X_B} \bmod q\\
E(M, K) = KM\\
B &\rightarrow A: (E(M, K_B), Y_B)\\
K_A &= Y_B^{X_A} \bmod q
\end{aligned}
$$

$$
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
$$

> Why are these $$\alpha = 5$$, $$q = 13$$, $$X_A = 7$$, $$X_B = 9$$ not adequate for El Gamal? Where is the problem? Would $$\alpha = 3$$ or $$\alpha = 4$$ be better?

They result in all of the keys being $$5$$.


---

> Explain in detail the main characteristics of cryptographic hash functions and give an example of an application.

The motivation behind hash functions is to create a fingerprint. A **hash function**, $$h(x)$$ has the properties:

 - Compression: $$h$$ maps an input $$x$$ of arbitrary bit length to an output $$h(x)$$ of fixed bit length $$n$$.
 - Polynomial time computable.

A **cryptographic hash function** is additionally:
 - One-way (where given $$y$$, it is hard to compute an $$x$$ where $$h(x) = y$$).
 - And either:
  - 2nd-preimage resistant: it is computationally infeasile to find a second input that has the same output as any specified input.
  - Collision resistant: it is difficult to find two distinct inputs $$x$$, $$x'$$ where $$h(x) = h(x')$$.

> Explain in detail how Message Authentication Codes (MAC) work.

Bob and Alice both share a secret key $$k$$. Alice uses a one-way hash function with parameter $$k$$ to hash a message $$m$$ to obtain a MAC. Alice sends this MAC along with her message $$m$$ to Bob who then attempts to calculate the same MAC with $$k$$ and $$m$$ in the one-way hash function. He compares his result with the MAC Alice sent and if they match, it's valid. If they don't, he cannot trust the message.

> Explain in detail the main characteristics of a digital signature scheme. How can RSA be used for digital signatures?

Digital signatures take advantage of reversible public-key cryptosystems. A message can be encrypted with Alice's private key; thus anyone with Alice's public key (everyone) can decrypt the message, proving it was sent by Alice.


<script src='https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'></script>

<script>
MathJax.Hub.Config({
    jax: ["input/TeX","output/HTML-CSS"],
    displayAlign: "left"
});
</script>
