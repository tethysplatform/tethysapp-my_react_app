import tethysAPIClient from "services/api/client";

function getSession() {
  return tethysAPIClient.get('/session/');
}

function getCSRF() {
  return tethysAPIClient.get('/csrf/')
    .then(response => {
      return response.headers['x-csrftoken'];
    });
}

function getUserData() {
  return tethysAPIClient.get('/whoami/');
}

function getAppData(tethys_app_url) {
  return tethysAPIClient.get(`/apps/${tethys_app_url}/`);
}

const tethysAPI = {
  getSession,
  getCSRF,
  getAppData,
  getUserData,
};

export default tethysAPI;