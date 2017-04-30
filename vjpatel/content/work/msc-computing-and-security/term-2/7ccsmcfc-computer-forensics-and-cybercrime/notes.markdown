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

Two modes:
 - in the USA, opportunistic attacks costing below US$2.5M each on average
 - organised attacks costing over US$3M each on average (“serious transnational organised cybercrime syndicates”)

#### Study the paper “Single and Double Power Laws for Cyber-Crimes”, particularly the first equation & Figures 1 & 3.

**Power Laws** characterise a multitude of processes which produce a large number of small events but a small number of large events.

Cyber-crime can viewed as an asymmetric conflict, where resources required for defence are much greater than for an attack. It is opportunistic in nature so it resembles terrorism and guerrilla warfare rather than conventional (symmetric) warfare.

$$p(x) = Cx^{-a}$$

- Applying $p(x)$ is the probability of an event magnitude $x$ occurring.
- $C$ is the normalisation constant.
- $a$ is the exponent of the power law.

![alt text](https://drive.google.com/uc?export=view&id=0B8i5iuobK6DgM2JPVG1lMkZsZkE "Figure 1")

Figure 1 (above) shows a single power law applied to the cyber-crime cumulative distribution function (CDF). Note how towards the largest few points, they do not fit the single power law regime as well as the rest of the data, but the don't seem to be scattered randomly either. Figure 3 (below) shows the application of a double power law regime which fits the full set of data better.

![alt text](https://drive.google.com/uc?export=view&id=0B8i5iuobK6DgQzhZdXg4LV9rUjg "Figure 3")



Study the paper “Cyber-psychopathy: what goes on in a hacker’s head” by Steve Gold, particularly the sections on hackers Kevin Mitnick & Gary McKinnon. Other examples include Paul Bedworth, Edward Austin Singh and Lauri Love.

White hats are vigilantes that help law enforcement, companies etc. to solve flaws for the common good.

Hacking has changed since the 1970s. Back then, hacking was seen more as joy-riding by authorities and Robin-Hood like. Modern-day hacking is viewed as real and inexcusable as many crimes are against the public in general now (viruses etc.). This view of Hacking has been shifted by successive governments over the years and demonstrates their "psychological steerage" that they have over the media, and therefore the public. This gives further rise to an "us vs. them" mentality as *Hacktivists* attempt to expose covert activities by the government.

‘White hat’ hackers will report any vulnerability they discover to the system owner or supplier; ‘Black hats’ will exploit or sell a vulnerability; ‘Grey hats’ are often supposedly reformed Black hats, reinvented as penetration testers or security consultants.

---

## Lecture 5 - Prosecution of Cybercrime UK & EU Laws

#### Computer Misuse Act (1990)

For Digitally Related crimes: the Computer Misuse Act (1990), as extended by the Police & Justice Act (2006), is used, most particularly Sections 1 - 3.

Sections 1-3 introduced 3 criminal offences:

 1. **unauthorised access** to computer material, punishable by 12 months' imprisonment and/or an unlimited fine.
 2. unauthorised access with intent to commit or facilitate commission of **further offence(s)**, punishable by 12 months imprisonment and/or an unlimited fine on summary conviction and/or 5 years imprisonment and/or an unlimited fine on indictment;
 3. **unauthorised modification** of computer material, punishable by 12 months imprisonment and/or an unlimited fine on summary conviction and/or 10 years imprisonment and/or an unlimited fine on indictment;

 §§2–3 offences are intended to deter the more serious criminals from using a computer to assist in the  commission of a criminal offence or from impairing or hindering access to data stored in a computer. The basic  offence is to attempt or achieve access to a computer or the data it stores, by inducing a computer to perform any function with intent to secure access. Hackers who program their computers to search through password permutations are therefore liable, even though all their attempts to log on are rejected by the target computer. The only precondition to liability is that the hacker should be aware that the access attempted is unauthorised  (mens rea or “guilty mind”). Thus, using another person's username or identifier (ID) and password without proper authority to access data or a program, or to alter, delete, copy or move a program or data, or simply to  output a program or data to a screen or printer, or to impersonate that other person (“masquerading”) constitutes the offence. Even if the initial access is authorised, subsequent exploration, if there is a hierarchy of privileges in the system, may lead to entry to parts of the system for which the requisite privileges are lacking and the offence will be committed. But looking over a user's shoulder (“shoulder surfing”) or using sophisticated electronic  equipment to monitor the electromagnetic radiation emitted by devices ("electronic eavesdropping") is outside the scope of this offence.

The §§2–3 offences are aggravated offences, requiring a specific intent to commit another offence (for these purposes, the other offences include all the major common law and statutory offences of fraud and dishonesty.. So a hacker who obtains access to a system intending to transfer money or shares, intends to commit theft, or to obtain confidential information for blackmail or extortion. Thus, the §1 offence is committed as soon as the unauthorised access is attempted, and the §2 offence overtakes liability as soon as specific access is made for the criminal purpose. The §3 offence is specifically aimed at those who write and circulate computer viruses or worms.. Similarly, using phishing techniques or a Trojan horse to obtain identity data or to acquire any other data from an unauthorised source, or modifying the operating system files or some aspect of the computer's functions to interfere with its operation or prevent access to any data, including the destruction of files, or deliberately generating code to cause a complete system malfunction, are all criminal "modifications".

#### Investigatory Powers Act (2016)

The recent Investigatory Powers Act (2016) was introduced to aid UK anti-terrorism investigations; it significantly extends the provisions of the previous Regulation of Investigatory Powers Act (RIPA) (2000), which permitted the acquisition of communications data and decryption keys on production of a warrant authorised by the Home Secretary.

Mutual Legal Assistance Treaties (MLATs) can be used to acquire evidence located outside the UK, but are very slow to operate in practice.

#### Council of Europe (CoE) Convention on Cyber-crime (2001)

In the Council of Europe’s Convention on Cybercrime (2001) see particularly Article 6 (dual use tools).

###### Article 6 (Misuse of devices)
1. Each Party shall adopt such legislative and other measures as may be necessary to establish as criminal offences under its domestic law, when committed intentionally and without right:
    * a) the production, sale, procurement for use, import, distribution or otherwise making available of:
        * i) a device, including a computer program, designed or adapted primarily for the purpose of committing any of the offences established in accordance with the above Articles 2 through 5;
        * ii) a computer password, access code, or similar data by which the whole or any part of a computer system is capable of being accessed, with intent that it be used for the purpose of committing any of the offences established in Articles 2 through 5; and
    * b) the possession of an item referred to in paragraphs a.i or ii above, with intent that it be used for the purpose of committing any of the offences established in Articles 2 through 5. A Party may require by law that a number of such items be possessed before criminal liability attaches.
