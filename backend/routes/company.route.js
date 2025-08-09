import express from "express";
import {
  getCompany,
  getCompanyById,
  updateCompany,
  registerCompany,
  createCompanyUser,
  getCompanyJobs
  
} from "../controllers/company.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
import { loginCompany } from "../controllers/company.controller.js";

import companyAuth from '../middlewares/companyAuth.js'; // ✅ Works with default export

import { verifyToken } from "../middlewares/verifyToken.js";

 // assuming this verifies company token

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);
router.route("/linkuser").post(createCompanyUser);
 // ✅ Added login route
router.post("/login", loginCompany);

router.get("/company", verifyToken, companyAuth, getCompanyJobs);
export default router;