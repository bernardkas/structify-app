import { getProjectById } from "@/actions/Model/project";
import SubpageProjectNavigation from "@/components/projects/subpages/SubpageProjectNavigation";
import DetailPage from "@/components/ui-reusable/detail-page";
import { Project } from "@prisma/client";



export default async function ProjectLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const project = await getProjectById(params) as Project;
  return (
    <div className='mx-3'>
       <DetailPage data={project} />
       <div className="flex flex-row bg-slate-600 rounded-full w-fit my-3">
       <SubpageProjectNavigation project={project} />
       </div>
        {children}
    </div>
  );
}
