/**
 * ContactSection Component for BLUE MARLIN OS
 * 
 * A responsive contact section with form, validation, and social links.
 * Features:
 * - Contact form with name, email, and message fields
 * - Form validation and submission handling
 * - Social media links for additional contact options
 * - Responsive layout with consistent styling
 * - Theme support for apex/origin variants
 */

import React, { useState, FormEvent } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Section from '../layout/Section';
import SectionHeader from '../ui/SectionHeader';
import FormGroup from '../forms/FormGroup';
import FormInput from '../ui/form/FormInput';
import FormTextarea from '../ui/form/FormTextarea';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Card from '../layout/Card';
// Import the new icon components
import { LinkedInIcon, TwitterIcon, InstagramIcon } from '../icons/SocialIcons';

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export interface ContactSectionProps {
  /** Section ID for direct linking */
  id?: string;
  /** Custom section title */
  title?: string;
  /** Custom section description */
  description?: string;
  /** Contact email for inquiries */
  contactEmail?: string;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * ContactSection component
 * 
 * Provides a responsive contact form section with validation and social media links.
 * Includes theme support and integrated error handling.
 */
export default function ContactSection({
  id = 'contact',
  title = 'Contact',
  description = 'Interested in collaboration or have questions about our research?',
  contactEmail = 'ops@bluemarlinos.com',
}: ContactSectionProps) {
  const { theme } = useTheme();
  
  // Form state
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  
  // Form errors
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    // Update error state
    setErrors(newErrors);
    
    // Return whether form is valid (no errors)
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const isValid = validateForm();
    
    if (isValid) {
      // Set submitting state
      setIsSubmitting(true);
      
      // Simulate API call (replace with actual API call)
      setTimeout(() => {
        // Reset submitting state
        setIsSubmitting(false);
        
        // Set submitted state
        setIsSubmitted(true);
        
        // Reset form data
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        
        // Reset submitted state after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };
  
  return (
    <Section 
      id={id}
      spacing="large"
      background="none"
    >
      <SectionHeader
        title={title}
        subtitle={description}
        centered={true}
        spacing="large"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Form */}
        <div className="w-full">
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
              <Heading level={3} className="mb-2" centered>
                Message Sent Successfully!
              </Heading>
              <p className="opacity-80">
                Thank you for reaching out. We'll get back to you soon.
              </p>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="w-full">
              <FormGroup
                label="Name"
                htmlFor="name"
                error={errors.name}
              >
                <FormInput
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  error={errors.name}
                  required
                />
              </FormGroup>
              
              <FormGroup
                label="Email"
                htmlFor="email"
                error={errors.email}
              >
                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  error={errors.email}
                  required
                />
              </FormGroup>
              
              <FormGroup
                label="Message"
                htmlFor="message"
                error={errors.message}
              >
                <FormTextarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  error={errors.message}
                  required
                />
              </FormGroup>
              
              <Button
                type="submit"
                variant="glass-light"
                isLoading={isSubmitting}
                className="mt-4"
                fullWidth
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
        
        {/* Contact Info */}
        <Card 
          className="w-full flex flex-col h-full text-left" 
          padding="large"
          border="thin"
          radius="large"
          shadow="default"
          hoverable={true}
        >
            <Heading level={3} className="mb-4" centered={false}>
              Find us elsewhere
            </Heading>
            
            <p className="mb-6">
              Our team is based at the Pacific Deep Sea Research Institute. 
              We collaborate with research teams worldwide on advancing 
              deep-sea technologies.
            </p>
            
            <p className="mb-8">
              For urgent inquiries related to active deployments, 
              please contact our operations team directly at{' '}
              <a 
                href={`mailto:${contactEmail}`}
                className={`font-medium hover:underline ${theme === 'dark' ? 'text-dark-accent' : 'text-light-accent'}`}
              >
                {contactEmail}
              </a>
            </p>
            
            <div className="mt-auto">
              <h4 className="text-sm font-semibold uppercase mb-3 opacity-70">Follow Us</h4>
              <div className="flex space-x-4">
                {/* LinkedIn - Use imported component */}
                <a 
                  href="#" // TODO: Replace with actual LinkedIn URL from data
                  className="p-2 rounded-full border text-current hover:border-current transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                
                {/* Twitter - Use imported component */}
                <a 
                  href="#" // TODO: Replace with actual Twitter URL from data
                  className="p-2 rounded-full border text-current hover:border-current transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
                
                {/* Instagram - Use imported component */}
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
    </Section>
  );
} 