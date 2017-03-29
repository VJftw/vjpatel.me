+++
date = "2016-11-07T23:26:19+01:00"
title = "7CCSMCIS Cryptography and Information Security Notes"
markup = "mmark"
+++

## Information Security

Information security means protecting *information* and *information systems* form unauthorized access, use, disclosure, disruption, modification, or destruction.

- **Computer Security**: deals with the prevention and detection of unauthorized actions by users of a computer system. *Authorization* is central to definition. Sensible only relative to a *security policy* which states who (or what) may perform which actions.
- **Network Security**: consists of the provisions made in an underlying computer network infrastructure, policies adopted by the network administrator in order to protect the network and network-accessible resources from unauthorized access.
- **Information Security**: is even more general: it deals with information independently from computer systems. Remember that information is more abstract than data. Data conveys information, but information can be found without revealing underlying data.

### e-Hermitism vs e-Society
The only secure computer is one that is switched off, unplugged in a block of concrete etc.. But, we want and have an e-society where information is shared. **Is your data worth protecting?**.

## Agents (a.k.a Principals)

**Honest Agents/Principals**:
 - Alice
 - Bob
 - Carol

**Dishonest Agents/Principals (Adversaries/Attackers)**:
 - Eve (Only eavesdrops)
 - Charlie
 - Mallory
 - Zoe

**Trusted and/or Neutral**:
 - Simon (Trusted Server)
 - Trent (Trusted Server)
 - Peggy (Prover and Verifier)
 - Victor (Prover and Verifier)

## Confidentiality, Privacy, Anonymity, Integrity

- **Confidentiality**: Information is not learned by unauthorized principals.
- **Privacy**: You choose what you let other people know. Confidentiality of information that you don't want to share.
- **Anonymity**: A condition in which your true identity is not known. Confidentiality of your identity.
- **Anonymity Set**: You can be anonymous in a group if your actions cannot be distinguished from anyone else in the group. This is known as an anonymity set.
- **Integrity**: Information has not been maliciously altered.
- **Availability**: Data or services can be accessed in a reliable and timely way.
- **Accountability**: Actions can be traced to responsible principals.
- **Non-repudiation**: Actions done cannot be denied by the principal.
- **Authentication**: Principals or data origin can be identified accurately.

## Security as risk minimisation

### Common Criteria
- Classification depicts fundamental concepts and interrelationships.
- Policy (here implicit) defines authorized actions on assets. i.e. what constitutes abuse.
- Security concerns the protection of **assets** from **threats**. Threats are the potential for abuse of assets.
- Owners value their assets and want to protect them. **Threat agents** also value assets and seek to abuse them.
- **Owners** analyse threats to determine which ones apply. These are the **risks** that can be cost. This helps the selection of **countermeasures**, which reduce the **vulnerabilities**.
- Vulnerabilities may remain leaving some residual risk; owners seek to minimise that risk, within other constraints (feasibility, expense).

Note: The above common criteria regards threats related to both malicious and accidental human activities. Usually we focus on malicious activity.

---

## Basic concepts

- **Cryptology**: The study of secret writing.
- **Steganography**: The science of hiding messages in other messages.
- **Cryptography**: The science of secret writing.
- **Cryptanalysis**: The science of recovering the plaintext from a ciphertext without the key.

### A general model for (network) security
A *message* is to be transferred *from one principal to another* across a network. The two principals must cooperate for the exchange to take place. A logical *information channel* is established by defining a route through the network from source to destination and by the principals use of communication protocols e.g. TCP/IP.

A *trusted third-party* may be needed to achieve secure transmission.

The general model shows 4 basic tasks:
1. Design an algorithm for performing security-related transformation. The algorithm should be such that an opponent cannot defeat its purpose.
2. Generate the secret information to be used with the algorithm.
3. Develop methods for the distribution and sharing of the secret information.
4. Specify a protocol to be used by the two principals that makes use of the security algorithm and the secret information to achieve a particular security service.

#### Terminology

| Word          | Meaning
|---------------|----------
| plaintext     | Text that can be read and *understood*.
| Encryption    | Transformation (function) $$E$$ that takes an input (commonly *plaintext*) and a key that generates a ciphertext.
| ciphertext    | Transformed (scrambled) text that needs to be *processed*/decrypted to be *understood*.
| Decryption    | Transformation (function) $$D$$ that takes an input (commonly *ciphertext*) and a key the generates a plaintext.
| Cipher        | A function/algorithm for performing encryption/decryption.

### Kerckhoff's "La Cryptographie Militaire"

**Security depends only on secrecy of the key, not on the algorithm**


### A Mathematical Formalisation

| Symbol | Meaning
|--------|----------
| $$\mathcal{A}$$ | The *alphabet*, a finite set.
| $$\mathcal{M} \subseteq \mathcal{A}^*$$ | The *message space*. $$M \in \mathcal{M}$$ is a *plaintext (message)*.
| $$\mathcal{C}$$ | The *ciphertext space*, whose alphabet may differ from $$\mathcal{M}$$
| $$\mathcal{K}$$ | denotes the *key space* of *keys*.

- Each $$e \in \mathcal{K}$$ determines a bijective function from $$\mathcal{M}$$ to $$\mathcal{C}$$, denoted by $$E_e$$. $$E_e$$ is the *encryption function* or (*transformation*). We will write $$E_e(P) = C$$, which is the same as $$E(e, P) = C$$.
- For each $$d \in \mathcal{K}$$, $$D_d$$ denotes a bijection from $$\mathcal{C}$$ to $$\mathcal{M}$$. $$D_d$$ is the *decryption function*.
- Applying $$E_e$$ (or $$D_d$$) is called *encryption* (or *decryption*).

### Requirements for Symmetric-key Encryption

An encryption scheme $${E_e | e \in \mathcal{K}}$$ and $${D_d | d \in \mathcal{K}}$$ is *symmetric-key* if for each associated pair it is computationally "easy" to determine $$d$$ knowing only $$e$$ and to determine $$e$$ from $$d$$. In practice $$e = d$$.

The sender and recipient share a common-key.

**Requirements**:

