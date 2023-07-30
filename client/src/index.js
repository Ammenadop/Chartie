import React from 'react';
import * as ReactDomClient from 'react-dom/client';
import './index.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";  
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import App from './App';

const container= document.getElementById('root');

const root= ReactDomClient.createRoot(container);
root.render(<App/>)