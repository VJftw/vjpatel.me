+++
date = "2016-04-24T23:09:26+01:00"
title = "Implementations of Homomorphic Encryption"
summary = "Excerpts from my undergraduate dissertation about Homomorphic Encryption"
latex = true
+++


## Introduction

Cryptography is the study and practice of techniques for secure communication in the presence of third parties called adversaries (Rivest 1990). This will always play an important role in society and its importance has exploded with the rise of the internet as it allows for information to be shared easily but with a greater amount of adversaries present.

Cryptography is an umbrella consisting of the following services (Martin 2012):

 - **Confidentiality**, the assurance that data cannot be viewed by an unauthorised user.
 - **Data integrity**, the assurance that data has not been altered in an unauthorised manner.
 - **Data origin authentication**, the assurance that a given entity was the origin source of received data.
 - **Non-repudiation**, the assurance that an entity cannot deny a previous commitment or action.
 - **Entity authentication**, the assurance that a given entity is involved and currently active in a communication session.

For this project, we will be exploring *encryption* (*homomorphic encryption* in particular) which belongs to the *Confidentiality* aspect of cryptography.

### Symmetric Encryption

Symmetric encryption involves the use of a single key or password which is used to encrypt the plaintext and also used to decrypt the cipher-text.

One of the earliest and basic known cryptosystems is the Caesar cipher, used by the Roman general Gaius Julius Caesar in private correspondence. The Caesar cipher is used by shifting characters in the alphabet such that

`$$ E_x(m) = (m + x) \bmod 26 $$`

Where `$ m $` is the message and `$ x $` is a secret number. Decryption is simply done with

`$$ D_x(m) = (m - x) \bmod 26 $$`

The Vigenère cipher, invented by Blaise de Vigenère in the sixteenth century, builds upon the Caesar cipher and was believed to be secure for a significant period in history (Simmons 2016). It demonstrates using a positional dependency to defeat single letter frequency analysis (which easily breaks the Caesar and substitution ciphers) (Martin 2012). It achieves this by introducing a key-word that is compared against the plaintext to create an individual secret `$ x $` for each character and then used in the classical Caesar cipher. Figure 1 illustrates this.

 | Plaintext | Key-word | `$ x $` for character | Cipher-text |
 | --------- | -------- | --------------------- | ----------- |
 | b         | s        | 18                    | t           |
 | o         | e        | 4                     | s           |
 | n         | c        | 2                     | p           |
 | j         | r        | 17                    | a           |
 | o         | e        | 4                     | s           |
 | u         | t        | 19                    | n           |
 | r         | k        | 10                    | b           |

*Figure 1: Example of Vigenère cipher*


When the key-word is known, you can perform decryption with the Caesar cipher for each character once you have determined each individual `$ x $`.

This scheme can be cracked once the length of the key-word is learnt because an adversary is able to learn at which positions the same individual `$ x $` is used and perform frequency analysis.

### Asymmetric Encryption

Symmetric encryption can only work once all parties in a conversation know the secret password. In an open network, such as the internet, it is difficult to exchange symmetric keys without an adversary being able to see them. Asymmetric encryption solves this problem by having a key-pair (two related keys). One key is a public key that is broadcast for anyone that wants to send you a message, whilst the second is a private key that you use to decrypt any messages that people have sent you. This is more computationally expensive than symmetric encryption and so in practice, for example the secure Hypertext Transport Protocol (HTTPS), we can use asymmetric encryption to exchange a secret key which is then used with symmetric encryption for the rest of communication (Heaton 2014).

#### Rivest-Shamir-Adleman (RSA) Encryption

One of the first proposed and widely used practical asymmetric cryptosystems is RSA (Martin 2012). It is named after its creators Ron Rivest, Adi Shamir and Leonard Adleman with the first initial of each of their surnames. Plain RSA encryption is illustrated in the following example:

*Bob* and *Alice* are two people that wish to communicate securely. They both take the following steps to create their own unique public and private key pairs.

