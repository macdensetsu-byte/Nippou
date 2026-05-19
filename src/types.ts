export interface DailyReport {
  id: string;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut: string;
  overtimeHours: number;
  holidayWorkHours: number;
  notes: string;
  createdAt: string;
}
