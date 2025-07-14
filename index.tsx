import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from './i18n';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// We render the app only AFTER i18next has been initialized
i18n.init().then(() => {
    root.render(
        <React.StrictMode>
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </React.StrictMode>
    );
});
