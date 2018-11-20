const getters = {
  getTags:state=>{
    //把tags字符串切成数组返回
    if(state.tags.length !==0){
      return state.tags.split(',')
    }
    return []
  }
}
export default getters
