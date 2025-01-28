---
description: Rules of engagement
---

# Market Rules

## Accepted Tokens

A market can transact in STX or any a SIP10 compatible token (including sBTC) as long as the DAO has approved the use of the token.&#x20;

Note: the token is set when creating the market and cannot be changed afterwards. A market can transact in only one token.

Note: to simplify the smart contracts STX is treated as a wrapped SIP10 asset and so trading in STX also has to be allowed by the DAO Community.

### Initial Configuration

When the Prediction Market is deployed it will be configured with the tokens initially allowed;

* STX
* sBTC

The list of allowed tokens can be updated by a community vote.&#x20;

## Market Creation

Markets are created with the following information;

* market type - initially simple staking is supported
* token - the token for transacting in the market (initially STX / sBTC)
* market data hash - a hash of the market data (title, description etc) - the hash allows users to independently verify the market information
* access control - a proof that the user is allowed (via community vote) to create markets
* coming soon - ability to set fundraising BIPS - for projects to use markets in crowd funding campaigns / charitable purposes

The community can provide access to a new Market Creator via a DAO vote.

To become a Market Creator apply to the team.

## Meme Coins

To transact in a specific SIP10 / meme coin the market creator will need the DAO to approve the meme token. They will then be able to select the meme from drop down when creating the market.

## Fees

There a three types of fees taken at different times during trading;

1. Dev Fund - taken from initial stake and used to pay running costs
2. DAO Fee - taken from claimed winnings and paid into the community treasury
3. Market Fee - set by market creators - fundraise via market creation

## Market Creation Fee

```clarity
(if (and (not (is-eq tx-sender (var-get resolution-agent))) (> (var-get market-create-fee) u0))
  (try! (stx-transfer? (var-get market-create-fee) tx-sender .bde006-treasury))
  true
)
```

Fee is charged if market-create-fee is more than 0 and the user is other than &#x20;

## Market Fee

Markets can charge a fee up to `market-max-fee` set by the DAO.

Market fees are paid by the winners.
