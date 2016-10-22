/**
 * action 不改变状态，只提交(commit) mutation
 * action 可以包含任意《异步》操作。
 * @param state
 */

import * as types from './mutation-types'
import api from './api'

/**
 * 初始化所有查询条件数据
 * @param commit
 * @param state
 * @param info
 */
export const initSearchCriteria = ({commit, state}, info)=> {
    //区域
    api.getQuYuList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_QUYU_LIST, res.list || {})
        else
            console.warn('[Leo]getQuYuList => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getQuYuList => ', error)
    })
    //地铁
    api.getDiTieList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_DITIE_LIST, res.list || {})
        else
            console.log('[Leo]getDiTieList => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getDiTieList => ', error)
    })
    //类型
    api.getTypeList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_TYPE_LIST, JSON.parse(res).list || {})
        else
            console.log('[Leo]getTypeList => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getTypeList => ', error)
    })
}

/**
 * 设置地图列表
 * @param commit
 * @param state
 * @param info
 */
export const setMapList = ({commit, state}, info)=> {
    let promise = api.getMap(info || '')
    promise.then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_MAP_LIST, res.list || {})
        else
            console.log('[Leo]getMap => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getMap => ', error)
    })
    return promise
}