'use client'

import { useFormattedDate } from "@/lib/use-formatted-date";
import { EmployeeHoursWithDetails, EmployeeWithDetails } from "@/types/EmployeeType";
import { Employee } from "@prisma/client";

interface RecentEmployeesHoursProps {
    employeeHours: EmployeeHoursWithDetails[];
}

const RecentEmployeesHours = ({employeeHours}: RecentEmployeesHoursProps) => {
    return (
      <div className="space-y-8">
      {employeeHours
        .filter((employee) => employee.hours !== 0) 
        .map((employee, index) => (
          <div key={index} className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{employee.name}</p>
              <p className="text-sm text-muted-foreground">
                {useFormattedDate(employee.date)}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {employee.hours}h {employee?.minutes || ''}
            </div>
          </div>
        ))}
    </div>
    )
  }

  export default RecentEmployeesHours