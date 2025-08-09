import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/"); // Not logged in
        } else if (user.role === "recruiter") {
            navigate("/admin/jobs"); // Recruiter dashboard
        } else if (user.role === "companylog") {
            navigate("/company/dashboard"); // Company dashboard
        }
    }, [user]);

    return <>{children}</>;
};

export default ProtectedRoute;
