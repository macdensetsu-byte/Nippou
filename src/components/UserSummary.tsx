import { useState, useMemo } from 'react';
import { DailyReport } from '../types';
import { Users, Clock, AlertCircle, Calendar, BarChart3 } from 'lucide-react';

interface UserSummaryProps {
  reports: DailyReport[];
}

interface UserStats {
  employeeName: string;
  overtimeHours: number;
  holidayWorkHours: number;
  reportCount: number;
}

export function UserSummary({ reports }: UserSummaryProps) {
  // Extract unique months from reports
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    reports.forEach((r) => {
      if (r.date) {
        // Assume format is YYYY-MM-DD
        const monthYear = r.date.substring(0, 7);
        months.add(monthYear);
      }
    });
    return Array.from(months).sort((a, b) => b.localeCompare(a)); // sort descending
  }, [reports]);

  // Default to current month, or the most recent month in data
  const currentMonthYear = new Date().toISOString().substring(0, 7);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    availableMonths.includes(currentMonthYear) ? currentMonthYear : (availableMonths[0] || currentMonthYear)
  );

  // Calculate summaries for the selected month
  const summaryData = useMemo(() => {
    const data = new Map<string, UserStats>();

    reports.forEach((r) => {
      if (!r.date || !r.date.startsWith(selectedMonth)) return;

      const userStats = data.get(r.employeeName) || {
        employeeName: r.employeeName,
        overtimeHours: 0,
        holidayWorkHours: 0,
        reportCount: 0,
      };

      userStats.overtimeHours += r.overtimeHours || 0;
      userStats.holidayWorkHours += r.holidayWorkHours || 0;
      userStats.reportCount += 1;

      data.set(r.employeeName, userStats);
    });

    return Array.from(data.values()).sort((a, b) => a.employeeName.localeCompare(b.employeeName));
  }, [reports, selectedMonth]);

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <BarChart3 size={32} />
        </div>
        <h3 className="mt-4 text-lg font-medium text-slate-900">データがありません</h3>
        <p className="mt-2 text-sm text-slate-500">日報が提出されると集計が表示されます。</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">ユーザー別集計</h2>
          <p className="mt-1 text-sm text-slate-500">月ごとのユーザー別累計残業・休出時間を確認できます。</p>
        </div>
        
        <div className="flex items-center gap-3">
          <label htmlFor="month-select" className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-500" />
            対象月:
          </label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="block w-40 rounded-lg border border-slate-300 py-2 pl-3 pr-10 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          >
            {availableMonths.length === 0 && (
              <option value={currentMonthYear}>{currentMonthYear}</option>
            )}
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month.replace('-', '年 ')}月
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-900 uppercase">
              <tr>
                <th className="whitespace-nowrap px-6 py-4 font-semibold">氏名</th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold">提出日数</th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold">残業時間 (累計)</th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold">休日出勤 (累計)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {summaryData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    選択した月のデータはありません
                  </td>
                </tr>
              ) : (
                summaryData.map((user) => (
                  <tr key={user.employeeName} className="hover:bg-slate-50 transition-colors">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3 text-slate-900 font-medium">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                           <Users size={16} />
                        </div>
                        {user.employeeName}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.reportCount} 日
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {user.overtimeHours > 0 ? (
                        <span className="text-amber-600 flex items-center gap-1.5">
                          <Clock size={16} />
                          {user.overtimeHours} 時間
                        </span>
                      ) : (
                        <span className="text-slate-400">0 時間</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {user.holidayWorkHours > 0 ? (
                        <span className="text-rose-600 flex items-center gap-1.5">
                          <AlertCircle size={16} />
                          {user.holidayWorkHours} 時間
                        </span>
                      ) : (
                        <span className="text-slate-400">0 時間</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
