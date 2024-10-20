import PlansBlueprints from '@/components/projects/subpages/plans-blueprints/PlansBlueprints'
import React from 'react'
import { getProjectById } from '@/actions/Model/project';
import { getPlansBlueprint } from './../../../../../actions/Model/plans-blueprints';

type PlansAndBlueprintsProps = {
    params: {
        slug: string
    }
}

const PlansAndBlueprints = async  ({params}: PlansAndBlueprintsProps) => {
    const getPlansBlueprints = await getPlansBlueprint(params.slug)
    const project = await getProjectById(params)
    const projectId = project?.uuid
  return (
    <div>
        <PlansBlueprints getPlansBlueprints={getPlansBlueprints} projectId={projectId ?? ""} />
    </div>
  )
}

export default PlansAndBlueprints