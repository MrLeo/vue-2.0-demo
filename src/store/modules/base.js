import Vue from 'vue'
import * as types from '../mutation-types'

//状态数据源
const state = {
    quYuList: [],
    diTieList: [],
    typeList: [],
    mapList: []
}

//注册事件，提交(commit)状态改变
//必须是《同步》事务
const mutations = {
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
    }
}

export default {
    state,
    mutations
}
