import { lastWeekDays, lastMonthDays, yesterdayHours } from "./mockData";

// Helper functions are assumed to be defined above as you provided

// Generate mock data for sales
const generateSalesData = (totalSales, numberOfPoints, isActual) => {
  const averageSale = totalSales / numberOfPoints;
  return Array.from({ length: numberOfPoints }, () => {
    // For actual sales, we use a random fluctuation around the average
    // For predicted sales, we could introduce a trend or keep it similar to actual sales
    return isActual
      ? Math.floor(Math.random() * averageSale * 2)
      : Math.floor(averageSale + Math.random() * averageSale * 0.5); // Predicted sales with a slight increase
  });
};

// Generate mock data for yesterday (24 hours)
const salesYesterdayData = (totalSales) => {
  return [
    ...generateSalesData(totalSales / 365 / 2, 12, true), // Actual sales for the first half of the day
    ...generateSalesData(totalSales / 365 / 2, 12, false), // Predicted sales for the second half of the day
  ];
};

// Generate mock data for last week (7 days)
const salesLastWeekData = (totalSales) => [
  ...generateSalesData(totalSales / 52 / 2, 3, true), // Actual sales for the first half of the week
  ...generateSalesData(totalSales / 52 / 2, 4, false), // Predicted sales for the second half of the week
];

// Generate mock data for last month (30 days)
const salesLastMonthData = (totalSales) => [
  ...generateSalesData(totalSales / 12 / 2, 15, true), // Actual sales for the first half of the month
  ...generateSalesData(totalSales / 12 / 2, 15, false), // Predicted sales for the second half of the month
];

console.log("Last Week Days:", lastWeekDays);

export const salesTrendsPredicted = (totalSales = 800000) => {
  return {
    yesterday: {
      xAxis: {
        name: "Hour",
        data: yesterdayHours,
      },
      pieces: [
        {
          gt: -0.1,
          lte: 12,
          color: "#59C4E6",
        },
        {
          gt: 12,
          color: "#516B91",
        },
      ],
      series: {
        name: "Sales",
        data: salesYesterdayData(totalSales),
        markArea: {
          data: [
            [
              {
                name: "Actual Sales",
                xAxis: "0:00",
                itemStyle: {
                  color: "#A5E7F0",
                  opacity: 0.3,
                },
              },
              {
                xAxis: "12:00",
              },
            ],
            [
              {
                name: "Projected Sales",
                xAxis: "12:00",
                itemStyle: {
                  color: "#516B91",
                  opacity: 0,
                },
              },
              {
                xAxis: "23:00",
              },
            ],
          ],
        },
      },
    },
    week: {
      xAxis: {
        name: "Day",
        data: lastWeekDays,
      },
      yAxis: {
        name: "Sales",
      },
      pieces: [
        {
          gt: -0.1,
          lte: 3,
          color: "#59C4E6",
        },
        {
          gt: 3,
          color: "#516B91",
        },
      ],
      series: {
        name: "Sales",
        data: salesLastWeekData(totalSales),
        markArea: {
          data: [
            [
              {
                name: "Actual Sales",
                xAxis: lastWeekDays[0],
                itemStyle: {
                  color: "#A5E7F0",
                  opacity: 0.3,
                },
              },
              {
                xAxis: lastWeekDays[3],
              },
            ],
            [
              {
                name: "Projected Sales",
                xAxis: lastWeekDays[3],
                itemStyle: {
                  color: "#516B91",
                  opacity: 0,
                },
              },
              {
                xAxis: lastWeekDays[lastWeekDays.length - 1],
              },
            ],
          ],
        },
      },
    },
    month: {
      xAxis: {
        name: "Date",
        data: lastMonthDays,
      },
      yAxis: {
        name: "Sales",
      },
      pieces: [
        {
          gt: -0.1,
          lte: 15,
          color: "#59C4E6",
        },
        {
          gt: 15,
          color: "#516B91",
        },
      ],
      series: {
        name: "Sales",
        data: salesLastMonthData(totalSales),
        markArea: {
          data: [
            [
              {
                name: "Actual Sales",
                xAxis: lastMonthDays[0], // Assuming today is the midpoint of the month
                itemStyle: {
                  color: "#A5E7F0",
                  opacity: 0.3,
                },
              },
              {
                xAxis: lastMonthDays[15],
              },
            ],
            [
              {
                name: "Projected Sales",
                xAxis: lastMonthDays[15],
                itemStyle: {
                  color: "#516B91",
                  opacity: 0,
                },
              },
              {
                xAxis: lastMonthDays[lastMonthDays.length - 1],
              },
            ],
          ],
        },
      },
    },
  };
};

