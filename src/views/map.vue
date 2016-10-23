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
    export default{
        name: 'map',
        data(){
            return {
                map: null
            }
        },
        computed: {
            ...mapState({
                //mapList: state => state.base.mapList
            }),
            ...mapGetters({
                baseInfo: 'baseInfo'
            })
        },
        watch: {},
        methods: {
            ...mapActions([
                'setMapList'
            ]),
            init(){
                const _vm = this
                let zoom = 9
                _vm.map = new AMap.Map('map', {
                    center: [39.911940136336277, 116.40602523623816],
                    zoom: zoom
                })
                _vm.map.plugin(["AMap.ToolBar"], function () {
                    _vm.map.addControl(new AMap.ToolBar())
                })
                let markers = []
                let maps = _vm.setMapList(zoom)
                //                maps.then(res=> {
                //                    _vm.$store.state.base.mapList.filter(function (item) {
                //                        const info = item[1]
                //                        item.zuobiao && _vm.addMarker(info, item.zuobiao.split(','))
                //                    })
                //                })

                //使用监听，因为后面查询条件改变后需要重新渲染
                _vm.$store.watch(function (state) {
                    return state.base.mapList
                }, function (val) {
                    //移除旧的marker
                    markers && _vm.map.remove(markers)
                    markers = []
                    val.filter(item=> {
                        let count = 'count'
                        if (zoom > 8)count = 1
                        const info = `<p>${item.t_name}</p><p>${item[count]}</p>`
                        if (item.zuobiao) {
                            let marker = _vm.createMarker(info, {position: item.zuobiao.split(',')})
                            markers.push(marker)

                            //TODO：为marker绑定交互事件：①显示二级覆盖物；②进入详情页
                            //绑定p_name jiage 。
                            //项目点击到详情页需要id，zuobian，tel，jiage字段
                            //h5/view/news_info.php     咨询详情
                            //h5/view/product_info.php 项目详情
                            //当Marker点被点击的时候，我们将显示其下级的Marker标记，setFitView方法用来将地图调整到合适的范围来显示我们需要展示的markers。
                            //                            var _onClick = function (e) {
                            //                                if (e.target.subMarkers && e.target.subMarkers.length) {
                            //                                    _vm.map.add(e.target.subMarkers);
                            //                                    _vm.map.setFitView(e.target.subMarkers);
                            //                                    _vm.map.remove(markers)
                            //                                }
                            //                            }
                            //                            AMap.event.addListener(marker, 'click', _onClick);
                            //同时为地图绑定一个zoomend事件，当地图缩放结束后停留的级别小于8的时候将溢出所有市一级的标记
                            //                            var _onZoomEnd = function (e) {
                            //                                if (_vm.map.getZoom() < 8) {
                            //                                    for (var i = 0; i < markers.length; i += 1) {
                            //                                        _vm.map.remove(markers[i].subMarkers)
                            //                                    }
                            //                                }
                            //                            }
                            //                            AMap.event.addListener(_vm.map, 'zoomend', _onZoomEnd);
                        }
                    })
                })
            },
            createMarker(markerInfo, data, hide){
                const _vm = this
                //http://lbs.amap.com/api/javascript-api/guide/draw-on-map/marker-point/Marker多级展示的交互实现 + 绑定事件完成交互
                // 自定义点标记内容
                var markerContent = document.createElement("div");
                // 点标记中的图标
                var markerImg = document.createElement("img");
                markerImg.className = "markerlnglat";
                markerImg.src = "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png";
                markerContent.appendChild(markerImg);
                // 点标记中的文本
                var markerSpan = document.createElement("p");
                markerSpan.className = 'map-marker';
                markerSpan.innerHTML = markerInfo || "0";
                markerContent.appendChild(markerSpan);
                //定义marker
                let marker = new AMap.Marker({
                    //icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                    content: markerContent,
                    //title:data.name,
                    //offset: new AMap.Pixel(-30, 5),
                    //zIndex: data.count
                    position: data.position || [39.911940136336277, 116.40602523623816]
                });
                marker.subMarkers = [];
                if (!hide) {
                    marker.setMap(_vm.map);
                }
                //                //设置子marker
                //                if (data.subMarkers && data.subMarkers.length) {
                //                    for (var i = 0; i < data.subMarkers.length; i += 1) {
                //                        marker.subMarkers.push(createMarker('',data.subMarkers[i], true));
                //                    }
                //                }

                return marker
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

    .map-marker {
        position: absolute;
        top: 0px;
        left: -13px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: red;
        text-align: center;
        color: #fff;
        font-family: "Microsoft YaHei UI", "微软雅黑", Verdana, sans-serif;
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
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
    }
</style>
