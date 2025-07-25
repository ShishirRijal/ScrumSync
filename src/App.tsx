import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { DateNavigator } from './components/DateNavigator';
import { ScrumForm } from './components/ScrumForm';
import { EmptyState } from './components/EmptyState';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ScrumEntry, ScrumState } from './types/scrum';
import { formatDate } from './utils/dateUtils';

function App() {
  const [scrumState, setScrumState] = useLocalStorage<ScrumState>('scrum-data', {
    entries: {},
    currentDate: formatDate(new Date()),
  });

  const [showForm, setShowForm] = useState(false);

  const currentEntry = scrumState.entries[scrumState.currentDate] || null;

  const handleDateChange = useCallback((date: string) => {
    setScrumState(prev => ({
      ...prev,
      currentDate: date,
    }));
    setShowForm(false);
  }, [setScrumState]);

  const handleSaveEntry = useCallback((entryData: Omit<ScrumEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const entry: ScrumEntry = {
      id: `entry-${entryData.date}-${Date.now()}`,
      ...entryData,
      createdAt: currentEntry?.createdAt || now,
      updatedAt: now,
    };

    setScrumState(prev => ({
      ...prev,
      entries: {
        ...prev.entries,
        [entryData.date]: entry,
      },
    }));
    setShowForm(false);
  }, [setScrumState, currentEntry]);

  const handleCreateEntry = useCallback(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <DateNavigator
            currentDate={scrumState.currentDate}
            onDateChange={handleDateChange}
          />

          {showForm || currentEntry ? (
            <ScrumForm
              entry={currentEntry}
              onSave={handleSaveEntry}
              date={scrumState.currentDate}
            />
          ) : (
            <EmptyState
              date={scrumState.currentDate}
              onCreateEntry={handleCreateEntry}
            />
          )}
        </div>
      </main>

      <footer className="mt-16 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-xs text-gray-500">
            Built for productive scrum meetings • Data stored locally in your browser
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;