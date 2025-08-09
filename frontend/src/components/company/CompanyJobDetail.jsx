// File: frontend/components/company/CompanyJobDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import CompanyNavbar from './CompanyNavbar';

const CompanyJobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true
        });
        setJob(res.data.job);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) return <div className='p-5'>Loading...</div>;

  return (
    <div>
      <CompanyNavbar />
      <div className='max-w-4xl mx-auto mt-8 p-6 border border-gray-300 shadow rounded'>
        <h2 className='text-2xl font-bold mb-4'>{job.title}</h2>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Requirements:</strong> {job.requirements}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Job Type:</strong> {job.jobType}</p>
        <p><strong>Experience:</strong> {job.experience}</p>
        <p><strong>Open Positions:</strong> {job.position}</p>
        <p><strong>Posted:</strong> {job.createdAt?.split('T')[0]}</p>
      </div>
    </div>
  );
};

export default CompanyJobDetail;
