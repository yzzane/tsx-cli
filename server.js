const path = require('path')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const devConfig = require('./webpack.dev.config.js')
const opn = require('opn')
const ip = '0.0.0.0'
const port = 3000

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const proxy = require('express-http-proxy')

const webpackDevServerEntries = ['react-hot-loader/patch', 'webpack-dev-server/client?http://' + ip + ":" + port, 'webpack/hot/only-dev-server']

if(typeof devConfig.entry === 'string'){
  devConfig.entry = webpackDevServerEntries.concat([devConfig.entry])
}else if(Array.isArray(devConfig.entry)){
  devConfig.entry = webpackDevServerEntries.concat(devConfig.entry)
}else if(devConfig.entry){
  for( var k in devConfig.entry ){
    var main = devConfig.entry[k]
    devConfig.entry[k] = webpackDevServerEntries.concat(Array.isArray(main) ? main : [main])
  }
}

const options = {
  contentBase: path.resolve(__dirname, './'),
  hot: true,
  disableHostCheck: true,
  publicPath: devConfig.output.publicPath,
  historyApiFallback: false
}

const compiler = webpack(devConfig)
const server = new webpackDevServer(compiler, options)

server.listen(port, ip, function (error) { 
  if(error)
    console.log(error)
  else{
    opn("http://127.0.0.1:" + port)
    console.log("server has been runned successfully")
  }
 })


/* var path = require('path')
var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var config = require('./webpack.dev.config.js')
var opn = require('opn')
var ip = '0.0.0.0'
var port = 9000


var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var proxy = require('express-http-proxy')

var webpackDevServerEntries = ['react-hot-loader/patch', 'webpack-dev-server/client?http://' + ip + ':' + port, 'webpack/hot/only-dev-server']

if (typeof config.entry === 'string') {
	config.entry = webpackDevServerEntries.concat([config.entry]) 
}else if(Array.isArray(config.entry)){
	config.entry = webpackDevServerEntries.concat(config.entry) 
}else if(config.entry){
	for(var k in config.entry){
		var main = config.entry[k]
		config.entry[k] = webpackDevServerEntries.concat(Array.isArray(main) ? main : [main])
	}
}

var options = {
	contentBase: path.resolve(__dirname, './'),
	hot: true,
	disableHostCheck : true,
	//设置webpack-dev-server启动的时候，bundles的输出的路径，打包的时候这个publicPath没有作用
	publicPath: config.output.publicPath,
	historyApiFallback: false,
	// /api/* 会指向  http://127.0.0.1:9001/api/*  如  /api/users 就会指向  http://127.0.0.1:9001/api/users
	// proxy: {
	// 	'/weixinapi/*': {
	// 		target: 'http://127.0.0.1:9001',
	// 	}
	// }
}

var compiler = webpack(config)
var server = new webpackDevServer(compiler, options)


//   */ /*testapi/a/b =>    http://10.45.16.204:81 + /a/b
server.use('/testapi', proxy('http://10.45.16.204:81', {
	forwardPath: function (req, res) {
		var redirect = require('url').parse(req.url).path
		return '/adminapi' + redirect
	},
	https: false,
	reqBodyEncoding: null
}))

server.use('/api', proxy('http://127.0.0.1:9001', {
	forwardPath: function (req, res) {
		var redirect = require('url').parse(req.url).path
		return '/api' + redirect
	},
	https: false,
	reqBodyEncoding: null
}))

server.use(bodyParser.json({limit : '1000000kb'})) // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true ,limit : '1000000kb'})) // for parsing application/x-www-form-urlencoded
server.use(cookieParser())

server.listen(port,ip, function (err) {
	if (err) {
		console.log(err) //eslint-disable-line no-console
	} else {
		opn('http://127.0.0.1:' + port)
		console.log('Listening at http://127.0.0.1:' + port) //eslint-disable-line no-console
	}

})*/
