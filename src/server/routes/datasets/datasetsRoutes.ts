
import express from "express";
import { DatasetsController } from "../../../core/datasets/DatasetsController";

const router = express.Router();
const controller = new DatasetsController();

router.get("/transactions/:block", async (req, res, next) => {
  try {
    await controller.transactionsInBlock(Number(req.params.block));
    console.log('Flattening stacks transaction in block: ' + req.params.block);
  } catch (error:any) {
    return res.status(500).send({failed: true, message: error.message})
  }
});

router.get("/transactions/latest", async (req, res, next) => {
  try {
    await controller.transactionsLatest();
  } catch (error:any) {
    return res.status(500).send({failed: true, message: error.message})
  }
});

router.get("/transactions", async (req, res, next) => {
  try {
    await controller.transactionsLatest();
  } catch (error:any) {
    return res.status(500).send({failed: true, message: error.message})
  }
});

export { router as datasetsRoutes }
