import { Body, BodyProp, Get, Post, Route } from "tsoa";
import { DaoTemplate } from "../../types/local_types";
import { getCommandVersion, runScript } from "./commands";


@Route("/dao-launcher/v1")
export class DaoLaunchController {

  @Get("/")
  public async launchDaoInfo():Promise<string> {
    return 'hi';
  }

  @Post("/launch")
  public async launchDao(template:DaoTemplate):Promise<any> {
    console.log('launchDao: template: ', template)
    return await runScript(template)
  }
}

