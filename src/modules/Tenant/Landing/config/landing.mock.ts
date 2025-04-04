import { TenantLandingData } from '@/modules/Tenant/Landing/types/landing.types';

export const mockTenantLandingData: Record<string, TenantLandingData> = {
  default: {
    hero: {
      title: 'Welcome to Yangon International School',
      subtitle: 'Empowering minds, shaping futures through quality education and innovation',
      //   random photo from unsplash
      image:
        'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      cta: {
        primary: 'Apply Now',
        secondary: 'Explore Programs'
      }
    },
    features: [
      {
        icon: 'GraduationCap',
        title: 'Academic Excellence',
        description: 'Comprehensive curriculum aligned with international standards for grades K-12'
      },
      {
        icon: 'Users',
        title: 'Expert Faculty',
        description: 'Experienced teachers dedicated to nurturing student growth and development'
      },
      {
        icon: 'Palette',
        title: 'Arts & Culture',
        description: 'Rich programs in music, visual arts, drama, and cultural activities'
      },
      {
        icon: 'Trophy',
        title: 'Sports Programs',
        description: 'Diverse athletic programs fostering teamwork and physical development'
      },
      {
        icon: 'Globe',
        title: 'Global Perspective',
        description: 'International curriculum preparing students for global opportunities'
      },
      {
        icon: 'Laptop',
        title: 'Digital Learning',
        description: 'Modern technology integration with personalized learning platforms'
      }
    ],
    statistics: [
      {
        icon: 'Users',
        value: 1200,
        label: 'Students Enrolled'
      },
      {
        icon: 'GraduationCap',
        value: 98,
        label: 'Graduation Rate'
      },
      {
        icon: 'BookOpen',
        value: 45,
        label: 'Programs Offered'
      },
      {
        icon: 'Award',
        value: 25,
        label: 'Years of Excellence'
      }
    ],
    testimonials: [
      {
        id: '1',
        name: 'Dr. Aung Min',
        role: 'Parent',
        organization: 'Grade 11 Student',
        content:
          "The school's commitment to academic excellence and character development has tremendously benefited my child. The teachers are exceptional and truly care about each student's success.",
        image: 'https://i.pravatar.cc/150?img=11'
      },
      {
        id: '2',
        name: 'Ma Hnin Yu',
        role: 'Parent',
        organization: 'Grade 8 & Grade 5 Students',
        content:
          'Both my children have flourished here. The balance between academics, arts, and sports is perfect, and the international environment has broadened their perspectives.',
        image: 'https://i.pravatar.cc/150?img=12'
      },
      {
        id: '3',
        name: 'U Kyaw Zaw',
        role: 'Parent & School Board Member',
        organization: 'Grade 10 Student',
        content:
          "The school's use of technology and modern teaching methods, combined with traditional values, creates an ideal learning environment for our children.",
        image: 'https://i.pravatar.cc/150?img=13'
      }
    ],
    faqs: [
      {
        question: 'What curriculum does the school follow?',
        answer:
          'We follow an international curriculum combining the best practices from IB and Cambridge frameworks, adapted to meet local educational requirements.'
      },
      {
        question: 'What are the class sizes?',
        answer:
          'Our average class size is 20 students, ensuring personalized attention and optimal learning conditions.'
      },
      {
        question: 'What extracurricular activities are available?',
        answer:
          'We offer a wide range of activities including sports, arts, music, debate club, robotics, and various academic clubs.'
      },
      {
        question: 'How does the school support university applications?',
        answer:
          'Our dedicated college counseling team provides comprehensive support for university applications, including SAT prep, essay writing, and application guidance.'
      }
    ],
    contact: {
      address: '123 Education Street, Bahan Township, Yangon, Myanmar',
      email: 'admissions@yis.edu.mm',
      phone: '+95 1 234 5678',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.146507899749!2d96.15187007495558!3d16.82884208391365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1eb5e3fffe455%3A0x673b46db7e42c0e!2sBahan%20Township%2C%20Yangon!5e0!3m2!1sen!2smm!4v1709641547744!5m2!1sen!2smm'
    },
    branding: {
      primaryColor: 'hsl(215 98% 61%)',
      secondaryColor: 'hsl(210 40% 96.1%)',
      logo: 'https://img.icons8.com/color/96/000000/school.png'
    },
    programs: [
      {
        name: 'Primary School',
        grades: 'Kindergarten - Grade 5',
        description: 'Foundation years focusing on core skills and creative development',
        features: ['Phonics & Early Reading', 'Mathematics', 'Science Discovery', 'Arts & Crafts']
      },
      {
        name: 'Middle School',
        grades: 'Grades 6-8',
        description: 'Transitional years developing academic and personal skills',
        features: ['Advanced Mathematics', 'Sciences', 'Languages', 'Digital Skills']
      },
      {
        name: 'High School',
        grades: 'Grades 9-12',
        description: 'College preparatory program with diverse subject choices',
        features: ['IB Curriculum', 'AP Courses', 'College Counseling', 'Leadership Programs']
      }
    ],
    facilities: [
      {
        name: 'Science Labs',
        description: 'Modern laboratories for physics, chemistry, and biology',
        image:
          'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Library & Media Center',
        description: 'Extensive collection of books and digital resources',
        image:
          'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Sports Complex',
        description: 'Indoor and outdoor facilities for various sports',
        image:
          'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    ]
  },
  schoolOne: {
    hero: {
      title: 'Welcome to School One',
      subtitle: 'Empowering minds, shaping futures through quality education and innovation',
      image:
        'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      cta: {
        primary: 'Apply Now',
        secondary: 'Explore Programs'
      }
    },
    features: [
      {
        icon: 'GraduationCap',
        title: 'Academic Excellence',
        description: 'Comprehensive curriculum aligned with international standards for grades K-12'
      },
      {
        icon: 'Users',
        title: 'Expert Faculty',
        description: 'Experienced teachers dedicated to nurturing student growth and development'
      },
      {
        icon: 'Palette',
        title: 'Arts & Culture',
        description: 'Rich programs in music, visual arts, drama, and cultural activities'
      },
      {
        icon: 'Trophy',
        title: 'Sports Programs',
        description: 'Diverse athletic programs fostering teamwork and physical development'
      },
      {
        icon: 'Globe',
        title: 'Global Perspective',
        description: 'International curriculum preparing students for global opportunities'
      },
      {
        icon: 'Laptop',
        title: 'Digital Learning',
        description: 'Modern technology integration with personalized learning platforms'
      }
    ],
    statistics: [
      {
        icon: 'Users',
        value: 1200,
        label: 'Students Enrolled'
      },
      {
        icon: 'GraduationCap',
        value: 98,
        label: 'Graduation Rate'
      },
      {
        icon: 'BookOpen',
        value: 45,
        label: 'Programs Offered'
      },
      {
        icon: 'Award',
        value: 25,
        label: 'Years of Excellence'
      }
    ],
    testimonials: [
      {
        id: '1',
        name: 'Dr. Aung Min',
        role: 'Parent',
        organization: 'Grade 11 Student',
        content:
          "The school's commitment to academic excellence and character development has tremendously benefited my child. The teachers are exceptional and truly care about each student's success.",
        image: 'https://i.pravatar.cc/150?img=11'
      },
      {
        id: '2',
        name: 'Ma Hnin Yu',
        role: 'Parent',
        organization: 'Grade 8 & Grade 5 Students',
        content:
          'Both my children have flourished here. The balance between academics, arts, and sports is perfect, and the international environment has broadened their perspectives.',
        image: 'https://i.pravatar.cc/150?img=12'
      },
      {
        id: '3',
        name: 'U Kyaw Zaw',
        role: 'Parent & School Board Member',
        organization: 'Grade 10 Student',
        content:
          "The school's use of technology and modern teaching methods, combined with traditional values, creates an ideal learning environment for our children.",
        image: 'https://i.pravatar.cc/150?img=13'
      }
    ],
    contact: {
      address: '123 Education Street, Bahan Township, Yangon, Myanmar',
      email: 'admissions@yis.edu.mm',
      phone: '+95 1 234 5678',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.146507899749!2d96.15187007495558!3d16.82884208391365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1eb5e3fffe455%3A0x673b46db7e42c0e!2sBahan%20Township%2C%20Yangon!5e0!3m2!1sen!2smm!4v1709641547744!5m2!1sen!2smm'
    },
    branding: {
      primaryColor: 'hsl(215 98% 61%)',
      secondaryColor: 'hsl(210 40% 96.1%)',
      logo: 'https://img.icons8.com/color/96/000000/school.png'
    },
    faqs: [
      {
        question: 'What curriculum does the school follow?',
        answer:
          'We follow an international curriculum combining the best practices from IB and Cambridge frameworks, adapted to meet local educational requirements.'
      },
      {
        question: 'What are the class sizes?',
        answer:
          'Our average class size is 20 students, ensuring personalized attention and optimal learning conditions.'
      },
      {
        question: 'What extracurricular activities are available?',
        answer:
          'We offer a wide range of activities including sports, arts, music, debate club, robotics, and various academic clubs.'
      },
      {
        question: 'How does the school support university applications?',
        answer:
          'Our dedicated college counseling team provides comprehensive support for university applications, including SAT prep, essay writing, and application guidance.'
      }
    ],
    programs: [
      {
        name: 'Primary School',
        grades: 'Kindergarten - Grade 5',
        description: 'Foundation years focusing on core skills and creative development',
        features: ['Phonics & Early Reading', 'Mathematics', 'Science Discovery', 'Arts & Crafts']
      },
      {
        name: 'Middle School',
        grades: 'Grades 6-8',
        description: 'Transitional years developing academic and personal skills',
        features: ['Advanced Mathematics', 'Sciences', 'Languages', 'Digital Skills']
      },
      {
        name: 'High School',
        grades: 'Grades 9-12',
        description: 'College preparatory program with diverse subject choices',
        features: ['IB Curriculum', 'AP Courses', 'College Counseling', 'Leadership Programs']
      }
    ],
    facilities: [
      {
        name: 'Science Labs',
        description: 'Modern laboratories for physics, chemistry, and biology',
        image:
          'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Library & Media Center',
        description: 'Extensive collection of books and digital resources',
        image:
          'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Sports Complex',
        description: 'Indoor and outdoor facilities for various sports',
        image:
          'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    ]
  }
};
