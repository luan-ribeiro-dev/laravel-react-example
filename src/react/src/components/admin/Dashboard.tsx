import { ConnectedProps, connect } from 'react-redux'
import { logoutUser } from '../../api/requests/users'
import AdminPanel from './AdminPanel';
import { RootState } from '../../api/store/reducers';
import { ReportBook, getReports } from '../../api/requests/admin/reports';
import { useEffect, useState } from 'react';
import { ChartJSDataset, getChartJSColor, toMoney } from '../../helper';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Point,
  ChartData,
  Tick,
} from 'chart.js';

function mapStateToProps(state: RootState) {
  return {
    getReportState: state.admin.reports.getReports
  }
}

const mapDispatchToProps = {
  dispatchGetReports: getReports,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps

function Dashboard({getReportState, dispatchGetReports}: Props) {
  const [todayMoney, setTodayMoney] = useState(0)
  const [last30DaysMoney, setLast30DaysMoney] = useState(0)
  const [todayOrders, setTodayOrders] = useState(0)
  const [last30DaysOrders, setLast30DaysOrders] = useState(0)
  const [todayCustomers, setTodayCustomers] = useState(0)
  const [last30DaysCustomers, setLast30DaysCustomers] = useState(0)
  const [top10RevenueBooksOfLast30Days, setTop10RevenueBooksOfLast30Days] = useState<ReportBook[]>([])
  const [top10SellerBooksOfLast30Days, setTop10SellerBooksOfLast30Days] = useState<ReportBook[]>([])
  const [chartData, setChartData] = useState<ChartData<"line", (number | Point | null)[], unknown>>()

  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const getChartData = (salesPerMonth: any): ChartData<"line", (number | Point | null)[], unknown>  => {
    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const datasets: ChartJSDataset[] = []
    
    console.log(salesPerMonth)

    if (salesPerMonth && Object.keys(salesPerMonth).length > 0) {
      Object.keys(salesPerMonth).forEach((year, index) => {
        datasets.push({
          label: year,
          data: Object.keys(salesPerMonth[year]).reduce((acc: number[], month) => {
            acc.push(salesPerMonth[year][month])
            return acc
          }, []),
          borderColor: getChartJSColor(index),
          backgroundColor: getChartJSColor(index),
          yAxisID: 'y',
          hidden: index < Object.keys(salesPerMonth).length - 2
        })
      })
    }

    return {labels, datasets}
  };

  useEffect(() => {
    dispatchGetReports()
  }, [])

  useEffect(() => {
    if (getReportState.succeeded && getReportState.data) {
      setTodayMoney(getReportState.data.todayMoney)
      setLast30DaysMoney(getReportState.data.last30DaysMoney)
      setTodayOrders(getReportState.data.todayOrders)
      setLast30DaysOrders(getReportState.data.last30DaysOrders)
      setTodayCustomers(getReportState.data.todayCustomers)
      setLast30DaysCustomers(getReportState.data.last30DaysCustomers)
      setTop10RevenueBooksOfLast30Days(getReportState.data.top10RevenueBooksOfLast30Days)
      setTop10SellerBooksOfLast30Days(getReportState.data.top10SellerBooksOfLast30Days)
      setChartData(getChartData(getReportState.data.salesPerMonth))

      console.log(getChartData(getReportState.data.salesPerMonth))
    }
  }, [getReportState.status])

  return (
    <AdminPanel
      breadcrumb={[
        {name: "Dashboard", link: "/dashboard"},
        {name: "Reports", link: "/dashboard"},
      ]}
      title="Geral reports"
    >
      <div className="row">
        <div className="col-12 col-sm-6 col-md-4 mb-xs-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Today's Revenue</p>
                    <h5 className="font-weight-bolder mb-0">
                      {toMoney(todayMoney)}
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-primary shadow text-center border-radius-md">
                    <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-xs-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Last 30 days Revenue</p>
                    <h5 className="font-weight-bolder mb-0">
                      {toMoney(last30DaysMoney)}
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-primary shadow text-center border-radius-md">
                    <i className="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-xs-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Today's Orders</p>
                    <h5 className="font-weight-bolder mb-0">
                      {todayOrders}
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-primary shadow text-center border-radius-md">
                    <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-xs-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Last 30 days Orders</p>
                    <h5 className="font-weight-bolder mb-0">
                      {last30DaysOrders}
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-primary shadow text-center border-radius-md">
                    <i className="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-xs-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Today's Customer</p>
                    <h5 className="font-weight-bolder mb-0">
                      {todayCustomers}
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-primary shadow text-center border-radius-md">
                    <i className="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Last 30 Days Customers</p>
                    <h5 className="font-weight-bolder mb-0">
                      {last30DaysCustomers}
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-primary shadow text-center border-radius-md">
                    <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="card z-index-2">
            <div className="card-header pb-0">
              <h6>Sales overview</h6>
            </div>
            <div className="card-body p-3">
              {chartData && (
                <Line 
                  options={{
                    responsive: true,
                    interaction: {
                      mode: 'index' as const,
                      intersect: false,
                    },
                    // stacked: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (tickValue: string | number, index: number, ticks: Tick[]) => toMoney(typeof tickValue === 'string' ? parseInt(tickValue) : tickValue)
                        }
                      }
                    }
                  }} 
                  data={chartData} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-12 mb-md-0 mb-4">
          <div className="card">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-lg-6 col-7">
                  <h6>Best Sellers</h6>
                </div>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Title</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Genre</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Quantity</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top10SellerBooksOfLast30Days.map((book, index) => (
                      <tr key={`top10SellerBooksOfLast30Days-${book.title}-${index}`}>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>
                              <img src="/assets/img/book_placeholder_cover.jpeg" className="avatar avatar-sm me-3" alt="xd" />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">{book.title}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="avatar-group mt-2">
                            {book.genre}
                          </div>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <span className="text-xs font-weight-bold"> {book.totalQuantity} </span>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <span className="text-xs font-weight-bold"> {toMoney(book.totalRevenue)} </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-12 mb-md-0 mb-4">
          <div className="card">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-lg-6 col-7">
                  <h6>Best Revenues</h6>
                </div>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Title</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Genre</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Quantity</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top10RevenueBooksOfLast30Days.map((book, index) => (
                      <tr key={`top10RevenueBooksOfLast30Days-${book.title}-${index}`}>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>
                              <img src="/assets/img/book_placeholder_cover.jpeg" className="avatar avatar-sm me-3" alt="xd" />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">{book.title}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="avatar-group mt-2">
                            {book.genre}
                          </div>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <span className="text-xs font-weight-bold"> {book.totalQuantity} </span>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <span className="text-xs font-weight-bold"> {toMoney(book.totalRevenue)} </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPanel>
  )
}

export default connector(Dashboard)
