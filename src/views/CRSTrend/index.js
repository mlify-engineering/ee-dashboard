import React from "react";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import { Row, Col, Card, Spin } from "antd";
import { DATA_CRS_ENDPOINT_URL } from "../../configs/AppConfig";
import { useEffect, useState } from "react";

const Plot = createPlotlyComponent(Plotly);

const CRSScoreTrend = () => {
  const [loading, setLoading] = useState(false);
  const [plotData, setPlotData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(DATA_CRS_ENDPOINT_URL);
      const data = await response.json();
      setPlotData(Object.values(data));
      setLoading(false);
    };

    fetchData();
  }, []);
  return !loading ? (
    <>
      <div className="show-mobile">
        <Row gutter={[16, 16]}>
          {plotData.map((data, index) => (
            <Col key={index} span={24}>
              <Card bordered={false}>
                <Plot
                  data={[data]}
                  layout={{
                    autosize: true,
                    title: data.name,
                  }}
                  useResizeHandler={true}
                  style={{ width: "100%", height: "100%" }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className="hide-mobile">
        <Row gutter={[16, 16]}>
          {plotData.map((data, index) => (
            <Col key={index} span={8}>
              <Card bordered={false}>
                <Plot
                  data={[data]}
                  layout={{
                    autosize: true,
                    title: data.name,
                  }}
                  useResizeHandler={true}
                  style={{ width: "100%", height: "100%" }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  ) : (
    <Spin />
  );
};

export default CRSScoreTrend;
