import Taro, {Component} from '@tarojs/taro'
import {View,} from '@tarojs/components'
import {AtTabs, AtTabsPane, AtToast  } from 'taro-ui'
import {connect} from '@tarojs/redux'
import {getList} from '../../action'
import NodeItem from '../../components/NodeItem'


import './index.less'

class Index extends Component {

  config = {
    navigationBarTitleText: 'v2ex'
  };

  componentDidMount() {
    this.props.dispatch(getList(0, 0))
  }


  render() {
    const {tabs, index, hand, list,listLoading} = this.props;
    return (
      <View>

        <AtToast isOpened={listLoading}  status='loading' text='loading'></AtToast>
        <AtTabs
          current={index}
          scroll
          className='static-top'
          tabList={tabs}
          onClick={(e) => hand(e, tabs)}>
          {
            tabs.map((item, i) => {
              return (
                <AtTabsPane key={item.title} className='hide' current={index} index={i}/>

              )
            })
          }
        </AtTabs>

        <View className='list'>

          {
            list.map(item => {
              return (
                <NodeItem data={item} key={item.id} />

              )
            })
          }

        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tabs: state.tabs,
    index: state.index,
    list: state.list,
    listLoading:state.listLoading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    hand(index, tabs) {
      dispatch(getList(tabs[index].name, index))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Index)