1. Find two random primary numbers `$ p $` and `$ q $`.
2. Calculate `$ n = p \times q $`
3. Calculate `$ \phi(n) $` using Euler's totient function.
4. Find a random integer `$ e $` that is coprime with `$ \phi(n) $`.
5. Calculate `$ d = e^{-1} \bmod \phi(n) $`.

The public key is made up of `$ n $` and `$ e $`, whilst the private key consists of `$ n $` and `$ d $`. The other variables (`$ p $`, `$ q $` and `$ \phi(n) $`) can be discarded but not revealed as they are used to calculate `$ d $`. Both *Bob*’s and *Alice*’s public keys can be placed in a public domain where anyone is able to read them.

Once *Bob* and *Alice* have their key pairs, they can communicate with each other. If *Bob* wanted to send *Alice* a message, he would:

1. Read *Alice*'s public key from the public domain which bears the variables `$ n $` and `$ e $`.
2. Calculate the cipher-text `$ c = m^e \bmod n $`, where `$ m $` is the message he wants to send.
3. Transmit the cipher-text `$ c $` to *Alice*.

*Alice* can then decrypt `$ c $` to `$ m $` by calculating `$ m = c^d \bmod n $` with her private key that contains the values of `$ n $` and `$ d $`. *Alice* can also send *Bob* messages by using *Bob*'s public key.

RSA is regarded as secure based on the assumption that large number factorisation is difficult for current computers. These problems are in a complexity class known as `$ NP $` #TODO: explain complexity with computability and P = NP.

This is an impending weakness of this cryptosystem that we currently rely on as Shor's quantum factorisation algorithm can be used to rapidly factorise large numbers in polynomial time, thus placing this problem into `$ P $` and breaking this scheme (Cao 2005).

## Homomorphic Encryption

Homomorphic encryption describes the ability to encrypt values and allow any untrusted external process to perform operations on them whilst retaining their original meaning. This is currently a hot topic in the industry because it opens doors in secure computing in the cloud where for example, mobile devices could offload computations to other computers in the cloud in order to save power (Parno 2013) and even enabling private queries to a search engine (Gentry 2009). The idea was first presented in 1978 through the idea of privacy homomorphism (Rivest et al. 1978).

##### Verifiable Computing

Verifiable computing allows us to validate whether or not a computation has been computed correctly and that the result is correct. This goes hand-in-hand with homomorphic computing as it would prevent a malicious third party computer giving an incorrect response.

### The Pailler Cryptosystem

The Pailler cryptosystem (Pailler 1999) is an asymmetric scheme with additive homomorphic properties based on the composite residuosity problem, which describs how it is computationally difficult to decide where a number `$ z $` is an `$ n $`-residue modulo `$ n^2 $` given by the existence of a `$ y $` in

`$$ z = y^n \bmod n^2 $$`

To generate a key-pair we begin quite similarly to RSA:

1. Find two random primes `$ p $` and `$ q $` wth the same bit-length.
2. Calculate `$ n = p \times q $`.
3. Calculate `$ g = n + 1 $`.
4. Calculate `$ l = \phi(n) $` using Euler's totient function.
5. Calculate `$ k = l^{-1} \bmod n $`.

The public key consists of `$ n $` and `$ g $` and the private key is made up of `$ l $` and `$ k $`.

To encrypt a plain-text `$ m $` to cipher-text `$ c $` we:
1. Find a random prime `$ r $` where `$ 0 < r < n $`.
2. Calculate cipher-text `$ c = g^m \times r^n \bmod n^2 $`.

And to decrypt a cipher-text `$ c $` to `$ m $` we:

1. Calculate `$ u = c^l \bmod n^2 $`
2. Calculate `$ v = \frac{u - 1}{n} $`.
3. Calculate plain-text `$ m = v \times k \bmod n $`.

As per the composite residuosity problem, `$ c $` is one way without knowledge of `$ l $`.

