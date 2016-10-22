/**
 * @Date: 2016/10/22  0022  0:27
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

import $ from 'jquery'

const host = 'http://loushijie.cn/api/'

export default {
    /**
     * 1.区域
     * @param sub
     */
    getQuYuList(sub){
        return new Promise(function (resolve, reject) {
            $.post(host + 'quyu_listapi.php', {sub}, res=> resolve(JSON.parse(res)))
        })
    },
    /**
     * 2.地铁
     * @param sub
     */
    getDiTieList(sub){
        return new Promise(function (resolve, reject) {
            $.post(host + 'ditie_listapi.php', {sub}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 3.特色
     * @param sub
     */
    getTeSeList(sub){
        return new Promise(function (resolve, reject) {
            $.post(host + 'tese_listapi.php', {sub}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 4.户型
     * @param sub
     */
    getHuXingList(sub){
        return new Promise(function (resolve, reject) {
            $.post(host + 'huxing_listapi.php', {sub}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 5，环线
     * @param sub
     */
    getHuanXianList(sub){
        return new Promise(function (resolve, reject) {
            $.post(host + 'huanxian_listapi.php', {sub}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 6.类型
     * @param sub
     */
    getTypeList(sub){
        return new Promise(function (resolve, reject) {
            $.post(host + 'type_listapi.php', {sub}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 7.更多列表
     * @param sub
     * @param page 分页
     * @param arg 可选：quyu ditie huanxian p_type jiage tese jushi keyword fujin（5千米 传1 10千米传2） dqzuobiao(传对应的id)
     */
    getTypeJianSuo(info){
        info.sub ? '' : info.sub = ''
        info.page ? '' : info.page
        return new Promise(function (resolve, reject) {
            $.post(host + 'type_jiansuoapi.php', info, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 8.首页区域数据（区域）
     * @param sub
     * @param arg 可选：quyu ditie huanxian p_type jiage tese jushi keyword fujin（5千米 传1 10千米传2） dqzuobiao(传对应的id)
     */
    getRoad(info){
        info.sub ? '' : info.sub = ''
        return new Promise(function (resolve, reject) {
            $.post(host + 'roadapi.php', info, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 9.首页地图+分类检索
     * @param sub
     * @param arg 可选：quyu ditie huanxian p_type jiage tese jushi keyword fujin（5千米 传1 10千米传2） dqzuobiao(传对应的id)
     */
    getMap(info){
        info.sub ? '' : info.sub = ''
        return new Promise(function (resolve, reject) {
            $.post(host + 'mapapi.php', info, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 10.详情页-户型
     * @param sub
     * @param upd 项目id
     */
    getHuXing(sub, upd){
        return new Promise(function (resolve, reject) {
            $.post(host + 'huxing_api.php', {sub, upd}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 11.详情页-项目存储
     * @param sub
     * @param sid 项目id
     * @param uid 用户id
     */
    getUserBrowsingHistory(sub, sid, uid){
        return new Promise(function (resolve, reject) {
            $.post(host + 'user/browsinghistoryapi.php', {sub, sid, uid}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 12.详情页-立即预约
     * @param sub
     * @param suser 姓名
     * @param sphone 电话
     * @param sid 项目id
     * @param g_uid 用户id
     * @param time 预约时间
     */
    getSeeorder(sub, suser, sphone, sid, g_uid, time){
        return new Promise(function (resolve, reject) {
            $.post(host + 'user/seeorderapi.php', {sub, suser, sphone, sid, g_uid, time}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 13.详情页-点赞
     * @param sub
     * @param product_id 项目id
     * @param user_id 用户id
     * @param p_type 默认传3
     */
    clickLick(sub, product_id, user_id, p_type = 3){
        return new Promise(function (resolve, reject) {
            $.post(host + 'user/click_like.php', {sub, product_id, user_id, p_type}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 14.详情页-分享
     * @param sub
     * @param product_id 项目id
     * @param user_id 用户id
     * @param p_type {4:楼盘,5:咨询}
     */
    share(sub, product_id, user_id, p_type){
        return new Promise(function (resolve, reject) {
            $.post(host + 'user/share.php', {sub, product_id, user_id, p_type}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 15.详情页-收藏
     * @param sub
     * @param product_id 项目id
     * @param user_id 用户id
     * @param p_type {2:资讯,1:楼盘}
     */
    collectionInsert(sub, product_id, user_id, p_type){
        return new Promise(function (resolve, reject) {
            $.post(host + 'user/collection_insert.php', {
                sub, product_id, user_id, p_type
            }, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 16.详情页-社会化属性
     * @param sub
     * @param p_id 项目id
     * @param user_id 用户id
     * @param p_type 默认传3
     */
    productUserAttr(sub, p_id, user_id, p_type = 3){
        return new Promise(function (resolve, reject) {
            $.post(host + 'user/product_user_attr.php', {sub, p_id, user_id, p_type}, res=>resolve(JSON.parse(res)))
        })
    },
    /**
     * 详情页-周边推荐
     * @param sub
     * @param id
     */
    getZhouBianTuiJian(sub, id){
        return new Promise(function (resolve, reject) {
            $.post(host + 'zhoubiantj.php', {sub, id}, res=>resolve(JSON.parse(res)))
        })
    }
}