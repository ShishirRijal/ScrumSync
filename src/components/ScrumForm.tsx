import React, { useState, useEffect } from 'react';
import { Save, Edit3, Check, X } from 'lucide-react';
import { ScrumEntry } from '../types/scrum';

interface ScrumFormProps {
  entry: ScrumEntry | null;
  onSave: (entry: Omit<ScrumEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  date: string;
}

export const ScrumForm: React.FC<ScrumFormProps> = ({ entry, onSave, date }) => {
  const [isEditing, setIsEditing] = useState(!entry);
  const [formData, setFormData] = useState({
    yesterday: entry?.yesterday || '',
    today: entry?.today || '',
    blockers: entry?.blockers || '',
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        yesterday: entry.yesterday,
        today: entry.today,
        blockers: entry.blockers,
      });
      setIsEditing(false);
    } else {
      setFormData({ yesterday: '', today: '', blockers: '' });
      setIsEditing(true);
    }
  }, [entry, date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      date,
      ...formData,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (entry) {
      setFormData({
        yesterday: entry.yesterday,
        today: entry.today,
        blockers: entry.blockers,
      });
      setIsEditing(false);
    } else {
      setFormData({ yesterday: '', today: '', blockers: '' });
    }
  };

  const hasContent = formData.yesterday || formData.today || formData.blockers;

  if (!isEditing && entry) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Scrum Update</h3>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                What I did yesterday
              </h4>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {entry.yesterday || 'No updates provided'}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                What I plan to do today
              </h4>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {entry.today || 'No plans provided'}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                Blockers & Issues
              </h4>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {entry.blockers || 'No blockers'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Last updated: {new Date(entry.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {entry ? 'Edit Scrum Update' : 'Create Scrum Update'}
          </h3>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="yesterday" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                What I did yesterday
              </div>
            </label>
            <textarea
              id="yesterday"
              value={formData.yesterday}
              onChange={(e) => setFormData({ ...formData, yesterday: e.target.value })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
              rows={4}
              placeholder="Describe what you accomplished yesterday..."
            />
          </div>

          <div>
            <label htmlFor="today" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                What I plan to do today
              </div>
            </label>
            <textarea
              id="today"
              value={formData.today}
              onChange={(e) => setFormData({ ...formData, today: e.target.value })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
              rows={4}
              placeholder="Outline your plans for today..."
            />
          </div>

          <div>
            <label htmlFor="blockers" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                Blockers & Issues
              </div>
            </label>
            <textarea
              id="blockers"
              value={formData.blockers}
              onChange={(e) => setFormData({ ...formData, blockers: e.target.value })}
              className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
              rows={3}
              placeholder="Any blockers or issues you're facing..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
          {entry && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          )}
          <button
            type="submit"
            disabled={!hasContent}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-md transition-colors duration-200"
          >
            <Check className="w-4 h-4" />
            <span>{entry ? 'Update' : 'Save'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};