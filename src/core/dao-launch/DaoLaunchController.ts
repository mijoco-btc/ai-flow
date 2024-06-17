import { Body, BodyProp, Get, Post, Route } from "tsoa";
import { DaoTemplate } from "../../types/local_types";
import { constructDao, getCommandVersion, runScript } from "./commands";


@Route("/dao-launcher/v1")
export class DaoLaunchController {

  @Get("/")
  public async launchDaoInfo():Promise<string> {
    return 'hi';
  }

  @Get("/")
  public async constructDao(address:string):Promise<string> {
    return await constructDao(address)
  }

  @Post("/launch")
  public async launchDao(template:DaoTemplate):Promise<any> {
    console.log('launchDao: template: ', template)
    return await runScript(template)
  }
}

