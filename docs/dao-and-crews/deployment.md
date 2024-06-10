---
description: Deployment related information
---

# Deployment

## Introduction

First goal is a shared devnet environment.

Clarinet ports in settings/Devnet.toml are bumped up by 2 to allow the devnet and testnet to run onn same server.

Setup uses;

1. nginx as a reverse proxy to stacks / bitcoin services
2. letsencrypt to enable ssl connections
3. port forwarding is used if needed allow Leather wallet to connect to remote devnet

### SSL & Nginx

Uses subdomains of stx.eco to keep things organised. Linked and certs created using certbot as follows;

```

sudo ln -sf "/etc/nginx/sites-available/devnet.stx.eco" "/etc/nginx/sites-enabled"
sudo ln -sf "/etc/nginx/sites-available/devnet-stacks.stx.eco" "/etc/nginx/sites-enabled"
sudo ln -sf "/etc/nginx/sites-available/devnet-stacks-explorer.stx.eco" "/etc/nginx/sites-enabled"
sudo ln -sf "/etc/nginx/sites-available/devnet-bitcoin-explorer.stx.eco" "/etc/nginx/sites-enabled"


sudo certbot --nginx certonly --cert-name devnet.stx.eco \
-d devnet.stx.eco \
-d devnet-stacks.stx.eco \
-d devnet-stacks-explorer.stx.eco \
-d leibniz.brightblock.org \
-d testnet.bridge.sbtc.tech

-d devnet-electrs.stx.eco \
-d devnet-bitcoin-explorer.stx.eco \
```

Note: stacks explorer requires an additional network connections and possibly port forwarding



