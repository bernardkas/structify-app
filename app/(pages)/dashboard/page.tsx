import { getClients } from '@/actions/Model/clients';
import { getEmployees } from '@/actions/Model/employee';
import { getEmployeeHours } from '@/actions/Model/employee-hours';
import { getProjects } from '@/actions/Model/project';
import { auth } from '@/auth';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

const DashboardPage = async () => {
  const [projects, clients, employees, employeeHours] = await Promise.all([
    getProjects(),
    getClients(),
    getEmployees(),
    getEmployeeHours(),
  ]);
  const currentUser = await auth();

  return (
    <DashboardOverview
      projects={projects}
      clients={clients}
      employees={employees}
      employeeHours={employeeHours}
      currentUser={currentUser?.user}
    />
  );
};

export default DashboardPage;
