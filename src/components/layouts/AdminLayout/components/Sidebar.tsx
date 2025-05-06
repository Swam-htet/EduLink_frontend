import { Button } from '@/components/ui/button';
import { ADMIN_PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/modules/Admin/Auth/hooks/useAdminAuth';
import {
  Book,
  Calendar,
  Library,
  LogOutIcon,
  School,
  Scroll,
  Settings,
  User,
  Users2
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

type SidebarItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
  action?: () => void;
};

const Sidebar = () => {
  const { logout } = useAdminAuth();

  const SIDEBAR_ITEMS: SidebarItem[][] = [
    // [
    //   {
    //     icon: <ChartArea size={15} />,
    //     label: 'Dashboard',
    //     href: ADMIN_PRIVATE_ENDPOINTS.DASHBOARD
    //   }
    // ],
    [
      {
        icon: <Users2 size={15} />,
        label: 'Student Management',
        href: ADMIN_PRIVATE_ENDPOINTS.STUDENT_MANAGEMENT
      },
      {
        icon: <Scroll size={15} />,
        label: 'Student Class Enrollment',
        href: ADMIN_PRIVATE_ENDPOINTS.STUDENT_CLASS_ENROLLMENT
      }
    ],
    [
      {
        icon: <User size={15} />,
        label: 'Staff Management',
        href: ADMIN_PRIVATE_ENDPOINTS.STAFF_MANAGEMENT
      }
    ],
    [
      {
        icon: <School size={15} />,
        label: 'Class Management',
        href: ADMIN_PRIVATE_ENDPOINTS.CLASS_MANAGEMENT
      },
      {
        icon: <Calendar size={15} />,
        label: 'Class Schedule',
        href: ADMIN_PRIVATE_ENDPOINTS.CLASS_SCHEDULE_MANAGEMENT
      },

      {
        icon: <Book size={15} />,
        label: 'Subject Management',
        href: ADMIN_PRIVATE_ENDPOINTS.SUBJECT_MANAGEMENT
      },
      {
        icon: <Library size={15} />,
        label: 'Course Management',
        href: ADMIN_PRIVATE_ENDPOINTS.COURSE_MANAGEMENT
      },
      {
        icon: <Calendar size={15} />,
        label: 'Exam Management',
        href: ADMIN_PRIVATE_ENDPOINTS.EXAM_MANAGEMENT
      }
    ],
    [
      {
        icon: <Settings size={15} />,
        label: 'General Setting Management',
        href: ADMIN_PRIVATE_ENDPOINTS.GENERAL_SETTING_MANAGEMENT
      }
    ],
    [
      {
        icon: <User size={15} />,
        label: 'Admin Profile',
        href: ADMIN_PRIVATE_ENDPOINTS.PROFILE
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
        <div className="flex justify-end p-3">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              logout();
            }}
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        <div className="border-border-weak border-t border-t-red-50" />
      </div>
    </nav>
  );
};

export default Sidebar;
