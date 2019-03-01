# Project Title
Electronic Health Records managing using hyperledger fabric composer

##Operating System Used: Ubuntu 18.04

#Prerequisites:
To run Hyperledger Composer and Hyperledger Fabric, we recommend you have at least 4Gb of memory.

The following are prerequisites for installing the required development tools:

* Operating Systems: Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit), or Mac OS 10.12
* Docker Engine: Version 17.03 or higher
* Docker-Compose: Version 1.8 or higher
* Node: 8.9 or higher (note version 9 is not supported)
* npm: v5.x
* git: 2.9.x or higher
* Python: 2.7.x
* A code editor of your choice, we recommend VSCode.

**If installing Hyperledger Composer using Linux, be aware of the following advice:

* Login as a normal user, rather than root.
* Do not su to root.
* When installing prerequisites, use curl, then unzip using sudo.
* Run prereqs-ubuntu.sh as a normal user. It may prompt for root password as some of it's actions are required to be run as root.
* Do not use npm with sudo or su to root to use it.
* Avoid installing node globally as root.**

### If you're running on Ubuntu, you can download the prerequisites using the following commands:
```
curl -O https://hyperledger.github.io/composer/v0.19/prereqs-ubuntu.sh

chmod u+x prereqs-ubuntu.sh
```

### Next run the script - as this briefly uses sudo during its execution, you will be prompted for your password.
```
./prereqs-ubuntu.sh
```