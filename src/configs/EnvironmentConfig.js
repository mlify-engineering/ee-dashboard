/* eslint-env node */
const dev = {
  DATA_CRS_ENDPOINT_URL: `${process.env.PUBLIC_URL}` + `${process.env.REACT_APP_DATA_CRS_ENDPOINT_URL}`,
  DATA_POOL_ENDPOINT_URL: `${process.env.PUBLIC_URL}` + `${process.env.REACT_APP_DATA_POOL_ENDPOINT_URL}`,
  DATA_INVITATION_ENDPOINT_URL: `${process.env.PUBLIC_URL}` + `${process.env.REACT_APP_DATA_INVITATION_ENDPOINT_URL}`,
};

const prod = {
  DATA_CRS_ENDPOINT_URL: `${process.env.PUBLIC_URL}` + `${process.env.REACT_APP_DATA_CRS_ENDPOINT_URL}`,
  DATA_POOL_ENDPOINT_URL: `${process.env.PUBLIC_URL}` + `${process.env.REACT_APP_DATA_POOL_ENDPOINT_URL}`,
  DATA_INVITATION_ENDPOINT_URL: `${process.env.PUBLIC_URL}` + `${process.env.REACT_APP_DATA_INVITATION_ENDPOINT_URL}`,
};

const test = {
  DATA_CRS_ENDPOINT_URL: `${process.env.PUBLIC_URL}` + `${process.env.REACT_APP_DATA_CRS_ENDPOINT_URL}`,
  DATA_POOL_ENDPOINT_URL: `${process.env.PUBLIC_URL}` + `${process.env.REACT_APP_DATA_POOL_ENDPOINT_URL}`,
  DATA_INVITATION_ENDPOINT_URL: `${process.env.PUBLIC_URL}` + `${process.env.REACT_APP_DATA_INVITATION_ENDPOINT_URL}`,
};

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return dev;
    case "production":
      return prod;
    case "test":
      return test;
    default:
      break;
  }
};
console.log("process.env.NODE_ENV:: ", process.env.NODE_ENV);
console.log("getEnv: ", getEnv());
console.log("DATA_CRS_ENDPOINT_URL: ", process.env.REACT_APP_DATA_CRS_ENDPOINT_URL);
console.log("DATA_POOL_ENDPOINT_URL: ", process.env.REACT_APP_DATA_POOL_ENDPOINT_URL);
console.log("DATA_INVITATION_ENDPOINT_URL: ", process.env.REACT_APP_DATA_INVITATION_ENDPOINT_URL);

export const env = getEnv();
