import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";

// Apply to a job
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({ message: "Job id is required", success: false });
    }

    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job", success: false });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    const newApplication = await Application.create({ job: jobId, applicant: userId });
    job.applications.push(newApplication._id);

    // ✅ Increment applicants count
    job.applicantsCount += 1;

    await job.save();

    return res.status(201).json({ message: "Job applied successfully.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};


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

// Company gets applicants for their job
// Company gets applicants for their job
export const getCompanyApplicants = async (req, res) => {
  try {
    const companyId = req.user._id;
    const jobId = req.params.id;

    // Ensure job belongs to the company
    const job = await Job.findOne({ _id: jobId, company: companyId });
    if (!job) {
      return res.status(404).json({ message: "Job not found or access denied", success: false });
    }

    // Find applications with deep applicant info
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


// Safer version for company-authenticated users
// Get applicants for a job by job ID
