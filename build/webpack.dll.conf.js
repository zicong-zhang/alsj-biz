const path = require('path')
const webpack = require('webpack');
const ParallelUglifyPlugin  = require('webpack-parallel-uglify-plugin');

module.exports = {
  entry: {
    vendor: [
      'vue',
      'vuex',
      'vue-router',
      'lottie-web',
      'fastclick',
      'lib-flexible',
      'vue-awesome-swiper',
      'swiper',
      'axios'
    ]
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../static/js/dll/'),
    library: '[name]-dll', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, './vendor-manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]-dll',
      context: __dirname
    }),
    new ParallelUglifyPlugin({
      // uglifyJS：用于压缩 ES5 代码时的配置，Object 类型，直接透传给 UglifyJS 的参数。
      // uglifyES：用于压缩 ES6 代码时的配置，Object 类型，直接透传给 UglifyES 的参数。
      uglifyES : {
        compress: {
          warnings: false,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
          // 去除 debugger
          drop_debugger: true,
          // 去除 console
          drop_console: true
        },
        output: { // 删除打包后的注释
          comments: false,
          beautify: false
        }
      }
    }),
  ],
}
