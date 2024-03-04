export const summaryNums = {
  salesAmount: 3107375,
  visits: 1272396,
  ctr: 85.86,
  conversion: 78.43,
  orderByCustomer: 4.19,
  oders: 207158,
  customers: 35231,
};

// Helper function to format date as "D/M"
const formatDate = (date) => {
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  return `${month}/${day}`;
};

// Helper function to get the date for a given number of days ago
const getDateDaysAgo = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date);
};

// Get today's date
const today = new Date();

// Generate the last 24 hours
export const yesterdayHours = Array.from(
  { length: 24 },
  (_, hour) => `${hour}:00`
);

// Generate the last 7 days
export const lastWeekDays = Array.from({ length: 7 }, (_, i) =>
  getDateDaysAgo(i)
).reverse();

// Generate the last 30 days
export const lastMonthDays = Array.from({ length: 30 }, (_, i) =>
  getDateDaysAgo(i)
).reverse();

const averageVisitsPerDay = summaryNums.visits / 365;

// Function to generate fluctuating visits data with a rising trend
const generateVisitsData = (average, length, trendFactor = 0.001) => {
  return Array.from({ length }, (_, index) => {
    const trend = (1 + trendFactor) ** index; // Gradual increase factor
    const fluctuation = (Math.random() * 2 - 1) * 0.15; // Random fluctuation between -15% and +15%
    return Math.round(average * trend + average * fluctuation);
  });
};

// Generate visits data with fluctuations
const visitsYesterday = generateVisitsData(averageVisitsPerDay / 24, 24); // Hourly data for yesterday
const visitsLastWeek = generateVisitsData(averageVisitsPerDay, 7); // Daily data for last week
const visitsLastMonth = generateVisitsData(averageVisitsPerDay, 30); // Daily data for last month

export const visitResults = {
  yesterday: {
    xAxis: {
      name: "Hour",
      data: yesterdayHours,
    },
    yAxis: {},
    series: {
      name: "Visits",
      data: visitsYesterday,
    },
  },
  week: {
    xAxis: {
      name: "Day",
      data: lastWeekDays,
    },
    yAxis: {
      name: "Visits",
    },
    series: {
      name: "Visits",
      data: visitsLastWeek,
    },
  },
  month: {
    xAxis: {
      name: "Date",
      data: lastMonthDays,
    },
    yAxis: {
      name: "Visits",
    },
    series: {
      name: "Visits",
      data: visitsLastMonth,
    },
  },
};

export const videoList = [
  {
    videoName: "How to Assemble Hegen's Kneading Ring",
    imgSrc: "/images/mockImages/Most_View_01.webp",
    views: "214k",
    sales: "7.65k",
  },
  {
    videoName: "How to Assemble Hegen PCTO™ Electric Breast Pump",
    imgSrc: "/images/mockImages/Most_View_02.webp",
    views: "129k",
    sales: "7.20k",
  },
  {
    videoName: "How to Assemble Hegen's Kneading Ring",
    imgSrc: "/images/mockImages/Most_View_03.webp",
    views: "107k",
    sales: "6.18k",
  },
  {
    videoName: "Happy family time with",
    imgSrc: "/images/mockImages/Most_View_04.webp",
    views: "95k",
    sales: "5.89k",
  },
  {
    videoName: "Spending time with newborn baby",
    imgSrc: "/images/mockImages/Most_View_05.webp",
    views: "86k",
    sales: "5.26k",
  },
];

export const productList = [
  {
    productName: "Hegen PCTO™ 150ml/5oz Feeding Bottles",
    imgSrc: "/images/mockImages/20160612_Hegen_043_700x.webp",
    ctr: "2.5%",
    views: "214k",
    sales: "7.65k",
  },
  {
    productName: "The Perfect Gift Set",
    imgSrc:
      "/images/mockImages/20191023_Hegen0437_370x230_2x_6064243e-d013-40a1-a57c-24aff3e87c37_370x230@2x.webp",
    ctr: "11.5%",
    views: "167k",
    sales: "7.23k",
  },
  {
    productName: "Hegen Soothing Teether",
    imgSrc: "/images/mockImages/20171106_Hegen1063_1000x.webp",
    ctr: "20%",
    views: "129k",
    sales: "7.20k",
  },
  {
    productName: "Breast Milk Storage Lid ...",
    imgSrc: "/images/mockImages/20160612_Hegen_040_900x.webp",
    ctr: "3.7%",
    views: "107k",
    sales: "6.18k",
  },
  {
    productName: "Breast Milk Storage Lid ...",
    imgSrc: "/images/mockImages/blue_lid_2_600x.webp",
    ctr: "8.2%",
    views: "95k",
    sales: "5.89k",
  },
];
