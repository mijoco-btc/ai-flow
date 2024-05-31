---
description: Relationship between eDAO resource contracts and resources
---

# Scenario 2: eDAO and Resource Contracts

Goal here is to include company concepts; resources, invoices etc within the eDAO structure.

1. resources are managed by resource manager
2. resource manager is managed by eDAO

### Class Diagram

```mermaid
classDiagram
    class DAO {
      - dao-id: buff 32
      - name: buff 50
      - owner: principal
      - rules: buff 200
      + create-dao(dao-id: buff 32, name: buff 50, rules: buff 200): Response
      \# get-dao(dao-id: buff 32): Response
      ~ internal-method(): void
      - private-method(): void
    }

    class Company {
      - company-id: buff 32
      - dao-id: buff 32
      - owner: principal
      + register-company(company-id: buff 32, dao-id: buff 32): Response
      + get-company(company-id: buff 32): Response
      + create-and-register-company(company-id: buff 32, dao-id: buff 32, name: buff 50, rules: buff 200): Response
    }
```

````markdown
```mermaid
classDiagram
    class DAO {
      - dao-id: buff 32
      - name: buff 50
      - owner: principal
      - rules: buff 200
      + create-dao(dao-id: buff 32, name: buff 50, rules: buff 200): Response
      \# get-dao(dao-id: buff 32): Response
      ~ internal-method(): void
      - private-method(): void
    }

    class Company {
      - company-id: buff 32
      - dao-id: buff 32
      - owner: principal
      + register-company(company-id: buff 32, dao-id: buff 32): Response
      + get-company(company-id: buff 32): Response
      + create-and-register-company(company-id: buff 32, dao-id: buff 32, name: buff 50, rules: buff 200): Response
    }
```
````

\


<figure><img src="../../../.gitbook/assets/eDAO-resource-contracts_class.drawio (3).png" alt=""><figcaption></figcaption></figure>

### Flow Diagrams