2. This article shall not be interpreted as imposing criminal liability where the production, sale, procurement for use, import, distribution or otherwise making available or possession referred to in paragraph 1 of this article is not for the purpose of committing an offence established in accordance with Articles 2 through 5 of this Convention, such as for the authorised testing or protection of a computer system.
3. Each Party may reserve the right not to apply paragraph 1 of this article, provided that the reservation does not concern the sale, distribution or otherwise making available of the items referred to in paragraph 1 a.ii of this article.

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

 1. No action taken by law enforcement agencies or their agents should change data held on a computer or storage media which may subsequently be relied upon in court.
 2. In circumstances where a person finds it necessary to access original data held on a computer or on storage media, that person must be competent to do so and be able to give evidence explaining the relevance and the implications of their actions.
 3. An audit trail or other record of all processes applied to computer-based electronic evidence should be created and preserved. An independent third party should be able to examine those processes and achieve the same result.
 4. The person in charge of the investigation (the case officer) has overall responsibility for ensuring that the law and these principles are adhered to.

### ACPO Good Practice Guide for Computer-based Electronic Evidence (2012)

Study the “ACPO Good Practice Guide for Computer-based Electronic Evidence” (2012), particularly Sections 2, 4.3, 4.4, 4.5, 4.6, 5.7 & 6.5.1

