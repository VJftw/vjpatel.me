+++
date = "2017-05-08T00:26:19+01:00"
title = "7CCSMCFC - Speciment Part Exam Questions"
markup = "mmark"
+++

## Specimen Part Exam Questions

### 1. Distinguish between digital forensics, cyber forensics and computer forensics.

Digital forensics is the process of getting any evidence from any electronic device that is acceptable in a court of law. Cyber forensics is the process of getting any evidence from a networked computer that is acceptable in a court of law. Computer forensics is the process of getting any evidence from an isolated computer that is acceptable in a court of law.

Digital forensics encompasses both Cyber and Computer forensics. Cyber and Computer forensics have some overlap.


### 2. State Locard's principle. Does digital forensics obey Locard's principle? Justify your answer.

Locard's principle is "Every contact leaves a trace". Digital forensics does not obey this as we are limited to what information a device keeps track of. Usually logs are kept in devices, but if a device is compromised then logs can be changed/deleted.

### 3. Describe and distinguish between the two main types of computer crime, giving two distinct examples of each.

The two main types of computer crime are:

* Computer Related Crime (CRC): A computer or its contents are the subject of an attack. (e.g. Hacking or Denial of Service attacks)
* Computer Assisted Crime (CAC): A computer is an accessory to the crime (e.g. Financial Fraud or Embezzlement)


### 4. How can cyber-crime be characterised statistically using a power law model?

The power law model characterises a multitude of processes which produce a large number of small events but a small number of large events.

Looking at the average financial loss per cybercrime, we can see that there are a lot of heists yielding a smaller loss, whereas the are few very costly heists. Cybercrime can be viewed as an asymmetric conflict, where the resources for effective defence are far greater than those for attack. This makes cybercrime opportunistic in nature, resembling terrorism rather than conventional (symmetric) warfare.


### 5. How has the cost of cyber-crime been evaluated? Critically evaluate each approach.

One approach has been to survey a range of companies over 10 months to determine their average cost. An issue with this is that many companies may miss out on the survey, thus not miss reporting further heists.

Another approach has been to look at the figures for other countries or globally and scale the costs using GDP. This does not give an accurate measure as other job sectors contribute to GDP.


### 6. Describe the two categories of cyber-crime revealed by a power law model.

The power law model reveals **opportunistic** attacks which cost below $2.5M on average. Examples of these attacks could be DoS attacks using "the Ion Orbital Cannon", taking advantage of known exploits etc.

It also reveals **organised** attacks which cost over $3M on average. Examples of these attacks could be larger DDoS attacks where many computers need to be compromised beforehand or an unknown zero-day exploit.

### 7. Describe the six steps of the digital forensic process model.

1. Acquisition: The search and seizure of devices.
2. Preservation: The provenance and chain of custody of devices.
3. Searching: The extraction and authentication of evidence from devices.
4. Analysis of evidence: What does the evidence signify?
5. Evaluation of evidence: How strong is the case?
6. Reporting: Create a report that technical experts can validate and legal people and juries can understand.


### 8. How does digital forensics differ in practice from conventional forensics.

In conventional forensics, Locard's principle applies "Every contact leaves a trace"; whereas in digital forensics, contacts are usually stored in log files which can be compromised to be either changed or deleted.

When isolating a crime scene, usually the road/surrounding areas are cordoned off for conventional forensics. This is to reduce the likelihood of the crime scene becoming tainted. In digital forensics, this could be analogous to the network. How much of the network should we isolate? We can't really isolate the network down to the ISP so the LAN/immediate network would be most appropriate depending on the crime scene e.g. If a device is connected to a local server.

When freezing a crime scene, a computer should be disconnected from the mains as shutting it down gracefully will impact the state of the hard disk and computer.


### 9. What is meant by triage in digital forensics and what are its advantages.

Triage means literally sifting and filtering. It is advantageous in digital forensics as an individual can have terrabytes of data for a forensic examiner to trawl through. The triage process allows forensic examiners to shorten their work-load by choosing sections of data that are most likely to hold evidence. i.e. a USB stick masquerading as a lipstick versus a HD in a shared computer.

### 10. Describe the four UK ACPO principles on handling digital evidence.

1. No action taken by law enforcement agencies or their agents should change data held on a computer or storage media which may subsequently be relied upon in court.
2. In circumstances where a person finds it necessary to access original data held on a computer or on storage media, that person must be competent to do so and be able to give evidence explaining the relevance and implications of their actions.
3. An audit trail or other record of all processes applied to computer-based electronic evidence should be created and preserved. An independent third party should be able to examine those processes and achieve the same result.
4. The person in charge of the investigation (the case officer) has overall responsibility for ensuring that the law and these principles are adhered to.

### 11. Describe the three main sections of the UK Computer Misuse Act 1990, as modified by the Police and Justice Act 2006?

The Police and Justice Act (2006) modified the Computer Misuse Act (1990) to be:

1. Unauthorised access to computer material is punishable by up to 2 years in prison, or a fine or both.
2. Unauthorised acts with intent to impair operation of computer, etc. is punishable by up to 10 years in prison, or a fine or both.
3. Making, supplying or obtaining articles intended for use in computer misuse offences is punishable by up to 2 years in prison, or a fine or both.

### 12. What is meant by Full Disk Encryption? How may a digital forensic examiner attempt to overcome FDE in a reasonably short amount of time?

