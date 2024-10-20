'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { BeatLoader } from 'react-spinners';
import DatePicker from '../ui/date-picker';
import ColorInput from '../ui-reusable/color-input';
import 'react-international-phone/style.css';
import { toast } from 'react-toastify';
import { CreateProjectSchema } from './validation';
import { Textarea } from '../ui/textarea';
import { createProject, updateProject } from '@/actions/Model/project';
import Autocomplete from '../ui-reusable/autocomplete';
import { ClientWithDetails } from '@/types/ClientType';

interface ProjectFormProps {
  project?: any;
  isEditing?: boolean;
  clients?: ClientWithDetails[]
}
const ProjectForm = ({ project, isEditing,clients }: ProjectFormProps) => {
  const initialDate = project?.date ? new Date(project.date) : new Date();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);
  const [loading, setLoading] = useState(false);

  const [selectedClient, setSelectedClient] = useState<string | undefined>(project?.client?.uuid);

  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      uuid: project?.uuid || "",
      name: project?.name || '',
      color: project?.color || '',
      projectStatus: project?.projectStatus || '',
      projectType: project?.projectType || '',
      description: project?.description || '',
      clientId: project?.client.uuid || selectedClient || "",
      startDate: project?.startDate ? new Date(project.startDate) : selectedDate,
      address: {
        street: project?.address?.street || '',
        city: project?.address?.city || '',
        state: project?.address?.state || '',
        zip: project?.address?.zip || '',
        country: project?.address?.country || '',
      },
    },
  });

  const create = (values: z.infer<typeof CreateProjectSchema>) => {
    setLoading(true)
    createProject(values).then(data => {
      toast("Project created successfully", {type: 'success'});
      setLoading(false)
      if (data?.error) {
        toast(data?.error, {type: 'error'});
        setLoading(false)
      }
    });
  };
  const update = (values: z.infer<typeof CreateProjectSchema>) => {
    setLoading(true)
    updateProject(values).then(data => {
      if (data?.success) {
        toast(data?.success, {type: 'success'});
        setLoading(false)
      }
      if (data.error) {
        toast(data?.error, {type: 'error'});
        setLoading(false)
      }
    });
  };

  const isCreating = (values: z.infer<typeof CreateProjectSchema>) => {
    if (isEditing) {
      return update({
        ...values,
      clientId: selectedClient
      });
    }
    return create({
      ...values,
      clientId: selectedClient
    });
  }

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    form.setValue('startDate', date);
  };

  const handleSelectClient = (clientId: string) => {
    const client = clients?.find((c) => c.uuid === clientId);
    if (client) {
      setSelectedClient(client.uuid)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(isCreating)}>
        <div className='space-y-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Name'
                    name='fullname'
                    type='text'
                    className="text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex flex-row gap-3 items-center'>
            <FormField
              control={form.control}
              name='projectStatus'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='w-[180px] text-black'>
                        <SelectValue placeholder='Status..' />
                      </SelectTrigger>
                      <SelectContent side='top'>
                        <SelectItem value='not-started'>Not started</SelectItem>
                        <SelectItem value='in-progress'>In Progress</SelectItem>
                        <SelectItem value='completed'>Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
              control={form.control}
              name='projectType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='w-[180px] text-black'>
                        <SelectValue placeholder='Status..' />
                      </SelectTrigger>
                      <SelectContent side='top'>
                        <SelectItem value='new-construction'>New Construction</SelectItem>
                        <SelectItem value='renovation'>Renovation</SelectItem>
                        <SelectItem value='maintenance'>Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <div className="flex flex-row gap-3 items-center">

          <FormField
                control={form.control}
                name='clientId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                    <Autocomplete
                      data={clients}
                      placeholder="Search clients..."
                      // @ts-ignore
                      onSelect={handleSelectClient}
                      modelValue={selectedClient} 
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
            
            <div className='flex flex-row gap-4'>
              <FormField
                control={form.control}
                name='color'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <ColorInput {...field} modelValue={field.value} defaultColor='#000000' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                </div>
            </div>

              <h1 className="font-bold">Project site</h1>
          <div className='flex flex-row gap-3 items-center'>
            <FormField
              control={form.control}
              name='address.street'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Street' type='text' className="text-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address.city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='City' type='text' className="text-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-row gap-3 items-center'>
            <FormField
              control={form.control}
              name='address.state'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='State' type='text' className="text-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address.zip'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Zip' type='text' className="text-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address.country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Country' type='text' className="text-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Start date (optional)</FormLabel>
                <FormControl>
                  <div className="text-black">

                  <DatePicker
                    {...field}
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                    buttonText='Select a date'
                    />
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


<FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder='Description...'
                    className="text-black resize-none"
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
                'Update'
              ) : (
                'Create project'
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
