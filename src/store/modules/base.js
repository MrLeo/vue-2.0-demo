import Vue from 'vue'
import * as types from '../mutation-types'

//状态数据源
const state = {
    indexSearch: {
        keyword: '',
        quyu: '',
        ditie: '',
        type: '',
        jiage: '',
        tese: '',
        huxing: '',
        huanxian: '',
        fujin: ''
    },
    quYuList: [],
    diTieList: [],
    typeList: [],
    teseList: [],
    huxingList: [],
    huanxianList: [],
    mapList: [],
    typeJianSuo: []
}

//注册事件，提交(commit)状态改变
//必须是《同步》事务
const mutations = {
    [types.SET_INDEX_SEARCH_INFO](state, info){
        //基础查询条件
        info.keyword ? state.indexSearch.keyword = info.keyword : ''
        info.quyu ? state.indexSearch.quyu = info.quyu : ''
        info.ditie ? state.indexSearch.ditie = info.ditie : ''
        info.type ? state.indexSearch.type = info.type : ''
        info.jiage ? state.indexSearch.jiage = info.jiage : ''
        //更多查询条件
        info.tese ? state.indexSearch.tese = info.tese : ''
        info.huxing ? state.indexSearch.huxing = info.huxing : ''
        info.huanxian ? state.indexSearch.huanxian = info.huanxian : ''
        info.fujin ? state.indexSearch.fujin = info.fujin : ''
    },
    [types.SET_QUYU_LIST](state, list){
        Vue.set(state, 'quYuList', list)
    },
    [types.SET_DITIE_LIST](state, list){
        Vue.set(state, 'diTieList', list)
    },
    [types.SET_TYPE_LIST](state, list){
        Vue.set(state, 'typeList', list)
    },
    [types.SET_MAP_LIST](state, list){
        Vue.set(state, 'mapList', list)
    },
    [types.SET_TYPE_JIAN_SUO](state, list){
        Vue.set(state, 'typeJianSuo', list)
    },
    [types.SET_TESE_LIST](state, list){
        Vue.set(state, 'teseList', list)
    },
    [types.SET_HUXING_LIST](state, list){
        Vue.set(state, 'huxingList', list)
    },
    [types.SET_HUANXIAN_LIST](state, list){
        Vue.set(state, 'huanxianList', list)
    }
}

export default {
    state,
    mutations
}
