# Meeseeks Box

The Idea is to create a example project in which microservices are created and destroyed on demand. Keeping with the
Meeseeks theme, each microservice will only be able to perform one task and can additional microservices when that
task is starting to take too long.

## Installation

The Project is divided into two components, the box itself (which will spawn Meeseeks to perform tasks). And the Meeseeks
themselves, which are Spawned to complete a given task. Each component will be written as a Javascript application, but
any language could potentially be used.

Both components are expected to be run on a Kubernetes cluster, with the configuration found in the _deploy_ directory,
but you can also start the components locally by going into either directory under _/src_ and running `npm install` and
then `npm start`. 
