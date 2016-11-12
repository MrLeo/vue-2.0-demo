/**
* @Date: 2016/10/21  0021  16:02
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <div id="map"></div>
</template>
<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import * as types from '../store/mutation-types'
    export default{
        name: 'map',
        data(){
            return {
                map: null,//地图
                markers: [],//覆盖物列表
                markderLevel: 1,//当前覆盖物级别
                lockMarkderLevel: false,//锁定覆盖物级别
                fitView: false,//是否是自适应调整的缩放级别
                tagZoom: 8.5,//标记缩放级别
                curZoom: 8.5,//当前缩放级别
                baseZoom: 8.5,//初始缩放级别
                mutateZoom: 12,//改变缩放级别
                fire: require('../assets/fire.png')//火焰图标
            }
        },
        computed: {
            ...mapState({
                indexSearch: state=>state.base.indexSearch
                //mapList: state => state.base.mapList,
            }),
            ...mapGetters({
                baseInfo: 'baseInfo'
            })
        },
        watch: {
            "indexSearch.quyu": {
                deep: true,
                handler: function (val, oldVal) {
                    const _vm = this
                    if (val) {
                        _vm.setSecondLevelMarker()
                    } else {
                        _vm.setFirstLevelMarker()
                    }
                }
            },
            "indexSearch.ditie"(val, oldVal) {
                const _vm = this
                if (val) {
                    _vm.setSecondLevelMarker()
                } else {
                    _vm.setFirstLevelMarker()
                }
            },
            "indexSearch.type"(val, oldVal) {
                const _vm = this
                if (_vm.indexSearch.quyu || _vm.indexSearch.ditie) {
                    _vm.setSecondLevelMarker()
                } else {
                    _vm.setFirstLevelMarker()
                }
            },
            "indexSearch.jiage"(val, oldVal) {
                const _vm = this
                if (_vm.indexSearch.quyu || _vm.indexSearch.ditie) {
                    _vm.setSecondLevelMarker()
                } else {
                    _vm.setFirstLevelMarker()
                }
            }
        },
        methods: {
            ...mapActions([
                'setRoadList',
                'setMapList'
            ]),
            //初始化
            init(){
                const _vm = this

                //初始化地图控件
                _vm.map = new AMap.Map('map', {
                    center: [116.398075, 39.908149],//[39.911940136336277, 116.40602523623816],
                    zoom: _vm.baseZoom
                })
                _vm.map.plugin(["AMap.ToolBar"], function () {
                    _vm.map.addControl(new AMap.ToolBar())
                })

                //默认设置一级控件
                _vm.setFirstLevelMarker()

                //监听“重置检索条件”
                _vm.$store.state.base.tempVm.$on('resetSearchInfo', function () {
                    _vm.tagZoom = 8.5
                    _vm.curZoom = 8.5
                    _vm.setFirstLevelMarker()
                    _vm.map.setZoomAndCenter(_vm.baseZoom, [116.398075, 39.908149])
                    //_vm.map.setFitView(_vm.markers)//地图调整到合适的范围来显示我们需要展示的markers。
                })

                //为地图绑定一个zoomend事件，当地图缩放结束后停留的级别小于8的时候将溢出所有市一级的标记
                var _onZoomEnd = function (e) {
                    let tempZoom = _vm.curZoom
                    _vm.curZoom = _vm.map.getZoom()
                    if (_vm.fitView) {
                        _vm.fitView = false
                        return
                    }
                    if (_vm.lockMarkderLevel) {
                        return
                    }

                    /**
                     * 1.圆圈==》点击区域，出现项目 自适应
                     * 2.圆圈==》点击区域，记录一下这个层级①,出现项目,
                     *      项目缩小=》回到圆圈 是根据手势 ，只要缩放一下 就回到8.5级别 圆圈状态
                     * 3.圆圈==》点击区域,出现项目,
                     *      项目放大=》就一直放大就行 ，再缩小的时候 只有缩小到层级①的时候，手势再缩小 才回圆圈。
                     * 4.圆圈，一直放大，层级12时出现项目。
                     */

                    /**
                     * 地图缩放触发覆盖物级别改变：
                     *      1.显示二级覆盖物
                     *          如果：地图缩放级别到达“变更缩放”的级别
                     *      2.显示一级覆盖物
                     *          如果：缩放级别达到“缩放标识”的级别;
                     *          并且,当前覆盖物级别是二级;
                     *          并且,点击的是缩小地图（当前级别小于前一级别）
                     */
                    if (_vm.curZoom <= _vm.tagZoom && _vm.markderLevel == 2 && tempZoom > _vm.curZoom) {
                        _vm.setFirstLevelMarker()
                    }
                    if (_vm.curZoom == _vm.mutateZoom) {
                        console.warn('[Leo]显示二级覆盖物 => 中心点坐标 => ', JSON.stringify(_vm.map.getCenter()))
                        _vm.tagZoom = _vm.map.getZoom()
                        let curCenter = _vm.map.getCenter()
                        _vm.$store.commit(types.SET_INDEX_SEARCH_INFO, {dqzuobiao: [curCenter.lat, curCenter.lng].join(",")})
                        _vm.setSecondLevelMarker().then(res=> {
                            //_vm.map.setZoomAndCenter(14, e.target.data.dqzuobiao.split(','))
                            //_vm.map.setFitView(_vm.markers)//地图调整到合适的范围来显示我们需要展示的markers。
                        })
                    }
                    console.group('地图缩放')
                    console.log('[Leo]前一个缩放级别 => ', tempZoom)
                    console.log('[Leo]当前的缩放级别 => ', _vm.curZoom)
                    console.log('[Leo]缩放标识 => ', _vm.tagZoom)
                    console.log('[Leo]当前覆盖物级别 => ', _vm.markderLevel)
                    console.groupEnd()
                }
                AMap.event.addListener(_vm.map, 'zoomend', _onZoomEnd);

                //使用监听，因为后面查询条件改变后需要重新渲染
                /* _vm.$store.watch(function (state) {
                 return state.base.mapList
                 }, function (val) {
                 })*/
            },
            //创建覆盖物
            createMarker(data, className = "map-marker", hide = false){
                const _vm = this
                //http://lbs.amap.com/api/javascript-api/guide/draw-on-map/marker-point/Marker多级展示的交互实现 + 绑定事件完成交互
                // 自定义点标记内容
                var markerContent = document.createElement("div")
                // 点标记中的文本
                markerContent.className = className
                markerContent.innerHTML = data.info || "<img src='http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png'>"
                // 点标记中的图标
                //var markerImg = document.createElement("img")
                //markerImg.className = "markerlnglat"
                //markerImg.src = "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
                //markerContent.appendChild(markerImg)
                //定义marker
                let marker = new AMap.Marker({
                    //icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                    content: markerContent,
                    //title:data.name,
                    //offset: new AMap.Pixel(-30, 5),
                    //zIndex: data.count
                    position: data.position || [116.398075, 39.908149]//[39.911940136336277, 116.40602523623816]
                });
                marker.subMarkers = []
                marker.data = {}
                if (!hide) {
                    marker.setMap(_vm.map)
                }
                // //设置子marker
                // if (data.subMarkers && data.subMarkers.length) {
                //     for (var i = 0; i < data.subMarkers.length; i += 1) {
                //         marker.subMarkers.push(createMarker('',data.subMarkers[i], true))
                //     }
                // }
                return marker
            },
            //获取一级覆盖物
            setFirstLevelMarker(){
                const _vm = this
                //移除旧的marker
                _vm.markers && _vm.map.remove(_vm.markers)
                _vm.map.clearMap()
                _vm.markers = []
                _vm.markderLevel = 1
                _vm.lockMarkderLevel = false
                //获取RoadList并返回promise
                return _vm.setRoadList().then(res=> {
                    _vm.$store.state.base.roadList.filter(function (item) {
                        //RoadList的坐标信息正确
                        if (item.zuobiao && item.zuobiao.length > 1) {
                            //添加覆盖物
                            let marker = _vm.createMarker({
                                position: item.zuobiao.split(','),
                                info: `<p>${item.t_name}</p><p>${item.count}</p>`,
                                id: item.id
                            }, 'map-marker')

                            //为二级覆盖物准备的参数
                            marker.data['id'] = item.id
                            marker.data['t_name'] = item.t_name
                            marker.data['dqzuobiao'] = item.zuobiao

                            //将当前覆盖物添加到覆盖物集合
                            _vm.markers.push(marker)
                            //_vm.map.setFitView(_vm.markers)//地图调整到合适的范围来显示我们需要展示的markers。

                            //为marker绑定点击事件
                            marker.on('click', function (e) {
                                console.log('[Leo]click marker => ', e.target.data.id, e.target.data.t_name)
                                _vm.tagZoom = _vm.map.getZoom()
                                //commit查询参数
                                _vm.$store.commit(types.SET_INDEX_SEARCH_INFO, {quyu: e.target.data.id})
                                //_vm.lockMarkderLevel = true
                                //设置二级覆盖物
                                _vm.setSecondLevelMarker().then(res=> {
                                    //_vm.map.setZoomAndCenter(14, e.target.data.dqzuobiao.split(','))
                                    _vm.fitView = true//标记为自适应缩放比例
                                    _vm.map.setFitView(_vm.markers)//地图调整到合适的范围来显示我们需要展示的markers。
                                })
                            })
                        }
                    })
                })
            },
            //获取二级覆盖物
            setSecondLevelMarker(){
                const _vm = this
                //移除旧的marker
                _vm.markers && _vm.map.remove(_vm.markers)
                _vm.map.clearMap()
                _vm.markers = []
                _vm.markderLevel = 2
                //获取MapList并返回promise
                return _vm.setMapList().then(function (res) {
                    for (let item of res) {
                        if (item.zuobiao && item.zuobiao.length > 1) {
                            //二级覆盖物样式
                            let info = `
                                <img class="fire" src="${_vm.fire}"
                                    ${item.renzheng.toString() == "1" ? "style=\"display: inherit;\"" : ""}>
                                <div>
                                    <p>${item.p_name}</p>
                                    <p>${item['jiage']}</p>
                                </div>
                            `
                            let marker = _vm.createMarker({
                                position: item.zuobiao.split(','),
                                info
                            }, 'map-marker__2')

                            //详情页面需要的参数
                            marker.data['id'] = item.id
                            marker.data['zuobian'] = item.zuobiao
                            marker.data['tel'] = item.tel
                            marker.data['jiage'] = item.jiage
                            marker.data['name'] = item.p_name

                            _vm.markers.push(marker)
                            //_vm.map.setFitView(_vm.markers)//地图调整到合适的范围来显示我们需要展示的markers。
                            marker.on('click', _vm.clicksecondLevelMarker)
                        }
                    }
                    return res
                })
            },
            clicksecondLevelMarker(e){
                let data = e.target.data
                console.log('[Leo]点击二级覆盖物 => 进入详情页 => ', data)
                window.localStorage.setItem('detailTitle', data['name'])
                window.localStorage.setItem('detailTel', data['tel'])
                window.localStorage.setItem('detailXY', data['zuobian'])
                //window.location.href = 'h5/view/product_info.php?id=' + data['id']
                window.location.href = 'detail_product.html?id=' + data['id']
            }
        },
        created(){
        },
        mounted(){
            const _vm = this
            _vm.$nextTick(function () {
                _vm.init()
            })
        }
    }
