---
description: How to devops for indexing ordinals
---

# Indexers

## Hiro Indexer

### Ordinals API

See [https://github.com/hirosystems/ordinals-api](https://github.com/hirosystems/ordinals-api)

### Ord Hook

[Installation](https://github.com/hirosystems/ordhook):&#x20;

```
// Install rockdb

> git clone https://github.com/hirosystems/ordhook.git
> sudo apt-get install librocksdb-dev
> sudo apt install -y clang
> cargo ordhook-install
> cargo ordhook-install
> cargo ordhook-install
```

Generate the config (see [chainhook openapi](https://github.com/hirosystems/chainhook/blob/develop/docs/chainhook-openapi.json) spec)

```
// update the config for local bitcoind
> ordhook config new --testnet
```
