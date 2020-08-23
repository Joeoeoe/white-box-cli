import React from 'react';
import styles from './index.module.less';

console.log(styles);
interface HelloProps {
  compiler: string;
  framework: string;
}

const TsCom: React.FC<HelloProps> = function (props) {
  const a = 1;
  const b: number = a;
  console.log(a, b);
  return (
    <div>
      <h1>TS测试</h1>
      <p className={styles['test']}>
        Hello from {props.compiler} and {props.framework}!
      </p>
    </div>
  );
};

export default TsCom;
