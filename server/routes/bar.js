import express from "express";
import { getBarValues,} from "../controllers/BarController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// get bars
router.get("/",verifyUser, getBarValues);


export default router;