import React, { useState } from "react";
import { Helmet } from "react-helmet";
import CRSScoreTrend from "../CRSTrend";
import PoolScoreTrend from "../PoolTrend";
import InvitationTrend from "../InvitationTrend";

export const Dashboard = () => {
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
        return null; // Render nothing if no case matches
    }
  };

  return (
    <>
      <Helmet>
        <title>Express Entry Dashboard - Visualize CRS Score Trends</title>
        <meta
          name="description"
          content="Interactive dashboard visualizing CRS score trends, pool trends, and invitation trends from Canada's Express Entry immigration system."
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "WebPage",
              "name": "Express Entry Dashboard",
              "description": "Explore detailed visualizations of trends in CRS scores, pool scores, and invitations from Canada's Express Entry system. This tool helps users understand patterns and changes over time.",
              "author": {
                "@type": "MLify",
                "name": "MLify Inc.",
              }
            }
          `}
        </script>
      </Helmet>
      <nav className="d-flex justify-content-center align-items-center">
        <button
          className={`tab-button py-2 px-4 border rounded-top ${selectedTrendTab === "crsScore" ? "active" : ""}`}
          aria-selected={selectedTrendTab === "crsScore"}
          onClick={() => setSelectedTrendTab("crsScore")}
        >
          CRS Score Trend
        </button>
        <button
          className={`tab-button py-2 px-4 border rounded-top ${selectedTrendTab === "poolTrend" ? "active" : ""}`}
          aria-selected={selectedTrendTab === "poolTrend"}
          onClick={() => setSelectedTrendTab("poolTrend")}
        >
          Pool Trend
        </button>
        <button
          className={`tab-button py-2 px-4 border rounded-top ${selectedTrendTab === "invitationsTrend" ? "active" : ""}`}
          aria-selected={selectedTrendTab === "invitationsTrend"}
          onClick={() => setSelectedTrendTab("invitationsTrend")}
        >
          Invitations Trend
        </button>
      </nav>
      <main>
        <SelectedTabView />
      </main>
      <footer>
        <p>
          Source:{" "}
          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Canada.ca
          </a>
        </p>
        <p>
          Disclaimer: Express Entry Visualizer offers insights into CRS scores
          and invitations from Canada's Express Entry draws. This unofficial
          tool charts CRS score trends and draw volumes over time, using data
          from the Canadian government's official site.
        </p>
      </footer>
    </>
  );
};

export default Dashboard;
