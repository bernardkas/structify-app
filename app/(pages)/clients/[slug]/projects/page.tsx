import { getProjectByClientId } from '@/actions/Model/clients';
import ClientProjects from '@/components/clients/subpages/projects/ClientProjects';
import React from 'react';

type SubpageRemainderProps = {
  params: {
    slug: string;
  };
};

const SubpageProject = async ({ params }: SubpageRemainderProps) => {
  const clientId = params.slug;
  const projects = await getProjectByClientId(clientId);
  return (
    <div>
      <ClientProjects projects={projects} />
    </div>
  );
};

export default SubpageProject;