The homomorphic property of the Pailler cryptosystem is that the product of two cipher-texts modulo `$ n^2 $` will be the sum of the matching cipher-texts modulo `$ n $`. The following equation illustrates this:

`$$ D(c_1 \times c_2 \bmod n^2) = m_1 + m_2 $$`

Where `$ D $` is the decryption function we outline the steps for, `$ c_1 $` and `$ c_2 $` are the cipher-texts for two plain-texts `$ m_1 $` and `$ m_2 $` respectively.

The Pailler cryptosystem, with its additive homomorphic properties, can be used in a binary (for or against) voting system (Damgård et al. 2010).

To note, the Pailler cryptosystem works with any plain-text `$ m $` when `$ m < n $`. This is quite impressive as with an 8-bit key length we would be able to use numbers up to a minimum of 128, dependent on the random primes `$ p $` and `$ q $`.

A potential disadvantage of this cryptosystem is that, in order to add `$ m_1 $` and `$ m_2 $`, the server is told to compute:

`$$ c_1 \times c_2 \bmod n^2 $$`

From this, and adversary might deduce that the client is using the Pailler cryptosystem and exploit any known flaws.

### Rivest-Shamir-Adleman (RSA) Encryption

The RSA cryptosystem we described earlier, unintentionally but usefully has multiplicative homomorphic properties (Gentry 2009) where the product of two cipher-texts is also the product of the corresponding plain-texts once decrypted. This can be expressed by:

`$$ D(c_1 \times c_2) = m_1 \times m_2 $$`

This is the simplest homomorphic cryptosystem but as this scheme is unpadded, it is not semantically secure as it has a deterministic encryption algorithm. This means that there is no random element used during encryption of a plain-text.

### Gorti's Enhanced Homomorphic Cryptosystem (EHC)

Gorti's enhanced homomorphic cryptosystem (Rao & Uma 2013) is a symmetric cryptosystem that supports addition, multiplication and mixed addition and multiplication. It supports more than one operation with two cipher-texts which makes it an *enhanced* homomorphic cryptosystem.

To generate a key, we begin similarly to RSA:

1. Find two large primes `$ p $` and `$ q $` such that `$ p < q $`.
2. Calculate `$ m = p \times q $`.

In the original paper, they use `$ p $` as a shared key inside a MANET (Mobile Ad-hoc Network) for the multiple clients that wish to communicate with each other. For this cryptosystem in the client-server model, `$ p $` remains secret along with the rest of the values.

To encrypt a plain-text `$ t $` into cipher-text `$ c $`:

1. Let `$ r $` be a random number.
2. Calculate `$ c = t + rpq \bmod m $`.

And to decrypt a cipher-text `$ c $` to plain-text `$ p $`:

1. Calculate `$ t = c \bmod p $`.

As you can see, an adversary would need to find the value of `$ p $` in order to decrypt the message. Finding `$ p $` without knowing `$ m $`, `$ q $` or `$ r $` is currently believed to be "very tough" (Rao & Uma 2013) to solve as this presents a large number factorisation problem, the same problem that RSA relies on to be secure.

The homomorphic properties of Gorti's enhanced cryptosystem could be expressed by, the addition or multiplication of two cipher-texts, when decrypted correspond to the sum or product of the plain-texts. The equations below illustrate this.

`$$ D(c_1 \times c_2) = m_1 \times m_2 $$`

`$$ D(c_1 + c_2) = m_1 + m_2 $$`

As aforementioned, this cryptosystem relies on the same large number factorisation problem to be secure and can therefore also be broken with Shor's quantum factorisation algorithm (Cao 2005).

This cryptosystem at 8-bits can only support calculations that result in a number less than 186. For larger numbers, we can increase the key size, but in practice the key size should be greater than 1024 bits in order to provide a hard enough factorisation problem for adversaries.


## Fully Homomorphic Encryption (FHE)

A fully homomorphic cryptosystem is able to compute arbitrary operations on cipher-texts. The systems we have visited so far can only perform a limited set of operations and are thus limited in functionality and use.

