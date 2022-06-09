import { rest } from 'msw';

const handlers = [
  rest.get('http://api.test/api/apps/my-react-app/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
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
      ctx.set('Content-Type', 'application/json'),
    )
  }),
  rest.get('http://api.test/api/session/', (req, res, ctx) => {
    return res(
      ctx.status(200), 
      ctx.json({'isAuthenticated': true}),
      ctx.set('Content-Type', 'application/json'),
      ctx.set('Set-Cookie', 'sessionid=3mp52f19lnnrl1eeyb4b7xlxm9f2id8d; HttpOnly; Path=/; SameSite=Lax')
    );
  }),
  rest.get('http://api.test/api/csrf/', (req, res, ctx) => {
    return res(
      ctx.status(200), 
      ctx.json({'detail': 'CSRF cookie set'}),
      ctx.set('Content-Type', 'application/json'),
      ctx.set('SET-COOKIE', 'csrftoken=SxICmOkFldX4o4YVaySdZq9sgn0eRd3Ih6uFtY8BgU5tMyZc7n90oJ4M2My5i7cy; expires=Wed, 07 Jun 2023 22:21:17 GMT; Max-Age=31449600; Path=/; SameSite=Lax')
    );
  }),
  rest.get('http://api.test/api/whoami/', (req, res, ctx) => {
    return res(
      ctx.status(200), 
      ctx.json({
        "username": "jsmith",
        "firstName": "John",
        "lastName": "Smith",
        "email": "jsmith@tethys.org",
        "isAuthenticated": true,
        "isStaff": true
      }),
      ctx.set('Content-Type', 'application/json'),
    );
  }),
];

export { handlers };