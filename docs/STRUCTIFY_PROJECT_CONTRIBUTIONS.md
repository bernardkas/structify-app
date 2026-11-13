# Structify — My Project Contributions

## A short answer: “What did you build?”

“I developed Structify, a full-stack web application for managing construction business operations. I worked across client and project management, employee assignments, work-hour tracking, budgets, materials, project documents, invoicing, and dashboard reporting. I also implemented Stripe subscription integration and multilingual interfaces. The application uses Next.js, React, TypeScript, Prisma, and CockroachDB, with AWS S3 for file storage and Resend for email workflows.”

## A longer answer for interviews or meetings

“Structify brings several construction management workflows into one application. A user can manage clients, create projects for those clients, assign employees, record working hours, track costs and materials, store plans and blueprints, and prepare invoices.

“My work covered both the interface and the backend. I built forms, tables, detail pages, navigation, and dashboard views, then connected those screens to server actions and relational database models. I used validation schemas for input, implemented calculations for recorded hours and earnings, and built the relationships between clients, projects, employees, and their supporting records.

“I also worked on the SaaS side: pricing screens, Stripe payment links and webhook handling, subscription records, and plan-based creation restrictions. I added English, German, and Albanian translation resources and language switching. Throughout the project, I made responsive UI improvements and fixes to invoices, time calculations, authentication screens, and other workflows.”

## What the project does

Structify is a construction operations application. Its central workflow connects a business's clients to their projects and connects those projects to employees, time records, costs, materials, and documents. Invoices are managed as account-owned records containing company, recipient, line-item, and tax information.

The value of the project is this connected workflow: users can work with related operational records inside one application instead of handling every area separately.

## My work across the application

### 1. Application structure and navigation

- Built application layouts, navigation, and routes for the main business modules.
- Added desktop and mobile navigation and responsive interface improvements.
- Connected overview pages to detail pages and module-specific subpages.
- Used shared UI components for forms, dialogs, tables, upload controls, and feedback.

**How to explain it:** “I built the structure that lets users move between business records and their related workflows without treating each feature as a separate application.”

### 2. Authentication and account settings

The application includes email/password registration and sign-in, password hashing with bcrypt, email verification, password recovery, and token-based password reset. Auth.js manages sessions through a Prisma adapter and JWT session strategy. The configuration includes Google, Facebook, and GitHub providers.

Protected-route middleware redirects unauthenticated users to sign-in and preserves the intended destination. Account settings include name, email, and password changes, with different controls for OAuth users, and an account deletion action.

**How to explain it:** “I worked with the authentication and account foundation and integrated protected routes into the application. It includes verification and recovery workflows, rather than only a login screen.”

### 3. Client management

- Implemented client creation, listing, detail views, updates, deletion, and an archive action.
- Stored contact details, organization, status, address, and generated client identifiers.
- Connected clients to their projects and recurring reminders.
- Loaded client overview records for the signed-in user.
- Added validation and subscription checks to client creation.

**How to explain it:** “I built client management with persistent records and relationships to projects and reminders.”

### 4. Recurring client reminders

- Built reminder forms and management screens associated with clients.
- Stored start date, weekly or monthly frequency, selected days, time, recipient, message, and status.
- Implemented a reminder service that selects due active reminders and sends emails through Resend.
- Added a cron endpoint and a Vercel cron configuration.
- Used timezone-aware date handling and deduplicated reminders within a send run.

**How to explain it:** “I implemented the recurring reminder workflow, including scheduling fields, due-reminder selection, and email sending.”

### 5. Project management

- Built project creation, overview, detail, editing, deletion, and an archive action.
- Linked projects to clients and addresses.
- Stored project type, status, description, start date, hourly rate, and total budget.
- Added project subpages for costs, materials, documents, assigned employees, and recorded project hours.
- Loaded project overview records through the signed-in user's client relationships.

**How to explain it:** “I made the project the central record connecting the client, location, team, costs, materials, documents, and time entries.”

### 6. Budget and cost tracking

- Built project budget and cost forms, tables, and server actions.
- Stored budget amounts, incurred costs, cost overruns, and categorized estimated costs.
- Managed estimated-cost records as children of a project budget.
- Added validation for financial input fields.

**How to explain it:** “I implemented structured project cost tracking, including separate estimated-cost entries and recorded incurred costs.”

### 7. Materials and suppliers

- Built project material records with names, descriptions, statuses, suppliers, and dates.
- Supported material detail items with names and prices.
- Implemented creation, editing, listing, and deletion connected to the project.

**How to explain it:** “I added materials management so project supply information could be recorded alongside the rest of the project.”

### 8. Plans, blueprints, and file uploads

