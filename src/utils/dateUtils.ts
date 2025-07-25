export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatDisplayDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const todayStr = formatDate(today);
  const yesterdayStr = formatDate(yesterday);
  const tomorrowStr = formatDate(tomorrow);

  const fullDateStr = date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  if (dateString === todayStr) return `Today, ${fullDateStr}`;
  if (dateString === yesterdayStr) return `Yesterday, ${fullDateStr}`;
  if (dateString === tomorrowStr) return `Tomorrow, ${fullDateStr}`;

  return fullDateStr;
};

export const addDays = (dateString: string, days: number): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  
  // Use UTC to avoid timezone issues
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  utcDate.setUTCDate(utcDate.getUTCDate() + days);
  
  const newYear = utcDate.getUTCFullYear();
  const newMonth = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
  const newDay = String(utcDate.getUTCDate()).padStart(2, '0');
  
  return `${newYear}-${newMonth}-${newDay}`;
};

export const isToday = (dateString: string): boolean => {
  return dateString === formatDate(new Date());
};

export const getDateLabel = (dateString: string): string | null => {
  const today = formatDate(new Date());
  const yesterday = addDays(today, -1);
  const tomorrow = addDays(today, 1);

  if (dateString === today) return 'Today';
  if (dateString === yesterday) return 'Yesterday';
  if (dateString === tomorrow) return 'Tomorrow';

  return null;
};

export const getFormattedDateOnly = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const getDayName = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString('en-US', { 
    weekday: 'long'
  });
};

export const isPastDate = (dateString: string): boolean => {
  return dateString < formatDate(new Date());
};
