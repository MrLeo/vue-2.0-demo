<template>
    <div id="index">
        <header>
            <div class="left">北京</div>
            <h1><input type="text" placeholder="搜索楼盘" v-model="selected.keyword"></h1>
            <div></div>
            <div class="right" @click="changeList">{{indexListType}}</div>
            <div class="clear"></div>
            <div class="mainnav">
                <em @click="resetSearchInfo"></em>
                <dl @click="showSearchInfo('searchQuyu')">
                    <dt>{{computedQuYu}}/{{selectedName.ditie}}
                    <div class="fr"></div>
                    </dt>
                    <dd></dd>
                </dl>
                <dl @click="showSearchInfo('searchType')">
                    <dt>{{selectedName.type}}
                    <div class="fr"></div>
                    </dt>
                    <dd></dd>
                </dl>
                <dl @click="showSearchInfo('searchJiage')">
                    <dt>{{selectedName.jiage}}
                    <div class="fr"></div>
                    </dt>
                    <dd></dd>
                </dl>
                <router-link tag="b" to="/search/more">更多</router-link>
            </div>
        </header>
        <div style=" height:92px;"></div>
        <div class="content">
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
        <div style="height:60px;"></div>
        <v-footer></v-footer>
        <transition name="slide-down">
            <component :is="currentSearchInfo" class="serch-info"></component>
        </transition>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {mapState, mapGetters, mapActions} from 'vuex'
    import * as types from '../store/mutation-types'
    import vFooter from 'components/footer'
    import searchQuyu from 'components/search-quyu'
    import searchJiage from 'components/search-jiage'
    import searchType from 'components/search-type'
    export default {
        name: 'index',
        components: {vFooter, searchQuyu, searchJiage, searchType},
        data () {
            return {
                currentSearchInfo: '',
                selectedName: {
                    quyu: "区域",
                    ditie: "地铁",
                    jiage: "价格",
                    type: "类型"
                },
                selected: {
                    keyword: ''
                }
            }
        },
        computed: {
            ...mapState({
                //quYuList: state => state.base.quYuList
                base: state => state.base,
                indexSearch: state => state.base.indexSearch
            }),
            ...mapGetters({
                //baseInfo: 'baseInfo'
            }),
            indexListType(){
                if (this.$route.name == 'map') {
                    return '列表'
                } else {
                    return '地图'
                }
            },
            computedQuYu(){
                const _vm = this
                let id = _vm.indexSearch.quyu
                let title = "区域"
                for (let item of _vm.$store.state.base.quYuList)
                    if (item.id == id)
                        title = item.t_name
                return title
            },
            /*computedDiTie(){
             const _vm = this
             let id = _vm.indexSearch.ditie
             let title = "地铁"
             for (let item of _vm.$store.state.base.diTieList)
             if (item.id == id)
             title = item.t_name
             return title
             },
             computedJiaGe(){
             const _vm = this
             let title = "价格"
             switch (_vm.indexSearch.ditie.toString()) {
             case '15000':
             title = '1-1.5万'
             break
             case '25000':
             title = '1.5-2.5万'
             break
             case '35000':
             title = '2.5-3.5万'
             break
             case '50000':
             title = '3.5-5万'
             break
             case '65000':
             title = '5-6.5万'
             break
             case '80000':
             title = '6.5-8万'
             break
             case '80001':
             title = '8万以上'
             break
             }
             return title
             },
             computedType(){
             const _vm = this
             let id = _vm.indexSearch.type
             let title = "类型"
             for (let item of _vm.$store.state.base.typeList)
             if (item.id == id)
             title = item.t_name
             return title
             }*/
        },
        watch: {
            '$route' (to, from) {
                const _vm = this
                console.debug('[Leo]$route \nfrom => ', from, ' \nto => ', to)
                if (to.name == "index") {
                    router.push({path: 'map'}) //默认展示地图
                    _vm.resetSearchInfo()
                }
            },
            'selected.keyword'(){
                this.$store.commit(types.SET_INDEX_SEARCH_INFO, this.selected)
            },
            "base.quYuList": {
                deep: true,
                handler: function (val, oldVal) {
                    const _vm = this
                    let quYuList = _vm.$store.state.base.quYuList
                    for (let item of quYuList) {
                        if (item.id == _vm.$store.state.base.indexSearch.quyu) {
                            _vm.selectedName.quyu = item.t_name
                            return
                        }
                    }
                }
            },
            "base.diTieList": {
                deep: true,
                handler: function (val, oldVal) {
                    const _vm = this
                    let diTieList = _vm.$store.state.base.diTieList
                    for (let item of diTieList) {
                        if (item.id == _vm.$store.state.base.indexSearch.ditie) {
                            _vm.selectedName.ditie = item.t_name
                            return
                        }
                    }
                }
            },
            "base.typeList": {
                deep: true,
                handler: function (val, oldVal) {
                    const _vm = this
                    let typeList = _vm.$store.state.base.typeList
                    for (let item of typeList) {
                        if (item.id == _vm.$store.state.base.indexSearch.type) {
                            _vm.selectedName.type = item.t_name
                            return
                        }
                    }
                }
            }
        },
        methods: {
            ...mapActions([
                'initIndexSearchCriteria',
                'setRoadList',
                'setMapList',
                'setTypeJianSuo'
            ]),
            changeList(){
                const _vm = this
                _vm.currentSearchInfo = ''
                switch (_vm.$route.name) {
                    case 'map':
                        router.push({path: 'list'})
                        break
                    case 'list':
                        router.push({path: 'map'})
                }
            },
            showSearchInfo(type){
                const _vm = this
                if (_vm.currentSearchInfo == '')
                    _vm.currentSearchInfo = type
                else if (_vm.currentSearchInfo != '' && _vm.currentSearchInfo != type)
                    _vm.currentSearchInfo = type
                else
                    _vm.currentSearchInfo = ''

                _vm.$store.state.base.tempVm.$on('closeSerchInfo', function () {
                    _vm.currentSearchInfo = ''
                })

                _vm.$store.state.base.tempVm.$on('setSelectedName', function (info) {
                    info.quyu ? _vm.selectedName.quyu = (info.quyu == '不限' ? '区域' : info.quyu) : ''
                    info.ditie ? _vm.selectedName.ditie = (info.ditie == '不限' ? '地铁' : info.ditie) : ''
                    info.type ? _vm.selectedName.type = (info.type == '不限' ? '类型' : info.type) : ''
                    info.jiage ? _vm.selectedName.jiage = (info.jiage == '不限' ? '价格' : info.jiage) : ''
                })
            },
            resetSearchInfo(){
                const _vm = this
                //this.selected.keyword = ''
                _vm.selectedName.quyu = "区域"
                _vm.selectedName.ditie = "地铁"
                _vm.selectedName.jiage = "价格"
                _vm.selectedName.type = "类型"
                this.$store.commit(types.SET_INDEX_SEARCH_INFO, {'empty': true})
                let maps = _vm.setRoadList()//获取初始一级覆盖物
                maps.then(function (res) {
                    _vm.$store.state.base.tempVm.$emit('resetSearchInfo')
                })
                _vm.setTypeJianSuo()
            }
        },
        created(){
            const _vm = this
            //初始化判断本地 是否为空
            var subjectColor = window.localStorage.getItem('subjectColor');
            if (subjectColor) {
                $('header').addClass(subjectColor)
            }

            //初始化检索信息的数据
            _vm.initIndexSearchCriteria()

            //初始化URL参数
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
            _vm.$store.commit(types.SET_INDEX_SEARCH_INFO, {
                sub, page, quyu, ditie, huanxian, type, jiage, tese, huxing, keyword, fujin, dqzuobiao
            })
            _vm.selected.keyword = _vm.$store.state.base.indexSearch.keyword

            //设置价格检索项的标题
            let selectJiage = (jiage) => {
                switch (jiage) {
                    case '15000':
                        _vm.selectedName.jiage = '1-1.5万'
                        break
                    case '25000':
                        _vm.selectedName.jiage = '1.5-2.5万'
                        break
                    case '35000':
                        _vm.selectedName.jiage = '2.5-3.5万'
                        break
                    case '50000':
                        _vm.selectedName.jiage = '3.5-5万'
                        break
                    case '65000':
                        _vm.selectedName.jiage = '5-6.5万'
                        break
                    case '80000':
                        _vm.selectedName.jiage = '6.5-8万'
                        break
                    case '80001':
                        _vm.selectedName.jiage = '8万以上'
                        break
                    default:
                        _vm.selectedName.jiage = '价格'
                        break
                }
            }
            selectJiage(_vm.$store.state.base.indexSearch.jiage)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content {
        position: absolute;
        top: 92px;
        bottom: 60px;
        left: 0;
        right: 0;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .serch-info {
        position: absolute;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .mainnav {
        display: flex;
    }

    .mainnav > em {
        /*float: left;*/
        width: 35px;
        height: 100%;
    }

    .mainnav > dl {
        flex: 1;
        width: auto;
        text-align: center;
    }

    .mainnav > dl:first-child {
        width: 30%;
    }

    .mainnav b {
        width: 35px;
        padding-right: 10px;
        box-sizing: border-box;
    }

    .mainnav > dl dt .fr {
        right: 4px;
    }

    .mainnav > dl dt {
        padding-right: 15px;
        white-space: nowrap;
    }
</style>
