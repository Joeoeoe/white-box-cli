"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = require("react-hot-loader/root"); // 热替换
const react_1 = __importDefault(require("react"));
require("./App.css");
const TestCom_1 = __importDefault(require("./components/TestCom"));
function App() {
    const a = 1, b = 3;
    const arr = ['ABCDEFG'];
    return (<div>
      <TestCom_1.default />
    </div>);
}
exports.default = root_1.hot(App);
