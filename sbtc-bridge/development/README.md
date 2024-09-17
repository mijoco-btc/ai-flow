---
description: Technical plans
---

# Development

### Background

The sBTC bridge and API applications have been developed so far on two separate stacks for the staging and production environments.

Using Linode (Akamai) supported the initial prototyping and bootstrapping phase but maintaining this going forward will dilute the skillsets and focus required to set up a robust CI for the Bridge project. This means some devops work will be ongoing to achieve the following goals.

* Geographical load balancing of client and api applications
* Support for multiple networks (testnet, mainnet) within single client application
* Support for full, multiple blockchain nodes (stacks, bitcoin / testnet, mainnet)
* Support additional indexers (Electrumx, Bitcoin Sync etc)
* Redundancy in the data layer
* Scalability of the API and DB layers
* Backup / restore data features

### CI Definition

Branches for building the staging and production branches;

* `staging` for staging
* `main` for production

#### Client CI

1. Client deploys on PR merge to `staging` branch assuming all CI checks pass
2. Staging client has stable ssl URL e.g. https://staging.sbtc.world
3. Client deploys on PR merge to `main` branch assuming all CI checks pass
4. Production client has stable ssl URL e.g. https://sbtc.world
5. Staging and production clients are hosted in GCP
6. Staging/prod static client bundles stored/load balanced from GCP Storage
7. Transient development build (PRs etc) use Cloudflare for running integrity checks

#### API CI

1. Use GCP Kubernetes cluster for running the API
2. The cluster provides scalability, redundancy and availability of the api as needed via configuration.
3. Use Mongo Cloud for running the database.

### Migrate Web Hosting from GCP to Cloudflare

Note:

1. Switch off DNSSEC on the domain at GCP
2. Set Cloudflare NameServers in Google DNS

Tried various things over the course of the weekend of 22/23rd April. But the nameserver switch from Googla to Cloudflare is hanging.

1.  **Remove** the following nameservers

    ```
    ns-cloud-d1.googledomains.com
    ```

    ```
    ns-cloud-d2.googledomains.com
    ```

    ```
    ns-cloud-d3.googledomains.com
    ```

    ```
    ns-cloud-d4.googledomains.com
    ```
2.  **Add** Cloudflare's nameservers

    ```
    arya.ns.cloudflare.com
    ```

    Click to copy

    ```
    fonzie.ns.cloudflare.com
    ```

    Click to copy

But as far as GCP Network Services is concerned they reside with cloudflare;

| annalise.ns.cloudflare.com. |   |
| --------------------------- | - |
| ganz.ns.cloudflare.com.     |   |

