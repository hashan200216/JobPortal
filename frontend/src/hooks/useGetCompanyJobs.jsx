import { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setCompanyJobs } from "@/redux/jobSlice";

const useGetCompanyJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const company = JSON.parse(localStorage.getItem("company"));
    if (!company?._id) return;

    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/company`, {
          withCredentials: true, // important to send cookies
          headers: {
            "company-data": JSON.stringify(company),
          },
        });

        if (res.data.success) {
          dispatch(setCompanyJobs(res.data.jobs));
        }
      } catch (err) {
        console.error("Error fetching company jobs:", err);
      }
    };

    fetchJobs();
  }, [dispatch]);
};

export default useGetCompanyJobs;
