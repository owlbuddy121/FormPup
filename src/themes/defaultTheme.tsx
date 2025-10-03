import type { ThemeConfig } from '../types';

// This is a simple default theme using Tailwind CSS
const defaultTheme: ThemeConfig = {
  name: 'default',
  components: {
    // You can add custom components here if needed
  },
  styles: {
    // Form container
    formContainer: 'max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6',
    
    // Form elements
    label: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1',
    input: 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
    select: 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
    checkbox: 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
    radio: 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300',
    textarea: 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
    
    // Buttons
    button: 'px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
    primaryButton: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondaryButton: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200',
    
    // Validation
    errorText: 'text-red-500 text-xs mt-1',
    
    // Layout
    formGroup: 'mb-4',
    formRow: 'flex flex-wrap -mx-2',
    formCol: 'px-2',
    
    // Tabs
    tabList: 'flex border-b border-gray-200 dark:border-gray-700',
    tab: 'py-2 px-4 font-medium',
    activeTab: 'border-b-2 border-blue-500 text-blue-500',
    inactiveTab: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
    
    // Sections
    section: 'mb-6',
    sectionTitle: 'text-xl font-medium border-b border-gray-200 dark:border-gray-700 pb-2 mb-4',
  },
};

export default defaultTheme;