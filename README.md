
Single Backend (Node.js + Express + MongoDB):

Handles authentication (signup/login) for Admin, User, and Company.

Handles CRUD operations for Companies, Jobs, and Applications.

Stores all data in one MongoDB database with separate collections:

Users (admins and normal users)

Companies

Jobs

Applications

Single Frontend (React.js + Redux + Tailwind):

React handles role-based routing:

/admin → Admin dashboard

/user → User dashboard/profile/jobs

/company → Company dashboard/jobs/applicants

One frontend, but components/pages differ depending on logged-in role.

Shared Logic:

Authentication and session management are shared across roles.

File uploads (CVs) are stored and referenced in the same backend.

Application status is maintained in the Applications collection for each user-job relation.
