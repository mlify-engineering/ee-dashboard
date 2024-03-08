import React from "react";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { Row, Col, Card, Spin } from "antd";
import { DATA_INVITATION_ENDPOINT_URL } from "../../configs/AppConfig";
import { useEffect, useState } from "react";

const Plot = createPlotlyComponent(Plotly);

const InvitationTrend = () => {
  const [loading, setLoading] = useState(false);
  const [plotData, setPlotData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(DATA_INVITATION_ENDPOINT_URL);
      const data = await response.json();
      const curPlotData = [
        {
          x: Object.keys(data),
          y: Object.values(data),
          type: "scatter",
          mode: "lines+markers",
        },
      ];
      setPlotData(curPlotData);
      setLoading(false);
    };

    fetchData();
  }, []);
  return !loading ? (
    <>
      <div className="show-mobile">
        <Row gutter={16} justify="center">
          <Card bordered={false}>
            <Plot
              data={plotData}
              layout={{
                autosize: true,
                title: "Number of People Invited Over Years",
              }}
              useResizeHandler={true}
              style={{ width: "100%", height: "100%" }}
            />
          </Card>
        </Row>
      </div>
      <div className="hide-mobile">
        <Row gutter={16} justify="center">
          <Card bordered={false}>
            <Plot
              data={plotData}
              layout={{
                autosize: true,
                title: "Number of People Invited Over Years",
              }}
              useResizeHandler={true}
              style={{ width: "100%", height: "100%" }}
            />
          </Card>
        </Row>
      </div>
    </>
  ) : (
    <Spin />
  );
};

export default InvitationTrend;
