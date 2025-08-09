import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';

const AdminSettings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    role: '',
    file: null,
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    // Populate form with current user data
    setInput({
      fullname: user.fullname || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      role: user.role || '',
      file: null,
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setInput({ ...input, file: files[0] });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(input).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      const response = await axios.put(`${USER_API_END_POINT}/update-profile`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success('Profile updated successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile update failed');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 p-6 border border-gray-200 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-4">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-4">
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-4">
            <Label>Role</Label>
            <Input
              type="text"
              name="role"
              value={input.role}
              onChange={handleChange}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="my-4">
            <Label>Change Profile Picture</Label>
            <Input type="file" name="file" accept="image/*" onChange={handleChange} />
          </div>
          <Button type="submit" className="w-full mt-6">Save Changes</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;

 