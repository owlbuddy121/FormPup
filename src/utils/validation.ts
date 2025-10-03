import type { FormField, FormValues, FormErrors, ValidationRule } from '../types';

export const validateField = (field: FormField, value: any): string | null => {
  if (!field.validation || field.validation.length === 0) {
    return null;
  }

  for (const rule of field.validation) {
    const error = validateRule(rule, value, field);
    if (error) {
      return error;
    }
  }

  return null;
};

export const validateRule = (rule: ValidationRule, value: any, field: FormField): string | null => {
  switch (rule.type) {
    case 'required':
      if (value === undefined || value === null || value === '') {
        return rule.message;
      }
      if (Array.isArray(value) && value.length === 0) {
        return rule.message;
      }
      break;
      
    case 'minLength':
      if (typeof value === 'string' && value.length < Number(rule.value)) {
        return rule.message;
      }
      if (Array.isArray(value) && value.length < Number(rule.value)) {
        return rule.message;
      }
      break;
      
    case 'maxLength':
      if (typeof value === 'string' && value.length > Number(rule.value)) {
        return rule.message;
      }
      if (Array.isArray(value) && value.length > Number(rule.value)) {
        return rule.message;
      }
      break;
      
    case 'min':
      if (typeof value === 'number' && value < Number(rule.value)) {
        return rule.message;
      }
      break;
      
    case 'max':
      if (typeof value === 'number' && value > Number(rule.value)) {
        return rule.message;
      }
      break;
      
    case 'regex':
      if (typeof value === 'string' && rule.value) {
        const regex = new RegExp(rule.value as string);
        if (!regex.test(value)) {
          return rule.message;
        }
      }
      break;
      
    case 'custom':
      if (rule.validator && !rule.validator(value)) {
        return rule.message;
      }
      break;
  }
  
  return null;
};

export const validateForm = (fields: FormField[], values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  
  fields.forEach(field => {
    const error = validateField(field, values[field.name]);
    if (error) {
      errors[field.name] = error;
    }
  });
  
  return errors;
};

export const isFormValid = (errors: FormErrors): boolean => {
  return Object.keys(errors).length === 0;
};