// Helper function to generate mock order data based on sales data
const generateOrderDataFromSales = (salesData) => {
  return salesData.map((sale) => {
    // Calculate the base order value (assuming each order averages $10)
    const baseOrderValue = sale / 15;

    // Apply a random fluctuation of ±15%
    const fluctuation = baseOrderValue * 0.35 * (Math.random() * 2 - 1);

    // Return the fluctuated order value
    return Math.round(baseOrderValue + fluctuation);
  });
};

// Assuming salesYesterdayData, salesLastWeekData, and salesLastMonthData are already defined
const ordersYesterdayData = (totalSales) => {
  return generateOrderDataFromSales(salesYesterdayData(totalSales));
};
const ordersLastWeekData = (totalSales) => {
  return generateOrderDataFromSales(salesLastWeekData(totalSales));
};
const ordersLastMonthData = (totalSales) => {
  return generateOrderDataFromSales(salesLastMonthData(totalSales));
};

export const orderTrendsPredicted = (totalSales = 800000) => {
  return {
    yesterday: {
      xAxis: {
        name: "Hour",
        data: yesterdayHours,
      },
      yAxis: {},
      pieces: [
        {
          gt: -0.1,
          lte: 12,
          color: "#59C4E6",
        },
        {
          gt: 12,
          color: "#516B91",
        },
      ],
      series: {
        name: "Orders",
        data: ordersYesterdayData(totalSales),
        markArea: {
          data: [
            [
              {
                name: "Actual Orders",
                xAxis: "0:00",
                itemStyle: {
                  color: "#A5E7F0",
                  opacity: 0.3,
                },
              },
              {
                xAxis: "12:00",
              },
            ],
            [
              {
                name: "Projected Orders",
                xAxis: "12:00",
                itemStyle: {
                  color: "#516B91",
                  opacity: 0,
                },
              },
              {
                xAxis: "23:00",
              },
            ],
          ],
        },
      },
    },
    week: {
      xAxis: {
        name: "Day",
        data: lastWeekDays,
      },
      yAxis: {
        name: "Orders",
      },
      pieces: [
        {
          gt: -0.1,
          lte: 3,
          color: "#59C4E6",
        },
        {
          gt: 3,
          color: "#516B91",
        },
      ],
      series: {
        name: "Orders",
        data: ordersLastWeekData(totalSales),
        markArea: {
          data: [
            [
              {
                name: "Actual Orders",
                xAxis: lastWeekDays[0],
                itemStyle: {
                  color: "#A5E7F0",
                  opacity: 0.3,
                },
              },
              {
                xAxis: lastWeekDays[3],
              },
            ],
            [
              {
                name: "Projected Orders",
                xAxis: lastWeekDays[3],
                itemStyle: {
                  color: "#516B91",
                  opacity: 0,
                },
              },
              {
                xAxis: lastWeekDays[lastWeekDays.length - 1],
              },
            ],
          ],
        },
      },
    },
    month: {
      xAxis: {
        name: "Date",
        data: lastMonthDays,
      },
      yAxis: {
        name: "Orders",
      },
      pieces: [
        {
          gt: -0.1,
          lte: 15,
          color: "#59C4E6",
        },
        {
          gt: 15,
          color: "#516B91",
        },
      ],
      series: {
        name: "Orders",
        data: ordersLastMonthData(totalSales),
        markArea: {
          data: [
            [
              {
                name: "Actual Orders",
                xAxis: lastMonthDays[0], // Assuming today is the midpoint of the month
                itemStyle: {
                  color: "#A5E7F0",
                  opacity: 0.3,
                },
              },
              {
                xAxis: lastMonthDays[15],
              },
            ],
            [
              {
                name: "Projected Orders",
                xAxis: lastMonthDays[15],
                itemStyle: {
                  color: "#516B91",
                  opacity: 0,
                },
              },
              {
                xAxis: lastMonthDays[lastMonthDays.length - 1],
              },
            ],
          ],
        },
      },
    },
  };
};

export const viewerSource = (genderRandom = 1) => {
  return {
    data: [
      {
        value: (3325 * genderRandom * (1 + Math.random() * 0.6)).toFixed(0),
        name: "Male",
      },
      {
        value: (4017 * genderRandom * (1 + Math.random() * 0.6)).toFixed(0),
        name: "Female",
      },
      {
        value: (207 * genderRandom * (1 + Math.random() * 0.6)).toFixed(0),
        name: "Other",
      },
    ],
  };
};

export const buyerProfile = (locationRandom = 1) => {
  const canadaNum = (55 * (1 + Math.random() * 0.3)).toFixed(2);
  const usaNum = (25 * (1 - Math.random() * 0.3)).toFixed(2);
  const otherNum = Math.max(0, (100 - canadaNum - usaNum).toFixed(2));

  return {
    xAxis: {
      name: "Location",
      data: ["Canada", "USA", "Others"],
    },
    series: {
      data: [canadaNum, usaNum, otherNum],
    },
  };
};
