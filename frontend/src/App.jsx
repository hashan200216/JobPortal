// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import CompanyNavbar from './components/company/CompanyNavbar';

import CompanyProtectedRoute from './components/company/CompanyProtectedRoute';
import CompanyDashboard from './components/company/CompanyDashboard';
import CompanyLogin from './components/auth/CompanyLogin';
import CompanyPostJob from './components/company/CompanyPostJob';
import CompanyEditJob from './components/company/CompanyEditJob';
import CompanyJobDetail from './components/company/CompanyJobDetail';
import CompanyApplicants from './components/company/CompanyApplicants';
import CompanyApplicantsTable from './components/company/CompanyApplicantsTable';



function App() {
  return (
    <Router>
      <Routes>
        {/* Shared Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/description/:id' element={<JobDescription />} />
        <Route path='/browse' element={<Browse />} />
        <Route path='/profile' element={<Profile />} />

        {/* Admin Routes */}
        <Route path='/admin/companies' element={<ProtectedRoute><Companies /></ProtectedRoute>} />
        <Route path='/admin/companies/create' element={<ProtectedRoute><CompanyCreate /></ProtectedRoute>} />
        <Route path='/admin/companies/:id' element={<ProtectedRoute><CompanySetup /></ProtectedRoute>} />
        <Route path='/admin/jobs' element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
        <Route path='/admin/jobs/create' element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
        <Route path='/admin/jobs/:id/applicants' element={<ProtectedRoute><Applicants /></ProtectedRoute>} />

        {/* Company Routes */}
        <Route path='/company/login' element={<CompanyLogin />} />
        <Route path='/company/dashboard' element={<CompanyProtectedRoute><CompanyDashboard /></CompanyProtectedRoute>} />
        <Route path='/company/jobs/create' element={<CompanyProtectedRoute><CompanyPostJob /></CompanyProtectedRoute>} />
        <Route path='/company/jobs/:id/edit' element={<CompanyProtectedRoute><CompanyEditJob /></CompanyProtectedRoute>} />
        <Route path='/company/jobs/:id' element={<CompanyProtectedRoute><CompanyJobDetail /></CompanyProtectedRoute>} />
        <Route path='/company/jobs/:jobId/applicants' element={<CompanyProtectedRoute><CompanyApplicants /></CompanyProtectedRoute>} />
        <Route path='/company/login' element={<CompanyLogin />} /> <Route path='/CompanyLogin' element={<CompanyLogin />} /> // optional alias
        <Route path="/company/jobs/:id/applicants" element={<CompanyApplicants />} />
        <Route path="/company/jobs/:id/applicants" element={<CompanyApplicantsTable />} />
        

      </Routes>
    </Router>
  );
}

export default App;
