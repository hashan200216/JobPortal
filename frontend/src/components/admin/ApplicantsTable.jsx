import React from 'react';
import {
  Table, TableBody, TableCaption, TableCell, TableHead,
  TableHeader, TableRow
} from '../ui/table';
import {
  Popover, PopoverContent, PopoverTrigger
} from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  


   
  

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of users who applied for this job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.length > 0 ? (
            applications.map((item) => {
              const applicant = item?.applicant;

              return (
                <TableRow key={item._id}>
                  <TableCell>{applicant?.fullname || 'Unknown'}</TableCell>
                  <TableCell>{applicant?.email || 'N/A'}</TableCell>
                  <TableCell>{applicant?.phoneNumber || 'N/A'}</TableCell>
                  <TableCell>
                    {applicant?.profile?.resume ? (
                      <a
                        id={`resume-link-${item._id}`}
                        name={`resume-link-${item._id}`}
                        className="text-blue-600 underline"
                        href={applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {applicant.profile.resumeOriginalName || 'Download'}
                      </a>
                    ) : (
                      <span>NA</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item?.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="float-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger aria-label="More actions">
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortlistingStatus.map((status, index) => (
                          <div
                            key={index}
                            onClick={() => statusHandler(status, item._id)}
                            className="flex w-fit items-center my-2 cursor-pointer hover:text-blue-600"
                          >
                            <span>{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
