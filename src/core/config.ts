import { ConfigI } from "../types/local_types";
import process from 'process'

let CONFIG= {} as ConfigI;

export function printConfig() {
  //console.log('== ' + process.env.NODE_ENV + ' ==========================================================')
  //console.log('CONFIG.mongoDbName = ' + CONFIG.mongoDbName)
  //console.log('host = ' + CONFIG.host + ':' + CONFIG.port)
  //console.log('stacks node = ' + CONFIG.stacksApi)
  //console.log('jsonl path = ' + CONFIG.jsonl_path_transactions)
}

export function setConfigOnStart() {
  
  CONFIG.host = process.env.host || '';
  CONFIG.port = Number(process.env.port) || 6060;
  CONFIG.stacksApi = process.env.stacksApi || '';
  CONFIG.mongoDbUrl = process.env.mongoDbUrl || '';
  CONFIG.mongoDbName = process.env.mongoDbName || '';
  CONFIG.mongoUser = process.env.mongoUser || ''
  CONFIG.mongoPwd = process.env.mongoPwd || ''
  CONFIG.jsonl_path_transactions = process.env.jsonl_path_transactions || ''
}

export function getConfig() {
	return CONFIG;
}