- Built project document upload and listing interfaces.
- Implemented upload handling backed by AWS S3.
- Stored document metadata and file references in the database.
- Linked document records to projects and added document-record deletion.
- Reused file and image upload components in the interface.

**How to explain it:** “I connected cloud file storage to project document records, so users could keep plans and blueprints with their projects.”

### 9. Employee management and project assignments

- Built employee creation, overview, detail, update, and deletion workflows.
- Stored contact information, address, job title, start month, hourly rate, salary, and overtime rate.
- Built employee-to-project assignment management.
- Added employee detail navigation and work-hour views.
- Loaded employee and assignment overview records using account relationships.

**How to explain it:** “I built employee records and project assignments, connecting workforce information to the operational side of the application.”

### 10. Employee and project work-hour tracking

- Implemented separate time-entry workflows for employees and projects.
- Recorded hours, minutes, dates, and descriptions; employee entries also support overtime.
- Built tables and monthly summaries for recorded time.
- Converted hours and minutes into a consistent total for earnings calculations.
- Calculated employee earnings using hourly rates and overtime amounts using overtime rates.
- Calculated project time value using the project's hourly rate.

**Example to explain the calculation:** “If a time entry is 2 hours and 30 minutes, I convert it to 150 minutes, divide by 60, and multiply the resulting 2.5 hours by the hourly rate. Monthly summaries also carry excess minutes into hours.”

This is time and earnings tracking; it does not establish bank payouts or a complete payroll system.

### 11. Invoice creation and PDF rendering

- Built invoice listing, creation, detail, editing, and deletion workflows.
- Stored company information, logo, invoice number, date, and recipient details.
- Added invoice line items with quantities, unit prices, and calculated amounts.
- Implemented subtotal, tax, and final-total calculations in the editor.
- Integrated Tiptap for rich-text invoice content.
- Used React PDF to render an invoice preview on the editing/detail interface.
- Persisted invoices and their line items through Prisma server actions.

**How to explain it:** “I built an invoice workflow from editable business data through saved invoice records and PDF presentation.”

### 12. Dashboard and reporting

- Built summary cards for clients, projects, and employees.
- Added time-range filtering to overview data.
- Built monthly chart data from project budgets and recorded project hours.
- Added a recent employee-hours view.
- Added a financial summary combining project budgets and the calculated value of project hours.

**How to explain it:** “I built an operational dashboard using application records and calculated summaries.”

The card labeled “total revenue” currently adds project budgets to recorded hours multiplied by project hourly rates. Describe it as a calculated project-value summary; it does not prove collected payments or recognized accounting revenue.

### 13. Stripe integration and subscription rules

- Built pricing and subscription screens for Standard and Enterprise plans.
- Connected the pricing UI to configured Stripe payment links, including a prefilled account email.
- Implemented Stripe webhook signature verification.
- Added handling for checkout completion, subscription updates, and subscription deletion.
- Stored Stripe customer, price, status, and trial information in subscription records.
- Updated the account's subscription type from payment events.
- Added creation restrictions based on subscription type in business server actions.
- Implemented trial-related UI and database logic.

**How to explain it:** “I connected the SaaS subscription workflow to Stripe events and application state, including plan-dependent creation rules.”

### 14. Languages, reusable UI, and maintenance

- Added English and German translations, followed by Albanian translation resources.
- Used next-intl to load translations and a language selector to persist the selected locale.
- Built reusable TanStack tables with filtering, sorting, pagination, column visibility, and row selection.
- Used React Hook Form and Zod for forms and validation.
- Reused Tailwind, shadcn/ui, and Radix components across modules.
- Made mobile layout, password-visibility, invoice, time-calculation, and UI fixes throughout the project history.

**How to explain it:** “I worked on usability and consistency across the application as well as its business logic, including reusable tables, validated forms, responsive screens, and language support.”

## Technical stack I can explain

| Area | Technologies and usage |
| --- | --- |
| Application | Next.js 14 App Router, React 18, TypeScript |
| Backend | Next.js server actions and API route handlers |
| Database | Prisma ORM with CockroachDB |
| Authentication | Auth.js / NextAuth, Prisma adapter, JWT sessions, bcrypt |
| UI | Tailwind CSS, shadcn/ui, Radix UI, Lucide icons |
| Forms | React Hook Form and Zod |
| Data tables | TanStack React Table |
| Reporting | Recharts and date-based aggregation helpers |
| Billing | Stripe payment links and webhook handling |
| File storage | AWS S3 and AWS SDK |
| Email | Resend |
| Invoice content | Tiptap and React PDF |
| Localization | next-intl; English, German, and Albanian resources |
| Scheduled work | Reminder endpoint and Vercel cron configuration |

## Questions I may be asked

### “Were you working on the frontend or backend?”

