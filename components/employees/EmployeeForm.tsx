'use client';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateEmployeeSchema } from './validation';
import { Button } from '../ui/button';
import { BeatLoader } from 'react-spinners';
import { Input } from '../ui/input';
import DatePicker from '../ui/date-picker';
import { PhoneInput } from 'react-international-phone';
import { createEmployee, updateEmployee } from '@/actions/Model/employee';
import { toast } from 'react-toastify';

interface EmployeeFormProps {
  employee?: any;
  isEditing?: boolean;
  setOpenDialog: (a: boolean) => void;
}

const EmployeeForm = ({
  employee,
  isEditing,
  setOpenDialog,
}: EmployeeFormProps) => {
  const [loading, setLoading] = useState(false);
  const initialDate = employee?.startedMonth
    ? new Date(employee?.startedMonth)
    : new Date();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
  );

  const form = useForm<z.infer<typeof CreateEmployeeSchema>>({
    resolver: zodResolver(CreateEmployeeSchema),
    defaultValues: employee || {
      uuid: employee?.uuid || '',
      name: '',
      email: '',
      phone: '',
      hourlyRate: '',
      salary: '',
      jobTitle: '',
      startedMonth: initialDate,
      address: {
        street: employee?.address?.street || '',
        city: employee?.address?.city || '',
        state: employee?.address?.state || '',
        zip: employee?.address?.zip || '',
        country: employee?.address?.country || '',
      },
    },
  });

  const create = (values: z.infer<typeof CreateEmployeeSchema>) => {
    setLoading(true);
   createEmployee(values).then((data) => {
    if (data?.success) {
      toast(data?.success, { type: 'success' });
      setLoading(false);
      setOpenDialog(false)
    }

    if (data.error) {
      toast(data?.error, { type: 'error' });
      setLoading(false);
    }
   })
  };

  const update = (values: z.infer<typeof CreateEmployeeSchema>) => {
    setLoading(true);
  updateEmployee(values).then((data) => {
    if (data?.success) {
      toast(data?.success, { type: 'success' });
      setLoading(false);
      setOpenDialog(false)
    }

    if (data.error) {
      toast(data?.error, { type: 'error' });   
    }

})
  };

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
    };

    if (isEditing) {
      update(payload);
    } else {
      create(payload);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    form.setValue('startedMonth', date);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-5'>
            {/* Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Jon doe'
                      className='text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder='Email'
                      className='text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-row gap-3 items-center'>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone*</FormLabel>
                    <FormControl>
                      <PhoneInput defaultCountry='at' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Cost Overruns */}
            <FormField
              control={form.control}
              name='hourlyRate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      placeholder='35'
                      className='text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='salary'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      placeholder='1200'
                      className='text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='jobTitle'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Manager'
                      className='text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='startedMonth'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Started Month</FormLabel>
                  <FormControl>
                    <div className='text-black'>
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

            <h1 className='font-bold'>Employee Address</h1>
            <div className='flex flex-row gap-3 items-center'>
              <FormField
                control={form.control}
                name='address.street'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Street'
                        type='text'
                        className='text-black'
                      />
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
                      <Input
                        {...field}
                        placeholder='City'
                        type='text'
                        className='text-black'
                      />
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
                      <Input
                        {...field}
                        placeholder='State'
                        type='text'
                        className='text-black'
                      />
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
                    <FormLabel>Zip*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Zip'
                        type='text'
                        className='text-black'
                      />
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
                      <Input
                        {...field}
                        placeholder='Country'
                        type='text'
                        className='text-black'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-row gap-2'>
              <Button className='flex items-end justify-end' type='submit'>
                {loading ? (
                  <BeatLoader className='text-white' />
                ) : isEditing ? (
                  'Update Employee'
                ) : (
                  'Create Employee'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeForm;
