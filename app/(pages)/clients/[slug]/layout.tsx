import { getClientById } from "@/actions/Model/clients";
import Navigation from "@/components/clients/subpages/Navigation";
import DetailPage from "@/components/ui-reusable/detail-page";
import { getContrastingTextColor } from "@/lib/text-color-contrasting";
import { Client } from "@prisma/client";



export default async function ClientLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const client = await getClientById(params) as Client;
  return (
    <div className='mx-3'>
       <DetailPage data={client} name="Clients" />
       <div className="flex flex-row bg-slate-600 rounded-full w-fit my-3">
       <Navigation client={client} />
       </div>
        {children}
    </div>
  );
}
