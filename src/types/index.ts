export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'time'
  | 'datetime'
  | 'file'
  | 'rating'
  | 'slider'
  | 'section'
  | 'divider'
  | 'heading';

export interface FieldOption {
  label: string;
  value: string;
}

export interface ValidationRule {
  type: 'required' | 'regex' | 'minLength' | 'maxLength' | 'min' | 'max' | 'custom';
  value?: string | number | boolean;
  message: string;
  validator?: (value: any) => boolean;
}

export interface ConditionalRule {
  field: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'notContains' | 'greaterThan' | 'lessThan';
  value: any;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: any;
  options?: FieldOption[];
  validation?: ValidationRule[];
  conditionalDisplay?: ConditionalRule[];
  className?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  multiple?: boolean;
  accept?: string;
  rows?: number;
  cols?: number;
}

export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}

export interface FormTab {
  id: string;
  title: string;
  sections: FormSection[];
}

export interface FormSchema {
  id: string;
  title: string;
  description?: string;
  tabs: FormTab[];
  theme?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  showProgressBar?: boolean;
  autoSave?: boolean;
}

export interface FormValues {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

export interface ThemeConfig {
  name: string;
  components: {
    [key: string]: React.ComponentType<any>;
  };
  styles: {
    [key: string]: string;
  };
}