“Both. I worked on React interfaces and forms, and on server actions, database relationships, validation, calculations, upload handling, and external integrations.”

### “How is the data connected?”

“Users own clients and employees. Clients have projects and reminders. Projects have costs, materials, documents, and project-hour entries. Employees have their own hour entries, and assignment records connect employees to projects. Invoices and subscriptions are associated with user accounts.”

### “What was technically involved?”

“The main technical work was connecting multiple business modules through relational data, implementing nested records such as invoice line items and estimated costs, calculating time consistently, and translating external Stripe events into application subscription state.”

### “Why did you use reusable components?”

“The modules share common interactions such as forms, lists, filtering, pagination, and dialogs. Shared components let me keep those interactions consistent while defining different fields and actions for each module.”

### “How did you handle access and validation?”

“The application has protected routes, session-based account information, Zod validation in server actions, and account-based filtering in major overview queries. For a security assessment, I would also review ownership checks on every detail query and mutation.”

### “What would you improve next?”

“I would prioritize consistent ownership checks across server actions, end-to-end verification of payment and reminder workflows, stronger automated coverage for business calculations and subscription rules, and clearer accounting terminology in the dashboard.”

### “What did you achieve?”

“I implemented a connected construction operations application across the frontend, backend, database, and integrations. It covers the workflow from clients and projects through team assignments, time and cost records, project documents, and invoices.”

## A practical walkthrough to demonstrate the project

1. Explain the dashboard and how its summaries are calculated.
2. Open a client and show the related projects and reminders.
3. Open a project and show its details, budget, materials, and documents.
4. Show an employee, a project assignment, and employee work-hour summaries.
5. Show project time entries and their calculated monetary value.
6. Create or open an invoice and show its editor and PDF presentation.
7. Show the pricing screen and explain webhook-driven subscription updates.
8. Switch the interface language and show responsive navigation.

## Contribution history and source map

The available Git history runs from September 29, 2024, to February 26, 2025. Its 159 commits, including merges, use Bernard Kastrati / bernardkas author identities. The README identifies a starter template, so the clearest description is that I developed the construction-specific application on that foundation using established libraries and components.

| Milestone | Representative commit |
| --- | --- |
| Application navigation and protected routes | `f8f3052`, `1db65c1` |
| Client detail and tables | `27b82a4` |
| Reminder logic | `e208d88`, `7e238db`, `be209f1` |
| Project creation and details | `9c60a68`, `93c7e5d` |
| Budget and cost tracking | `5119a22` |
| Project materials | `30b78ad` |
| Plans and blueprints | `b2d5aa4` |
| Employee management | `4330c76` |
| Employee hours and assignments | `0abaa17`, `0b2228a`, `7d70808` |
| Invoices and rich-text editor | `0ee324a`, `3164c26` |
| Dashboard and project hours | `ede3d27`, `52122b3`, `2f1ff79` |
| Stripe events and plan rules | `a1d2ae2`, `9a04e76`, `e74ce06`, `c6a382c` |
| English and German translations | `d9212fd` |
| Albanian translations | `c5f161a` |

Implementation references:

- Application pages: `app/(pages)/`
- Business server actions: `actions/Model/`
- Database relationships: `prisma/schema.prisma`
- Authentication: `auth.ts`, `auth.config.ts`, `actions/auth.ts`, `middleware.ts`
- Reminder logic: `lib/reminderEmail.ts`, `app/api/cron/remainder/route.ts`, `vercel.json`
- File handling: `lib/upload-file-s3.ts`, `actions/upload-s3.ts`, `app/api/s3-upload/route.ts`
- Invoice editor and PDF: `components/template-invoice/`
- Dashboard calculations: `components/dashboard/DashboardOverview.tsx`, `lib/monthly-budget-data.ts`
- Subscription interface and events: `components/price/Subscription.tsx`, `app/api/webhook/stripe/route.ts`
- Localization: `i18n/request.ts`, `locales/`, `components/ui-reusable/dropdown.tsx`
- Shared interfaces: `components/ui/`, `components/ui-reusable/`

## Keep these distinctions clear when presenting

- Implementation is evidence of what was built; live provider operation requires separate verification.
- Reminder scheduling needs deployment verification: the configured daily cron and the service's exact-minute matching need to work together, and the endpoint currently exports POST.
- Authentication providers are configured in code; that alone does not establish that every provider is enabled in production.
- The project includes route protection and account-filtered lists; avoid claiming a complete authorization audit.
- Work-hour earnings calculations are separate from payroll processing, and invoice generation is separate from collecting client payments.
- Translation resources exist for three languages; avoid claiming every screen or generated PDF is fully translated without checking it.
- Use measured results only for claims about users, revenue, time saved, performance, or uptime.
