---
date: "2016-10-13T23:26:19+01:00"
course: "MSc Computing and Security"
module: "7CCSMSEN Security Engineering"
title: "Homework 1"
---

Q2: Practice thinking like an attacker. Assume the following situation:

> Prof. V. Nasty gives the following final exam question (closed books, closed notes):

> Write the first 100 digits of pi: 3.________________________________________

Think of ways how you can cheat in this exam? How would you defend against such cheats?

A:

- The exam doesn't specify if calculators are permitted or not, thus we assume that we can use a calculator. To defend against this, specify only what the student is allowed to use (white-listing), rather than specifying what they cannot use (blacklisting).


Q3: Here is another puzzle where you can practice thinking like an attacker: Consider modern car keys. They wirelessly open and close the central locking system of the car. Whenever you lock the car, the car "responds" by flashing the indicator lights. Can you think of a security relevant purpose for that? (Hint: Imagine you are in the business of stealing cars. What attack would be easier to perform if the lights do not flash?)

A:

- Cars respond with the light flashes after locking to confirm that they have been locked. Consumers will usually look out for these lights at a distance to acknowledge that their car has been locked. Without these, if the car is out of range of the remote, consumers may just assume their car is locked at a distance when it is not. Thieves may also interfere/block with the signal at a close range and the consumer wouldn't know the difference, thus leaving the car unlocked for the thief.

Q4: And another one: A water company installed devices that transmit meter readings when their company car drives by. How can this transmited data be abused, if not properly encrypted? If you identified an abuse, then how would you encrypt the data so that such an abuse is prevented. Hint: Consider the fact that every person uses approximately 120l of water every day.

A:

- The water-usage data can be manipulated if it is not encrypted. For example, someone living in Flat 1, could change their water usage from 120L to 2L of water so that they pay less in their water bill. A solution to this could involve public-key cryptography where each meter is given a unique key pair, that is then whitelisted on the van that drives past.

 - Corrected: A burglar can read the data being transmitted and find houses that are empty (not using any water). He can then steal from these houses with this information.


Q5: Explain what hashes and salts are. Describe how they can be used for ensuring data integrity and storing password information.

A:

- Hashes are one way functions that turn data into a digest. The same data will always return the same digest when passed through the same hash function. It is useful for storing password information as during authentication we can compare a hashed attempt to the hashed password instead of the plain password. thus the plain password does not need to be persisted/stored. For data-integrity, it is much faster for comparing larger files as the one way function will create a smaller digest which can be compared, rather than comparing each bit of the actual data.

Q6: What is the difference between a brute force attack and a dictionary attack on passwords?

A:

- A brute force attack is a much more comprehensive, yet exhaustive attack as it tries every single possible combination. A dictionary attack uses a pre-defined set of values.


Q7: Even good passwords consisting of 8 characters, can be broken in around 50 days (obviously this time varies a lot and also gets shorter and shorter over time). Do you think it is good policy to require users to change their password every 3 months (as King's did until recently)? Under which circumstance should users be required to change their password?

A:

- The main problem here is that a password can be 'guessed' within ~50 days. I don't think the policy of requiring a user to change their password in *x time period* solves this problem as you're forcing the burden of remembering new complex passwords on the user. A better solution would be to introduce multi-factor authentication(MFA) so that, even if the old password is guessed, adversaries will still need the MFA device to authenticate. User's should change their password when the MFA device changes or if there is a failed MFA attempt with the correct password. I don't think this MFA solution is perfect as it does shift burden onto an MFA device which can be stolen etc. but removes burden from a user.

Q8: The biggest dictionary for dictionary attacks I know contains 15 Billion entries. If you try out all of these 15 Billion entries in order to hack one password how much percent of the full brute-force space did you cover. For this assume passwords use 62 characters and are typically 8 characters long

A:

- The full brute-force space is a permutation (with repetition), so 62^8 = ~2.18x10^14. Therefore 15x10^9/~2.18x10^14 = ~3.27x10^-4.

Q9: What are good uses of cookies (this is browser cookies)?

A:

- As HTTP is stateless, cookies are great for storing non-sensitive client session information. Any sensitive information in the cookie should be encrypted.

Q10: Why is making bank customers liable for financial fraud a bad design choice for credit card payments?

A:

- Customers will have less incentive to use credit cards.
- Customers wouldn't be able to afford costs they are liable for.
- Customers make more mistakes, banks have less incentive to improve their security engineering?

Q11: This question is for you to provide regular feedback to me, for example what were the most interesting, least interesting, or confusing parts in this lecture? Please feel free to share any other questions or concerns.

A:

- Sorry, I missed the first lecture as I had a flu. I don't think my answer for Q10 was what you were looking for either! I found the "think like an attacker" parts quite refreshing as it's not something I often do, and it encouraged me to think of counter-measures for attacks.
