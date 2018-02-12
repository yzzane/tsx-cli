const path = require("path")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
const tsImportPluginFactory = require('ts-import-plugin')

const autoprefix = new LessPluginAutoPrefix()
const extractLess = new ExtractTextPlugin({
  filename: '[name].bundle.css',
  allChunks: true,
  ignoreOrder: true,
  disable: process.env.NODE_ENV !== 'production'
})

module.exports = {
  context: path.join(__dirname, 'src/entry'),
  entry: {
    main: './main.tsx'
  },
  module: {
    rules:[
      {
        test: /\.(jsx|tsx|js|ts)$/,
        use: ['react-hot-loader/webpack', {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [tsImportPluginFactory({ libraryName: 'antd', libraryDirectory: 'es', style: true })]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          }
        }],
        exclude: /node_modules/
      },{
        test: /\.less$/,
        exclude: path.join(__dirname, 'src/scripts'),
        use: extractLess.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },{
            loader:'less-loader',
            options: {
              plugins: [autoprefix]
            }
          }],
          fallback: 'style-loader'
        })
      },{
        test: /\.less$/,
        include: path.join(__dirname, 'src/scripts'),
        use: extractLess.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },{
            loader:'less-loader',
            options: {
              plugins: [autoprefix]
            }
          }],
          fallback: 'style-loader'
        })        
      },{
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 30000
          }
        }]
      },{
        test: /.(svg|ttf|eot|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/,
        loader: 'file-loader'
      }      
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [extractLess]
}