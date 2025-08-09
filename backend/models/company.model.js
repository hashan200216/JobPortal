import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    website: String,
    password: String, // Plaintext, to be hashed before login in real app
    email: String,
    logo: String,
    location: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Company = mongoose.model("Company", CompanySchema);
