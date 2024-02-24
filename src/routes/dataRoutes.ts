import express from "express";
import * as DataController from "../controllers/DataController";

const router = express.Router()

router.get('/', DataController.get)

export default router