import React, { useState } from 'react';
import { DailyReport } from '../types';
import { User, Calendar, Clock, AlertCircle, FileText, Send } from 'lucide-react';

interface ReportFormProps {
  onSubmit: (report: Omit<DailyReport, 'id' | 'createdAt'>) => void;
}

export function ReportForm({ onSubmit }: ReportFormProps) {
  // Use local time for today
  const today = new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD format
  
  const [formData, setFormData] = useState({
    employeeName: '',
    date: today,
    clockIn: '09:00',
    clockOut: '18:00',
    overtimeHours: 0,
    holidayWorkHours: 0,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset fields except for the name and date for easier successive data entry
    setFormData(prev => ({
      ...prev,
      clockIn: '09:00',
      clockOut: '18:00',
      overtimeHours: 0,
      holidayWorkHours: 0,
      notes: ''
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  return (
    <div className="mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900">日報を提出する</h2>
        <p className="mt-1 text-sm text-slate-500">本日の業務内容、退勤時間、残業・休日出勤の申請を行ってください。</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            {/* Employee Name */}
            <div className="sm:col-span-2">
              <label htmlFor="employeeName" className="mb-2 block text-sm font-medium text-slate-700">
                氏名 <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  id="employeeName"
                  name="employeeName"
                  required
                  value={formData.employeeName}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="山田 太郎"
                />
              </div>
            </div>

            {/* Date */}
            <div className="sm:col-span-2">
               <label htmlFor="date" className="mb-2 block text-sm font-medium text-slate-700">
                対象日 <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Calendar className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Clock In */}
            <div>
              <label htmlFor="clockIn" className="mb-2 block text-sm font-medium text-slate-700">
                出勤時間 <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Clock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="time"
                  id="clockIn"
                  name="clockIn"
                  required
                  value={formData.clockIn}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Clock Out */}
            <div>
              <label htmlFor="clockOut" className="mb-2 block text-sm font-medium text-slate-700">
                 退勤時間 <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Clock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="time"
                  id="clockOut"
                  name="clockOut"
                  required
                  value={formData.clockOut}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Overtime Hours */}
            <div>
              <label htmlFor="overtimeHours" className="mb-2 block text-sm font-medium text-slate-700">
                残業時間 (時間)
              </label>
              <div className="relative">
                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <AlertCircle className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="number"
                  id="overtimeHours"
                  name="overtimeHours"
                  min="0"
                  step="0.5"
                  value={formData.overtimeHours}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Holiday Work Hours */}
             <div>
              <label htmlFor="holidayWorkHours" className="mb-2 block text-sm font-medium text-slate-700">
                休日出勤時間 (時間)
              </label>
              <div className="relative">
                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <AlertCircle className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="number"
                  id="holidayWorkHours"
                  name="holidayWorkHours"
                  min="0"
                  step="0.5"
                  value={formData.holidayWorkHours}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="sm:col-span-2">
               <label htmlFor="notes" className="mb-2 block text-sm font-medium text-slate-700">
                業務内容・備考 <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute top-3 left-3 flex items-start">
                  <FileText className="h-5 w-5 text-slate-400" />
                </div>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  required
                  value={formData.notes}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="本日の作業内容や特記事項を入力してください..."
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              <Send size={16} />
              提出する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
