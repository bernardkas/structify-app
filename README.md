This is a starter tamplate the stack we use is:

- Nextjs (Server-Side Actions)
- Prisma,
- Cockroachdb,
- Authjs (Auth provider && Credentials),
- Tailwind,
- Shadcn,
- react-icons and Lucide-react,
- Stripe,
- CDN AWS S3 Bucket,

How to use:

Copy `.env.example` to `.env` and fill in your own service credentials:

```sh
cp .env.example .env
```

The example documents the database, Auth.js, OAuth, email, S3, Stripe, and
analytics settings. Keep secrets in `.env` or your deployment's environment
settings. Only `NEXT_PUBLIC_` values may be exposed to the browser; Stripe's
secret key must use `STRIPE_SECRET_KEY`.

yarn next dev

The Structify project is a software solution designed to manage various aspects of construction-related tasks, including managing clients, employees, houses, and other construction projects. It aims to streamline and simplify the management process, providing a centralized platform for project owners, managers, or administrators to efficiently handle tasks and operations related to construction. Here's a detailed explanation:

Key Features of Structify: Client Management:

Store Client Information: Structify allows users to create detailed records of clients, including basic contact information (name, email, phone), billing information, and any associated projects. Track Client Interactions: The platform tracks client interactions, including meetings, contracts, and communications, providing a comprehensive view of each client’s history. Employee Management:

Employee Information Tracking: Users can manage detailed information about employees, such as their name, job role, contact information, hourly payment rates, and total working hours. Automatic Pay Calculation: Structify calculates employee pay based on hours worked and their hourly rate, helping managers stay on top of payroll. Work Schedule and Task Assignment: Managers can assign tasks or projects to employees and track their progress and performance. Project Management:

Project Creation: Users can create new construction or renovation projects and track their progress, budget, deadlines, and associated clients and employees. Task Assignment: Specific tasks can be broken down within a project and assigned to employees or contractors, allowing for better coordination of work. Budget and Cost Tracking: Structify allows users to track the budget for each project, including estimated costs, actual costs, and any cost overruns. House/Property Management:

Property Records: Users can maintain a database of houses or properties being built, renovated, or maintained. This includes key details like location, property size, and construction phase. Link Properties to Projects: Properties can be linked to ongoing projects, providing visibility into which projects are happening at which locations. Recurring Task Reminders:

Automated Reminders: Structify includes a feature for setting recurring reminders for regular tasks. For example, a user can set up a weekly reminder for specific maintenance or inspection tasks, and the system will automatically send email notifications. Document Management:

Store and Manage Contracts and Blueprints: Structify allows users to upload and manage important project documents, such as contracts, architectural plans, permits, and inspection reports. Access Control: Role-based access to documents, so only authorized team members can view or modify certain documents. Invoicing and Payments:

Generate and Manage Invoices: Structify supports invoicing for completed work, allowing users to track pending payments and payment schedules. Client Payment Tracking: Payments from clients can be logged and tracked against projects, ensuring financial records are up to date. Reminders and Scheduling:

Project and Task Scheduling: Users can set deadlines for specific tasks within a project and assign employees to those tasks. The dashboard provides a visual timeline of upcoming work and deadlines. Reminders: The system can automatically send reminders about project deadlines or tasks that need to be completed regularly (e.g., weekly maintenance checks). Customizable Dashboard:

Centralized Overview: The dashboard provides a high-level overview of key metrics, such as total clients, employees, projects, properties, and financial information. Task Management: Users can track current tasks, upcoming deadlines, and employee performance directly from the dashboard. User Authentication and Security:
