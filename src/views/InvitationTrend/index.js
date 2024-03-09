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
  const layout = {
    autosize: true,
    legend: {
      yanchor: "bottom",
      xanchor: "right",
      margin: { l: 0, r: 0, t: 0, b: 0 },
    },
    // Include other layout properties here
    title: "Invited vs. Pool Candidates", // Updated title as per previous suggestion
    font: {
      weight: "bold",
      color: "#000000",
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(DATA_INVITATION_ENDPOINT_URL);
      const data = await response.json();
      setPlotData(data);
      setLoading(false);
    };

    fetchData();
  }, []);
  return !loading ? (
    <>
      <div className="show-mobile">
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <Card bordered={false}>
              <Plot
                data={plotData}
                layout={layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="hide-mobile">
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <Card bordered={false}>
              <Plot
                data={plotData}
                layout={layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  ) : (
    <Spin />
  );
};

export default InvitationTrend;
