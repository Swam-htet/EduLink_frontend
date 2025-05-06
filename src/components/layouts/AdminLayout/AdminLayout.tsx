import { Outlet } from 'react-router-dom';

import Sidebar from '@/components/layouts/AdminLayout/components/Sidebar';
import { selectTitle } from '@/store/tenant.slice';
import { useSelector } from 'react-redux';

export const AdminLayout = () => {
  const title = useSelector(selectTitle);
  return (
    <div className="grid min-h-screen grid-cols-[250px_1fr] overflow-hidden">
      <div className="flex flex-col gap-4 bg-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="rounded-sm border border-gray-200 bg-white p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
