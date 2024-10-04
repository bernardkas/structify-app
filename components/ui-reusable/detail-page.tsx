import { getContrastingTextColor } from '@/lib/text-color-contrasting';
import React from 'react'

interface DetailPageProps {
  data: any;
}

const DetailPage = ({data}: DetailPageProps) => {
  const textColor = getContrastingTextColor(data?.color || '#ffffff');
  return (
    <div>
        <div style={{
          backgroundColor: data?.color ?? '#ffffff', 
          color: textColor
        }} className="flex flex-col w-full h-[120px] rounded-md p-2 ">
          <p className="font-ibm-plex-mono uppercase">Client</p>
          <h1 className="text-lg">
          {data?.name}
          </h1>
        </div>
    </div>
  )
}

export default DetailPage