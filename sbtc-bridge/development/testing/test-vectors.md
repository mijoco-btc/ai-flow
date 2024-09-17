# Test Vectors

## Transaction 1

Scripts;

```typescript
const scripts =  [
    { script: btc.Script.encode([data, 'DROP', revealPubK, 'CHECKSIG']) },
    { script: btc.Script.encode([reclaimPubK, 'CHECKSIG']) }
]
const script = btc.p2tr(btc.TAPROOT_UNSPENDABLE_KEY, scripts, this.net, true);
```

Public keys (schnorr.getPublicKey(privateKey));

```typescript
revealPub:  12eae173c399e16ae46b84f420df96263751c3567ff7e82eaecdaea32297abb5
reclaimPub: 27531e188cdb6313c8d9cc4b989af0b9e821b38d51f649de4fab2fad5d8f9cab
```

Explorer;

* [Commit transaction](https://mempool.space/testnet/tx/0d3b60a186ebc92b9ee7a1905a44479cc9217d576ce803429ed553378620a416)
* [Reveal transaction](https://mempool.space/testnet/tx/068270fbfb41b0ec893ede1777b9007ab0f2f0e2c801cce3919df2a325e98d25)

## Transaction 2

Scripts;

```typescript
const scripts =  [
    { script: btc.Script.encode([data, 'DROP', revealPubK, 'CHECKSIG']) },
    { script: btc.Script.encode([reclaimPubK, 'CHECKSIG']) }
]
const script = btc.p2tr(btc.TAPROOT_UNSPENDABLE_KEY, scripts, this.net, true);
```

Public keys (schnorr.getPublicKey(privateKey));

```typescript
revealPub:  12eae173c399e16ae46b84f420df96263751c3567ff7e82eaecdaea32297abb5
reclaimPub: 27531e188cdb6313c8d9cc4b989af0b9e821b38d51f649de4fab2fad5d8f9cab
```

Explorer;

* [Commit transaction](https://mempool.space/testnet/tx/a9dc02eade42fdb50b6769e26f0e1a6e61aff10241a087c7906b2f58ef76b772)
* [Reveal transaction](https://mempool.space/testnet/tx/068270fbfb41b0ec893ede1777b9007ab0f2f0e2c801cce3919df2a325e98d25)
