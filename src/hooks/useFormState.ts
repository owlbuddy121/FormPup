import { useState, useEffect } from 'react';
import type { FormSchema, FormValues, FormErrors } from '../types';
import { validateForm, isFormValid } from '../utils/validation';

interface UseFormStateProps {
  schema: FormSchema;
  initialValues?: FormValues;
  autoSave?: boolean;
  storageKey?: string;
}

interface UseFormStateReturn {
  values: FormValues;
  errors: FormErrors;
  isValid: boolean;
  isDirty: boolean;
  setValue: (name: string, value: any) => void;
  setValues: (values: FormValues) => void;
  validateField: (name: string) => void;
  validateForm: () => boolean;
  resetForm: () => void;
}

export const useFormState = ({
  schema,
  initialValues = {},
  autoSave = false,
  storageKey = 'form_values',
}: UseFormStateProps): UseFormStateReturn => {
  // Get all fields from all tabs and sections
  const getAllFields = () => {
    const fields = [];
    for (const tab of schema.tabs) {
      for (const section of tab.sections) {
        fields.push(...section.fields);
      }
    }
    return fields;
  };

  // Try to load saved values from localStorage if autoSave is enabled
  const loadSavedValues = (): FormValues => {
    if (autoSave && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (error) {
        console.error('Error loading saved form values:', error);
      }
    }
    return {};
  };

  const [values, setValues] = useState<FormValues>({ ...initialValues, ...loadSavedValues() });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(true);

  // Save values to localStorage when they change if autoSave is enabled
  useEffect(() => {
    if (autoSave && typeof window !== 'undefined' && isDirty) {
      localStorage.setItem(storageKey, JSON.stringify(values));
    }
  }, [values, autoSave, storageKey, isDirty]);

  // Validate the entire form and update errors state
  const validateAllFields = (): boolean => {
    const fields = getAllFields();
    const newErrors = validateForm(fields, values);
    setErrors(newErrors);
    const valid = isFormValid(newErrors);
    setIsValid(valid);
    return valid;
  };

  // Validate a single field by name
  const validateSingleField = (name: string) => {
    const fields = getAllFields();
    const field = fields.find(f => f.name === name);
    
    if (!field) return;
    
    const fieldErrors = validateForm([field], values);
    
    setErrors(prev => ({
      ...prev,
      ...fieldErrors,
    }));
    
    setIsValid(isFormValid({ ...errors, ...fieldErrors }));
  };

  // Set a single field value
  const setValue = (name: string, value: any) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
    setIsDirty(true);
  };

  // Reset the form to initial values
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsDirty(false);
    setIsValid(true);
    
    if (autoSave && typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  };

  return {
    values,
    errors,
    isValid,
    isDirty,
    setValue,
    setValues,
    validateField: validateSingleField,
    validateForm: validateAllFields,
    resetForm,
  };
};

export default useFormState;