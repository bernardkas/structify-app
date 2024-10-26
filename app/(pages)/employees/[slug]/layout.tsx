import { getEmployeeById } from "@/actions/Model/employee";
import SubpageEmployeeNavigation from "@/components/employees/subpages/SubpageEmployeeNavigation";
import DetailPage from "@/components/ui-reusable/detail-page";

export default async function EmployeeLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const employee = await getEmployeeById(params.slug)
  return (
    <div className='mx-3'>
       <DetailPage data={employee} name='Employee' />
       <div className="flex flex-row bg-slate-600 rounded-full w-fit my-3">
       <SubpageEmployeeNavigation employee={employee} />
       </div>
        {children}
    </div>
  );
}
