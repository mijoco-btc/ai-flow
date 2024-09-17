---
description: High level planning, use cases etc
---

# Planning

### Introduction

The sBTC Bridge is part of the bigger sBTC project being delivered in two phases - sBTC Mini and fully SIP-021 compliant sBTC. The priorities of the Bridge is to serve the needs of the wider project - the Bridge makes it possible to test and experiment with various aspects of the system.

### Kanban Process

See the UI/UX Design Plan and individual plans for each bounty for milestones.

The project will be run Kanban style, see the [sBTC User Stories](https://brighton-blockchain.gitbook.io/sbtc-bridge/sbtc-bridge-plan/sbtc-bridge-user-stories) and tracked via the [sBTC Bridge Trello board](https://trello.com/b/PXCjRr1a/kanban-sbtc-bridge) (please request an invite on Discord if you want access).&#x20;

User Stories relate to one of these Critical Bounties.

* Issue #877: [CB-2Q23-04.3 : sBTC Stacks-Signer Dashboard: RPC-API and UI](https://github.com/stacksgov/Stacks-Grant-Launchpad/issues/877)
* Issue #872: [CB-2Q23-03.1 : sBTC Bridge: API Continuation](https://github.com/stacksgov/Stacks-Grant-Launchpad/issues/872)
* Issue #873: [CB-2Q23-03.2 : sBTC Bridge: Integration with Trezor & Ledger](https://github.com/stacksgov/Stacks-Grant-Launchpad/issues/873)

Note: the work to bootstrap and deliver sBTC alpha is summarised in Appendix 1 below.

### Milestones

#### Issue #877: [CB-2Q23-04.3 : sBTC Stacks-Signer Dashboard: RPC-API and UI](https://github.com/stacksgov/Stacks-Grant-Launchpad/issues/877)

`MS1: Transaction Formats`

* Un/wrap transactions conform to spec.&#x20;
* User is able to reclaim unspent wrap transactions

`MS2: Proof of Reserves`

* All user transactions leading to mint / burn of sBTC are visible in the interface.
* All signer transactions are visible.
* sBTC mints and burns are&#x20;

`MS3: Protocol Governance`

* voting on protocol upgrade (note: this is not signer voting on transactions) via integration with third party DAO project.

#### Issue #872: [CB-2Q23-03.1 : sBTC Bridge: API Continuation](https://github.com/stacksgov/Stacks-Grant-Launchpad/issues/872)

`MS1: CI and Deployment`

* Staging and production environments fully supported
* CI process defined and working

`MS2: Scalability and Redundancy`

* database can be horizontally scaled.
* API can be horizontally scaled

#### Issue #873: [CB-2Q23-03.2 : sBTC Bridge: Integration with Trezor & Ledger](https://github.com/stacksgov/Stacks-Grant-Launchpad/issues/873)

`MS1: Trezor Support`

* Data connection via Trezor Bridge
* Users can sign transaction from the bridge using Trezor&#x20;

`MS1: Ledger Support`

* Data connection via Ledger Live
* Users can sign transaction from the bridge using Ledger&#x20;

### Delivery

The plan tracks delivery of each Bounty against work items - e.g. Pull Requests. Each PR links to an issue in the Repo which describes the work item. An overview is mapped in this table of Pull Requests to Bounty.

<table><thead><tr><th width="406">Description</th><th>Item</th><th width="113">Bounty</th><th width="70">days</th></tr></thead><tbody><tr><td>Move Mongo DB to Cloud hosting</td><td><a href="https://github.com/Trust-Machines/sbtc-bridge-api/pull/21">#21</a></td><td><code>872/MS1</code></td><td>3</td></tr><tr><td>Simplify container management</td><td><a href="https://github.com/Trust-Machines/sbtc-bridge-api/pull/24">#24</a> <a href="https://github.com/Trust-Machines/sbtc-bridge-web/pull/104">#104</a></td><td><code>872/MS1</code></td><td>2</td></tr><tr><td>Migrate Web Hosting from GCP to Cloudflare</td><td><a href="https://github.com/Trust-Machines/sbtc-bridge-web/issues/109">#109</a></td><td><code>872/MS1</code></td><td>2.5</td></tr><tr><td>Commitment Transaction</td><td><a href="https://github.com/Trust-Machines/sbtc-bridge-web/issues/105">#105</a></td><td>877/MS1</td><td>8</td></tr><tr><td></td><td></td><td></td><td></td></tr></tbody></table>

## Appendix 1: Previous Phases

Work delivered to bootstrap the sBTC Bridge Web and API components prior to kickoff of the Foundation Bounties.

### ~~Phase I: Pegging In/Out~~

Bootstrap the project and provide basic screens for user to build Bitcoin wrap/unwrap request transactions according to the spec [SIP-021](https://github.com/stacksgov/sips/pull/113)

1. Bootstrap application, bitcoinjs and node polyfills working
2. Deployment - github pages
3. Gating - access control via Hiro Wallet
4. Views
   * peg in transaction builder
   * peg out transaction builder
   * transaction signing
5. Integrations
   * Electrum wallet compatible transactions for sign / broadcast
   * sbtc-alpha contract via Micro Stacks
   * Bitcoin explorer integration via mempool.space and api.blockcypher.com
6. Caching layer via reactive wrapper around local browser storage
7. Unit tests - vitest

Time: 10 days

**Delivered on 3rd Feb**

#### ~~Phase II: Transaction History~~

1. Views
   * display transactions
   * filter transactions
2. Integrations to read / parse
   * mint transactions
   * burn transactions
   * fulfillment transactions
3. Local caching to speed up queries where possible
4. Unit and e2e tests including creation of test data and stubs.

Time: 9 days

**Delivery by 24th Feb**

#### ~~Phase III: SBTC Data Indexer Rest API~~

This component is a stateless, open API whose primary purpose is to make the sbtc-bridge application fast. It will achieve this by pre-reading and aggregating SBTC related blockchain and smart contract state into a Mongo database.

Secondary purpose to provide additional metrics and business intelligence for SBTC.

This component can be readily extended via Websocket API.

1. API application deployed via docker, provides;
   * access to bitcoin rpc and stacks node rpc
   * reads/caches contract event data on schedule
   * NodeJS / Typescript application
2. Mongodb deployed via docker
3. Deployment on GCP k8 Cluster
4. Features

* Read and index sbtc peg in txids
* Read and index sbtc peg out txids
* Rest API calls to return these txids

The estimate here is for a working prototype deployed on testnet implementing the minimal feature set above.

Time: 12 days

**Delivery: 17/31**

### ~~Phase IV: OP\_DROP Tx Format~~

[OP\_DROP is a format](https://docs.google.com/document/d/1EnYEk6gA2w6VfRpT8CcK8mghZRMUEjn2OhHwzdK\_9x0/edit) that may help to broaden the user base for SBTC.

1. OP\_DROP Wrap
2. OP\_DROP Unwrap
3. Decode OP\_DROP transactions to retrieve stacks signer.

Time: 5 days

**Delivery: 3/17**

###