Craig Gentry presented the first construction of fully homomorphic encryption using ideal lattices (Gentry 2009). Lattice-based cryptography has gained a lot of interest of the recent years as it is currently believed to be resistant to quantum attacks whilst retaining efficiency (Gentry et al. 2008).

Gentry's original paper describes how "bootstrapping" a somewhat homomorphic encryption scheme is capable of fully homomorphic encryption as it can evaluate its own decryption circuit using recursive embedding. Unfortunately, this scheme becomes too "noisy" very quickly and the cipher-texts need to be "refresh"-ed. Further research has been done on Gentry's original work which has brought the Brakerski-Gentry-Vaikuntanathan (BGV) cryptosystem which can perform fully homomorphic encryption without "bootstrapping" (Brakerski et al. 2011). There is also a C++ library that implements the BGV cryptosystem which is written and maintained by Shai Halevi from IBM (Halevi 2005).

In a discussion with my supervisor, he stated that Gorti's Enhanced Cryptosystem is so simple that it should be well renowned. Gorti's scheme is capable of mixed addition and multiplication thus making it a viable candidate for fully homomorphic encryption with Gentry's "bootstrapping" method.

Three years before Gorti’s scheme was published, Gentry had been part of a team that had also looked at using modular arithmetic to construct a fully homomorphic cryptosystem for conceptual simplicity (Van Dijk et al. 2010). This scheme is fully homomorphic but only supports encryption of single-bits.

Gorti was also part of a team that compared his cryptosystem to Gentry’s where they concluded Gorti’s scheme was as capable and more efficient than Gentry’s (Rao et al. 2013). However, their tests could arguably be unfair as they estimated the performance of Gentry’s system instead of using a practical implementation and did not provide the scheme of Gentry’s that they had benchmarked against.

Gentry’s pursuit with lattice-based cryptography might also be recognised as more useful than Gorti’s work because lattices are easier parallelise than calculations with exponentials and lattice-based problems have shown resistance to quantum computing (Gentry 2009). This suggests that Gentry’s work will have further practical applications, for example in scalable cloud computing and distributing computing projects such as Folding@home.

<div class="text-center">
<a class="btn btn-primary btn-large" href="http://homomorphic-encryption.vjpatel.me" target="_blank">Try out my demonstrations!</a>
</div>

### Conclusion

Data security has always played an important role when sharing information. How do we protect data from being read by only specific people? How do we store data so that it is incomprehensible by everyone apart from those with the correct privilege? How do we stop other people from modifying our data and destroying its integrity? These questions have been answered and implemented practically with today’s cryptographical protocols.

With the emergence of public cloud-computing, outsourced computing has become far more popular than it ever was before. However, for example, Amazon Web Services, the largest public-cloud computing provider, state in their customer agreement that they cannot be held responsible for the security of your content (Amazon Web Services 2016) and so many businesses rely on the physical security of Amazon’s infrastructure to protect their information.

From Russell Impagliazzo’s five worlds, the majority of secure systems are currently in Cryptomania (where public-key cryptography exists) but tending toward Minicrypt (where public-key cryptography doesn’t exist, but one-way functions still exist) because of their dependence on the large number factorisation problem which is common in most public-key cryptosystems. These will be rendered insecure by Shor’s algorithm once quantum computing becomes commercialised.

Lattice-based cryptosystems, which are also leading the post-quantum cryptography research, do exist, but unfortunately have little evidence to support their security and practical use at this time. It will certainly be interesting to see how the future generations of encryption work.

It is apparent that homomorphic encryption has a long way to go still, especially for efficiency. In the interest of power efficiency, mobile clients would not be able to expend as much resources to calculate encrypted values. The backend actually has the least amount of responsibility, which is good, but at the moment the client does much more and harder calculations which makes it more appropriate for the client to have just performed the calculation in this client-server use-case. It would, however, be more valuable if there are hundreds of calculations needed to be performed on the same cipher-texts.

