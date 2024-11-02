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
import { getMonthlyBudgetData } from '@/lib/monthly-budget-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import RecentEmployeesHours from './ui/recent-employees-hour';

interface DashboardOverviewProps {
  projects: any;
  clients: any;
  employees: any;
  employeeHours: any
}

const DashboardOverview = ({
  projects,
  clients,
  employees,
  employeeHours
}: DashboardOverviewProps) => {
  const [timeRange, setTimeRange] = useState<string>('12');
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [filteredClients, setFilteredClients] = useState<any[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    setLoading(true);
    const filteredProjects = filterDataByTimeRange(
      projects,
      timeRange,
      'createdAt'
    );
    setFilteredProjects(filteredProjects);
    setLoading(false);
  }, [projects, timeRange]);

  useEffect(() => {
    setLoading(true);
    const filteredClients = filterDataByTimeRange(
      clients,
      timeRange,
      'createdAt'
    );
    setFilteredClients(filteredClients);
    setLoading(false);
  }, [clients, timeRange]);

  useEffect(() => {
    setLoading(true);
    const filteredEmployees = filterDataByTimeRange(
      employees,
      timeRange,
      'createdAt'
    );
    setFilteredEmployees(filteredEmployees);
    setLoading(false);
  }, [employees, timeRange]);

  const totalBudget = Array.isArray(filteredProjects)
    ? filteredProjects.reduce(
        (acc, project) => acc + (project.totalBudget || 0),
        0
      )
    : 0;

  const totalProjects = filteredProjects.length;
  const totalClients = filteredClients.length;
  const totalEmployees = filteredEmployees.length;

  const monthlyBudgetData = getMonthlyBudgetData(
    filteredProjects,
    'createdAt',
    'totalBudget',
  );



  return (
    <div className='space-y-5 mx-3'>
      <div className='flex flex-row justify-between items-center mt-5'>
        <Title>Armaturenbrett</Title>
        <FilterDashboard onChange={setTimeRange} />
      </div>
      <div className='grid gap-4  md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
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
                € {totalBudget.toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Clients</CardTitle>
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
            <CardTitle className='text-sm font-medium'>Projects</CardTitle>
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
            <CardTitle className='text-sm font-medium'>Employees</CardTitle>
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
            <CardTitle>Overview</CardTitle>
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
            <Overview monthlyBudgetData={monthlyBudgetData} />
          </CardContent>
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Recent Employees hours</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentEmployeesHours employeeHours={employeeHours} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