And [independent NS check](https://dnschecker.org/all-dns-records-of-domain.php?query=sbtc.world\&rtype=NS\&dns=google) also indicates the nameservers reside with Cloudflare.

This might require a ticket with Cloudflare support to resolve

Note: In Google cloud domains - locate the domain and unlock the domain for transfer. Check [https://lookup.icann.org/en/lookup](https://lookup.icann.org/en/lookup) for confirmation the domain is not in clientTransferProhibited.

#### GCP Cloud DNS records;

<table data-header-hidden><thead><tr><th></th><th width="158"></th><th></th><th></th></tr></thead><tbody><tr><td>Type</td><td>TTL (seconds)</td><td>Routing policy</td><td></td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/api.mainnet.sbtc.world./A/view?project=core-eng">api.mainnet.sbtc.world.</a></td><td>A</td><td>300</td><td>34.96.125.8</td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/api.sbtc.world./A/view?project=core-eng">api.sbtc.world.</a></td><td>A</td><td>300</td><td>34.96.125.8</td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/api.testnet.sbtc.world./A/view?project=core-eng">api.testnet.sbtc.world.</a></td><td>A</td><td>300</td><td>34.96.125.8</td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/sbtc.world./A/view?project=core-eng">sbtc.world.</a></td><td>A</td><td>300</td><td>162.159.38.234</td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/sbtc.world./NS/view?project=core-eng">sbtc.world.</a></td><td>NS</td><td>21600</td><td><p></p><ul><li>ns-cloud-d1.googledomains.com.</li><li>ns-cloud-d2.googledomains.com.</li><li>ns-cloud-d3.googledomains.com.</li><li>ns-cloud-d4.googledomains.com.</li></ul></td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/sbtc.world./SOA/view?project=core-eng">sbtc.world.</a></td><td>SOA</td><td>21600</td><td>ns-cloud-d1.googledomains.com. cloud-dns-hostmaster.google.com. 1 21600 3600 259200 300</td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/sbtc.world./TXT/view?project=core-eng">sbtc.world.</a></td><td>TXT</td><td>300</td><td><p>"google-site-verification=xQlbxDaTTo7EIzjjjhQJn4fYFWnZSn5sMlDBaEFEy4U"</p><p>"google-site-verification=_hHMvQ3EVCmqas_DeDrDrQbm26ele1yVVjjFuHTAePk"</p></td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/staging.sbtc.world./A/view?project=core-eng">staging.sbtc.world.</a></td><td>A</td><td>300</td><td>23.239.9.92</td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/www.sbtc.world./A/view?project=core-eng">www.sbtc.world.</a></td><td>A</td><td>300</td><td>162.159.38.234</td></tr></tbody></table>

<table data-header-hidden><thead><tr><th width="249"></th><th></th><th></th><th width="276"></th></tr></thead><tbody><tr><td>DNS name</td><td>Type</td><td>TTL (seconds)</td><td>Routing policy</td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/api.mainnet.sbtc.world./A/view?project=core-eng">api.mainnet.sbtc.world.</a></td><td>A</td><td>300</td><td>34.96.125.8</td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/api.sbtc.world./A/view?project=core-eng">api.sbtc.world.</a></td><td>A</td><td>300</td><td>34.96.125.8</td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/api.testnet.sbtc.world./A/view?project=core-eng">api.testnet.sbtc.world.</a></td><td>A</td><td>300</td><td>34.96.125.8</td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/sbtc.world./SOA/view?project=core-eng">sbtc.world.</a></td><td>SOA</td><td>21600</td><td>ns-cloud-d1.googledomains.com. cloud-dns-hostmaster.google.com. 1 21600 3600 259200 300</td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/sbtc.world./NS/view?project=core-eng">sbtc.world.</a></td><td>NS</td><td>21600</td><td><p>annalise.ns.cloudflare.com.</p><p>ganz.ns.cloudflare.com.</p></td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/sbtc.world./A/view?project=core-eng">sbtc.world.</a></td><td>A</td><td>300</td><td>34.110.176.196</td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/sbtc.world./TXT/view?project=core-eng">sbtc.world.</a></td><td>TXT</td><td>300</td><td><p>"google-site-verification=xQlbxDaTTo7EIzjjjhQJn4fYFWnZSn5sMlDBaEFEy4U"</p><p>"google-site-verification=_hHMvQ3EVCmqas_DeDrDrQbm26ele1yVVjjFuHTAePk"</p></td></tr><tr><td><a href="https://console.cloud.google.com/net-services/dns/zones/sbtc-world/rrsets/www.sbtc.world./A/view?project=core-eng">www.sbtc.world.</a></td><td>A</td><td>300</td><td>34.110.176.196</td></tr></tbody></table>

#### Cloudlfare DNS

| Type  | Name       | Content                                                                | Proxy status                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | TTL  |
| ----- | ---------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| A     | api        | 34.96.125.8                                                            | <p><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDQgMzkuNSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM5OTk7fS5jbHMtMntmaWxsOiNmNjhhMWQ7fS5jbHMtM3tmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5Bc3NldCAxPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxMDQgMjAuMTIgOTQgMTAuNjIgOTQgMTYuMTIgMCAxNi4xMiAwIDI0LjEyIDk0IDI0LjEyIDk0IDI5LjYyIDEwNCAyMC4xMiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTc0LjUsMzljLTIuMDgsMC0xNS40My0uMTMtMjguMzQtLjI1LTEyLjYyLS4xMi0yNS42OC0uMjUtMjcuNjYtLjI1YTgsOCwwLDAsMS0xLTE1LjkzYzAtLjE5LDAtLjM4LDAtLjU3YTkuNDksOS40OSwwLDAsMSwxNC45LTcuODEsMTkuNDgsMTkuNDgsMCwwLDEsMzguMDUsNC42M0ExMC41LDEwLjUsMCwxLDEsNzQuNSwzOVoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik01MSwxQTE5LDE5LDAsMCwxLDcwLDE5LjU5LDEwLDEwLDAsMSwxLDc0LjUsMzguNWMtNC4xMSwwLTUyLS41LTU2LS41YTcuNSw3LjUsMCwwLDEtLjQ0LTE1QTguNDcsOC40NywwLDAsMSwxOCwyMmE5LDksMCwwLDEsMTQuNjgtN0ExOSwxOSwwLDAsMSw1MSwxbTAtMUEyMCwyMCwwLDAsMCwzMi4xMywxMy40MiwxMCwxMCwwLDAsMCwxNywyMnYuMTRBOC41LDguNSwwLDAsMCwxOC41LDM5YzIsMCwxNSwuMTMsMjcuNjYuMjUsMTIuOTEuMTIsMjYuMjYuMjUsMjguMzQuMjVhMTEsMTEsMCwxLDAtMy42MS0yMS4zOUEyMC4xLDIwLjEsMCwwLDAsNTEsMFoiLz48L2c+PC9nPjwvc3ZnPg==" alt=""></p><p>Proxied</p> | Auto |
| A     | sbtc.world | 162.159.38.234                                                         | <p><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDQgMzkuNSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM5OTk7fS5jbHMtMntmaWxsOiNmNjhhMWQ7fS5jbHMtM3tmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5Bc3NldCAxPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxMDQgMjAuMTIgOTQgMTAuNjIgOTQgMTYuMTIgMCAxNi4xMiAwIDI0LjEyIDk0IDI0LjEyIDk0IDI5LjYyIDEwNCAyMC4xMiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTc0LjUsMzljLTIuMDgsMC0xNS40My0uMTMtMjguMzQtLjI1LTEyLjYyLS4xMi0yNS42OC0uMjUtMjcuNjYtLjI1YTgsOCwwLDAsMS0xLTE1LjkzYzAtLjE5LDAtLjM4LDAtLjU3YTkuNDksOS40OSwwLDAsMSwxNC45LTcuODEsMTkuNDgsMTkuNDgsMCwwLDEsMzguMDUsNC42M0ExMC41LDEwLjUsMCwxLDEsNzQuNSwzOVoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik01MSwxQTE5LDE5LDAsMCwxLDcwLDE5LjU5LDEwLDEwLDAsMSwxLDc0LjUsMzguNWMtNC4xMSwwLTUyLS41LTU2LS41YTcuNSw3LjUsMCwwLDEtLjQ0LTE1QTguNDcsOC40NywwLDAsMSwxOCwyMmE5LDksMCwwLDEsMTQuNjgtN0ExOSwxOSwwLDAsMSw1MSwxbTAtMUEyMCwyMCwwLDAsMCwzMi4xMywxMy40MiwxMCwxMCwwLDAsMCwxNywyMnYuMTRBOC41LDguNSwwLDAsMCwxOC41LDM5YzIsMCwxNSwuMTMsMjcuNjYuMjUsMTIuOTEuMTIsMjYuMjYuMjUsMjguMzQuMjVhMTEsMTEsMCwxLDAtMy42MS0yMS4zOUEyMC4xLDIwLjEsMCwwLDAsNTEsMFoiLz48L2c+PC9nPjwvc3ZnPg==" alt=""></p><p>Proxied</p> | Auto |
| A     | staging    | 162.159.38.234                                                         | <p><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MC41IDU5Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzkyOTc5Yjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFzc2V0IDI8L3RpdGxlPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDksMTMuNVYxOUw1OSw5LjUsNDksMFY1LjVINDAuNzhhMTIuNDMsMTIuNDMsMCwwLDAtOS41LDQuNDJMMTcuNjUsMjcuMTZhOC44Myw4LjgzLDAsMCwxLTYuOTEsMy4zNEg1bC01LDhIMTMuMzlhMTEuMjcsMTEuMjcsMCwwLDAsOS00LjQ4TDM1LjA1LDE3LjE4YTkuODEsOS44MSwwLDAsMSw3LjY2LTMuNjhaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODAuNSwzOUExMCwxMCwwLDAsMCw3Niw0MC4wOWExOSwxOSwwLDAsMC0zNy4zLTQuNTdBOSw5LDAsMCwwLDI0LDQyLjVhOC40Nyw4LjQ3LDAsMCwwLC4wNiwxLDcuNSw3LjUsMCwwLDAsLjQ0LDE1YzQsMCw1MS44OS41LDU2LC41YTEwLDEwLDAsMCwwLDAtMjBaIi8+PC9nPjwvZz48L3N2Zz4=" alt=""></p><p>DNS only</p>                                                                                                                                                                                                                                                                                                                                                                                                                                | Auto |
| A     | www        | 162.159.38.234                                                         | <p><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDQgMzkuNSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM5OTk7fS5jbHMtMntmaWxsOiNmNjhhMWQ7fS5jbHMtM3tmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5Bc3NldCAxPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxMDQgMjAuMTIgOTQgMTAuNjIgOTQgMTYuMTIgMCAxNi4xMiAwIDI0LjEyIDk0IDI0LjEyIDk0IDI5LjYyIDEwNCAyMC4xMiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTc0LjUsMzljLTIuMDgsMC0xNS40My0uMTMtMjguMzQtLjI1LTEyLjYyLS4xMi0yNS42OC0uMjUtMjcuNjYtLjI1YTgsOCwwLDAsMS0xLTE1LjkzYzAtLjE5LDAtLjM4LDAtLjU3YTkuNDksOS40OSwwLDAsMSwxNC45LTcuODEsMTkuNDgsMTkuNDgsMCwwLDEsMzguMDUsNC42M0ExMC41LDEwLjUsMCwxLDEsNzQuNSwzOVoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik01MSwxQTE5LDE5LDAsMCwxLDcwLDE5LjU5LDEwLDEwLDAsMSwxLDc0LjUsMzguNWMtNC4xMSwwLTUyLS41LTU2LS41YTcuNSw3LjUsMCwwLDEtLjQ0LTE1QTguNDcsOC40NywwLDAsMSwxOCwyMmE5LDksMCwwLDEsMTQuNjgtN0ExOSwxOSwwLDAsMSw1MSwxbTAtMUEyMCwyMCwwLDAsMCwzMi4xMywxMy40MiwxMCwxMCwwLDAsMCwxNywyMnYuMTRBOC41LDguNSwwLDAsMCwxOC41LDM5YzIsMCwxNSwuMTMsMjcuNjYuMjUsMTIuOTEuMTIsMjYuMjYuMjUsMjguMzQuMjVhMTEsMTEsMCwxLDAtMy42MS0yMS4zOUEyMC4xLDIwLjEsMCwwLDAsNTEsMFoiLz48L2c+PC9nPjwvc3ZnPg==" alt=""></p><p>Proxied</p> | Auto |
| TXT   | sbtc.world | google-site-verification=xQlbxDaTTo7EIzjjjhQJn4fYFWnZSn5sMlDBaEFEy4U   | DNS only                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Auto |
| TXT   | sbtc.world | google-site-verification=\_hHMvQ3EVCmqas\_DeDrDrQbm26ele1yVVjjFuHTAePk | DNS only                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Auto |

Scan zone:

```
curl --request POST \
  --url https://api.cloudflare.com/client/v4/zones/f697c376d1b70a3a150f717f8ae0c67b/dns_records/scan \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Email: mjoecohen@gmail.com' \
  --header 'X-Auth-Key: 123' \
  --header 'Authorization: '
```

### Notes

**Bridge Web**

* Static files
* Can use any service
* Uses GCP Buckets for Production
* Uses CloudFlare for Developer branches
* Load Balancer -> reads Bucket

**Deployment API**

* Dockerfile.api
* Cloud Run or K8s
* CHANGES(mijoco)
* Fork Dockerfile into Dockerfile.api
* Read chain from env variable
* Disable time here

**Deployment Functions**

* Dockerfile.lambda
* Google Lambda or K8s
* CHANGES(mijoco)
* Fork Dockerfile into Dockerfile.timer
* Read chain from env variable
* Disable the http request handler
