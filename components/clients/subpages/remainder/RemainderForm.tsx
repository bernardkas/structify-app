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
import MultiSelect from '@/components/ui-reusable/multi-select';
import { createRemainder, updateRemainder } from '@/actions/Model/remainder/remainder';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { RemainderWithDetials } from '@/types/RemainderType';
import { useTranslations } from 'next-intl';

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

  const t = useTranslations('Remainders.form');

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateRemainderSchema>>({
    resolver: zodResolver(CreateRemainderSchema),
    // @ts-ignore
    defaultValues: remainder || {
      name: '',
      description: '',
      startDate: selectedDate,
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
                    <FormLabel>{t('name')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Name'
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
                    <FormLabel>{t('startDate')}</FormLabel>
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
                    <FormLabel>{t('frequency')}</FormLabel>
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
                          <SelectItem value='weekly'>{t('weekly')}</SelectItem>
                          <SelectItem value='monthly'>{t('monthly')}</SelectItem>
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
                      <FormLabel>{t('daysOfTheWeek.title')}</FormLabel>
                      <FormControl>
                        <MultiSelect
                          placeholder='Select days'
                          options={[
                            { label: t('daysOfTheWeek.monday'), value: 'monday' },
                            { label: t('daysOfTheWeek.tuesday'), value: 'tuesday' },
                            { label: t('daysOfTheWeek.wednesday'), value: 'wednesday' },
                            { label: t('daysOfTheWeek.thursday'), value: 'thursday' },
                            { label: t('daysOfTheWeek.friday'), value: 'friday' },
                            { label: t('daysOfTheWeek.saturday'), value: 'saturday' },
                            { label: t('daysOfTheWeek.sunday'), value: 'sunday' },
                          ]}
                          selectedOptions={selectedDaysOfWeek}
                          // @ts-ignore
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
                      <FormLabel>{t('daysOfTheMonth')}</FormLabel>
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
                          // @ts-ignore
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
                  <FormLabel>{t('reminderTime')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='time'
                      placeholder='Time'
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
                  <FormLabel>{t('emailRecipient')}</FormLabel>
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
                  <FormLabel>{t('reminderMessage')}</FormLabel>
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
                  <FormLabel>{t('status')}</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='w-[180px] text-black'>
                        <SelectValue placeholder='Status..' />
                      </SelectTrigger>
                      <SelectContent side='top'>
                        <SelectItem value='ACTIVE'>{t('statusActive')}</SelectItem>
                        <SelectItem value='INACTIVE'>{t('statuseInactive')}</SelectItem>
                        <SelectItem value='PAUSED'>{t('statusPaused')}</SelectItem>
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

export default RemainderForm;