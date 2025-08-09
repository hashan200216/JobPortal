import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        
    },
    phoneNumber:{
        type:String,
        
    },
    password:{
        type:String,
        required:true
    },
   
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    profile:{
        bio:{type:String},
        skills: { type: [String] },
        resume:{type:String},//URL TO RESUME FILE LINK
        rName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},//only for
        profilePhoto:{
            type:String,
            default:""
        } 
    },
},{timestamps:true});
export const User=mongoose.model('User',userSchema);