---
description: Nakamoto from source code as of 27/03/24
---

# Stacks 2.5 - Nakamoto Public Testet

### Set up environment&#x20;

* Ubuntu 23.10 mantic 4Gb and 2 CPU cores
* 295G volume mounted at `/mnt/nakamoto-testnet`
* [Stacks Core](https://github.com/stacks-network/stacks-core/tree/2.05.0.5.1-rc1) (clone then  git switch 2.05.0.5.1-rc1 or newer)
* [Stacks Blockchain API](https://github.com/hirosystems/stacks-blockchain-api/tags) (clone then  git switch to v7.10.0-nakamoto.2 or newer)
* Signer Binary (part of stacks core)
* [Custom configuration](configurations.md) (based on [reference docs](https://docs.stacks.co/nakamoto-upgrade/signing-and-stacking/sample-configuration-files))

#### Stacks node and signer binary

First make a keychain (keep this private!)

```
npm install --global @stacks/cli
stx make_keychain -t > cli_keychain.json
```

The private key needs to be added to the signer-config.toml file before running the stacks node - see the [reference docs](https://docs.stacks.co/nakamoto-upgrade/signing-and-stacking/sample-configuration-files) and the nested configurations page for this example.

```
# Prepare stacks-core

cd /mnt/nakamoto-testnet
git clone https://github.com/stacks-network/stacks-core.git
mv stacks-core stacks-core-2.5.0.0.0-rc1
ln -s stacks-core-2.5.0.0.0-rc1 stacks-core
cd stacks-core
git switch 2.5.0.0.0-rc1 --detach
git status
```

Install sqlite3

```
sudo apt update
sudo apt install sqlite3
```

Run the stacks node (note: if running the API then jump forward and start the API first)

```
cd /mnt/nakamoto-testnet/stacks-core && nohup cargo run --bin stacks-node -- start --config /mnt/nakamoto-testnet/stacks-core/testnet/stacks-node/conf/testnet-signer-conf.toml  >> /mnt/nakamoto-testnet/logs/stacks-node.log &
```

Run the signer binary

```
cd /mnt/nakamoto-testnet/stacks-core && nohup cargo run --bin stacks-signer run --config /mnt/nakamoto-testnet/stacks-core/testnet/stacks-node/conf/signer-config.toml  >> /mnt/nakamoto-testnet/logs/signer-binary.log &
```

#### Stacks blockchain api - **not necessary for pure signer use cases**.

```
# Prepare stacks-blockchain-api

git clone https://github.com/hirosystems/stacks-blockchain-api.git
git switch v7.10.0-nakamoto.2 --detach
cd ../
mv stacks-blockchain-api stacks-blockchain-api-v7.10.0-nakamoto.2
ln -s stacks-blockchain-api-7.10.0-nakamoto.2 stacks-blockchain-api
cd stacks-blockchain-api
# See nested configurations doc for the .env parameters
echo "GIT_TAG=$(git tag --points-at HEAD)" >> .env
npm install
npm run build
npm prune --production
```

Run the API&#x20;

```
cd /mnt/nakamoto-testnet/stacks-blockchain-api && nohup node ./lib/index.js >> /mnt/nakamoto-testnet/logs/stacks-api.log &
```

### Generate signatures

Signatures assert your identity, reward address, locking address and stacking preferences. They are passed into the pox-4 contract to set up your stacking info.

Two ways

1. Use the **signer-binary** on your server

```
# generate
cd /mnt/nakamoto-testnet/stacks-core
cargo run --bin stacks-signer \
generate-stacking-signature \
--pox-address tb1qwe9ddxp6v32uef2v66j00vx6wxax5zat223tms \
--reward-cycle 30 --method stack-stx \
--period 2 --max-amount 10000 \
--auth-id 12345 \
--config /mnt/nakamoto-testnet/stacks-core/testnet/stacks-node/conf/signer-config.toml
```

2. Use stacks.js

Easy way for this during testing (the signature generation will be moved inside a wallet at some point where your private key is stored securely) is to use this web form to create the signature: [https://nakamoto.stx.eco/signers](https://nakamoto.stx.eco/signers)
