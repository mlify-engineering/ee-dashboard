import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Row, Col, Card } from 'antd';
import Header from './header';
import { DATA_ENDPOINT_URL } from '../configs/AppConfig';

export const Views = () => {
  const [plotData, setPlotData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(DATA_ENDPOINT_URL);
        const data = await response.json();
        setPlotData(Object.values(data));
        setLoading(false);
      };
      

    fetchData();
  }, []);

  return (
    <>
      <Header />
      {loading ? <p>Loading...</p> : (
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
                  style={{ width: '100%', height: '100%' }} />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    <div>
        <p>Source: <a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html">Canada.ca</a></p>
        <p>Express Entry Visualizer, developed by <a href="https:mlify.ca">MLify Inc.</a>, offers insights into CRS scores and invitations from Canada&apos;s Express Entry draws. This unofficial tool charts CRS score trends and draw volumes over time, using data from the Canadian government&apos;s official site. </p>
    </div>
      <div>
        <p>
          Copyright © {new Date().getFullYear()} | <a href="https://mlify.ca">MLify Inc.</a>
        </p>
      </div>
    </>
  );
};

export default Views;
