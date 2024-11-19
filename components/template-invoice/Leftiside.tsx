'use client';
import React, { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import { InvoiceTypeSchema } from './invoice-type';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { BeatLoader } from 'react-spinners';
// import ImageUploader from '../ui-reusable/uploadphoto';
import axios from 'axios';
import DatePicker from '../ui/date-picker';
import ImageUploader from '../ui-reusable/image-uploader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import TipTapEditor from '../ui-reusable/tip-tap-editor/tip-tap-editor';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

interface LeftSideProps {
  invoice?: any;
  onSubmit: (val: any) => void;
  loading?: boolean;
  isEditing?: boolean;
}

const Leftiside = ({
  invoice,
  onSubmit,
  loading,
  isEditing,
}: LeftSideProps) => {
  const initialDate = invoice?.date
    ? new Date(invoice?.date) 
    : new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
  );


  const form = useForm<z.infer<typeof InvoiceTypeSchema>>({
    resolver: zodResolver(InvoiceTypeSchema),
    defaultValues: {
      invoiceId: invoice?.id || '',
      name: invoice?.name || '',
      invoiceNumber: invoice?.invoiceNumber || '',
      companyName: invoice?.companyName || '',
      address: invoice?.address || '',
      city: invoice?.city || '',
      postCode: invoice?.postCode || '',
      companyPhone: invoice?.companyPhone || '',
      email: invoice?.email || '',
      companyLogo: invoice?.companyLogo || '',
      date: initialDate || '',
      richText: invoice?.richText || '',

      // Bill to
      clientName: invoice?.clientName || '',
      clientCompanyName: invoice?.clientCompanyName || '',
      clientAddress: invoice?.clientAddress,
      clientPhone: invoice?.clientPhone || '',
      clientEmail: invoice?.clientEmail || '',

      descriptions:
        invoice?.descriptions?.length > 0
          ? invoice.descriptions.map((desc: any) => ({
              id: desc.id || '',
              description: desc.description || '',
              quantity: desc.quantity || 0,
              unitPrice: desc.unitPrice || 0,
              tax: desc.tax || 0,
              totalPrice: desc.totalPrice || 0,
            }))
          : [
              {
                description: '',
                quantity: 0,
                unitPrice: 0,
                tax: 0,
                totalPrice: 0,
              },
            ],

      // Payment
      subtotal: invoice?.subtotal || 0,
      taxRate: invoice?.taxRate || 0,
      totalTax: invoice?.totalTax || 0,
      fullPrice: invoice?.fullPrice || 0,
    },
  });
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: 'descriptions',
  });



  const [logo, setLogo] = useState<File | null>(
    // @ts-ignore
    invoice?.companyLogo ? [invoice?.companyLogo] : null
  );
  const [editorType, setEditorType] = useState('description'); 
  const [content, setContent] = useState<string>(invoice?.richText || '');

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    form.setValue('date', date);
  };

  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (value: z.infer<typeof InvoiceTypeSchema>) => {
    const formData = new FormData();

    let photoData;

    if (
      logo instanceof File ||
      (Array.isArray(logo) && logo[0] !== value.companyLogo)
    ) {
      if (logo instanceof File) {
        formData.append('file', logo);
      } else if (Array.isArray(logo) && logo[0]) {
        formData.append('file', logo[0]);
      }

      try {
        const uploadResponse = await axios.post('/api/s3-upload', formData, {
          headers: {
            'Content-Type': logo instanceof File ? logo.type : 'image/jpeg',
            'Content-Disposition': 'inline',
          },
        });
        photoData = uploadResponse.data;
      } catch (error) {
        console.error('Error uploading file:', error);
        return;
      }
    }

    onSubmit({
      ...value,
      companyLogo: photoData?.fileName || value.companyLogo,
      richText: content,
    });
  };

  const appendDescription = () => {
    append({
      description: '',
      quantity: 0,
      unitPrice: 0,
      tax: 0,
      totalPrice: 0,
    });
  };

  let descriptions = form.watch('descriptions');

  const updateTotalDescriptionPrice = () => {
    descriptions.forEach((desc: any, index: number) => {
      const { quantity = 0, unitPrice = 0 } = desc;

      if (quantity && unitPrice) {
        let totalPrice = quantity * unitPrice;

        form.setValue(
          `descriptions.${index}.totalPrice`,
          parseFloat(totalPrice.toFixed(2))
        );
      }
    });

    updateTotalPrice();
  };

  const updateTotalPrice = () => {
    const descriptionSubtotal = descriptions.reduce(
      (acc: number, desc: any) => acc + (desc.totalPrice || 0),
      0
    );
    const currentSubtotal = form.watch('subtotal') || 0;

    const subtotal = descriptionSubtotal > 0 ? parseFloat(descriptionSubtotal.toFixed(2)) : parseFloat(currentSubtotal.toFixed(2));
    
    // Set the subtotal value
    form.setValue('subtotal', subtotal);

    
    const taxRate = form.watch('taxRate') || 0;
    const totalTax = subtotal * (taxRate / 100);

    form.setValue('totalTax', parseFloat(totalTax.toFixed(2)));

    const fullPrice = subtotal + totalTax;
    form.setValue('fullPrice', parseFloat(fullPrice.toFixed(2)));
  };

  useEffect(() => {
    updateTotalDescriptionPrice();
    updateTotalPrice();
  }, [descriptions, form.watch('taxRate')]);

  const handleFieldChange = (index: number) => {
    updateTotalDescriptionPrice();
  };

  const handleFileUpload = (uploadedFile: File | null) => {
    setLogo(uploadedFile);
  };

 console.log('content', content);

  useEffect(() => {
    if (invoice?.richText) {
      setEditorType('description'); 
    } else {
      setEditorType('with-price'); 
    }
  }, [invoice]); 
  const handleSelectChange = (value: any) => {
    setEditorType(value); 
    if (value !== 'description') {
      setContent(''); 
    } 

    if (value === 'description') {
      fields.forEach((_, index) => {
        form.setValue(`descriptions.${index}.description`, ''); 
        form.setValue(`descriptions.${index}.quantity`, 0); 
        form.setValue(`descriptions.${index}.unitPrice`, 0); 
        form.setValue(`descriptions.${index}.tax`, 0); 
        form.setValue(`descriptions.${index}.totalPrice`, 0); 
      });
    }
  };

  

  const handleContentChange = (reason: any) => {
    setContent(reason)
  }
  return (
    <div className='mt-10 w-full h-[80vh] overflow-y-auto pr-4 custom-scrollbar'>
      {/* Step Indicators */}
      <div className='flex flex-row items-center justify-around mb-4 w-full'>
        {[1, 2, 3, 4].map((s, index) => (
          <div key={s} className='flex items-center w-full'>
            {/* Step circle */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                step === s
                  ? 'bg-blue-500 text-white'
                  : step > s
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}>
              {s}
            </div>

            {/* Line connecting the steps, except after the last step */}
            {index < 3 && (
              <div className='flex-1 h-1 mx-2 relative'>
                <div
                  className={`absolute top-1/2 transform -translate-y-1/2 w-full h-1 ${
                    step > s ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* Step 1: Company Information */}
          {step === 1 && (
            <div className='mb-4 space-y-3'>
              <h2 className='text-xl font-semibold mb-2'>
                Company Information
              </h2>

              {/* Company Name */}
              <div className='flex flex-row flex-wrap gap-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>*Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Name'
                          type='text'
                          className='text-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='invoiceNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>*Invoice Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Invoice Number'
                          type='text'
                          className='text-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='companyName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>*Company Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Company Name'
                          type='text'
                          className='text-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Address */}
              <div className='flex flex-row flex-wrap gap-2'>
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>*Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Address'
                          type='text'
                          className='text-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City */}
                <FormField
                  control={form.control}
                  name='city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>*City</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='City'
                          type='text'
                          className='text-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Post Code */}
                <FormField
                  control={form.control}
                  name='postCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>*Post Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Post Code'
                          type='text'
                          className='text-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-row flex-wrap gap-2 items-center'>
                {/* Company Phone */}
                <FormField
                  control={form.control}
                  name='companyPhone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>*Company Phone</FormLabel>
                      <FormControl>
                      <PhoneInput defaultCountry="at" {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Email'
                          type='email'
                          className='text-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date */}
                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <FormItem className='flex flex-col mt-2 '>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <div className='text-black'>
                          <DatePicker
                            buttonText='Select a date'
                            selectedDate={selectedDate}
                            onDateChange={handleDateChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='companyLogo'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Logo</FormLabel>
                    <FormControl>
                      <ImageUploader
                        //  @ts-ignore
                        handleImageUpload={handleFileUpload}
                        //  @ts-ignore
                        images={logo}
                        multi={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 2: Bill To */}
          {step === 2 && (
            <div className='mb-4 space-y-3'>
              <h2 className='text-xl font-semibold mb-2'>Bill To</h2>

              {/* Client Name */}
              <div className='flex flex-row flex-wrap gap-3'>
                <FormField
                  control={form.control}
                  name='clientName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>*Client Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Client Name'
                          type='text'
                          className='text-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Client Company Name */}
                <FormField
                  control={form.control}
                  name='clientCompanyName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Company Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Client Company Name'
                          type='text'
                          className='text-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Client Address */}
                <FormField
                  control={form.control}
                  name='clientAddress'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>*Client Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Client Address'
                          type='text'
                          className='text-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Client Phone */}
              <FormField
                control={form.control}
                name='clientPhone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Phone</FormLabel>
                    <FormControl>
                    <PhoneInput defaultCountry="at" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Client Email */}
              <FormField
                control={form.control}
                name='clientEmail'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Client Email'
                        type='email'
                        className='text-black'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 3: Description */}
          {step === 3 && (
            <div className='mb-4 space-y-3'>
              <h2 className='text-xl font-semibold mb-2'>Description</h2>

            {!isEditing && (
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className='w-[180px] text-black'>
                  <SelectValue placeholder='Choose..' />
                </SelectTrigger>
                <SelectContent side='top'>
                  <SelectItem value='description'>Only Description</SelectItem>
                  <SelectItem value='with-price'>With Price</SelectItem>
                </SelectContent>
              </Select>
              )}

              {editorType === 'description' ? (
                <div className="space-y-2">
                  <p>Write your description here</p>
                 <TipTapEditor
                 isToolbar={true}
                 content={content}
                 onChange={(newContent: string) => handleContentChange(newContent)}
                 />
                 </div>
              ) : (
                fields.map((field, index) => (
                  <div key={field.id}>
                    <FormField
                      control={form.control}
                      name={`descriptions.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>*Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder='Description'
                              className='text-black resize-none '
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='flex flex-row flex-wrap gap-2'>
                      {/* Quantity */}
                      <FormField
                        control={form.control}
                        name={`descriptions.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder='Quantity'
                                type='number'
                                className='text-black'
                                value={field.value || ''}
                                onChange={e => {
                                  const value = e.target.value;
                                  field.onChange(
                                    value === '' ? null : Number(value)
                                  );
                                  handleFieldChange(index);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Unit Price */}
                      <FormField
                        control={form.control}
                        name={`descriptions.${index}.unitPrice`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit Price</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder='Unit Price'
                                type='number'
                                className='text-black'
                                value={field.value || ''}
                                onChange={e => {
                                  const value = e.target.value;
                                  field.onChange(
                                    value === '' ? null : Number(value)
                                  );
                                  handleFieldChange(index);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Total Price */}
                    <FormField
                      control={form.control}
                      name={`descriptions.${index}.totalPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Price</FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              {...field}
                              placeholder='Total Price'
                              type='number'
                              className='text-black'
                              onChange={e =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='flex justify-end gap-2 mt-6'>
                      <Button
                        type='button'
                        variant='secondary'
                        onClick={appendDescription}>
                        Add description
                      </Button>
                      {index > 0 && (
                        <Button type='button' onClick={() => remove(index)}>
                          DELETE
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {/* Step 4: Payment */}
          {step === 4 && (
            <div className='mb-4 space-y-3'>
              <h2 className='text-xl font-semibold mb-2'>Payment</h2>

              {/* Subtotal */}
              <div className='flex flex-row flex-wrap gap-3'>
                <FormField
                  control={form.control}
                  name='subtotal'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtotal</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Subtotal'
                          type='number'
                          className='text-black'
                          onChange={e => {
                            const value = e.target.value;
                            field.onChange(value === '' ? null : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tax Rate */}
                <FormField
                  control={form.control}
                  name='taxRate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax Rate</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Tax Rate'
                          type='number'
                          className='text-black'
                          onChange={e => {
                            const value = e.target.value;
                            field.onChange(value === '' ? null : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Total Tax */}
              <FormField
                control={form.control}
                name='totalTax'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Tax</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Total Tax'
                        type='number'
                        className='text-black'
                        onChange={e => {
                          const value = e.target.value;
                          field.onChange(value === '' ? null : Number(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Full Price */}
              <FormField
                control={form.control}
                name='fullPrice'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Full Price'
                        type='number'
                        className='text-black'
                        onChange={e => {
                          const value = e.target.value;
                          field.onChange(value === '' ? null : Number(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=' flex justify-end items-end'>
                <Button
                  type='submit'
                  className='bg-blue-500 text-white py-2 px-4 rounded'>
                  {loading ? <BeatLoader /> : isEditing ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className='flex justify-between mt-6'>
            <Button
              type='button'
              onClick={handleBack}
              className={`py-2 px-4 rounded ${
                step === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-500 text-white'
              }`}
              disabled={step === 1}>
              Back
            </Button>
            {step < 4 ? (
              <Button
                type='button'
                onClick={handleNext}
                className='bg-blue-500 text-white py-2 px-4 rounded'>
                Next
              </Button>
            ) : // Submit button already rendered on step 4
            null}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Leftiside;
