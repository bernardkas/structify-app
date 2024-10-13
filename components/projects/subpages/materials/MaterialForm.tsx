import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { PlusCircleIcon, X } from 'lucide-react';
import { CreateMaterialSchema } from './validation';
import { createMaterial, updateMaterial } from '@/actions/Model/material';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DatePicker from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';

interface MaterialFormProps {
  material?: any;
  isEditing?: boolean;
  projectId?: string;
  setOpenDialog: (a: boolean) => void;
}

const MaterialForm = ({
  material,
  isEditing,
  projectId,
  setOpenDialog,
}: MaterialFormProps) => {
  const [loading, setLoading] = useState(false);
  const initialDate = material?.startDate
    ? new Date(material.startDate)
    : new Date();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
  );
  const form = useForm<z.infer<typeof CreateMaterialSchema>>({
    resolver: zodResolver(CreateMaterialSchema),
    defaultValues: material || {
      uuid: material?.uuid || '',
      name: '',
      description: '',
      status: '',
      supplier: '',
      date: selectedDate,
      materialInfo: [{ name: '', price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'materialInfo',
  });

  const create = (values: z.infer<typeof CreateMaterialSchema>) => {
    setLoading(true);
    createMaterial(values).then(data => {
      toast(data?.success, { type: 'success' });
      setLoading(false);
      setOpenDialog(false);
      if (data?.error) {
        toast(data?.error, { type: 'error' });
        setLoading(false);
      }
    });
  };

  const update = (values: z.infer<typeof CreateMaterialSchema>) => {
    setLoading(true);
    updateMaterial(values).then(data => {
      if (data?.success) {
        toast(data?.success, { type: 'success' });
        setLoading(false);
        setOpenDialog(false);
      }
      if (data.error) {
        toast(data?.error, { type: 'error' });
        setLoading(false);
      }
    });
  };

  const onSubmit = (data: any) => {
    console.log('data', data)
    const payload = {
      ...data,
      projectId: projectId,
    };

    if (isEditing) {
      update(payload);
    } else {
      create(payload);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    form.setValue('date', date as any);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-5'>
            {/* Name */}
            <div className='flex flex-row gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='First house'
                        className='text-black'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='supplier'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Enter supplier name'
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
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={value => {
                        field.onChange(value);
                      }}>
                      <SelectTrigger className='w-[180px] text-black'>
                        <SelectValue placeholder='Status..' />
                      </SelectTrigger>
                      <SelectContent side='top'>
                        <SelectItem value='paid'>Paid</SelectItem>
                        <SelectItem value='unpaid'>Unpaid</SelectItem>
                        <SelectItem value='partially'>Partially</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Description..'
                      className='text-black resize-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {fields.map((field, index) => (
              <div key={field.id} className='flex items-end gap-2 mb-2'>
                <FormField
                  control={form.control}
                  name={`materialInfo.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Hammer...'
                          className='text-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`materialInfo.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='number'
                          placeholder='Price'
                          className='text-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='button'
                  onClick={() => append({ name: '', price: 0 })}>
                  <PlusCircleIcon />
                </Button>
                {fields.length > 1 && (
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={() => remove(index)}
                    disabled={fields.length <= 1}
                  >
                    <X />
                  </Button>
                )}
              </div>
            ))}

            <div className='flex flex-row gap-2'>
              <Button className='flex items-end justify-end' type='submit'>
                {loading ? (
                  <BeatLoader className='text-white' />
                ) : isEditing ? (
                  'Update Material'
                ) : (
                  'Create Material'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MaterialForm;
