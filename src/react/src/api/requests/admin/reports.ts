import api, {ApiReset, ApiReturn, apiReducer} from '../..'

export enum Constants {
  GET_DASHBOARD_REPORTS = '@ADMIN/REPORTS/GET_DASHBOARD_REPORTS',
}

export type ReportBook = {
  title: string,
  genre: string,
  totalQuantity: number,
  totalRevenue: number,
}

export type Report = {
  todayMoney: number,
  last30DaysMoney: number,
  todayOrders: number,
  last30DaysOrders: number,
  todayCustomers: number,
  last30DaysCustomers: number,
  salesPerMonth: number[][],
  top10SellerBooksOfLast30Days: ReportBook[],
  top10RevenueBooksOfLast30Days: ReportBook[],
}

export function getReports(data?: ApiReset) {
  return api(Constants.GET_DASHBOARD_REPORTS, {
    url: 'admin/reports',
    method: 'GET',
    data,
  })
}

export type ReportState = {
  getReports: ApiReturn<Report>
}

export const reducers = {
  getReports: apiReducer(Constants.GET_DASHBOARD_REPORTS),
}