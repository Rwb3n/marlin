/**
 * Enhanced ContactSection Component for BLUE MARLIN OS
 * 
 * A comprehensive business-focused contact section with discovery form, value proposition,
 * and process explanation.
 * Features:
 * - Business system discovery form with validation
 * - Value proposition statement
 * - Three-step process explanation (Analyze, Blueprint, Construct)
 * - Responsive layout with consistent styling
 * - Theme support
 */

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Section from '../layout/Section';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import Card from '../layout/Card';
import { LinkedInIcon, TwitterIcon, InstagramIcon } from '../icons/SocialIcons';
import BusinessSystemForm, { BusinessSystemFormData } from '../forms/BusinessSystemForm';
import ValueProposition from '../ui/ValueProposition';
import ProcessStep from '../ui/ProcessStep';

export interface ContactSectionProps {
  /** Section ID for direct linking */
  id?: string;
  /** Custom section title */
  title?: string;
  /** Custom section subtitle */
  subtitle?: string;
  /** Value proposition hook */
  hook?: string;
  /** Value proposition description */
  description?: string;
  /** Contact email for inquiries */
  contactEmail?: string;
}

/**
 * Enhanced ContactSection component
 * 
 * Provides a comprehensive business-focused contact section with discovery form,
 * value proposition, and process explanation.
 */
export default function ContactSection({
  id = 'contact',
  title = 'Systems That Scale With You',
  subtitle = 'Automation. Optimization. Migration.',
  hook = 'I help growth-focused teams untangle chaos in their workflows.',
  description = 'From overloaded Salesforce orgs to fractured no-code stacks, I design systems that clarify, automate, and scale. Whether you\'re migrating in or optimizing what\'s already there—delivery, acquisition, and retention get sharper.',
  contactEmail = 'ops@bluemarlinos.com',
}: ContactSectionProps) {
  const { theme } = useTheme();
  
  // Form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Handle form submission
  const handleSubmit = (data: BusinessSystemFormData) => {
    // Set submitting state
    setIsSubmitting(true);
    setFormError(null);
    
    // Simulate API call (replace with actual API call)
    setTimeout(() => {
      try {
        // Here you would normally send the data to your API
        console.log('Form submitted:', data);
        
        // Reset submitting state
        setIsSubmitting(false);
        
        // Set submitted state
        setIsSubmitted(true);
        
        // Reset submitted state after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } catch (error) {
        // Handle error
        setIsSubmitting(false);
        setFormError('There was an error submitting your form. Please try again.');
        console.error('Form submission error:', error);
      }
    }, 1500);
  };
  
  return (
    <Section 
      id={id}
      spacing="large"
      background="none"
    >
      <SectionHeader
        title={title}
        subtitle={subtitle}
        centered={true}
        spacing="large"
      />
      
      {/* Value Proposition */}
      <div className="mb-12">
        <ValueProposition 
          hook={hook}
          description={description}
          className="max-w-4xl mx-auto"
        />
      </div>
      
      {/* Process Steps */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <ProcessStep
            title="Analyze"
            description="Deep audits to map bottlenecks and blind spots—before any build begins."
            icon="🔍"
          />
          <ProcessStep
            title="Blueprint"
            description="Design lean workflows aligned to business logic, not bloat."
            icon="🧩"
          />
          <ProcessStep
            title="Construct"
            description="Deploy solutions fast—Salesforce-native or migration-ready."
            icon="🚀"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          {isSubmitted ? (
            <Card 
              className="flex flex-col items-center justify-center text-center min-h-[300px]" 
              padding="large"
              border="thin"
              radius="large"
              shadow="default"
              hoverable={false}
            >
              <svg 
                className={`w-16 h-16 mb-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-light-accent'}`}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h3 className="text-xl font-semibold mb-2">
                Information Received Successfully!
              </h3>
              <p className="text-muted-foreground">
                Thank you for sharing your business context. We'll analyze your needs and get back to you shortly.
              </p>
            </Card>
          ) : (
            <>
              {formError && (
                <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg mb-6">
                  {formError}
                </div>
              )}
              
              <BusinessSystemForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </>
          )}
        </div>
        
        {/* Contact Info */}
        <div className="lg:col-span-1">
          <Card 
            className="w-full flex flex-col h-full text-left" 
            padding="large"
            border="thin"
            radius="large"
            shadow="default"
            hoverable={true}
          >
            <h3 className="text-xl font-semibold mb-4">
              Direct Contact
            </h3>
            
            <p className="mb-6 text-muted-foreground">
              For urgent inquiries or to schedule a discovery call, please reach out directly via email.
            </p>
            
            <p className="mb-8">
              <a 
                href={`mailto:${contactEmail}`}
                className={`font-medium hover:underline ${theme === 'dark' ? 'text-dark-accent' : 'text-light-accent'}`}
              >
                {contactEmail}
              </a>
            </p>
            
            <div className="mt-auto">
              <h4 className="text-sm font-semibold uppercase mb-3 opacity-70">Connect</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" // TODO: Replace with actual LinkedIn URL from data
                  className="p-2 rounded-full border text-current hover:border-current transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                
                <a 
                  href="#" // TODO: Replace with actual Twitter URL from data
                  className="p-2 rounded-full border text-current hover:border-current transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
                
                <a 
                  href="#" // TODO: Replace with actual Instagram URL from data
                  className="p-2 rounded-full border text-current hover:border-current transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
} 