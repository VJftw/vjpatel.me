+++
date = "2016-10-26T23:26:19+01:00"
title = "7CCSMSEN - Week 6"
+++

Q1: Explain briefly the purpose of the certification authority in the public key encryption scheme.

A: The certification authority acts as a 'trusted' third party to be say that a given public key/certificate belongs to an entity/individual. Entities will go through some form of ID verification when obtaining a certificate.


Q2: Explain briefly what is meant by a certification authority becoming "too big to fail" when it has issued a large number of certificates.

A: When a certification authority issues a lot of certificates it becomes 'too big to fail' as if they issue a malicious certificate, browsers should blacklist the certificate authority. Browsers don't do this as it will break other sites that use that CA and they will lose market share from users as other sites will be broken.

An example of this happening was a few years ago with Symantec where they issued thousands of malicious certificates after being hacked.


Q3: In which situations does it make sense to install invalid (self-signed) certificates.

A: An organisation may want to monitor/check its employees traffic and so would require them to install a certificate. It can also be used in development environments to test capabilities.