1. A strong encryption algorithm.
  - Minimum: An attacker should be unable to decipher the ciphertext or key given the algorithm and one or more ciphertexts.
  - Stronger: An attacker should be unable to decipher ciphertext or key given a collection of ciphertexts and their corresponding plaintexts.
2. Sender and received must obtain copies of the secret key in a secure fashion and must keep the key secure.
  - Anyone who knows the key can decrypt all communication using that key.


Because we only need to keep the key secret and the algorithm can be public, this makes symmetric encryption feasible for widespread use.


### 3 Characteristics of a Cryptographic System

1. Type of operations used to transform plaintext into ciphertext. All encryption algorithms are based on two general principles:
  - **Substitution**: Each element in plaintext is mapped to another element.
  - **Transposition**: Elements in the plaintext are rearranged.
Most systems involve multiple stages of substitutions and transpositions.
2. Number of keys used.
 - Symmetric: 1 key shared.
 - Asymmetric: 2 key-pairs.
3. Way in which plaintext is processed.
 - **Block cipher**: Process input one block at a time, producing an output block for each input block.
 - **Stream cipher**: Process input continuously producing one output element at a time as input comes in. The block length is 1.


## Cryptanalysis and Brute-forcing

**Cryptanalysis**: Attacks rely on the nature of the algorithm plus perhaps some knowledge on general characteristics of the plaintext. Exploits the the characteristics of the algorithm to attempt to deduce a specific plaintext or key.

**Brute-force attack**: Attacker tries every possible key on a piece of ciphertext until an intelligible translation into plaintext is obtained. On average, half of the key-space must be tried.

### Model of Attack (Not many marks)

- Input: Whatever the adversary knows from the beginning. e.g. public key, distribution of plaintexts etc.
- Oracle: Models the information an adversary can obtain during an attack. Different kinds of information characterize different types of attacks.
- Output: Whatever the adversary wants to compute, e.g. secret key, partial information of plaintext.

## Types of Attack

| Type of Attack | Known to Cryptanalyst
|----------------|------------------------
| ciphertext Only | - Encryption Algorithm - ciphertext
| Known plaintext | - Encryption Algorithm - ciphertext - One or more plaintext-ciphertext pairs formed with the secret key
| Chosen Plaintext | - Encryption Algorithm - Ciphertext - Plaintext chosen by the Cryptanalyst together with its corresponding ciphertext.
| Chosen Ciphertext | - Encryption Algorithm - Ciphertext - Ciphertext chosen by the Cryptanalyst together with its corresponding plaintext.
| Chosen Text | - Encryption Algorithm - Ciphertext - Both plaintext/ciphertext chosen by the Cryptanalyst together with its corresponding ciphertext/plaintext.


### Classification of Security

#### Unconditional Security

Algorithm is secure even if attacker has unbounded computing power since the ciphertext provides insufficient information to uniquely discover the corresponding plaintext.

 - Security is measured using *information theory*.
 - With exception of one-time pad, there is no unconditionally secure encryption algorithm.
 - Hence, strive for algorithm that meets one or both of (Algorithm is **computationally secure** if either of these are met):
    - Cost of breaking cipher exceeds value of encrypted information.
    - Time required to break cipher exceeds useful lifetime of information.

#### Conditional Security

System can be broken in principle, but this requires more computing power than a realistic attacker would have.

 - Security is measured using *complexity theory*.

 ---

## Substitution Techniques

*A substitution technique is one in which the letters of plaintext are replaced by other letters or numbers or symbols.* If the plaintext is viewed as a sequence of bits, then substitution involves replacing plaintext bit patterns with ciphertext bit patterns.

### Mono-alphabetic substitution ciphers
A single cipher alphabet (mapping from plain alphabet to cipher alphabet) is used per message.

#### Caesar Cipher

Earliest known, simplest, substitution cipher (used by Julius Caesar). Used by shifting characters in the plaintext a specified amount of characters in the alphabet such that:

$$E_x(m) = (m + x) \bmod 26$$

Where $$m$$ is the message and $$x$$ is a secret number, decryption is simple done with:

$$D_x(m) = (m - x) \bmod 26$$

##### Brute-forcing

Brute-forcing this cipher is very easy as we can just try all possible 25 keys. This is possible as:
 - The encryption/decryption algorithms are known.
 - There are only 25 keys to try.
 - The language of the plaintext is known and easily recognizable.

Brute-forcing is normally impractical if:
 - the algorithm employs a large key space
 - the language of the plaintext is unknown
 - The output is compressed/abbreviated

#### Security of Mono-alphabetic substitution ciphers
Key spaces are huge ($$26! == 4 \times 10^{26}$$ possible keys). However it is easy to crack using frequency analysis. The ciphertext still holds some information about the structure of the plaintext.

We can count the occurrences of a single cipher-character and make reasonable assumptions about what that character could mean in the plaintext.

### Homophonic substitution ciphers
A solution to the aforementioned frequency analysis is to use a homophonic cipher where each character in the plaintext alphabet can be mapped to multiple characters in the ciphertext alphabet. This results in more work decryption.

#### Security of Homophonic substitution ciphers
Unfortunately cryptanalysis is still straightforward with homophones as we can use digram frequencies to analyse multi-letter patterns which still survive in the ciphertext.

To lessen the extent of the structure of plaintext making its way into the plaintext, we can:
- encrypt multiple letters of plaintext (Playfair Cipher)
- Use multiple cipher alphabets (Polyalphabetic substitution - Viginere cipher)


## Playfair Cipher
- Uses a $$5 \times 5$$ matrix of letters constructed using a keyword. e.g. if `MONARCHY` is the keyword we have:

$$
\begin{bmatrix}M & O & N & A & R\\C & H & Y & B & D\\E & F & G & I/J & K\\L & P & Q & S & T\\U & V & W & X & Z\end{bmatrix}
$$

**The plaintext is encrypted two letters at a time**:
1. If a pair is a repeated letter, insert filler like `X` (e.g. `BALLOON` $$\rightarrow$$ `BA LX LO ON`). Add an `X` at the end if necessary.
2. If both letters fall in the same row, replace each with the letter letter to the right, wrapping back to start from end (e.g. `AR` is encrypted as `RM`).
3. If both letters fall in the same column, replace each with the letter below it, wrapping top to bottom (e.g. `MU` is encrypted as `CM`).
4. Otherwise each letter is replaced by the letter in the same row and inthe column of the other letter of the pair. (e.g. `HS` becomes `BP`, `EA` becomes `IM` or `JM`).

