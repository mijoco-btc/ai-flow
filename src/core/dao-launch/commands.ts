import * as fs from 'fs';
import * as path from 'path';
import { promisify } from "util";
import { exec } from "child_process";
import { DaoTemplate } from '../../types/local_types';
import { AnchorMode, broadcastTransaction, bufferCVFromString, makeContractCall } from '@stacks/transactions';
import { StacksDevnet, StacksTestnet } from '@stacks/network';
import { getConfig } from '../config';

const execPromise = promisify(exec);

const myCommand = async (param: string) => {
  const { stdout, stderr } = await execPromise(`/usr/local/bin/ord ${param}`);
  return {
    stdout,
    stderr,
    // some other fields
  };
};

export function getCommandVersion(template:DaoTemplate) {
  return myCommand('--version')
}

export async function constructDao(address:string) {
  const network = new StacksDevnet();
  const keys = JSON.parse(getConfig().keys)
  const skey = keys.find((o:any) => o.stx_address === address)
  console.log(skey)
  const txOptions = {
    contractAddress: 'SPBMRFRPPGCDE3F384WCJPK8PQJGZ8K9QKK7F59X',
    contractName: 'contract_name',
    functionName: 'contract_function',
    functionArgs: [bufferCVFromString('foo')],
    senderKey: skey,
    validateWithAbi: true,
    network,
    postConditions: undefined,
    anchorMode: AnchorMode.Any,
  };
  
  const transaction = await makeContractCall(txOptions);
  
  const broadcastResponse = await broadcastTransaction(transaction, network);
  const txId = broadcastResponse.txid;
  return txId

}

export function runScript(template:DaoTemplate) {
  const scriptPath = path.join(__dirname, '../../../bin/template.sh');
  console.log('runScript: ' + scriptPath)
  // Execute the bash script
  //process.env.HOME = '/Users/mikey'; // Set HOME directory

  const gitUrl = 'https://github.com/radicleart/bitcoin-dao'
  exec(`bash ${scriptPath} "${template.projectName}" "${gitUrl}" "${template.addresses[0]}" "${template.addresses[1]}" "${template.addresses[2]}" "${template.addresses[3]}" "${template.tokenName}" "${template.tokenSymbol}" "${template.tokenUrl}" "${template.deployer}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      //throw new Error(`Error: ${error.message}`);
      //return false;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      //throw new Error(`Error: ${stderr}`);
      //return false;
    }
    console.log(`Output: ${stdout}`);
    return true;
  });
}
