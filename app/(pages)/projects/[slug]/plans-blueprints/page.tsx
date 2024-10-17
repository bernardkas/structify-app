import PlansBlueprints from '@/components/projects/subpages/plans-blueprints/PlansBlueprints'
import React from 'react'
import { getProjectById } from '@/actions/Model/project';

type PlansAndBlueprintsProps = {
    params: {
        slug: string
    }
}

const PlansAndBlueprints = async  ({params}: PlansAndBlueprintsProps) => {
    const project = await getProjectById(params)
    const projectId = project?.uuid
  return (
    <div>
        <PlansBlueprints projectId={projectId ?? ""} />
    </div>
  )
}

export default PlansAndBlueprints