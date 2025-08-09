import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import jwt from "jsonwebtoken";

// Apply to a job


// Get all jobs the user has applied to
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: { path: "company" }
      });

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found", success: false });
    }

    return res.status(200).json({ application: applications, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Update application status (Accepted / Rejected)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    const application = await Application.findById(applicationId).populate("job");
    const company = await Company.findOne({ userId: req.id });

    if (!application || !application.job || application.job.company.toString() !== company._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to update status", success: false });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({ message: "Status updated successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Get applicants for a job (company only)
export const getCompanyApplicants = async (req, res) => {
  try {
    const companyId = req.user._id;
    const jobId = req.params.id;

    const job = await Job.findOne({ _id: jobId, company: companyId });
    if (!job) {
      return res.status(404).json({ message: "Job not found or access denied", success: false });
    }

    const applications = await Application.find({ job: jobId })
      .populate({
        path: "applicant",
        select: "fullname email phoneNumber profile",
        populate: {
          path: "profile",
          model: "Profile",
          select: "resume resumeOriginalName"
        }
      })
      .populate({
        path: "job",
        select: "title company",
        populate: {
          path: "company",
          select: "name"
        }
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("Error in getCompanyApplicants:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Alternative: Get applicants by job ID
export const getApplicantsByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId)
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          select: "fullname email phoneNumber profile",
          populate: {
            path: "profile",
            model: "Profile",
            select: "resume resumeOriginalName"
          }
        }
      })
      .populate({
        path: "company",
        select: "name"
      });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({ success: true, applications: job.applications });
  } catch (error) {
    console.error("getApplicantsByJobId error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Company gets jobs posted by them
export const getCompanyJobs = async (req, res) => {
  try {
    // Extract token & company-data header
    const token = req.cookies?.token;
    const companyData = JSON.parse(req.headers["company-data"] || "{}");

    // Either use company-data _id or verify JWT token to get companyId
    const companyId = companyData?._id || (token && jwt.verify(token, process.env.SECRET_KEY)?.userId);

    if (!companyId) {
      return res.status(400).json({ success: false, message: "Company ID missing" });
    }

    const jobs = await Job.find({ company: companyId })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, jobs });
  } catch (err) {
    console.error("Error fetching company jobs:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Post a job (used by admin or company)
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      
      companyId,
      created_by,
    } = req.body;

    if (!companyId || !created_by) {
      return res.status(400).json({ success: false, message: "Company ID or created_by is required" });
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
    
      company: companyId,
      created_by
    });

    return res.status(201).json({ success: true, message: "Job created successfuly", job });
  } catch (error) {
    console.error("❌ postJob error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Get all jobs (public)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("getAllJobs error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get single job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("company");

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.error("getJobById error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get jobs posted by admin
