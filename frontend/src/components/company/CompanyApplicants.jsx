// src/components/CompanyApplicants.jsx
import React from 'react';
import CompanyApplicantsTable from './CompanyApplicantsTable';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetCompanyApplicants from '@/hooks/useGetCompanyApplicants';
import CompanyNavbar from './CompanyNavbar';

const CompanyApplicants = () => {
  const { id } = useParams(); // jobId from URL
  const { applications } = useSelector((store) => store.application);
  useGetCompanyApplicants(id); // Just trigger the hook (no need to destructure loading/error)

  return (
    <div>
      <CompanyNavbar />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-bold text-2xl my-5">
          ({applications?.length || 0}) Applicants
        </h1>

        {applications?.length > 0 ? (
          <CompanyApplicantsTable />
        ) : (
          <p>No applicants available.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyApplicants;
