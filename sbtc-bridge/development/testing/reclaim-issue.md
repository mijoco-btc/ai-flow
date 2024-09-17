---
description: Describes problem with the reclaim path
---

# Reclaim Issue

Pinning this down in the uasu code but its the same problem for sBTC

#### Problem statement

Leather wallet fails to match the public key generated from its private key with the public key in the script path spend that allow users to reclaim after 144 blocks.

Initial Flow

1. Funding transaction is created and broadcast - users taproot public key (x-only) is used to create a reclaim spending script path

Reclaim flow

1. Transaction created that spends the output from above
2. psbt passed to users leather wallet
3. leather wallet calls btc-signer with the users private key
4. btc-signer regenerates the publc key using `schnorr.getPublicKey(priv)`
5. the genrated public key is not the same as the public key in the script path spend
6. the btc-signer fails to locate the public key and defers signing
7. Wallet throws \`Unable to sign PSBT at index, Error: No taproot scripts signed\`
8.