### Security of the Playfair cipher

- Much improved over mono-alphabetic: $$26 \times 26 = 676$$ digrams vs $$26$$ letters.
- Would need a $$676$$ entry frequency table analyse and correspondingly more ciphertext.

However, breaking this cipher is still relatively easy:
- It still leaves much of the structure of the plaintext language intact.
- A few hundred letters of the ciphertext is generally sufficient enough to break the cipher.


## Polyalphabetic Substitution Ciphers
Use different mono-alphabetic substitutions as one proceeds through the plaintext message. The best known is the Viginere cipher.

### Vigenere cipher

- Use of a Vigenere *tableau*.
- The key has to be as long as the message (usually a repeating word).
- The key makes up the mod value in the caesar cipher for each character.

e.g.:

```
key:        deceptivedeceptivedeceptive
plaintext:  wearediscoveredsaveyourself
ciphertext: ZICVTWQNGRZGVTWAVZHCQYGLMGJ
```

Expressed numerically:

| Key        | 3  | 4  | 2  | 4  | 15 | 19 | 8  | 21 | 4  | 3  | 4  | 2  | 4  | 15
|------------|----|----|----|----|----|----|----|----|----|----|----|----|----|----
| Plaintext  | 22 |  4 |  0 | 17 |  4 |  3 |  8 | 18 |  2 | 14 | 21 |  4 | 17 | 4  
| Ciphertext | 25 |  8 |  2 | 21 | 19 | 22 | 16 | 13 |  6 | 17 | 25 |  6 | 21 | 19

- **Strength**: multiple ciphertext letters for each plaintext letter, one for each unique letter of the keyword, therefore letter frequency information is obscured.
- However not all knowlege of the plaintext structure is lost. (See `VTW` has been repeated when matchings in the key and plaintext are repeated). It is better than Playfair though.


### Vernam Cipher (XOR)

Properties of XOR:

 - $$0 \oplus 0 = 0$$
 - $$0 \oplus 1 = 1$$
 - $$1 \oplus 0 = 1$$
 - $$1 \oplus 1 = 0$$

 so that:

 - $$a \oplus a = 0$$
 - $$a \oplus 0 = a$$
 - $$a \oplus b = b \oplus a$$
 - $$a \oplus b \oplus b = a$$
 - $$(a \oplus b) \oplus c = a \oplus (b \oplus c)$$

 XOR can be used as a polyalphabetic cipher:
 - $$P \oplus K = C$$
 - $$C \oplus K = P$$

#### Usage

$$c_i = p_i \oplus k_i$$

$$p_i = c_i \oplus k_i$$

The $$i^{th}$$ binary digit of the plaintext $$p$$ is XOR'd with the keystream $$k$$ to produce a ciphertext, $$c$$.

This is difficult to break if the key is long, but is still breakable with a sufficient amount of ciphertext as we can use known/probable plaintext sequences.


### Perfect Secrecy (Maybe)
*Needs externally sourced work**

Before a ciphertext is intercepted, an attacker can only guess what the message is. Once the message is intercepted, the attacker could guess the key, but as there are the same amount of keys as messages; the attacker may as well just guess the message. The attacker has gained no more knowledge after intercepting the message.

#### One Time pad

Use a truly random key that is as long as the message, so that the key need not be repeated and, used to encrypt and decrypt a single message and then discarded.

 - Each new message $$P$$ requires a new key of same length as $$P$$.
 - Produces random output with no statistical relation to plaintext.
 - **Unbreakable**: $$C$$ contains no information whatsoever about $$P$$.

One-time pad is the only cryptosystem that exhibits *perfect secrecy*.

**Difficult in practice**:

 - Making large quantities of random keys.
 - Key distribution and protection, where for every message to be sent, a key of equal length is needed by both sender and receiver.

Hence the one-time pad is limited in utility but useful for low-bandwidth channels requiring very high security. (Moscow-Washington communication was previously secured this way).

## Transposition Ciphers

Perform some sort of permutation on the plaintext letters. Works on blocks of letters of the plaintext.

### Rail-fence cipher
Plaintext is written down as a sequence of diagonals and then read off as a sequence of rows.

e.g. with rail fence of depth 2:
```
plaintext: meet me after the toga party

m e m a t r h t g p r y
 e t e f e t e o a a t

ciphertext: mematrhtgpryetefeteoaat
```

### Rotating(turning) grilles
Uses a mask "grille" with pre-cut holes.

Encoder writes plaintext in holes, removes masks then fills the remainder with blind, filler text so that it appears as an innocuous message.

Decrypter must possess an identical mask (or know the spacing that created it).

This is an example of Steganography but provides basis for transposition.

### Multi-stage transposition cipher

**Write the message in a rectangle, row-by-row, and read the message off column by column, but permute the order of the columns**

e.g. with key `4312567`:

```
Key:        4 3 1 2 5 6 7
Plaintext:  a t t a c k p
            o s t p o n e
            d u n t i l t
            w o a m x y z
Ciphertext: ttnaaptmtsuoaodwcoixknlypetz
```

This can be made significantly more secure by performing more than one round of transposition. e.g.

```
Key:        4 3 1 2 5 6 7
Plaintext:  t t n a a p t
            m t s u o a o
            d w c o i x k
            n l y p e t z
Ciphertext: nscyauopttwltmdnaoiepaxttokz
```

- Multiple stages of encryption can produce an algorithm that is significantly more difficult to cryptanalyze.


## Steganography
Is all about concealing the existence of a message.

e.g.:
 - Invisible ink
 - pin punctures
 - arrangement of words and letters (more complex anagrams)
 - least significant bits of pixels in an image

#### Disadvantages with respect to encryption
 - Requires a lot of overhead to hide a message.
 - Once the system is discovered, it becomes worthless.

#### Advantages with respect to encryption
 - Can be employed by parties with something to lose (that they are actually communicating in secret) should the fact of their secret communication be discovered.
 - Encryption flags traffic as secret/important and may identify the sender/receiver as someone with something to hide.

