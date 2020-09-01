"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./index.css");
const test_big_jpg_1 = __importDefault(require("../../source/img/test-big.jpg"));
const test_json_1 = __importDefault(require("../../source/json/test.json"));
const test_small_png_1 = __importDefault(require("../../source/img/test-small.png"));
const index_module_css_1 = __importDefault(require("./index.module.css"));
const TestCom = function () {
    const [number, setNumber] = react_1.useState(0);
    return (<div>
      <h1>字体包引用、CSS autoprefixer自动添加前缀、CSS Module测试</h1>
      <p id='test-p' className={index_module_css_1.default.test}>
        字体包、CSS autoprefixer、CSS Module
      </p>
      <hr />

      <h1>大图路径测试</h1>
      <img src={test_big_jpg_1.default}/>
      <hr />

      <h1>小图base64编码测试</h1>
      <img src={test_small_png_1.default}/>
      <hr />

      <h1>热重载（HMR）测试</h1>
      <button onClick={() => {
        setNumber(number + 1);
    }}>
        click me
      </button>
      <span>{number}</span>
      <hr />

      <h1>JSON文件引入测试</h1>
      <p>{JSON.stringify(test_json_1.default)}</p>
    </div>);
};
exports.default = TestCom;
