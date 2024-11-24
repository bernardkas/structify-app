import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateBudgetCostSchema } from './validation';
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
import {
  createBudgetAndCost,
  updateBudgetAndCost,
} from '@/actions/Model/budget-cost-tracking';
import { toast } from 'react-toastify';
import { PlusCircleIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface BudgetCostTrackingFormProps {
  budgetCostData?: any;
  isEditing?: boolean;
  projectId?: string
  setOpenDialog: (a: boolean) => void
}

const BudgetCostTrackingForm = ({
  budgetCostData,
  isEditing,
  projectId,
  setOpenDialog
}: BudgetCostTrackingFormProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof CreateBudgetCostSchema>>({
    resolver: zodResolver(CreateBudgetCostSchema),
    defaultValues: budgetCostData || {
      uuid: budgetCostData?.uuid || "",
      name: '',
      totalBudget: 0,
      costsIncurred: 0,
      costOverruns: 0,
      estimatedCosts: [{ type: '', amount: 0 }],
    },
  });

  const t = useTranslations('BudgetAndCost.form')

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'estimatedCosts',
  });


  const create = (values: z.infer<typeof CreateBudgetCostSchema>) => {
    setLoading(true);
    createBudgetAndCost(values).then(data => {
      toast(data?.success, { type: 'success' });
      setLoading(false);
      setOpenDialog(false)
      if (data?.error) {
        toast(data?.error, { type: 'error' });
        setLoading(false);
      }
    });
  };

  const update = (values: z.infer<typeof CreateBudgetCostSchema>) => {
    setLoading(true);
    updateBudgetAndCost(values).then(data => {
      if (data?.success) {
        toast(data?.success, { type: 'success' });
        setLoading(false);
        setOpenDialog(false)
      }
      if (data.error) {
        toast(data?.error, { type: 'error' });
        setLoading(false);
      }
    });
  };

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      projectId: projectId
    };

    if (isEditing) {
      update(payload);
    } else {   
        create(payload);
    }
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
                  <FormLabel>{t('name')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('name')}
                      className='text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Budget */}
            <FormField
              control={form.control}
              name='totalBudget'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('totalBudget')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      placeholder={t('totalBudget')}
                      className='text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Costs Incurred */}
            <FormField
              control={form.control}
              name='costsIncurred'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('costIncurred')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      placeholder={t('costIncurred')}
                      className='text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cost Overruns */}
            <FormField
              control={form.control}
              name='costOverruns'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('costOverruns')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      placeholder={t('costOverruns')}
                      className='text-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-2 mb-2">
                  {/* Type of Cost */}
                  <FormField
                    control={form.control}
                    name={`estimatedCosts.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('type')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`${t('type')} (e.g., Materials, Labor)`}
                            className="text-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Amount of Cost */}
                  <FormField
                    control={form.control}
                    name={`estimatedCosts.${index}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('amount')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Amount"
                            className="text-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Conditionally Show "Remove" Button */}
                  <Button type='button'onClick={() => append({type: '', amount: 0})}>
                    <PlusCircleIcon />
                  </Button>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                      disabled={fields.length <= 1} // Disable if only one field
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

export default BudgetCostTrackingForm;
