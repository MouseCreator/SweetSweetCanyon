import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {PopupProvider} from "./components/common/popup/PopupContext";
import {AUTH} from "./components/auth/auth.secret";
import {Auth0Provider} from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));

const domain = AUTH.REACT_APP_AUTH0_DOMAIN;
const clientId = AUTH.REACT_APP_AUTH0_CLIENT_ID;
const audience = AUTH.REACT_APP_AUTH0_AUDIENCE;

root.render(
  <React.StrictMode>
      <PopupProvider>
          <Auth0Provider
              domain={domain}
              clientId={clientId}
              authorizationParams={{
                  redirect_uri: 'http://localhost:3000/auth/redirect/register',
                  audience: audience,
                  scope: 'openid profile email',
              }}

          >
            <App />
          </Auth0Provider>
      </PopupProvider>
  </React.StrictMode>
);


reportWebVitals();
