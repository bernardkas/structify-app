'use client';
import React, { useEffect, useState } from 'react';
import FilterDashboard from '@/components/dashboard/filter-dashboard';
import Title from '@/components/ui-reusable/title';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { filterDataByTimeRange } from '@/lib/filters/project-data-by-time-range';
import { Skeleton } from '../ui/skeleton';
import { Overview } from './ui/overview';
import { getMonthlyBudgetAndHoursData } from '@/lib/monthly-budget-data';
import RecentEmployeesHours from './ui/recent-employees-hour';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface DashboardOverviewProps {
  projects: any;
  clients: any;
  employees: any;
  employeeHours: any
  currentUser?: any
}

const DashboardOverview = ({
  projects,
  clients,
  employees,
  employeeHours,
  currentUser
}: DashboardOverviewProps) => {
  const [timeRange, setTimeRange] = useState<string>('12');
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [filteredClients, setFilteredClients] = useState<any[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  const t = useTranslations('Dashboard');

  useEffect(() => {
    setLoading(true);
    

    const filteredData = {
      projects: filterDataByTimeRange(projects, timeRange, 'createdAt'),
      clients: filterDataByTimeRange(clients, timeRange, 'createdAt'),
      employees: filterDataByTimeRange(employees, timeRange, 'createdAt')
    };
  
    setFilteredProjects(filteredData.projects);
    setFilteredClients(filteredData.clients);
    setFilteredEmployees(filteredData.employees);
    
    setLoading(false);
  }, [projects, clients, employees, timeRange]);
  

  const totalBudget = Array.isArray(filteredProjects)
    ? filteredProjects.reduce(
        (acc, project) => acc + (project.totalBudget || 0),
        0
      )
    : 0;

    const totalHours = Array.isArray(filteredProjects)
  ? filteredProjects.reduce((acc, project) => {
      const projectHoursTotal = Array.isArray(project.projectHours)
        ? project.projectHours.reduce((hoursAcc: any, item: any) => {
            const totalMinutes = item.hours * 60 + item.minutes;
            return hoursAcc + totalMinutes; 
          }, 0)
        : 0;

      const totalInHours = projectHoursTotal / 60;

      const totalCost = totalInHours * (project?.hourlyRate || 0);

      return acc + totalCost;
    }, 0)
  : 0;
  
  const totalProjects = filteredProjects.length;
  const totalClients = filteredClients.length;
  const totalEmployees = filteredEmployees.length;

  const totalRevenue = totalBudget + totalHours


  const monthlyBudgetData = getMonthlyBudgetAndHoursData(
    filteredProjects,
    'createdAt', 
    'totalBudget', 
    'hours', 
    'minutes' 
  );




  return (
    <div className='space-y-5 mx-3'>
      <div className='flex flex-row justify-between items-center mt-5'>
        <Title>{t('title')}</Title>
        <FilterDashboard onChange={setTimeRange} />
      </div>
      <div className='grid gap-4  md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{t('totalRevenue')}</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'>
              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
            </svg>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className='h-10 w-full' />
            ) : (
              <div className='text-2xl font-bold'>
                € {totalRevenue.toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('totalClients')}
            </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'>
              <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
              <circle cx='9' cy='7' r='4' />
              <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
            </svg>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className='h-10 w-full' />
            ) : (
              <div className='text-2xl font-bold'>{totalClients}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('totalProjects')}
            </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'>
              <rect width='20' height='14' x='2' y='5' rx='2' />
              <path d='M2 10h20' />
            </svg>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className='h-10 w-full' />
            ) : (
              <div className='text-2xl font-bold'>{totalProjects}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{t('totalEmployees')}</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'>
              <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
            </svg>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className='h-10 w-full' />
            ) : (
              <div className='text-2xl font-bold'>{totalEmployees}</div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>{t('overview')}</CardTitle>
            {/* <CardDescription>
            <Select onValueChange={handleYearChange}>
                <SelectTrigger className='w-[180px] text-black'>
                  <SelectValue placeholder='Select Time Range' />
                </SelectTrigger>
                <SelectContent side='top'>
                    {years?.map(({label, value}) => (
                        <SelectItem value={value}>{label}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </CardDescription> */}
          </CardHeader>
          <CardContent className='pl-2'>
          {loading ? (
              <Skeleton className='h-10 w-full' />
            ) : (

              <Overview monthlyBudgetData={monthlyBudgetData} />
            )
          }
          </CardContent>
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>{t('rectenEmployees')}</CardTitle>
          </CardHeader>
          <CardContent>
          {loading ? (
              <Skeleton className='h-10 w-full' />
            ) : (

              employeeHours?.length > 0 ? (
                <RecentEmployeesHours employeeHours={employeeHours} />
                
              ) : (
                <p>No data</p>
              )
            )  
          }
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
