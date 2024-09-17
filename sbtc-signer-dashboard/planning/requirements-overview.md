---
description: Overview of the Signer Dashboard early requirements
---

# Requirements Overview

## Background

The **sBTC Signer Dashboard** and **sBTC Signer Management Tools** are two distinct but related products originally specified in Stacks Foundation Bounty applications and then evolving in sBTC specs.

The **Signer Management Tools** is not the concern here but definitions and specifications can be found in the following;

* [Signer product requirements](https://github.com/Trust-Machines/stacks-sbtc/issues/498)&#x20;
* [sBTC Stacks-Signer Management Tool UI](https://github.com/stacksgov/Stacks-Grant-Launchpad/issues/875)
* [sBTC Stacks-Signer Support for Mobile](https://github.com/stacksgov/Stacks-Grant-Launchpad/issues/876)
* [Stacks 3.0 / sBTC User Stories](https://docs.google.com/document/d/18kdGhHVMxdH6I-g8Kjl0JMDqlevdWrZLuVp1jehfIgg/edit#heading=h.rhb385nnijpl)
* [sBTC Signer Product Requirements](https://docs.google.com/document/d/1BOzKYI1LWsg8iAc6g6eL7-UtdCu4FdUGEXYQPX0zzxA/edit#heading=h.tchobh3xklu)
* [Signer API](https://docs.google.com/document/d/1sI5GgXYYc8EaCFXTvcFZq828Zrw\_eRu274jnfvqfeOw/edit#heading=h.n7dvndtq37vt)

***

The **Signer Dashboard**, distinct from the singer management tools, is the concern here. The remainder of this document summarises the requirements.&#x20;

## Signer Dashboard Requirements

At a high level the **sBTC Signer Dashboard** provides a health check of the sBTC protocol and presents signers with information they need to fulfil any responsibilities by displaying signer history, voting info and transaction histories.&#x20;

Requirements for the Dashboard are captured in the following (and maybe others)

* [Signer Dashboard UI requirements](https://github.com/Trust-Machines/stacks-sbtc/issues/498)
* [sBTC Signer Product Requirements](https://docs.google.com/document/d/1BOzKYI1LWsg8iAc6g6eL7-UtdCu4FdUGEXYQPX0zzxA/edit#heading=h.tchobh3xklu)
* [sBTC Stacks-Signer Dashboard: RPC-API and UI](https://github.com/stacksgov/Stacks-Grant-Launchpad/issues/877)
* [sBTC Signer Support](https://github.com/hirosystems/explorer/issues/1248)

Some features will be duplicated in other systems in order to present contextualised information. This is encouraged and supported by the sBTC Signer Dashboard through its modular structure. See Appendix A on Signer Dashboard design for more details.

### High Level Requirements

Distilling information from these documents provides a core list of initial requirements;

1. Signer List and Details:
   * The Signer Dashboard shall display a list of all signers in the network, including their voting power and public key.
2. Signer Transaction Analytics:
   * The dashboard shall provide analytics related to the signers' activities, including the number of transactions signed and a history of past transactions signed.
3. General transaction histories
   * Transaction histories for deposits and withdrawals
   * Ability to filter, page and sort transactions
   * Ability to drill into transactions
4. Signer transaction histories
   * Number of transaction signed
   * History of past transactions
5. High level stats including;
   * Total value locked
   * Number of unique addresses
   * Number / keys of pool operators
6. sBTC meta data
   * Information on the sBTC/PoX life cycle
   * Number of pending deposits
   * Number of pending withdrawals
7. Signer reputation
   * Ability for signer to link their keys to DNS domains (via Web DiD specification)

### Appendix A: Signer Dashboard Design

The sBTC Signer Dashboard supports other applications via modular design. The application is composed from;

1. A public API
2. The Signer Dashboard UI
3. A public NPM Module

The API can be used to build other web applications emphasising different contexts. The npm module provide several helper functions such as; building and parsing deposit and withdrawal payloads, build commitment, reclaim and reveal (for testing only) transactions.
