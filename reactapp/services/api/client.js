import axios from 'axios';

const TETHYS_HOST = process.env.TETHYS_HOST;

const tethysAPIClient = axios.create({
  baseURL: `${TETHYS_HOST}/api`,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

function handleSuccess(response) {
  return response.data ? response.data : response;
}

function handleError(error) {
  let res = error.response;
  if (res.status === 401) {
    // Redirect to Tethys Portal login
    window.location.assign(`${TETHYS_HOST}/accounts/login?next=${window.location.pathname}`);
  }
  return Promise.reject(error);
}

tethysAPIClient.interceptors.response.use(handleSuccess, handleError);

export default tethysAPIClient;