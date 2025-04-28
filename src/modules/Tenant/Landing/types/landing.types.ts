export type LandingKey =
  | 'hero'
  | 'features'
  | 'statistics'
  | 'testimonials'
  | 'faqs'
  | 'contact'
  | 'branding'
  | 'programs'
  | 'facilities';

export interface HeroValue {
  title: string;
  subtitle: string;
  image: string;
  // cta: {
  //   primary: string;
  //   secondary: string;
  // };
}

export interface FeatureValue {
  icon: string;
  title: string;
  description: string;
}

export interface StatisticValue {
  icon: string;
  value: number;
  label: string;
}

export interface TestimonialValue {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  image: string;
}

export interface FAQValue {
  question: string;
  answer: string;
}

export interface ContactValue {
  address: string;
  email: string;
  phone: string;
  mapUrl: string;
}

export interface BrandingValue {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
}

export interface ProgramValue {
  name: string;
  grades: string;
  description: string;
  features: string[];
}

export interface FacilityValue {
  name: string;
  description: string;
  image: string;
}

export interface LandingData {
  tenantId: string;
  hero: HeroValue;
  features: FeatureValue[];
  statistics: StatisticValue[];
  testimonials: TestimonialValue[];
  faqs: FAQValue[];
  contact: ContactValue;
  branding: BrandingValue;
  programs: ProgramValue[];
  facilities: FacilityValue[];
}

export interface LandingResponse {
  data: LandingData;
}

export interface SetLandingDataRequest {
  key: LandingKey;
  value: LandingValue;
}

export type LandingValue =
  | HeroValue
  | FeatureValue[]
  | StatisticValue[]
  | TestimonialValue[]
  | FAQValue[]
  | ContactValue
  | BrandingValue
  | ProgramValue[]
  | FacilityValue[];
