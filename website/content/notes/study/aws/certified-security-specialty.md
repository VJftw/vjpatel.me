---
date: "2020-08-2T20:26:19+01:00"
course: "Amazon Web Services (AWS)"
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

- Given an AWS abuse notice, evaluate the suspected compromised instance or exposed access keys.
- Verify that incident response plan includes relevant AWS services.
- Evaluate the configuration of automated alerting and execute possible remediation of security-related incidents and emerging issues.

| Service             | Purpose | Advantages | Weaknesses |
| ------------------- | ------- | ---------- | ---------- |
| AWS Trusted Advisor |         |            |            |
| AWS CloudFormation  |         |            |            |
| AWS Service Catalog |         |            |            |
| VPC Flow Logs       |         |            |            |
| AWS Config          |         |            |            |
| Amazon API Gateway  |         |            |            |
| AWS CloudTrail      |         |            |            |
| Amazon CloudWatch   |         |            |            |

Be prepared to handle common incidents such as:

- Compromised user credentials
- Insufficient data integrity
- Overly permissive access

### Incident Indicators

- Logs and Monitoring
- Billing activity
- Threat intelligence
- AWS Support
- Public Response

### Responding to Incidents

#### Example: Instance Isolation

1. Remove from ELB and Autoscaling Group, this prevents the instance receiving any more web traffic
2. Create an Isolated Security Group that denies all traffic in and outbound and attach to instance
3. Take an EBS snapshot of the volume
4. Use Forensic instance (in a forensics subnet to investigate the compromised instance)

#### Example: Exposed IAM Access Keys

1. Invalidate credentials: Disable exposed credentials, delete when appropriate.
2. Revoke privileged access: Attach a "Deny IAM" policy to user, revoke outstanding sessions.
3. Determine the source of IAM access keys: Identify the user the access keys belong to, review the scope of policies associated with them.
4. Verify integrity and determine blast radius: Use CloudTrail and AWS Config to determine changes; consider if other IAM credentials could have been leaked.


##### AWS Config
Allows you to check whether your resources comply with your own security policies, industry best practices and compliance standards

AWS Managed Rules:
 - Are all attached Amazon EBS volumes encrypted?
 - Do all Amazon EC2 instances belong to a VPC?
 - Are all resources tagged as expected?
 - Do all security groups in use deny unregulated incoming SSH traffic?
 - Is AWS CloudTrail enabled in your AWS account?
 - Does the password policy for IAM users meet specified requirements?

## Logging and Monitoring

## Infrastructure Security

## Identity and Access Management

## Data Protection
