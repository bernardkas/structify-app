'use client';
import { Button } from '@/components/ui/button';
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
import { PlusCircleIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
import { z } from 'zod';
import { CreatePlansBlueprintsSchema } from './validation';
import ImageUploader from '@/components/ui-reusable/image-uploader';
import FileUploader from '@/components/ui-reusable/file-uploader';

interface AddFilesProps {
  file?: any;
  projectId: string;
}
const AddFiles = ({ file, projectId }: AddFilesProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof CreatePlansBlueprintsSchema>>({
    resolver: zodResolver(CreatePlansBlueprintsSchema),
    defaultValues: file || {
      uuid: file?.uuid || '',
      name: '',
      file: '',
    },
  });

  const create = (values: z.infer<typeof CreatePlansBlueprintsSchema>) => {
    console.log(values);
  };

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      projectId: projectId,
    };
    create(payload);
  };

  const [images, setImages] = useState<File[]>(file?.file);

//   const handleImageUpload = (image: File | File[]) => {
//     if (Array.isArray(image)) {
//       setImages(prev => [...prev, ...image]);
//     } else {
//       setImages([image]);
//     }
//   };

//   console.log('images', images);

  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleFileUpload = (uploadedFile: File | null) => {
    setUploadFile(uploadedFile);
    console.log('Uploaded file:', uploadedFile);
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
                  <FormLabel>File Name</FormLabel>
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

            <FormField
              control={form.control}
              name='file'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Files</FormLabel>
                  <FormControl>
                    <FileUploader
                      acceptedFileTypes={['application/pdf', 'image/jpeg']}
                      maxFileSize={5}
                      onFileUpload={handleFileUpload}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-row gap-2'>
              <Button className='flex items-end justify-end' type='submit'>
                {loading ? <BeatLoader className='text-white' /> : 'Add file'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddFiles;
