import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const storedCompany = JSON.parse(localStorage.getItem("company"));
        if (!storedCompany) {
            navigate("/CompanyLogin"); // not logged in
        } else {
            setCompany(storedCompany);
        }
    }, [navigate]);

    return company ? <>{children}</> : null;
};

export default CompanyProtectedRoute;
