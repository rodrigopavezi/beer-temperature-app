import * as React from 'react';
import { render } from 'react-dom';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
    const appElement = document.getElementById('app');
    render(<App />, appElement);
});
