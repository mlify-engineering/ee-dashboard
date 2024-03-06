import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Row, Col, Card } from 'antd';
import Header from './header';
import { DATA_ENDPOINT_URL } from '../configs/AppConfig';

export const Views = () => {
  const [plotData, setPlotData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBatch = async (batchNumber) => {
      try {
        // Adjust the path as needed to include the batch number if necessary
        const response = await fetch(`${DATA_ENDPOINT_URL}${batchNumber}.json`);
        if (!response.ok) throw new Error('Batch not found or end of batches');
        const jsonData = await response.json();

        // Assume jsonData.rounds exists and contains the data for the current batch
        return jsonData;
      } catch (error) {
        console.error('Failed to fetch or process batch', batchNumber, error);
        return null; // Signify end of batches or error
      }
    };

    const processData = (rounds) => {
      return rounds.reduce((acc, round) => {
        const { drawName, drawDate, drawCRS } = round;
        let extractedDrawName = drawName.match(/(.*)(?=\s\()/);
        extractedDrawName = extractedDrawName ? extractedDrawName[0] : drawName;
        if (!acc[extractedDrawName]) {
          acc[extractedDrawName] = { x: [], y: [], type: 'scatter', mode: 'lines+markers', name: extractedDrawName };
        }
        acc[extractedDrawName].x.push(drawDate);
        acc[extractedDrawName].y.push(parseInt(drawCRS, 10));
        return acc;
      }, {});
    };

    const fetchData = async () => {
        setLoading(true);
        let batchNumber = 1;
        let continueFetching = true;
        let accumulatedData = {}; // Use an object to accumulate data, keyed by `extractedDrawName`
      
        while (continueFetching) {
          const rounds = await fetchBatch(batchNumber);
          if (rounds && rounds.length) { // Check if rounds is not null and has length
            const newData = processData(rounds);
            // Merge newData into accumulatedData
            Object.keys(newData).forEach((key) => {
              if (accumulatedData[key]) {
                // If the key already exists, concatenate the new data
                accumulatedData[key].x = accumulatedData[key].x.concat(newData[key].x);
                accumulatedData[key].y = accumulatedData[key].y.concat(newData[key].y);
              } else {
                // Otherwise, simply add the new key and its data
                accumulatedData[key] = newData[key];
              }
            });
            batchNumber++;
          } else {
            continueFetching = false;
          }
        }

        // sort the accumulatedData by draw date in ascending order
        Object.keys(accumulatedData).forEach((key) => {
          const data = accumulatedData[key];
          const sortedIndices = data.x.map((_, i) => i).sort((a, b) => new Date(data.x[a]) - new Date(data.x[b]));
          data.x = sortedIndices.map((i) => data.x[i]);
          data.y = sortedIndices.map((i) => data.y[i]);
        });

        // sort by key name in ascending order
        const sortedKeys = Object.keys(accumulatedData).sort();
        const sortedData = {};
        sortedKeys.forEach((key) => {
          sortedData[key] = accumulatedData[key];
        });
      
        // After all batches have been processed, convert accumulatedData to an array and update the state
        setPlotData(Object.values(sortedData));
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
