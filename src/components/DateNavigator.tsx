import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { formatDisplayDate, addDays, isToday, formatDate } from '../utils/dateUtils';

interface DateNavigatorProps {
  currentDate: string;
  onDateChange: (date: string) => void;
}

export const DateNavigator: React.FC<DateNavigatorProps> = ({
  currentDate,
  onDateChange,
}) => {
  const handlePrevDay = () => {
    onDateChange(addDays(currentDate, -1));
  };

  const handleNextDay = () => {
    onDateChange(addDays(currentDate, +1));
  };

  const handleTodayClick = () => {
    const today = new Date().toISOString().split('T')[0];
    onDateChange(today);
  };

  const today = formatDate(new Date());
  const canGoForward = currentDate < today;
  
  return (
    <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <button
        onClick={handlePrevDay}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200"
        title="Previous day"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">
            {formatDisplayDate(currentDate)}
          </h2>
        </div>
        
        {!isToday(currentDate) && (
          <button
            onClick={handleTodayClick}
            className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
          >
            Go to Today
          </button>
        )}
      </div>

      <button
        onClick={handleNextDay}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
          canGoForward 
            ? 'hover:bg-gray-100 text-gray-600'
            : 'text-gray-300 cursor-not-allowed'
        }`}
        title="Next day"
      >
        <ChevronRight className={`w-5 h-5 ${canGoForward ? 'text-gray-600' : 'text-gray-300'}`} />
      </button>
    </div>
  );
};