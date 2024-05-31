---
description: Relationship between eDAO resource contracts and resources
---

# Scenario 2: eDAO and Resource Contracts

```mermaid
sequenceDiagram
    Alice->John: Hello John, how are you?
    loop Every minute
    John-->Alice: Great!
    end
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        Bob->>Alice: Thanks for asking
    end
```

Goal here is to include company concepts; resources, invoices etc within the eDAO structure.

1. resources are managed by resource manager
2. resource manager is managed by eDAO

````mermaid
```mermaid
sequenceDiagram
    Alice->John: Hello John, how are you?
    loop Every minute
    John-->Alice: Great!
    end
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        Bob->>Alice: Thanks for asking
    end
```
````

### Class Diagram

```mermaid
sequenceDiagram
    participant User
    participant DAO
    participant Company
    
    User->>DAO: create-dao(dao-id, name, rules)
    DAO-->>User: success
    User->>Company: register-company(company-id, dao-id)
    Company-->>User: success

```

```mermaid
classDiagram
    class Shape{
        <<interface>>
        noOfVertices
        draw()
    }
    class DAO {
      -dao-id: buff 32
      -name: buff 50
      -owner: principal
      -rules: buff 200
      +create-dao(dao-id: buff 32, name: buff 50, rules: buff 200): Response
      #get-dao(dao-id: buff 32): Response
      ~internal-method(): void
      -private-method(): void
    }
    class Company {
      -company-id: buff 32
      -dao-id: buff 32
      -owner: principal
      +register-company(company-id: buff 32, dao-id: buff 32): Response
      +get-company(company-id: buff 32): Response
      +create-and-register-company(company-id: buff 32, dao-id: buff 32, name: buff 50, rules: buff 200): Response
    }
```

\


<figure><img src="../../../.gitbook/assets/eDAO-resource-contracts_class.drawio (3).png" alt=""><figcaption></figcaption></figure>

### Flow Diagrams
