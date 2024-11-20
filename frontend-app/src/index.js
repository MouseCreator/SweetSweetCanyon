import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {PopupProvider} from "./components/common/popup/PopupContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <PopupProvider>
          <App />
      </PopupProvider>
  </React.StrictMode>
);


reportWebVitals();