</script>
<style>
    #map {
        width: 100%;
        height: 100%;
    }

    .map-marker,
    .map-marker__2 {
        width: 45px;
        height: 45px;
        overflow: hidden;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-direction: row;
        flex-direction: row;
        border: 1px solid #fff;
        background-color: #fc4a46;
        text-align: center;
        color: #fff;
        font-family: Arial, "Microsoft YaHei UI", "微软雅黑", Verdana, sans-serif;
        font-size: 10px;
        line-height: 13px;
    }

    .map-marker {
        border-radius: 50%;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
    }

    .map-marker__2 {
        border-radius: 10px;
        width: auto;
        height: auto;
        white-space: nowrap;
        padding: 5px 10px 15px 10px;
        border: none;
        background: url("../assets/talk.png") center center / 100% 100% no-repeat;
    }

    .map-marker .fire,
    .map-marker__2 .fire {
        display: none;
        width: 25px;
    }

    /*.amap-marker {
        -moz-transform: rotate(0deg) translate(-50%, -50%) !important;
        -webkit-transform: rotate(0deg) translate(-50%, -50%) !important;
        transform: rotate(0deg) translate(-50%, -50%) !important;
    }*/

    .amap-touch-toolbar .amap-zoomcontrol {
        right: 0px;
        bottom: -90px;
        width: 30px;
    }

    .amap-zoom-touch-minus, .amap-zoom-touch-plus {
        height: 35px;
    }

    .amap-zoom-touch-minus > div, .amap-zoom-touch-plus > div {
        line-height: 35px;
    }

    .amap-touch-toolbar .amap-zoomcontrol:after {
        top: 38px;
    }
</style>
