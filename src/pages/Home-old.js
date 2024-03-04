import React from "react";
import {
  trendsPredicted,
  viewerSource,
  buyerProfile,
  overviewLarge,
  overviewSmall,
  productList,
  mostViews,
} from "../mockData/mockData";
import "./Home.css";
import LineChartPredicted from "../ui-components/Charts/LineChartPredicted";
import PieChart from "../ui-components/Charts/PieChart";
import BarChart from "../ui-components/Charts/BarChart";
import Counter from "../ui-components/Counter";
import axios from "axios";

export default function Home() {
  const postTest = async () => {
    const url =
      "https://4k4wmvwke7.execute-api.us-east-2.amazonaws.com/Prod/hello/";

    const payload = {
      operation: "create",
      payload: {
        Item: {
          id: "5678EFGH",
          number: 782,
        },
      },
    };

    try {
      const response = await axios.post(url);
      console.log("Post request successful:", response.data);
      // Handle the response data or update your component's state as needed.
    } catch (error) {
      console.error("Error making the POST request:", error);
      // Handle errors here, e.g., display an error message to the user.
    }
  };

  return (
    <div className="page">
      <div className="bg-black"></div>
      <div className="bg-gradient"></div>
      <div className="main-content">
        <h2 className="general-title">Dashboard</h2>
        <h1 className="welcome-title">Welcome, Hegen!</h1>
        <div className="main-section">
          <div className="first-grid">
            <div className="card square-card">
              <h2>Revenue Trend</h2>
              <LineChartPredicted data={trendsPredicted} />
            </div>
            <div className="card square-card">
              <h2>Viewer Source</h2>
              <PieChart data={viewerSource} />
            </div>
            <div className="card square-card">
              <h2>Buyer Profile</h2>
              <BarChart data={buyerProfile} />
            </div>
          </div>
          <div className="second-grid">
            <div className="card large-card">
              <h2>Overview</h2>
              <img
                onClick={postTest}
                className="overview-avatar"
                src="/images/hegan_logo.svg"
              />
              <div className="overview-large-nums-container">
                <ul>
                  {overviewLarge.map((largeItem) => (
                    <li>
                      <Counter to={largeItem.num} />
                      {largeItem.title}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="overview-small-nums-container">
                {overviewSmall.map((smallItem) => (
                  <li>
                    <p className="small-nums-title">{smallItem.title}</p>
                    <p className="small-nums-data">{smallItem.data}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card large-card">
              <h2>Product List</h2>
              <input className="product-list-search-bar" />
              <ul className="product-list-container">
                <li>
                  <div>Product Name</div>
                  <div>CTR</div>
                  <div>Revenue</div>
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
                      <p>{listItem.revenue}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="see-all-container">
                <p>See All</p>
              </div>
            </div>
          </div>
          <div className="third-grid">
            <div className="card whole-card">
              <h2>Most views contents</h2>
              <ul className="most-views-container">
                {mostViews.map((viewItem) => (
                  <li>
                    <img src={viewItem.imgSrc} />
                    <div className="view-item-text-area">
                      <p>{viewItem.title}</p>
                      <p>{`${viewItem.views} Views`}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="see-all-container">
                <p>See All</p>
              </div>
              <h2 id="channel-title">Go to your channel</h2>
              <div className="channel-icon-container">
                <img src="/images/FB_Square_50x50.png" />
                <img src="/images/IG_Square_50x50.png" />
                <img src="/images/TT_Square_50x50.png" />
                <img src="/images/YT_Square_50x50.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
