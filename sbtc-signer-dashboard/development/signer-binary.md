---
description: Ubuntu environment for running signer binary
---

# Signer Binary

## URL Access

Services can be accessed via

<table><thead><tr><th width="173">Service</th><th></th></tr></thead><tbody><tr><td>Stacks Testnet</td><td><a href="http://45.79.131.55:3999/v2/info">http://45.79.131.55:3999/v2/info</a></td></tr><tr><td>Stacks Mainnet</td><td><a href="http://45.79.149.203:3999/v2/info">http://45.79.149.203:3999/v2/info</a></td></tr><tr><td>Bitcoin Testnet*</td><td>curl --user **** --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblockcount", "params": []}' -H 'content-type: text/plain;' http://45.79.131.55:18332</td></tr><tr><td>Bitcoin Mainnet*</td><td>curl --user **** --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblockcount", "params": []}' -H 'content-type: text/plain;' http://45.79.131.55:8332</td></tr></tbody></table>

\*from allowed IPs

## Servers

`Note: two stacks instances (testnet/mainnet) cannot be run comfortably on single (ubuntu/debian) server.`

### Bitcoin Testnet

Server: Chomsky : 45.79.131.55

RPC config

```
rpcport=18332
rpcbind=0.0.0.0
rpcallowip=172.17.0.1/16
rpcallowip=192.168.145.175/16
rpcallowip=170.187.160.251
rpcallowip=45.79.149.203
```

### Stacks Testnet

Server: Chomsky : 45.79.131.55

RPC config: default

### Bitcoin Mainnet

Server: Chomsky : 45.79.131.55

RPC config

```
// Some code
rpcport=8332
rpcbind=0.0.0.0
rpcallowip=127.0.0.1
rpcallowip=192.168.145.175
rpcallowip=45.79.149.203
```

### Stacks Mainnet

Server: Spinoza : 45.79.149.203

RPC config: default except for

```
// Some code
BTC_HOST=45.79.131.55
BTC_RPC_USER=****
BTC_RPC_PASS=****
```

Note: this connection over public IP will move to a  LAN IP 192.168.145.175 when chomsky can be restarted.

## Storage

Storage on spinoza is 80G - adequate for the stacks mainnet node.&#x20;

Chomsky is connected to an external 800G block of storage - adequate for running bitcoin testnet and mainnet as well as ordinals and electrumx services, plus stacks mainnet.

The block storage can only be connected to one server at a time.

## Costs

See [Linode calculator](https://cloud-estimator.linode.com/s/)

| Item          | Type           | Cost (USD) |
| ------------- | -------------- | ---------- |
| Chomsky       | 16G Shared CPU | 96         |
| Spinoza       | 4G Shared CPU  | 24         |
| Block Storage | 810 G          | 81         |

