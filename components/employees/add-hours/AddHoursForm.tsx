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
import { CreateAddHoursEmployeeSchema } from './validation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import Autocomplete from '@/components/ui-reusable/autocomplete';
import {
  EmployeeHoursWithDetails,
  EmployeeWithDetails,
} from '@/types/EmployeeType';
import {
  createEmployeeHours,
  updateEmployeeHours,
} from '@/actions/Model/employee-hours';
import { useTranslations } from "next-intl"

interface AddHoursFormProps {
  employeeHours?: EmployeeHoursWithDetails;
  employee: EmployeeWithDetails[];
  isEditing?: boolean;
  setOpenDialog: (a: boolean) => void;
}

const AddHoursForm = ({
  employeeHours,
  isEditing,
  employee,
  setOpenDialog,
}: AddHoursFormProps) => {
  const initialDate = employeeHours?.date
    ? new Date(employeeHours.date)
    : new Date();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
  );

  const [selectedEmployee, setSelectedEmployee] = useState<string>(
    employeeHours?.employee?.uuid || ''
  );

  const [loading, setLoading] = useState(false);
  const [isSalaryEmployee, setIsSalaryEmployee] = useState<boolean>(false);

  const form = useForm<z.infer<typeof CreateAddHoursEmployeeSchema>>({
    resolver: zodResolver(CreateAddHoursEmployeeSchema),
    // @ts-ignore
    defaultValues: employeeHours || {
      // @ts-ignore
      uuid: employeeHours?.employee?.uuid || '',
      employeeId: '',
      hours: 0,
      minutes: 0,
      overtime: 0,
      description: '',
      date: selectedDate,
    },
  });

  const t = useTranslations('EmployeeHours.form');

  const create = (values: z.infer<typeof CreateAddHoursEmployeeSchema>) => {
    setLoading(true);
    createEmployeeHours(values).then(data => {
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

  const update = (values: z.infer<typeof CreateAddHoursEmployeeSchema>) => {
    setLoading(true);
    updateEmployeeHours(values).then(data => {
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
    console.log('data', data);
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

  const handleSelectClient = (employeeId: string) => {
    const client = employee?.find(c => c.uuid === employeeId);
    if (client) {
      form.setValue('employeeId', employeeId as any);
      setSelectedEmployee(client.uuid);
      setIsSalaryEmployee(!!client?.salary);
    }
  };

  console.log("Validation Errors:", form.formState.errors);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-5'>
            {/* Reminder Name */}
            <div className='flex flex-row gap-2 items-end'>
              <FormField
                control={form.control}
                name='employeeId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('employee')}</FormLabel>
                    <FormControl>
                      <Autocomplete
                        data={employee}
                        placeholder={`Search ${t('employee')}...`}
                        // @ts-ignore
                        onSelect={handleSelectClient}
                        modelValue={selectedEmployee}
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
                        buttonText={t("date")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-row gap-2'>
              {isSalaryEmployee ? (
                <FormField
                  control={form.control}
                  name='overtime'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('overtimeHours')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='number'
                          placeholder='2'
                          className='text-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
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
                        <FormLabel>{t('minutes')}</FormLabel>
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
              )}
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
                      placeholder={t('description')}
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
                  'Update'
                ) : (
                  'Add employee hours'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddHoursForm;
