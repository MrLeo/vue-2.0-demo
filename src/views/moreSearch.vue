/**
* @Date: 2016/10/22  0022  12:54
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <div id="search">

        <header>
            <router-link class="left" to="/map">&nbsp;〈&nbsp;</router-link>
            <h1>更多</h1>
            <div class="right"></div>
            <div class="clear"></div>
        </header>
        <div style=" height:52px;"></div>
        <div class="navlist1" style=" position:fixed; top:52px; bottom:60px; left:0; right:0; height:auto">
            <div class="left" style="position:absolute; top:0; bottom:0; height:auto">
                <ul>
                    <li>特色</li>
                    <li>户型</li>
                    <li>环线</li>
                    <li class="hover">附近</li>
                </ul>
            </div>
            <div class="right" style="position:absolute; top:0; bottom:0; height:auto; width:50%;">
                <ol>
                    <li class="hover">不限</li>
                    <li>小户型</li>
                    <li>低总价</li>
                    <li>精装修</li>
                    <li>小户型</li>
                    <li>低总价</li>
                    <li>精装修</li>
                    <li>密云区</li>
                </ol>
            </div>
        </div>
        <div style="height:60px;"></div>
        <div class="mainmenu">
            <a class="submit"></a>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    export default{
        name: '',
        components: {},
        props: [],
        data(){
            return {
                //currentView:''
            }
        },
        created(){
        },
        mounted(){
        },
        computed: {
            ...mapGetters({
                //baseInfo: 'baseInfo'
            })
        },
        watch: {},
        methods: mapActions([
            //'addToBaseInfo'
        ])
    }
</script>
<style scoped>

</style>
