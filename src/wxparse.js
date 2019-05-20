import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import WxParse from './wxParse/wxParse'
import './wxParse/wxParse.less'

export default class ParseComponent extends Component {
  componentDidMount () { }
  defaultProps = {
    mark:""
  }
  render () {
    //在这里进行转化
    if(this.props.mark){
      let domText = this.props.mark;
      WxParse.wxParse('domText', 'html', domText, this.$scope, 5);
    }
    return (
      <View>
        {
          /* 在此处进行判断环境，决定是否渲染wxParse的内容 */
          process.env.TARO_ENV === 'weapp' ?
            <View>
              <import src='./wxParse/wxParse.wxml' />
              <template is='wxParse' data='{{wxParseData:domText.nodes}}'/>
            </View> : <View>只在小程序里支持</View>
        }
      </View>
    )
  }
}
