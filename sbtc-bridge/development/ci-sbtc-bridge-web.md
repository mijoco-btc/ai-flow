---
description: >-
  Builds and deploys to staging.sbtc.world / sbtc.world on push/merge to main /
  staging GitHub branches.
---

# CI: sbtc-bridge-web

## GitHub

Setup branch `main` for production. Setup up merge rules;

\--> merge to main from other branches

One approval needed to merge.

Cloudflare recognises `main` as the production branch and merges are automatically built to;

* sbtc.world

Authorisation is possibly needed to access build branches

## Bridge Web App Continuous Integration

Leverage Cloudflare / GitHub integration  (requires Cloudflare to have control over the sbtc.world domain). Main goals;

1. Cloudflare hooks to build any development branch on push
   1. Builds to \<commit-hash>.sbtc-bridge.pages.dev
2. Cloudflare production build - [https://sbtc.world](https://sbtc.world/wrap?net=testnet)

## GCP Changes

### Name Servers

The name servers for sbtc.world domain have been transferred from GCP to Cloudflare

1. GCP --> Cloud Domains --> sbtc.world
   1. Unlock domain
   2. Switch DNSSec off
   3. In DNS Details enter the Cloudflare Name Servers (see below)
      1. annalise.ns.cloudflare.com
      2. ganz.ns.cloudflare.com&#x20;

## Cloudflare Changes

CF Pages had already been configured by @fjs to build on git push/merge to production and non-production branches.&#x20;

1. Add new web site sbtc.world
2. Nameservers displayed needed for GCP above.

Setup DNS for `sbtc.world` and staging.sbtc-bridge.pages.dev;

<figure><img src="../../.gitbook/assets/Screenshot 2023-04-24 at 08.05.32.png" alt=""><figcaption></figcaption></figure>

## Staging

UI tag added to local and staging sites to make them easily distinguishable from production;

![](<../../.gitbook/assets/Screenshot 2023-04-24 at 09.31.12.png>)

## Bridge API

See API description.

## References

1. [Issue #109](https://github.com/Trust-Machines/sbtc-bridge-web/issues/109)
2. [Core Project Plan](https://docs.google.com/document/d/1tpbjU2T8CCkdHIJDq6dGfLQi8sMWIhcbjs9rT\_0Jem0/edit)
3. [DNS Checker](https://dnschecker.org/all-dns-records-of-domain.php?query=sbtc.world\&rtype=ALL\&dns=google)
4. [ICann Registry](https://lookup.icann.org/en)
