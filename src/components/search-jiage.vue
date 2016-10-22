/**
* @Date: 2016/10/22  0022  12:14
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <div class="mianlayer1">
        <div class="box">
            <div class="navlist2 no">
                <ul>
                    <li>不限</li>
                    <li>1-1.5万</li>
                    <li>1.5-2.5万</li>
                    <li>1.5-2.5万</li>
                    <li>1-1.5万</li>
                    <li>1.5-2.5万</li>
                    <li>1-1.5万</li>
                    <li>1-1.5万</li>
                    <h6>自定义价格（元/平）<input type="text" placeholder="最小"><input type="text" placeholder="最大">
                        <button>确定</button>
                    </h6>
                </ul>
            </div>
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
            return {}
        },
        created(){
        },
        mounted(){
        },
        computed: {
            ...mapGetters({
                baseInfo: 'baseInfo'
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
