import { DailyReport } from '../types';
import { Clock, Calendar, AlertCircle, Trash2 } from 'lucide-react';

interface ReportListProps {
  reports: DailyReport[];
  onDelete: (id: string) => void;
}

export function ReportList({ reports, onDelete }: ReportListProps) {
  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <Calendar size={32} />
        </div>
        <h3 className="mt-4 text-lg font-medium text-slate-900">日報がありません</h3>
        <p className="mt-2 text-sm text-slate-500">提出された日報はここに表示されます。</p>
      </div>
    );
  }

  // Calculate totals
  const totalOvertime = reports.reduce((sum, r) => sum + (r.overtimeHours || 0), 0);
  const totalHoliday = reports.reduce((sum, r) => sum + (r.holidayWorkHours || 0), 0);

  return (
    <div className="mx-auto w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900">日報一覧</h2>
        <p className="mt-1 text-sm text-slate-500">過去の提出履歴と残業時間のサマリーを確認できます。</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 text-slate-600">
            <Calendar className="h-5 w-5 text-indigo-500" />
            <h3 className="text-sm font-medium">合計提出数</h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{reports.length}<span className="text-base font-normal text-slate-500 ml-1">件</span></p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 text-slate-600">
            <Clock className="h-5 w-5 text-amber-500" />
            <h3 className="text-sm font-medium">全体残業時間</h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{totalOvertime}<span className="text-base font-normal text-slate-500 ml-1">時間</span></p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 text-slate-600">
            <AlertCircle className="h-5 w-5 text-rose-500" />
            <h3 className="text-sm font-medium">全体休日出勤</h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{totalHoliday}<span className="text-base font-normal text-slate-500 ml-1">時間</span></p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-900 uppercase">
              <tr>
                <th className="whitespace-nowrap px-6 py-4 font-semibold">日付</th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold">氏名</th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold">勤務時間</th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold">残業 / 休出</th>
                <th className="w-full min-w-[200px] px-6 py-4 font-semibold">業務内容</th>
                <th className="px-6 py-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                    {report.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {report.employeeName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {report.clockIn} - {report.clockOut}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex flex-col gap-1.5 text-[11px] sm:text-xs">
                      {report.overtimeHours > 0 ? (
                        <span className="inline-flex max-w-fit items-center rounded-md bg-amber-50 px-2 py-1 font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                          残業: {report.overtimeHours}h
                        </span>
                      ) : <span className="text-slate-400">-</span>}
                      {report.holidayWorkHours > 0 && (
                        <span className="inline-flex max-w-fit items-center rounded-md bg-rose-50 px-2 py-1 font-medium text-rose-700 ring-1 ring-inset ring-rose-600/20">
                          休出: {report.holidayWorkHours}h
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="line-clamp-2 max-w-md whitespace-pre-wrap text-slate-600">
                      {report.notes}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <button
                      onClick={() => onDelete(report.id)}
                      className="rounded p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      title="削除"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
