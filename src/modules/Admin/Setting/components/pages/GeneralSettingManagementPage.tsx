import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { LandingService } from '@/modules/Tenant/Landing/services/landing.service';
import { LandingKey, LandingValue } from '@/modules/Tenant/Landing/types/landing.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

// Validation schemas
const heroSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  image: z.string().url('Must be a valid URL')
  // cta: z.object({
  //   primary: z.string().min(1, 'Primary CTA is required'),
  //   secondary: z.string().min(1, 'Secondary CTA is required')
  // })
});

const featureSchema = z.object({
  features: z.array(
    z.object({
      title: z.string().min(1, 'Title is required'),
      description: z.string().min(1, 'Description is required'),
      icon: z.string().min(1, 'Icon is required')
    })
  )
});

const statisticSchema = z.object({
  statistics: z.array(
    z.object({
      label: z.string().min(1, 'Label is required'),
      value: z.number().min(0, 'Value must be positive'),
      icon: z.string().min(1, 'Icon is required')
    })
  )
});

const testimonialSchema = z.object({
  testimonials: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, 'Name is required'),
      role: z.string().min(1, 'Role is required'),
      content: z.string().min(1, 'Content is required'),
      image: z.string().url('Invalid URL'),
      organization: z.string().min(1, 'Organization is required')
    })
  )
});

const faqSchema = z.object({
  faqs: z.array(
    z.object({
      question: z.string().min(1, 'Question is required'),
      answer: z.string().min(1, 'Answer is required')
    })
  )
});

const contactSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  mapUrl: z.string().url('Invalid URL')
});

const programSchema = z.object({
  programs: z.array(
    z.object({
      name: z.string().min(1, 'Name is required'),
      description: z.string().min(1, 'Description is required'),
      grades: z.string().min(1, 'Grades is required'),
      features: z.array(z.string()).min(1, 'At least one feature is required')
    })
  )
});

const facilitySchema = z.object({
  facilities: z.array(
    z.object({
      name: z.string().min(1, 'Name is required'),
      description: z.string().min(1, 'Description is required'),
      image: z.string().url('Must be a valid URL')
    })
  )
});

