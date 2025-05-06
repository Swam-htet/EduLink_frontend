import { Outlet } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import Sidebar from '@/components/layouts/StudentLayout/components/Sidebar';
import { useStudentAuth } from '@/modules/Student/Auth/hooks/useStudentAuth';
import { selectTitle } from '@/store/tenant.slice';
import { LogOutIcon } from 'lucide-react';
import { useSelector } from 'react-redux';

export const StudentLayout = () => {
  const title = useSelector(selectTitle);
  const { logout } = useStudentAuth();
  return (
    <div className="grid h-screen grid-cols-[250px_1fr]">
      <div className="flex flex-col gap-4 overflow-hidden bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden bg-gray-100">
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="flex justify-end p-3">
            <Button
              variant="outline"
              onClick={() => {
                logout();
              }}
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
          <div className="mx-3 min-h-[calc(100vh-80px)] rounded-sm border border-gray-200 bg-white p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
