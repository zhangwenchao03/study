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
      use: 'babel-loader', // use指定使用的loader的名称 一个传字符串 多个传数组
    },
    {
      test: /.css$/,
      use: [
        'style-loader',
        'css-loader'      // loader 是链式调用 从右往左 先执行css-loader 解析css 然后把解析好的样式传递给style-loader
      ]
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
### Mode 指定构建环境 
development production none 前两个设置process.env.NODE_ENV 并开启一些插件 none不做任何优化

###  解析es6 react jsx
配置babel  .babelrc文件
配置presets(相当于一系列babel plugin的集合) 与 plugins(每个插件相当于一个功能)

例如 配置es6 和react jsx的解析
解析es6 需要安装 @babel/core @babel/preset-env babel-loader 
解析react jsx 需要安装 @babel/preset-react
```
{
   "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
   ]
}
```
然后webpack module添加
```
rules: [
 {
   test: /.js$/,
   use: 'babel-loader'
 }
]
```
### 解析css
css-loader 用于加载.css文件 转换成commonjs对象
styles-loader 将样式通过<style>标签插入head中
less-loader sass-loader 将less sass转换为.css
解析less
```
 {
   test: /.less$/,
   use: [
     'styles-loader',
     'css-loader',
     'less-loader'
   ]
 }
```
### 解析图片和字体
  解析文件用file-loader
 解析图片
 ```
 {
   test: /.(png|jpg|gif|jpeg)$/,
   use: 'file-loader'
 }
 ```
  解析字体文件
 ```
 {
   test: /.(woff|woff2|eot|ttf|otf)$/,
   use: 'file-loader'
 }
 ```
 url-loader 也可以处理图片和字体 内部也是用的file-loader,可以设置较小的资源自动base64
  解析图片
 ```
 {
   test: /.(png|jpg|gif|jpeg)$/,
   use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10240   //图片小于10k 就会自动把图片转为base64 打包完就不会把图片直接打包到文件里 没有单独的图片
      }
    }
   ]
 }
 ```
 ### webpack 文件监听
 发现源码变化时 自动重新构建输出文件 ，两种方式开启监听
 + 启动webpack命令时 带上 --watch 参数
 + webpack.config.js 中配置 watch: true
 缺点是重新构建以后 需要手动刷新浏览器 不能热更新
 ### 热更新 webpack-dev-server 开发环境使用
WDS
不用手动刷新浏览器
不输出文件 而是放在内存中
通常结合HotModuleReplacementPlugin插件 一起实现热更新
热更新原理：
初始化 ：webpack Compile 将js编译成Bundle =》 Bundle server： 提供Bundle文件在浏览器的访问
更新：webpack Compile 将js编译成Bundle =》 HMR server：将热更新的文件输出给 HMR Runtime
     HMR Runtime: 注入浏览器 更新文件的变化