export const GeneralSettingManagementPage = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('hero');

  const { data: landingData, isLoading } = useQuery({
    queryKey: ['landingData'],
    queryFn: LandingService.getLandingData
  });

  const updateMutation = useMutation({
    mutationFn: async ({ key, value }: { key: LandingKey; value: LandingValue }) => {
      await LandingService.setLandingData({ key, value });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['landingData'] });
      toast.success('Settings updated successfully');
      setActiveTab('hero');
    },
    onError: (error) => {
      toast.error('Failed to update settings');
      console.error(error);
    }
  });

  // Update form hooks with proper default values
  const heroForm = useForm({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      image: ''
      // cta: {
      //   primary: '',
      //   secondary: ''
      // }
    }
  });

  const featureForm = useForm({
    resolver: zodResolver(featureSchema),
    defaultValues: {
      features: []
    }
  });

  const statisticForm = useForm({
    resolver: zodResolver(statisticSchema),
    defaultValues: {
      statistics: []
    }
  });

  const testimonialForm = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      testimonials: []
    }
  });

  const faqForm = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      faqs: []
    }
  });

  const contactForm = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      address: '',
      email: '',
      phone: '',
      mapUrl: ''
    }
  });

  const programForm = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: {
      programs: []
    }
  });

  const facilityForm = useForm({
    resolver: zodResolver(facilitySchema),
    defaultValues: {
      facilities: []
    }
  });

  // Update form values when data changes
  useEffect(() => {
    if (landingData?.hero) {
      heroForm.reset(landingData.hero);
    }
  }, [landingData?.hero, heroForm]);

  useEffect(() => {
    if (landingData?.features) {
      featureForm.reset({ features: landingData.features });
    }
  }, [landingData?.features, featureForm]);

  useEffect(() => {
    if (landingData?.statistics) {
      statisticForm.reset({ statistics: landingData.statistics });
    }
  }, [landingData?.statistics, statisticForm]);

  useEffect(() => {
    if (landingData?.testimonials) {
      testimonialForm.reset({ testimonials: landingData.testimonials });
    }
  }, [landingData?.testimonials, testimonialForm]);

  useEffect(() => {
    if (landingData?.faqs) {
      faqForm.reset({ faqs: landingData.faqs });
    }
  }, [landingData?.faqs, faqForm]);

  useEffect(() => {
    if (landingData?.contact) {
      contactForm.reset(landingData.contact);
    }
  }, [landingData?.contact, contactForm, landingData]);

  useEffect(() => {
    if (landingData?.programs) {
      programForm.reset({ programs: landingData.programs });
    }
  }, [landingData?.programs, programForm]);

  useEffect(() => {
    if (landingData?.facilities) {
      facilityForm.reset({ facilities: landingData.facilities });
    }
  }, [landingData?.facilities, facilityForm]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
          <h1 className="text-primary mt-4 text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  const handleSubmit = (key: LandingKey, value: LandingValue) => {
    updateMutation.mutate({ key, value });
  };

  const handleHeroSubmit = (data: z.infer<typeof heroSchema>) => {
    handleSubmit('hero', data);
  };

  const handleFeatureSubmit = (data: z.infer<typeof featureSchema>) => {
    handleSubmit('features', data.features);
  };

  const handleStatisticsSubmit = (data: z.infer<typeof statisticSchema>) => {
    handleSubmit('statistics', data.statistics);
  };

  const handleTestimonialSubmit = (data: z.infer<typeof testimonialSchema>) => {
    handleSubmit('testimonials', data.testimonials);
  };

  const handleFAQSubmit = (data: z.infer<typeof faqSchema>) => {
    handleSubmit('faqs', data.faqs);
  };

  const handleContactSubmit = (data: z.infer<typeof contactSchema>) => {
    handleSubmit('contact', data);
  };

  const handleProgramSubmit = (data: z.infer<typeof programSchema>) => {
    handleSubmit('programs', data.programs);
  };

  const handleFacilitySubmit = (data: z.infer<typeof facilitySchema>) => {
    handleSubmit('facilities', data.facilities);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">General Setting Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your landing page configuration and settings
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={heroForm.handleSubmit(handleHeroSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Controller
                    name="title"
                    control={heroForm.control}
                    render={({ field }) => <Input id="title" {...field} />}
                  />
                  {heroForm.formState.errors.title && (
                    <p className="text-sm text-red-500">
                      {heroForm.formState.errors.title.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Controller
                    name="subtitle"
                    control={heroForm.control}
                    render={({ field }) => <Textarea id="subtitle" {...field} />}
                  />
                  {heroForm.formState.errors.subtitle && (
                    <p className="text-sm text-red-500">
                      {heroForm.formState.errors.subtitle.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <Controller
                    name="image"
                    control={heroForm.control}
                    render={({ field }) => <Input id="image" type="url" {...field} />}
                  />
                  {heroForm.formState.errors.image && (
                    <p className="text-sm text-red-500">
                      {heroForm.formState.errors.image.message}
                    </p>
                  )}
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="primaryButtonText">Primary CTA Text</Label>
                  <Controller
                    name="cta.primary"
                    control={heroForm.control}
                    render={({ field }) => <Input id="primaryButtonText" {...field} />}
                  />
                  {heroForm.formState.errors.cta?.primary && (
                    <p className="text-sm text-red-500">
                      {heroForm.formState.errors.cta.primary.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryButtonText">Secondary CTA Text</Label>
                  <Controller
                    name="cta.secondary"
                    control={heroForm.control}
                    render={({ field }) => <Input id="secondaryButtonText" {...field} />}
                  />
                  {heroForm.formState.errors.cta?.secondary && (
                    <p className="text-sm text-red-500">
                      {heroForm.formState.errors.cta.secondary.message}
                    </p>
                  )}
                </div> */}
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={featureForm.handleSubmit(handleFeatureSubmit)} className="space-y-4">
                {featureForm.watch('features')?.map((_, index) => (
                  <div key={index} className="rounded-lg border p-4 transition-all hover:shadow-md">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`icon-${index}`}>
                          Icon (Icon name must be from the icon library - lucide-react)
                        </Label>
                        <Controller
                          name={`features.${index}.icon`}
                          control={featureForm.control}
                          render={({ field }) => <Input id={`icon-${index}`} {...field} />}
                        />
                        {featureForm.formState.errors.features?.[index]?.icon && (
                          <p className="text-sm text-red-500">
                            {featureForm.formState.errors.features[index]?.icon?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`title-${index}`}>Title</Label>
                        <Controller
                          name={`features.${index}.title`}
                          control={featureForm.control}
                          render={({ field }) => <Input id={`title-${index}`} {...field} />}
                        />
                        {featureForm.formState.errors.features?.[index]?.title && (
                          <p className="text-sm text-red-500">
                            {featureForm.formState.errors.features[index]?.title?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`description-${index}`}>Description</Label>
                        <Controller
                          name={`features.${index}.description`}
                          control={featureForm.control}
                          render={({ field }) => (
                            <Textarea id={`description-${index}`} {...field} />
                          )}
                        />
                        {featureForm.formState.errors.features?.[index]?.description && (
                          <p className="text-sm text-red-500">
                            {featureForm.formState.errors.features[index]?.description?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="submit">Save All Features</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={statisticForm.handleSubmit(handleStatisticsSubmit)}
                className="space-y-4"
              >
                {statisticForm.watch('statistics')?.map((_, index) => (
                  <div key={index} className="rounded-lg border p-4 transition-all hover:shadow-md">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`label-${index}`}>Label</Label>
                        <Controller
                          name={`statistics.${index}.label`}
                          control={statisticForm.control}
                          render={({ field }) => <Input id={`label-${index}`} {...field} />}
                        />
                        {statisticForm.formState.errors.statistics?.[index]?.label && (
                          <p className="text-sm text-red-500">
                            {statisticForm.formState.errors.statistics[index]?.label?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`value-${index}`}>Value</Label>
                        <Controller
                          name={`statistics.${index}.value`}
                          control={statisticForm.control}
                          render={({ field }) => (
                            <Input
                              id={`value-${index}`}
                              type="number"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value;
                                const numericValue = parseFloat(value);
                                if (!isNaN(numericValue)) {
                                  field.onChange(numericValue);
                                }
                              }}
                            />
                          )}
                        />
                        {statisticForm.formState.errors.statistics?.[index]?.value && (
                          <p className="text-sm text-red-500">
                            {statisticForm.formState.errors.statistics[index]?.value?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="submit">Save All Statistics</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials">
          <Card>
            <CardHeader>
              <CardTitle>Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={testimonialForm.handleSubmit(handleTestimonialSubmit)}
                className="space-y-4"
              >
                {testimonialForm.watch('testimonials')?.map((_, index) => (
                  <div key={index} className="rounded-lg border p-4 transition-all hover:shadow-md">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${index}`}>Name</Label>
                        <Controller
                          name={`testimonials.${index}.name`}
                          control={testimonialForm.control}
                          render={({ field }) => <Input id={`name-${index}`} {...field} />}
                        />
                        {testimonialForm.formState.errors.testimonials?.[index]?.name && (
                          <p className="text-sm text-red-500">
                            {testimonialForm.formState.errors.testimonials[index]?.name?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`role-${index}`}>Role</Label>
                        <Controller
                          name={`testimonials.${index}.role`}
                          control={testimonialForm.control}
                          render={({ field }) => <Input id={`role-${index}`} {...field} />}
                        />
                        {testimonialForm.formState.errors.testimonials?.[index]?.role && (
                          <p className="text-sm text-red-500">
                            {testimonialForm.formState.errors.testimonials[index]?.role?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`content-${index}`}>Content</Label>
                        <Controller
                          name={`testimonials.${index}.content`}
                          control={testimonialForm.control}
                          render={({ field }) => <Textarea id={`content-${index}`} {...field} />}
                        />
                        {testimonialForm.formState.errors.testimonials?.[index]?.content && (
                          <p className="text-sm text-red-500">
                            {testimonialForm.formState.errors.testimonials[index]?.content?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="submit">Save All Testimonials</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={faqForm.handleSubmit(handleFAQSubmit)} className="space-y-4">
                {faqForm.watch('faqs')?.map((_, index) => (
                  <div key={index} className="rounded-lg border p-4 transition-all hover:shadow-md">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`question-${index}`}>Question</Label>
                        <Controller
                          name={`faqs.${index}.question`}
                          control={faqForm.control}
                          render={({ field }) => <Input id={`question-${index}`} {...field} />}
                        />
                        {faqForm.formState.errors.faqs?.[index]?.question && (
                          <p className="text-sm text-red-500">
                            {faqForm.formState.errors.faqs[index]?.question?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`answer-${index}`}>Answer</Label>
                        <Controller
                          name={`faqs.${index}.answer`}
                          control={faqForm.control}
                          render={({ field }) => <Textarea id={`answer-${index}`} {...field} />}
                        />
                        {faqForm.formState.errors.faqs?.[index]?.answer && (
                          <p className="text-sm text-red-500">
                            {faqForm.formState.errors.faqs[index]?.answer?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="submit">Save All FAQs</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={contactForm.handleSubmit(handleContactSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Controller
                    name="address"
                    control={contactForm.control}
                    render={({ field }) => <Input id="address" {...field} />}
                  />
                  {contactForm.formState.errors.address && (
                    <p className="text-sm text-red-500">
                      {contactForm.formState.errors.address.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Controller
                    name="email"
                    control={contactForm.control}
                    render={({ field }) => <Input id="email" type="email" {...field} />}
                  />
                  {contactForm.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {contactForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Controller
                    name="phone"
                    control={contactForm.control}
                    render={({ field }) => <Input id="phone" {...field} />}
                  />
                  {contactForm.formState.errors.phone && (
                    <p className="text-sm text-red-500">
                      {contactForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>
                <Button type="submit">Update Contact Information</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs">
          <Card>
            <CardHeader>
              <CardTitle>Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={programForm.handleSubmit(handleProgramSubmit)} className="space-y-4">
                {programForm.watch('programs')?.map((_, index) => (
                  <div key={index} className="rounded-lg border p-4 transition-all hover:shadow-md">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${index}`}>Name</Label>
                        <Controller
                          name={`programs.${index}.name`}
                          control={programForm.control}
                          render={({ field }) => <Input id={`name-${index}`} {...field} />}
                        />
                        {programForm.formState.errors.programs?.[index]?.name && (
                          <p className="text-sm text-red-500">
                            {programForm.formState.errors.programs[index]?.name?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`description-${index}`}>Description</Label>
                        <Controller
                          name={`programs.${index}.description`}
                          control={programForm.control}
                          render={({ field }) => (
                            <Textarea id={`description-${index}`} {...field} />
                          )}
                        />
                        {programForm.formState.errors.programs?.[index]?.description && (
                          <p className="text-sm text-red-500">
                            {programForm.formState.errors.programs[index]?.description?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`grades-${index}`}>Grades</Label>
                        <Controller
                          name={`programs.${index}.grades`}
                          control={programForm.control}
                          render={({ field }) => <Input id={`grades-${index}`} {...field} />}
                        />
                        {programForm.formState.errors.programs?.[index]?.grades && (
                          <p className="text-sm text-red-500">
                            {programForm.formState.errors.programs[index]?.grades?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`features-${index}`}>Features</Label>
                        <Controller
                          name={`programs.${index}.features`}
                          control={programForm.control}
                          render={({ field }) => (
                            <Input
                              id={`features-${index}`}
                              value={field.value.join(', ')}
                              onChange={(e) =>
                                field.onChange(e.target.value.split(',').map((f) => f.trim()))
                              }
                            />
                          )}
                        />
                        {programForm.formState.errors.programs?.[index]?.features && (
                          <p className="text-sm text-red-500">
                            {programForm.formState.errors.programs[index]?.features?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="submit">Save All Programs</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities">
          <Card>
            <CardHeader>
              <CardTitle>Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={facilityForm.handleSubmit(handleFacilitySubmit)}
                className="space-y-4"
              >
                {facilityForm.watch('facilities')?.map((_, index) => (
                  <div key={index} className="rounded-lg border p-4 transition-all hover:shadow-md">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${index}`}>Name</Label>
                        <Controller
                          name={`facilities.${index}.name`}
                          control={facilityForm.control}
                          render={({ field }) => <Input id={`name-${index}`} {...field} />}
                        />
                        {facilityForm.formState.errors.facilities?.[index]?.name && (
                          <p className="text-sm text-red-500">
                            {facilityForm.formState.errors.facilities[index]?.name?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`description-${index}`}>Description</Label>
                        <Controller
                          name={`facilities.${index}.description`}
                          control={facilityForm.control}
                          render={({ field }) => (
                            <Textarea id={`description-${index}`} {...field} />
                          )}
                        />
                        {facilityForm.formState.errors.facilities?.[index]?.description && (
                          <p className="text-sm text-red-500">
                            {facilityForm.formState.errors.facilities[index]?.description?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`image-${index}`}>Image URL</Label>
                        <Controller
                          name={`facilities.${index}.image`}
                          control={facilityForm.control}
                          render={({ field }) => (
                            <Input id={`image-${index}`} type="url" {...field} />
                          )}
                        />
                        {facilityForm.formState.errors.facilities?.[index]?.image && (
                          <p className="text-sm text-red-500">
                            {facilityForm.formState.errors.facilities[index]?.image?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="submit">Save All Facilities</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
