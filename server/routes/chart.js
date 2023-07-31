import express from "express";
import { getChart,createChart} from "../controllers/ChartController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
// get charts
router.get("/",verifyUser, getChart);
// create charts
router.post("/create",verifyUser, createChart);



export default router;