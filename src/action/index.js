import Taro from '@tarojs/taro'

export const INIT_TABS = 'INIT_TABS';
export const ACTIVE_TAB = 'ACTIVE_TAB';
export const RENDER_LIST = 'RENDER_LIST';
export const LOADING = 'LOADING';



export const initTabs = (tabs) => {
  return {type: INIT_TABS, tabs}
};


export const activeTab = (index) => {
  return {type: ACTIVE_TAB, index}
};

export const renderList = (list) => {
  return {type: RENDER_LIST, list}
};
export const loading = (isLoading) => {
  return {type: LOADING, isLoading}
};

export function getList(name,index){
  return (dispatch) =>{
    dispatch(activeTab(index))
    dispatch(loading(true));

    if(!index){

      Taro.request({
        url:'https://www.v2ex.com/api/topics/hot.json'
      }).then(res =>{
        dispatch(renderList(res.data))
        dispatch(loading(false))
      })
    }else if(index === 1){
      Taro.request({
        url:'https://www.v2ex.com/api/topics/latest.json'
      }).then(res =>{
        dispatch(renderList(res.data))
        dispatch(loading(false))
      })
    }else{

      Taro.request({
        url:'https://www.v2ex.com/api/topics/show.json?node_name='+name
      }).then(res =>{
        dispatch(renderList(res.data))
        dispatch(loading(false))
      })
    }


  }
}
