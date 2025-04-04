import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getIcon } from '@/lib/utils';
import { Navbar } from '@/modules/Edulink/Landing/components/navigation/Navbar';
import { landingConfig } from '@/modules/Edulink/Landing/config/landing.config';
import * as Icons from 'lucide-react';
export const EdulinkLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="from-primary/5 bg-gradient-to-br via-purple-50 to-blue-50 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse items-center gap-12 md:flex-row">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="bg-primary/10 text-primary inline-block rounded-lg px-4 py-2 text-sm font-medium">
                Welcome to Edulink
              </div>
              <h1 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
                {landingConfig.hero.value.title}
              </h1>
              <p className="text-muted-foreground text-xl">{landingConfig.hero.value.subtitle}</p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {landingConfig.hero.value.cta.primary}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  {landingConfig.hero.value.cta.secondary}
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="from-primary/20 absolute -inset-4 rounded-xl bg-gradient-to-r to-purple-500/20 blur-2xl"></div>
                <img
                  src="https://img.freepik.com/free-vector/education-learning-concept-love-reading-people-reading-students-studying-preparing-examination-library-book-lovers-readers-modern-literature-flat-cartoon-vector-illustration_1150-60938.jpg"
                  alt="Hero"
                  className="relative w-full max-w-[600px] rounded-xl shadow-2xl"
                />
              </div>
            </div>
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
              Comprehensive Features
            </h2>
            <p className="text-muted-foreground mt-4">
              Everything you need to manage your educational institution
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {landingConfig.features.value.map((feature, index) => {
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
      </section>

      {/* Statistics Section */}
      <section className="relative overflow-hidden py-20" id="statistics">
        <div className="from-primary/10 absolute inset-0 bg-gradient-to-br via-purple-500/5 to-blue-500/10"></div>
        <div className="relative container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {landingConfig.statistics.value.map((stat, index) => {
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
            <p className="text-muted-foreground mt-4">
              Trusted by leading educational institutions
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {landingConfig.testimonials.value.map((testimonial) => (
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
                        src={`https://i.pravatar.cc/150?u=${testimonial.id}`}
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
                  <span>{landingConfig.contact.value.address}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="from-primary rounded-full bg-gradient-to-br to-purple-500 p-2">
                    <Icons.Mail className="h-5 w-5 text-white" />
                  </div>
                  <span>{landingConfig.contact.value.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="from-primary rounded-full bg-gradient-to-br to-purple-500 p-2">
                    <Icons.Phone className="h-5 w-5 text-white" />
                  </div>
                  <span>{landingConfig.contact.value.phone}</span>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl shadow-2xl">
              <iframe
                src={landingConfig.contact.value.mapUrl}
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
