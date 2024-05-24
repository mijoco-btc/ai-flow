import { Get, Route } from "tsoa";
import { fetchTransactionsInBlock, getStacksInfo } from "./stacks";
import { checkFileExistence } from "./dataset_io";


@Route("/datasets/v1")
export class DatasetsController {

  @Get("/transactions/:block")
  public async transactionsInBlock(block:number):Promise<void> {
    if (checkFileExistence(block)) {
      console.log(`Transactions for block ${block} exits. Move file to overwrite.`)
      return;
    }
    await fetchTransactionsInBlock(block)
  }
  
  @Get("/transactions/latest")
  public async transactionsLatest():Promise<void> {
    const stacksInfo = await getStacksInfo()
    for (let i=stacksInfo.stacks_tip_height; i>=1; i--) {
      if (!checkFileExistence(stacksInfo.stacks_tip_height)) {
        await fetchTransactionsInBlock(i)
      } else {
        console.log(`Stopping as block ${i} exits.`)
        return
      }
    }
  }

  @Get("/transactions")
  public async transactions():Promise<void> {
    const stacksInfo = await getStacksInfo()
    for (let i=stacksInfo.stacks_tip_height; i>=1; i--) {
      if (!checkFileExistence(stacksInfo.stacks_tip_height)) {
        await fetchTransactionsInBlock(i)
      } else {
        console.log(`Skipping block ${stacksInfo.stacks_tip_height} exits. Move file to overwrite.`)
      }
    }
  }
}

