## 构建工具作用
 1. 转化es6语法
 2. 转换jsx
 3. css前缀补全、预处理器
 4. 压缩混淆
 5. 图片压缩
 。。。
## 搭建webpack 命令
`mkdir my-product`
`cd my-product`
`npm init -y`  //-y 都选yes
`npm install webpack webpack-cli --save-dev` //安装webpack
### entry 指定打包入口
 单入口 entry是一个字符串 
 多入口 entry是一个对象
### output 指定打包输出 
 output 只有一个output 无论打包入口有几个
 
```
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',   //单入口filename可以写死一个文件
    path: path.resolve(__dirname, './dist'),
  }
};
module.exports = {
  mode: 'development',
  entry: {
   index: './src/index.js',
   searcher: './src/search.js'
  },
  output: {
    filename: '[name].js',  //多入口filename 需要用占位符区分对应entry的key 这样就会在dist目录生成 index.js 和searcher.js两个文件
    path: path.resolve(__dirname, './dist'),
  }
};
```
### Loaders
webpack 开箱只支持js和json两种文件类型 通过loaders去支持其他文件类型并把他们转化成有效的模块 并添加到依赖图中loaders本身是一个函数 接受
源文件作为参数 返回转换的结果

#### 常见的loaders


|名称| 描述 |
|:--|:--|
| babel-loader | 转换ES6、ES7等js新特性语法 |
| css-loader | 支持.css文件的加载和解析 |
| less-loader |将less文件转换成css |
|ts-loader|将ts转换成js
|file-loader|图片字体等的打包
|raw-loader|将文件以字符串的形式导入
|thread-loader|多进程打包js和css
```
module: {
  rules: [
    {
      test: /\.js$/,   // test指定匹配规则
      use: 'babel-loader', // use指定使用的loader的名称
    }
  ]
}
```
### Plugins

插件用于打包文件的优化 资源管理和环境变量的注入 作用于整个构建过程

### 常见的plugins 
名称|描述
:--|:--
CommonsChunkPlugin|将chunks相同的模块代码提取成公共js
CleanWebpackPlugin|清理构建目录
ExtractTextWebpackPlugin|将css从bundle文件里提取出来成为一个独立的css文件
CopyWebpackPlugin|将文件或者文件夹拷贝到输出目录
HtmlWebpackPlugin|创建html文件去承载输出的bundle
UglifyjsWebpackPlugin|压缩js
ZipWebpackPlugin|将打包出的资源生成一个zip压缩包