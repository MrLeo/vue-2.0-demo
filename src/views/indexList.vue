/**
* @Date: 2016/10/21  0021  16:05
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <div class="indexlist">
        <dl v-for="item in typeJianSuo">
            <dt :style="{
                backgroundImage:'url(http://www.loushijie.cn/'+item.p_url+')',
            }"><!--<img :src="'http://www.loushijie.cn/'+item.p_url">--></dt>
            <dd>
                <h3>{{item.p_name}}</h3>
                <h6>{{item.t_name}}</h6>
                <h4>{{item.adds}}</h4>
                <h5><span v-if="item.n_name">{{item.n_name}}</span></h5>
                <em>{{item.jiage}}</em>
            </dd>
        </dl>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    export default{
        name: 'list',
        data(){
            return {}
        },
        computed: {
            ...mapState({
                typeJianSuo: state=>state.base.typeJianSuo
            }),
            ...mapGetters({})
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions([
                'setTypeJianSuo'
            ])
            //TODO:分页，上拉加载更多
        },
        created(){
            const _vm = this
            _vm.setTypeJianSuo()
        },
        mounted(){
        }
    }
</script>
<style scoped>
    .indexlist dt {
        background-position: center;
        background-size: cover;
    }
</style>
