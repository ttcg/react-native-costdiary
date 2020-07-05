import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Body from './body'

export default function App() {
    return (
        <Provider store={store}>
            <Body />
        </Provider>
    );
}