export interface SpendingMoney {
  id: number;
  spentMoney: string;
  category: string;
  date: string;
  memo?: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface TargetMonthSpending {
  id: number;
  targetDate: string;
  targetMoney: string;
  userId: number;
}

export interface Schedule {
  id: number;
  title: string;
  color: string;
  memo: string;
  isAllDay: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface spendingMoneyApiResponse {
  targetMonthSpending: TargetMonthSpending | null;
  targetDateSpendingMoney: SpendingMoney[];
  total: number;
}

export interface spendingMoneyForChartApiResponse {
  spendingMoneysForChart: [string, string, SpendingMoney[]][];
  total: number;
}
