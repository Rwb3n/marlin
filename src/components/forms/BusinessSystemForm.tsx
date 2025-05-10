import React, { useState } from 'react';
import clsx from 'clsx';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import RadioGroup from '../ui/RadioGroup';
import CheckboxGroup from '../ui/CheckboxGroup';
import NumberInput from '../ui/NumberInput';

export interface BusinessSystemFormData {
  name: string;
  email: string;
  currentSystem: string;
  goals: string[];
  userCount: number;
  message: string;
}

export interface BusinessSystemFormProps {
  onSubmit: (data: BusinessSystemFormData) => void;
  isSubmitting: boolean;
  className?: string;
}

const initialFormData: BusinessSystemFormData = {
  name: '',
  email: '',
  currentSystem: '',
  goals: [],
  userCount: 0,
  message: ''
};

// Define system options
const systemOptions = [
  { value: 'salesforce', label: 'Salesforce' },
  { value: 'hubspot', label: 'HubSpot' },
  { value: 'zoho', label: 'Zoho' },
  { value: 'pipedrive', label: 'Pipedrive' },
  { value: 'monday', label: 'Monday / ClickUp / Notion' },
  { value: 'airtable', label: 'Airtable' },
  { value: 'none', label: 'None (spreadsheets, paper, etc.)' },
  { value: 'multiple', label: 'Multiple systems' },
  { value: 'other', label: 'Other' }
];

// Define goal options
const goalOptions = [
  { value: 'acquisition', label: 'Lead acquisition' },
  { value: 'workflow', label: 'Sales/delivery workflow improvement' },
  { value: 'retention', label: 'Retention & automation' },
  { value: 'other', label: 'Something else' }
];

export const BusinessSystemForm: React.FC<BusinessSystemFormProps> = ({
  onSubmit,
  isSubmitting,
  className
}) => {
  const [formData, setFormData] = useState<BusinessSystemFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Handle input changes
  const handleChange = (field: keyof BusinessSystemFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Mark field as touched
  const handleBlur = (field: keyof BusinessSystemFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  // Validate a single field
  const validateField = (field: keyof BusinessSystemFormData) => {
    let newErrors = { ...errors };
    
    switch (field) {
      case 'name':
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'currentSystem':
        if (!formData.currentSystem) {
          newErrors.currentSystem = 'Please select your current system';
        } else {
          delete newErrors.currentSystem;
        }
        break;
      case 'goals':
        if (formData.goals.length === 0) {
          newErrors.goals = 'Please select at least one goal';
        } else {
          delete newErrors.goals;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate all fields
  const validateForm = () => {
    const fieldsToValidate: (keyof BusinessSystemFormData)[] = ['name', 'email', 'currentSystem', 'goals'];
    let isValid = true;
    
    fieldsToValidate.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    
    // Mark all required fields as touched
    setTouched(prev => ({
      ...prev,
      name: true,
      email: true,
      currentSystem: true,
      goals: true
    }));
    
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className={clsx('w-full', className)}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-xl font-semibold">Contact & Discovery Form</h3>
        <p className="text-muted-foreground mb-6">
          Let's understand your system and goals. This helps us respond with clarity and speed.
        </p>
        
        <div className="space-y-6">
          {/* About You Section */}
          <div className="p-6 bg-card rounded-lg border border-border">
            <h4 className="text-lg font-medium mb-4">About You</h4>
            <div className="space-y-4">
              <Input
                id="name"
                label="Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                error={touched.name ? errors.name : undefined}
                isValid={touched.name && !errors.name && formData.name.trim() !== ''}
                required
                disabled={isSubmitting}
              />
              
              <Input
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                error={touched.email ? errors.email : undefined}
                isValid={touched.email && !errors.email && formData.email.trim() !== ''}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          {/* Business System Section */}
          <div className="p-6 bg-card rounded-lg border border-border">
            <h4 className="text-lg font-medium mb-4">Your Business System</h4>
            <div className="space-y-6">
              <RadioGroup
                id="current-system"
                label="Current System Vendor"
                options={systemOptions}
                value={formData.currentSystem}
                onChange={(value) => handleChange('currentSystem', value)}
                error={touched.currentSystem ? errors.currentSystem : undefined}
                isValid={touched.currentSystem && !errors.currentSystem && formData.currentSystem !== ''}
                required
                disabled={isSubmitting}
              />
              
              <CheckboxGroup
                id="goals"
                label="Primary Goal(s)"
                options={goalOptions}
                value={formData.goals}
                onChange={(values) => handleChange('goals', values)}
                error={touched.goals ? errors.goals : undefined}
                isValid={touched.goals && !errors.goals && formData.goals.length > 0}
                required
                disabled={isSubmitting}
              />
              
              <NumberInput
                id="user-count"
                label="How many users?"
                value={formData.userCount}
                onChange={(value) => handleChange('userCount', value)}
                min={0}
                helperText="Approximate number of users in your system"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          {/* Message Section */}
          <div className="p-6 bg-card rounded-lg border border-border">
            <h4 className="text-lg font-medium mb-4">Message</h4>
            <Textarea
              id="message"
              label="Anything else we should know? Drop questions, project context, or problems here."
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              rows={5}
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full md:w-auto"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default BusinessSystemForm; 