# toy-react

学习 react, 跟着教程写一个 react 框架.

### 第一课 jsx

webpack 简易配置
- 依赖 webpack webpack-cli 直接运行 npx webpack
- 修改 optimization 对应 minimize 属性便于开发环境调试

简易 jsx
- 使用 '@babel/plugin-transform-react-jsx' 对 jsx 语法进行转译
- 根据生成的代码和报错信息补写对应函数，比如 createElement 函数
- 函数内部采用直接操作 dom 的方法