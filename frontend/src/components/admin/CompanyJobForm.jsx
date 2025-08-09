// File: frontend/components/admin/CompanyJobForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const CompanyJobForm = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        company: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${USER_API_END_POINT}/companyjob`, form, { withCredentials: true });
            toast.success(res.data.message);
            setForm({ title: '', description: '', location: '', salary: '', company: '' });
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <Input name='title' placeholder='Job Title' value={form.title} onChange={handleChange} />
            <Input name='description' placeholder='Description' value={form.description} onChange={handleChange} />
            <Input name='location' placeholder='Location' value={form.location} onChange={handleChange} />
            <Input name='salary' placeholder='Salary' type='number' value={form.salary} onChange={handleChange} />
            <Input name='company' placeholder='Company ID' value={form.company} onChange={handleChange} />
            <Button type='submit'>Add Company Job</Button>
        </form>
    );
};

export default CompanyJobForm;
