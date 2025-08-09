// src/components/company/CompanyNavbar.jsx

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CompanyNavbar = () => {
  const navigate = useNavigate();

  const company = JSON.parse(localStorage.getItem("company"));

  const logoutHandler = () => {
    localStorage.removeItem("company");
    toast.success("Logout successful");
    navigate("/company/login");
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li><Link to="/company/dashboard">Dashboard</Link></li>
            <li><Link to="/company/jobs/create">Post Job</Link></li>
          
          </ul>

          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={company?.logo || "/placeholder.png"} alt={company?.name} />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="">
                <div className="flex gap-2 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={company?.logo || "/placeholder.png"} alt={company?.name} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{company?.name}</h4>
                    <p className="text-sm text-muted-foreground">{company?.industry || "Tech Company"}</p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                 
                    
                  </div>

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default CompanyNavbar;
