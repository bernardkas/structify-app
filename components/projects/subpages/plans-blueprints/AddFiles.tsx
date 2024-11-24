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
import { createPlansBlueprint } from '@/actions/Model/plans-blueprints';
import { toast } from 'react-toastify';
import axios from 'axios';
import { s3Upload } from '@/actions/upload-s3';
import { uploadFileToS3 } from '@/lib/upload-file-s3';
import { useTranslations } from 'next-intl';

interface AddFilesProps {
  file?: any;
  projectId: string;
  handleCloseDialog: () => void;
}
const AddFiles = ({ file, projectId, handleCloseDialog }: AddFilesProps) => {
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
    setLoading(true);
    createPlansBlueprint(values).then(data => {
      if (data?.success) {
        setLoading(false);
        handleCloseDialog()
        toast(data?.success, { type: 'success' });
      }
    });
  };

  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const onSubmit = async (data: any) => {
    setLoading(true)

    const formData = new FormData();
    formData.append('file', uploadFile as any)
    const upload = await axios.post('/api/s3-upload', formData, {
        headers: {
          'Content-Type': uploadFile?.type,
          'Content-Disposition': 'inline',
        },
      });

      const uploadedFile = upload.data.fileName

    const payload = {
      ...data,
      projectId: projectId,
      file: uploadedFile,
      type: uploadFile?.type
    };
    create(payload);
  };
  const handleFileUpload = (uploadedFile: File | null) => {
    setUploadFile(uploadedFile);
  };

  const t = useTranslations('PlansAndBlueprint.form');
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

            <FormField
              control={form.control}
              name='file'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('files')}</FormLabel>
                  <FormControl>
                    <FileUploader
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
                {loading ? <BeatLoader className='text-white' /> : t('create')}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddFiles;
