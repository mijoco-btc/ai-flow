# revealer-api

Node Server for aiflow service.

## Modes

Service is organised as a server and cli.

## Build

```bash
npm install
npm run build
```

## Develop

```bash
npm install
npm run dev
```

## Command Line

Note: this isn't yet fully supported but here for future flexibility

```bash
npm install
npm run cli -- datasets {block_number}
```

### Mongo

Connects to Mongo Cloud development db instance using environment variables see Environment secton.

Local IP address has to be added to Mongo Cloud allowed network - contact system administrator.

## Test

Tests outstanding,

```bash
npm run test
```

## Deploy

run deploy script to build / push docker image then on target server run following;

```bash
# stag
docker rm -f aiflow_api_production
docker run -d -t -i --network host --name aiflow_api_production -p 6060:6060 -e NODE_ENV='linode-production' mijoco/aiflow_api
```
