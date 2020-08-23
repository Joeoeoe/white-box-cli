import { hot } from 'react-hot-loader/root'; // 热替换
import React from 'react';
import './App.css';
import TestCom from './components/TestCom';

function App() {
  const a = 1,
    b = 3;
  const arr = ['ABCDEFG'];
  return (
    <div>
      <TestCom />
    </div>
  );
}

export default hot(App);
