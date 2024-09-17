---
description: Cheat sheet for running ord server etc
---

# Runes

1. Run server
2. Create wallet

Index server

```

ord --testnet --datadir . index update --testnet index --http-port 8080
```

Rund server

<pre><code><strong>// Some code
</strong>nohup ord --testnet --index /mnt/bitcoin-testnet/ordinals/testnet3/index.redb server --http-port 8080 >> /mnt/bitcoin-testnet/ordinals/logs/ord-indexer.log &#x26;
</code></pre>

Create wallet

```

ord --testnet wallet --name wallet1 --server-url http://127.0.0.1:8080 create
ord --testnet wallet --name wallet1 --server-url http://127.0.0.1:8080 receive
```





Find the index

```
> sudo find /home/* -name '*.redb'
/home/*/.local/share/ord/index.redb
```

Expose or server

```
// Some code
```
