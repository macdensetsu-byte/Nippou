import { useState } from 'react';
import { Header } from './components/Header';
import { ReportForm } from './components/ReportForm';
import { ReportList } from './components/ReportList';
import { UserSummary } from './components/UserSummary';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DailyReport } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'list' | 'summary'>('form');
  const [reports, setReports] = useLocalStorage<DailyReport[]>('daily-reports', []);

  const handleAddReport = (report: Omit<DailyReport, 'id' | 'createdAt'>) => {
    const newReport: DailyReport = {
      ...report,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    // Sort logic keeps newest at top
    setReports((prev) => [newReport, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setActiveTab('list');
  };

  const handleDeleteReport = (id: string) => {
    if (window.confirm('この日報を削除してもよろしいですか？')) {
      setReports((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'form' ? (
          <ReportForm onSubmit={handleAddReport} />
        ) : activeTab === 'list' ? (
          <ReportList reports={reports} onDelete={handleDeleteReport} />
        ) : (
          <UserSummary reports={reports} />
        )}
      </main>
    </div>
  );
}
