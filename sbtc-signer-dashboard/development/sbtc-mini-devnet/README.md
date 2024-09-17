# sBTC Mini Devnet

## Update

Update the contract code

```
> ssh russell
> cd hubgit/stacks-sbtc
> git fetch
> git pull
```

stop clarinet

```
> ps -elf | grep -i clarinet
> kill -9 pid

// check for stopped containers..
> docker ps -a
> docker rm -f <container>
```

run clarinet with new code:

```
// 1. foreground
> docker ps -a
```







## VM Setup

First, spin up a new Ubuntu instance [install brew](https://docs.brew.sh/Homebrew-on-Linux) and use brew to [install clarinet](https://docs.hiro.so/smart-contracts/clarinet#installing-from-homebrew-macos-and-linux).

```
   90  sudo apt install brew
   91  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   92  eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
   94  brew install gcc
   95  brew install clarinet
   21  brew install git
```

Install nginx (or caddy if prefer)

```
  174  sudo apt install nginx
  176  sudo ufw allow 'Nginx HTTP'
  178  systemctl status nginx
  179  sudo vi /etc/nginx/nginx.conf
  180  sudo vi /etc/nginx/sites-enabled/default
```

Setup reverse proxies to the services running under clarinet;

```
	upstream stacksexp {
		server 127.0.0.1:8000;
	}
	upstream stacksapi {
		server 127.0.0.1:3999;
	}
	upstream stacksnode {
		server 127.0.0.1:20443;
	}
```

and then configure the virtual hosts.

## Devnet Wallet Setup

Deployer: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM

**Hiro web wallet**

Standard keys used from settings/Devnet.toml or create your own (I can supply devnet stx for transactions)

**Network**

* name: devnet-stx
* url: http://devnet.stx.eco
* key: devnet.stx.eco

### 2 Run Clarinet Integrate

```
git clone https://github.com/Stacks-Builders/stacks-sbtc.git
cd hubgit/stacks-sbtc/sbtc-mini/
nohup RUST_BACKTRACE=full clarinet integrate --no-dashboard &
```

## Issues

#### Explorer http://devnet.stx.eco

Problem running the explorer - unable to override basePath variable. As a result the explorer tries to call back to localhost:3999 instead of devnet.stx.eco:3999

#### allow-contract-caller

Attempt to get delegate to the sbtc-stacking-pool:

```
Jul  4 17:24:18.315996 INFO Contract-call processed with runtime error, 
contract_name: ST000000000000000000002AMW42H.pox-2, 
function_name: allow-contract-caller, 
function_args: [ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-stacking-pool, (some u1516)], 
error: Interpreter(Runtime(DefunctPoxContract, None))

WARN PoX-2 function call attempted on an account after Epoch 2.2, v2_unlock_ht: 123, current_burn_ht: 362, function_name: allow-contract-caller, contract_id: ST000000000000000000002AMW42H.pox-2
```

I've run this successfully with btc-stacking-pool calling the pox-3 contract BUT reading the delegation back returns none;

```
DelegationInfo:  { type: '(optional none)', value: null }
```

#### get-current-window

sbtc-stacking-pool/get-current-window

```
[0] error:  Cannot read properties of undefined (reading 'readUInt8Enum')
[0] getCurrentWindow:  {
[0]   okay: false,
[0]   cause: 'Unchecked(CostBalanceExceeded(ExecutionCost { write_length: 0, write_count: 0, read_length: 153932, read_count: 12, runtime: 157642 }, ExecutionCost { write_length: 0, write_count: 0, read_length: 100000, read_count: 30, runtime: 1000000000 }))'
[0] }
```

#### Delegation

```
Jul 14 05:40:00.125954 INFO Runloop: Synchronized full burnchain up to height 27813. Proceeding to mine blocks
Jul 14 05:40:00.239265 INFO Contract-call successfully processed, contract_name: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pox-3, function_name: allow-contract-caller, function_args: [ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-stacking-pool, (some u55980)], return_value: (ok true), cost: ExecutionCost { write_length: 130, write_count: 1, read_length: 68136, read_count: 4, runtime: 76182 }

```

returns

```
callContractReadOnly: http://devnet.stx.eco/v2/contracts/call-read/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM/pox-3/get-check-delegation
callContractReadOnly:  { okay: true, result: '0x09' }
getDelegationInfo:  { type: '(optional none)', value: null }
GET /signer-api/testnet/v1/pox/get-delegation-info/ST2ST2H80NP5C9SPR4ENJ1Z9CDM9PKAJVPYWPQZ50 200 - - 90.417 ms

```









