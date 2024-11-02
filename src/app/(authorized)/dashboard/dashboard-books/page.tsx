import DashboardBooks from '@/components/dashboard/dashboard-books';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MyNovel Dashboard Admin | Manage Books',
};

const Page = () => {
  return <DashboardBooks />;
};
export default Page;
