import React from "react";
import "./Home.scss";
import { useSelector } from "react-redux";
import { summaryNumItems, platformDetailItems } from "./Home.constants";
import SumNumCard from "./SumNumCard";
import VisitResultsCard from "./VisitResultsCard";
import PlatformCard from "./PlatformCard";

export default function Home() {
  const user = useSelector((state) => state.user);

  return (
    <div className="page">
      <div className="bg-black"></div>
      <div className="bg-gradient"></div>
      <div className="main-content">
        <h2 className="general-title">Dashboard</h2>
        <h1 className="welcome-title">Welcome, {user?.Username}</h1>

        <section className="section summary-section">
          <div className="summary-left-container">
            {summaryNumItems.slice(0, 5).map((sumNumItem) => (
              <div className="card summary-card-small">
                <SumNumCard sumNumItem={sumNumItem} />
              </div>
            ))}
          </div>
          <div className="summary-right-container">
            {summaryNumItems.slice(5).map((sumNumItem) => (
              <div className="card summary-card-small">
                <SumNumCard sumNumItem={sumNumItem} />
              </div>
            ))}
            <div className="card summary-card-large">
              <VisitResultsCard />
            </div>
          </div>
        </section>

        <section className="section platform-section">
          <div className="card platform-card">
            <PlatformCard />
          </div>
        </section>

        {/* <section className="section detail-section">
          <div className="detail-left-container">
            <div className="card detail-card-small"></div>
            <div className="card detail-card-small"></div>
            <div className="card detail-card-large"></div>
          </div>
          <div className="detail-right-container">
            <div className="card detail-card-middle"></div>
            <div className="card detail-card-large"></div>
          </div>
        </section> */}
      </div>
    </div>
  );
}
