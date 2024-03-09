import { readJSON, writeJSON, removeFile } from 'https://deno.land/x/flat@0.0.11/mod.ts'
const BATCH_SIZE = 8;
console.log("BATCH_SIZE:: ", BATCH_SIZE);

const inputFile = Deno.args[0]
// const inputFile = path.join(__dirname, "public/data/ee_rounds_123_en.json");
console.log("inputFile:: ", inputFile);

// Read and parse the JSON file
// const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));
const data = await readJSON(inputFile);

// Assuming data is an object with a 'rounds' array
const rounds = data.rounds; // Adjust this line based on the actual structure

const processData = (rounds) => {
  return rounds.reduce((acc, round) => {
    const { drawName, drawDate, drawCRS } = round;
    let extractedDrawName = drawName.match(/(.*)(?=\s\()/);
    extractedDrawName = extractedDrawName ? extractedDrawName[0] : drawName;
    if (!acc[extractedDrawName]) {
      acc[extractedDrawName] = {
        x: [],
        y: [],
        type: "scatter",
        mode: "lines+markers",
        name: extractedDrawName,
      };
    }
    acc[extractedDrawName].x.push(drawDate);
    acc[extractedDrawName].y.push(parseInt(drawCRS.replace(/,/g, ""), 10));
    return acc;
  }, {});
};

const accumulatedData = {}; // Use an object to accumulate data, keyed by `extractedDrawName`
// Split rounds into batches
for (let i = 0; i < rounds.length; i += BATCH_SIZE) {
  const batch = rounds.slice(i, i + BATCH_SIZE);
  if (batch && batch.length) {
    // Check if batch is not null and has length
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
  const sortedIndices = data.x
    .map((_, i) => i)
    .sort((a, b) => new Date(data.x[a]) - new Date(data.x[b]));
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
const outputFilePrefix = "public/data/processed_data_crs_trend.json";
console.log("outputFilePrefix:: ", outputFilePrefix);
// fs.writeFileSync(`${outputFilePrefix}`, JSON.stringify(sortedData, null, 2));
await writeJSON(outputFilePrefix, JSON.stringify(sortedData, null, 2))

const poolTitle = [
  "601-1200",
  "501-600",
  "451-500",
  "491-500",
  "481-490",
  "471-480",
  "461-470",
  "451-460",
  "401-450",
  "441-450",
  "431-440",
  "421-430",
  "411-420",
  "401-410",
  "351-400",
  "301-350",
  "0-300",
];
const processPoolData = (rounds) => {
  return rounds.reduce((acc, round) => {
    const { drawDate } = round;
    // skip if all the pools are 0
    let count = 0;
    for (let i = 1; i <= 17; i++) {
      const drawPool = round[`dd${i}`];
      if (drawPool === "0") {
        count += 1;
      }
    }
    if (count === 17) {
      // go to the next round if all the pools are 0
      return acc;
    }
    for (let i = 1; i <= 17; i++) {
      const drawPool = round[`dd${i}`].replace(/,/g, "");
      const poolName = `CRS Range: ` + poolTitle[i - 1];
      if (drawPool) {
        if (!acc[poolName]) {
          acc[poolName] = {
            x: [],
            y: [],
            type: "scatter",
            mode: "lines+markers",
            name: poolName,
          };
        }
        acc[poolName].x.push(drawDate);
        acc[poolName].y.push(parseInt(drawPool, 10));
      }
    }
    return acc;
  }, {});
};

const accumulatedPoolData = {}; // Use an object to accumulate data, keyed by `poolName`

// Pool Trend
for (let i = 0; i < rounds.length; i += BATCH_SIZE) {
  const batch = rounds.slice(i, i + BATCH_SIZE);
  if (batch && batch.length) {
    // Check if batch is not null and has length
    const newData = processPoolData(batch);
    // Merge newData into accumulatedPoolData
    Object.keys(newData).forEach((key) => {
      if (accumulatedPoolData[key]) {
        // If the key already exists, concatenate the new data
        accumulatedPoolData[key].x = accumulatedPoolData[key].x.concat(
          newData[key].x,
        );
        accumulatedPoolData[key].y = accumulatedPoolData[key].y.concat(
          newData[key].y,
        );
      } else {
        // Otherwise, simply add the new key and its data
        accumulatedPoolData[key] = newData[key];
      }
    });
  }
}

// sort the accumulatedPoolData by draw date in ascending order
Object.keys(accumulatedPoolData).forEach((key) => {
  const data = accumulatedPoolData[key];
  const sortedIndices = data.x
    .map((_, i) => i)
    .sort((a, b) => new Date(data.x[a]) - new Date(data.x[b]));
  data.x = sortedIndices.map((i) => data.x[i]);
  data.y = sortedIndices.map((i) => data.y[i]);
});

// sort by key name in ascending order
const sortedPoolKeys = Object.keys(accumulatedPoolData).sort();
const sortedPoolData = {};
sortedPoolKeys.forEach((key) => {
  sortedPoolData[key] = accumulatedPoolData[key];
});
// save the sortedPoolData as a json file
const outputFilePoolPrefix = "public/data/processed_data_pool_trend.json";
console.log("outputFilePoolPrefix:: ", outputFilePoolPrefix);
// fs.writeFileSync(
//   `${outputFilePoolPrefix}`,
//   JSON.stringify(sortedPoolData, null, 2),
// );
await writeJSON(outputFilePoolPrefix, JSON.stringify(sortedPoolData, null, 2))

// total drawSize in each year

const drawInvitationsTotalPerYear = {};
const totalCandidatesOverTheYears = {};

data.rounds.forEach((round) => {
  let drawDate = round.drawDate;
  // get year and month
  drawDate = drawDate.split("-").slice(0, 2).join("-");

  const drawInvitations = round.drawSize.replace(/,/g, ""); // Remove commas
  if (!drawInvitationsTotalPerYear[drawDate]) {
    drawInvitationsTotalPerYear[drawDate] = 0;
  }
  const drawPool = round[`dd18`].replace(/,/g, "");
  if (!totalCandidatesOverTheYears[drawDate]) {
    totalCandidatesOverTheYears[drawDate] = [];
  }
  totalCandidatesOverTheYears[drawDate].push(parseInt(drawPool, 10));
  drawInvitationsTotalPerYear[drawDate] += parseInt(drawInvitations, 10);
});

// mean of the totalCandidatesOverTheYears
const meanTotalCandidatesOverTheYears = {};
Object.keys(totalCandidatesOverTheYears).forEach((key) => {
  const totalCandidates = totalCandidatesOverTheYears[key];
  const mean =
    totalCandidates.reduce((a, b) => a + b, 0) / totalCandidates.length;
  meanTotalCandidatesOverTheYears[key] = mean;
});

// To see the result
console.log(drawInvitationsTotalPerYear);
console.log(meanTotalCandidatesOverTheYears);

console.log("Draw Invitations:: ", drawInvitationsTotalPerYear);
console.log("Total Candidates:: ", meanTotalCandidatesOverTheYears);

// sort by key name in ascending order of date of the key
const sortedDrawInvitationsTotalPerYear = {};
Object.keys(drawInvitationsTotalPerYear)
  .sort()
  .forEach((key) => {
    sortedDrawInvitationsTotalPerYear[key] = drawInvitationsTotalPerYear[key];
  });

const sortedTotalCandidatesOverTheYears = {};
Object.keys(meanTotalCandidatesOverTheYears)
  .sort()
  .forEach((key) => {
    sortedTotalCandidatesOverTheYears[key] =
      meanTotalCandidatesOverTheYears[key];
  });

// remove the all the keys with 0 value from the meanTotalCandidatesOverTheYears
Object.keys(sortedTotalCandidatesOverTheYears).forEach((key) => {
  if (sortedTotalCandidatesOverTheYears[key] === 0) {
    delete sortedTotalCandidatesOverTheYears[key];
    delete sortedDrawInvitationsTotalPerYear[key];
  }
});

const finalInvitationTrendData = [
  {
    x: Object.keys(sortedDrawInvitationsTotalPerYear),
    y: Object.values(sortedDrawInvitationsTotalPerYear),
    type: "scatter",
    mode: "lines+markers",
    name: "Draw Invitations",
  },
  {
    x: Object.keys(sortedTotalCandidatesOverTheYears),
    y: Object.values(sortedTotalCandidatesOverTheYears),
    type: "scatter",
    mode: "lines+markers",
    name: "Total(Mean) Candidates",
  },
];

const drawSizeOutputFilePrefix = "public/data/processed_data_draw_size.json";
console.log("drawSizeOutputFilePrefix:: ", drawSizeOutputFilePrefix);

// fs.writeFileSync(
//   `${drawSizeOutputFilePrefix}`,
//   JSON.stringify(finalInvitationTrendData, null, 2),
// );
await writeJSON(drawSizeOutputFilePrefix, JSON.stringify(finalInvitationTrendData, null, 2));
