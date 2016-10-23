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
                _vm.map = new AMap.Map('map', {
                    center: [116.398075, 39.908149],
                    zoom: 8
                })
                _vm.map.plugin(["AMap.ToolBar"], function () {
                    _vm.map.addControl(new AMap.ToolBar())
                })
                let markers = []
                let maps = _vm.setMapList()
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
                        const info = item[1]
                        if (item.zuobiao) {
                            let marker = _vm.createMarker(info, {position: item.zuobiao.split(',')})
                            markers.push(marker)

                            //TODO：为marker绑定交互事件
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
                var markerSpan = document.createElement("span");
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
                    position: data.position || [116.398075, 39.908149]
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
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: red;
        text-align: center;
        color: #fff;
        line-height: 40px;
        font-family: "Microsoft YaHei UI", "微软雅黑", Verdana, sans-serif;
    }
</style>
