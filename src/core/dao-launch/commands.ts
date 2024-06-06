import * as fs from 'fs';
import * as path from 'path';
import { getConfig } from '../config';
import { promisify } from "util";
import { exec, ExecException } from "child_process";
import { DaoTemplate } from '../../types/local_types';

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

export function runScript(template:DaoTemplate) {
  const scriptPath = path.join(__dirname, '../../../bin/template.sh');
  console.log('runScript: ' + scriptPath)
  // Execute the bash script
  const gitUrl = 'https://github.com/radicleart/bitcoin-dao'
  exec(`bash ${scriptPath} "${gitUrl}" "${template.addresses[0]}" "${template.addresses[1]}" "${template.addresses[2]}" "${template.addresses[3]}" "${template.tokenName}" "${template.tokenSymbol}" "${template.tokenUrl}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      throw new Error(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      throw new Error(`Error: ${stderr}`);
    }
    console.log(`Output: ${stdout}`);
    return true;
  });
}
