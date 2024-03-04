import React, { useState, useEffect } from "react";
import "./PlatformCard.scss";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LineChartPredicted from "../../ui-components/Charts/LineChartPredicted";
import BarChart from "../../ui-components/Charts/BarChart";
import PieChart from "../../ui-components/Charts/PieChart";
import { productList, videoList } from "../../mockData/mockData";

import {
  orderTrendsPredicted,
  salesTrendsPredicted,
  buyerProfile,
  viewerSource,
} from "../../mockData/mockDataPlatform";

export default function PlatformCard({ platformDetailItems }) {
  const initialTotalSales = 800000;
  const initialPeriod = "yesterday";

  const [platform, setPlatform] = useState("yt");
  const [source, setSource] = useState("video");
  const [period, setPeriod] = useState(initialPeriod);
  const [borderColors, setBorderColors] = useState({
    yt: "#FF0000",
    fb: "#bebebe",
    ig: "#bebebe",
    tt: "#bebebe",
  });
  const [genderRandom, setGenderRandom] = useState(1);
  const [salesData, setSalesData] = useState(
    salesTrendsPredicted(initialTotalSales)[initialPeriod]
  );
  const [orderData, setOrderData] = useState(
    orderTrendsPredicted(initialTotalSales)[initialPeriod]
  );
  const [locationData, setLocationData] = useState(buyerProfile(1));
  const [genderData, setGenderData] = useState(viewerSource(1));

  const highlightColor = (key, color) => {
    setPlatform(key);
    setBorderColors({
      yt: "#bebebe",
      fb: "#bebebe",
      ig: "#bebebe",
      tt: "#bebebe",
      [key]: color,
    });
  };

  const periodHandleChange = (event) => {
    setPeriod(event.target.value);
  };

  const sourceHandleChange = (event) => {
    setSource(event.target.value);
  };

  useEffect(() => {
    const totalSales =
      initialTotalSales + Math.random() * 100000 - Math.random() * 100000;
    const locationRandom = 1 + Math.random() * 0.01;
    const genderRandom = 1 + Math.random() * 0.01;
    setSalesData(salesTrendsPredicted(totalSales)[period]);
    setOrderData(orderTrendsPredicted(totalSales)[period]);
    setLocationData(buyerProfile(locationRandom));
    setGenderData(viewerSource(genderRandom));
  }, [platform, period, source]);

  return (
    <>
      <div className="platform-nav-container">
        <h2
          style={{ borderBottom: `solid 4px ${borderColors["yt"]}` }}
          onClick={() => highlightColor("yt", "#FF0000")}
        >
          Youtube
        </h2>
        <h2
          style={{ borderBottom: `solid 4px ${borderColors["fb"]}` }}
          onClick={() => highlightColor("fb", "#2F80ED")}
        >
          Facebook
        </h2>
        <h2
          style={{ borderBottom: `solid 4px ${borderColors["ig"]}` }}
          onClick={() => highlightColor("ig", "#FF00B8")}
        >
          Instagram
        </h2>
        <h2
          style={{ borderBottom: `solid 4px ${borderColors["tt"]}` }}
          onClick={() => highlightColor("tt", "#000000")}
        >
          TikTok
        </h2>
      </div>

      <div className="platform-selectors-container">
        <div>
          <span>Time Period</span>
          <Select
            value={period}
            onChange={periodHandleChange}
            className="platform-period-select"
          >
            <MenuItem value="yesterday">Yesterday</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="month">Month</MenuItem>
          </Select>
        </div>
        <div className="source-select-container">
          <span>Source</span>
          <Select
            value={source}
            onChange={sourceHandleChange}
            className="platform-period-select"
          >
            <MenuItem value="video">Video Organic</MenuItem>
            <MenuItem value="ad">Advertising</MenuItem>
            <MenuItem value="live">Live Stream</MenuItem>
          </Select>
        </div>
      </div>
      <div className="platform-detail-cards-container">
        <div className="platform-detail-card">
          <span>Sales Amount & Trend</span>
          <LineChartPredicted data={salesData} unit="$" />
        </div>
        <div className="platform-detail-card">
          <span>Order Amount & Trend</span>
          <LineChartPredicted data={orderData} />
        </div>
        <div className="platform-detail-card">
          <span>Location</span>
          <BarChart data={locationData} />
        </div>
        <div className="platform-detail-card">
          <span>Gender</span>
          <PieChart data={genderData} />
        </div>
        <div className="platform-detail-card">
          <span>Ranking by video views</span>
          <ul className="video-list-container">
            <li>
              <div>Video Name</div>
              <div>Views</div>
              <div>Sales</div>
              <div></div>
            </li>
            {videoList.map((videoItem) => (
              <li>
                <div>
                  <div>
                    <img src={videoItem.imgSrc} />
                  </div>
                  <p>{videoItem.videoName}</p>
                </div>
                <div>
                  <p>{videoItem.views}</p>
                </div>
                <div>
                  <p>{videoItem.sales}</p>
                </div>
                <div>
                  <button>Open Link</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="platform-detail-card">
          <span>Ranking by sales</span>
          <ul className="product-list-container">
            <li>
              <div>Product Name</div>
              <div>CTR</div>
              <div>Views</div>
              <div>Sales</div>
            </li>
            {productList.map((listItem) => (
              <li>
                <div>
                  <div>
                    <img src={listItem.imgSrc} />
                  </div>
                  <p>{listItem.productName}</p>
                </div>
                <div>
                  <p>{listItem.ctr}</p>
                </div>
                <div>
                  <p>{listItem.views}</p>
                </div>
                <div>
                  <p>{listItem.sales}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
