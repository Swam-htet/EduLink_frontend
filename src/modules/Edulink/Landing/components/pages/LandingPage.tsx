import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getIcon } from '@/lib/utils';
import { Navbar } from '@/modules/Edulink/Landing/components/navigation/Navbar';
import { landingConfig } from '@/modules/Edulink/Landing/config/landing.config';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export const EdulinkLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="from-primary/5 bg-gradient-to-br via-purple-50 to-blue-50 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse items-center gap-12 md:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 space-y-6 text-center md:text-left"
            >
              <div className="bg-primary/10 text-primary inline-block rounded-lg px-4 py-2 text-sm font-medium">
                Welcome to Edulink
              </div>
              <h1 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
                {landingConfig.hero.title}
              </h1>
              <p className="text-muted-foreground text-xl">{landingConfig.hero.subtitle}</p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 hover:shadow-primary/20 shadow-lg transition-all duration-300"
                >
                  {landingConfig.hero.cta.primary}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  {landingConfig.hero.cta.secondary}
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <div className="relative">
                <div className="from-primary/20 absolute -inset-4 rounded-xl bg-gradient-to-r to-purple-500/20 blur-2xl"></div>
                <img
                  src={landingConfig.hero.image}
                  alt="Hero"
                  className="relative w-full max-w-[600px] rounded-xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" id="features">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-4 py-1.5 text-sm font-medium">
              Features
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Comprehensive Features
            </h2>
            <p className="text-muted-foreground mt-4">
              Everything you need to manage your educational institution
            </p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {landingConfig.features.map((feature, index) => {
              const Icon = getIcon(feature.icon);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group hover:border-primary/50 relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg">
                    <div className="from-primary/5 absolute inset-0 -z-10 bg-gradient-to-br to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <div className="from-primary/10 rounded-xl bg-gradient-to-br to-purple-500/10 p-3">
                        <Icon className="text-primary h-6 w-6" />
                      </div>
                      <h3 className="text-primary mt-4 font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground mt-2 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
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
            {landingConfig.statistics.map((stat, index) => {
              const Icon = getIcon(stat.icon);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-none bg-white/50 backdrop-blur transition-all duration-300 hover:shadow-lg">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <div className="from-primary rounded-full bg-gradient-to-br to-purple-500 p-3">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-primary mt-4 text-3xl font-bold">{stat.value}+</div>
                      <p className="text-muted-foreground mt-2 text-sm">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20" id="programs">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-4 py-1.5 text-sm font-medium">
              Programs
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Our Educational Programs
            </h2>
            <p className="text-muted-foreground mt-4">
              Comprehensive programs for every stage of education
            </p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {landingConfig.programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:border-primary/50 relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-primary text-xl font-semibold">{program.name}</h3>
                    <div className="text-muted-foreground mt-2 text-sm">{program.grades}</div>
                    <p className="text-muted-foreground mt-4">{program.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {program.features.map((feature, i) => (
                        <span
                          key={i}
                          className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="relative overflow-hidden py-20" id="facilities">
        <div className="from-primary/10 absolute inset-0 bg-gradient-to-br via-purple-500/5 to-blue-500/10"></div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-4 py-1.5 text-sm font-medium">
              Facilities
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              State-of-the-Art Facilities
            </h2>
            <p className="text-muted-foreground mt-4">
              Modern learning environments for optimal education
            </p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {landingConfig.facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:border-primary/50 relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48 w-full">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-primary text-xl font-semibold">{facility.name}</h3>
                    <p className="text-muted-foreground mt-2">{facility.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20" id="faqs">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-4 py-1.5 text-sm font-medium">
              FAQs
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-4">
              Find answers to common questions about our platform
            </p>
          </motion.div>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {landingConfig.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-primary text-lg font-semibold">{faq.question}</h3>
                    <p className="text-muted-foreground mt-2">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" id="testimonials">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-primary/10 text-primary mx-auto mb-4 w-fit rounded-full px-4 py-1.5 text-sm font-medium">
              Testimonials
            </div>
            <h2 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground mt-4">
              Trusted by leading educational institutions
            </p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {landingConfig.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:border-primary/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardContent className="relative p-6">
                    <div className="from-primary/20 absolute top-0 right-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-gradient-to-br to-purple-500/20 blur-2xl transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="from-primary absolute -inset-1 rounded-full bg-gradient-to-br to-purple-500"></div>
                        <img
                          src={testimonial.image}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative overflow-hidden py-20" id="contact">
        <div className="from-primary/10 absolute inset-0 bg-gradient-to-br via-purple-500/5 to-blue-500/10"></div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid gap-12 md:grid-cols-2"
          >
            <div className="rounded-xl bg-white/50 p-8 backdrop-blur transition-all duration-300 hover:shadow-lg">
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
                  <span>{landingConfig.contact.address}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="from-primary rounded-full bg-gradient-to-br to-purple-500 p-2">
                    <Icons.Mail className="h-5 w-5 text-white" />
                  </div>
                  <span>{landingConfig.contact.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="from-primary rounded-full bg-gradient-to-br to-purple-500 p-2">
                    <Icons.Phone className="h-5 w-5 text-white" />
                  </div>
                  <span>{landingConfig.contact.phone}</span>
                </div>
              </div>
            </div>
            <div className="hover:shadow-primary/20 overflow-hidden rounded-xl shadow-2xl transition-all duration-300">
              <iframe
                src={landingConfig.contact.mapUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
