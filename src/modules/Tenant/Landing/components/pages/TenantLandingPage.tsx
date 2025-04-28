import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { getIcon } from '@/lib/utils';
import { LandingService } from '@/modules/Tenant/Landing/services/landing.service';
import { LandingData } from '@/modules/Tenant/Landing/types/landing.types';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import React from 'react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const TenantLandingPage: React.FC = () => {
  const {
    data: landingData,
    isLoading,
    error
  } = useQuery<LandingData>({
    queryKey: ['landingData'],
    queryFn: LandingService.getLandingData
  });

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="border-primary mx-auto h-12 w-12 rounded-full border-4 border-t-transparent"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary mt-4 text-2xl font-bold"
          >
            Loading...
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mt-2"
          >
            Please wait while we load your content
          </motion.p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Icons.AlertCircle className="text-primary mx-auto h-12 w-12" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary mt-4 text-2xl font-bold"
          >
            Error
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mt-2"
          >
            Failed to load landing page content
          </motion.p>
        </div>
      </motion.div>
    );
  }

  if (!landingData) {
    return null;
  }

  const {
    hero,
    features,
    statistics,
    testimonials,
    faqs,
    contact,
    branding,
    programs,
    facilities
  } = landingData;

  const brandingStyle = {
    '--primary-color': branding?.primaryColor || '#3b82f6',
    '--secondary-color': branding?.secondaryColor || '#8b5cf6'
  } as React.CSSProperties;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
      style={brandingStyle}
    >
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed top-0 right-0 left-0 z-50 border-b bg-white/80 backdrop-blur-md"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <img src={branding?.logo || '/fallback-logo.png'} alt="Logo" className="h-10 w-10" />
              <span className="text-primary text-2xl font-bold">{landingData.tenantId}</span>
            </motion.div>
            <div className="hidden items-center gap-8 md:flex">
              {[
                'features',
                'programs',
                'facilities',
                'statistics',
                'testimonials',
                'faq',
                'contact'
              ].map((item, index) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  href={`#${item}`}
                  className="text-primary/80 hover:text-primary transition-colors"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="from-primary/5 bg-gradient-to-br via-purple-50 to-blue-50 pt-32 pb-24"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse items-center gap-12 md:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 space-y-8 text-center md:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-primary/10 text-primary inline-block rounded-full px-6 py-2 text-sm font-medium"
              >
                Welcome to {landingData.tenantId}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl"
              >
                {hero?.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-muted-foreground text-xl md:text-2xl"
              >
                {hero?.subtitle}
              </motion.p>
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col gap-4 sm:flex-row sm:gap-6"
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {hero?.cta?.primary}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  {hero?.cta?.secondary}
                </Button>
              </motion.div> */}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="from-primary/20 absolute -inset-4 rounded-2xl bg-gradient-to-r to-purple-500/20 blur-2xl"
                />
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  src={hero?.image}
                  alt="Hero"
                  className="relative w-full max-w-[600px] rounded-2xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Programs Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-24"
        id="programs"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-6 py-2 text-sm font-medium">
              Programs
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
              Our Academic Programs
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              Comprehensive education pathways for every student
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {programs?.map((program, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-primary text-2xl font-semibold">{program.name}</h3>
                    {program.grades && (
                      <div className="text-muted-foreground mt-2 text-sm">{program.grades}</div>
                    )}
                    <p className="text-muted-foreground mt-6">{program.description}</p>
                    <ul className="mt-6 space-y-3">
                      {program.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Icons.CheckCircle className="text-primary h-5 w-5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Facilities Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="from-primary/5 bg-gradient-to-br via-purple-500/5 to-blue-500/5 py-24"
        id="facilities"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-6 py-2 text-sm font-medium">
              Facilities
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
              Our Campus Facilities
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              State-of-the-art facilities to support learning and growth
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {facilities?.map((facility, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Card className="group overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <motion.img
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                      src={facility.image}
                      alt={facility.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-primary text-2xl font-semibold">{facility.name}</h3>
                    <p className="text-muted-foreground mt-4">{facility.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-24"
        id="faq"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-6 py-2 text-sm font-medium">
              FAQ
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              Find answers to common questions about our institution
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-16 max-w-3xl"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs?.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-24"
        id="features"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-6 py-2 text-sm font-medium">
              Features
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
              Our Features
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              Everything you need for your educational institution
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features?.map((feature, index) => {
                const Icon = getIcon(feature.icon);
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Card className="group hover:border-primary/50 relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl">
                      <div className="from-primary/5 absolute inset-0 -z-10 bg-gradient-to-br to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <CardContent className="flex flex-col items-center p-8 text-center">
                        <div className="from-primary/10 rounded-xl bg-gradient-to-br to-purple-500/10 p-4">
                          <Icon className="text-primary h-8 w-8" />
                        </div>
                        <h3 className="text-primary mt-6 text-xl font-semibold">{feature.title}</h3>
                        <p className="text-muted-foreground mt-4 text-base">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden py-24"
        id="statistics"
      >
        <div className="from-primary/10 absolute inset-0 bg-gradient-to-br via-purple-500/5 to-blue-500/10"></div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {statistics?.map((stat, index) => {
              const Icon = getIcon(stat.icon);
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Card className="border-none bg-white/50 backdrop-blur">
                    <CardContent className="flex flex-col items-center p-8 text-center">
                      <div className="from-primary rounded-full bg-gradient-to-br to-purple-500 p-4">
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="text-primary mt-6 text-4xl font-bold">{stat.value}+</div>
                      <p className="text-muted-foreground mt-4 text-base">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-24"
        id="testimonials"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-6 py-2 text-sm font-medium">
              Testimonials
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              Trusted by educational institutions
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials?.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Card className="group hover:border-primary/50 overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <CardContent className="relative p-8">
                      <div className="from-primary/20 absolute top-0 right-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-gradient-to-br to-purple-500/20 blur-2xl transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="from-primary absolute -inset-1 rounded-full bg-gradient-to-br to-purple-500"></div>
                          <img
                            src={
                              testimonial.image || `https://i.pravatar.cc/150?u=${testimonial.id}`
                            }
                            alt={testimonial.name}
                            className="relative h-14 w-14 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-primary text-lg font-semibold">
                            {testimonial.name}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {testimonial.role} at {testimonial.organization}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground relative mt-6 text-base">
                        {testimonial.content}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden py-24"
        id="contact"
      >
        <div className="from-primary/10 absolute inset-0 bg-gradient-to-br via-purple-500/5 to-blue-500/10"></div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid gap-12 md:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white/50 p-10 backdrop-blur"
            >
              <div className="bg-primary/10 text-primary inline-block rounded-full px-6 py-2 text-sm font-medium">
                Contact Us
              </div>
              <h2 className="from-primary mt-6 bg-gradient-to-r to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mt-6 text-lg">
                Have questions? We'd love to hear from you.
              </p>
              <div className="mt-10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="from-primary rounded-full bg-gradient-to-br to-purple-500 p-3">
                    <Icons.MapPin className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg">{contact?.address}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="from-primary rounded-full bg-gradient-to-br to-purple-500 p-3">
                    <Icons.Mail className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg">{contact?.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="from-primary rounded-full bg-gradient-to-br to-purple-500 p-3">
                    <Icons.Phone className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg">{contact?.phone}</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-2xl shadow-2xl"
            >
              <iframe
                src={contact?.mapUrl}
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};
