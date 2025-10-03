import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import type { FieldType } from '../../types';

const fieldTypes: { type: FieldType; label: string; icon: string }[] = [
  { type: 'text', label: 'Text Input', icon: '📝' },
  { type: 'textarea', label: 'Text Area', icon: '📄' },
  { type: 'number', label: 'Number', icon: '🔢' },
  { type: 'select', label: 'Dropdown', icon: '🔽' },
  { type: 'multiselect', label: 'Multi Select', icon: '✅' },
  { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
  { type: 'radio', label: 'Radio Buttons', icon: '⚪' },
  { type: 'date', label: 'Date Picker', icon: '📅' },
  { type: 'time', label: 'Time Picker', icon: '⏰' },
  { type: 'datetime', label: 'Date & Time', icon: '📆' },
  { type: 'file', label: 'File Upload', icon: '📎' },
  { type: 'rating', label: 'Rating', icon: '⭐' },
  { type: 'slider', label: 'Slider', icon: '🎚️' },
  { type: 'section', label: 'Section', icon: '📑' },
  { type: 'divider', label: 'Divider', icon: '➖' },
  { type: 'heading', label: 'Heading', icon: '🔤' },
];

const FieldPalette: React.FC = () => {
  return (
    <Droppable droppableId="field-palette" isDropDisabled={true}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="space-y-2"
        >
          {fieldTypes.map((field, index) => (
            <Draggable key={field.type} draggableId={field.type} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 flex items-center space-x-2 cursor-grab"
                >
                  <span className="text-lg">{field.icon}</span>
                  <span>{field.label}</span>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default FieldPalette;