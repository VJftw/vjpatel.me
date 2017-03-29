+++
date = "2016-10-13T23:26:19+01:00"
title = "7CCSMSEN - Week 2"
markup = "mmark"
+++

Q1: Another question for thinking like an attacker: Imagine you have at home a broadband contract with TalkTalk. You do not like their service and want to switch to Virgin, say. The procedure between the Internet providers is that you contact Virgin and set up a new contract and they will automatically inform TalkTalk to terminate the old contract. TalkTalk will then send you a letter to confirm that you want to terminate. If they do not hear from you, they will proceed with terminating the contract and will request any outstanding cancellation fees. Virgin on the other hand sends you a new router and paperwork about the new contract. Obviously this way of doing things is meant to make switching as convenient as possible.
Still can you imagine situations in which this way of switching providers can cause you a lot of headaches? For this consider that TalkTalk needs approximately 14 days to reconnect you and might ask for reconnection fees.

A:
- In this scenario, the default confirmation response is "YES" for something that is actually a fairly big and costly change. If letters get lost in the mail or are undelivered, TalkTalk will still terminate your connection and bill for the cancellation fees. It is also quite easy to start a new contract with a broadband supplier online, (I think the only authentication they take is a checkbox for "I am the current home-owner").


Q2: Often problems in e-voting are due to difficulties with authentication. Keep this in mind for what could go wrong with the following discount offered by an insurance company: John Hancock Insurance is partnering with Vitality, which you might know as one of those work-related wellness programmes. The programme is available in 30 US states. If you sign up for this, John Hancock will send you a free Fitbit monitor. That’s a tiny, pill-shaped device that some people wear in sleek-looking bracelets to track how far they walk/run, the calories burned, and the quality of sleep. That means the insurance company would know exactly when a
customer does a sit-up, how far she runs – or when he or she has skipped the gym for a few days. For ‘good’ customers there will be a discount in their premiums. Why is this a problem?

A:
- The Fitbit monitors provided by John Hancock can easily be tricked to think that the customer is doing exercise. There's plenty of examples of this, e.g. fitbits attached to a bike or machine to simulate running, higher calorie burn etc. Customers that cheat like this will gain discount benefits. Another "cheat" with regards to authentication, would be to share a single fitbit with multiple people. As the fitbit can't tell it is being used by a different person, it will track the different people as one person tied to the customer's insurance account.


Q3: Voice voting is the method of casting a vote in the ‘open air’ for everyone present to hear. Which of the following security requirements do paper ballots satisfy better than voice voting? Check all that apply and give a brief explanation for your decision.

 - Integrity
 - Enfranchisement
 - Ballot secrecy
 - Voter authentication
 - Availability

A:
 - Paper ballots only satisfy ballot secrecy better than voice voting. In voice voting, everyone present at the voting event can see/hear how you've voted and therefore there is little-to-no ballot secrecy.
 - For integrity, paper ballots may be changed/faked whereas in voice voting it is clear that it is the voter who is voting.
 - For enfranchisement, paper ballots exclude those who are illiterate from voting whereas voice voting does not.
 - For voter authentication, it is arguable that they are the same as normally you authenticate before you vote via paper or voice.
 - For availability, it is arguable that paper ballots are worse because enough ballots will need to be printed. It is also arguable that voice voting could be worse as paper ballots enable postal voting and so a voter does not need to travel to a desginated event for voice voting.



Q4: Explain how an attacker can use chain voting in order to influence the outcome of a poll using paper ballots

A:
 - Adversary obtains at least one blank ballot and pre-fills in their choice.
 - Adversary gives regular voter a pre-filled ballot and asks them to place the pre-filled ballot in the box and return the blank ballot they are given for money/threats.
 - Adversary pre-fills in the returned blank ballot and pays the regular voter.



Q5: Which of the following mechanisms help with defending against chain voting? Check all that apply. Give a brief reason for each defence that mitigates chain voting attacks.

 - Using a glass ballot box to make it clear there are no ballots in the box before the start of the election.
 - Distributing ballots publicly before the election.
 - Checking that a voter's ID (drivers license, passport) matches the voter.
 - Each ballot has a unique ID. When a voter is given a ballot, the ID is recorded. When the voter submits his or her ballot, this ID is checked against the record.

A:

 - The last (Each ballot has a unique ID. When a voter is given a ballot, the ID is recorded. When the voter submits his or her ballot, this ID is checked against the record.), will certainly help as a voter will only be able to submit their own ballot and thus an adversary would not be able to confirm who they voted for or give the voter a pre-filled ballot. This could also be used in conjunction with distributing the ballots publicly before the election to save some time, but then an adversary may be able to convince people to vote by having them fill in their ballot before walking into the polling station.



Q6: In the Estonian general election, votes can be cast via Internet some time before the election day. These votes cast via Internet can be changed an unlimited amount of times, the last vote is tabulated. You can even change your vote on the polling day in person. Which security requirement does this procedure address?

A:
- Ballot secrecy. It is possible that a family member/friend will influence your vote online but you are still able to change your vote in person on the day.



Q7: Paper ballots boxes need to be guarded on the voting day, but can be unguarded the rest of the year. Why do pure electronic voting machines need to be guarded the whole year?

A:
 - Paper ballot boxes are non-mechanical and cannot be tampered with to give an unfair result. Electronic voting machines can be tampered with to give an unfair result.



Q8: What is the main difference between online banking and e-voting? (Hint: Why is the latter so hard to get secure?)

A:
 - For online banking, there is no requirement for anonymity. Your bank will need to know who you are in order to create transactions etc. whereas e-voting requires anonymity(ballot secrecy) as well as authentication which are difficult to offer hand-in-hand. I remember seeing Follow My Vote's Kickstarter (https://followmyvote.com/) who want to create a voting system based on block-chains. What are your thoughts on this? I don't quite understand block-chains at the moment and they don't seem to have addressed authentication or enfranchisement.



Q9: Imagine, hypothetically, you have a perfectly secure Internet voting system, by which I mean nobody can tamper with or steal votes between your browser and the central server responsible for vote tallying. What can still go wrong with such a perfectly secure voting system, which is prevented in traditional elections with paper-based ballots?

A:
- Whilst the voting system may be perfectly secure, it does not mean that problem of authentication & anonymity has been solved. Once authenticated, it is possible to track how a voter has voted, thus losing ballot secrecy. Without authentication we lose enfranchisement where only those allowed to vote, can vote.



Q10: This question is for you to provide regular feedback to me, for example what were the most interesting, least interesting, or confusing parts in this lecture? Please feel free to share any other questions or concerns.

A:
 - It was really interesting to learn about how voting is achieved in different parts of the world. I'm excited to see the practical buffer overflow attack and I learnt that salts can be stored plainly along with a password, whereas I assumed they were meant to be kept secret (somehow) before!
