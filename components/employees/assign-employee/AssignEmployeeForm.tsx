'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import Autocomplete from '@/components/ui-reusable/autocomplete';
import { EmployeeHoursWithDetails } from '@/types/EmployeeType';
import {
  createAssignEmployee,
  updateAssignEmployee,
} from '@/actions/Model/assign-employee';
import { CreateAssignEmployeeSchema } from './validation';
import { ProjectWithDetails } from '@/types/ProjectType';
import { AssignEmployeeWithDetails } from '@/types/AssignEmployeeType';

interface AssignEmployeeFormProps {
  assignEmployee?: AssignEmployeeWithDetails;
  employee: EmployeeHoursWithDetails[];
  isEditing?: boolean;
  setOpenDialog: (a: boolean) => void;
  projects: ProjectWithDetails[];
}

const AssignEmployeeForm = ({
  assignEmployee,
  isEditing,
  employee,
  setOpenDialog,
  projects,
}: AssignEmployeeFormProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>(
    assignEmployee?.employee?.uuid || ''
  );
  const [selectedProject, setSelectedProject] = useState<string>(
    assignEmployee?.project?.uuid || ''
  );

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateAssignEmployeeSchema>>({
    resolver: zodResolver(CreateAssignEmployeeSchema),
    // @ts-ignore
    defaultValues: assignEmployee || {
      // @ts-ignore
      uuid: assignEmployee?.employee?.uuid || '',
      employeeId: '',
      projectId: '',
    },
  });

  const create = (values: z.infer<typeof CreateAssignEmployeeSchema>) => {
    setLoading(true);
    createAssignEmployee(values).then(data => {
      if (data?.success) {
        toast(data?.success, { type: 'success' });
        setLoading(false);
        setOpenDialog(false);
      }
      if (data?.error) {
        toast(data?.error, { type: 'error' });
        setLoading(false);
      }
    });
  };

  const update = (values: z.infer<typeof CreateAssignEmployeeSchema>) => {
    setLoading(true);
    updateAssignEmployee(values).then(data => {
      if (data?.success) {
        toast(data?.success, { type: 'success' });
        setLoading(false);
        setOpenDialog(false);
      }
      if (data.error) {
        toast(data?.error, { type: 'error' });
        setLoading(false);
        setOpenDialog(false);
      }
    });
  };

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
    };

    if (isEditing) {
      update({
        ...data,
      });
    } else {
      create(payload);
    }
  };

  const handleSelectClient = (employeeId: string) => {
    const client = employee?.find(c => c.uuid === employeeId);
    if (client) {
      form.setValue('employeeId', employeeId as any);
      setSelectedEmployee(client.uuid);
    }
  };
  const handleSelectProject = (projectId: string) => {
    const project = projects?.find(c => c.uuid === projectId);
    if (project) {
      form.setValue('projectId', projectId as any);
      setSelectedProject(project.uuid);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-5'>
            <div className='flex flex-row gap-2 items-end'>
              <FormField
                control={form.control}
                name='employeeId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee</FormLabel>
                    <FormControl>
                      <Autocomplete
                        data={employee}
                        placeholder='Search employees...'
                        // @ts-ignore
                        onSelect={handleSelectClient}
                        modelValue={selectedEmployee}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-row gap-2 items-end'>
                <FormField
                  control={form.control}
                  name='projectId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Projects</FormLabel>
                      <FormControl>
                        <Autocomplete
                          data={projects}
                          placeholder='Search projects...'
                          // @ts-ignore
                          onSelect={handleSelectProject}
                          modelValue={selectedProject}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='flex flex-row gap-2'>
              <Button className='flex items-end justify-end' type='submit'>
                {loading ? (
                  <BeatLoader className='text-white' />
                ) : isEditing ? (
                  'Update'
                ) : (
                  'Assign employee'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AssignEmployeeForm;
