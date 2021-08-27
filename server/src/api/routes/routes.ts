import express from "express";
import { compile } from "../controllers/controllers";

const router = express.Router();

router.post('/',compile);

export default router;