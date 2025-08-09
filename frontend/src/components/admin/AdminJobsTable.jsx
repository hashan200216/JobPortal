import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button'; // Adjust path as needed

const AdminWelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Welcome message container */}
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-white p-8 rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Welcome to Admin Page</h1>
        <p className="text-gray-600 text-center max-w-xl">
          Manage your jobs and companies efficiently using the admin dashboard.
          Use the navigation below to get started.
        </p>

           {/* Companies Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => navigate('/admin/companies')}
          className="text-purple-600 hover:bg-blue-700 hover:text-white font-semibold shadow px-6 py-3 rounded"
        >
          Companies
        </Button>
      </div> 
      </div>

   
    </div>
  );
};

export default AdminWelcomePage;
