import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {AtAvatar, AtTag, AtIcon} from 'taro-ui'
import {miniTolarge,timeToString} from '../util'
import '../app.less'

import ParseComponent from '../wxparse'

class NodeItem extends Component {



  goDetail = (id) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  };

  goUser = (name) => {
    Taro.navigateTo({
      url: `/pages/user/index?username=${name}`
    })
  }


  render() {
    const {data, isDetail, isReply, index, memberId, me} = this.props;

    return (
      <View onClick={() => {
        if (!isReply && !isDetail) {
          this.goDetail(data.id)
        }

      }} className='list-item'>
        <View className='info'>

          {
            !me ?

              <View onClick={() => { this.goUser(data.member.username)}}>
                <AtAvatar circle size='small' image={miniTolarge(data && data.member && data.member.avatar_large)}></AtAvatar>
              </View>
              :
              null
          }

          <View className='data'>
            <View>
              <Text onClick={() => {this.goUser(data.member.username)}} className={memberId === data.member.id ? 'text-danger' : ''}>
                {data.member.username}
              </Text>

              {
                !isReply ? <View className='pull-right right'>
                    <AtTag type='primary' size='small' circle>{data.node.title}</AtTag>
                    <AtIcon value='message' className='m-l' size='16'></AtIcon>

                    <Text className=' m-l-xs'>{data.replies}</Text>
                  </View>
                  :
                  <View className='pull-right right text-muted'>
                    {!isReply ? null : <Text>#{index} </Text>}
                  </View>

              }


            </View>

            {
              !isDetail ?
                <View className='desc text-muted'>{timeToString(data && data.last_touched)}
                  {data.last_reply_by ? <Text className='m-l-xs'>最后回复 {data.last_reply_by}</Text> : ''}
                </View>
                :
                <View className='desc text-muted'>

                  {timeToString(data && data.created)}

                </View>
            }


          </View>

        </View>

        <View className='m-t'>
          {
            !isReply ? <Text className='title'>{data.title}</Text> : <View className='at-article__p'>
              <ParseComponent mark={data.content_rendered}></ParseComponent>
            </View>
          }
        </View>


      </View>
    )
  }
}


export default NodeItem
