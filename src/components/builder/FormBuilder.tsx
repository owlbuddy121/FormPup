import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { FormSchema, FormField, FieldType } from '../../types';
import { default as FieldPalette } from './FieldPalette';
import FieldEditor from './FieldEditor';
import FormPreview from './FormPreview';

interface FormBuilderProps {
  initialSchema?: FormSchema;
  onSave?: (schema: FormSchema) => void;
}

const defaultSchema: FormSchema = {
  id: 'form-' + Date.now(),
  title: 'New Form',
  tabs: [
    {
      id: 'tab-1',
      title: 'Tab 1',
      sections: [
        {
          id: 'section-1',
          title: 'Section 1',
          fields: [],
        },
      ],
    },
  ],
  submitButtonText: 'Submit',
  cancelButtonText: 'Cancel',
  showProgressBar: true,
  autoSave: false,
};

const FormBuilder: React.FC<FormBuilderProps> = ({ initialSchema, onSave }) => {
  const [schema, setSchema] = useState<FormSchema>(initialSchema || defaultSchema);
  const [activeTab, setActiveTab] = useState<string>(schema.tabs[0].id);
  const [activeSection, setActiveSection] = useState<string>(schema.tabs[0].sections[0].id);
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If dragging from palette to form
    if (source.droppableId === 'field-palette' && destination.droppableId.startsWith('section-')) {
      const sectionId = destination.droppableId.replace('section-', '');
      const fieldType = result.draggableId as FieldType;
      
      const newField: FormField = {
        id: `field-${Date.now()}`,
        type: fieldType,
        label: `New ${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}`,
        name: `field_${Date.now()}`,
        required: false,
      };

      // Add options for select, multiselect, radio
      if (['select', 'multiselect', 'radio'].includes(fieldType)) {
        newField.options = [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ];
      }

      const newSchema = { ...schema };
      const tabIndex = newSchema.tabs.findIndex(tab => tab.id === activeTab);
      const sectionIndex = newSchema.tabs[tabIndex].sections.findIndex(section => section.id === sectionId);
      
      newSchema.tabs[tabIndex].sections[sectionIndex].fields.splice(destination.index, 0, newField);
      setSchema(newSchema);
      setSelectedField(newField);
      return;
    }

    // If reordering fields within a section
    if (source.droppableId.startsWith('section-') && destination.droppableId.startsWith('section-')) {
      const sourceSectionId = source.droppableId.replace('section-', '');
      const destSectionId = destination.droppableId.replace('section-', '');
      
      const newSchema = { ...schema };
      const tabIndex = newSchema.tabs.findIndex(tab => tab.id === activeTab);
      const sourceSection = newSchema.tabs[tabIndex].sections.find(section => section.id === sourceSectionId);
      const destSection = newSchema.tabs[tabIndex].sections.find(section => section.id === destSectionId);
      
      if (!sourceSection || !destSection) return;
      
      const [movedField] = sourceSection.fields.splice(source.index, 1);
      destSection.fields.splice(destination.index, 0, movedField);
      
      setSchema(newSchema);
      return;
    }
  };

  const handleFieldUpdate = (updatedField: FormField) => {
    const newSchema = { ...schema };
    const tabIndex = newSchema.tabs.findIndex(tab => tab.id === activeTab);
    
    for (const section of newSchema.tabs[tabIndex].sections) {
      const fieldIndex = section.fields.findIndex(field => field.id === updatedField.id);
      if (fieldIndex !== -1) {
        section.fields[fieldIndex] = updatedField;
        break;
      }
    }
    
    setSchema(newSchema);
    setSelectedField(updatedField);
  };

  const handleFieldDelete = (fieldId: string) => {
    const newSchema = { ...schema };
    const tabIndex = newSchema.tabs.findIndex(tab => tab.id === activeTab);
    
    for (const section of newSchema.tabs[tabIndex].sections) {
      const fieldIndex = section.fields.findIndex(field => field.id === fieldId);
      if (fieldIndex !== -1) {
        section.fields.splice(fieldIndex, 1);
        break;
      }
    }
    
    setSchema(newSchema);
    setSelectedField(null);
  };

  const handleAddSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: `Section ${schema.tabs.find(tab => tab.id === activeTab)?.sections.length! + 1}`,
      fields: [],
    };
    
    const newSchema = { ...schema };
    const tabIndex = newSchema.tabs.findIndex(tab => tab.id === activeTab);
    newSchema.tabs[tabIndex].sections.push(newSection);
    
    setSchema(newSchema);
    setActiveSection(newSection.id);
  };

  const handleAddTab = () => {
    const newTab = {
      id: `tab-${Date.now()}`,
      title: `Tab ${schema.tabs.length + 1}`,
      sections: [
        {
          id: `section-${Date.now()}`,
          title: 'Section 1',
          fields: [],
        },
      ],
    };
    
    const newSchema = { ...schema };
    newSchema.tabs.push(newTab);
    
    setSchema(newSchema);
    setActiveTab(newTab.id);
    setActiveSection(newTab.sections[0].id);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(schema);
    }
    
    // For demo purposes, log the schema
    console.log('Form Schema:', JSON.stringify(schema, null, 2));
  };

  const handleFormSettingsUpdate = (settings: Partial<FormSchema>) => {
    setSchema({ ...schema, ...settings });
  };

  const activeTabData = schema.tabs.find(tab => tab.id === activeTab);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">{schema.title}</h1>
          <div className="flex space-x-2 mt-2">
            <button
              className={`px-3 py-1 rounded ${mode === 'edit' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              onClick={() => setMode('edit')}
            >
              Edit
            </button>
            <button
              className={`px-3 py-1 rounded ${mode === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              onClick={() => setMode('preview')}
            >
              Preview
            </button>
          </div>
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save Form
        </button>
      </div>

      {mode === 'edit' ? (
        <div className="flex flex-1 overflow-hidden">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="w-64 bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">Field Types</h2>
              <FieldPalette />
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex space-x-2 mb-4">
                {schema.tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`px-3 py-1 rounded ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.title}
                  </button>
                ))}
                <button
                  className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  onClick={handleAddTab}
                >
                  + Add Tab
                </button>
              </div>

              {activeTabData && (
                <div>
                  {activeTabData.sections.map(section => (
                    <div
                      key={section.id}
                      className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                    >
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-medium">{section.title}</h3>
                      </div>
                      <Droppable droppableId={`section-${section.id}`}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="p-4 min-h-[100px] bg-white dark:bg-gray-900"
                          >
                            {section.fields.map((field, index) => (
                              <Draggable key={field.id} draggableId={field.id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-3 mb-2 border rounded ${selectedField?.id === field.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                                    onClick={() => setSelectedField(field)}
                                  >
                                    <div className="flex justify-between items-center">
                                      <span>{field.label}</span>
                                      <span className="text-xs text-gray-500">{field.type}</span>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                  <button
                    className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    onClick={handleAddSection}
                  >
                    + Add Section
                  </button>
                </div>
              )}
            </div>

            <div className="w-80 bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">Properties</h2>
              {selectedField ? (
                <FieldEditor
                  field={selectedField}
                  onUpdate={handleFieldUpdate}
                  onDelete={handleFieldDelete}
                />
              ) : (
                <div className="text-gray-500">Select a field to edit its properties</div>
              )}
            </div>
          </DragDropContext>
        </div>
      ) : (
        <FormPreview schema={schema} />
      )}
    </div>
  );
};

export default FormBuilder;