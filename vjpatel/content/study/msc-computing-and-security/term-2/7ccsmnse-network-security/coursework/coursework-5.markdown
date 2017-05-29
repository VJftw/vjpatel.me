+++
date = "2017-04-15T00:26:19+01:00"
title = "7CCSMNSE Network Security - Coursework 5"
markup = "mmark"
+++

## Coursework 5

### 1. Describe the two authentication modes that HTTP supports.

HTTP supports the following two authentication modes:

 * Basic authentication:
     * login/password based.
     * Information is sent unencrypted.
     * credentials sent on every request.
     * Supported by nearly all server/clients and thus widely used.
 * Digest authentication:
     * Server sends nonce.
     * Client hashes nonce based on login/password.
     * Client sends only cryptographic hash over the net.
     * Seldom used.


### 2. Describe the same-origin policy and how it can be used to protect against untrusted JavaScript code.

The same-origin policy is a basic policy for untrusted JavaScript code that requires access is only granted to documents downloaded from the same sitte as the script.

* It prevents a hostile script from tampering with other pages in a browser.
* It prevents a script from snooping on input in other windows.
* It verifies URLs of the target document and script that access the resource.
* Its checks are very restrictive, everything must match.

### 3. Describe how cross-site scripting attacks work in detail.

The core of a traditional XSS attacks lies a vulnerable script on a vulnerable site. The script will read input and echo it back to unsuspecting users without first sanitizing it.

An example could be forum software where there are many users that post threads for other users to view. If the forum software did not check the content that users uploaded, they would be able to upload malicious JavaScript that would likely be viewed by unsuspecting users. This JavaScript could write code that accesses the attacker's site, invoking a cookie reception script to steal the victim's cookies.

### 4. Describe how cross-site request forgery attacks work in detail.

The cross-site request forgery attack describes an attack where the server cannot trust the users (requests). If a user that has visited a malicious website and had their cookies stolen, the malicious server may send requests to the good server authenticated with the victim's cookie.

### 5. What are the differences between cross-site scripting and cross-site request forgery.

The cross-site request forgery attack describes one where the server doesn't trust the user. The cross-site scripting attack is where a client doesn't trust the server.

### 6. Describe the main characteristics of SQL injection and give 2 ways in which they can be prevented.

1. Browser sends malicious input to server.
2. Bad input validation and sanitisation on server leads to malicious SQL query.

Two ways in which they can be prevented are:
 * Using generated sql queries with parameters.
 * Validating and sanitising input.
