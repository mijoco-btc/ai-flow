#!/usr/bin/env node

import { setConfigOnStart } from "../core/config";
import { DatasetsController } from "../core/datasets/DatasetsController";
import dotenv from 'dotenv';

console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  dotenv.config();
  setConfigOnStart()
}

const controller = new DatasetsController();

const args = process.argv.slice(2);
console.log('Running cli with args: ', args);

switch (args[0]) {
    case 'datasets':
        switch (args[1]) {
            case 'transactions':
                switch (args[2]) {
                    case 'latest':
                        controller.transactionsLatest();
                        break;
                    case 'all':
                        controller.transactions();
                        break;
                    default:
                        controller.transactionsInBlock(Number(args[2]));
                        break;
                    }
            default:
                //console.log('Unknown command');
            break;
        }
        break;
    default:
        console.log('Unknown command');
        break;
}