#### Section 2 - The Principles of Digital Evidence

##### 2.1 Principles

* 2.1.1 - Principle 1: No action taken by law enforcement agencies, persons employed within those agencies or their agents should change data which may subsequently be relied upon in court.
* 2.1.2 - Principle 2: In circumstances where a person finds it necessary to access original data, that person must be competent to do so and be able to give evidence explaining the relevance and implications of their actions.
* 2.1.3 - Principle 3: An audit trail or other record of all processes applied to digital evidence should be created and preserved. An independent third party should be able to examine those processes and achieve the same result.
* 2.1.3 - Principle 4: The person in charge of the investigation has overall responsibility for ensuring that the law and these principles are adhered to.

##### 2.2 Explanation of the Principles

* 2.2.1 - All digital evidence is subject to the same rules and laws that apply to documentary evidence.
* 2.2.2 - The doctrine of documentary evidence may be explained thus: the onus is on the prosecution to show the court that the evidence produced is no more and no less now than when it was first taken into the possession of law enforcement.
* 2.2.3 - Operating systems and other programs frequently alter, add and delete the contents of electronic storage. This may happen automatically without the user necessarily being aware that the data has been changed.
* 2.2.4 - In order to comply with the principles of digital evidence, wherever practicable, proportionate and relevant an image should be made of the device. This will ensure that the original data is preserved, enabling an independent third party to re-examine it and achieve the same result, as required by principle 3.
* 2.2.5 - This may be a physical/logical block image of the entire device,or a logical file image containing partial or selective data (which may be captured as a result of a triage process). Investigators should use their professional judgement to endeavour to capture all relevant evidence if this approach is adopted.
* 2.2.6 - In cases dealing with data which is not stored locally but is stored at a remote, possibly inaccessible location it may not be possible to obtain an image. It may become necessary for the original data to be directly accessed to recover the data. With this is in mind, it is essential that a person who is competent to retrieve the data and then able to give evidence to a court of law makes any such access. Due consideration must also be given to applicable legislation if data is retrieved which resides in another jurisdiction.
* 2.2.7 - It is essential to display objectivity in a court of law, as well as the continuity and integrity of evidence. It is also necessary to demonstrate how evidence has been recovered, showing each process through which the evidence was obtained. Evidence should be preserved to such an extent that a third party is able to repeat the same process and arrive at the same result presented to a court.
* 2.2.8 - It should be noted that the application of the principles does not preclude a proportionate approach to the examination of digital evidence. Those making decisions about the conduct of a digital investigation must often make judgements about the focus and scope of an investigation, taking into account available intelligence and investigative resources. This will often include a risk assessment based on technical and non-technical factors, for example the potential evidence which may be held by a particular type of device or the previous offending history of the suspect. Where this is done it should be transparent, decisions should be justifiable and the rationale recorded.
* 2.2.9 - Application of the four principles will also be informed by:
    * The Forensic Science Regulator's forthcoming Codes of Practice and Conduct;
    * The guidance around digital forensic process improvements developed by the National Policing Improvement Agency's Forensic 21 programme and those engaged in the collection, examination or reporting of digital evidence should also refer to that guidance.


#### Section 4 - Capture

##### Section 4.3 - Proportionality Issues Relating to Seizure

* 4.3.1 - Proportionality issues relating to seizure are:
    * Before seizing an item, consider whether the item is likely to hold evidence. For example, is this a family computer or a computer belonging to a suspect?
    * Ensure that details of where the item was found are recorded, which could assist in prioritising items for examination at a later stage;
    * Consider when the offence was committed; when seizing CCTV, give consideration to narrowing down what is seized, by camera and/or time period. Check whether another system may be better placed to record the evidence;
    * Differentiate between mobile phones found on a suspect (likely to be in current use) and phones found in a drawer (may not be in current use), as different levels of examination may be possible for these;
    * Also consider that evidence may be stored online, or on an internet service provider's systems and end-user devices may only be needed to obtain the details necessary to request this evidence from the service provider. If so, it is best to seize items in current usage, i.e. computers connected to the internet.
