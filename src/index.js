import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';

import 'core-js/es/promise';
import 'core-js/es/set';
import 'core-js/es/map';

const rootElement = document.getElementById('app');
ReactDOM.render(<App />, rootElement);