Full Disk Encryption (FDE) is where a Hard Disk (HD) has been encrypted and can only be used once it has been decrypted. FDE requires that the decryption key is stored somewhere external to the HD, otherwise no-one would be able to decrypt it. When the system is running and already decrypted, forensic examiners could use live forensic techniques to extract the key from the main memory. Otherwise, the key may be stored in a Trusted Platform Module (TPM), USB dongle, hidden partition etc. Another technique could be to use a cold boot attack where the DRAM chips retain their volatile data for some time allowing a forensic search to be made.

### 13. Arriving at a house to seize a domestic PC and related storage media, you find the PC running but unattended. Describe and justify how you will proceed.

Every action should be documented so that is repeatable by another party.

1. Enter the premises with a warrant.
2. Look for signs of FDE use:
 * if none; directly disconnect from mains as gracefully shutting down will modify the state of disk further and may remove evidence.
 * if found; perform live forensics to obtain keys from memory then directly disconnect.
3. Discover further storage media and using forensic triaging prioritise:
 * USB dongles masquerading as everyday objects.
 * USB dongles that are plugged into the computer/at the front of drawers.

### 14. Arriving at a house to seize a domestic PC and related storage media, you find the PC running but attended. Describe and justify how you will proceed.

1. The main aim is to get the suspect away from the computer without alerting him:
 * Use of a kissogram
 * Fire alarm
2. Once the suspect is away from the computer, enter the premises with a warrant and detain them.
3. Look for signs of FDE use:
 * if none; directly disconnect from mains as gracefully shutting down will modify the state of disk further and may remove evidence.
 * if found; perform live forensics to obtain keys from memory then directly disconnect.
4. Discover further storage media and using forensic triaging prioritise:
 * USB dongles masquerading as everyday objects.
 * USB dongles that are plugged into the computer/at the front of drawers.


### 15. You arrive at a large commercial organisation to investigate a suspected leak of highly confidential information. Describe and justify how you will proceed.

From Owen Brady's guest lecture, we saw that we should not alert anyone of the investigation incase they are involved and consequently take counter-forensic steps to elude prosecution.

I would follow the trail of recorded hands that the confidential information could have passed through and look for connections between those people and those the information was leaked to or leaked via. If we find a connection, we can label that person a suspect and forensically examine their devices for evidence.

In a case where all computers need to be examined, we cannot disrupt the organisation's operation and so images of computers will need to be taken as quickly as possible.


### 16. What kinds of data and meta-data would you search for in a case of suspected possession of child pornography?

Hard Disks, USB sticks, External Hard Disks for:
 * images/video of child pornography
 * torrents for distribution
 * Recycle bin
 * Recent files

If child pornography is found:
 * access time (when it was last viewed)
 * created time (when it was downloaded/copied)
 * modified time (when it was last modified)

### 17. What kinds of data and meta-data would you search for in a case of suspected blackmail and/or extortion by e-mail?

Hard Disks, Swap/Page file for:
 * cached files containing parts of the blackmail.
 * email programs.

Check the email sent timestamp and trace it back to the sending email server. The sending email server can then say from which IP the email came from.

### 18. What is meant by digital-(or counter-)forensics? Give 3 examples of digital anti-forensics techniques.

* Destroy: useful forensic evidence (log files, nullify HDs).
* Divert: with misleading evidence (spoof IP addresses).
* Decieve: by hiding useful forensic evidence (steganography).
* Deny: access to useful forensic evidence (cryptography).

### 19. What is meant by the '5WH'? What digital devices can help create a geolocational timeline for a file? What precautions must be taken with time-stamped meta-data?

* Who?
* What?
* Where?
* When?
* Why?
* How?

GPS, CCTV/Pictures of the device containing the file can help create a timeline. We can also check the system logs for when a USB dongle containing the file has been plugged in and disconnected.

Unfortunately time-stamped meta-data has some time-drift on different file systems (up to 1 hour on NTFS and 24 hours on FAT). There can also be errors due to time-zones, daylight saving and BIOS clock skew/drift.

### 20. What digital devices can help create a geolocational timeline for an individual in order to either implicate them or exonerate them of a crime?

* GPS
* Mobile signal triangulation
* CCTV

We could also use ID access keys, but the defendant might say that someone had stolen their key.


### 21. Describe two ways in which the relative plausibility of two competing hypotheses explaining the existence of recovered digital evidence can be quantitatively assessed.

The two competing hypotheses are the **Trojan Horse Defence** (THD) and the **Inadvertent Download Defence** (IDD).

For THD, we can prove its plausibility beyond reasonable doubt by using Complexity Models (Operational Complexity or Enhanced Complexity) that measure how easy it is to perform a set of actions on a computer unknowningly/accidentally. It enables prosecution to assess the maximum plausibility of the defence's alternative explanation.

For IDD, we can prove its plausibility by showing how common the criminal media occurs among other media. Overill et al. provided a table showing with 95% confidence if criminal media were downloaded inadvertently among other media.


### 22. What is meant by Forensic Readiness? What steps should a commercial CISO take to bring their organisation into forensic readiness?

Forensic readiness is defined as the ability of an organisation to maximise its potential to use digital evidence whilst minimising the costs of an investigation.

1. Define the business scenarios that require digital evidence.
2. Identify available sources and different types of potential evidence.
3. Determine the evidence collection requirement.
4. Establish a capability for securely gathering legally admissible evidence to meet the requirement.
5. Establish a policy for secure storage and handling of potential evidence.
6. Ensure monitoring is targeted to detect and deter major incidents.
7. Specify circumstances when escalation to a full formal investigation (which may use the digital evidence) should be launched.
8. Train staff in incident awareness, so that all those involved understand their role in the digital evidence process and the legal sensitivities of evidence.
9. Document an evidence-based case describing the incident and its impact.
10. Ensure legal review to facilitate action in response to the incident.
