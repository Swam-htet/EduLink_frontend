export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  organization: string;
  image: string;
  content: string;
}

export interface Statistic {
  value: number;
  label: string;
  icon: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  mapUrl: string;
}

export const landingConfig = {
  hero: {
    type: 'object',
    value: {
      title: 'Streamline Your Educational Institution Management',
      subtitle: 'All-in-one solution for managing students, courses, classes, and more',
      image: '/assets/hero-image.svg',
      cta: {
        primary: 'Get Started',
        secondary: 'Learn More'
      }
    }
  },
  features: {
    type: 'array',
    value: [
      {
        icon: 'UserCheck',
        title: 'Student Management',
        description:
          'Efficiently manage student records, enrollments, and academic progress tracking'
      },
      {
        icon: 'BookOpen',
        title: 'Course & Class Management',
        description: 'Organize courses, schedule classes, and manage academic calendars seamlessly'
      },
      {
        icon: 'ClipboardCheck',
        title: 'Attendance Tracking',
        description: 'Track and monitor student attendance with automated reporting systems'
      },
      {
        icon: 'GraduationCap',
        title: 'Exam Management',
        description: 'Streamline exam scheduling, grading, and result management'
      },
      {
        icon: 'BarChart',
        title: 'Analytics & Reports',
        description: 'Generate comprehensive reports and insights for better decision making'
      },
      {
        icon: 'Users',
        title: 'Multi-User Access',
        description: 'Role-based access control for administrators, teachers, and students'
      }
    ] as Feature[]
  },
  statistics: {
    type: 'array',
    value: [
      {
        value: 50,
        label: 'Educational Institutions',
        icon: 'Building'
      },
      {
        value: 10000,
        label: 'Students Managed',
        icon: 'Users'
      },
      {
        value: 500,
        label: 'Teachers',
        icon: 'GraduationCap'
      },
      {
        value: 1000,
        label: 'Courses Offered',
        icon: 'BookOpen'
      }
    ] as Statistic[]
  },
  testimonials: {
    type: 'array',
    value: [
      {
        id: 1,
        name: 'John Smith',
        role: 'Principal',
        organization: 'International School of Excellence',
        image: '/assets/testimonials/john.jpg',
        content:
          'Edulink has transformed how we manage our institution. The comprehensive features and user-friendly interface have made administrative tasks much more efficient.'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        role: 'Academic Director',
        organization: 'Learning Tree Academy',
        image: '/assets/testimonials/sarah.jpg',
        content:
          'The attendance and exam management features have saved us countless hours. Our teachers can now focus more on teaching rather than administrative work.'
      },
      {
        id: 3,
        name: 'Michael Chen',
        role: 'IT Administrator',
        organization: 'Global Education Center',
        image: '/assets/testimonials/michael.jpg',
        content:
          'The system is incredibly robust and secure. The technical support team is always responsive and helpful.'
      }
    ] as Testimonial[]
  },
  contact: {
    type: 'object',
    value: {
      address: '123 Education Street, Academic District, City',
      email: 'contact@edulink.com',
      phone: '+1 (555) 123-4567',
      mapUrl: 'https://www.google.com/maps/embed?pb=your-map-embed-url'
    } as ContactInfo
  }
};
