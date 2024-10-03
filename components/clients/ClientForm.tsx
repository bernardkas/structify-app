'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CreateClientSchema } from './validation'
import { Clients } from '@prisma/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { BeatLoader } from 'react-spinners'

interface ClientFormProps {
    client?: any;
    isEditing?: boolean
}
const ClientForm = ({client, isEditing}: ClientFormProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date()
      );
    const [loading, setLoading] = useState(false);
    
      const form = useForm<z.infer<typeof CreateClientSchema>>({
        resolver: zodResolver(CreateClientSchema),
        defaultValues: {
          name: client?.name || '',
          organization: client?.organization || '',
          color: client?.color || '',
          status: client?.status || 'inactive',
          date: client?.date || selectedDate,
          address: {
            street: client?.address?.street || '',
            city: client?.address?.city || '',
            state: client?.address?.state || '',
            zip: client?.address?.zip || '',
            country: client?.address?.country || '',
          },
        },
      });


    const isCreating = (values: z.infer<typeof CreateClientSchema>) => {
        console.log(values);
      };

      const handleDateChange = (date: Date) => {
        setSelectedDate(date);
      };

      const handleDelete = (id: string) => {
        console.log(id);
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
                      placeholder='Hammer'
                      name='fullname'
                      type='text'
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
                  <FormLabel>Organization</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Company name...'
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}>
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Status..' />
                      </SelectTrigger>
                      <SelectContent side='top'>
                        <SelectItem value='active'>Active</SelectItem>
                        <SelectItem value='inactive'>Inactive</SelectItem>
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
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input type='color' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger className='w-[180px]'>
                          <SelectValue placeholder='Status..' />
                        </SelectTrigger>
                        <SelectContent {...field}>
                          <SelectItem value='paid'>Paid</SelectItem>
                          <SelectItem value='unpaid'>Unpaid</SelectItem>
                          <SelectItem value='partially'>
                            Partially Paid
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
                  <FormLabel>Date</FormLabel>
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

            <div className='flex flex-row gap-2'>
              <Button
                className='flex items-end justify-end'
                type='submit'>
                {loading ? (
                  <BeatLoader className='text-white' />
                ) : isEditing ? (
                  'Update'
                ) : (
                  'Create client'
                )}
              </Button>

              {isEditing && (
                <Button
                  variant='destructive'
                  type='button'
                  onClick={() => handleDelete(client?.id as string)}>
                  Delete
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
  )
}

export default ClientForm