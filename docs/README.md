---
description: Explores potential use cases using UML models
---

# DAO and Crews

The goal is to explore how eDAO in its current form can be integrated with Bitcoin AIX Crews and Resource Contracts.

### Authorisation

Only where its useful for discussion the following convention can be used for marking authorisation levels for public Clarity methods.

Note: class diagrams often denote access rights to methods. Adapting this concept for Clarity using UML conventions leads to;

* **u:** user level access
* **r:** resource level access (eg nft owner can call transfer)
* **c:** contract owner / deployer access
* **a:** approved principal access (allow listed)
* **d:** dao access e.g. (is-dao-or-extension)
* **o:** other - some other constraint imposed in logic

These are meant as a guide as they are checks implemented in business logic as opposed to structurally within Clarity but are used here just as a way to discuss authorisation concepts at the model level.\
