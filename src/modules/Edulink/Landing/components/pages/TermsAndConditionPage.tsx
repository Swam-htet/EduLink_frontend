import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const termsAndConditions = {
  title: 'Terms and Conditions',
  lastUpdated: new Date().toISOString(),
  sections: [
    {
      title: '1. Acceptance of Terms',
      content: `
        <p>By accessing and using the EduLink platform and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
      `
    },
    {
      title: '2. User Registration and Accounts',
      content: `
        <p>2.1. To access certain features of our platform, you must register for an account.</p>
        <p>2.2. You agree to:</p>
        <ul>
          <li>Provide accurate and complete registration information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Promptly update any changes to your registration information</li>
          <li>Accept responsibility for all activities that occur under your account</li>
        </ul>
      `
    },
    {
      title: '3. Academic Integrity',
      content: `
        <p>3.1. Students must:</p>
        <ul>
          <li>Submit original work</li>
          <li>Properly cite all sources</li>
          <li>Not engage in plagiarism or cheating</li>
          <li>Follow the institution's academic honesty policy</li>
        </ul>
        <p>3.2. Violations may result in disciplinary action, including but not limited to:</p>
        <ul>
          <li>Grade penalties</li>
          <li>Course failure</li>
          <li>Suspension or expulsion</li>
        </ul>
      `
    },
    {
      title: '4. Privacy and Data Protection',
      content: `
        <p>4.1. We collect and process personal data in accordance with our Privacy Policy.</p>
        <p>4.2. You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Request corrections to your data</li>
          <li>Request deletion of your data</li>
          <li>Object to certain data processing activities</li>
        </ul>
      `
    },
    {
      title: '5. Code of Conduct',
      content: `
        <p>5.1. Users must:</p>
        <ul>
          <li>Treat all members of the community with respect</li>
          <li>Not engage in harassment or discrimination</li>
          <li>Not disrupt the learning environment</li>
          <li>Follow all institutional policies and guidelines</li>
        </ul>
      `
    },
    {
      title: '6. Payment and Refunds',
      content: `
        <p>6.1. Payment Terms:</p>
        <ul>
          <li>All fees must be paid by the specified due dates</li>
          <li>Late payments may incur additional charges</li>
          <li>Payment methods are subject to verification</li>
        </ul>
        <p>6.2. Refund Policy:</p>
        <ul>
          <li>Refund requests must be submitted within specified timeframes</li>
          <li>Processing fees may be non-refundable</li>
          <li>Refunds will be processed according to the original payment method</li>
        </ul>
      `
    },
    {
      title: '7. Intellectual Property',
      content: `
        <p>7.1. All content provided through our platform is protected by copyright and other intellectual property laws.</p>
        <p>7.2. Users may not:</p>
        <ul>
          <li>Copy or distribute course materials without permission</li>
          <li>Share account access with others</li>
          <li>Use our platform's content for commercial purposes</li>
        </ul>
      `
    },
    {
      title: '8. Termination of Services',
      content: `
        <p>8.1. We reserve the right to:</p>
        <ul>
          <li>Suspend or terminate accounts for violations of these terms</li>
          <li>Modify or discontinue services with reasonable notice</li>
          <li>Remove inappropriate or unauthorized content</li>
        </ul>
      `
    }
  ]
};

export const TermsAndConditionPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12"
    >
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <h1 className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                {termsAndConditions.title}
              </h1>
              <p className="text-muted-foreground mt-4">
                Last Updated: {new Date(termsAndConditions.lastUpdated).toLocaleDateString()}
              </p>
            </motion.div>

            <motion.div className="space-y-8">
              {termsAndConditions.sections.map((section, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                  className="rounded-lg border bg-white p-6 shadow-sm"
                >
                  <h2 className="text-primary mb-4 text-xl font-semibold">{section.title}</h2>
                  <div
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
