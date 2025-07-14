import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'https://esm.sh/react-i18next@^15.0.0';
import App from './App';
import i18n from './i18n'; // Import the configured i18n instance

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </React.Suspense>
  </React.StrictMode>
);
