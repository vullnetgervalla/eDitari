import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
				<I18nextProvider i18n={i18n}>
                <Routes>
                    <Route path="*" element={<App />} />
                </Routes>
				</I18nextProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
