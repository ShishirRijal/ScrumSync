import React from 'react';
import { Calendar, Plus } from 'lucide-react';

interface EmptyStateProps {
  date: string;
  onCreateEntry: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ date, onCreateEntry }) => {
  const isToday = date === new Date().toISOString().split('T')[0];
  
  return (
    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {isToday ? "No scrum update yet" : "No scrum update for this day"}
      </h3>
      <p className="text-gray-500 mb-6">
        {isToday 
          ? "Create your daily scrum update to track your progress."
          : "Create a scrum update for this day to track what happened."
        }
      </p>
      <button
        onClick={onCreateEntry}
        className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
      >
        <Plus className="w-4 h-4" />
        <span>Create Update</span>
      </button>
    </div>
  );
};