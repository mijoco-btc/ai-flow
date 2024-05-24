import * as fs from 'fs';
import * as path from 'path';
import { getConfig } from '../config';

function ensureDirectoryExistence(filePath:string) {
  var directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
}

export function checkFileExistence(block:number) {
  const filePath = path.join(getConfig().jsonl_path_transactions, `block_${block}.jsonl`);
  ensureDirectoryExistence(filePath);
  return fs.existsSync(filePath);
}
// Function to write transactions to a JSONL file
export function writeTransactionsToJSONLFile(block: number, transactions: Array<any>): void {
  const filePath = path.join(getConfig().jsonl_path_transactions, `block_${block}.jsonl`);
  const fileStream = fs.createWriteStream(filePath, { flags: 'a' });

  transactions.forEach(transaction => {
      fileStream.write(JSON.stringify(transaction) + '\n');
  });

  fileStream.end();
}
