'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CreatePostSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { createForm } from '@/actions/action';
import { uploadFiles } from '@/actions/s3-upload';
import ShowFileUpload from '../ui-reusable/show-file-upload';
import { Textarea } from '../ui/textarea';
import { toast } from 'react-toastify';
import AlertText from '../ui-reusable/alert-text';

const CreateForm = () => {
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const [selectPhoto, setSelectPhoto] = useState<File[]>([]);

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      name: '',
      lastName: '',
      title: '',
      email: '',
      description: '',
      phone: '',
      photo: [],
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPhotos = e.target.files;
    if (selectedPhotos) {
      const newPhotos = Array.from(selectedPhotos);
      setSelectPhoto((prevPhotos: any) => [...prevPhotos, ...newPhotos]);
    }
  };

  const onSubmit = async (values: z.infer<typeof CreatePostSchema>) => {
    const formData = new FormData();
    selectPhoto.forEach((file, index) => {
      formData.append(`file[]`, file);
    });

    const fotoS3 = await uploadFiles(formData);
    values.photo = fotoS3;

    console.log('values clienbt', values);

    createForm(values).then(data => {
      if (data?.error) {
        toast(data?.error, { type: 'error' });
        setError(data?.error);
      }
      if (data?.success) {
        toast(data?.success, { type: 'success' });
        setSuccess(data?.success);
        form.reset();
        setSelectPhoto([]);
      }
    });
  };

  return (
    <div>
      <Card className='w-full  my-10'>
        <CardHeader>
          <CardTitle>Create post</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='space-y-3'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='mb-2 outline-0 '
                          name='name'
                          type='text'
                          placeholder='john.doe@example.com'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>lastName</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='mb-2 outline-0'
                          name='lastname'
                          type='text'
                          placeholder='john.doe@example.com'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='mb-2 outline-0'
                          name='title'
                          type='text'
                          placeholder='Title'
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
                          className='mb-2 outline-0'
                          name='email'
                          type='text'
                          placeholder='Email'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='mb-2 outline-0'
                          name='phone'
                          type='text'
                          placeholder='Phone'
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
                          className='mb-2 outline-0 resize-none'
                          name='description'
                          placeholder='description'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='photo'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='border p-2 cursor-pointer'
                          type='file'
                          accept='image/*'
                          name='photo'
                          multiple
                          onChange={handlePhotoChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ShowFileUpload
                  selectPhoto={selectPhoto}
                  setSelectPhoto={setSelectPhoto}
                />
              </div>
              <Button className='mt-[10px]' type='submit'>
                Create post
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateForm;
