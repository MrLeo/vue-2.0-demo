/**
* @Date: 2016/10/21  0021  16:05
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
  <div class="indexlist">
    <dl v-for="item in typeJianSuo" :key="item.id" @click="goToDetail(item)">
      <!--:style="{backgroundImage:'url('+convertPUrl(item.p_url)+')'}"-->
      <dt v-lazy:background-image="convertPUrl(item.p_url)">
        <!--<img :src="'http://www.loushijie.cn/'+item.p_url">--></dt>
      <dd>
        <h3>{{item.p_name}}</h3>
        <h6>{{item.t_name}}</h6>
        <h4>{{item.adds}}</h4>
        <h5><span v-if="item.n_name">{{item.n_name}}</span></h5>
        <em>{{item.jiage}}</em>
      </dd>
    </dl>
  </div>
</template>
<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    import * as types from '../store/mutation-types'
    export default{
        name: 'list',
        data(){
            return {
                busy: false,
                page: 1
            }
        },
        computed: {
            ...mapState({
                indexSearch: ({base})=>base.indexSearch,
                typeJianSuo: state=>state.base.typeJianSuo
            }),
            ...mapGetters({})
        },
        watch: {
            "indexSearch": {
                deep: true,
                handler: function (val, oldVal) {
                    const _vm = this
                    _vm.setTypeJianSuo()
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions([
                'setTypeJianSuo',
            ]),
            init(){
                 const _vm = this;
                //region 浏览器返回处理
                let sub = _vm.$route.query.sub || ''
                let page = _vm.$route.query.page || ''
                let quyu = _vm.$route.query.quyu || ''
                let ditie = _vm.$route.query.ditie || ''
                let huanxian = _vm.$route.query.huanxian || ''
                let type = _vm.$route.query.type || ''
                let jiage = _vm.$route.query.jiage || ''
                let tese = _vm.$route.query.tese || ''
                let huxing = _vm.$route.query.huxing || ''
                let keyword = _vm.$route.query.keyword || ''
                let fujin = _vm.$route.query.fujin || ''
                let dqzuobiao = _vm.$route.query.dqzuobiao || ''
                if (!!sub || !!page || !!quyu || !!ditie || !!huanxian || !!type || !!jiage || !!tese || !!huxing || !!keyword || !!fujin || !!dqzuobiao) {
                    //commit查询参数
                    _vm.$store.commit(types.SET_INDEX_SEARCH_INFO, {
                        sub, page, quyu, ditie, huanxian, type, jiage, tese, huxing, keyword, fujin, dqzuobiao
                    })
                } else {
                //选好更多搜索条件后将区域条件和搜索框条件置空
                this.$store.commit(types.SET_INDEX_SEARCH_INFO, {quyu:'',keyword:''})
                    _vm.setTypeJianSuo().then(() => {
                        //_vm.map.setFitView(_vm.markers)
                    })
                }
            },
            convertPUrl(url){
                if (url) {
                    return 'http://www.loushijie.cn/' + url
                } else {
                    return './static/images/icon_default.png'
                }
            },
            goToDetail(item){
                window.localStorage.setItem('detailTitle', item['p_name'])
                window.localStorage.setItem('detailTel', item['tel'])
                window.localStorage.setItem('detailXY', item['zuobiao'])
                //window.location.href = 'h5/view/product_info.php?id=' + item['id']
                window.location.href = 'detail_product.html?id=' + item['id']
            }
        },
        created(){
            const _vm = this
            _vm.setTypeJianSuo()
        },mounted(){
            const _vm = this
            _vm.$nextTick(function () {
                _vm.init()
            })
        }
    }






</script>
<style scoped>
    .indexlist dt {
        background-position: center;
        background-size: cover;
    }






</style>
