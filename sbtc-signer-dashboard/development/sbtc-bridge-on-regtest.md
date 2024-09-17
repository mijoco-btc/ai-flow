---
description: Run the bridge and dashboard purely on localhost
---

# sBTC Bridge on Regtest

The project has the following components (the first is in separate repo the other three are subpaths in a mono repo);

* [sBTC Bridge web](https://github.com/Stacks-Builders/sbtc-bridge-web)
* [sBTC Bridge API](https://github.com/Stacks-Builders/sbtc-bridge-api)
* [sBTC Signer Dashboard Web](https://github.com/Stacks-Builders/sbtc-bridge-api)
* [sBTC Signer Dashboard API](https://github.com/Stacks-Builders/sbtc-bridge-api)

and dependencies on ;

* [sBTC Mini](https://github.com/Trust-Machines/stacks-sbtc/tree/main/sbtc-mini)
* Bitcoin Core (Version 24)
* Clarinet

### Step 1: Run all services

Run clarinet integrate;

```
cd stacks-sbtc/sbtc-mini
clarinet integrate
```

Bitcoin regtest (see appendix A for example config)

```
/Applications/Bitcoin-Qt.app/Contents/MacOS/Bitcoin-Qt -regtest -datadir=${home}/Library/Application\ Support/Bitcoin -conf=${home}/Library/Application\ Support/Bitcoin/regtest/bitcoin.conf
```

Run bridge and signer dashboard web apps

```
cd sbtc-bridge-web
npm i // node -v 18.xx
npm run sim
# starts on port 8080

cd sbtc-bridge-api/sbtc-signer-web
npm i // node -v 18.xx
npm run sim
# starts on port 8081
```

Run bridge and signer dashboard api apps;

```
cd sbtc-bridge-api/sbtc-bridge-api
npm i // node -v 19.xx
npm run sim
# starts on port 3010

cd sbtc-bridge-api/sbtc-signer-api
npm i // node -v 19.xx
npm run sim
# starts on port 4010
```

### Step 2: Bootstrap the sBTC Mini Contracts

Add the localhost:3999 network to Hiro wallet

![](<../../.gitbook/assets/Screenshot 2023-08-20 at 11.28.44.png>)

Connect the signer dashboard (localhost:8081) to the deployer account (sbtc-mini/settings/Devnet.toml)

![](<../../.gitbook/assets/Screenshot 2023-08-20 at 11.29.14.png>)

Click the upgrade button and check the transaction confirms;

![](<../../.gitbook/assets/Screenshot 2023-08-20 at 11.26.18.png>)

The Signer Dashboard has a button for this;

![](<../../.gitbook/assets/Screenshot 2023-08-20 at 11.31.47.png>)

### Step 3: Create and fund a regtest descriptor wallet

See Appendix A for examples and config files. Summary of the steps;&#x20;

* Run bitcoin on regtest on a different network to clarinets bitcoind.
* Connect this node to clarinets network
* Create a descriptor wallet
* Generate the descriptor keys
* Generate receiving addresses

For funding the addresses see Appendix B. Check Clarinet sees the newly mined blocks.

#### Appendix A: Run Bitcoin regtest and create descriptor wallet

We need a regtest bitcoin core wallet that connects to the bitcoind running via clarinet integrate. The following config file acheive this;

```
[regtest]
walletdir=~/Bitcoin/regtest/regtest1/wallets
connect=127.0.0.1:18444
port=18445
rpcallowip=0.0.0.0/0
rpcbind=127.0.0.1
rpcport=18446
rpcuser=devnet
rpcpassword=devnet
addresstype=bech32m
changetype=bech32m
```

* Note 1: the ports are different from the clarinet network
* Note 2: connect allows this node to connect to the pre-existing bitcoin network
* addressType allows us to make taproot, bech32m addresses and public keys.

Curl the node and check you have the same block height reported by clarinet.

```
curl --user "devnet:devnet" --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "getblockchaininfo", "params": []}' -H "Content-Type: application/json" http://127.0.0.1:18446
```

**Generate keys in order to create receiving addresses;**

These two links are involved but extremely helpful

* [descriptor wallet](https://www.reddit.com/r/Bitcoin/comments/r37ky5/howto\_create\_and\_use\_a\_taproot\_wallet\_on\_testnet/)
* [https://iancoleman.io/bip39/](https://iancoleman.io/bip39/)

Step 1) create a wallet

```
curl --user "devnet:devnet" --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "createwallet", "params": ["SBTC-0001", false, true, "devnet", false, true, true, false]}' -H "Content-Type: application/json" http://127.0.0.1:18446
```

Step 2) Genrate keys

```
your_mnemonic: now jewel fault pottery tag pond uphold night undo owner split stone
getdescriptorinfo "tr(tprv8ZgxMBicQKsPecRC2CKvGZtyJpUENvhhvgWHkoVSc4ye16qadK41vFggnqY7CVLSNZCYV1PhAZwSA8EeB3zaZhqwQUnaFoy84SuzY7XyXwR/86'/1'/0'/0/*)"
importdescriptors "[{\"desc\":\"tr(tprv8ZgxMBicQKsPecRC2CKvGZtyJpUENvhhvgWHkoVSc4ye16qadK41vFggnqY7CVLSNZCYV1PhAZwSA8EeB3zaZhqwQUnaFoy84SuzY7XyXwR/86'/1'/0'/0/*)#u99f0ylg\",\"active\":true,\"timestamp\":\"now\",\"range\":[0,1000],\"next_index\":1}]"


Note - may need to enter wallet passphrase.. if so 
curl --user "devnet:devnet" --data-binary '{"jsonrpc": "1.0", "id": "curltest", "method": "walletpassphrase", "params": ["devnet", 600]}' -H "Content-Type: application/json" http://127.0.0.1:18446/wallet/SBTC-0001
```

For example...

```

getdescriptorinfo "tr(tprv8ZgxMBicQKsPeqgfUANbfhXW4WLMNypKN1GRv2TPzeGgFW85Qe6NugYvxrEz8WtciakfmTeRGPffAVeAQEFKdB6x58cUHZZuovjiDQ13Vop/86'/1'/0'/0/*)"
{
  "descriptor": "tr(tpubD6NzVbkrYhZ4YJiTMp3C57BcdXrHYK1DwJsDCYVhQv555zNr32uy6BAo922tssmqbSBprzsQQLNPvoXpX4NgrooM96vDFEgUJodDunobrGN/86'/1'/0'/0/*)#mz68h98s",
  "checksum": "jrn37904",
  "isrange": true,
  "issolvable": true,
  "hasprivatekeys": true
}

```

```
importdescriptors "[{\"desc\":\"tr(tprv8ZgxMBicQKsPeqgfUANbfhXW4WLMNypKN1GRv2TPzeGgFW85Qe6NugYvxrEz8WtciakfmTeRGPffAVeAQEFKdB6x58cUHZZuovjiDQ13Vop/86'/1'/0'/0/*)#jrn37904\",\"active\":true,\"timestamp\":\"now\",\"range\":[0,1000],\"next_index\":1}]"
[
  {
    "success": true
  }
]
```

Change addresses - require import descriptors with&#x20;

* internal: true
* next\_index: 1001

{% code fullWidth="true" %}
```
importdescriptors "[{\"internal\":true,\"desc\":\"tr(tprv8ZgxMBicQKsPeqgfUANbfhXW4WLMNypKN1GRv2TPzeGgFW85Qe6NugYvxrEz8WtciakfmTeRGPffAVeAQEFKdB6x58cUHZZuovjiDQ13Vop/86'/1'/0'/0/*)#jrn37904\",\"active\":true,\"timestamp\":\"now\",\"range\":[0,2000],\"next_index\":1001}]"
[
  {
    "success": true
  }
]
```
{% endcode %}

Step 3)

Generate addresses - use the console, curl, or..

```
bitcoin-cli -regtest -rpcwallet=SBTC-0001 -rpcport=18446 -rpcuser=devnet -rpcpassword=devnet getnewaddress
```



#### Appendix B: Mine Regtest Bitcoin

Perform actions in appendix A and then generate a new address.

Create two wallets, one for a user, say Alice and one for the peg wallet.

```
> getnewaddress bech32m
bcrt1pchhfwmj342k49wrv0z2gflls4qvy9fwnhx8try7lpamu5frw7hescesplf
```

then mine some bitcoin to this address using the cli.

```
bitcoin-cli -regtest -rpcuser=devnet -rpcpassword=devnet -rpcport=18446 generatetoaddress 100 bcrt1pchhfwmj342k49wrv0z2gflls4qvy9fwnhx8try7lpamu5frw7hescesplf

bitcoin-cli -regtest -rpcuser=devnet -rpcpassword=devnet -rpcport=18446 generate 50
```

#### Appendix C: Alias for running bitcoin regtest on mac

```
alias bitcoin-regtest
/Applications/Bitcoin-Qt.app/Contents/MacOS/Bitcoin-Qt -regtest -datadir=${home}/Library/Application\ Support/Bitcoin -conf=${home}/Library/Application\ Support/Bitcoin/regtest/bitcoin.conf
```



