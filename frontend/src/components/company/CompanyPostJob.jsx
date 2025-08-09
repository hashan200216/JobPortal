import React, { useState, useEffect } from 'react';
import CompanyNavbar from './CompanyNavbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const CompanyPostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    position: 1
  });

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCompany = localStorage.getItem('company');
    if (storedCompany) {
      const parsed = JSON.parse(storedCompany);
      if (parsed._id && parsed.userId) {
        setCompany(parsed);
      } else {
        toast.error("Invalid session. Please log in again.");
        navigate("/company/login");
      }
    } else {
      toast.error("Not logged in.");
      navigate("/company/login");
    }
  }, [navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const isValidForm = () => {
    const requiredFields = [
      'title', 'description', 'requirements',
      'salary', 'location', 'jobType',
      'experienceLevel', 'position'
    ];
    return requiredFields.every((key) => input[key]?.toString().trim().length > 0);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!company?._id || !company?.userId) {
      return toast.error("Company ID missing.");
    }

    if (!isValidForm()) {
      return toast.error('All fields are required.');
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        {
          title: input.title.trim(),
          description: input.description.trim(),
          requirements: [input.requirements.trim()],
          salary: Number(input.salary),
          location: input.location.trim(),
          jobType: input.jobType.trim(),
          experienceLevel: Number(input.experienceLevel),
          position: Number(input.position),
          companyId: company._id,
          created_by: company.userId
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/company/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CompanyNavbar />
      <div className='flex justify-center py-10 px-4'>
        <form
          onSubmit={submitHandler}
          className='bg-white w-full max-w-3xl shadow-xl rounded-xl p-8 space-y-6 border border-gray-200'
        >
          <h2 className='text-2xl font-bold text-center text-gray-800'>Post New Job</h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <Label>Job Title</Label>
              <Input name="title" value={input.title} onChange={changeEventHandler} required />
            </div>
            <div>
              <Label>Location</Label>
              <Input name="location" value={input.location} onChange={changeEventHandler} required />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input name="jobType" value={input.jobType} onChange={changeEventHandler} required />
            </div>
            <div>
              <Label>Salary (LKR)</Label>
              <Input type='number' name="salary" value={input.salary} onChange={changeEventHandler} required />
            </div>
            <div>
              <Label>Experience Level (Years)</Label>
              <Input type='number' name="experienceLevel" value={input.experienceLevel} onChange={changeEventHandler} required />
            </div>
            <div>
              <Label>No of Positions</Label>
              <Input type='number' name="position" value={input.position} onChange={changeEventHandler} required />
            </div>
          </div>

          <div>
            <Label>Job Description</Label>
            <Input name="description" value={input.description} onChange={changeEventHandler} required />
          </div>

          <div>
            <Label>Requirements</Label>
            <Input name="requirements" value={input.requirements} onChange={changeEventHandler} required />
          </div>

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Posting...
              </>
            ) : (
              'Post Job'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanyPostJob;
