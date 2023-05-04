import React from 'react';
import { render } from "react-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from "@stripe/react-stripe-js";

import './index.css';
import App from './App';
import {store,persistor} from './redux/store';
import { stripePromise } from '../src/stripe/stripe.utils';

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <PersistGate persistor={persistor}>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </PersistGate>
      </Router>
    </React.StrictMode>
  </Provider>,
  rootElement
);
