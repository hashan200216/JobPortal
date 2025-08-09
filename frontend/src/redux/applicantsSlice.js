import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicantsSlice = createSlice({
  name: "applicants",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchStart, fetchSuccess, fetchFailure } = applicantsSlice.actions;
export default applicantsSlice.reducer;

// Thunk to fetch applicants for a job
export const getApplicantsByJobId = (jobId) => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await axios.get(`/api/jobs/${jobId}/applicants`);
    dispatch(fetchSuccess(res.data.applications));
  } catch (err) {
    dispatch(fetchFailure(err.response?.data?.message || err.message));
  }
};