* 4.3.2 - Digital devices and media should not be seized just because they are there. The person in charge of the search must have reasonable grounds to remove property and there must be justifiable reasons for doing so. The search provisions of PACE Legislation Codes of Practice equally apply to digital devices and media in England, Wales and Northern Ireland. In Scotland, offices should ensure they are acting within the terms of the search warrant.
* 4.3.3 - Due regard should also be given to the application of the European Convention of Human Rights.

##### Section 4.4 - Before Attending a Scene to Capture Digital Evidence

* 4.4.1 - Persons responsible for the seizure of digital devices, or for on-scene capture of data, should ensure:
    * They have the necessary equipment. (Refer to the First Responder's Guide for a detailed breakdown);
    * They have considered potential sources of evidence and know what is likely to be relevant, where possible.
* 4.4.2 - Where an investigation is likely to involve the examination of user-created digital images, consideration should be given to the question of seizing of cameras and other devices capable of taking digital photographs. For example, in cases where a suspect is believed to have taken indecent photographs of children, seizure of devices capable of taking digital photos could be useful not only for the data they store, but also to link these devices to previously identified indecent photographs by the examination of digital metadata (EXIF data).
* 4.4.3 - Where necessary, specialist advice from a force's Digital Forensic Unit should be sought in advance. If given sufficient information about the investigation, DFUs will be able to advise on which items are most likely to provide the evidence sought.

##### Section 4.5 - When Attending a Scene

* 4.5.1 - To comply with principle 3, records must be kept of all actions taken in relation digital evidence, which could include photographs/diagrams of equipment locations, details of any information provided by persons present, and records of any actions taken at the scene.
* 4.5.2 - Refer to the First Responder's Guide for detailed guidance on seizure for individual items. However, persons attending a scene should be especially aware that **systems which are powered on (running) need to be handled with care**, as there is the potential to make unwanted changes to evidence if these are not dealt with correctly. Such systems should only be accessed by appropriately trained personnel. In addition, volatile data of evidential value may be lost.

##### Section 4.6 - Capturing Online Evidence

* 4.6.1 - In some investigations the capture of digital evidence may be from an online rather than a physical location. Detailed guidance on securing this evidence can be found in 'Crimes involving websites, forums and blogs' and 'Network forensics and volatile data'.
* 4.6.2 - Online evidence can roughly be split into that which is publicly available (e.g. forum postings, where the forum does not require a login to view) and that which is private (e.g. Facebook account information). There may be scope to obtain both (e.g. by capturing the text of a forum posting and then requesting the account details of the user who made the posting from the forum owner). Investigators should be aware of the potential issues when capturing publicly available data, including the 'footprints' which are left when accessing a site, these can alert a website owner to law enforcement interest.
* 4.6.3 - Records should be kept of all actions taken when capturing online evidence in order to comply with principle 3.

#### Section 5 - Analyse

* 5.7 - If initial examination results in a large amount of data to be reviewed, consideration must be given to who is best placed to review that data. Often this will be the investigator, due to their greater knowledge of the case. Dependent on the source, this data may include:
    * Internet history records;
    * E-mails;
    * Instant Messaging logs;
    * Media files (images and videos);
    * Text documents;
    * Spreadsheets;
    * CCTV;
    * Text messages.

#### Section 6 - Present

##### Section 6.5 - Statements or Reports

* 6.5.1 - The statement or report is the ultimate product of the examination. It should outline the examination process and the significant data recovered. Whilst an initial report may be relatively brief, the practitioner should be in a position to produce a full technical report should one later be required.

---

## Lecture 8 - Differences Between Conventional and Digital Forensics

### Locard’s Exchange Principle (Edmond Locard, ca.1910)
> “Every contact leaves a trace”

– because it results in an exchange of physical material.

But, **is this true in cyberspace? Is it possible to commit the “Perfect (cyber) crime”?**

*No, we are limited to what logs a machine has kept of actions made. Logs could also be deleted or faked.*

### Isolate the crime scene
For internet-connected devices or mobile phones, **is the whole network (including ISPs / CSPs) the crime scene?**

*No, just the immediate network, but we may need to request further information from ISPs etc.*

### Freeze the crime scene

**If a device is found attended and/or connected and/or powered-on, how do we avoid losing potential digital forensic evidence?**

*We unplug it directly from the mains. Operating systems perform many actions that will impact the hard disk upon graceful shutdown*.

---

## Lecture 9 - The Forensic Process

* a. Acquisition: Search & Seize Devices – warrants; reasonable suspicion; ‘bag & tag’.
* b. Preservation: Provenance & Chain of Custody of Devices – e.g. ACPO 4 principles, making ‘bit-for-bit’ images of all media with write-blockers, and use of MD5 or SHA2 hashes.
* c. Searching: Extraction & Authentication of Evidence from Devices.
* d. Analysis of Evidence – what does the evidence signify?
* e. Evaluation of Evidence – how strong is the case?
* f. Reporting, in forms and styles that (i) technical experts can validate; (ii) legal personnel and juries can understand.

USB devices can be masqueraded as everyday objects (lipstick) and may cause them to be overlooked during *search and seizure*.

---

## Lecture 10 - Digital Forensic Triage: in-the-field vs. in-the-lab

**triage** means literally, sifting or screening.

There are a number of reasons why it may be desirable or necessary to prioritise and pre-screen digital devices for the presence of evidence before doing a full extraction, in particular the number of devices seized, the circumstances of the seizure, and the accessibility of the data (e.g. strongly encrypted or in the Cloud).

Study the paper “Triage Template Pipelines in Digital Forensic Investigations”, particularly Figs.1, 2 & 3 and the scenarios in section 4.

![alt text](https://drive.google.com/uc?export=view&id=0B8i5iuobK6DgQk5ia1llOXgzVW8 "Figure 1")


![alt text](https://drive.google.com/uc?export=view&id=0B8i5iuobK6DgOUlud3hrcHktWGM "Figure 2")
The diagonal dashed line in Figure 2 (and 3) represents evidence tasks that could be done in parallel. The upper green lines from the $E_i$ denote that the evidence is found. Failing to find a piece of evidence is represented by the red line. i.e. Finding $E_1$, $E_2$ but not finding $E_3$ would result in following the red line to *Exit*.

![alt text](https://drive.google.com/uc?export=view&id=0B8i5iuobK6DgZGowT2JNVjE1Y0U "Figure 3")


HDs are primary devices whilst USB keys are not. This is because HDs normally contain the operating system and possess a greater storage capacity. If no trace of evidence is retrieved from a HD, then the search is moved to the USB keys. If the USB key search fails, it is returned to the HD. This interchange is represented by the purple/blue half headed double arrows, indicating whether or not a particular evidential trace has already been found on another device. In Figure 3, $E_4$ is shaded grey, indicating that a potential outcome my result in unrelated but criminally significant material. e.g. An original copy of child pornography.

The following scenarios demonstrate some different applications of the above triage templates:

#### Scenario 1 - DDoS

| Hypothesis                                | The seized computer has been used to launch DDoS attacks on an organisation's website.
|-------------------------------------------|-----------------------------------------------------------
| Assumptions                               | The computer is believed to have been used for launching sophisticated DDoS attacks on against an organisation's website has been seized, together with USB keys, a laptop, and mobile phones.
| Role of digital evidence                  | specific
| Person I/C device                         | suspect - quit IT assessment $\rightarrow$ savvy individual $S$
| Types of devices seized                   | 5 USB keys (1 connected), 2 mobile phones, 1 PC with an internal HD and 2 external HDs, 1 laptop.
| Overall order of examination of devices   | HDs (internal then external, then laptop), USB keys, mobile phones, other (ISP).
| Prioritised search for evidential traces  | (DDoS template - Figure 2)
| $E_1$                                     | DDoS tools are present
| $E_2$                                     | BotNet C&C program is present
| $E_3$                                     | Connections to victim's machine(s) are found (IP address, URL, log file records, etc.)
| $E_4$                                     | Connections to a BotNet C&C program are found (IP address, log file records, etc.)
| $E_1$` (USB)                              | DDoS tools are present
| $E_2$` (USB)                              | BotNet C&C program is present
| $E_5$                                     | ISP confirms seized computer accessed victim's machine (IP address, etc.)
| $E_6$                                     | Extortion messages to the victim are found
| $E_7$                                     | Bragging messages are found (mobile phones)
| $E_6$` (ISP)                              | Extortion messages to the victim are found
| $E_7$` (ISP)                              | Bragging messages are found


#### Scenario 2 - P2P

| Hypothesis                                | The seized computer is suspected of being used in the illegal dissemination of films and/or albums protected by copyright via Torrent based peer-to-peer (P2P) network.
|-------------------------------------------|-----------------------------------------------------------
| Assumptions                               | The computer believed to have been used for uploading the material has been seized together with USB keys and copies of the originals (DVDs/CDs). A mobile phone which may contain messages announcing the upload had also been seized.
| Role of digital evidence                  | specific
| Person I/C device                         | suspect - quit IT assessment $\rightarrow$ unsavvy individual $S$
| Types of devices seized                   | 9 DVDs/CDs, 3 USB keys (1 connected), 1 mobile phone, 1 PC with internal HD.
| Overall order of examination of devices   | DVD/CD, HD, USB keys, mobile phone.
| Prioritised search for evidential traces  | (P2P template - Figure 3)
| $E_1$                                     | Check for presence of original copyrighted material (HD)
| $E_2$                                     | Web browser software is present
| $E_3$                                     | Torrent client software is present
| $E_4$                                     | HD copy of original material found (time stamps; hash values, etc.)
| $E_3$` (USB)                              | Torrent client software is present
| $E_4$` (USB)                              | USB copy of original material found (time stamps; hash values, etc.)
| $E_5$` (USB)                              | Torrent file and line found on USB key (creation records, etc.)
| $E_6$` (USB)                              | Torrent file activation record found (tracker server login, MAC time, etc.)
| $E_5$                                     | Torrent file and link found on HD (creation records, etc.)
| $E_6$`                                    | Torrent file activation record found (tracker server login, MAC time, etc.)
| $E_7$`                                    | Internet records found (cookies, cache, history, tracker server connection, etc.)
| $E_8$`                                    | Search for messages relating to investigation (e.g. upload announcement)
| $E_9$`                                    | Search for messages relating to investigation (e.g. upload announcement) (Mobile phone)


---

## Lecture 11 - Post mortem versus in-vivo ("live") forensics

There are a number of reasons why it may be desirable or necessary to capture forensically sound evidence from a running (“live”) system, typically 24/7 availability systems for industrial control (ICS), and critical infrastructure supervisory control and data acquisition (SCADA), or around the clock financial trading systems.


Essentially, one has to take more than one ‘snap-shot’ of the contents of the main memory or its buffer(s), in order to determine what data is being altered over time.

Study the IEEE Spectrum paper “Live Analysis”, particularly the section on Research Questions.

### Static Analysis
Static analysis (quiescent) involves halting the target system and making a forensically valid copy, or image, of all attached storage media for analysis. Static analysis tools then search the copied media for evidence.

- Effective at recovering data from storage media.

One disadvantage of unplugging a system is that many OS' cache disk writes and sync them at a later time, meaning that any cached writes (potential evidence) would be lost.


### Live Analysis
Live analysis (nonquiescent) gathers data from a system during operation. It addresses many shortcomings of static analysis.

### Research Questions

#### Legal Issues

Actions on a nonquiescent system may likely not be reproducible. This means that in a legal environment, we lose the ability to show reproducible steps that we had with quiescent evidence.

#### Inconsistency
The inconsistency  inherent in live analysis leads to several research problems. The research goal is to determine the inconsistency's effects on the state derived from the collected raw data.

If the raw data is inconsistent, does that affect the conclusions an investigator is able to draw? Is the inconsistency worse than that produce by static analysis?

#### Repeatability

The essence of science is independent reproducibility. Unless a monitored system can be replayed, live analysis will likely produce unreproducible results. We only need to reproduce parts of the system relevant to the forensic results, but how do we determine which parts those are?

#### Configuration

Live analysis will be ineffective if there are new threats and attacks that aren't captured by an existing pre-configuration. How would we detect attacks and automate reconfiguration?

#### Detection

The culprit might have programmed his system to return misleading impressions of the system state if it detects that analysis is taking place. This is especially easy in VMs as the culprit could detect when the VM has been paused. How can we capture live-data without being detected?

#### Memory Imaging

In live forensics, the contents of memory would change during an imaging process. Is it possible for live analysis to reliably detect discrepancies and to what extent would an image of memory differ from the contents seen by the cpu. Can a process snapshot memory in a manner that reduces inconsistency?

#### Best Practices
Finally, as the practice of live analysis matures, we in this area must develop best practices and standards, as well as methodologies, to certify the forensic evidence live analysis gathers. It’s critical that these practices, standards, and methodologies be based on solid, reproducible experiments—in other words, science, rather than ad-hoc techniques that appear to work but can’t be explained or validated. Forensic evidence is the basis for decisions that can impact not only machines and money but also people’s lives. For that reason alone, accuracy, reproducibility, and precision are mandatory.

---

## Lecture 12 - Full Disk Encryption (FDE)

At first sight it might seem that if a disk has been secured using FDE (e.g. TrueCrypt) with a strong encryption key (e.g. 2048 bits) then a digital forensic examination is impossible. However, this is not the case.

In order for the FDE system to operate, the decryption key must be stored (somewhere) in main memory or in a separate device, since if it were stored on the disk it would itself be encrypted and hence unusable. Therefore the use of live forensics techniques on the main memory may be able to retrieve the FDE decryption key and hence allow decryption of the disk’s contents for a forensic examination. When the FDE system is not in operation the key may be stored in a TPM (trusted platform module), a hidden partition, a dongle, etc.

In an alternative approach, the cold boot attack, it has been found that if DRAM chips are cooled to –50C immediately after powering off, the RAM retains its ‘volatile’ data for 10 minutes or so, enabling a forensic search to be made.

Study the FDE forensics paper , particularly sections 4 & 5.

---

## Lecture 13 - Digital Anti-forensics (a.k.a Counter-forensics)

FDE can also be viewed as just one particular aspect of the more generic activity of digital anti-forensics, in which the cyber-criminal may:

1. destroy potentially useful digital forensic evidence of their activities (e.g. wiping log-files);
2. divert by planting misleading digital forensic evidence (e.g. spoofing the source IP address of a cyber-attack);
3. deceive by hiding potentially useful digital forensic evidence (e.g. using steganography or onion-routing);
4. deny access to potentially useful digital forensic evidence (e.g. using cryptography).

---

## Lecture 14 - Searching in more Detail

Tools like EnCase (Guidance Software), FTK (AccessData), X-Ways Forensics , etc. enable the digital forensic examiner to find many types of data or meta-data on a device that may constitute evidence which either implicates or exonerates an individual in a criminal investigation.

The data being sought may include:

* Image files  containing e.g. child pornography
* Deleted files
* Temporary files
* Spool files
* Swap files
* Log files (web browser cache & history, Operating System, firewall, anti-virus, Intrusion Detection System, etc.)
* Automatic back-ups (Microsoft’s Windows 7 Shadow Copy or Apple’s OS X Time Machine, etc.)
* Partial files in ‘slack space’

The metadata being sought may include:

* File create, last modify and last access times (beware of errors due to time zones, daylight saving, BIOS clock skew/drift, and inaccuracy of atime – up to 1 hr for NTFS file systems, up to 24 hrs for FAT file systems)
* Windows Registry entries showing e.g. Volume Serial Numbers (VSNs) and device IDs of all USB devices attached with dates and times.

File carving is the process of reassembling file contents from fragments in the absence of file system metadata. A typical carving scenario involves reassembling as much as possible of the contents of one or more files from fragments found distributed in slack space, based on their contents. It is a computationally NP-hard process, similar to reassembling one or more possibly incomplete jigsaw puzzles from their randomly scattered and mixed-up pieces.

See “The Evolution of file carving” by Pal & Memon.

---

## Lecture 15 - Analysis in more Detail

Attempts to make sense of the evidence. E.g. constructing geolocational timelines for devices and people (CCTV, mobiles, satnavs, swipe-cards, ATM cards, USB keys, games consoles, digital cameras, CSP/ISP logs, etc.)

Attempts to answer the ‘5WH’ questions: who did what when, where, why and how?

Intruder behavioural profiling aims to identify ‘who’ by studying online M.O. (modus operandi) from e.g. what files/directories/databases are searched? what keywords/key phrases are searched for? how frequently is email monitored? how frequently is snooping monitored? how long is a typical online session? how many computers/networks are scanned? what system/network scanning tools are used? what backdoors/Trojans/scripts are exploited?

See the Case Study: FSA Insider Dealing prosecution (Owen Brady – guest lecture).

---

## Lecture 16 - Evaluation in more Detail

In an adversarial legal system (e.g. UK), USA, HK)  the defence side will either try to discredit the prosecution side’s evidence by using the 5 legal criteria, or they may agree the evidence but argue instead that there is another perfectly innocent alternative explanation for that evidence. Since a criminal prosecution requires the prosecution side to prove their case “beyond a reasonable doubt”, the defence side only has to find a plausible alternative explanation for the evidence in order to win the case. The Trojan Horse Defence (THD) and the Inadvertent Download Defence (IDD) are two of the most common alternative defences used. In such situations it is important to be able to evaluate how plausible the defence side’s alternative explanation is, relative to the prosecution side’s contention. This is usually expressed in terms of an Odds Ratio.

There are a number of ways of approaching these problems including:

* Bayesian networks (introduced by Judea Pearl in 1988, pioneered for digital forensics by K-P Chow et al. in 2008; in particular, see Figure 5 and Table 5)
* Complexity theory (based on Ockham’s razor, Einstein’s principle of simplicity, and Hoyle’s principle of contingency)
* Probability theory (based on random browsing / downloading)

Case Study: HK Possession of Child Pornography (CP) prosecutions. Both the THD and the IDD have been used successfully to avoid convictions for possession of CP in HK and UK. To combat either defence it is necessary for the prosecution side to demonstrate that they are implausible beyond a reasonable doubt.

Study the paper “Quantitative Plausibility of the Trojan Horse Defence against Possession of Child Pornography” (in particular, the Methodology sections and the Table) on combating the THD using complexity theory. Study also “An approach to quantifying the plausibility of the inadvertent download defence"” on combating the IDD using probability theory (in particular, sections 2 & 4).

---

## Lecture 17 - Forensic Readiness

The digital forensic process is greatly aided if organisations proactively prepare themselves for the possibility of an on-site forensic investigation, so that all the required evidence has been securely saved. This is described in Rob Rowlingson’s paper “A Ten-Step Process for Forensic Readiness” (see particularly pp.9–24; p.9 gives the overview).

Further details of many aspects covered in this course are in Peter Sommer’s “A Guide to Forensic Readiness” (4/e).

<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true
    },
    "HTML-CSS": { availableFonts: ["TeX"] }
  });
</script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML'></script>
