import { getClients } from "@/actions/Model/clients";
import { getEmployees } from "@/actions/Model/employee";
import { getEmployeeHours } from "@/actions/Model/employee-hours";
import { getProjects } from "@/actions/Model/project";
import DashboardOverview from "@/components/dashboard/DashboardOverview";


const  DashboardPage = async () => {
  const [projects, clients, employees, employeeHours] = await Promise.all([
    getProjects(),
    getClients(),
    getEmployees(),
    getEmployeeHours()
  ]);


  return (
        <DashboardOverview projects={projects} clients={clients} employees={employees} employeeHours={employeeHours} />
  );
}

export default DashboardPage;
