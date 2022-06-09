import fetchMock from "jest-fetch-mock";

const mockTethysAPI = {
  validResponses: () => {
    fetchMock.mockIf(/^https?:\/\/localhost:8080.*$/, req => {
      if (req.url.indexOf("/api/apps/") !== -1) {
        return {
          status: 200,
          body: JSON.stringify({
            "title": "My React App",
            "description": "",
            "tags": "",
            "package": "my_react_app",
            "urlNamespace": "my_react_app",
            "color": "#c0392b",
            "icon": "/static/my_react_app/images/icon.png",
            "exitUrl": "/apps/",
            "rootUrl": "/apps/my-react-app/",
            "settingsUrl": "/admin/tethys_apps/tethysapp/71/change/"
          }),
          headers: {
            "Content-Type": "application/json"
          }
        };
      } else if (req.url.indexOf("/api/session/") !== -1) {
        return {
          status: 200,
          body: JSON.stringify({ "isAuthenticated": true }),
          headers: {
            "Content-Type": "application/json",
            "SET-COOKIE": "sessionid=3mp52f19lnnrl1eeyb4b7xlxm9f2id8d; HttpOnly; Path=/; SameSite=Lax"
          }
        }
      } else if (req.url.indexOf("/api/csrf/") !== -1) {
        return {
          status: 200,
          body: JSON.stringify({ "detail": "CSRF cookie set" }),
          headers: {
            "Content-Type": "application/json",
            "SET-COOKIE": "csrftoken=SxICmOkFldX4o4YVaySdZq9sgn0eRd3Ih6uFtY8BgU5tMyZc7n90oJ4M2My5i7cy; expires=Wed, 07 Jun 2023 22:21:17 GMT; Max-Age=31449600; Path=/; SameSite=Lax"
          }
        };
      } else if (req.url.indexOf("/api/whoami/") !== -1) {
        return {
          status: 200,
          body: JSON.stringify({
            "username": "jsmith",
            "firstName": "John",
            "lastName": "Smith",
            "email": "jsmith@tethys.org",
            "isAuthenticated": true,
            "isStaff": true
          }),
          headers: {
            "Content-Type": "application/json"
          }
        };
      } else {
        return {
          status: 404,
          body: "Not Found"
        };
      }
    });
  }
};

export default mockTethysAPI;