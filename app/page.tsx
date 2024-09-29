import { getPost } from '@/actions/action';

export default async function HomePage() {
  const data = await getPost();

  return (
    <div>
     <h1>Dashboard</h1>
    </div>
  );
}
