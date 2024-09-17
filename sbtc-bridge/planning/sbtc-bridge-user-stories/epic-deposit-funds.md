---
description: Stories associated with the depositing of funds
---

# Epic: Deposit Funds

## As a User I want to Deposit Funds

Depositing funds (formerly pegging in or wrapping) involves a user sending bitcoin to a bitcoin address and being minted an equivalent amount of sBTC to a Stacks address of their choice.

The overall process can be broken down into smaller stories;

1. As a user I want to initiate a deposit by sending a 'commitment' &#x20;
2. As a user I want to reclaim my funds
3. As a tester I want to reveal the 'commitment'

**Pre-Conditions**;

1. User has authenticated themselves with the Bridge by connecting their stacks web wallet.
2. User has Bitcoin funds in a wallet they control

**Definition of Done**;

1. If the reveal transaction confirms the amount of sBTC will materialise to the stacks principal (account or contract) indicated in the commitment.
2. If either reclaim or reveal transaction succeeds the other must necessarily fail (they spend the same UTXO).
3. The user cannot attempt to reclaim until at least 144 bitcoin blocks have been mined since the Commit transaction confirmed.
4. The Bridge is unable to generate reveal transactions for the real sBTC system - it has no control over the private keys - it can only perform this task in a narrower testing capacity.

### As a User I want to initiate a deposit by sending a 'commitment'&#x20;

First navigate to the deposit page on the Bridge application. The Bridge presents a form with three fields;

1. Bitcoin address - an address I wish to receive funds back to in the event of the sBTC failing to materialise
   1. Pre-populated by the users segwit v0 (cardinal) bitcoin address&#x20;
2. Stacks address of an account or smart contract on Stacks network
   1. Pre-populated by the users authenticated stacks account
3. Amount

User enters the data and selects from one of two choices;

* deposit using web wallet
* deposit using other wallet

#### Sub Flow 1: Web Wallet

The  User selects to send with the web wallet. The system constructs a transaction using the UTXOs of the from address field and prompt the wallet for a signature.

The web wallet opens and prompts the user to sign the transaction.

The user signs and the web wallet closes. The Bridge is passed the signed transaction and broadcasts it to the Bitcoin blockchain. The Bridge informs the user of the txid and provides a link to view the transaction on mempool.&#x20;

#### Sub Flow 2: Other Wallet

The user selects other wallet. The Bridge displays a QR code and the corresponding address / amounts.

The user scans or copies the data to their wallet where they sign and broadcast the transaction.

The Bridge notifies the API which watches for the transaction and links to the txid when seen.

**Definition of Done**

1. A Bitcoin transaction containing a hash of all the relevant data is confirmed on the Bitcoin Blockchain &#x20;

### As a user I want to reclaim my funds

After sending a commitment transaction the user clicks a link on the Bridge to show them their deposit history.

The Bridge responds with a view of all deposit commitments the user has sent using their authenticated Stacks account as a key (note this can be different to the Stacks address the deposit to).

The user clicks on a specific deposit commitment. &#x20;

The Bridge checks the UTXO is unspent and displays the reclaim transaction. The user is able to spend the reclaim transactions by providing a signature with the wallet address they entered during the commitment story.&#x20;

#### Sub Flow 1: Reclaim via Stacks Wallet

The Bridge checks the reclaim address against the users logged in cardinal Bitcoin (segwit v0) address. If the address matches the Bridge provides a link for the user to request a signature from the stacks web wallet (ie to sign a PSBT). The user clicks this link and the web wallet opens. The user goes ahead and signs, the web wallet cloases and the Bridge broadcasts the signed Bitcoin transaction.

#### Sub Flow 2: Reclaim via Other Wallet

The Bridge provide the reclaim transaction in either Base 64 encoded or Hex encoded formats (e.g. Bitcoin Core and Electrum respective required formats).&#x20;

The user copies the the transaction to the wallet they requested as their return address, signs and broadcasts the transaction.

The Bridge periodically checks the Bitcoin blockchain for these transactions.

**Definition of Done**

1. A Bitcoin transaction containing spending the users funds back to their address is confirmed on Bitcoin blockchain &#x20;

### As a tester I want to reveal the 'commitment'

After sending a commitment transaction the tester checks the Bridge. The Bridge displays their commitment transactions (using their authenticated account as key).&#x20;

The tester elects to send a reveal transaction. The Bridge responds with the PSBT in either hex or base64 encoding. The tester copies this to the wallet that controls the public key registered in the reveal script of the commit transaction.

The wallet signs and broadcasts the transaction.

The Bridge periodically checks the Bitcoin blockchain for this transaction. If it is seen the Bridge updates its internal files and generates a Stacks testnet transaction to inform a smart contract of its existence.

See other user stories.

**Definition of Done**

1. A Bitcoin transaction containing revealing the commitment script path is confirmed on Bitcoin blockchain
2. The transaction has been submitted to a Clarity sBTC Contract.
3. The sBTC contract has verified the data in the transaction and minted the corresponding BTC to the user's chosen Stacks account.



