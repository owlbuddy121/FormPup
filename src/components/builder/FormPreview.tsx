import React, { useState } from 'react';
import type { FormSchema, FormValues, FormErrors } from '../../types';
import FormRenderer from '../renderer/FormRenderer';

interface FormPreviewProps {
  schema: FormSchema;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // For preview purposes, just show the submitted values
    setSubmitted(true);
    console.log('Form submitted with values:', formValues);
  };

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      {submitted ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-green-600">Form Submitted Successfully!</h2>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Submitted Values:</h3>
            <pre className="whitespace-pre-wrap bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-auto max-h-96">
              {JSON.stringify(formValues, null, 2)}
            </pre>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Form
          </button>
        </div>
      ) : (
        <FormRenderer
          schema={schema}
          values={formValues}
          errors={formErrors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          activeTabIndex={activeTabIndex}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
};

export default FormPreview;