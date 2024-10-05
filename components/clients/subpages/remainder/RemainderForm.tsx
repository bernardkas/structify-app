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
import { CreateRemainderSchema } from './validation';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import MultiSelect from '@/components/ui-reusable/multi-select';
import { createRemainder, updateRemainder } from '@/actions/Model/remainder';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { Client, Remainder } from '@prisma/client';
import { RemainderWithDetials } from './type';

interface RemainderFormProps {
  remainder?: RemainderWithDetials;
  clientId?: string;
  isEditing?: boolean;
  setOpenDialog: (a: boolean) => void
}

const RemainderForm = ({
  remainder,
  clientId,
  isEditing,
  setOpenDialog
}: RemainderFormProps) => {
  const initialDate = remainder?.startDate
    ? new Date(remainder.startDate)
    : new Date();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
  );
  const [selectedFrequency, setSelectedFrequency] = useState<string>(remainder?.frequency || '');
  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState<string[]>(remainder?.daysOfWeek || []);
  const [selectedDaysOfMonth, setSelectedDaysOfMonth] = useState<string[]>(remainder?.daysOfMonth || []);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateRemainderSchema>>({
    resolver: zodResolver(CreateRemainderSchema),
    // @ts-ignore
    defaultValues: remainder || {
      name: '',
      description: '',
      startDate: null,
      frequency: '',
      daysOfWeek: [],
      daysOfMonth: [],
      reminderTime: '',
      emailRecipient: '',
      reminderMessage: '',
      status: 'ACTIVE',
    },
  });

  const create = (values: z.infer<typeof CreateRemainderSchema>) => {
    setLoading(true);
    createRemainder(values).then(data => {
      toast(data?.success, { type: 'success' });
      setLoading(false);
      setOpenDialog(false)
      if (data?.error) {
        toast(data?.error, { type: 'error' });
        setLoading(false);
        setOpenDialog(false)
      }
    });
  };

  const update = (values: z.infer<typeof CreateRemainderSchema>) => {
    setLoading(true);
    updateRemainder(values).then(data => {
      if (data?.success) {
        toast(data?.success, { type: 'success' });
        setLoading(false);
        setOpenDialog(false)
      }
      if (data.error) {
        toast(data?.error, { type: 'error' });
        setLoading(false);
        setOpenDialog(false)
      }
    });
  }; 

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      clientId: clientId,
      daysOfWeek: selectedDaysOfWeek,
      daysOfMonth: selectedDaysOfMonth,
    };

    if (isEditing) {
      update({
        ...data,
        daysOfWeek: selectedDaysOfWeek,
      daysOfMonth: selectedDaysOfMonth,
      });
    } else {
      create(payload);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    form.setValue('startDate', date as any);
  };

  useEffect(() => {
    if (selectedFrequency === 'weekly') {
      if (selectedDaysOfWeek.length > 0) {
        setSelectedDaysOfMonth([]);
        form.setValue('daysOfMonth', []);
      }
    } else if (selectedFrequency === 'monthly') {
      if (selectedDaysOfMonth.length > 0) {
        setSelectedDaysOfWeek([]);
        form.setValue('daysOfWeek', []);
      }
    }
  }, [selectedFrequency, selectedDaysOfWeek.length, selectedDaysOfMonth.length, form]);
  
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-5'>
            {/* Reminder Name */}
            <div className='flex flex-row gap-5'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reminder Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Reminder Name'
                        className='text-black'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Start Date */}
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                        buttonText='Select a date'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-row gap-5'>
              <FormField
                control={form.control}
                name='frequency'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={value => {
                          field.onChange(value);
                          setSelectedFrequency(value); 
                        }}>
                        <SelectTrigger className='w-[180px] text-black'>
                          <SelectValue placeholder='Status..' />
                        </SelectTrigger>
                        <SelectContent side='top'>
                          <SelectItem value='weekly'>Weekly</SelectItem>
                          <SelectItem value='monthly'>Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedFrequency === 'weekly' && (
                <FormField
                  control={form.control}
                  name='daysOfWeek'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Days of the Week</FormLabel>
                      <FormControl>
                        <MultiSelect
                          placeholder='Select days'
                          options={[
                            { label: 'Monday', value: 'monday' },
                            { label: 'Tuesday', value: 'tuesday' },
                            { label: 'Wednesday', value: 'wednesday' },
                            { label: 'Thursday', value: 'thursday' },
                            { label: 'Friday', value: 'friday' },
                            { label: 'Saturday', value: 'saturday' },
                            { label: 'Sunday', value: 'sunday' },
                          ]}
                          selectedOptions={selectedDaysOfWeek}
                          setSelectedOptions={setSelectedDaysOfWeek}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {selectedFrequency === 'monthly' && (
                <FormField
                  control={form.control}
                  name='daysOfMonth'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Days of the Month</FormLabel>
                      <FormControl>
                        <MultiSelect
                          placeholder='Select months date'
                          options={Array.from(
                            { length: 31 },
                            (_, i) => i + 1
                          ).map(day => ({
                            label: day.toString(),
                            value: day.toString(),
                          }))}
                          selectedOptions={selectedDaysOfMonth}
                          setSelectedOptions={setSelectedDaysOfMonth}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {/* Reminder Time */}
            <FormField
              control={form.control}
              name='reminderTime'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reminder Time</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='time'
                      placeholder='Reminder Time'
                      className='text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Recipients */}
            <FormField
              control={form.control}
              name='emailRecipient'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Recipient</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Email Recipient'
                      className='text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reminder Message */}
            <FormField
              control={form.control}
              name='reminderMessage'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reminder Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Reminder Message'
                      className='text-black resize-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reminder Status */}
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='w-[180px] text-black'>
                        <SelectValue placeholder='Status..' />
                      </SelectTrigger>
                      <SelectContent side='top'>
                        <SelectItem value='ACTIVE'>Active</SelectItem>
                        <SelectItem value='INACTIVE'>Inactive</SelectItem>
                        <SelectItem value='PAUSED'>Paused</SelectItem>
                      </SelectContent>
                    </Select>
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
                  'Create client'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RemainderForm;
