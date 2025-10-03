import React from 'react';
import type { FormField } from '../../types';

interface FieldRendererProps {
  field: FormField;
  value: any;
  error?: string;
  onChange: (value: any) => void;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, error, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { type, checked, value: inputValue } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      onChange(checked);
    } else if (type === 'number' || type === 'range') {
      onChange(inputValue === '' ? '' : Number(inputValue));
    } else {
      onChange(inputValue);
    }
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    onChange(selectedOptions);
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            id={field.id}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={`w-full px-3 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-md dark:bg-gray-700 ${field.className || ''}`}
          />
        );
        
      case 'textarea':
        return (
          <textarea
            id={field.id}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            disabled={field.disabled}
            rows={field.rows || 3}
            className={`w-full px-3 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-md dark:bg-gray-700 ${field.className || ''}`}
          />
        );
        
      case 'number':
        return (
          <input
            type="number"
            id={field.id}
            name={field.name}
            value={value ?? ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            disabled={field.disabled}
            min={field.min}
            max={field.max}
            step={field.step || 1}
            className={`w-full px-3 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-md dark:bg-gray-700 ${field.className || ''}`}
          />
        );
        
      case 'select':
        return (
          <select
            id={field.id}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            disabled={field.disabled}
            className={`w-full px-3 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-md dark:bg-gray-700 ${field.className || ''}`}
          >
            {!value && <option value="">{field.placeholder || 'Select an option'}</option>}
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'multiselect':
        return (
          <select
            id={field.id}
            name={field.name}
            value={value || []}
            onChange={handleMultiSelectChange}
            disabled={field.disabled}
            multiple
            className={`w-full px-3 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-md dark:bg-gray-700 ${field.className || ''}`}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'checkbox':
        return field.options ? (
          <div className="space-y-2">
            {field.options.map((option) => {
              const isChecked = Array.isArray(value) ? value.includes(option.value) : false;
              return (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${field.id}-${option.value}`}
                    name={field.name}
                    value={option.value}
                    checked={isChecked}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const newValue = Array.isArray(value) ? [...value] : [];
                      if (checked) {
                        if (!newValue.includes(option.value)) {
                          newValue.push(option.value);
                        }
                      } else {
                        const index = newValue.indexOf(option.value);
                        if (index !== -1) {
                          newValue.splice(index, 1);
                        }
                      }
                      onChange(newValue);
                    }}
                    disabled={field.disabled}
                    className={`mr-2 ${field.className || ''}`}
                  />
                  <label htmlFor={`${field.id}-${option.value}`}>{option.label}</label>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={field.id}
              name={field.name}
              checked={value || false}
              onChange={handleChange}
              disabled={field.disabled}
              className={`mr-2 ${field.className || ''}`}
            />
            <label htmlFor={field.id}>{field.label}</label>
          </div>
        );
        
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.id}-${option.value}`}
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  disabled={field.disabled}
                  className={`mr-2 ${field.className || ''}`}
                />
                <label htmlFor={`${field.id}-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </div>
        );
        
      case 'date':
        return (
          <input
            type="date"
            id={field.id}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            disabled={field.disabled}
            className={`w-full px-3 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-md dark:bg-gray-700 ${field.className || ''}`}
          />
        );
        
      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <div className="form-field">
      {field.type !== 'checkbox' && (
        <label htmlFor={field.id} className="block text-sm font-medium mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {renderField()}
      
      {field.description && (
        <p className="text-xs text-gray-500 mt-1">{field.description}</p>
      )}
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FieldRenderer;