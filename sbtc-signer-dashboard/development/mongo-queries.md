---
description: Templates for queries
---

# Mongo Queries

Sum of deposits (3C for withdrawals)

```
db.sbtcAlphaEvents.aggregate([{ $match: {'payloadData.payload.opcode': '3E'}},{$group: { _id: "$payloadData.payload.opcode", total: { $sum: "$payloadData.payload.amountSats"}}}, { $sort: { total: -1 } }])
[ { _id: '3E', total: 2946650 } ]
```

In typescript

````
```typescript
    const sumRequests = await col.aggregate([{ $match: {'payloadData.payload.opcode': {$regex: "3.*"}}},{$group: { _id: "$payloadData.payload.opcode", total: { $sum: "$payloadData.payload.amountSats"}}}, { $sort: { total: -1 } }]).toArray();

```
````







