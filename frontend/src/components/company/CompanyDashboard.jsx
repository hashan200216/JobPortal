import React, { useState } from 'react';
import useGetCompanyJobs from '@/hooks/useGetCompanyJobs';
import CompanyJobs from './CompanyJobs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '@/redux/jobSlice';
import CompanyNavbar from './CompanyNavbar';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const CompanyDashboard = () => {
  useGetCompanyJobs();
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <CompanyNavbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center w-full sm:w-auto gap-2">
            <Search className="text-gray-500" />
            <Input
              className="w-full sm:w-72 border-gray-300 focus-visible:ring-1 focus-visible:ring-blue-500"
              placeholder="Search jobs by title or keyword"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                dispatch(setSearchJobByText(e.target.value));
              }}
            />
          </div>
          <Button
            onClick={() => navigate('/company/jobs/create')}
            className="text-purple-600 hover:bg-blue-700 text-white font-semibold shadow"
          >
            + Post New Job
          </Button>
        </div>

        {/* Jobs List */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Posted Jobs</h2>
          <CompanyJobs />
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