---


## Composite (Product) ciphers

Substitution and transposition ciphers can be combined together to be more secure than single/multiple iterations of the same transposition/substitution cipher. MIX THEM UP.

**Execution of 2 or more simple ciphers in sequence so that the result (product) is cryptographically stronger than any of the component ciphers.**


### Feistel cipher

Many symmetric block encryptions in current use are based on a structure called **Feistel block cipher**.

The Feistel cipher alternates between substitutions (s-box) and transpositions(permutation (p-box)).

**Design features/parameters**:
- Block size:
  - Larger means greater security but decreased en/decryption speed. Traditionally 64-bit offers a reasonable trade-off but the new AES standard uses a 128-bit block size.
  - Greater security achieved by greater diffusion.
 - Key Size:
  - Larger increases security but *may* reduce en/decryption speed.
  - Greater security.


#### Block Cipher
Encrypts $$n$$-bit plaintext into $$n$$-bit ciphertext.

 - There are $$2^n$$ possible different plaintext blocks.
 - If limited to reversible mappings, $$2^n!$$ different transormations.
  - The encryption must be reversible (for decryption to be possible).

e.g. for $$n = 2$$. ciphertext `01` could come from plaintext `10` or `11`. It is a bijective mapping, i.e. we can go from $$A \rightarrow B$$ and $$B \rightarrow A$$.


##### Problems of Block cipher
 - A small block size is equivalent to classical substitution ciphers and thus easily attackable.
 - A large block size is impractical for performance.

Feistel suggests an invertible product cipher. i.e. approximation to ideal block cipher for large $$n$$, built out of easily recognizable components.

### 4 Rules to Remember

1. $$LD_{16-i} \parallel RD_{16-i} = RE_i \parallel LE_i$$ (meaning that $$LD_{16-i} = RE_i$$ and $$RD_{16-i} = LE_i$$).
2. Encryption: $$LE_i = RE_{i-1}$$ and $$RE_i = LE_{i-1} \oplus F(RE_{i-1}, K_i)$$.
3. Decryption: $$LD_i = RD_{i-1}$$ and $$RD_i = LD_{i-1} \oplus F(RD_{i-1}, K_i)$$.
4. There is a swap at the end of encryption and at the start of decryption ($$RE_1 = LE_0$$, $$LE_1 = RE_0$$, $$LD_1 = RD_0$$, $$RD_1 = LD_0$$)

2 and 3 can be determined from the fiestel diagrams.


