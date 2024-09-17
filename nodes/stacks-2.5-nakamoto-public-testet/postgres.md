---
description: For the stacks blockchain api
---

# Postgres

Postgres management / installation

```
# purge / install postgres
sudo apt-get --purge remove postgresql postgresql-*
sudo apt install postgresql-15

# status
pg_lsclusters
/etc/init.d/postgresql status
sudo service postgresql status

# stop start
/etc/init.d/postgresql stop
/etc/init.d/postgresql start
/etc/init.d/postgresql restart
```

Configuration (on detachable volume)

```
# set data directory on volume
$ sudo vi /etc/postgresql/15/main/postgresql.conf
data_directory = '/mnt/bitcoin-testnet/stacks-testnet/postgres/postgresql/15/main'
sudo rsync -av /var/lib/postgresql /mnt/nakamoto-testnet/postgres

# set root password
sudo -u postgres psql
postgres=# \password .....

# change access to md5
$ sudo vi /etc/postgresql/15/main/pg_hba.conf
local   all             postgres                                md5


```

Load stacks blockchain api from archive

```
# to load an achived data dump for fast catch up
CREATE DATABASE stacks_blockchain_api WITH OWNER='postgres' TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';

```

Housekeeping

```
# Sanity check the db size against expectations (testnet / mainnet)
SELECT pg_size_pretty( pg_database_size('stacks_blockchain_api') );

select max(block_height) from stacks_blockchain_api.blocks;

```

Postgres in docker

```
# Postgres docker load data dump
# note passwords should be supplied from environment

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
