---
description: Tools for testing sbtc
---

# Alpha Romeo

Testnet contracts..

```
# clarity-bitcoin-romeo
https://explorer.hiro.so/txid/ST1R1061ZT6KPJXQ7PAXPFB6ZAZ6ZWW28G8HXK9G5.clarity-bitcoin-romeo?chain=testnet
# asset
https://explorer.hiro.so/txid/ST1R1061ZT6KPJXQ7PAXPFB6ZAZ6ZWW28G8HXK9G5.asset?chain=testnet
```

Setup

<pre><code>git clone https://github.com/stacks-network/sbtc.git
cargo install --path romeo
cargo install --path sbtc-cli
less -S ../romeo-demo/state/log.ndjson

<strong>Check bitcoin..
</strong>$ !curl
curl --user devnet --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblockcount", "params": []}' -H 'content-type: text/plain;' http://127.0.0.1:18332
Enter host password for user 'devnet':
{"result":2531766,"error":null,"id":"curltest"}
</code></pre>

Directories

```
stacks-builders
   /sbtc     # project
      /romeo/asset-contract/contracts/asset.clar
   /romeo-demo
      /config.json
      /creds.json
      /state   # logging
```

Run Romeo

```
RUST_LOG=romeo=trace romeo -c config.json
or
romeo -c  config.json
```

sBTC Command line

```
sbtc --help
sbtc generate-from --help
sbtc generate-from new >> creds.json

sbtc deposit --help
sbtc deposit -w cMuQCeA3Ji9vW2pgX4ceRy1bEtvZxUbK4F4CkiFLdLcEFarUhn9R -r ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT -a 1000000000 -d tb1pzgp5punjhs4msn6umw9cycapquah8shrj6uamyu3e6j73e0lxpgq23yzp4
sbtc broadcast --help
```

Configuration

```
$ cat config.json
{
  "state_directory": "./state",
  "contract": "../sbtc/romeo/asset-contract/contracts/asset.clar",
  "wif": "cMuQCeA3Ji9vW2pgX4ceRy1bEtvZxUbK4F4CkiFLdLcEFarUhn9R",
  "bitcoin_node_url": "https://blockstream.info/testnet/api",
  "stacks_node_url": "https://stacks-node-api.testnet.stacks.co",
  "stacks_transaction_fee": 2000,
  "bitcoin_transaction_fee": 2000,
  "contract_name": "romeo_mjc-2"
}
```

See `sbtc generate-from new >> creds.json`

```
$ cat creds.json
{
  "mnemonic": "machine mom fatal tissue organ train theory nothing oven rookie vibrant torch quit unlock donkey siren rude target pudding possible enroll cruise hospital curve",
  "wif": "cMuQCeA3Ji9vW2pgX4ceRy1bEtvZxUbK4F4CkiFLdLcEFarUhn9R",
  "private_key": "0x099e9c2ed90b1c2db27d073327293feb19b74f81895e7eca1a8ad8f081884992",
  "public_key": "0x02d3b316ee46d24bbdbdbe2252ec2889fc7d259ccde716e262e2f22524aac54b4e",
  "stacks_address": "ST3SPZXMPYVNHH3KF0RXNXVX1WVJ3QM1ZMD5FKWDN",
  "bitcoin_taproot_address_tweaked": "tb1pzgp5punjhs4msn6umw9cycapquah8shrj6uamyu3e6j73e0lxpgq23yzp4",
  "bitcoin_taproot_address_untweaked": "tb1p6we3dmjx6f9mm0d7yffwc2yfl37jt8xduutwychz7gjjf2k9fd8qalgv04",
  "bitcoin_p2pkh_address": "n3i8d1bsFK54mw6VYWk8BZt2mGJVfQY5bD"
}
```

Compare...

```
$ sbtc generate-from new > creds.json
$ npx stx get_stacks_wallet_key "..mnenomic from sbtc command.." "m/44'/5757'/0'/0/0" -t
```







