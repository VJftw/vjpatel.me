+++
date = "2017-04-15T00:26:19+01:00"
title = "7CCSMCFC Computer Forensics and Cybercrime notes"
markup = "mmark"
+++

## Lecture 2 - Classification of Digital Crime - Digitally Assisted Crime & Digitally Related Crime

### Definitions
  - **Crime**: An action which constitutes an offence and is punishable by law.
  - **Digital crime**: Crime committed using any digital device. e.g. GPS, game controllers, the national infrastructure systems.
  - **Computer crime**: A crime committed with isolated computers.
  - **Cyber-crime**: A crime committed across a network. e.g. DoS, hacking.
  - **Forensics**: The process of getting evidence that will be acceptable in a **court of law**. (mention **court of law**).
  - **Digital forensics**: Forensics related to digital devices. e.g. GPS, game controllers, the national infrastructure systems.
  - **Computer forensics**: Forensics related to isolated computers.
  - **Cyber-forensics**: Forensics related to networked computers.
  - **eDiscovery**: Looking into systems to find out how well they are running or secure. Normally part of a civil law, which doesn't require evidence of the same strictness or standard as criminal evidence.

![alt text](https://docs.google.com/drawings/d/13i6etEMA5e-lRw_A1UxKmKtqz0eUO0JnxD_NKSCZJdM/pub?w=685&h=426 "Digital vs Computer vs Cyber")


Conventional crimes which may involve the use of a digital system in their commission (e.g., forgery, fraud, blackmail, extortion, embezzlement, theft, etc.) are known as ***Digitally Assisted crimes***.
Crimes in which altering the contents or operation of a digital system or network is the criminals' target (e.g. hacking, malware, denial of service, etc.) are known as ***Digitally Related crimes***.

### Article
#### Trends in Computer Crime
Computer crime is divided into (covered by the Computer Misuse Act 1990):
 - Computer Related Crime (CRC): A computer or its contents is the subject of the criminal attack (e.g. Hacking or Denial of Service attacks).
 - Computer Assisted Crime (CAC): A computer is an accessory to the crime (e.g. Financial Fraud or Embezzlement).

**Software Bombs** consist of a trigger and a payload (often a destructive payload for blackmail/sabotage). The trigger can be:
 - Time Bomb: date/time trigger.
 - Logic Bomb: logical condition trigger.

**Trojan Horses** need to be explicitly ran by a user for it to run their hidden side-effects.

**Worms** are replicators that do not necessarily damage information, but instead use up computer resources until the computer ceases to function, thus can be used for extortion, black-mail and sabotage.

**Viruses** are parasitic replicators that need to attach themselves to other executables.

---

## Lecture 3 - Cost of Cybercrime

Most (~85%?) goes unreported, due to fears of over loss of brand reputation, business confidence, market share, etc. Estimates vary from £2.2bn to £27bn pa in UK, and from £33bn to £643bn pa worldwide, depending on definitions and methodologies.

Study the UK Cabinet Office report (2011), particularly pp.2-3; the WEIS paper (2012), particularly Table 1; and the UK Home Office review (2013), particularly the Summary on p.14, and the Ponemon Institute report (2015), particularly Figure 1 & p.4, which suggests £5bn pa for the UK.

Malware attacks on businesses occur every 1–3 minutes – see the FireEye report (2012).

### UK Cabinet Office Report 2011
pp.2-3:

This report estimates the cost of cyber-crime in the UK economy to be £27bn with Intellectual Property theft at the top with £9b.

This shows that the impact of cyber-crime does not fall equally across all sectors, therefore businesses need to look again at their defences. They believe that the cost of cyber-crime will rise even further as UK businesses increase their reliance on ICT.

### WEIS 2012
Table 1

They scaled the global estimates to the UK using the UK's share of GDP for a lot of the types of cyber-crime.

### UK Home Office Review 2013
p.14

>Estimating the costs of cyber crime is challenging and there are limitations with previous research that has attempted to produce estimates. As outlined by the Home Affairs Select Committee report on e-crime (Home Affairs Select Committee, 2013), the precision of Detica’s (2011) £27 billion estimate has been questioned due to the lack of robust and transparent data upon which their estimates were based. Progress in this complex area has been made with work conducted by Anderson et al. (2012) who estimated separate costs for different cyber crimes, opting not to produce one total estimate given the paucity and reliability of the data available. However, there are also limitations with Anderson et al.’s approach, which relies partly on scaled down global estimates and case-studies, based on the UK being five per cent of the world gross domestic product (GDP). The UK cyber security strategy (Cabinet Office, 2011) recognised the challenges in this area and noted “a truly robust estimate will probably never be established, but it is clear the costs are high and rising”. Based on the limited research available at present, for example, drawing upon Anderson et al. (2012), the costs of cyber crime could reasonably be assessed to equate to at least several billion pounds per year.

To improve cyber-crime evidence base
 - recording mechanisms that accurately distinguish between online and offline crime.
 - more reporting of cyber-crime from public and businesses and better awareness that some cyber incidences are actually crimes.
 - consistency between the measurement and definitions of cyber crime within the relevant research.
 - transparency and comparability of information from industry sources.
 - methodologically sound surveys of victims.
 - cyber crime can be large scale that could result in a relationship between victims and offenders that is different to offline crime.
 - cyber crime is not constrained by national boundaries.

### Ponemon Institute Report 2015
Figure 1 & p.4

Figure 1 shows the total average costs of cyber-crime in 7 countries. The US total average is $15m, Russia at $2m and the UK at $6m.

 - 39 UK-based organisations were surveyed. The mean average cyber-crime cost  was £4.1m per year.
 - Positive relationship between organisation size and annual cyber-crime  cost.
 - All industries are victims of cyber-crime but to different degrees.
 - DoS attacks, malicious insiders and web-based attacks were the most  popular and costly.
 - If not resolved quickly, cyber-attacks become more costly.
 - Business disruption is the highest external cost, followed by revenue loss.
 - Recovery and detection are the most costly internal activities.
 - Deployment of security intelligence systems make a difference.

---

## Lecture 4 - Characterisation of Cybercrime

Two modes: in the USA, opportunistic attacks costing below US$2.5M each on average; organised attacks costing over US$3M each on average (“serious transnational organised cybercrime syndicates”)

Study the paper “Single and Double Power Laws for Cyber-Crimes”, particularly the first equation & Figures 1 & 3.

Study the paper “Cyber-psychopathy: what goes on in a hacker’s head” by Steve Gold, particularly the sections on hackers Kevin Mitnick & Gary McKinnon. Other examples include Paul Bedworth, Edward Austin Singh and Lauri Love.

‘White hat’ hackers will report any vulnerability they discover to the system owner or supplier; ‘Black hats’ will exploit or sell a vulnerability; ‘Grey hats’ are often supposedly reformed Black hats, reinvented as penetration testers or security consultants.

---

## Lecture 5 - Prosecution of Cybercrime UK & EU Laws

For Digitally Related crimes: the Computer Misuse Act (1990), as extended by the Police & Justice Act (2006), is used, most particularly Sections 1 - 3.

The recent Investigatory Powers Act (2016) was introduced to aid UK anti-terrorism investigations; it significantly extends the provisions of the previous Regulation of Investigatory Powers Act (RIPA) (2000), which permitted the acquisition of communications data and decryption keys on production of a warrant authorised by the Home Secretary.


Mutual Legal Assistance Treaties (MLATs) can be used to acquire evidence located outside the UK, but are very slow to operate in practice.


In the Council of Europe’s Convention on Cybercrime (2001) see particularly Article 6 (dual use tools).

Note that for Digitally Assisted crimes (e.g., forgery, fraud, blackmail, extortion, embezzlement, theft, etc.), the appropriate conventional laws are normally invoked.

---

## Lecture 6 - Characteristics of Legal Evidence

To be accepted in a UK court of law, all evidence must satisfy five tests:

 - Admissibility (is first-hand, original, not hearsay)
 - Authenticity (is genuine, what it claims, or is claimed, to be)
 - Accuracy (precise and clear, not vague)
 - Completeness (self-contained, not partial)
 - Probative value (relevance to the case in hand) > Prejudicial value (resulting degree of harm)

---

## Lecture 7 - The 4 ACPO Principles of Digital Evidence

 - No action taken by law enforcement agencies or their agents should change data held on a computer or storage media which may subsequently be relied upon in court.
 - In circumstances where a person finds it necessary to access original data held on a computer or on storage media, that person must be competent to do so and be able to give evidence explaining the relevance and the implications of their actions.
 - An audit trail or other record of all processes applied to computer-based electronic evidence should be created and preserved. An independent third party should be able to examine those processes and achieve the same result.
 - The person in charge of the investigation (the case officer) has overall responsibility for ensuring that the law and these principles are adhered to.

Study the “ACPO Good Practice Guide for Computer-based Electronic Evidence” (2012), particularly Sections 2, 4.3, 4.4, 4.5, 4.6, 5.7 & 6.5.1

---

## Lecture 8 - Differences Between Conventional and Digital Forensics

Locard’s Exchange Principle (Edmond Locard, ca.1910): “Every contact leaves a trace” – because it results in an exchange of physical material.  But, is this true in cyberspace? Is it possible to commit the “Perfect (cyber) crime”?

Isolate the crime scene: For internet-connected devices or mobile phones, is the whole network (including ISPs / CSPs) the crime scene?

Freeze the crime scene: If a device is found attended and/or connected and/or powered-on, how do we avoid losing potential digital forensic evidence?

---

## Lecture 9 - The Forensic Process

 - Acquisition: Search & Seize Devices – warrants; reasonable suspicion; ‘bag & tag’.
 - Preservation: Provenance & Chain of Custody of Devices – e.g. ACPO 4 principles, making ‘bit-for-bit’ images of all media with write-blockers, and use of MD5 or SHA2 hashes.
 - c.    Searching: Extraction & Authentication of Evidence from Devices.
 - d.    Analysis of Evidence – what does the evidence signify?
 - e.    Evaluation of Evidence – how strong is the case?
 - f.     Reporting, in forms and styles that (i) technical experts can validate; (ii) legal personnel and juries can understand.

---

## Lecture 10 - Digital Forensic Triage: in-the-field vs. in-the-lab

There are a number of reasons why it may be desirable or necessary to prioritise and pre-screen digital devices for the presence of evidence before doing a full extraction, in particular the number of devices seized, the circumstances of the seizure, and the accessibility of the data (e.g. strongly encrypted or in the Cloud).

Study the paper “Triage Template Pipelines in Digital Forensic Investigations”, particularly Figs.1, 2 & 3 and the scenarios in section 4.

---

## Lecture 11 - Post mortem versus in-vivo ("live") forensics

There are a number of reasons why it may be desirable or necessary to capture forensically sound evidence from a running (“live”) system, typically 24/7 availability systems for industrial control (ICS), and critical infrastructure supervisory control and data acquisition (SCADA), or around the clock financial trading systems.


Essentially, one has to take more than one ‘snap-shot’ of the contents of the main memory or its buffer(s), in order to determine what data is being altered over time.

Study the IEEE Spectrum paper “Live Analysis”, particularly the section on Research Questions.
