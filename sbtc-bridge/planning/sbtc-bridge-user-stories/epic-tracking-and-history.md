---
description: Stories associated with the tracking of sBTC transactions
---

# Epic: Tracking and History

## **Introduction**

Stories concerned with displaying, sorting and filtering sBTC related information and transactions.

**Pre-Conditions**;

1. User has authenticated themselves with the Bridge by connecting their stacks web wallet.

### As a User I want to be able to display and filter deposits made to the sBTC protocol

User navigates to the /deposits section of the Bridge

Bridge responds with a page of unfiltered deposit related transactions.

User is able to refine the search by;

1. selecting my deposits (defaults to all deposits)
2. selecting the status (see below)
3. reversing the sort direction (default newest first)

Note: the filters are additive.

The status of each search result is as follows;

* 0 : ignore status
* 1 : commit address presented to user
* 2 : user paid to the commit address
* 3 : user reclaimed their funds
* 4 : committed funds were revealed to sBTC Wallet

Each search result displays;

* timestamp (of when the commit invoice was first diplayed)
* commit address (links to mempool space)
* destination stacks address (standard or contract principal)
* amount in satoshi - note the amount of the invoice is not necessarily the same amount the user sends &#x20;

the user is able to follow a link to view the transaction on mempool space.

The user can follow a link into a specific search result.&#x20;

### As a User I want to be able to view information related to an arbitrary deposit

\[Note: all information pertaining to deposits is already part of the public domain via Bitcoin transactions so there are no privacy concerns].

User navigates to the /deposits section of the Bridge and searches for a specific deposit.

User click the search result and the Bridge opens a new view /deposit/{deposit\_id}

User is able to view and verify each element of the deposit by clicking through to Mempool Bitcoin blockchain explorer.

The Bridge provides information determined by the status of the deposit;

* Status 1: payment not yet made to the commit address
* Status 2: payment made to the commit address
* Status 3: user reclaimed the commitment
* Status 4: commitment revealed (spent) by sBTC wallet

If the originating address of the deposit equals the users logged in stacks address (note NOT the destination address as this may differ), then the user is offered additional user stories (see Epic: Deposit Funds) - in general;

1. If status=1 the User can request redisplay of the QR code / invoice for the user to pay the deposit.
2. If status=2 the Bridge will enable the user to sign and broadcast a reclaim transaction.



&#x20;
