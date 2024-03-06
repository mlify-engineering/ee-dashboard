/* eslint-env node */
export const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? `${process.env.REACT_APP_API_ENDPOINT_URL}/v1`
    : `${process.env.REACT_APP_TEST_API_ENDPOINT_URL}/v1`;
