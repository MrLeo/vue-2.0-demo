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
            console.warn('[Leo]getQuYuList no response => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getQuYuList error => ', error)
    })
    //地铁
    api.getDiTieList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_DITIE_LIST, res.list || [])
        else
            console.log('[Leo]getDiTieList no response => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getDiTieList error => ', error)
    })
    //类型
    api.getTypeList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_TYPE_LIST, res.list || [])
        else
            console.log('[Leo]getTypeList no response => ', res.messageInfo)
    }).catch(error=> {
        console.warn('[Leo]getTypeList error => ', error)
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
            console.warn('[Leo]getTeSeList no response => ', res.messageInfo)
    }).catch(error=> {
        console.error('[Leo]getTeSeList error => ', error)
    })
    //户型
    api.getHuXingList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_HUXING_LIST, res.list || [])
        else
            console.warn('[Leo]getHuXing no response => ', res.messageInfo)
    }).catch(error=> {
        console.error('[Leo]getHuXing error => ', error)
    })
    //环线
    api.getHuanXianList(info || '').then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_HUANXIAN_LIST, res.list || [])
        else
            console.warn('[Leo]getHuanXianList no response => ', res.messageInfo)
    }).catch(error=> {
        console.error('[Leo]getHuanXianList error => ', error)
    })
}

/**
 * 设置地图列表
 * @param commit
 * @param state
 * @param info
 */
export const setMapList = ({commit, state}, zoom)=> {
    const info = {
        sub: state.base.indexSearch.sub || '',
        quyu: state.base.indexSearch.quyu || '',
        ditie: state.base.indexSearch.ditie || '',
        huanxian: state.base.indexSearch.huanxian || '',
        p_type: state.base.indexSearch.type || '',
        jiage: state.base.indexSearch.jiage || '',
        tese: state.base.indexSearch.tese || '',
        jushi: state.base.indexSearch.huxing || '',
        keyword: state.base.indexSearch.keyword || '',
        fujin: state.base.indexSearch.fujin || '',
        dqzuobiao: state.base.indexSearch.zuobiao || ''
    }

    let promise = null
    if (!zoom)zoom = 9

    if (zoom > 13) {
        promise = api.getMap(info)//获取二级覆盖物
    } else {
        promise = api.getRoad(info)//获取一级覆盖物
    }

    promise.then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_MAP_LIST, res.list || [])
        else
            console.warn('[Leo]getMap no response => ', res.messageInfo)
        return res.list
    }).catch(error=> {
        console.error('[Leo]getMap error => ', error)
        return error
    })

    return promise
}

/**
 * 设置更多列表
 * @param commit
 * @param state
 * @param info
 */
export const setTypeJianSuo = ({commit, state})=> {
    const info = {
        sub: state.base.indexSearch.sub || '',
        quyu: state.base.indexSearch.quyu || '',
        ditie: state.base.indexSearch.ditie || '',
        huanxian: state.base.indexSearch.huanxian || '',
        p_type: state.base.indexSearch.type || '',
        jiage: state.base.indexSearch.jiage || '',
        tese: state.base.indexSearch.tese || '',
        jushi: state.base.indexSearch.huxing || '',
        keyword: state.base.indexSearch.keyword || '',
        fujin: state.base.indexSearch.fujin || '',
        dqzuobiao: state.base.indexSearch.zuobiao || '',
        page: state.base.indexSearch.listPage || 1
    }

    let promise = api.getTypeJianSuo(info)

    promise.then(res=> {
        if (res.returnCode == '00')
            commit(types.SET_TYPE_JIAN_SUO, res.list || [])
        else
            console.warn('[Leo]getTypeJianSuo no response => ', res.messageInfo)
        return res.list
    }).catch(error=> {
        console.error('[Leo]getTypeJianSuo error => ', error)
        return error
    })

    return promise
}