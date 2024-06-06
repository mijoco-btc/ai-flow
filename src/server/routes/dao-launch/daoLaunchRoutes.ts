
import express from "express";
import { DaoLaunchController } from "../../../core/dao-launch/DaoLaunchController";
import { DaoTemplate } from "../../../types/local_types";

const router = express.Router();
const controller = new DaoLaunchController();

router.get("/", async (req, res, next) => {
  try {
    const result = await controller.launchDaoInfo();
    return res.send(result);
  } catch (error:any) {
    return res.status(500).send({failed: true, message: error.message})
  }
});

router.post("/launch", async (req, res, next) => {
  try {
    const template:DaoTemplate = req.body;
    const result = await controller.launchDao(template);
    return res.send(result);
  } catch (error:any) {
    return res.status(500).send({failed: true, message: error.message})
  }
});

export { router as daoLaunchRoutes }
