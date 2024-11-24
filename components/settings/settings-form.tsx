'use client';
import React, {  useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { remove, settings } from '@/actions/auth';
import AlertText from '../ui-reusable/alert-text';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { BeatLoader } from 'react-spinners';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SettingSchema } from '@/schemas';

interface SettingsFormProps {
  currentUser: any;
}

const SettingsForm = ({ currentUser }: SettingsFormProps) => {
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const [loading, setLoading] = useState(false);

  const deleteAccount = async () => {
    await remove(currentUser?.id);
  };

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      name: currentUser?.name || undefined,
      email: currentUser?.email || undefined,
      password: undefined,
      newPassword: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    setLoading(true);
    setError('');
    setSuccess('');
    settings(values).then(val => {
      if (val?.error) {
        setLoading(false);
        setError(val?.error);
      }
      if (val?.success) {
        setLoading(false);
        setSuccess(val?.success);
      }
    });
  };

  return (
    <div className='my-20'>
      <Card className='p-3'>
        <CardHeader>
          <h1 className='text-lg font-bold'>Settings</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className='space-y-6 flex flex-col mb-5'
              onSubmit={form.handleSubmit(onSubmit)}>
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
                          type='name'
                          placeholder='john.doe@example.com'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {currentUser?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className='mb-2 outline-0 '
                              name='email'
                              type='email'
                              placeholder='john.doe@example.com'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className='mb-2 outline-0'
                              name='password'
                              type='password'
                              placeholder='******'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='newPassword'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className='mb-2 outline-0'
                              name='newPassword'
                              type='password'
                              placeholder='******'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              {error && <AlertText message={error || ''} type='error' />}
              {success && <AlertText message={success || ''} type='success' />}
              <Button className='bg-orange-500 hover:bg-orange-600 mt-5'>
                {loading ? (
                  <BeatLoader color='white' />
                ) : (
                  <p className=''>Update</p>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className='flex flex-col items-start justify-start gap-3'>
          <p>Do you want to delete your account?</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>Delete account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='text-black'>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteAccount}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsForm;
