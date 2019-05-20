import Taro, {Component} from '@tarojs/taro'
import Index from './pages/index'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import {Provider} from '@tarojs/redux'
import store from './store'
import './app.less'


class App extends Component {

  config = {
    pages: ['pages/index/index',
      'pages/user/index',


      'pages/detail/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index/>
    )
  }
}

Taro.render(<Provider store={store}><App/></Provider>, document.getElementById('app'))
