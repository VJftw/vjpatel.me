+++
date = "2016-10-13T23:26:19+01:00"
course = "MSc Computing and Security"
module = "7CCSMSEN Security Engineering"
title = "Notes"
latex = true
+++


## Secure Systems

4 requirements:
 - Policy: What is supposed to be achieved?
 - Mechanism: Cipher, access controls, tamper resistance, etc.
 - Assurance: The amount of reliance you can put on the mechanism
 - Incentive: The motive that people guarding and maintaining the system have done their job properly and the motives behind attackers.

#### Chip and Pin secure?
- **Yes**: mag-stripe cards cannot be cloned anymore.
- **No**: Terminals can be tampered with. (videos of **tamper-resistant** terminals playing tetris prove they are not tamper-resistant).


---
## Privacy

### Re-identification attacks


### Difrerential Privacy
Adding noise to a sensitive data set so that the statistical information is still retained but the real individuial's information is hidden among other entires.

Some questions ({{<latex i="f(x)" />}}) are not allowed to be asked as they may be deducible. e.g. a single/few person in the original data set.


---
## Bitcoins

based on public/private key cryptography.

Blocks are hashed and have a hashed reference to the previous block (collisions unlikely in our lifetime) - future?


### Transaction Graph
Only the history of transactions of a bitcoin are recorded. The bitcoin's movement between people.

Paying using unspent transactions which are in your name. Transactions have different values.


bitcoins (transactions) are stored with public keys. The people who own the transaction's corresponding private key can then re-encrypt the bitcoin with someone else's public key. People could own more than one key pair.


- Bitcoin makes it articificially/computationally costly for users to validate transactions.
- It rewards them for being involved in the transactions.


## Penetration Testing

Is offensive security.

###  vs Hacking Ethical(or not!)

### Definitions

- **Vulnerabilities**: are weaknesses in a system security or its security policy that can be exploited by an attacker.
- **Attack vector** (or exploit): A systematic and repeatable way of exploiting a Vulnerability.

### Hacking Phases

1. Footprinting and Reconnaisaince. Knowledge of the company, obtaining information from social networks etc.
2. Scanning. Find machines to attack; can obtain IP ranges for a company.
3. Enumeration. Find the services running on the machines.
4. Gaining Access (not always necessary. i.e. DoS).
    - Access into the System.
    - Privilege escalation.
5. Maintaining Access.
6. Clearing tracks.


### Penetration Testing Phases

Is the same as *Hacking* but all of the activities are carried out **with prior consent** with a clear scope. **Everything is documented** and there will be a **final report**.


---

### Social Engineering



---

## Last Lecture
