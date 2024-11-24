'use client';
import { DataTable } from '@/components/ui-reusable/datatable/datatable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { columns } from './datatable/columns';
import { EmployeeHoursWithDetails, EmployeeWithDetails } from '@/types/EmployeeType';
import { useTranslations } from "next-intl"

interface WorkHoursTrackingProps {
  employee: any;
  hours: any[];
}

interface MonthlySummary {
  month: string;
  totalHours: number;
  totalMinutes: number;
  totalEarnings: number;
  totalOvertime: number;
  overtimeHours: number;
}

const WorkHoursTracking = ({ employee, hours }: WorkHoursTrackingProps) => {
  const [monthlySummaries, setMonthlySummaries] = useState<MonthlySummary[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const summaries: Record<string, MonthlySummary> = {};

    hours.forEach((entry: any) => {
      const month = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(new Date(entry.date));

      if (!summaries[month]) {
        summaries[month] = { month, totalHours: 0, totalMinutes: 0, totalEarnings: 0,  totalOvertime: 0, overtimeHours: 0 };
      }

      const entryTotalMinutes = entry.hours * 60 + (entry.minutes || 0);

      const entryHours = Math.floor(entryTotalMinutes / 60);
      const entryMinutes = entryTotalMinutes % 60;

      summaries[month].totalHours += entryHours;
      summaries[month].totalMinutes += entryMinutes;

      const entryEarnings = (entryTotalMinutes / 60) * (employee.hourlyRate || 0);
      summaries[month].totalEarnings += entryEarnings;
      
      if (employee.salary) {
        const overtimeHours = entry?.overtime ?? 0;
        const employeeOvertimeRate = employee?.overtime ?? 0; 
        summaries[month].overtimeHours += overtimeHours;
        summaries[month].totalOvertime += overtimeHours * employeeOvertimeRate;
    }
    });
    
    

    Object.values(summaries).forEach((summary) => {
      const extraHours = Math.floor(summary.totalMinutes / 60);
      summary.totalHours += extraHours;
      summary.totalMinutes = summary.totalMinutes % 60;
    });

    setMonthlySummaries(Object.values(summaries));
    setLoading(false);
  }, [hours, employee.hourlyRate, employee.salary]);

  const t = useTranslations('Employee');

  return (
    <div>
      <DataTable data={hours} columns={columns} />

      <div className='flex flex-row flex-wrap gap-5 justify-start mt-6 mb-6 space-y-4'>
      {loading ? (
          Array(3)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className='w-[300px] mx-auto animate-pulse'>
                <CardContent className='p-5'>
                  <div className='h-6 bg-gray-300 rounded mb-4'></div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                      <span className='h-4 w-1/3 bg-gray-300 rounded'></span>
                      <span className='h-4 w-1/4 bg-gray-300 rounded'></span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='h-4 w-1/3 bg-gray-300 rounded'></span>
                      <span className='h-4 w-1/4 bg-gray-300 rounded'></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
        ) : (
          monthlySummaries.map((summary) => (
            <Card key={summary.month} className='w-[300px] mx-auto'>
              <CardContent className='p-5'>
                <h3 className='text-lg font-bold'>{summary.month}</h3>
                <div className='flex flex-col mt-2'>
                {employee.salary ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-stone-700">{t('overtimeHours')}</span>
                      <span className="font-bold">{summary.overtimeHours} h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-700">{t('overtimeTotal')}</span>
                      <span className="font-bold">
                        {summary.totalOvertime.toFixed(2)} €
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-stone-700">{t('totalHours')}</span>
                      <span className="font-bold">
                        {summary.totalHours} h
                        {summary.totalMinutes > 0 && ` ${summary.totalMinutes} m`}
                      </span>
                    </div>
                  </>
                )}

                  <div className='flex justify-between'>
                    <span className='text-stone-700'>{t('totalEarning')}</span>
                    <span className='font-bold'>
                      {summary.totalEarnings.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkHoursTracking;
