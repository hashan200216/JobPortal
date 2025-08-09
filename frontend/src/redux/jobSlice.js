import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        companyJobs: [],
        getCompanyApplicants: [], // ✅ NEW: Added for company-specific job list
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        
        setCompanyJobs: (state, action) => { // ✅ NEW: Reducer to update companyJobs
            state.companyJobs = action.payload;
        },
        setgetCompanyApplicants: (state, action) => { // ✅ NEW: Reducer to update companyJobs
            state.getCompanyApplicants = action.payload;
        }
    }
});

// ✅ Updated export to include setCompanyJobs
export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    setCompanyJobs,
    getCompanyApplicants // ✅ NEW
} = jobSlice.actions;

export default jobSlice.reducer;
