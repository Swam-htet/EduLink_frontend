export interface TenantHero {
  title: string;
  subtitle: string;
  image: string;
  cta: {
    primary: string;
    secondary: string;
  };
}

export interface TenantFeature {
  icon: string;
  title: string;
  description: string;
}

export interface TenantStatistic {
  icon: string;
  value: number;
  label: string;
}

export interface TenantTestimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  image?: string;
}

export interface TenantContact {
  address: string;
  email: string;
  phone: string;
  mapUrl: string;
}

export interface TenantBranding {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Program {
  name: string;
  grades?: string;
  description: string;
  features: string[];
}

export interface Facility {
  name: string;
  description: string;
  image: string;
}

export interface TenantLandingData {
  hero: TenantHero;
  features: TenantFeature[];
  statistics: TenantStatistic[];
  testimonials: TenantTestimonial[];
  contact: TenantContact;
  branding: TenantBranding;
  faqs: FAQ[];
  programs: Program[];
  facilities: Facility[];
}
