---
description: Implementing Commit / Reveal
---

# Commitment Risks

## Requirements

From the [Mini sBTC](https://docs.google.com/document/d/1R33gZupJg0KsY-vRZYbVFwTHRmq2BCIvyPIVeY0JyGM/edit) specification;&#x20;

> ### Peg-In
>
> Peg-in operations are a five-step process.  This process makes use of the new commit-reveal scheme proposed by Tycho and Fernando, which permits users to peg-in their BTC from custodial wallets.
>
> 1. The user generates a taproot script that encodes this condition:  “Here’s an 80-byte payload, but ignore it.  Next, if this transaction is mined in the last 144 Bitcoin blocks, then only the peg wallet signers can spend it.  Otherwise, only I can spend it.”
> 2. The user broadcasts a transaction with a single P2TR output that corresponds to the script generated in step 1.
> 3. The user broadcasts the transaction ID and script to the network of Stackers (i.e. to their \`sbtc-signer\` binaries).
> 4. The Stackers, upon receipt of the transaction ID and script, spend the user’s P2TR by sending it to the peg wallet address.  Otherwise, if the 144 block timeout passes, the user can reclaim the BTC.
> 5. Anyone relays the Stackers’ spend transaction in step 4 to \`.sbtc\`, which verifies that it is well-formed, extracts the 80-byte payload, decodes it to a \`principal\`, and mints an equal number of \`sbtc\` tokens to the principal as were consumed by the Stackers.

The [P-02 Commit reveal peg operations](https://github.com/Trust-Machines/core-eng/blob/24d2d86307e5a1ae3d682915ac5b1677cc93b51c/sbtc-planning/commit-reveal-ops.md) provides details on the op\_drop mechanism, the construction of the payloads and the user flow for the commitment procedure.

Three transactions are implied;

1. Commitment Tx - users original peg in tx (payable as standard invoice / qr code).
2. Reveal Tx - the signers tx to proves the funds have been committed - reveal the proof to the Clarty smart contract layer
3. Reclaim Tx - alternate path for the user to regather their funds.

### Pay to Witness Script Hash

An earlier attempt looked to construct a solution using P2WSH to wrap the necessary reclaim/reveal script. See this [explanation](https://docs.google.com/document/d/1j2As89TI1crgtXV5D-OfQgYUhVC7C\_ohVmgZoDogntQ/edit#heading=h.kak88r3d379t) for details about why this approach does not work - tldr; the wrapped script requires knowledge of the users public key which is not available at the time the commit is created - i.e. if they are pegging in from a generalised wallet - CEX say they won't be able to provide a public key.

### Pay to Taproot

There are several variations with taproot for building the reveal and reclaim scripts. E.g. we could use pay to key path with the user public key (for reclaiming) and a single script path with the op\_drop data to the sbtc wallet.&#x20;

Making the the key path spend unspendable and providing two scripts for the reclaim / reveal seems more appropriate and is the method being tested on sbtc.world. The following also ignores the 144 block timing constraints to keep things simple.

````
```typescript
const scripts =  [
    { script: btc.Script.encode([data, 'DROP', sbtcWallet.pubkey]) }, 
    { script: btc.Script.encode([reclaimAddr.pubkey]) }
]
const script = btc.p2tr(btc.TAPROOT_UNSPENDABLE_KEY, scripts, testnet, true);
```
````

This example yields the following taproot redeem script data;

```
address: "tb1p0wmwkannc4fkh6fzmdpkzl8t7vw9p6f65rh9mtyca5th29s4al9s9cyrxr"
leaves: Array(2)
0: {type: 'leaf', tapInternalKey: undefined, version: undefined, script: Uint8Array(65), hash: Uint8Array(32), …}
1: {type: 'leaf', tapInternalKey: undefined, version: undefined, script: Uint8Array(33), hash: Uint8Array(32), …}length: 2[[Prototype]]: Array(0)
script: Uint8Array(34) [81, 32, 123, 182, 235, 118, 115, 197, 83, 107, 233, 34, 219, 67, 97, 124, 235, 243, 28, 80, 233, 58, 160, 238, 93, 172, 152, 237, 23, 117, 22, 21, 239, 203, buffer: ArrayBuffer(34), byteLength: 34, byteOffset: 0, length: 34, Symbol(Symbol.toStringTag): 'Uint8Array']
tapInternalKey: Uint8Array(32) [80, 146, 155, 116, 193, 160, 73, 84, 183, 139, 75, 96, 53, 233, 122, 94, 7, 138, 90, 15, 40, 236, 150, 213, 71, 191, 238, 154, 206, 128, 58, 192, buffer: ArrayBuffer(32), byteLength: 32, byteOffset: 0, length: 32, Symbol(Symbol.toStringTag): 'Uint8Array']
tapLeafScript: Array(2)
0: (2) [{…}, Uint8Array(66)]
1: (2) [{…}, Uint8Array(34)]length: 2[[Prototype]]: Array(0)
tapMerkleRoot: Uint8Array(32) [212, 206, 35, 144, 83, 175, 3, 80, 63, 128, 197, 54, 97, 223, 22, 248, 120, 8, 208, 87, 131, 122, 109, 98, 93, 12, 90, 210, 175, 218, 126, 250, buffer: ArrayBuffer(32), byteLength: 32, byteOffset: 0, length: 32, Symbol(Symbol.toStringTag): 'Uint8Array']
tweakedPubkey: Uint8Array(32) [123, 182, 235, 118, 115, 197, 83, 107, 233, 34, 219, 67, 97, 124, 235, 243, 28, 80, 233, 58, 160, 238, 93, 172, 152, 237, 23, 117, 22, 21, 239, 203, buffer: ArrayBuffer(32), byteLength: 32, byteOffset: 0, length: 32, Symbol(Symbol.toStringTag): 'Uint8Array']
type: "tr"
```

The user pays to the `address` encoded into a QR code and the taproot script data is saved by the bridge.

## Risks

At time of writing the bridge development is blocked by a number of issues;

### Timing Issues

A [question](https://discord.com/channels/1076608263983997008/1093895964525330462/1102679432667336745) from Jesse.dlc in the dlc channel of Bitcoin Builders about the handover process and timing of a commit transaction.

> Similarly, I was wondering what happens if someone sends BTC to the sBTC peg-in towards the end of a key-rotation cycle, and the gas fee is low, or an event (like ordinals) happens pushing fees up. if the event doesn't get mined for 24 hours, and the keys cycled by that time, could that be a problem?

### Verification of the general approach

Taproot s complex and there are several ways to encode the reveal/reclaim transactions.

For example the above encodes the reclaim script by making the following assumptions;

* assumes we don't know anything about the wallet they sent the commit from
* assumes we could use the Stacks Bitcoin Web Wallet address / pubkey they are logged into the bridge when we build the commit tx.
* assumes we can't use their segwit v0 address - because we can't mix signature algorithm types (ECDSA / Schnorr) or if we could assumes the web wallet would not know how to provide a signature for the PSBT with an embedded P2WPKH that arises ?
* if we pay directly to the ordinal (bech32m, segwit v1 address) whether the user can access the funds.

### Practical Issues with PSBTs for Taproot Transactions

The bridge has no control/access to any private keys.

It therefore relies on construction of PSBT and prompting the user to sign with their wallet.

Attempting this with either Bitcoin Core v24 or asking the Hiro web wallet to sign the PSBT has so far not succeeded. Normally, (e.g. in the case of P2WSH) one would construct an input that consumes the above output by

* identify the tx
* identify the vout
* present the original redeem script

Encoding this in a PSBT and presenting to a wallet would illicit a signature and the result could be finalised and broadcast.

For taproot there are very few examples of the mechanics of creating valid PSBTs and it is currently unclear how to construct a valid PSBTs for taproot script path spends. As things stand Hiro web wallet and Bitcoin 24 are both able to decode the PSBT passed but unable to provide signatures due to missing information in the inputs.&#x20;

Note: the bridge only needs to worry about the reclaim path but it seems trying to get this to work for an sBTC signer wallet as a Bitcoin v24 descriptor wallet will be helpful for the main project in terms of verifying the approach.

### Downstream Issues - Clarity

It's not clear the impact of these issues downstream on the Clarity layer where the payload has ultimately to be processed but there is a risk that the solution at the Clarity layer could impact the above implementation details.

## Summary

* Verify approach around reclaiming btc - see [https://brighton-blockchain.gitbook.io/sbtc-bridge/sbtc-bridge-plan/risks/commitment-risks](https://brighton-blockchain.gitbook.io/sbtc-bridge/sbtc-bridge-plan/risks/commitment-risks)
* Why the reclaim path is needed with op\_drop;
  * Potential timing risks (jesse.dlc) - the commit is submitted at end of window and is not processed before the wallet handover.
  * Bridge or Stacks node goes offline - who informs the Stacks node about a new commit ?
* Practical issues constructing PSBTs for taproot and gathering signatures;
  * dev knowledge,&#x20;
  * sparse wallet support (e.g. Bitcoin Core 24),&#x20;
  * sparse library support (btc signer) ?
  * sparse tool support - e.g. most tools (btcdeb etc) assume access to priv keys
* Access to a repay wallet for the user;
  * op\_drop => no access to the committers pubkey
  * pay back to their Stacks web wallet bitcoin address? Ordinal or cardinal address? Unknowns around mixing Schnorr and ECDSA sigs - esp. In multi-sigs it is not possible.
*   Downstream - any solution has to be acceptable to the Clarity layer.


* Solutions
  * Experiment, discuss, raise visibility - more minds..
  * Make reclaim offline
  * Fall back to op\_return - transactions are direct.

