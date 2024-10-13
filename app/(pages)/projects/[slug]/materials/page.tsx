import { getMaterials } from '@/actions/Model/material'
import { getProjectById } from '@/actions/Model/project'
import Materials from '@/components/projects/subpages/materials/Materials'
import React from 'react'

type MaterialsProps = {
  params: {
    slug: string
  }
}

const MaterialPage = async ({ params }: MaterialsProps) => {
   const materials = await getMaterials(params.slug);
   const project = await getProjectById(params)
  return (
    <div>
      <Materials materials={materials} projectId={project?.uuid ?? ''} />
    </div>
  )
}

export default MaterialPage