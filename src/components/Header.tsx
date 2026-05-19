import { ClipboardEdit, List, BarChart3 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'form' | 'list' | 'summary';
  setActiveTab: (tab: 'form' | 'list' | 'summary') => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="bg-white px-6 py-4 border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <ClipboardEdit size={20} />
          </div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">日報システム</h1>
        </div>
        <nav className="flex gap-2">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'form'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <ClipboardEdit size={16} />
            提出
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'list'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <List size={16} />
            履歴・一覧
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'summary'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <BarChart3 size={16} />
            ユーザー集計
          </button>
        </nav>
      </div>
    </header>
  );
}
