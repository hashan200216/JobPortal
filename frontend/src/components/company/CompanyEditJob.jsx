// File: frontend/components/company/CompanyEditJob.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CompanyNavbar from './CompanyNavbar';
import { JOB_API_END_POINT } from '@/utils/constant';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const CompanyEditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 1
  });

  // Fetch existing job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const job = res.data.job;
          setInput({
            title: job.title ?? '',
            description: job.description ?? '',
            requirements: job.requirements ?? '',
            salary: job.salary ?? '',
            location: job.location ?? '',
            jobType: job.jobType ?? '',
            experience: job.experience ?? '',
            position: job.position ?? 1
          });
        }
      } catch (error) {
        console.error("Fetch job error:", error);
        toast.error('Error fetching job details');
      }
    };
    fetchJob();
  }, [id]);

  // Handle input changes
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: name === 'position' ? Number(value) : value
    }));
  };

  // Submit updated job
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success('Job updated successfully');
        navigate('/company/dashboard');
      }
    } catch (error) {
      console.error("Update job error:", error);
      toast.error(error.response?.data?.message || 'Failed to update job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CompanyNavbar />
      <div className='flex items-center justify-center w-screen my-5'>
        <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
          <div className='grid grid-cols-2 gap-4'>
            {['title', 'description', 'requirements', 'salary', 'location', 'jobType', 'experience'].map((field) => (
              <div key={field}>
                <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Input
                  id={field}
                  type='text'
                  name={field}
                  value={input[field]}
                  onChange={changeEventHandler}
                  className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                />
              </div>
            ))}
            <div>
              <Label htmlFor='position'>No of Positions</Label>
              <Input
                id='position'
                type='number'
                name='position'
                value={input.position}
                onChange={changeEventHandler}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
            </div>
          </div>
          {loading ? (
            <Button className='w-full my-4' disabled>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Updating Job...
            </Button>
          ) : (
            <Button type='submit' className='w-full my-4'>Update Job</Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanyEditJob;
