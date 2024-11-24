'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateAddHoursProjectSchema } from './validation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import Autocomplete from '@/components/ui-reusable/autocomplete';
import {
  createProjectHours,
  updateProjectHours,
} from '@/actions/Model/project-hours';
import { ProjectHoursWithDetails, ProjectWithDetails } from '@/types/ProjectType';
import { useTranslations } from 'next-intl';

interface AddProjectHoursFormProps {
  projectHours?: ProjectHoursWithDetails;
  projects: ProjectWithDetails[];
  isEditing?: boolean;
  setOpenDialog: (a: boolean) => void;
}

const AddProjectHoursForm = ({
  projectHours,
  isEditing,
  projects,
  setOpenDialog,
}: AddProjectHoursFormProps) => {
  const initialDate = projectHours?.date
    ? new Date(projectHours.date)
    : new Date();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
  );

  const [selectedProject, setSelectedProject] = useState<string>(
    projectHours?.project?.uuid || ''
  );

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateAddHoursProjectSchema>>({
    resolver: zodResolver(CreateAddHoursProjectSchema),
    // @ts-ignore
    defaultValues: projectHours || {
      // @ts-ignore
      uuid: projectHours?.employee?.uuid || '',
      projectId: '',
      hours: 0,
      minutes: 0,
      description: '',
      date: selectedDate,
    },
  });

  const t = useTranslations('ProjectHours.form');

  const create = (values: z.infer<typeof CreateAddHoursProjectSchema>) => {
    setLoading(true);
    createProjectHours(values).then(data => {
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

  const update = (values: z.infer<typeof CreateAddHoursProjectSchema>) => {
    setLoading(true);
    updateProjectHours(values).then(data => {
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

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    form.setValue('date', date as any);
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
            {/* Reminder Name */}
            <div className='flex flex-row gap-2 items-end'>
              <FormField
                control={form.control}
                name='projectId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('name')}</FormLabel>
                    <FormControl>
                      <Autocomplete
                        data={projects}
                        placeholder={t('name')}
                        // @ts-ignore
                        onSelect={handleSelectProject}
                        modelValue={selectedProject}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Start Date */}
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>{t('date')}</FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                        buttonText={t('date')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-row gap-2'>
              <FormField
                control={form.control}
                name='hours'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*{t('hours')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        placeholder='8'
                        className='text-black'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='minutes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('minutes')} (optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        placeholder='30'
                        className='text-black'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>{t('description')}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Description'
                      className='text-black resize-none'
                      rows={5}
                      maxLength={1000}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-row gap-2'>
              <Button className='flex items-end justify-end' type='submit'>
                {loading ? (
                  <BeatLoader className='text-white' />
                ) : isEditing ? (
                  t('update')
                ) : (
                  t('create')
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProjectHoursForm;
