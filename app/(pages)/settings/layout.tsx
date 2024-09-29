import LeftSideMenu from '@/components/settings/left-side-menu';

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex flex-col justify-center items-center w-full gap-5'>
      <div className='w-[300px] md:w-[600px]'>
        {/* <div>
          <LeftSideMenu />
        </div> */}
        {children}
      </div>
    </section>
  );
}
