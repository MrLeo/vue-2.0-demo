/**
 * action 不改变状态，只提交(commit) mutation
 * action 可以包含任意《异步》操作。
 * @param state
 */

import * as types from './mutation-types'
import api from './api'

/**
 * 初始化首页查询条件数据
 * @param commit
 * @param state
 * @param info
 */
export const initIndexSearchCriteria = ({commit, state}, info)=> {
    //区域
    api.getQuYuList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_QUYU_LIST, res.list || [])
        else
            console.warn('[Leo]getQuYuList => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getQuYuList => ', error)
    })
    //地铁
    api.getDiTieList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_DITIE_LIST, res.list || [])
        else
            console.log('[Leo]getDiTieList => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getDiTieList => ', error)
    })
    //类型
    api.getTypeList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_TYPE_LIST, res.list || [])
        else
            console.log('[Leo]getTypeList => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getTypeList => ', error)
    })
}

/**
 * 初始化更多检索页查询条件
 * @param commit
 * @param state
 * @param info
 */
export const initMoreSearchCriteria = ({commit, state}, info)=> {
    //特色
    api.getTeSeList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_TESE_LIST, res.list || [])
        else
            console.log('[Leo]getTeSeList => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getTeSeList => ', error)
    })
    //户型
    api.getHuXingList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_HUXING_LIST, res.list || [])
        else
            console.log('[Leo]getHuXing => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getHuXing => ', error)
    })
    //环线
    api.getHuanXianList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_HUANXIAN_LIST, res.list || [])
        else
            console.log('[Leo]getHuanXianList => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getHuanXianList => ', error)
    })
}

/**
 * 设置地图列表
 * @param commit
 * @param state
 * @param info
 */
export const setMapList = ({commit, state})=> {
    const info = {}
    info.sub = state.base.indexSearch.sub || ''
    info.quyu = state.base.indexSearch.quyu || ''
    info.ditie = state.base.indexSearch.ditie || ''
    info.huanxian = state.base.indexSearch.huanxian || ''
    info.p_type = state.base.indexSearch.type || ''
    info.jiage = state.base.indexSearch.jiage || ''
    info.tese = state.base.indexSearch.tese || ''
    info.jushi = state.base.indexSearch.huxing || ''
    info.keyword = state.base.indexSearch.keyword || ''
    info.fujin = state.base.indexSearch.fujin || ''
    info.dqzuobiao = state.base.indexSearch.zuobiao || ''
    let promise = api.getMap(info)
    promise.then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_MAP_LIST, res.list || [])
        else
            console.log('[Leo]getMap => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getMap => ', error)
    })
    return promise
}