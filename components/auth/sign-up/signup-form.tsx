'use client';
import { register } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useState } from 'react';
import Social from '../social';
import AlertText from '@/components/ui-reusable/alert-text';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
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
import { RegisterSchema } from '@/schemas';

const SignupForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    setError('');
    setSuccess('');
    register(values).then(val => {
      setLoading(false);
      setError(val?.error);
      setSuccess(val?.success);
    });
  };

  return (
    <div className='h-[80vh]'>
      <div className='flex flex-col justify-center items-center h-full'>
        <Card className='flex flex-col items-center'>
          <CardHeader>
            <h1 className='font-noto-sans text-3xl font-bold mb-5 text-orange-500'>
              Sign Up
            </h1>
          </CardHeader>
          <CardContent>
            <Social type={['google']} />
            <p className='font-golos-text mb-5 border-b-[1px] text-center'>
              or
            </p>
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
                            className='mb-2 outline-0 w-[300px] md:w-[350px]'
                            name='name'
                            type='name'
                            placeholder='John doe'
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
                            className='mb-2 outline-0 w-[300px] md:w-[350px]'
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
                </div>
                {error && <AlertText message={error || ''} type='error' />}
                {success && (
                  <AlertText message={success || ''} type='success' />
                )}
                <Button className='bg-orange-500 hover:bg-orange-600 mt-5'>
                  {loading ? (
                    <BeatLoader color='white' />
                  ) : (
                    <p className=''>Sign Up</p>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className='flex flex-row gap-1'>
              <p className='font-noto-sans text-sm text-gray-500'>
                You have an Account?
              </p>
              <Link
                className='font-noto-sans text-sm underline'
                href='/auth/sign-in'>
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignupForm;
