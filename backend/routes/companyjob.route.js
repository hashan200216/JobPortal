import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createCompanyJob, getAllCompanyJobs, deleteCompanyJob } from "../controllers/companyjob.controller.js";
import { createCompanyUser } from "../controllers/company.controller.js";




const router = express.Router();

router.post("/", isAuthenticated, createCompanyJob);
router.get("/", getAllCompanyJobs);
router.delete("/:id", isAuthenticated, deleteCompanyJob);
router.route("/linkuser").post(createCompanyUser);

export default router;
