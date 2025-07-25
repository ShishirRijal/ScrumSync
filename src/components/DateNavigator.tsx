import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addDays, isToday, formatDate, getDateLabel, getFormattedDateOnly, getDayName } from '../utils/dateUtils';

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
    onDateChange(addDays(currentDate, 1));
  };

  const handleTodayClick = () => {
    const today = new Date().toISOString().split('T')[0];
    onDateChange(today);
  };

  const today = formatDate(new Date());
  const tomorrow = addDays(today, 1);
  const canGoForward = currentDate <= tomorrow && currentDate !== tomorrow;
  
  return (
    <div className="relative bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <button
          onClick={handlePrevDay}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          title="Previous day"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Center Content */}
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="text-sm font-medium text-blue-600 mb-1">
              {getDateLabel(currentDate) ? `${getDateLabel(currentDate)}, ${getDayName(currentDate)}` : getDayName(currentDate)}
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              {getFormattedDateOnly(currentDate)}
            </h2>
          </div>
        </div>

        {/* Go to Today Button - Fixed Position */}
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
          {!isToday(currentDate) && (
            <button
              onClick={handleTodayClick}
              className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
            >
              Go to Today
            </button>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={canGoForward ? handleNextDay : undefined}
          disabled={!canGoForward}
          className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${
            canGoForward 
              ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600'
              : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
          }`}
          title="Next day"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};