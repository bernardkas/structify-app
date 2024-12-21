'use client';
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface FilterDashboardProps {
  onChange: (value: string) => void; // Callback to notify parent of range change
}

const FilterDashboard = ({ onChange }: FilterDashboardProps) => {
  const initialRange = '12'; 
  const [selectedRange, setSelectedRange] = useState<string>(initialRange);

  const timeRanges = [
    { label: 'Last 1 Month', value: '1' },
    { label: 'Last 3 Months', value: '3' },
    { label: 'Last 6 Months', value: '6' },
    { label: 'Last 12 Months', value: '12' },
    { label: 'All Time', value: 'all' },
  ];

  const handleChange = (value: string) => {
    setSelectedRange(value);
    onChange(value); 
  };

  return (
    <div className='mb-4 text-black'>
    
      <Select value={selectedRange}  onValueChange={handleChange}>
                <SelectTrigger className='w-[180px] text-black'>
                  <SelectValue placeholder='Select Time Range' />
                </SelectTrigger>
                <SelectContent side='top'>
                    {timeRanges?.map(({label, value}) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
    </div>
  );
};

export default FilterDashboard;
