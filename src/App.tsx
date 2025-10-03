import FormBuilder from './components/builder/FormBuilder';
import type { FormSchema } from './types';
import { useState } from 'react';

// Sample initial schema for demonstration
const sampleSchema: FormSchema = {
  id: 'sample-form',
  title: 'Customer Feedback Form',
  description: 'Please share your thoughts about our service',
  tabs: [
    {
      id: 'tab-1',
      title: 'Basic Information',
      sections: [
        {
          id: 'section-1',
          title: 'Personal Details',
          fields: [
            {
              id: 'field-1',
              type: 'text',
              label: 'Full Name',
              name: 'fullName',
              placeholder: 'Enter your full name',
              required: true,
            },
            {
              id: 'field-2',
              type: 'text',
              label: 'Email Address',
              name: 'email',
              placeholder: 'Enter your email address',
              required: true,
            },
            {
              id: 'field-3',
              type: 'select',
              label: 'Age Group',
              name: 'ageGroup',
              options: [
                { label: 'Under 18', value: 'under18' },
                { label: '18-24', value: '18-24' },
                { label: '25-34', value: '25-34' },
                { label: '35-44', value: '35-44' },
                { label: '45+', value: '45plus' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'tab-2',
      title: 'Feedback',
      sections: [
        {
          id: 'section-2',
          title: 'Your Experience',
          fields: [
            {
              id: 'field-4',
              type: 'radio',
              label: 'How satisfied are you with our service?',
              name: 'satisfaction',
              options: [
                { label: 'Very Satisfied', value: 'very-satisfied' },
                { label: 'Satisfied', value: 'satisfied' },
                { label: 'Neutral', value: 'neutral' },
                { label: 'Dissatisfied', value: 'dissatisfied' },
                { label: 'Very Dissatisfied', value: 'very-dissatisfied' },
              ],
              required: true,
            },
            {
              id: 'field-5',
              type: 'checkbox',
              label: 'Which features do you use?',
              name: 'features',
              options: [
                { label: 'Online Ordering', value: 'online-ordering' },
                { label: 'Customer Support', value: 'customer-support' },
                { label: 'Mobile App', value: 'mobile-app' },
                { label: 'Loyalty Program', value: 'loyalty-program' },
              ],
            },
            {
              id: 'field-6',
              type: 'textarea',
              label: 'Additional Comments',
              name: 'comments',
              placeholder: 'Please share any additional feedback',
              rows: 4,
            },
          ],
        },
      ],
    },
  ],
  submitButtonText: 'Submit Feedback',
  cancelButtonText: 'Cancel',
  showProgressBar: true,
  autoSave: true,
};

function App() {
const [schema, setSchema] = useState<FormSchema | null>(null);

  const handleSave = (updatedSchema: FormSchema) => {
    setSchema(updatedSchema);
    // In a real application, you might want to save this to a database or localStorage
    localStorage.setItem('formSchema', JSON.stringify(updatedSchema));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Form Builder</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Create, customize, and preview your forms
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <FormBuilder initialSchema={sampleSchema} onSave={handleSave} />
      </main>
      
      <footer className="bg-white dark:bg-gray-800 shadow mt-10">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
          <p>Form Builder Library - Built with React and TypeScript</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
