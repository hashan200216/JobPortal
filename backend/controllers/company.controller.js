import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { Job } from "../models/job.model.js";



export const loginCompany = async (req, res) => {
    try {
        const { email, password } = req.body;

        const company = await Company.findOne({ email });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        // Simple password check (ideally, use hashing)
        if (company.password !== password) {
            return res.status(401).json({
                message: "Invalid password",
                success: false
            });
        }

        // IMPORTANT: use company._id here to create the token
        const token = jwt.sign(
            { companyId: company._id, role: 'company' }, // <-- changed userId to companyId
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  // secure true only in prod (HTTPS)
            sameSite: "Lax",                                // or "None" + secure: true if cross-site
            maxAge: 24 * 60 * 60 * 1000                     // 1 day
          });

        // Respond without password for security
        const { password: pwd, ...companyData } = company.toObject();

        return res.status(200).json({
            message: "Login successful",
            success: true,
            company: companyData
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


// (Other exports remain unchanged: registerCompany, updateCompany, getCompany, getCompanyById, createCompanyUser)

// ✅ Register a new company (for admin use only)
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        let company = await Company.findOne({ name: companyName });

        if (company) {
            return res.status(400).json({
                message: "You can't register the same company again.",
                success: false
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id // logged-in user's ID (admin)
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong while registering company.",
            success: false
        });
    }
};

// ✅ Get all companies
export const getCompany = async (req, res) => {
    try {
        const companies = await Company.find();

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found.",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong while fetching companies.",
            success: false
        });
    }
};

// ✅ Get a company by ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong while fetching company.",
            success: false
        });
    }
};

// ✅ Update a company's information (admin only)
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location, email, password } = req.body;
        const file = req.file;

        let logo = undefined;

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const updateData = {
            name,
            description,
            website,
            location,
            email,
            password
        };

        if (logo) {
            updateData.logo = logo;
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
            new: true
        });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully.",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong while updating company.",
            success: false
        });
    }
};

// ✅ Create company user and link it (used in /linkuser route)
export const createCompanyUser = async (req, res) => {
    try {
        const { companyId, name, email, password } = req.body;

        if (!companyId || !name || !email || !password) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.create({
                fullname: name,
                email,
                phoneNumber: "0000000000",
                password: hashedPassword,
                role: "companylog",
                profile: {
                    profilePhoto: "",
                },
            });
        }

        // Link userId to company
        await Company.findByIdAndUpdate(companyId, {
            userId: user._id
        });

        return res.status(200).json({
            message: "Company user created and linked successfully.",
            success: true
        });

    } catch (error) {
        console.error("createCompanyUser ERROR:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};




export const getCompanyJobs = async (req, res) => {
  try {
    const token = req.cookies?.token;
    const companyData = JSON.parse(req.headers["company-data"] || "{}");

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
    res.status(500).json({ success: false, message: "Server error" });
  }
};

