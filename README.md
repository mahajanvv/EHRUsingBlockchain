# Project Title
Electronic Health Records managing using hyperledger fabric composer

## Operating System Used: Ubuntu 18.04

# Prerequisites:
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

# Installing development Environment:
There are a few useful CLI tools for Composer developers. The most important one is composer-cli, which contains all the essential operations, so we'll install that first. Next, we'll also pick up generator-hyperledger-composer, composer-rest-server and Yeoman plus the generator-hyperledger-composer. Those last 3 are not core parts of the development environment, but they'll be useful if you're following the tutorials or developing applications that interact with your Business Network, so we'll get them installed now.

Note that you **should not** use **su** or **sudo** for the following npm commands.
Essential CLI tools:
```
npm install -g composer-cli@0.19
```
Utility for running a REST Server on your machine to expose your business networks as RESTful APIs:
```
npm install -g composer-rest-server@0.19
```
Useful utility for generating application assets:
```
npm install -g generator-hyperledger-composer@0.19
```
Yeoman is a tool for generating applications, which utilises generator-hyperledger-composer:
```
npm install -g yo
```

### Cheers! all development environment setup is done.

## Now, clone or download this repository and with some few commands you can work with this application

# Next, Steps:

## Step 1:(Downloading docker images, Creating PeerAdmin card and Creating a blockchain network)
The first time you start up a new runtime, you'll need to run the start script, then generate a PeerAdmin card:
```
cd ~/EHRUsingBlockchain
export FABRIC_VERSION=hlfv12
./downloadFabric.sh
./startFabric.sh
./createPeerAdminCard.sh
```
You can start and stop your runtime using ~/EHRUsingBlockchain/stopFabric.sh, and start it again with ~/EHRUsingBlockchain/startFabric.sh.

At the end of your development session, you run ~/EHRUsingBlockchain/stopFabric.sh and then ~/EHRUsingBlockchain/teardownFabric.sh. Note that if you've run the teardown script, the next time you start the runtime, you'll need to create a new PeerAdmin card just like you did on first time startup.

## Step 2:(Deploying the business network)

### Now get into healthcare directory

```
cd healthcare
```

1. To install the business network, from the healthcare directory, run the following command:
```
composer network install --card PeerAdmin@hlfv1 --archiveFile healthcare@0.0.1.bna
```
2. To start the business network, run the following command:
```
composer network start --networkName healthcare --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
```
3. To import the network administrator identity as a usable business network card, run the following command:
```
composer card import --file networkadmin.card
```
4. To check that the business network has been deployed successfully, run the following command to ping the network:
```
composer network ping --card admin@tutorial-network
```

## Step 3:(Generating a REST server)
Hyperledger Composer can generate a bespoke REST API based on a business network. For developing a web application, the REST API provides a useful layer of language-neutral abstraction.

1. To create the REST API, navigate to the tutorial-network directory and run the following command:
```
composer-rest-server
```
2. Enter **admin@healthcare** as the card name.

3. Select **never use namespaces** when asked whether to use namespaces in the generated API.

4. Select **No** when asked whether to secure the generated API.

5. Select **Yes** when asked whether to enable event publication.

6. Select **No** when asked whether to enable TLS security.

## Congratulations network is started and you can work with it.
Use any browser u like and goto url:
http://localhost:3000/explorer/

## Step 4:(Angular Application is in development phase very soon it will be available to you)