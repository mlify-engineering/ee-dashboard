const fs = require('fs');
const path = require('path');

const BATCH_SIZE = 8;
console.log('BATCH_SIZE:: ', BATCH_SIZE);

const inputFile = path.join(__dirname, 'public/data/ee_rounds_123_en.json');
console.log('inputFile:: ', inputFile);
const outputFilePrefix = path.join(__dirname, 'public/data/batch_');
console.log('outputFilePrefix:: ', outputFilePrefix);

// Read and parse the JSON file
const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

// Assuming data is an object with a 'rounds' array
const rounds = data.rounds; // Adjust this line based on the actual structure

const batches = [];

// Split rounds into batches
for (let i = 0; i < rounds.length; i += BATCH_SIZE) {
    const batch = rounds.slice(i, i + BATCH_SIZE);
    batches.push(batch);
}

// Save each batch to a new file
batches.forEach((batch, index) => {
    const fileName = `${outputFilePrefix}${index + 1}.json`;
    fs.writeFileSync(fileName, JSON.stringify(batch, null, 2));
});
