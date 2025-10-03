import React, { useState } from 'react';
import type { FormField, FieldOption, ValidationRule } from '../../types';

interface FieldEditorProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onDelete: (fieldId: string) => void;
}

const FieldEditor: React.FC<FieldEditorProps> = ({ field, onUpdate, onDelete }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'validation' | 'advanced'>('basic');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    onUpdate({
      ...field,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleOptionChange = (index: number, key: 'label' | 'value', value: string) => {
    if (!field.options) return;
    
    const newOptions = [...field.options];
    newOptions[index] = { ...newOptions[index], [key]: value };
    
    onUpdate({
      ...field,
      options: newOptions,
    });
  };

  const handleAddOption = () => {
    const newOptions = [...(field.options || [])];
    newOptions.push({ label: `Option ${newOptions.length + 1}`, value: `option${newOptions.length + 1}` });
    
    onUpdate({
      ...field,
      options: newOptions,
    });
  };

  const handleRemoveOption = (index: number) => {
    if (!field.options) return;
    
    const newOptions = [...field.options];
    newOptions.splice(index, 1);
    
    onUpdate({
      ...field,
      options: newOptions,
    });
  };

  const handleAddValidation = (type: ValidationRule['type']) => {
    const newValidation = [...(field.validation || [])];
    
    let defaultValue: string | number | boolean | undefined;
    let defaultMessage = '';
    
    switch (type) {
      case 'required':
        defaultValue = true;
        defaultMessage = 'This field is required';
        break;
      case 'minLength':
        defaultValue = 1;
        defaultMessage = 'Minimum length is 1 character';
        break;
      case 'maxLength':
        defaultValue = 100;
        defaultMessage = 'Maximum length is 100 characters';
        break;
      case 'min':
        defaultValue = 0;
        defaultMessage = 'Minimum value is 0';
        break;
      case 'max':
        defaultValue = 100;
        defaultMessage = 'Maximum value is 100';
        break;
      case 'regex':
        defaultValue = '.*';
        defaultMessage = 'Invalid format';
        break;
      default:
        defaultMessage = 'Validation failed';
    }
    
    newValidation.push({
      type,
      value: defaultValue,
      message: defaultMessage,
    });
    
    onUpdate({
      ...field,
      validation: newValidation,
    });
  };

  const handleRemoveValidation = (index: number) => {
    if (!field.validation) return;
    
    const newValidation = [...field.validation];
    newValidation.splice(index, 1);
    
    onUpdate({
      ...field,
      validation: newValidation,
    });
  };

  const handleValidationChange = (index: number, key: string, value: any) => {
    if (!field.validation) return;
    
    const newValidation = [...field.validation];
    newValidation[index] = { ...newValidation[index], [key]: value };
    
    onUpdate({
      ...field,
      validation: newValidation,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        <button
          className={`px-3 py-1 rounded ${activeTab === 'basic' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => setActiveTab('basic')}
        >
          Basic
        </button>
        <button
          className={`px-3 py-1 rounded ${activeTab === 'validation' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => setActiveTab('validation')}
        >
          Validation
        </button>
        <button
          className={`px-3 py-1 rounded ${activeTab === 'advanced' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => setActiveTab('advanced')}
        >
          Advanced
        </button>
      </div>

      {activeTab === 'basic' && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Label</label>
            <input
              type="text"
              name="label"
              value={field.label}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={field.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Placeholder</label>
            <input
              type="text"
              name="placeholder"
              value={field.placeholder || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="required"
              name="required"
              checked={field.required || false}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="required" className="text-sm font-medium">Required</label>
          </div>
          
          {(field.type === 'select' || field.type === 'multiselect' || field.type === 'radio' || field.type === 'checkbox') && (
            <div>
              <label className="block text-sm font-medium mb-1">Options</label>
              <div className="space-y-2">
                {field.options?.map((option, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={option.label}
                      onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                      placeholder="Label"
                      className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    />
                    <input
                      type="text"
                      value={option.value}
                      onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    />
                    <button
                      onClick={() => handleRemoveOption(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddOption}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Add Option
                </button>
              </div>
            </div>
          )}
          
          {field.type === 'textarea' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Rows</label>
                <input
                  type="number"
                  name="rows"
                  value={field.rows || 3}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Columns</label>
                <input
                  type="number"
                  name="cols"
                  value={field.cols || 30}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                />
              </div>
            </>
          )}
          
          {(field.type === 'number' || field.type === 'slider') && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Min</label>
                <input
                  type="number"
                  name="min"
                  value={field.min || 0}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Max</label>
                <input
                  type="number"
                  name="max"
                  value={field.max || 100}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Step</label>
                <input
                  type="number"
                  name="step"
                  value={field.step || 1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                />
              </div>
            </>
          )}
          
          {field.type === 'file' && (
            <div>
              <label className="block text-sm font-medium mb-1">Accept</label>
              <input
                type="text"
                name="accept"
                value={field.accept || ''}
                onChange={handleChange}
                placeholder="e.g. .pdf,.jpg,.png"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="multiple"
                  name="multiple"
                  checked={field.multiple || false}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="multiple" className="text-sm font-medium">Allow multiple files</label>
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={field.description || ''}
              onChange={handleChange}
              placeholder="Help text for this field"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              rows={2}
            />
          </div>
        </div>
      )}

      {activeTab === 'validation' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleAddValidation('required')}
              className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
            >
              + Required
            </button>
            <button
              onClick={() => handleAddValidation('minLength')}
              className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
            >
              + Min Length
            </button>
            <button
              onClick={() => handleAddValidation('maxLength')}
              className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
            >
              + Max Length
            </button>
            <button
              onClick={() => handleAddValidation('min')}
              className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
            >
              + Min Value
            </button>
            <button
              onClick={() => handleAddValidation('max')}
              className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
            >
              + Max Value
            </button>
            <button
              onClick={() => handleAddValidation('regex')}
              className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
            >
              + Regex
            </button>
          </div>

          <div className="space-y-3">
            {field.validation?.map((rule, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium capitalize">{rule.type}</span>
                  <button
                    onClick={() => handleRemoveValidation(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                
                {rule.type !== 'required' && (
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">Value</label>
                    <input
                      type={['minLength', 'maxLength', 'min', 'max'].includes(rule.type) ? 'number' : 'text'}
                      value={rule.value as string}
                      onChange={(e) => handleValidationChange(index, 'value', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-1">Error Message</label>
                  <input
                    type="text"
                    value={rule.message}
                    onChange={(e) => handleValidationChange(index, 'message', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>
              </div>
            ))}
            
            {!field.validation?.length && (
              <div className="text-gray-500 text-center py-4">
                No validation rules added yet
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'advanced' && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">CSS Class</label>
            <input
              type="text"
              name="className"
              value={field.className || ''}
              onChange={handleChange}
              placeholder="Custom CSS classes"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Default Value</label>
            <input
              type="text"
              name="defaultValue"
              value={field.defaultValue || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="disabled"
              name="disabled"
              checked={field.disabled || false}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="disabled" className="text-sm font-medium">Disabled</label>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium mb-2">Conditional Display</h3>
            <p className="text-xs text-gray-500 mb-2">
              Show this field only when certain conditions are met
            </p>
            
            {/* Conditional logic UI would go here - simplified for MVP */}
            <div className="text-gray-500 text-sm">
              Conditional display configuration will be available in the next version
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onDelete(field.id)}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Delete Field
        </button>
      </div>
    </div>
  );
};

export default FieldEditor;