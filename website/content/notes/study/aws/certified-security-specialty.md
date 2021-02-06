---
date: "2020-08-2T20:26:19+01:00"
course: "Amazon Web Services ()"
module: "Certified Security - Specialty"
title: "Certified Security - Specialty"
latex: true
---

## Summary

5 Domains:

1. Incident Response (12%)
2. Logging and Monitoring (20%)
3. Infrastructure Security (26%)
4. Identity and Access Management (20%)
5. Data Protection (22%)

## Incident Response (12%)

For the exam, you should know how to:

- Given an  abuse notice, evaluate the suspected compromised instance or exposed access keys.
- Verify that incident response plan includes relevant  services.
- Evaluate the configuration of automated alerting and execute possible remediation of security-related incidents and emerging issues.

These services help streamline Incident Response processes.

| Service            | Purpose                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| Trusted Advisor    | Checks usage of services for optimizations and improvements to security |
| CloudFormation     | Infrastructure as code                                                  |
| Service Catalog    | Catalog/Marketplace for IT services on AWS                              |
| VPC Flow Logs      | IP traffic logging to and from network interfaces in a VPC              |
| Config             | Monitor and record configuration changes to AWS resources               |
| Amazon API Gateway | Detects suspicious activity to API services served                      |
| CloudTrail         | Audit log of all events on AWS account history                          |
| Amazon CloudWatch  | Monitors, Alarms, Events                                                |


Be prepared to handle common incidents such as:

- Compromised user credentials
- Insufficient data integrity
- Overly permissive access

### Incident Indicators (Indicators of Compromise)

How we know an incident is happening:
- Logs and Monitoring
  - Abnormal error rates/events
- Billing activity
- Threat intelligence
  - Automated/Manual, e.g. from message boards
-  Support
- Public Response
  - Consumers reporting abnormalities

### Responding to Incidents

TODO: implement automation for these examples.
1. A script/binary which prepares a given instance ID for forensic investigation.
2. A script/binary to invalidate a given access key id and find the events associated with it in CloudTrail.

#### Example: Compromised Instance Isolation

1. Remove from ELB and Autoscaling Group, this prevents the instance receiving any more web traffic.
2. Create an Isolated Security Group that denies all traffic in and outbound and attach to instance.
3. Take an EBS snapshot of the volume.
4. Use Forensic instance (in a **forensics subnet** to investigate the compromised instance).

#### Example: Exposed IAM Access Keys

1. Invalidate credentials: Disable exposed credentials, delete when appropriate.
2. Revoke privileged access: Attach a "Deny IAM" policy to user, revoke outstanding sessions.
3. Determine the source of IAM access keys: Identify the user the access keys belong to, review the scope of policies associated with them.
4. Verify integrity and determine blast radius: Use CloudTrail and  Config to determine changes; consider if other IAM credentials could have been leaked.


#####  Config
Allows you to check whether your resources comply with your own security policies, industry best practices and compliance standards

 Managed Rules:
  - Are all attached Amazon EBS volumes encrypted?
  - Do all Amazon EC2 instances belong to a VPC?
  - Are all resources tagged as expected?
  - Do all security groups in use deny unregulated incoming SSH traffic?
  - Is  CloudTrail enabled in your  account?
  - Does the password policy for IAM users meet specified requirements?

Custom Rules:
  - Use  Lambda functions
  - Maintained by the customer

###### Example: An ACL configuration change is recorded - Bucket set to Public

1. An ACL configuration change on an **Amazon S3 bucket** is recorded.
2. ** Config** picks up this change and sends it to an SNS topic to inform humans, notify other systems.
3. ** Config** triggers an ** Lambda** function.
4. ** Lambda** function sets the bucket ACL back to _private_.


#####  GuardDuty
Threat Detection service that:
* Collects data from CloudTrail, DNS logs, VPC flow logs.
* Continuously monitors for malicious or unauthorized behavior to help you protect your  accounts and workloads.
* Delivers a detailed security alert to the GuardDuty console and  CloudWatch in the event of a potential threat.


TODO: Familiarity with AWS WAF.

## Logging and Monitoring (20%)

For the exam, you should know how to:

* Design and implement security monitoring and alerting.
* Troubleshoot security monitoring and alerting.
* Design and implement a logging solution.
* Troubleshoot logging solutions.


### Amazon CloudWatch
Provide real-time monitoring of your AWS resources and the applications you run on AWS.

* Monitors AWS built-in and custom metrics
* Collects and process log files from services and applications
* Detects events and responds with notifications or automated responses

### AWS Config
Managed service that provides resource inventory, configuration history and change notifications.

* Continuous captures details on all configuration changes associated with your resources
* Enables compliance monitoring and security analysis
* Can identify and mitigate configuration changes that would compromise security


### AWS Inspector
AWS Inspector scans based on supported baselines including:

* Common vulnerabilities and exposures
* CIS benchmarks
* Security best practices
* Runtime behavioral analysis

### The Shared Responsibility Model

**Customers** are responsible for their security **IN** the AWS Cloud.

| Customer Data |
| Platform, Applications, Identity & Access Management |
| Operating System, Network & Firewall Configuration |
| Client-Side Data Encryption | Server-Side Data Encryption | Network Traffic Protection |

**AWS** is responsible for security **OF** the AWS Cloud.

| Compute | Storage | Database | Networking |
| AZs, Regions, Edge Locations |


## Infrastructure Security

## Identity and Access Management

## Data Protection
