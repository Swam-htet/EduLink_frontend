import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getIcon } from '@/lib/utils';
import { mockTenantLandingData } from '@/modules/Tenant/Landing/config/landing.mock';
import * as Icons from 'lucide-react';

export const TenantLandingPage = () => {
  const tenantId = 'default';
  const landingData = mockTenantLandingData['default'];

  if (!landingData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-primary text-2xl font-bold">Loading...</h1>
          <p className="text-muted-foreground mt-2">Please wait while we load your content</p>
        </div>
      </div>
    );
  }

  // CSS variables for dynamic branding colors
  const brandingStyle = {
    '--primary': landingData.branding?.primaryColor || 'hsl(var(--primary))',
    '--secondary': landingData.branding?.secondaryColor || 'hsl(var(--secondary))'
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50"
      style={brandingStyle}
    >
      {/* Navigation */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={landingData.branding?.logo || '/fallback-logo.png'}
                alt="Logo"
                className="h-8 w-8"
              />
              <span className="text-primary text-xl font-bold">{tenantId}</span>
            </div>
            <div className="hidden items-center gap-8 md:flex">
              <a href="#features" className="text-primary/80 hover:text-primary transition-colors">
                Features
              </a>
              <a href="#programs" className="text-primary/80 hover:text-primary transition-colors">
                Programs
              </a>
              <a
                href="#facilities"
                className="text-primary/80 hover:text-primary transition-colors"
              >
                Facilities
              </a>
              <a
                href="#statistics"
                className="text-primary/80 hover:text-primary transition-colors"
              >
                Statistics
              </a>
              <a
                href="#testimonials"
                className="text-primary/80 hover:text-primary transition-colors"
              >
                Testimonials
              </a>
              <a href="#faq" className="text-primary/80 hover:text-primary transition-colors">
                FAQ
              </a>
              <a href="#contact" className="text-primary/80 hover:text-primary transition-colors">
                Contact
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="hidden sm:inline-flex">
                Sign In
              </Button>
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="from-primary/5 bg-gradient-to-br via-purple-50 to-blue-50 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse items-center gap-12 md:flex-row">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="bg-primary/10 text-primary inline-block rounded-lg px-4 py-2 text-sm font-medium">
                Welcome to {tenantId}
              </div>
              <h1 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
                {landingData.hero?.title}
              </h1>
              <p className="text-muted-foreground text-xl">{landingData.hero?.subtitle}</p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {landingData.hero?.cta?.primary}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  {landingData.hero?.cta?.secondary}
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="from-primary/20 absolute -inset-4 rounded-xl bg-gradient-to-r to-purple-500/20 blur-2xl"></div>
                <img
                  src={landingData.hero?.image}
                  alt="Hero"
                  className="relative w-full max-w-[600px] rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20" id="programs">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-4 py-1.5 text-sm font-medium">
              Programs
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Our Academic Programs
            </h2>
            <p className="text-muted-foreground mt-4">
              Comprehensive education pathways for every student
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {landingData.programs?.map((program, index) => (
              <Card
                key={index}
                className="group hover:border-primary/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="text-primary text-xl font-semibold">{program.name}</h3>
                  {program.grades && (
                    <div className="text-muted-foreground mt-1 text-sm">{program.grades}</div>
                  )}
                  <p className="text-muted-foreground mt-4">{program.description}</p>
                  <ul className="mt-4 space-y-2">
                    {program.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Icons.CheckCircle className="text-primary h-4 w-4" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section
        className="from-primary/5 bg-gradient-to-br via-purple-500/5 to-blue-500/5 py-20"
        id="facilities"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-4 py-1.5 text-sm font-medium">
              Facilities
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Our Campus Facilities
            </h2>
            <p className="text-muted-foreground mt-4">
              State-of-the-art facilities to support learning and growth
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {landingData.facilities?.map((facility, index) => (
              <Card key={index} className="group overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-primary text-xl font-semibold">{facility.name}</h3>
                  <p className="text-muted-foreground mt-2">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20" id="faq">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-4 py-1.5 text-sm font-medium">
              FAQ
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-4">
              Find answers to common questions about our institution
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {landingData.faqs?.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-4 py-1.5 text-sm font-medium">
              Features
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Our Features
            </h2>
            <p className="text-muted-foreground mt-4">
              Everything you need for your educational institution
            </p>
          </div>
          <div className="mt-12">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {landingData.features?.map((feature, index) => {
                const Icon = getIcon(feature.icon);
                return (
                  <Card
                    key={index}
                    className="group hover:border-primary/50 relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="from-primary/5 absolute inset-0 -z-10 bg-gradient-to-br to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <div className="from-primary/10 rounded-xl bg-gradient-to-br to-purple-500/10 p-3">
                        <Icon className="text-primary h-6 w-6" />
                      </div>
                      <h3 className="text-primary mt-4 font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground mt-2 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative overflow-hidden py-20" id="statistics">
        <div className="from-primary/10 absolute inset-0 bg-gradient-to-br via-purple-500/5 to-blue-500/10"></div>
        <div className="relative container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {landingData.statistics?.map((stat, index) => {
              const Icon = getIcon(stat.icon);
              return (
                <Card key={index} className="border-none bg-white/50 backdrop-blur">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="from-primary rounded-full bg-gradient-to-br to-purple-500 p-3">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-primary mt-4 text-3xl font-bold">{stat.value}+</div>
                    <p className="text-muted-foreground mt-2 text-sm">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-4 py-1.5 text-sm font-medium">
              Testimonials
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground mt-4">Trusted by educational institutions</p>
          </div>
          <div className="mt-12">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {landingData.testimonials?.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="group hover:border-primary/50 overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="relative p-6">
                    <div className="from-primary/20 absolute top-0 right-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-gradient-to-br to-purple-500/20 blur-2xl transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="from-primary absolute -inset-1 rounded-full bg-gradient-to-br to-purple-500"></div>
                        <img
                          src={testimonial.image || `https://i.pravatar.cc/150?u=${testimonial.id}`}
                          alt={testimonial.name}
                          className="relative h-12 w-12 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-primary font-semibold">{testimonial.name}</div>
                        <div className="text-muted-foreground text-sm">
                          {testimonial.role} at {testimonial.organization}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground relative mt-4">{testimonial.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative overflow-hidden py-20" id="contact">
        <div className="from-primary/10 absolute inset-0 bg-gradient-to-br via-purple-500/5 to-blue-500/10"></div>
        <div className="relative container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-xl bg-white/50 p-8 backdrop-blur">
              <div className="bg-primary/10 text-primary inline-block rounded-full px-4 py-1.5 text-sm font-medium">
                Contact Us
              </div>
              <h2 className="from-primary mt-4 bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mt-4">
                Have questions? We'd love to hear from you.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="from-primary rounded-full bg-gradient-to-br to-purple-500 p-2">
                    <Icons.MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span>{landingData.contact?.address}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="from-primary rounded-full bg-gradient-to-br to-purple-500 p-2">
                    <Icons.Mail className="h-5 w-5 text-white" />
                  </div>
                  <span>{landingData.contact?.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="from-primary rounded-full bg-gradient-to-br to-purple-500 p-2">
                    <Icons.Phone className="h-5 w-5 text-white" />
                  </div>
                  <span>{landingData.contact?.phone}</span>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl shadow-2xl">
              <iframe
                src={landingData.contact?.mapUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
