'use client';
import React, { useEffect, useState } from 'react';
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
import ColorInput from '../ui-reusable/color-input';
import 'react-international-phone/style.css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { EmployeeWithDetails } from '@/types/EmployeeType';
import { useTranslations } from "next-intl"


interface EmployeeFormProps {
  employee?: any;
  isEditing?: boolean;
  setOpenDialog?: (a: boolean) => void;
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

  const [editorType, setEditorType] = useState<'hourly' | 'salary'>('hourly');

  const form = useForm<z.infer<typeof CreateEmployeeSchema>>({
    resolver: zodResolver(CreateEmployeeSchema),
    defaultValues: employee || {
      uuid: employee?.uuid || '',
      name: '',
      email: '',
      phone: '',
      hourlyRate: 0,
      salary: 0,
      jobTitle: '',
      overtime: 0,
      color: '',
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
    createEmployee(values).then(data => {
      if (data?.success) {
        toast(data?.success, { type: 'success' });
        setLoading(false);
      }

      if (data?.error) {
        toast(data?.error, { type: 'error' });
        setLoading(false);
      }
    });
  };

  const update = (values: z.infer<typeof CreateEmployeeSchema>) => {
    setLoading(true);
    updateEmployee(values).then(data => {
      if (data?.success) {
        toast(data?.success, { type: 'success' });
        setLoading(false);
      }

      if (data?.error) {
        toast(data?.error, { type: 'error' });
      }
    });
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

  useEffect(() => {
    if (employee?.hourlyRate) {
      setEditorType('hourly');
    } else if (employee?.salary) {
      setEditorType('salary');
    }
  }, [employee]);


  const handleSelectChange = (value: 'hourly' | 'salary') => {
    setEditorType(value);
  }

  const t = useTranslations('Employee.form');
  const tAddress = useTranslations('Address');

  return (
    <div className='max-w-[600px]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-5'>
            {/* Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('name')}*</FormLabel>
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
                  <FormLabel>{t('email')}</FormLabel>
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

            <div className='flex flex-row gap-4'>
              <FormField
                control={form.control}
                name='color'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('color')}</FormLabel>
                    <FormControl>
                      <ColorInput
                        {...field}
                        modelValue={field.value}
                        defaultColor='#000000'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('phone')}*</FormLabel>
                    <FormControl>
                      <PhoneInput defaultCountry='at' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              

            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className='w-[180px] text-black'>
                <SelectValue placeholder='Hourly or salary..' />
              </SelectTrigger>
              <SelectContent side='top'>
                <SelectItem value='hourly'>{t('hourlyRate')}</SelectItem>
                <SelectItem value='salary'>{t('salary')}</SelectItem>
              </SelectContent>
            </Select>

              <div className="flex flex-row gap-3 items-center flex-wrap">

            <FormField
              control={form.control}
              name='hourlyRate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('hourlyRate')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      placeholder='35'
                      className='text-black'
                      onFocus={() => form.setValue('salary', 0)}
                      disabled={editorType === 'salary'}
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
                  <FormLabel>{t('salary')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      placeholder='1200'
                      className='text-black'
                      onFocus={() => form.setValue('hourlyRate', 0)}
                      disabled={editorType === 'hourly'}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              </div>

<FormField
              control={form.control}
              name='overtime'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('overtime')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      placeholder='ex:20'
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
                  <FormLabel>{t('jobTitle')}</FormLabel>
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
                  <FormLabel>{t('date')}</FormLabel>
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

            <h1 className='font-bold'>{t('employeeAddress')}</h1>
            <div className='flex flex-row gap-3 items-center'>
              <FormField
                control={form.control}
                name='address.street'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tAddress('street')}*</FormLabel>
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
                    <FormLabel>{tAddress('city')}</FormLabel>
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
                    <FormLabel>{tAddress('state')} </FormLabel>
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
                    <FormLabel>{tAddress('zip')}*</FormLabel>
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
                    <FormLabel>{tAddress('country')} (optional)</FormLabel>
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
                  t('update')
                ) : (
                  t("create")
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
