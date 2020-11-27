---
date: "2016-10-13T21:38:34+01:00"
title: "Invoke Tools"
dev_status: "abandoned"
trello_board_id: "cXzsT7lZ"
description: "A PyPi package for use with Docker containers and Python's Invoke task runner. Abandoned in favour of Make + Docker."
github_address: "https://github.com/VJftw/invoke-tools"
---

Dockerising large agile projects can become quite tedious when it comes to naming images and using task runners like Python's Invoke or Ruby's Rake.
This project aims to help alleviate this by standardising the built image name by tying it to the commit data.


For example, say we had a project called *Pizza Website* and we're using [nvie's git-flow strategy](http://nvie.com/posts/a-successful-git-branching-model/). When building Docker images in our continuous integration server, we can use the following tagging templates:

```
<docker repository user>/<project name>:<branch>-<commit>
<docker repository user>/<project name>:<branch>-<tag>
```
e.g.

```
vjftw/pizza-website:develop-5cb9cf5
vjftw/pizza-website:develop-1.5.3
```

This also has support for multi-service repositories where you might have different services in one big git repository. If this is the case, the tagging template can be modified to be:

```
<docker repository user>/<project name>:<service name>-<branch>-<commit>
<docker repository user>/<project name>:<service name>-<branch>-<tag>
```
e.g.

```
vjftw/pizza-website:api-develop-5cb9cf5
vjftw/pizza-website:client-develop-1.5.3
```

This is also great for Dockerising tests as it means they can be ran wherever Python and Docker are installed. The [VJftw/aws-jenkins-slave](https://github.com/VJftw/aws-jenkins-slave) repository contains a script which sets this all up and creates an AMI that can be used with the [Amazon EC2 Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Amazon+EC2+Plugin) for [Jenkins](https://jenkins.io/).

This has all mostly been extracted from my homomorphic encryption project but I'll get round to doing documentation at some point.

I now personally prefer Python's Invoke over Ruby's Rake as it has better(official) Docker support and it's easier to parameterise tasks.
