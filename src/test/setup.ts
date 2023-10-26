import { VirtualConsole } from 'jsdom';

import '@testing-library/jest-dom';

declare global {
  interface Window {
    _virtualConsole: VirtualConsole;
  }
}
