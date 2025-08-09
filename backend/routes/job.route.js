import express from "express";
import {
  postJob,
  getAllJobs,
  getJobById,
 
  getCompanyJobs,
  
  getAppliedJobs,
  updateStatus,
  getCompanyApplicants,
  getApplicantsByJobId,
} from "../controllers/job.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import companyAuth from "../middlewares/companyAuth.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Admin-only routes
router.post("/create", isAuthenticated, postJob);      // Admin posts job
router.get("/admin", isAuthenticated);   // Admin's jobs

// Public routes
router.get("/get", getAllJobs);                         // All jobs
router.get("/get/:id", getJobById);                     // Single job

// Company-specific routes
router.get("/company", verifyToken, getCompanyJobs);   // Company's own jobs (verifyToken first)
router.post("/post",  verifyToken, companyAuth, postJob);             // Company posts job

// Application routes (authenticated users)
router.post("/apply/:id", isAuthenticated);  // Apply to job
router.get("/applied", isAuthenticated, getAppliedJobs); // Get user's applied jobs

// Company manages applications
router.put("/application/status/:id", companyAuth, updateStatus); // Update application status
router.get("/applicants/:id", companyAuth, getCompanyApplicants); // Get applicants for job (by job ID)
router.get("/applicants/job/:jobId", companyAuth, getApplicantsByJobId); // Another way to get applicants

export default router;
