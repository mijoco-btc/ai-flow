---
description: Bridge construction of the data to sign
---

# Withdrawal Data

### Part 1: Message

The message to sign is constructed from the amount (in satoshis) the user wants to withdraw and their btc address - the cardinal address of the account they signed in with via Hiro/Xverse wallet.

E.g.&#x20;

```
network:testnet
amount: 242 
address: tb1qp8r7ln235zx6nd8rsdzkgkrxc238p6eecys2m9
```

```

const amtBuf = amountToBigUint64(amount, 8);
const net = (network === 'testnet') ? btc.TEST_NETWORK : btc.NETWORK;
const script = btc.OutScript.encode(btc.Address(net).decode(address));
concat(amtBuf, script)
```

gives a message of:

```
message: 00000000000000f2001409c7efcd51a08da9b4e38345645866c2a270eb39
```

### Part 2: Signing

Message is passed to Hiro Wallet

Computes hash of the message with a [prefix defined here](https://github.com/hirosystems/stacks.js/blob/e239c42a88a8df9816be357a81c2882c2d47fc9b/packages/encryption/src/messageSignature.ts#L10);

See stacks/encrytion/hashMessage

```
5071992cc06b8d9465f41fbc4155e18c753c3037984dbc59dd3a04ef6719df5f
```

From this signing with private key for my address;&#x20;

```
<ST1R1061ZT6KPJXQ7PAXPFB6ZAZ6ZWW28G8HXK9G5>
21a7ac825846d024fe29d0db9d9b48b0d520d01398dc4edf0aab15f9b38da27718ddce8a5c6f8bf730858d9619455a68c03338d729b1f623aa1ddb84ee383e6a00
```

finess this for the bug moving the trailing 00 to start;

```
0021a7ac825846d024fe29d0db9d9b48b0d520d01398dc4edf0aab15f9b38da27718ddce8a5c6f8bf730858d9619455a68c03338d729b1f623aa1ddb84ee383e6a
```

### Part 3: Building the Payload

Putting the parts together gives payload;

```
54323e00000000000000f20021a7ac825846d024fe29d0db9d9b48b0d520d01398dc4edf0aab15f9b38da27718ddce8a5c6f8bf730858d9619455a68c03338d729b1f623aa1ddb84ee383e6a
magic(2) + opcode(1) + amtBuf(8) + signature(?)
```