![alt text](https://docs.google.com/drawings/d/1qa-vmZYHqRySYvEDSH4cpAgrd_PFuXUIfRD_QA5G1vA/pub?w=672&h=240 "Feistel Encryption and Decryption")

### DES

- Block size: 64 bits

#### S-boxes and P-boxes

- **S-boxes**: *confuse* input bits.
- **P-boxes**: *diffuse* bits across S-box inputs.


1. Partition block into two halves.
2. Process through multiple (16) rounds which:
 - Perform a substitution on the left data half (based on round function of right half and subkey).
 - then a permutation swapping halves.


#### DES Keys

If a 64-bit DES key is divided into 8 bytes, then sum of the 8 bits in each byte is odd.

This means that only 56 bits are needed because 7 of the 8 bits are used to determine the 8th bit in each byte. This also allows transmission errors of 1 bit can be spotted.


### DES Security

#### Meet-in-the-Middle attack (2DES)

Given a known Plaintext and Ciphertext, we can find all possible encryptions of the Plaintext encrypted by $$K_1$$ ($$2^{56}$$). We can store these sorted in a table. We can then find all possible decryptions ($$2^{56}$$) of the Ciphertext decrypted by $$K_2$$ and look for a match.
Each hit would be a candidate solution which can be validated with another plain/cipher pair. And this effort will succeed on $$2^{56}$$ operations, even though we have 2 56-bit keys (112-bits).


#### 3DES

Uses 3 stages of encryption with 2 keys $$K_1, K_2$$.

1. Encrypt ($$K_1$$)
2. Decrypt ($$K_2$$)
3. Encrypt ($$K_1$$)

Maintains compatibility with standard DES ($$K_2 = K_1$$). And there is no practical attack. A brute force search takes $$2^{112}$$ operations.

3DES is not compatible with 2DES but is compatible with DES as $$K_1 = K_2$$



## Block/Stream Cipher modes of operation

We pad blocks with `0`s!

Stream ciphers can be more desirable than block ciphers as the ciphertext will be the same length as the plaintext.

### ECB (Block)

Each block (64-bits) is encoded independently using the same key.

Is ideal for short amounts of data such as encryption keys.

### CBC (Block)

The input to the encryption algorithm is: previous 64 bits of ciphertext XOR next 64 bits of plaintext.

Is ideal for encrypting messages longer than $$b$$ bits.

**Encryption**:

$$C_i = E(K, C_{i-1} \oplus P_i)$$

$$C_0 = IV$$

**Decryption**:

$$P_i = D(K, C_i) \oplus C_{i-1}$$

$$C_0 = IV$$


**Proof of correctness**:

Via Encryption:

$$
\begin{aligned}
C_i &= E(K, C_{i-1} \oplus P_i)\\
C_i &= E(K, C_{i-1} \oplus (D(K, C_i) \oplus C_{i-1}))\\
C_i &= E(K, D(K, C_i))\\
C_i &= C_i
\end{aligned}
$$

Via Decryption:

$$
\begin{aligned}
P_i &= D(K, C_i) \oplus C_{i-1}\\
P_i &= D(K, E(K, C_{i-1} \oplus P_i)) \oplus C_{i-1}\\
P_i &= D(K, E(K, P_i))\\
P_i &= P_i
\end{aligned}
$$

### CFB (Stream)

Input is processed $$s$$ bits at a time. Previous ciphertext is used as input to the encryption algorithm which produces pseudorandom output. This is XORed with the next plaintext to produce the next unit of output.

**Encryption**

$$C_i = P_i \oplus \text{MSB}_s(E(K, C_{i-1}))$$


**Decryption**

$$P_i = C_i \oplus \text{MSB}_s(E(K, C_{i-1}))$$

### OFB (Stream)

Similar to CFB, except that the input is the previous ciphertext and full blocks are used.


---

## Public Key Cryptography

Let $${E_e | e \in \mathcal{K}}$$ and $${D_d | d \in \mathcal{K}}$$ form an encryption scheme. Given transformation pairs $$(E_e, D_d)$$ and $$c \in \mathcal{C}$$, it is infeasible to find an $$m \in \mathcal{M}$$ such that $$E_e(m) = c$$. This implies that it is infeasible to also determine $$d$$ from $$e$$, hence $$E_e$$ is a trap-door one-way function with $$d$$ as the trap-door. $$e$$ can be public information.

It has 3 main uses:

1. Encryption/Decryption
2. Digital Signatures
3. Key Exchange: exchanging a symmetric(session) key.

### Comparison with Symmetric-key encryption

**Symmetric-key**
```
Needed to work:
1. The same algorithm with the same key is used for encryption/decryption.
2. The sender and received must share the algorithm and key.

Needed for security:
1. The key must be kept secret.
2. It must be impossible (or at least impractical) to decipher a message if no other information is available.
3. Knowledge of the algorithm and having ciphertext samples must be insufficient to determine the key.
```

**Asymmetric-key**
```
Needed to work:
1. One algorithm used for encryption/decryption with pair of keys. One for encryption and one for decryption.
2. The sender and receiver must each have a unique key-pair.

Needed for security:
1. One of the two keys must be kept secret.
2. It must be impossible or at least impractical to decipher a message if no further information is available.
3. Knowledge of the algorithm plus one of the keys and ciphertext samples must be insufficient to determine the other key.
```

### Requirements for Public-key Cryptography

1. It is computationally easy for any principal $$B$$ to generate a pair (public key $$PU_b$$, private key $$PR_b$$).
2. It is computationally easy for sender $$A$$, knowing $$PU_b$$ and $$M$$, to generate $$C = E(PU_b, M)$$.
3. It is computationally easy for receiver $$B$$ to decrypt $$C$$ using $$PR_b$$ to recover $$M$$: $$M = D(PR_b, C) = D(PR_b, E(PU_b, M))$$.
4. It is computationally infeasible for an adversary:
 - Knowing $$PU_b$$ to determine $$PR_b$$.
 - Knowing $$PU_b$$ and $$C$$ to recover $$M$$.
5. It is useful for the keys to be applicable in any order: $$M = D(PU_b, E(PR_b, M)) = D(PR_b, E(PU_b, M))$$.


### Functions

#### One-way function
A function $$f: x \rightarrow Y$$ is a **one-way function**, if $$f$$ is *easy* compute for all $$x \in X$$, but $$f^{-1}$$ is *hard* or *infeasible* to compute.

e.g:
 - square root
 - modular cube root

#### Trapdoor one-way function
A **trapdoor one-way function** is a one-way function $$f_k : X \rightarrow Y$$ where, given extra information $$k$$, it is feasible to find, for $$y \in \text{Image}(f)$$ an $$x \in X$$ where $$f_k(x) = y$$. Hence a trapdoor one-way functions holds:
 - $$Y = f_k(X)$$ is easy if $$k$$ and $$X$$ are known.
 - $$X = f_{k}^{-1}(Y)$$ is easy if $$k$$ and $$Y$$ are known.
 - $$X = f_{k}^{-1}(Y)$$ is infeasible if $$Y$$ is known but $$k$$ is not.


### Number Theory

#### Prime Factorisation

When we **factor** a number, we write it as a product of other numbers. Multiplying numbers is easy, but **factoring** them is currently hard. **prime factorisation** is writing a number as a product of prime numbers.

#### Relatively Prime Numbers and Greatest Common Divisor (gcd)

Two natural numbers are **relatively prime** if they have no **common** factors apart from 1. i.e. Their *Greatest Common Divisor* is 1. $$gcd(a, b) = 1$$.

e.g. $$8$$ and $$15$$ are relatively prime:
- Factors of $$8$$: $$1, 2, 4, 8$$
- Factors of $$15$$: $$1, 3, 5, 15$$


#### Euclid's Algorithm and Extended Euclid's Algorithm

##### Euclid's Algorithm

Based on the theorem: $$\text{gcd}(a, b) = gcd(b, a \bmod b)$$ for any positive integers $$a$$ and $$b$$.


```
Euclid(a, b):
  if b == 0:
    return a
  else:
    return Euclid(b, a % b)
```

##### Extended Euclid's Algorithm

We use extended euclid's algorithm to compute integer coefficients $$x, y$$ such that $$d = \text{gcd}(a, b) = (a \times x) + (b \times y)$$.

```
Extended-Euclid(a, b):
  if b == 0:
    return (a, 1, 0)
  else:
    (d', x', y') = Extended-Euclid(b, a % b)
    (d, x, y) = (d', y', x' - ([a/b] * y'))
    return (d, x, y)
```

**Quotient**: $$[a/b] = q = \text{quotient of division}$$. The result without remainder. e.g. $$[99/78] = 1$$ because $$78$$ goes into $$99$$ once remainder $$21$$.

First 3 columns for finding $$gcd$$ (Greatest Common Divisor).
Last 3 columns for Extended Euclid's Algorithm.

|   $$a$$   |   $$b$$   | $$q = [a/b]$$ |   $$d$$   |   $$x$$   |   $$y$$
|-----------|-----------|---------------|-----------|-----------|-----------
|           |           |               |           |           |

**REMEMBER** (going backwards):

- $$d = d_{i-1}$$
- $$x = y_{i-1}$$
- $$y = x_{i-1} - (q \times x)$$


#### Modular Arithmetic

**Remainder**: Modulo gives us the remainder. $$r = a \bmod n$$.

**Congruent modulo**: $$a,b$$ are congruent modulo if $$a \bmod n = b \bmod n$$. This is written as $$a =_n b$$.

#### Fermat's Little Theorem

For a given $$a$$ and $$n$$, if they are:
 - relatively prime.
 - $$n$$ is prime.

then $$a^{n-1} =_{n} 1$$.

**Proof**:

1. Consider the set $$\lbrace 1, 2, ..., n - 1 \rbrace$$ of positive integers less than $$n$$.
2. Multiply each element by $$a \bmod n$$ to get the set $$X = \lbrace a \bmod n, 2a \bmod n, ..., (n-1)a \bmod n \rbrace$$.
3. Observe that none of the elements in $$X$$ are $$0$$ because $$n$$ does not divide $$a$$.
4. No two of the integers in $$X$$ are equal:
  - Assume that $$x \times a =_{n} y \times a$$ for $$1 \leq x \lt y \leq n - 1$$.
  - $$a$$ and $$n$$ are relatively prime so we can eliminate $$a$$ from both sides and obtain $$x =_{n} y$$. This is impossible as we assumed that $$x$$ and $$y$$ are both positive integers less than $$n$$, with $$x \lt y$$.
5. From this, we know that the $$(n-1)$$ elements of $$X$$ are all positive integers with no two elements equal.
6. Hence, $$X$$ consists of the set of integers $$\lbrace 1, 2, ..., n-1 \rbrace$$ in some order.
7. Multiplying the numbers in both sets, and taking the result $$\bmod n$$ yields:
  $$a \times 2a \times ... \times (n-1)a =_{n} [1 \times 2 \times ... \times (n-1)]\\a^{n-1} =_{n} 1\\$$

8. As $$n$$ is prime, $$(n-1)!$$ is relatively prime to $$n$$; so cancelling the $$(n-1)!$$ yields $$a^{n-1} =_{n}1$$ as desired.


#### Euler's Totient Function and Euler's Theorem

**Properties**:

 - $$\phi(1) = 1$$.
 - $$\phi(p) = p - 1$$ if $$p$$ is prime.
 - $$\phi(p \times q) = \phi(p) \times \phi(q) = (p - 1) \times (q - 1)$$ if $$p$$ and $$q$$ are prime and $$p \neq q$$.

 **Euler's Theorem**: $$a^{\phi(n)} =_{n} 1$$ for all $$a, n$$ such that $$gcd(a, n) = 1$$.

### RSA

 - $$p = \text{prime number}$$
 - $$q = \text{prime number}$$
 - $$n = p \times q$$
 - $$e = gcd(\phi(n), e) = 1; 1 < e \phi(n)$$ (relative prime)
 - $$d = e^{-1} \bmod \phi(n)$$ (calculate using Extended Euclid's algorithm)

 $$e$$ and $$n$$ are public. $$d$$ is secret.

 **Encryption**: $$C = M^e \bmod n$$.

 **Decryption**: $$M = C^d \bmod n$$.

 #### Requirements
 1. It is possible to find values of $$e, d, n$$ such that $$M^{ed} \bmod n = M$$ for all $$M \lt n$$.
 2. It is relatively easy to calculate $$M^e \bmod n$$ and $$C^d \bmod n$$ for all values of $$M \lt n$$.
 3. It is infeasible to determine $$d$$ given $$e$$ and $$n$$.

 **Example**:
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

#### Correctness of RSA

We must show that exists $$e, d, n$$ such that

$$M^{ed} \bmod n = M \text{ for all } M \lt n$$

It can be shown that the above equation holds if $$e$$ and $$d$$ are multiplicative inverses $$\bmod \phi(n)$$:
  - $$d =_{\phi(n)} e^{-1} \text{ iff.}$$
  - $$de =_{\phi(n)} 1 \text{ iff.}$$
  - $$ed \bmod \phi(n) = 1$$

This is true only if $$d$$ and $$e$$ are relatively prime to $$\phi(n)$$.

### Diffie-Hellman

Based on discrete-logarithms where it is difficult to calculate an $$i$$ such that $$b = s^i \bmod p$$. Advantageous over RSA because the key, $$K$$, is never transmitted, it is calculated by both parties.

**Remember**:

- $$Y_A = \alpha^{X_A} \bmod q$$
- $$Y_B = \alpha^{X_B} \bmod q$$
- $$K_A = Y_B^{X_A} \bmod q$$
- $$K_B = Y_A^{X_B} \bmod q$$

where:
 - $$X_?$$ is each principal's randomly generated number.
 - $$q$$ and $$\alpha$$ are public.
 - $$K_?$$ is the computed key for *Alice* and *Bob*.

1. *Alice* generates $$X_A$$ and calculates $$Y_A$$ and sends it to *Bob*.
2. *Bob* generates $$X_B$$ and calculates $$Y_B$$ and sends it to *Alice*. *Bob* also calculates $$K_B$$.
3. *Alice* calculates $$K_A$$.

#### Man-in-the-middle attack

As the keys are **unauthenticated**, the Diffie-Hellman key exchange is vulnerable to a Man-in-the-middle attack.

An attacker, $$C$$ can intercept and forward messages so that $$A$$ shares a key with $$C$$ and $$B$$ shares a key with $$C$$.

1. $$C$$ prepares to randomly generated private keys $$X_{C_1}$$ and $$X_{C_2}$$. They also calculate the corresponding public keys $$Y_{C_1} = \alpha^{X_{C_1}} \bmod q$$ and $$Y_{C_2} = \alpha^{X_{C_2}} \bmod q$$.
2. $$A$$ generates $$X_A$$ and transmits $$Y_A = \alpha^{X_A} \bmod q$$ to $$B$$.
3. $$C$$ intercepts $$Y_A$$ and transmits $$Y_{C_1}$$ to $$B$$. $$C$$ calculates $$K_{C_2} = Y_A^{X_{C_2}} \bmod q$$ as the key to share with $$A$$.
4. $$B$$ receives $$Y_{C_1}$$, generates $$X_B$$ and calculates $$K_B = Y_{C_1}^{X_B} \bmod q$$.
5. $$B$$ transmits $$Y_B = \alpha^{X_B} \bmod q$$ to $$A$$.
6. $$C$$ intercepts $$Y_B$$ and transmits $$Y_{C_2}$$ to $$A$$. $$C$$ calculates $$K_{C_1} = (Y_B)^{X_{C_1}} \bmod q$$.
7. $$A$$ receives $$Y_{C_2}$$ and calculates $$K_A = (Y_{C_2})^{X_A} \bmod q$$.

Now we end up with shared secret keys $$K_A = K_{C_2}$$ and $$K_B = K_{C_1}$$.


#### Group Diffie-Hellman

1. Alice, Bob and Carol all generate their random large private integer $$X_A$$, $$X_B$$, $$X_C$$ respectively and calculate their public integer $$Y_i = \alpha^{X_i} \bmod q$$.
2. Each agent sends another agent's public integer raised with their private key to another agent (in a circular chain).
  - Alice sends Carol's public integer raised with her private integer ($$Y_C^{X_A} \bmod q$$) to Bob.
  - Bob sends Alice's public integer raised with his private integer ($$Y_A^{X_B} \bmod q$$) to Carol.
  - Carol sends Bob's public integer raised with her private integer ($$Y_B^{X_C} \bmod q$$) to Alice.
3. Each agent calculates the shared key by raising what they receivied with their private integer.
  - Alice calculates $$K = Y_B^{X_CX_A} \bmod q$$.
  - Bob calculates $$K = Y_C^{X_AX_B} \bmod q$$.
  - Carol calculates $$K = Y_A^{X_AX_C} \bmod q$$.

#### El-Gamal variant of Diffie-Hellman

El Gamal is a sped up version of DH where agent $$B$$, can respond to $$A$$ with an encrypted message. In the following protocol:

1. $$A \rightarrow B: Y_A$$. $$A$$ calculates $$Y_A = \alpha^{X_A} \bmod q$$ and sends it to $$B$$.
2. $$B \rightarrow A: (E(M, K), Y_B)$$. $$B$$ calculates $$Y_B = \alpha^{X_B} \bmod q$$ **AND** computes the shared key $$K_B = Y_A^{X_B} \bmod q$$ and uses it to encrypt a message $$M$$.
3. $$A$$ calculates $$Y_B^{X_A} \bmod q$$ to get the shared key $$K$$.


### Massey-Omura scheme

Both attach locks to messages (from everyday Cryptography).


## Message Integrity & Cryptographic hashes

### Hash vs Cryptographic Hash functions

#### Hash functions

A **hash function** $$h(x)$$ has the properties:
 1. *Compression*: $$h$$ maps an input $$x$$ of arbitrary bit length to an output $$h(x)$$ of fixed bit length $$n$$.
 2. Polynomial time computable.


#### Cryptographic Hash functions

$$h(x)$$ is a **cryptographic** hash function if it is **additionally**:
 1. One-way (preimage resistant)
 2. Either:
  - 2nd-preimage resistant. It is infeasible to find a second input that has the same output as another input.
  - Collision resistant.

## Message Authentication

a.k.a *data-origin authentication*, different to *entity authentication*.

Prevents an adversary from changing who appears to have sent the message.

*Message authentication* implies *message integrity*

**2 options**:
 - MACs (without non-repudiation)
 - Digital Signatures (includes non-repudiation)

### Message Authentication Codes (MACs)

A MAC algorithm is a family of hash functions $$h_k$$ parameterised by a secret key $$k$$. The $$h_k$$ must be **computation-resistant** (given zero or more MAC pairs ($$x_i$$, $$h_k(x_i)$$)), it is infeasible to compute ($$x$$, $$h_k(x)$$) for any new input $$x \neq x_i$$.

Alice and Bob can share a secret-key $$k$$ that they both use to generate a hash of the message. Alice sends the message along with the hash to Bob, and Bob can hash the message and compare his result with the hash that Alice sent. An attacker Charlie cannot alter the message as he does not know the secret $$k$$.

MACs do not offer non-repudiation as anyone with the key $$k$$ can generate MACs for arbitrary messages.

### Digital Signatures

Use asymmetric cryptography to prove *data origin*. This can be based on reversible(Encryption/Decryption is the same function) public-key cryptosystems (such as RSA).


**Forgery**

An attacker can select a random signature from the signature space and find the corresponding message. The entity didn't sign this message, but will be able to find messages that they do not want signed. Digital Signatures are only considered secure when the message space is sufficiently small.


---

## Authentication Protocols

### Needham-Schroeder (NSPK)

1. $$A \rightarrow B: \lbrace NA, A \rbrace_{K_B}$$
2. $$B \rightarrow A: \lbrace NA, NB \rbrace_{K_A}$$
3. $$A \rightarrow B: \lbrace NB \rbrace_{K_B}$$

$$N?$$ is a nonce (a random number used only once).

#### Man-in-the-middle attack on Needham-Schroeder

An attacker can perform the protocol with both $$A$$ and $$B$$ and forward the response. i.e. he plays the game with both principals at the same time copying their moves. The problem is that in step 2, $$B$$ only sends $$\lbrace NA, NB \rbrace_{K_A}$$. This doesn't tie his nonce to a name and so anyone can take it. The solution is for $$B$$ to send $$\lbrace NA, NB, B \rbrace_{K_A}$$.


### Kerberos

Is a protocol for authentication in open distributed environments.

**Requirements**:
 - Secure: An eavesdropper should not be able to impersonate users.
 - Reliable: Lots of services rely on Kerberos for access control, therefore it must highly reliable.
 - Transparent: Users should only need a single password to obtain access to services. (Singe sign-on)
 - Scalable: The system should be able to scale to support large amounts of users.

#### Steps
**KAS**: Kerberos Authentication Server.

**TGS**: Ticket Granting Server.

1. User logs onto workstation and requests service on host.
2. KAS verifies user's access rights in database, creates ticket-granting ticket and session key. Results are encrypted using key derived from user's password.
3. Workstation prompts user for password and uses password to decrypt incoming message, then sends ticket and authenticator that contains user's name, network address and time to TGS.
4. TGS decrypts ticket and authenticator, verifies request, then creates ticket for requested server.
5. Workstation sends ticket and authenticator to server.
6. Server verifies that ticket and authenticator match, then grants access to service. If mutual authentication is required, server returns an authenticator.


#### Limitations of Kerberos 4

 - Encryption is not needed, but an attacker can flood the KAS with requests.
 - Double encryption is redundant.
 - Relies on uncompromised and synchronised clocks. If a host is compromised, then the clock can be adjusted and replay attacks are easy.


---

## Passwords

**Authentication**: The verification of identity of a person or system. Methods for authentication are usually:
  - *something you have*: e.g. an entrycard
  - *something you know*: e.g. a password
  - *something you are*: e.g. fingerprint, signature

**Strong authentication**: Cryptographic challenge-response protocols. One entity *proves* its identity to another entity by demonstrating knowledge of a secret known to be associated with that entity without revealing the secret itself to the verifier.

**Weak authentication**: Conventional password schemes.


### PIN numbers
Fixed (time-invariant) passwords. Used in conjunction with *something you have*.

### Multi Factor Authentication (MFA)
The user has to successfully present authentication factors from at least 2 of the 3 aforementioned categories (*something you have*, *something you know*, *something you are*).

### One-time passwords
Fixed password schemes are vulnerable to replay attacks via eavesdropping. A partial solution is to use **one-time passwords**, where each password is only used/accepted once.

**Variations**:
 - ***Shared lists***: User and system use a set of secret passwords which are only valid once.
 - ***Sequentially updated one-time passwords***: Initially only a secret password is shared, then during authentication, the user sends a new encrypted password.
 - ***One-time password sequences based on a one-way function***.


### Fiat-Shamir ZKP

**Principals**:
 - Prover Peggy
 - Verifier Victor
 - Trusted Third Party Trent

**Setup**:

1. Trent chooses large primes $$p, q$$ and calculates $$n = pq$$.
2. $$n$$ is public, whereas $$p, q$$ are secret.
3. Peggy chooses a secret $$s$$ such that $$1 \leq s \leq n -1$$ and calculates $$v = s^2 \bmod n$$. $$s$$ is kept private and $$v$$ is public.

Peggy aims to convince Victor that she knows $$s$$ without telling Victor what $$s$$ is.


**Verification**:

1. Peggy chooses a random number ***commitment***, $$r$$ such that $$0 \leq r \leq n-1$$. Peggy calculates the ***witness***, $$x = r^2 \bmod n$$ and sends it to Victor.
2. Victor sends the ***challenge***, $$c$$ to Peggy where $$c$$ is either $$0$$ or $$1$$.
3. Peggy calculates the ***response***, $$y = (r \times s^c) \bmod n$$ to show that she knows her private key $$s \bmod n$$.
4. Victor calculate $$y^2 \bmod n$$ and $$(x \times v^c) \bmod n$$. If these values are congruent, then Peggy knows the value of $$s$$ or she has calculated the value through dishonest means.

These 4 steps constitute a ***round*** which is repeated several times with different random ***challenges***, where Peggy must pass each round to be verified.

---

## Security Protocols

A **protocol** consists of a set of rules (conventions) that determine the exchange of messages between two or more principles. In short, a **distributed algorithm** with emphasis on communication.

**Security** (or cryptographic) protocols use cryptographic mechanisms to achieve security objectives.


---

## Social Engineering

The weakest link in a secure system is usually the human being.


---

## Revision lecture

### Exam

4 questions. Must answer first question, pick 2 of the other 3 questions.

- Proof of theorems.

### Lecture 1

- Terminology
- Define security properties (what is confidentiality, integrity etc.) + Draw a diagram. What is an attack/defence?
- Privacy & Anonymity, Anonymity set.
- Know what is risk minimisation. Not expected to reproduce diagram.
- Don't need to know about OWASP

### Lecture 2

- Encryption/Decryption with simple ciphers
- Terminology. e.g. what is the difference between asymmetric and symmetric encryption. Must know slide 20, 21, 22.
- Requirements for symmetric encryption.
- What is a substitution, transposition, reversability.
- Difference between block and stream-ciphers
- Model of Attack (41 - not many marks)
- Types of attack (43)
- Caesar Cipher (a=0, z=25)
- No brute-forcing of ciphertexts. But may be given a cipher and asked for its characteristics.
- Mono-alphabetic and Homophonic cipher definitions.
- Playfair, Vigenere (No questions on ciphers from coursework! :D), security and pitfalls.
- Vernam (XOR)
- Perfect secrecy (maybe)
- One-time pad. Definition. Think about one-time pad, Reasoning on whether some keys are good keys (based on properties.)
- Transposition ciphers (substitution, rail-fence). No rotating grilles (how does it work).
- A more complex transposition cipher (115) and multi-stage.
- Steganography definition.
- Fiestel!
  - Reversible/Irreversible mapping.
  - Draw picture! for corresponding rounds. Show that proofs (142). **Will come up.**
  - No hexadecimal or carrying out complete encryption.
- DES!
  - Setup (64-bit + structure of key)
  - Overall scheme (157)
  - The DES property for DES keys (158). Given a key, is it a valid DES key? with justification.
  - Know how to use the tables. P-boxes, S-boxes.
  - Security of DES and Triple DES. (Meet-in-the-Middle attack), to what extent.
- No AES! :D How many bits does it use?
- Block/Stream Cipher modes of operation (everything). Try remembering the picture in order to determine the definition. Diagrams!
  - ECB
  - CBC
  - CFB
  - OFB

### Lecture 3

 - Key distribution, to what extend public key is a solution.
 - Public key formalisation.
 - Comparison of public/symmetric.
 - Requirements for public key cryptography.
 - One-way function definitions, examples.
 - Definitions for number theory.
 - Euclids and Extended euclids. Check $$e \times d \bmod \phi(n)$$. Write out algorithm (function).
 - Modular arithmetic
 - Fermat's little theorem proof.
 - Euler's totient definition.
 - RSA properties, correctness, ingredients.
 - Diffie-Hellman, Discrete logarithms, protocol for DH. Both Man-in-the-middle attack.
 - El-Gamal
 - Massey-Omura definition
 - Hash function definitions (complete - 102)
 - MACs and Digital Signatures definitions. No construction of MACs. How to use them.
 - No appendix


### Lecture 4

 - Needham-Schroeder
  - Man-in-the-middle attack
  - Solution properties
 - Kerberos in detail.
    - 6 messages.

### Lecture 5

 - Properties of Passwords, Definitions. MFA.
 - Fiat-Shamir algorithm (No other ZKP)
 - No Malware viruses etc. and Firewalls



<script src='https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'></script>
