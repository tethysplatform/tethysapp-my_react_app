// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock `window.location` with Jest spies and extend expect
import "jest-location-mock";

// Make .env files accessible to tests
require('dotenv').config();

// Mock fetch()
require('jest-fetch-mock').enableMocks();
fetch.disableMocks();


