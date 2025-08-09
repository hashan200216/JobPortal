// ✅ File: src/hooks/useGetCompanyApplicants.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const useGetCompanyApplicants = (jobId) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    const fetchApplicants = async () => {
      try {
        setLoading(true);
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${APPLICATION_API_END_POINT}/job/${jobId}/applicants`);

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.applications));
        } else {
          throw new Error(res.data.message || 'Failed to fetch applicants');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId, dispatch]);

  return { loading, error };
};

export default useGetCompanyApplicants;
