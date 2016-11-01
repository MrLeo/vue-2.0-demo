/**
* @Date: 2016/11/1  0001  23:46
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <div>
        <!--<component :is="currentView"></component>-->
    </div>
</template>
<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    import * as types from '../store/mutation-types'
    export default{
        name: '',
        components: {},
        props: [],
        data(){
            return {
                //currentView:''
            }
        },
        watch: {},
        computed: {
            ...mapState({}),
            ...mapGetters({
                //baseInfo: 'baseInfo'
            })
        },
        methods: mapActions([
            //'addToBaseInfo'
        ]),
        created(){
        },
        mounted(){
        }
    }
</script>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
