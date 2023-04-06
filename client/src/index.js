import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <GoogleOAuthProvider clientId="816374951896-0s218064kj1p1d842fnrvjhd0ml7ujqt.apps.googleusercontent.com">
  <GoogleOAuthProvider clientId="646682055452-tej6llk4fugsa8jmbntltv2fc2eccdqc.apps.googleusercontent.com">
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  </GoogleOAuthProvider>
);


