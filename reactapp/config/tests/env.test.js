// const TETHYS_PORTAL_HOST = process.env.TETHYS_PORTAL_HOST;
describe('test.env', () => {
  it('TETHYS_DEBUG_MODE is defined', () => {
    expect(process.env.TETHYS_DEBUG_MODE).toBeDefined();
    expect(process.env.TETHYS_DEBUG_MODE).toBe('true');
  });

  it('TETHYS_APP_ID is defined', () => {
    expect(process.env.TETHYS_APP_ID).toBeDefined();
    expect(process.env.TETHYS_APP_ID).toBe('my-react-app');
  });

  it('TETHYS_APP_PACKAGE is defined', () => {
    expect(process.env.TETHYS_APP_PACKAGE).toBeDefined();
    expect(process.env.TETHYS_APP_PACKAGE).toBe('my_react_app');
  });

  it('TETHYS_APP_ROOT_URL is defined', () => {
    expect(process.env.TETHYS_APP_ROOT_URL).toBeDefined();
    expect(process.env.TETHYS_APP_ROOT_URL).toBe('/apps/my-react-app/');
  });

  it('TETHYS_LOADER_DELAY is defined', () => {
    expect(process.env.TETHYS_LOADER_DELAY).toBeDefined();
    expect(process.env.TETHYS_LOADER_DELAY).toBe('500');
  });

  it('TETHYS_PORTAL_HOST is defined', () => {
    expect(process.env.TETHYS_PORTAL_HOST).toBeDefined();
    expect(process.env.TETHYS_PORTAL_HOST).toBe('http://api.test');
  });
});