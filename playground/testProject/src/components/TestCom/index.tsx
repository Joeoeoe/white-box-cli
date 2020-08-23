import React, { Component, useState } from 'react';
import './index.css';
import testBigImg from '../../source/img/test-big.jpg';
import testJson from '../../source/json/test.json';
import testSmallImg from '../../source/img/test-small.png';
import styles from './index.module.css';

const TestCom: React.FC<any> = function () {
  const [number, setNumber] = useState<number>(0);
  return (
    <div>
      <h1>字体包引用、CSS autoprefixer自动添加前缀、CSS Module测试</h1>
      <p id='test-p' className={styles.test}>
        字体包、CSS autoprefixer、CSS Module
      </p>
      <hr />

      <h1>大图路径测试</h1>
      <img src={testBigImg} />
      <hr />

      <h1>小图base64编码测试</h1>
      <img src={testSmallImg} />
      <hr />

      <h1>热重载（HMR）测试</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}>
        click me
      </button>
      <span>{number}</span>
      <hr />

      <h1>JSON文件引入测试</h1>
      <p>{JSON.stringify(testJson)}</p>
    </div>
  );
};

export default TestCom;
