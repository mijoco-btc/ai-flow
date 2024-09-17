---
description: Cheat sheet for syncing testnet from archive
---

# Stacks 2.5 - Public Testnet

### Resources

Get the latest data files from [Hiro archives](https://archive.hiro.so/) following Hiro documentation for a) [running stacks](https://docs.hiro.so/hiro-archive/guides/use-stacks-blockchain-archive) node and b) [running API node](https://docs.hiro.so/hiro-archive/guides/use-stacks-blockchain-api-archive) from archived data and noting Hiro [product updates](https://docs.hiro.so/nakamoto).

This how to uses the following archives;

1. [Stacks 2.5 Rc0 testnet](https://archive.hiro.so/testnet/stacks-blockchain/testnet-stacks-blockchain-2.5.0.0.0-rc1-latest.tar.gz)
2. [Stacks API latest testnet](https://archive.hiro.so/testnet/stacks-blockchain-api-pg/stacks-blockchain-api-pg-15-7.10.0-beta.1-latest.dump)

### Procedure

At a glance;

1. Stacks blockchain data
   * download and extract archive (20 mins o testnet)
   * unpack into 'working\_dir' in stacks node config file
2. Stacks blockchain API data
   * download dumpfile
   * use pg\_restore to load the data into postgres (20 mins on testnnet)
   * run the api node
3. clone stacks blockchain and switch to current (2.05) release candidate
   * cargo build
   * run the node
   * run the signer







