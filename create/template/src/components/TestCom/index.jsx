import React, { Component } from 'react';
import './index.css';
import testBigImg from '@source/img/test-big.jpg';
import testJson from '../../source/json/test.json';
import testSmallImg from '../../source/img/test-small.png';

import styles from './index.module.css';

console.log(testJson);
console.log(testBigImg);
console.log(testSmallImg);

class TestCom extends Component {
  render() {
    return (
      <div>
        <div>测试js引入</div>
        <h1>字体包引用、CSS autoprefixer自动添加前缀、CSS Module测试</h1>
        <p id='test-p' className={styles.test}>
          字体包、CSS autoprefixer、CSS Module
        </p>
        <h1>大图路径测试</h1>
        <img src={testBigImg} />
        <h1>小图base64编码测试</h1>
        <img src={testSmallImg} />
      </div>
    );
  }
}

export default TestCom;
