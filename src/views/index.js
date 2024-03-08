import React, { useState } from "react";
import Header from "./header";
import CRSScoreTrend from "./CRSTrend";
import PoolScoreTrend from "./PoolTrend";
import InvitationTrend from "./InvitationTrend";

export const Views = () => {
  const [selectedTrendTab, setSelectedTrendTab] = useState("crsScore");

  const SelectedTabView = () => {
    switch (selectedTrendTab) {
      case "crsScore":
        return <CRSScoreTrend />;
      case "poolTrend":
        return <PoolScoreTrend />;
      case "invitationsTrend":
        return <InvitationTrend />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center cursor-pointer font-size-base">
        <div
          className={`py-2 border rounded-top d-flex align-items-center justify-content-between`}
          onClick={() => setSelectedTrendTab("crsScore")}
          style={{
            backgroundColor: selectedTrendTab === true ? "white" : "#3E79F7",
            color: selectedTrendTab === true ? "black" : "white",
          }}
        >
          <span style={{ marginRight: "20px", marginLeft: "10px" }}>
            CRS Score Trend
          </span>
        </div>
        <div
          className={`py-2 px-4 border rounded-top d-flex align-items-center justify-content-between`}
          onClick={() => setSelectedTrendTab("poolTrend")}
          style={{
            backgroundColor: selectedTrendTab === true ? "white" : "#3E79F7",
            color: selectedTrendTab === true ? "black" : "white",
          }}
        >
          <span style={{ marginRight: "20px", marginLeft: "10px" }}>
            Pool Trend
          </span>
        </div>
        <div
          className={`py-2 px-4 border rounded-top d-flex align-items-center justify-content-between`}
          onClick={() => setSelectedTrendTab("invitationsTrend")}
          style={{
            backgroundColor: selectedTrendTab === true ? "white" : "#3E79F7",
            color: selectedTrendTab === true ? "black" : "white",
          }}
        >
          <span style={{ marginRight: "20px", marginLeft: "10px" }}>
            Invitations Trend
          </span>
        </div>
      </div>
      <SelectedTabView />
      <div>
        <p>
          Source:{" "}
          <a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html">
            Canada.ca
          </a>
        </p>
        <p>
          Express Entry Visualizer, developed by{" "}
          <a href="https:mlify.ca">MLify Inc.</a>, offers insights into CRS
          scores and invitations from Canada&apos;s Express Entry draws. This
          unofficial tool charts CRS score trends and draw volumes over time,
          using data from the Canadian government&apos;s official site.{" "}
        </p>
      </div>
      <div>
        <p>
          Copyright © {new Date().getFullYear()} |{" "}
          <a href="https://mlify.ca">MLify Inc.</a>
        </p>
      </div>
    </>
  );
};

export default Views;
