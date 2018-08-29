import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import storeFunc from './store';
import { PersistGate } from 'redux-persist/integration/react';

const store = storeFunc().store;
const persistor = storeFunc().persistor;

ReactDOM.render(
	<Provider store={store}>
    <PersistGate persistor={persistor}>
		  <App />
    </PersistGate>
	</Provider>, document.getElementById('root'));






