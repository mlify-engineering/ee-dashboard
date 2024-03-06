import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Row, Col, Card } from 'antd';
import Header from './header';
import JsonData from '../data/ee_rounds_123_en.json'; // Ensure this path is correct

export const Views = () => {
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    const newData = JsonData.rounds.reduce((acc, round) => {
      const { drawName, drawDate, drawCRS } = round;
      // remove ( 2024 - 01) type string from drawName
      let extractedDrawName = drawName.match(/(.*)(?=\s\()/);
        extractedDrawName = extractedDrawName ? extractedDrawName[0] : drawName;
      if (!acc[extractedDrawName]) {
        acc[extractedDrawName] = { x: [], y: [], type: 'scatter', mode: 'lines+markers', name: extractedDrawName };
      }
      acc[extractedDrawName].x.push(drawDate);
      acc[extractedDrawName].y.push(parseInt(drawCRS, 10));
      return acc;
    }, {});

    // sort the newData by key
    Object.keys(newData).sort().forEach((key) => {
      const value = newData[key];
      delete newData[key];
      newData[key] = value;
    });

    setPlotData(Object.values(newData));
  }, []);

  return (
    <>
    <Header />
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
