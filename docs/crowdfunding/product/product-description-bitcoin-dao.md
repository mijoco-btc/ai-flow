---
description: high level description of the bitcoin-dao crowdfunding platform
---

# Product Description - Bitcoin DAO

## The Problem

The problems facing serial builders and entrepreneurs trying to get their web3 startup off the ground can feel insurmountable.&#x20;

On the one hand are the governance issues. Running a decentralised project requires serious amounts of regulatory, technical and administrative know how. Then there is the perennial funding issue - how to raise enough to funds to live while you bring your vision to life? &#x20;

These problems represent a serious barrier to entry for builders and community members with inspiring visions.

## The Cambrian Explosion

Bitcoin DAO provides the tools that small projects need to fulfil their vision.&#x20;

It is Bitcoins' turn for a Cambrian explosion of DAO projects via its leading Layer 2 chain, Stacks!

Using the sBTC decentralised bridge bitcoiners can use their bitcoin to directly project treasuries - fulfilling the web3 ambition and building innovative products in the emerging cryptosphere.

Our solution, Bitcoin DAO, is built upon a highly versaltile and flexible system of smart contracts. Projects can launch without facing the inherent problem of evolving and upgrading smart contract functionality - this is built in and fully decentralised through Bitcoin DAOs pluggable system of proposal and voting contract.&#x20;

Furthermore, Bitcoin projects on Layer 2 can push the boundaries of decentralised governance, adopting novel startetgies like delegative and liquid democracy to inspire and motivate their communities.

Bitcoin DAO provide options for sunsetting the executive / core team. This allows the project to be fully decentralised on a timescale that suits the projects goals.

### Core Features

**Crowdfunding**

* build and drive campaigns with built in social plugins
* extend reach with ai agents
* define and set targets for your campain
* configure and launch your project DAO
* crowdfund over multiple channels - not least direct bitcoin investment

### About the DAO

Bitcoin DAO is a full featured social crowdfunding platform with one big difference - it gives your project a smart contract framework that will enable you to explore and experiment, change you mind and lays perfect plans.

Based on the [Executor DAO](https://github.com/MarvinJanssen/executor-dao) (see also [this video](https://www.youtube.com/watch?v=U4J_JnbTg2o) by Hiro Systems) Bitcoin-DAO enables users to configure, deploy and then manage their project in a way that suits their needs. Want to launch your project with a governance token that can also serve as your projects utility token. Prefer voting based on soul bound, non transferable NFTs.&#x20;

Whatever starting point you chose Bitcoin DAO has you covered - and whats more the framework adapts, via its governance mechanisms, to allow you to evolve and change!

## How it Works

This is a crowdfunding platform aimed at builders and serial entrepreneurs to make it easy to&#x20;

* [ ] raise a treasury
* [ ] configure and launch dao&#x20;
* [ ] run a crowdfunding campaign

### User Flow

**Actors**

* Terri - MeDeFi Project administrator&#x20;
* Bob - end user with btc
* Alice - end user with stx
* BitcoinDao - the crowdfunding platform
* sBTC Bridge - bridge connecting bitcoin wallets and stacks wallets/contracts
* Treasury extension - a smart contract deployed on stacks blockchain
* Voting extension - a smart contract deployed on stacks blockchain
* Token extension - a smart contract deployed on stacks blockchain

#### Project Stories

**A) Terri lists MeDeFi project**

* Terri navigate to the new project page
* Terri enters the following details about the project
  * project name
  * description
  * uploads square logo
* BitcoinDao saves the information in a mongodb

**B) Terri launches project DAO**

* Terri enters
  * wallet addresses of executive team
  * sunset period
  * chooses voting options
    * governance tokenised (enters token details - name, ticker, url)
    * snapshot voting - no governance token required
  * chooses proposal option
    * public proposal allowed
    * public proposals require funding (enters funding level)
    * core team proposals only (only core team members can propose)
* BitcoinDao substitutes Terri choices into the DAO contracts
* BitcoinDao deploys the contracts on stacks blockchain
* BitcoinDao polls the blockchain for transaction status and updates the UI.

**C) Terri sets up and runs crowdfunding campaign**

Pre-requisite: the project DAO is fully deployed on stacks blockchain

* On the campaign admin page Terri enters
  * target for fundraise
  * coins supported for treasury (btc, stx, sBTC, other sip10s?)
  * bitcoin block heights for start and end of fund raise&#x20;
* Terri chooses social channels to connect for promoting the campaign
  * x, discord etc ??
  * ai agents??
* On the campaign page BitcoinDao tracks the block heights to decide when to show the funding controls
* On the campaign page BitcoinDao tracks the treasury contract balance against the target. If multiple coins are supported the balance is aggregated - note likely involves using oracles for on chain price conversion.

**D) Alice funds project**

* on campaign page Alice invokes action to transfer STX to treasury
* BitcoinDao invokes web wallet and sets post conditions on tx
* Alice sends funds directly to the project treasury contract
* If the project dao has a governance token BitcoinDao mints the corresponding amount of governance token to Alices address - note this is more complex - the amount of GVM token Alice receives is dependent on the crypto currency donated. &#x20;

**E) Bob funds project**

* on campaign page Bob invokes sBTC Bridge to transfer BTC to treasury
* sBTC Bridge prompts Bob for amount and a signature via web wallet (Leather/Xverse)
* Bob signs transaction - equivalent amount of sBTC is minted to the Treasury contract
* If the project dao has a governance token BitcoinDao mints the corresponding amount of governance token to Bobs address - note this is more complex - the amount of GVM token Bob receives is dependent on the crypto currency donated.

















