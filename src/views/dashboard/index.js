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
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Express Entry Dashboard - CRS, Pool & Invitation Trends</title>
        <meta
          name="description"
          content="Visualize trends in CRS scores, Express Entry pool breakdowns, and invitations issued through Canada's immigration draws. Stay informed with interactive data visualizations."
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "WebPage",
              "name": "Express Entry Dashboard",
              "description": "An interactive visualization dashboard for analyzing CRS score distribution, Express Entry pool composition, and draw invitation trends. Powered by MLify Inc.",
              "author": {
                "@type": "Organization",
                "name": "MLify Inc."
              }
            }
          `}
        </script>
      </Helmet>

      <nav className="d-flex justify-content-left align-items-left">
        <button
          className={`tab-button py-2 px-4 border rounded-top ${selectedTrendTab === "crsScore" ? "active" : ""}`}
          aria-selected={selectedTrendTab === "crsScore"}
          onClick={() => setSelectedTrendTab("crsScore")}>
          CRS Score Trend
        </button>
        <button
          className={`tab-button py-2 px-4 border rounded-top ${selectedTrendTab === "poolTrend" ? "active" : ""}`}
          aria-selected={selectedTrendTab === "poolTrend"}
          onClick={() => setSelectedTrendTab("poolTrend")}>
          Pool Composition Trend
        </button>
        <button
          className={`tab-button py-2 px-4 border rounded-top ${selectedTrendTab === "invitationsTrend" ? "active" : ""}`}
          aria-selected={selectedTrendTab === "invitationsTrend"}
          onClick={() => setSelectedTrendTab("invitationsTrend")}>
          Invitation History
        </button>
      </nav>

      <main>
        <SelectedTabView />
      </main>

      <footer>
        <p>
          Data Source:{" "}
          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html"
            target="_blank"
            rel="noopener noreferrer">
            Immigration, Refugees and Citizenship Canada (IRCC)
          </a>
        </p>
        <p>
          Disclaimer: This dashboard is a community-built tool that visualizes public Express Entry data from the
          Government of Canada. It is not affiliated with IRCC and does not guarantee the accuracy or completeness of
          the data.
        </p>
      </footer>
    </>
  );
};

export default Dashboard;
