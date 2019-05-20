import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {AtAvatar,AtToast} from 'taro-ui'
import {miniTolarge} from '../../util'
import './index.less'
import NodeItem from '../../components/NodeItem'

class Index extends Component {
  state = {
    user: {},
    topics: [],
    loading:false
  };


  componentDidMount() {
    let user = this.$router.params.username;
    this.setState({
      loading:true
    })
    Taro.request({
      url: `https://www.v2ex.com/api/members/show.json?username=${user || 'mgso'}`
    }).then(res => {

      this.setState({
        user: res.data
      })
      Taro.request({
        url: `https://www.v2ex.com/api/topics/show.json?username=${user || 'mgso'}`
      }).then(topics => {

        this.setState({
          topics: topics.data,
          loading:false
        })

      })
    })


  }


  config = {
    navigationBarTitleText: '用户信息',
    navigationBarBackgroundColor: '#23b7e5',
    navigationBarTextStyle: 'white'
  };


  render() {
    const {user, topics,loading} = this.state;
    return (
      <View>
        <AtToast isOpened={loading}  status='loading' text='loading' ></AtToast>
        <View className='user'>
          <View className='text-center'>
            <AtAvatar circle size='large' className='user-avatar' image={miniTolarge(user.avatar_large)}></AtAvatar>
            <View className='m-t-md'>
              <Text>{user.username}</Text>
            </View>
            <View className='m-t time'>
              加入日期：{new Date(user.created*1000).toLocaleDateString()}
            </View>
          </View>
        </View>
        <View>
          <View className='panel'>
            <Text className='panel-title'>创建的主题</Text>
            <View className='list'>
              {
                topics.map((item) => {
                  return <NodeItem data={item} key={item.id} me={true}></NodeItem>
                })
              }

            </View>
          </View>


        </View>
      </View>

    )
  }
}


export default (Index)
