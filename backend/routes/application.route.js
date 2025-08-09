import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
 // ✅ make sure this file exists and is correct

import {
  applyJob,
  getAppliedJobs,
  updateStatus,
  getCompanyApplicants
 
} from "../controllers/application.controller.js";

const router = express.Router();

// Candidate applies for a job
router.post("/apply/:id", isAuthenticated, applyJob);

// Candidate views all jobs they've applied for
router.get("/get", isAuthenticated, getAppliedJobs);

// Company views applicants for a job they posted
router.get("/company/:jobId/applicants", isAuthenticated,getCompanyApplicants);

// Admin or company views applicants for a job
router.get("/:id/applicants", isAuthenticated, getCompanyApplicants);

// Update applicant status (accepted/rejected)
router.post("/status/:id/update", isAuthenticated, updateStatus);

export default router;
