import { STUDENT_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

type SidebarItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
  action?: () => void;
};

const Sidebar = () => {
  const SIDEBAR_ITEMS: SidebarItem[][] = [
    [
      {
        icon: <User />,
        label: 'Profile',
        href: STUDENT_PRIVATE_ENDPOINTS.PROFILE
      }
    ]
  ];

  return (
    <nav className="border-border-weak flex h-screen flex-col justify-between">
      <div className="flex flex-col gap-y-2 overflow-y-auto px-2">
        {SIDEBAR_ITEMS.map((items, index) => {
          return (
            <React.Fragment key={index}>
              <div className="border-border-weak border-t border-t-red-50" />
              <div className="flex flex-col gap-y-1" key={index}>
                {items.map((item, index) => (
                  <Link key={index} onClick={item.action} to={item.href} className="mb-1">
                    <div
                      className={cn(
                        'flex cursor-pointer items-center gap-x-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-gray-100'
                      )}
                    >
                      {item.icon}
                      <p className="text-sm text-black">{item.label}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </React.Fragment>
          );
        })}
        <div className="border-border-weak border-t border-t-red-50" />
      </div>
    </nav>
  );
};

export default Sidebar;
