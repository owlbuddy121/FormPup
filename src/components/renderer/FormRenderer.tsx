import React from 'react';
import type { FormSchema, FormValues, FormErrors } from '../../types';
import FieldRenderer from './FieldRenderer';

interface FormRendererProps {
  schema: FormSchema;
  values: FormValues;
  errors: FormErrors;
  onChange: (name: string, value: any) => void;
  onSubmit: () => void;
  activeTabIndex: number;
  onTabChange: (index: number) => void;
}

const FormRenderer: React.FC<FormRendererProps> = ({
  schema,
  values,
  errors,
  onChange,
  onSubmit,
  activeTabIndex,
  onTabChange
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const activeTab = schema.tabs[activeTabIndex];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{schema.title}</h1>
        {schema.description && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">{schema.description}</p>
        )}
      </div>

      {schema.tabs.length > 1 && (
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {schema.tabs.map((tab, index) => (
            <button
              key={tab.id}
              className={`py-2 px-4 font-medium ${
                index === activeTabIndex
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => onTabChange(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {activeTab.sections.map((section) => (
          <div key={section.id} className="space-y-4">
            {section.title && (
              <h2 className="text-xl font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
                {section.title}
              </h2>
            )}
            <div className="space-y-4">
              {section.fields.map((field) => (
                <FieldRenderer
                  key={field.id}
                  field={field}
                  value={values[field.name]}
                  error={errors[field.name]}
                  onChange={(value) => onChange(field.name, value)}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            {schema.submitButtonText || 'Submit'}
          </button>
          {schema.cancelButtonText && (
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
            >
              {schema.cancelButtonText}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormRenderer;