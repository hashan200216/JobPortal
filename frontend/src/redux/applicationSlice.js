// src/redux/applicationSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

// Optional: Async thunk to load all applications (not used in this case)
export const fetchApplications = createAsyncThunk(
  'application/fetchApplications',
  async (_, thunkAPI) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${APPLICATION_API_END_POINT}/applications`);
      return res.data.applications;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch applications');
    }
  }
);

// ✅ Always initialize with empty array
const initialState = {
  applications: [],
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setAllApplicants: (state, action) => {
      state.applications = action.payload || [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApplications.fulfilled, (state, action) => {
      state.applications = action.payload;
    });
  },
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
