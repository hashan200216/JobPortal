import React from "react";
import { useSelector } from "react-redux";

const ApplicantsList = ({ jobId }) => {
  const { applications } = useSelector((store) => store.application);

  // Just display list of applicant names and emails
  return (
    <div>
      <h2 className="font-semibold text-lg my-3">Applicants List</h2>
      <ul>
        {applications.length > 0 ? (
          applications.map((app) => (
            <li key={app._id}>
              {app.applicant?.fullname || "No Name"} - {app.applicant?.email || "No Email"}
            </li>
          ))
        ) : (
          <li>No applicants yet</li>
        )}
      </ul>
    </div>
  );
};

export default ApplicantsList;
