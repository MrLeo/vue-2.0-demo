/**
* @Date: 2016/10/21  0021  16:05
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <div class="indexlist">
        <dl>
            <dt><img src="/static/images/index3.jpg"></dt>
            <dd>
                <h3>美泉园墅</h3>
                <h6>住宅－板房</h6>
                <h4>香堤楼盘位于北京东燕郊燕顺路北侧…</h4>
                <h5><span>学区房</span></h5>
                <em>100000元/平</em>
            </dd>
        </dl>
        <dl>
            <dt><img src="/static/images/index4.jpg"></dt>
            <dd>
                <h3>美泉园墅</h3>
                <h6>住宅－板房</h6>
                <h4>香堤楼盘位于北京东燕郊燕顺路北侧…</h4>
                <h5><span>不限购</span></h5>
                <em>待定</em>
            </dd>
        </dl>
        <dl>
            <dt><img src="/static/images/index5.jpg"></dt>
            <dd>
                <h3>美泉园墅</h3>
                <h6>住宅－板房</h6>
                <h4>香堤楼盘位于北京东燕郊燕顺路北侧…</h4>
                <em>100000元/平</em>
            </dd>
        </dl>
        <dl>
            <dt><img src="/static/images/index3.jpg"></dt>
            <dd>
                <h3>美泉园墅</h3>
                <h6>住宅－板房</h6>
                <h4>香堤楼盘位于北京东燕郊燕顺路北侧…</h4>
                <h5><span>学区房</span></h5>
                <em>100000元/平</em>
            </dd>
        </dl>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    export default{
        name: 'map',
        data(){
            return {}
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
