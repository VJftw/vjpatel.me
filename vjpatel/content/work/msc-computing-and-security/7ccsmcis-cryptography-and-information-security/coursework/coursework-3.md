+++
date = "2016-11-21T14:26:19+01:00"
title = "7CCSMCIS - Coursework 3"
markup = "mmark"
+++

> What is a meet-in-the-middle attack?

In 2DES (2 keys, running run encryption twice), a meet-in-the-middle attack is where an attacker can run the ciphertext through the encrypt function for all $$2^{56}$$ possible $$K_1$$. They can store this in a table, sorted. The attacker can then run the cipher-text through the decrypt function for all $$2^{56}$$ possible $$K_2$$

> How many keys are used in triple-DES and why?

There are 2 keys used in 3DES. This is to maintain compatibility with standard DES.

> Why is the middle portion of triple-DES a decryption rather than an encryption?

a

> - Consider a block cipher that applies bit permutations (transpositions) to bit vectors length 4. i.e. the permutation cipher with alphabet $$\mathcal{A} = \left \lbrace 0, 1 \right \rbrace$$ and block length 4.
> - Consider the key $$K$$ that transforms a bit vector of length 4 by shifiting it by one bit to the left i.e. $$K$$ permutes the bit order 1,2,3,4 to 2,3,4,1. The for example $$E(K, 1000) = 0001$$.
> - Consider $$IV = 1010$$.

> Use the ECB mode of operation to encrypt the plaintext $$P = 101100010100101$$.

```
P = 101100010100101
```

Becomes:

```
P = 1011 0001 0100 101
P = 1011 0001 0100 1010

E(K, 1011) = 0111
E(K, 0001) = 0010
E(K, 0100) = 1000
E(K, 1010) = 0101

C = 0111 0010 1000 0101
```

We pad the last block by appending a 0 (or 1 if we like).

> Use the CBC mode of operation to encrypt the plaintext $$P = 101100010100101$$ with $$IV = 1010$$, and then decrypt it.

```
P = 101100010100101
```

Becomes:

```
P = 1011 0001 0100 101
P = 1011 0001 0100 1010
```

1. $$C_1 = E(K, IV \oplus P_1) = E(K, 1010 \oplus 1011) = E(K, 0001) = 0010$$
2. $$C_2 = E(K, C_1 \oplus P_2) = E(K, 0010 \oplus 0001) = E(K, 0011) = 0110$$
3. $$C_3 = E(K, C_2 \oplus P_3) = E(K, 0110 \oplus 0100) = E(K, 0010) = 0100$$
4. $$C_4 = E(K, C_3 \oplus P_4) = E(K, 0100 \oplus 1010) = E(K, 1110) = 1101$$

```
C = 0010 0110 0100 1101
```

**Decryption**:

```
C = 0010 0110 0100 1101
```

1. $$P_1 = D(K, C_1) \oplus IV = D(K, 0010) \oplus 1010 = 0001 \oplus 1010 = 1011$$
2. $$P_2 = D(K, C_2) \oplus C_1 = D(K, 0110) \oplus 0010 = 0011 \oplus 0010 = 0001$$
3. $$P_3 = D(K, C_3) \oplus C_2 = D(K, 0100) \oplus 0110 = 0010 \oplus 0110 = 0100$$
3. $$P_4 = D(K, C_4) \oplus C_3 = D(K, 1101) \oplus 0100 = 1110 \oplus 0100 = 1010$$

```
P = 1011 0001 0100 1010
```


> - Consider a block cipher that applies bit permutations (transpositions) to bit vectors of length 3, i.e., $$S = 3$$.
> - Consider the key $$K$$ that transforms a bit vector of length 4 by shifting it one bit to the left, i.e. $$K$$ permutes the bit order 1,2,3,4 to 2,3,4,1.
> - Consider $$IV = 1010$$.


> Use CFB mode of operation to encrypt the plaintext $$P = 101100010100101$$.

```
S = 3, therefore split plaintext into 3s.

P = 101 100 010 100 101
IV = 1010
```

1. $$C_1 = P_1 \oplus MSB_s(E(K, IV)) = 101 \oplus MSB_3(0101) = 101 \oplus 010 = 111$$
2. $$C_2 = P_2 \oplus MSB_s(E(K, C_1)) = 100 \oplus MSB_3(E(K, 0111)) = 100 \oplus MSB_3(1110) = 100 \oplus 111 = 011$$
3. $$C_3 = P_3 \oplus MSB_s(E(K, C_2)) = 010 \oplus MSB_3(E(K, 0011)) = 010 \oplus MSB_3(0110) = 010 \oplus 011 = 001$$
4. $$C_4 = P_4 \oplus MSB_s(E(K, C_3)) = 100 \oplus MSB_3(E(K, 0001)) = 100 \oplus MSB_3(0010) = 100 \oplus 001 = 101$$
5. $$C_5 = P_5 \oplus MSB_s(E(K, C_4)) = 101 \oplus MSB_3(E(K, 0101)) = 101 \oplus MSB_3(1010) = 101 \oplus 101 = 000$$

Gives:
```
C = 111 011 001 101 000
```

> Use OFB mode of operation to encrypt the plaintext $$P = 101100010100101$$ (with block length 4).

```
P = 1011 0001 0100 101
IV = 1010
```

1. $$C_1 = P_1 \oplus E(K, IV) = 1011 \oplus E(K, 1010) = 1011 \oplus 0101 = 1110$$.
2. $$C_2 = P_2 \oplus E(K, IV) = 0001 \oplus E(K, 0101) = 0001 \oplus 1010 = 1011$$.
3. $$C_3 = P_3 \oplus E(K, IV) = 0100 \oplus E(K, 1010) = 0100 \oplus 0101 = 0001$$.
4. $$C_4 = P_4 \oplus E(K, IV) = 101 \oplus E(K, 0101) = 101 \oplus 1010 = 000$$.

Gives:

```
C = 1110 1011 0001 000
```

<script src='https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'></script>
