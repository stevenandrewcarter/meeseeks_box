# Meeseeks Box

Building a FaaS solution for fun and learning. This project uses a containerd compatible engine to provide a Function as
a Service (FaaS) solution. The FaaS uses two components, a UI Frontend that allows the user to interact with the backend
service.

## Ideas

* Use Kubernetes instead of the Raw containerd interfaces 
  * Benefit is that the FaaS can be either a dedicate namespace, or embedded in current namespaces
  * Benefit is also that the configuration can be stored in the Cluster instead of being stored in a db (PoC)
  * Scaling the Functions is much simplier
  * Problem is that function isolation is much more complex to deal with
  * Kubernetes cluster is a bigger requirement
  * Mixed support, so either just a single containerd node or Kubernetes support
