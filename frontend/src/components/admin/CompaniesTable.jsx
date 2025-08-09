import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter(company => {
        if (!searchCompanyByText) return true;
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
      <Table className="min-w-full">
        <TableCaption className="text-gray-500 text-sm py-2">
          List of recently registered companies
        </TableCaption>
        <TableHeader className="bg-blue-50">
          <TableRow>
            <TableHead className="text-left px-6 py-3 text-gray-700 font-semibold">Logo</TableHead>
            <TableHead className="text-left px-6 py-3 text-gray-700 font-semibold">Name</TableHead>
            <TableHead className="text-left px-6 py-3 text-gray-700 font-semibold">Date</TableHead>
            <TableHead className="text-right px-6 py-3 text-gray-700 font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map(company => (
            <TableRow
              key={company._id}
              className="hover:bg-blue-50 transition-colors cursor-default"
            >
              <TableCell className="px-6 py-3">
                <Avatar className="ring-1 ring-gray-300">
                  <AvatarImage src={company.logo || '/default-logo.png'} alt={company.name} />
                </Avatar>
              </TableCell>
              <TableCell className="px-6 py-3 text-gray-800 font-medium">{company.name}</TableCell>
              <TableCell className="px-6 py-3 text-gray-600">{company.createdAt.split('T')[0]}</TableCell>
              <TableCell className="px-6 py-3 text-right">
                <Popover>
                  <PopoverTrigger>
                    <button
                      aria-label="More options"
                      className="p-1 rounded hover:bg-blue-100 transition"
                    >
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-32 p-2 rounded shadow-lg bg-white">
                    <button
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold px-2 py-1 rounded hover:bg-blue-50 w-full"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