Developing this application has provided a great learning opportunity for the newer technologies such as TypeScript, Golang, and micro-services with Docker whilst also improving existing skills with test-driven development, dependency injection and continuous integration.

### Bibliography

Amazon Web Services, 2016. AWS Customer Agreement. Available at: <https://aws.amazon.com/agreement/> [Accessed January 1, 2016].

Brakerski, Z., Gentry, C. & Vaikuntanathan, V., 2011. Fully Homomorphic Encryption without Bootstrapping. Security, 111(111), pp.309–325. Available at: <http://eprint.iacr.org/2011/277.pdf>.

Cao, Z., 2005. A Note on Shor’s Quantum Algorithm for Prime Factorization. Quantum, 0, pp.3–6.

Damgård, I., Jurik, M. & Buus, J., 2010. A Generalization of Paillier’s Public-Key System with Applications to Electronic Voting. International Journal of Information Security, pp.371–385. Available at: <https://people.csail.mit.edu/rivest/voting/papers/DamgardJurikNielsen-AGeneralizationOfPailliersPublicKeySystemWithApplicationsToElectronicVoting.pdf>.

Van Dijk, M. et al., 2010. Fully Homomorphic Encryption over the Integers. Advances in Cryptology– EUROCRYPT ’10, pp.24–43. Available at: <https://eprint.iacr.org/2009/616.pdf>.

Gentry, C., 2009. A Fully Homomorphic Encryption Scheme. PhD Thesis, (September), pp.1–209. Available at: <https://crypto.stanford.edu/craig/craig-thesis.pdf>.

Gentry, C., Peikert, C. & Vaikuntanathan, V., 2008. Trapdoors for Hard Lattices and New Cryptographic Constructions. Stoc, pp.197–206. Available at: <https://people.csail.mit.edu/vinodv/GentryPeikertV-STOC2008.pdf>.

Halevi, S., 2015. HELib. Igarss 2014, (1). Available at: <https://github.com/shaih/HElib>.

Heaton, R., 2014. How does HTTPS actually work? Available at: <http://robertheaton.com/2014/03/27/how-does-https-actually-work/>.

Martin, K.M., 2012. Everyday Cryptography: Fundamental Principles and Applications 1st ed., Oxford: Oxford University Press.

Paillier, P., 1999. Public-Key Cryptosystems Based on Composite Degree Residuosity Classes. Advances in Cryptology — EUROCRYPT ’99, 1592, pp.223–238. Available at: <http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.112.4035&rep=rep1&type=pdf>.

Parno, B., 2013. Efficiently Verifying Outsourced Cloud Computation: from Theory to Practice. Available at: <http://research.microsoft.com/apps/video/default.aspx?id=199523>.

Rao, G.V.S. et al., 2013. Data Security in Bioinformatics. International Journal of Advanced Research in Computer Science and Software Engineering, 3(11), pp.590–598. Available at: <http://www.ijarcsse.com/docs/papers/Volume_3/11_November2013/V3I9-0257.pdf>.

Rao, V. & Uma, G.G., 2013. An Efficient Secure Message Transmission in Mobile Ad Hoc Networks using Enhanced Homomorphic Encryption Scheme. Global Journal of Computer Science and Technology Network, Web & Security, 13(9). Available at: <http://computerresearch.org/index.php/computer/article/view/169>

Rivest, R.L., 1990. Handbook of Theoretical Computer Science (Vol. A). In J. van Leeuwen, ed. Cambridge, MA, USA: MIT Press, pp. 617–755. Available at: <http://dl.acm.org/citation.cfm?id=114872.114885>.

Rivest, R.L., Adleman, L. & Dertouzos, M.L., 1978. On Data Banks and Privacy Homomorphisms, Available at: <http://luca-giuzzi.unibs.it/corsi/Support/papers-cryptography/RAD78.pdf>.

Simmons, G.J., 2016. Vigenere Cipher. Available at: <http://www.britannica.com/topic/Vigenere-cipher>.
