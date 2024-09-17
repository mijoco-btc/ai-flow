---
description: Stories associated with the withdrawing of funds
---

# Epic: Withdraw Funds

## As a User I want to Withdraw Funds

Withdrawing funds (formerly pegging out or unwrapping) involves a user sending bitcoin to a bitcoin address to initiate a process whereby their Bitcoin is returned and the equivalent amount of sBTC is removed.

The overall process can be broken down into smaller stories;

1. As a user I want to initiate a withdrawal by sending a 'commitment'
2. As a tester I want to reveal this withdrawal 'commitment' to the Stacks Blockchain
3. As a user I want the Bridge to inform me of each step in the withdrawal process
   1. information about my initial request
   2. to be informed when the request is being process
   3. to be informed when processing is complete and the Bitcoin is returned
   4. to be informed of all costs associated with the withdrawal

**Pre-Conditions**;

1. User has authenticated themselves with the Bridge by connecting their stacks web wallet.
2. User has control over at least as much sBTC as they wish to withdraw

**Definition of Done**;

1. Funds are provably returned to the users Bitcoin wallet.

### As a user I want to initiate a withdrawal by sending a 'commitment'

First navigate to the withdrawal page on the Bridge application. The Bridge presents a form with three fields;

1. Bitcoin address - the address I wish to withdraw funds to
   1. Pre-populated by the users segwit v0 (cardinal) bitcoin address&#x20;
2. Stacks address of an account on Stacks network
   1. Pre-populated by the users authenticated stacks account
   2. Pre-Condition - the user must be able to provide a signature to prove they own this address.
3. Amount to withdraw
   1. Cannot exceed the amount of sBTC the user owns at the Stacks address.

User enters the data and selects from one of two choices;

* withdraw using web wallet
* withdraw using other wallet

Sub-Flow 1: Using Web Wallet

The user elects to withdraw via their web wallet. The Bridge passes the web wallet an unsigned PSBT. The web wallet opens and prompts the user for a signature. The user signs and the Bridge then broadcasts the signed transaction.

Sub Flow 2:  Using Any Wallet

The user selects other wallet. The Bridge displays a QR code and the corresponding address. The amount sent in this output is just a dust amount needed to link the transactions.

The user scans or copies the data to their wallet where they sign and broadcast the transaction.

The Bridge notifies the API which watches for the transaction and links to the txid when seen.

**Definition of Done**

1. A Bitcoin transaction containing a hash of all the relevant data is confirmed on the Bitcoin Blockchain

### As a tester I want to reveal this withdrawal 'commitment' to the Stacks Blockchain

As a tester I want to ensure the sBTC Clarity contracts are informed of the user withdrawal commitment.&#x20;

The Bridge periodically scans to see if the user has committed to a withdrawal. When the Bridge sees a such a commitment it broadcasts a Stacks transaction carrying the BTC transaction d to the sBTC smart contracts.

**Definition of Done**

1. Bitcoin is sent to the users wallet
2. Equivalent amount of sBTC is removed from the system

### As a user I want the Bridge to inform me of each step in the withdrawal process

The bridge checks periodically to see if the users sBTC is locked by the smart contracts. It then checks to see if the stacks signers have issued a fulfilment of this request and finally tracks the state of the sBTC to see that it is indeed removed from the Stacks Blockchain after the fulfilment returns the Bitcoin to the end user.

Each step is tracked and the user can request this information via the Bridge interface.&#x20;

**Definition of Done**

1. User is able to clearly see the block height at which each transaction was confirmed
2. User is able to see each transaction via independent Bitcoin or Stacks blockchain explorers.

