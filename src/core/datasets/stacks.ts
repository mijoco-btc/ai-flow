import { getConfig } from "../config";
import { writeTransactionsToJSONLFile } from "./dataset_io";


interface Transaction {
  transaction_id: string;
  sender_address:string;
  nonce:number;
  sponsored:boolean;
  fee_rate:number;
  status: string;
  type: string;
  index: number;
  burn_block_time: number;
  parent_burn_block_time: number;
  block_time: number;
  block_height:number;
  post_condition_mode: string;

  recipient_address?: string;
  
  token_transfer_amount?: number;
  token_transfer_memo?: string;

  coinbase_alt_recipient?: string;
  coinbase_data?: string;

  contract_address?: string;
  contract_name?: string;
  function_name?: string;
  function_signature?: string;
  function_args_repr?: string;
  function_args_type?: string;

  smart_contract_clarity_version?:string;
  smart_contract_contract_address?:string;
  smart_contract_contract_name?:string;
  smart_contract_source_code?:string;

}

const TransactionType = {
  SMART_CONTRACT: 'smart_contract',
  CONTRACT_CALL: 'contract_call',
  TOKEN_TRANSFER: 'token_transfer',
  COINBASE: 'coinbase',
  POISON_MICROBLOCK: 'poison_microblock',
} as const;

interface Block {
  block_number: number;
  transactions: Transaction[];
}


export async function getStacksInfo() {
  const url = `${getConfig().stacksApi}/v2/info`
  const response:any = await (await fetch(url)).json();
  return response;
}

async function fetchTransactionsInBlockFromOffset(block:number, offset:number) {
  const url = `${getConfig().stacksApi}/extended/v2/blocks/${block}/transactions?offset=${offset}`
  const response:any = await (await fetch(url)).json();
  return response;
}

export async function fetchTransactionsInBlock(block:number) {
  let txs:Array<any> = []
  let offset = 0;
  let limit = 20;
  let response:any = await fetchTransactionsInBlockFromOffset(block, offset);
  do {
    console.log('Block: ' + block + ' reading: ' + (response?.results?.length || 0) + ' transactions');
    txs = txs.concat(response.results)
    offset += limit;
    response = await fetchTransactionsInBlockFromOffset(block, offset);
  } while (txs.length < response.total);
  const dataset:Array<any> = []
  for (const tx of txs) {
    dataset.push(flattenTransaction(tx));
  }
  //console.log('fetchTransactionsInBlock block: ' + txs.length);
  //console.log('fetchTransactionsInBlock dataset: ', dataset);
  writeTransactionsToJSONLFile(block, dataset)
}

// Function to flatten the transaction structure
function flattenTransaction(tx: any) {
  const flattened = {
    transaction_id: tx.tx_id,
    index: tx.tx_index,
    type: tx.tx_type,
    status: tx.tx_status,
    sender_address: tx.sender_address,
    nonce: Number(tx.nonce),
    fee_rate: Number(tx.fee_rate),
    sponsored: Boolean(tx.sponsored),
  
    post_condition_mode: tx.post_condition_mode,
    burn_block_time: tx.burn_block_time,
    parent_burn_block_time: tx.parent_burn_block_time,
    block_time: tx.block_time,
    block_height: tx.block_height,
  }
  if (tx.tx_type === TransactionType.COINBASE) {
    return {
      ...flattened,
      coinbase_data: tx.coinbase_payload?.data || '',
      coinbase_alt_recipient: tx.coinbase_payload?.alt_recipient || '',
    }
  } else if (tx.tx_type === TransactionType.CONTRACT_CALL) {
    return {
      ...flattened,
      contract_address: tx.contract_call?.contract_id?.split('.')[0] || '',
      contract_name: tx.contract_call?.contract_id?.split('.')[1] || '',
      function_name: tx.contract_call?.function_name || '',
      function_signature: tx.contract_call?.function_signature || '',
      function_args_repr: tx.contract_call?.function_args_repr || '',
      function_args_type: tx.contract_call?.function_args_type || '',
    }
  } else if (tx.tx_type === TransactionType.POISON_MICROBLOCK) {
    return {
      ...flattened,
    }
  } else if (tx.tx_type === TransactionType.SMART_CONTRACT) {
    return {
      ...flattened,
      smart_contract_clarity_version: tx.smart_contract?.clarity_version || '',
      smart_contract_contract_address:tx.smart_contract?.contract_id.split('.')[0] || '',
      smart_contract_contract_name:tx.smart_contract?.contract_id.split('.')[1] || '',
      smart_contract_source_code:tx.smart_contract?.clarity_version || '',
    }
  } else if (tx.tx_type === TransactionType.TOKEN_TRANSFER) {
    return {
      ...flattened,
      recipient_address: tx.token_transfer?.recipient_address || '',
      token_transfer_amount: tx.token_transfer?.amount || '',
      token_transfer_memo: tx.token_transfer?.memo || '',
    }
  } else {
    return flattened
  }
}


