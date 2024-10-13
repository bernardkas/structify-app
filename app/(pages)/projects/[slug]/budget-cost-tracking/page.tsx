import { getBudgetAndCosts } from '@/actions/Model/budget-cost-tracking'
import { getProjectById } from '@/actions/Model/project'
import BudgetCostTracking from '@/components/projects/subpages/budget-cost-tracking/BudgetCostTracking'
import React from 'react'
type BudgetAndCostTrackingProps = {
  params: {
    slug: string;
  };
};
const BudgetAndCostTracking = async ({params}: BudgetAndCostTrackingProps) => {
  const project = await getProjectById(params)
  const projectId = project?.uuid
  const budgetAndCosts =  await getBudgetAndCosts(params.slug)
  return (
   <div>
    <BudgetCostTracking budgetAndCosts={budgetAndCosts} projectId={projectId} />
   </div>
  )
}

export default BudgetAndCostTracking