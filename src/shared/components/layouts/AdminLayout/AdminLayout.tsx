import { Outlet } from 'react-router-dom';

import Sidebar from '@/shared/components/layouts/AdminLayout/components/Sidebar';
import { selectTenantId } from '@/store/tenant.slice';
import { useSelector } from 'react-redux';

export const AdminLayout = () => {
  const tenantId = useSelector(selectTenantId);
  return (
    <div className="grid h-screen grid-cols-[250px_1fr]">
      <div className="flex flex-col gap-4 overflow-hidden bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">{tenantId}</h1>
        </div>
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden bg-gray-100">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
