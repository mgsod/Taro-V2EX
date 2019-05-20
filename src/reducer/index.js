import * as actions from '../action'

const defaultState = {
  tabs: [
    {title: '最热'},
    {title: '最新'},
    {title: 'Apple', name: 'apple'},
    {title: '创意', name: 'create'},
    {title: '成都', name: 'chengdu'},
    {title: '问与答', name: 'qna'},
    {title: '酷工作', name: 'jobs'},
  ],
  index: 0,
  list: [],
  listLoading:false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.INIT_TABS:
      return {
        ...state,
        tabs: action.tabs
      };
    case actions.ACTIVE_TAB:
      return {
        ...state,
        index: action.index
      };
    case actions.RENDER_LIST:
      return {
        ...state,
        list: action.list
      };
    case actions.LOADING:
      return {
        ...state,
        listLoading: action.isLoading
      };
    default:
      return state
  }
}
