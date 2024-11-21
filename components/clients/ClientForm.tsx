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
import { CreateClientSchema } from './validation';
import { Client } from '@prisma/client';
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
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { createClient, updateClient } from '@/actions/Model/clients';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

interface ClientFormProps {
  client?: any;
  isEditing?: boolean;
}
const ClientForm = ({ client, isEditing }: ClientFormProps) => {
  const initialDate = client?.date ? new Date(client.date) : new Date();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateClientSchema>>({
    resolver: zodResolver(CreateClientSchema),
    defaultValues: {
      uuid: client?.uuid || "",
      name: client?.name || '',
      organization: client?.organization || '',
      color: client?.color || '',
      status: client?.status || 'INACTIVE',
      date: client?.date ? new Date(client.date) : selectedDate,
      phone: client?.phone || '',
      email: client?.email || '',
      address: {
        street: client?.address?.street || '',
        city: client?.address?.city || '',
        state: client?.address?.state || '',
        zip: client?.address?.zip || '',
        country: client?.address?.country || '',
      },
    },
  });

  const t = useTranslations('Client.form');
  const tAddress = useTranslations('Address');

  const create = (values: z.infer<typeof CreateClientSchema>) => {
    setLoading(true)
    createClient(values).then(data => {
      setLoading(false)
      if (data?.error) {
        toast(data?.error, {type: 'error'});
        setLoading(false)
      }
    });
  };

  const update = (values: z.infer<typeof CreateClientSchema>) => {
    setLoading(true)
    updateClient(values).then(data => {
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

  const isCreating = (values: z.infer<typeof CreateClientSchema>) => {
    if (isEditing) {
      return update(values);
    }
    return create(values);
  }

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    form.setValue('date', date);
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
                <FormLabel>{t('name')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('name')}
                    name='fullname'
                    type='text'
                    className="text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='organization'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('organization')} (optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Waxo...'
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
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('phone')} </FormLabel>
                  <FormControl>
                  <PhoneInput defaultCountry="at" {...field}/>
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
                  <FormLabel>{t('email')} (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Email' type='text' className="text-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <div className='flex flex-row gap-3 items-center'>
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
                      </SelectContent>
                    </Select>
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
                      <ColorInput {...field} modelValue={field.value} defaultColor='#000000' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='flex flex-row gap-3 items-center'>
            <FormField
              control={form.control}
              name='address.street'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tAddress('street')}</FormLabel>
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
                  <FormLabel>{tAddress('city')} (optional)</FormLabel>
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
                  <FormLabel>{tAddress('state')} (optional)</FormLabel>
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
                  <FormLabel>{tAddress('zip')}</FormLabel>
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
                  <FormLabel>{tAddress('country')} (optional)</FormLabel>
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
            name='date'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>{t('date')} (optional)</FormLabel>
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
  );
};

export default ClientForm;
