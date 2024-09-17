---
description: Time line for updating the Stacks Ecosystem DAO
---

# Nakamoto SIP Community Vote

Ecosystem DAO was used for the SIP 2.1 vote in December 22. The work required to bring it back on line ready for Nakamoto SIP voting is detailed here.

There are three voting mechanism (explained in [sip-015](https://github.com/stacksgov/sips/blob/280291b43ba52948c2d1f597f7bf87b49390c19e/sips/sip-015/sip-015-network-upgrade.md?plain=1#L1743)). Voting for solo stacks, for pool stackers and for non-stackers.

## Delivery

Work will upgrade the current [stx.eco](https://stx.eco) application.

## Development

#### Phase 1: App development

* Update svelte ui framework \[<mark style="color:blue;">2 days</mark>]
* Update css to tailwind \[<mark style="color:blue;">3 days</mark>]
* New designs on the sBTC Bridge project to keep costs down \[<mark style="color:blue;">2 days</mark>]
* Integrate voting for solo / pooled stackers see [https://sip015.xyz/](https://sip015.xyz/) \[<mark style="color:blue;">3 days</mark>]
* simplify the api back end of the DAO \[<mark style="color:blue;">2 days</mark>]
* deploy new contracts \[<mark style="color:blue;">0.5 days</mark>] (no contract development is anticipated)

#### Phase 2: Content and testing

* Deploy contracts  \[<mark style="color:blue;">0.5 days</mark>]
* Update homepage / about content \[<mark style="color:blue;">2 days</mark>]
* Setup the DAO e.g. for the start / duration of voting in test scenarios \[<mark style="color:blue;">2.5 days</mark>]

#### Phase 2 total: <mark style="color:blue;">5.5 days</mark>

Phase 3: Mainnet release

* Deploy contracts \[<mark style="color:blue;">1 days</mark>]
* Finalise content \[<mark style="color:blue;">2 days</mark>]
* Support and maintenance \[<mark style="color:blue;">4 days</mark>]

#### Phase 4: Counting votes

* Counting votes (all three methods) \[<mark style="color:blue;">4 days</mark>]
* Display / reporting totals \[<mark style="color:blue;">2 days</mark>]

### Summary

| Phase | Purpose             | Days |
| ----- | ------------------- | ---- |
| 1     | App development     | 12.5 |
| 2     | Content and testing | 4.5  |
| 3     | Mainnet release     | 7    |
| 4     | Counting votes      | 6    |
| Total |                     | 30   |

## Vote Counting

### Voting Addresses

The bitcoin yes/no addresses are derived following sip-015&#x20;

```
const p2shObjY = btc.p2sh({type:'unknown', script: btc.Script.encode(['DUP', 'HASH160', hex.decode('00000000000000007965732D6E616B616D6F746F'), 'EQUALVERIFY', 'CHECKSIG'])}, net)
const p2shObjN = btc.p2sh({type:'unknown', script: btc.Script.encode(['DUP', 'HASH160', hex.decode('0000000000000000006E6F2D6E616B616D6F746F'), 'EQUALVERIFY', 'CHECKSIG'])}, net)
```

The stacks voting addresses for pooled stackers are similarly;

```
const addr0 = (network === 'testnet') ? 26 : 22;
let addr1 = '00000000000000007965732D6E616B616D6F746F'
const yAddress = c32address(addr0, addr1);
addr1 = '0000000000000000006E6F2D6E616B616D6F746F'
const nAddress = c32address(addr0, addr1);
```

where the hex strings are encodings of;

```typescript
new TextEncoder().encode('yes-nakamoto');
new TextEncoder().encode('no-nakamoto');
```

### Solo Stackers

Recipe:

1. Read yes / no transactions from mempool sent during the voting period
2. For each reward cycle in voting period
   * read the number of pox addresses - <mark style="color:purple;">get-num-reward-set-pox-addresses</mark>
   * iterate over <mark style="color:purple;">get-reward-set-pox-address</mark>
   * convert hashbytes/version to address or compare with script pub key in the transaction? (<mark style="color:orange;">most reliable way?</mark>)
   * remove entries where the stacks address is a pool operator - read <mark style="color:purple;">delegate-stacks-stx</mark> and note the tx-sender.
3. For each yes/no vote;
   1. check the address belongs to solo stacker
   2. sum the amount stacked (using the earliest entry \[1])

\[1] if they were stacking in multiple cycles, during voting period, use the greater amount of stx stacked.

### Pool Stackers

Recipe:

1. Read yes / no transactions from stacks node sent during the voting period
2. Read their locked balance during the reward cycles within the voting period
3. sum the maximum locked per stacker.







