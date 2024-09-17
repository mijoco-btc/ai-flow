---
description: Stacks node and api
---

# Stacks 2.4

* sync using [Hiro archive](https://docs.hiro.so/hiro-archive?\_gl=1\*quxa2d\*\_ga\*MTM3MTg0MDI1OS4xNjk2MzQzNDIx\*\_ga\_1B162FWYJM\*MTcxMDkzMjAwMi43LjEuMTcxMDkzMzEwMS4wLjAuMA..#restoring-the-stacks-blockchain-node-using-the-hiro-archive)
* build and run [stacks node](https://github.com/stacks-network/stacks-core/tree/master?tab=readme-ov-file)
* run api node

### Power on

Leibniz;

```
btc-start-testnet

docker start bridge_api_staging
docker start revealer_api_staging

cd /mnt/bitcoin-testnet/stacks-testnet/stacks-blockchain-api
sn-run-api

cd /mnt/bitcoin-testnet/stacks-testnet/stacks-core/testnet/stacks-node
sn-run

check https://leibniz.brightblock.org/v2/info
```

Spinoza

```
btc-start-mainnet

docker start bridge_api_production
docker start revealer_api_production

cd /mnt/stacks-mainnet/stacks-blockchain-api
sn-run-api

cd /mnt/stacks-mainnet/stacks-core/testnet/stacks-node
sn-run

check https://spinoza.brightblock.org/v2/info
```

### Archives

```
//data
wget https://archive.hiro.so/testnet/token-metadata-api-pg/token-metadata-api-pg-15-latest.dump
wget https://archive.hiro.so/testnet/stacks-blockchain/testnet-stacks-blockchain-latest.tar.gz
wget https://archive.hiro.so/testnet/stacks-blockchain-api-pg/stacks-blockchain-api-pg-15-latest.dump
```

Extract data

```

cd /mnt/bitcoin-testnet/stacks-testnet/archives
tar -zxvf testnet-stacks-blockchain-latest.tar.gz -C ../
```

Extract code

```
// code -> https://github.com/stacks-network/stacks-core/releases/tag/2.4.0.1.0
wget https://github.com/stacks-network/stacks-core/releases/download/2.4.0.1.0/linux-glibc-x64.zip
tar -zxvf 2.4.0.1.0.tar.gz -C ../

wget https://github.com/hirosystems/stacks-blockchain-api/archive/refs/tags/v7.9.0.tar.gz
tar -zxvf v7.9.0.tar.gz -C ../

ln -s stacks-core-2.4.0.1.0 stacks-core
ln -s stacks-blockchain-api-7.9.0 stacks-blockchain-api
```

### Configure stacks node

```

// node expects data -> working_dir + / + mode
cat /mnt/bitcoin-testnet/stacks-testnet/stacks-core-2.4.0.1.0/testnet/stacks-node/conf/testnet-follower-conf.toml
1. working_dir = "/mnt/bitcoin-testnet/stacks-testnet"
2. uncomment events secions
```

Manage stacks node

<pre><code><strong>
</strong><strong>> sn-run   // nohup cargo run --bin stacks-node -- start --config ./conf/testnet-follower-conf.toml &#x26;
</strong>> sn-tail  // tail -f -n 50 /mnt/bitcoin-testnet/stacks-testnet/stacks-core/testnet/stacks-node/nohup.out
> sn-stop  // sudo kill $(ps -ef | grep "stacks-node start --config" | grep -v grep | awk {'print $2'})
> sn-check-api // ps -ef | grep "stacks-node start --config" | grep -v grep

// check
http://spinoza.brightblock.org:20443/v2/info # mainnet
http://leibniz.brightblock.org:20443/v2/info # testnet
</code></pre>

### Api as docker

Environment (.env)

```
NODE_ENV=production
GIT_TAG=master
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
PG_DATABASE=postgres
STACKS_CHAIN_ID=0x80000000
V2_POX_MIN_AMOUNT_USTX=90000000260
STACKS_CORE_EVENT_PORT=3700
STACKS_CORE_EVENT_HOST=0.0.0.0
STACKS_BLOCKCHAIN_API_PORT=3999
STACKS_BLOCKCHAIN_API_HOST=0.0.0.0
STACKS_BLOCKCHAIN_API_DB=pg
STACKS_CORE_RPC_HOST=localhost
STACKS_CORE_RPC_PORT=20443
BNS_IMPORT_DIR=/bns-data
```

Docker command

```

docker run -d --rm \
  --name stacks-blockchain-api \
  --net=stacks-blockchain \
  --env-file $(pwd)/.env \
  -v $(pwd)/bns:/bns-data \
  -p 5432:5432 \
  -p 20443:20443 \
  -p 20444:20444 \
  -p 3700:3700 \
  -p 3999:3999 \
  blockstack/stacks-blockchain-api
```

### Api as service

see [here](https://github.com/hirosystems/stacks-blockchain-api/blob/5aab1efd9832a420ca07d98786dff4ac0d9f231f/running\_api\_from\_source.md?plain=1#L121) (requires nodejs, see below) run [api from source](https://github.com/hirosystems/stacks-blockchain-api/blob/develop/running\_api\_from\_source.md)

<pre><code>
git clone https://github.com/hirosystems/stacks-blockchain-api.git
git switch v7.8.2 --detach
ln -s stacks-blockchain-api-7.8.2 stacks-blockchain-api

cd stacks-blockchain-api
echo "GIT_TAG=$(git tag --points-at HEAD)" >> .env
npm install
<strong>npm run build
</strong>npm prune --production

</code></pre>

Import from tsv file

```
node ./lib/index.js import-events --file /mnt/bitcoin-testnet/stacks-testnet/archives/testnet-stacks-blockchain-api-7.8.2-20240322.tsv  --wipe-db --force
```

Manage api service

```
> sn-run-api
> sn-tail-api
> sn-stop-api // sudo kill $(ps -ef | grep "lib/index.js" | grep -v grep | awk {'print $2'})
> sn-check-api // ps -ef | grep "lib/index.js" | grep -v grep
```

### Postgres docker

Mount on partition and load dump file

```

docker run -d --rm --name postgres --net=stacks-blockchain -e POSTGRES_PASSWORD=postgres -v /mnt/bitcoin-testnet/stacks-testnet/postgres-docker:/var/lib/postgresql/data -p 5432:5432 postgres:alpine

# copy dump file inside
docker cp /mnt/bitcoin-testnet/stacks-testnet/archives/stacks-blockchain-api-pg-15-latest.dump postgres:/stacks-blockchain-api-pg-15-latest.dump
docker cp /mnt/bitcoin-testnet/stacks-testnet/archives/token-metadata-api-pg-15-latest.dump postgres:/token-metadata-api-pg-15-latest.dump

# shell into container
docker exec -it postgres bash

# restore it from within
psql -U postgres

create database token_metadata_api;
pg_restore --username postgres --verbose --jobs 4 --dbname stacks_blockchain_api /mainnet-stacks-blockchain-api-7.8.2-20240325.gz
pg_restore --username postgres --verbose --jobs 4 --dbname token_metadata_api /token-metadata-api-pg-15-latest.dump

# delete the dump file at end as this is on server storage
rm /stacks-blockchain-api-pg-15-latest.dump

```

### Postgres service

Remove old versions

```
sudo apt-get --purge remove postgresql postgresql-*

```

Install postgres

```

// see https://monovm.com/blog/install-postgresql-on-debian/
> sudo apt install postgresql-15
```

Creta stacks\_blockchain\_api

```

CREATE DATABASE stacks_blockchain_api WITH OWNER='postgres' TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
```

Change data directory

```

> sudo vi /etc/postgresql/15/main/postgresql.conf
data_directory = /mnt/postgres/
```

Testnet mainnet differences

```
\c stacks_blockchain_api

// testnet: displays tables list
select max(block_height) from stacks_blockchain_api.blocks;
  max
--------
 152035
 
\dt
                  List of relations
 Schema |          Name           | Type  |  Owner
--------+-------------------------+-------+----------
 public | blocks                  | table | postgres
 public | burnchain_rewards       | table | postgres
 ...
 
 \z
                                                Access privileges
 Schema |              Name              |       Type        | Access privileges | Column privileges | Policies
--------+--------------------------------+-------------------+-------------------+-------------------+----------
 public | blocks                         | table             |                   |                   |
 public | burnchain_rewards              | table             |                   |                   |
 public | burnchain_rewards_id_seq       | sequence          |                   |                   |
 
// mainnet: nothing displayed

select max(block_height) from stacks_blockchain_api.blocks;
  max
--------
 144031
 
\dt
Did not find any relations.

\z
                            Access privileges
 Schema | Name | Type | Access privileges | Column privileges | Policies
--------+------+------+-------------------+-------------------+----------
(0 rows)
```

Load dump file

```

// export PGPASSWORD=..
# pg_restore --username postgres --verbose --jobs 4 --dbname stacks_db 
pg_restore --username=postgres --verbose --jobs=4 -d stacks_blockchain_api  /mnt/bitcoin-testnet/stacks-testnet/archives/mainnet-stacks-blockchain-api-7.8.2-20240325.gz

SELECT pg_size_pretty( pg_database_size('stacks_blockchain_api') );

```

Postgres as service

```
/etc/init.d/postgresql stop
/etc/init.d/postgresql start
/etc/init.d/postgresql restart

pg_lsclusters
/etc/init.d/postgresql status
sudo service postgresql restart ?
```

Change passwords

```

> sudo -u postgres psql postgres
postgres=# \password postgres
Enter new password for user "postgres":
Enter it again:
```

Enable connections see [fix](https://stackoverflow.com/questions/18664074/getting-error-peer-authentication-failed-for-user-postgres-when-trying-to-ge);

```

> sudo vi /etc/postgresql/15/main/pg_hba.conf

This line:

local   all             postgres                                peer
Should be:

local   all             postgres                                md5

> /etc/init.d/postgresql restart
```

Manage data directory

```
> sudo -u postgres psql
postgres=# show data_directory;
> sudo systemctl stop postgresql
> sudo mkdir /mnt/postgres
> sudo rsync -av /var/lib/postgresql /mnt/bitcoin-testnet/stacks-testnet/postgres
> sudo vi /etc/postgresql/15/main/postgresql.conf
```

### Install nodejs

```
sudo apt update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm --version // exit terminal
nvm install node
node --version
nvm install --lts
nvm ls

```

Running Event Replay

Verion 2: setup python etc

Note on leibniz (4G) process is **Killed by Kernal** (see dmesg)

```

git clone https://github.com/hirosystems/stacks-event-replay.git
wget https://archive.hiro.so/testnet/stacks-blockchain-api/testnet-stacks-blockchain-api-7.8.2-20240322.gz
cd stacks-event-replay/
sudo apt-get install python3-pip
sudo apt-get install python3-pandas
sudo apt-get install python3-numpy

# Ran on mac book pro 32G  - Ubuntu 8G is too little memory to run this.
python3 -m event_replay --tsv-file ../testnet-stacks-blockchain-api-7.8.2-20240322.gz

rsync -aP events bob@leibniz.brightblock.org:/mnt/bitcoin-testnet/stacks-testnet/events-9.8.2/

$ STACKS_EVENTS_DIR="/mnt/bitcoin-testnet/stacks-testnet/events-9.8.2/events" NODE_OPTIONS="--max-old-space-size=4096" STACKS_CHAIN_ID=2147483648 node ./lib/index.js from-parquet-events --workers=2

```
