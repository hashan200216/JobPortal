import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const navLinks = user && user.role === "recruiter" ? (
    <>
      <Link
        to="/admin/companies"
        className="nav-link"
        onClick={() => setMobileMenuOpen(false)}
      >
        Companies
      </Link>
    </>
  ) : (
    <>
      <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
        Home
      </Link>
      <Link
        to="/jobs"
        className="nav-link"
        onClick={() => setMobileMenuOpen(false)}
      >
        Jobs
      </Link>
      <Link
        to="/browse"
        className="nav-link"
        onClick={() => setMobileMenuOpen(false)}
      >
        Browse
      </Link>
    </>
  );

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <h1 className="text-2xl font-extrabold text-blue-700 select-none">
                Job
                <span className="text-[#F83002]">Portal</span>
              </h1>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 font-semibold text-gray-700">
              {navLinks}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-4">
              {!user ? (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="px-4 py-1 text-sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] px-4 py-1 text-sm">
                      Signup
                    </Button>
                  </Link>
                </>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer border-2 border-blue-500">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname || "User"}
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="border-2 border-blue-500">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt={user?.fullname || "User"}
                        />
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {user?.fullname}
                        </h4>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">
                          {user?.profile?.bio || "No bio provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-gray-700">
                      {user.role === "student" && (
                        <Button
                          variant="ghost"
                          className="justify-start px-0 text-sm"
                          asChild
                        >
                          <Link
                            to="/profile"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <User2 className="inline-block mr-2" />
                            View Profile
                          </Link>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        onClick={logoutHandler}
                        className="justify-start px-0 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="inline-block mr-2" />
                        Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-4 py-4 space-y-3 font-semibold text-gray-700">
            <div className="flex flex-col space-y-2">{navLinks}</div>
            <div className="pt-3 border-t border-gray-200 flex flex-col space-y-2">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full py-2 text-sm">
                      Login
                    </Button>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] py-2 text-sm">
                      Signup
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  {user.role === "student" && (
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-blue-50 rounded"
                    >
                      <User2 />
                      View Profile
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logoutHandler();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded font-semibold"
                  >
                    <LogOut />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}

      </nav>

      {/* Main content wrapper */}
      <main className="max-w-4xl mx-auto p-6 mt-8">
        {/* Replace this div with your page content */}
        
      </main>

      <style>{`
        .nav-link {
          position: relative;
          padding: 0.5rem 0.75rem;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: #3b82f6;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #3b82f6;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Navbar;
