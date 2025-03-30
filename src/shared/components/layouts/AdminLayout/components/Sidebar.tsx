import { PRIVATE_ENDPOINTS } from '@/ecosystem/PageEndpoints/Private';
import { cn } from '@/lib/utils';
import {
  Book,
  Calendar,
  ChartArea,
  Library,
  Notebook,
  School,
  Scroll,
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
  const SIDEBAR_ITEMS: SidebarItem[][] = [
    [
      {
        icon: <ChartArea size={15} />,
        label: 'Dashboard',
        href: PRIVATE_ENDPOINTS.DASHBOARD
      }
    ],
    [
      {
        icon: <Users2 size={15} />,
        label: 'Student Management',
        href: PRIVATE_ENDPOINTS.STUDENT_MANAGEMENT
      },
      {
        icon: <Scroll size={15} />,
        label: 'Student Class Enrollment',
        href: PRIVATE_ENDPOINTS.STUDENT_CLASS_ENROLLMENT
      },
      {
        icon: <Notebook size={15} />,
        label: 'Student Class Attendance',
        href: PRIVATE_ENDPOINTS.STUDENT_CLASS_ATTENDANCE
      }
    ],
    [
      {
        icon: <User size={15} />,
        label: 'Staff Management',
        href: PRIVATE_ENDPOINTS.STAFF_MANAGEMENT
      }
    ],
    [
      {
        icon: <School size={15} />,
        label: 'Class Management',
        href: PRIVATE_ENDPOINTS.CLASS_MANAGEMENT
      },
      {
        icon: <Calendar size={15} />,
        label: 'Class Schedule',
        href: PRIVATE_ENDPOINTS.CLASS_SCHEDULE_MANAGEMENT
      },

      {
        icon: <Book size={15} />,
        label: 'Subject Management',
        href: PRIVATE_ENDPOINTS.SUBJECT_MANAGEMENT
      },
      {
        icon: <Library size={15} />,
        label: 'Course Management',
        href: PRIVATE_ENDPOINTS.COURSE_MANAGEMENT
      },
      {
        icon: <Calendar size={15} />,
        label: 'Exam Management',
        href: PRIVATE_ENDPOINTS.EXAM_MANAGEMENT
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
