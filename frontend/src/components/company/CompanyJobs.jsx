import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const CompanyJobs = () => {
  const { companyJobs, searchJobByText } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = (companyJobs || []).filter((job) => {
      const title = job?.title?.toLowerCase() || '';
      const companyName = job?.company?.name?.toLowerCase() || '';
      const search = searchJobByText?.toLowerCase() || '';
      return title.includes(search) || companyName.includes(search);
    });

    setFilteredJobs(filtered);
  }, [companyJobs, searchJobByText]);

  const deleteJobHandler = async (jobId) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success('Job deleted successfully');
        // Optionally refetch or filter locally
        setFilteredJobs((prev) => prev.filter((job) => job._id !== jobId));
      } else {
        toast.error(res.data.message || 'Failed to delete job');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error deleting job');
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Your Company Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name || 'N/A'}</TableCell>
                <TableCell>{job?.title || 'N/A'}</TableCell>
                <TableCell>
                  {job?.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <div
                        onClick={() => navigate(`/company/jobs/${job._id}/edit`)}
                        className="flex items-center gap-2 cursor-pointer mb-2"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/company/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 cursor-pointer mb-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                      <div
                        onClick={() => deleteJobHandler(job._id)}
                        className="flex items-center gap-2 cursor-pointer text-red-600"
                      >
                        <Trash2 className="w-4" />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyJobs;
