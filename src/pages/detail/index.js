import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtToast} from 'taro-ui'
import ParseComponent from '../../wxparse'
import NodeItem from '../../components/NodeItem'

class Index extends Component {

  constructor() {
    super();
    this.state = {
      data: {
        content: ''
      },
      loading: false,
      loadingText: '主题加载中',
      replies: [],
      originReplies: []
    }
  }

  config = {
    navigationBarTitleText: '主题信息'
  };

  renderReplies(data) {
    if (data.length > 0) {
      let renderData = data.splice(0, 10);
      let old = this.state.replies;
      this.setState({
        replies: [...old, ...renderData],
      })
    }
  }

  onReachBottom() {
    this.renderReplies(this.state.originReplies)
  }

  getReplies() {
    Taro.request({
      url: `https://www.v2ex.com/api/replies/show.json?topic_id=${this.$router.params.id || '541125'}`
    }).then(data => {
      this.setState({
        originReplies: data.data,
        loading: false,
      }, () => {
        this.onReachBottom()
      })
    })
  }

  componentDidMount() {
    this.setState({
      loading: true,
      loadingText: 'loading detail',
    });


    Taro.request({
      url: 'https://www.v2ex.com/api/topics/show.json?id=' + (this.$router.params.id || '541125')
    }).then(res => {

      this.setState({
        data: res.data[0],
        loadingText: 'loading replies'
      });
      this.getReplies()


    })
  }

  render() {
    const {data} = this.state
    return (
      <View>
        <AtToast isOpened={this.state.loading} hasMask={true} status='loading' text={this.state.loadingText}></AtToast>
        <NodeItem data={this.state.data} isDetail={true}></NodeItem>
        <View className='at-article'>
          <View className='at-article__content'>
            <View className='at-article__section'>
              <View className='at-article__p'>
                <ParseComponent mark={this.state.data.content_rendered}></ParseComponent>
              </View>

            </View>
          </View>
        </View>

        <View className='list'>
          {
            this.state.replies.map((item, index) => {
              return (
                <NodeItem key={item.id} memberId={data.member.id} data={item} isDetail={true} isReply={true}
                          index={index + 1}></NodeItem>
              )
            })
          }


        </View>

      </View>

    )
  }
}


export default (Index)
