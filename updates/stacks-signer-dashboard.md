---
description: 'CB-2Q23-04.3 : sBTC Stacks-Signer Dashboard: RPC-API and UI'
---

# Stacks Signer Dashboard

Status: In Progress

### Phase IV Status: In Progress

#### Update - sBTC Signer Dashboard

5 July

In progress

1. New deployment [https://sign.stx.eco](https://sign.stx.eco) is WP
2. [Issue 45](https://github.com/Stacks-Builders/sbtc-bridge-api/issues/45) Sets up a public [devnet](https://brighton-blockchain.gitbook.io/sbtc-bridge/sbtc-signer-dashboard/sbtc-mini-devnet) where anyone can access the sBTC contracts as they are developed. Necessary for the Dashboard application but also helpful for the Clarity group and other community members wishing to track sBTC progress. See a description of this work in [GitBook](https://brighton-blockchain.gitbook.io/sbtc-bridge/sbtc-signer-dashboard/sbtc-mini-devnet)
3. [PR 47](../sbtc-bridge/development/testing/test-vectors.md) Running clarinet integrate by forking [https://github.com/Stacks-Builders/stacks-sbtc](https://github.com/Stacks-Builders/stacks-sbtc) to [https://github.com/radicleart/stacks-sbtc](https://github.com/radicleart/stacks-sbtc)

setup a clone of the sbtc-mini directory using a script to copy the contracts - this ensures no interference from this work back to the main branch.

Made changes to the sbtc mini contracts to;

1. connect to pox-3 contract
2. deploy the contracts on devnet

Completed

1. [PR 42](https://github.com/Stacks-Builders/sbtc-bridge-api/pull/42) back end and ui work for feature `DNS Vouch` - allows the owner of a domain to upload testimony of the signers stacks address.
2. [PR 27](https://github.com/Stacks-Builders/sbtc-bridge-api/pull/37) Sets up the repos and clones code from the bridge to create a starting point for the dashboard.

Attending signer meeting and opened communication with the Clarity working group to share issues, see [GitBook](https://brighton-blockchain.gitbook.io/sbtc-bridge/sbtc-signer-dashboard/sbtc-mini-devnet).

Work is ongoing responding to feedback from various stake holders with several enhancements planned via Issues in Github.

Summary of work finished:

* [Create typescript Bridge library](https://github.com/Trust-Machines/sbtc-bridge-web/issues/133) [enhancement](https://github.com/Trust-Machines/sbtc-bridge-web/issues?q=is%3Aissue+is%3Aclosed+label%3Aenhancement)
* [Improve Unit Test Coverage](https://github.com/Trust-Machines/sbtc-bridge-web/issues/118)
* [testnet contract shown on sbtc.world](https://github.com/Trust-Machines/sbtc-bridge-web/issues/90)
* [Migrate Web Hosting from GCP to Cloudflare](https://github.com/Trust-Machines/sbtc-bridge-web/issues/109)
* [Make the api database deployment independent of the api deployment](https://github.com/Trust-Machines/sbtc-bridge-api/issues/20)



