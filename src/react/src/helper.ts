export type ChartJSDataset = {
  label: string,
  data: number[],
  borderColor: string,
  backgroundColor: string,
  yAxisID: string,
  hidden?: boolean,
}

export function toMoney(num: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(num);
}

export function getChartJSColor(index: number) {
  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#FF8A80',
    '#80D8FF',
    '#CCFF90',
    '#FFFF8D',
    '#CFD8DC',
    '#FFAB40',
    '#A1887F',
    '#80CBC4',
    '#D1C4E9',
    '#9FA8DA',
    '#E6EE9C',
    '#B0BEC5',
    '#FFEE58',
    '#FFD54F',
    '#FF7043',
    '#E0E0E0',
    '#BDBDBD',
    '#9E9E9E',
    '#757575',
    '#616161',
    '#424242',
    '#212121',
  ];
  return colors[index];
}