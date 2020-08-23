import { hot } from 'react-hot-loader/root'; // 热替换
import React from 'react';
import './App.css';
import TemplateCom from './components/TestCom';
import TsTestCom from './components/TsCom';
import PureTsCom from './components/PureTsCom';

function App() {
  const a = 1,
    b = 3;
  const arr = ['ABCDEFG'];
  return (
    <div>
      <TemplateCom />
      <TsTestCom compiler='TypeScript' framework='React' />
      <PureTsCom />
    </div>
  );
}

export default hot(App);
