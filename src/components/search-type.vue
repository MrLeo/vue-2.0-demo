/**
* @Date: 2016/10/22  0022  12:15
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <div class="mianlayer1">
        <div class="box">
            <div class="navlist2 no">
                <ul>
                    <li>不限</li>
                    <li>高端豪宅</li>
                    <li>花园洋房</li>
                    <li>高端豪宅</li>
                    <li>花园洋房</li>
                    <li>高端豪宅</li>
                    <li>花园洋房</li>
                    <li>高端豪宅</li>
                    <li>花园洋房</li>
                    <li>高端豪宅</li>
                    <li>花园洋房</li>
                    <li>高端豪宅</li>
                    <li>花园洋房</li>
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
