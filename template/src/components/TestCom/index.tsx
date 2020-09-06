import React, { Component, useState } from 'react';
import testBigImg from '../../source/img/test-big.jpg';
import testJson from '../../source/json/test.json';
import testSmallImg from '../../source/img/test-small.png';
import styles from './index.module.css';

const TestCom: React.FC<any> = function () {
  const [number, setNumber] = useState<number>(0);
  return (
    <div>
      <h1>CSS autoprefixer自动添加前缀、CSS Module测试</h1>
      <p className={styles.test}>
        CSS autoprefixer、CSS Module
      </p>
      <i>由于字体包较占用空间，所以此处未作字体包测试，开发者可有需要可尝试</i>
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
