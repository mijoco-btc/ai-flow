# Counting Votes

1. Fetch a [summary](https://mainnet.bridge.sbtc.tech/bridge-api/v1/dao/results/summary)
2. Index the [cycle](https://mainnet.bridge.sbtc.tech/bridge-api/v1/pox/sync/pox-entries/79) (syncs pox data map)
3. Sync [nmongon-stacker votes](https://mainnet.bridge.sbtc.tech/bridge-api/v1/dao/sync/results/non-stackers) - note due to a bug this doesn't add new so you need to remove the existing non-stacker votes (see below)
4. Pool stackers;
   1. read [pool-stacker](https://mainnet.bridge.sbtc.tech/bridge-api/v1/dao/sync/results/pool-stackers/raw) votes
   2. read [vote weights](https://mainnet.bridge.sbtc.tech/bridge-api/v1/dao/sync/results/pool-stacker-amounts)
5. Solo stackers;
   1. read [solo stacker](https://mainnet.bridge.sbtc.tech/bridge-api/v1/dao/sync/results/solo-stackers/raw) votes
   2. read [vote weights](https://mainnet.bridge.sbtc.tech/bridge-api/v1/dao/sync/results/solo-stacker-amounts/false)



```
// mongo commands
db.proposalVotes.countDocuments({event:'vote'})

```
