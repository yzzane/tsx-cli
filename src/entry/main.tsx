import 'styles/style.less'

if(process.env.NODE_ENV !== "production")
  console.log("this is dev mode")

//动态设置__webpack_public_path__的值
const scripts = document.getElementsByTagName("script")
for(let i = scripts.length - 1; i >= 0; i--){
  if(scripts[i].src.indexOf(".bundle.js") >= 0){
    let src = scripts[i].getAttribute("src")
    __webpack_public_path__ = src.substr(0, src.indexOf("/") + 1)
    break
  }  
}

const es6Promise = require("es6-promise")
es6Promise.polyfill()

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '../scripts/components/App'
import { AppContainer } from 'react-hot-loader'

const $root = document.querySelector("#root")

const render = (Component: any) => {
  ReactDOM.render(<AppContainer><Component /></AppContainer>, $root)
}

render(App)

if(typeof module !== 'undefined' && module.hot){
  module.hot.accept('scripts/components/App', function(){
    const NextApp = require<any>("scripts/components/App").default
    render(App)
  })
}