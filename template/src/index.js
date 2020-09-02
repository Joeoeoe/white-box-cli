import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 可根据需要按需引入ES6的新特性（不是指语法，是指可用ES5模拟的部分对象或者API，比如Promise）
 * 具体可引入部分见官网
 * https://github.com/zloirock/core-js
 */
import 'core-js/stable';
/**
 * Standalone runtime for Regenerator-compiled generator and async functions.
 * https://www.npmjs.com/package/regenerator-runtime
 */
import 'regenerator-runtime/runtime';

import App from './App';

const app = document.getElementById('App');
app ? ReactDOM.render(<App />, app) : false;
