import type { Preview } from '@storybook/react';
import '../src/assets/styles/abstracts/index.css';
import '../src/assets/styles/modals/index.css';
import '../src/assets/styles/base/index.css';
import '../src/layout/index';
import '../src/App';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
