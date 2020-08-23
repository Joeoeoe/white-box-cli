import * as React from 'react';
import TsCom from '../TsCom'; // 测试ts引用路径检索

const PureTsCom: React.FC<any> = function () {
  return (
    <div>
      <h1>Ts引用及路径检索测试</h1>
      <TsCom compiler='TypseScript' framework='React' />
    </div>
  );
};

export default PureTsCom;
