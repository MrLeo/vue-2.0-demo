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

                _vm.setMapList()

                _vm.$watch(function () {
                    return _vm.$store.state.base.mapList
                }, function (newVal, oldVal) {
                    for (let item of newVal) {
                        let zuobiao = item.zuobiao.split(',')
                        _vm.addMarker(5, zuobiao)
                    }
                })
            },
            addMarker(count, position){
                const _vm = this

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
                markerSpan.innerHTML = count || "0";
                markerContent.appendChild(markerSpan);

                let marker = new AMap.Marker({
                    //icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                    content: markerContent,
                    position: position || [116.398075, 39.908149]
                });
                marker.setMap(_vm.map);
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
