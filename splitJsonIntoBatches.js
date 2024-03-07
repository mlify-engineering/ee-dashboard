const fs = require('fs');
const path = require('path');

const BATCH_SIZE = 8;
console.log('BATCH_SIZE:: ', BATCH_SIZE);

const inputFile = path.join(__dirname, 'public/data/ee_rounds_123_en.json');
console.log('inputFile:: ', inputFile);

// Read and parse the JSON file
const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

// Assuming data is an object with a 'rounds' array
const rounds = data.rounds; // Adjust this line based on the actual structure

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

let accumulatedData = {}; // Use an object to accumulate data, keyed by `extractedDrawName`
// Split rounds into batches
for (let i = 0; i < rounds.length; i += BATCH_SIZE) {
    const batch = rounds.slice(i, i + BATCH_SIZE);
    if (batch && batch.length) { // Check if batch is not null and has length
        const newData = processData(batch);
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
// save the sortedData as a json file
const outputFilePrefix = path.join(__dirname, 'public/data/processed_data.json');
console.log('outputFilePrefix:: ', outputFilePrefix);
fs.writeFileSync(`${outputFilePrefix}`, JSON.stringify(sortedData, null, 2));