/**
* @Date: 2016/10/22  0022  12:07
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <div class="mianlayer1">
        <div class="box">
            <div class="navlist1">
                <div class="left">
                    <ul>
                        <li :class="{hover:leftQuery.quyu}" @click="chageLeft('quyu')">区域</li>
                        <li :class="{hover:leftQuery.ditie}" @click="chageLeft('ditie')">地铁</li>
                    </ul>
                </div>
                <div class="right">
                    <ol v-show="leftQuery.quyu">
                        <li class="hover">不限</li>
                        <li v-for="item in baseInfo.quYuList" :id="item.id">{{item.t_name}}</li>
                    </ol>
                    <ol v-show="leftQuery.ditie">
                        <li class="hover">不限</li>
                        <li v-for="item in baseInfo.diTieList" :id="item.id">{{item.t_name}}</li>
                    </ol>
                </div>
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
            return {
                leftQuery: {
                    quyu: true,
                    ditie: false
                }
            }
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
        methods: {
            ...mapActions([
                //'addToBaseInfo'
            ]),
            chageLeft(type){
                for (let query in this.leftQuery)
                    this.leftQuery[query] = false
                this.leftQuery[type] = true
            }
        }
    }
</script>
<style scoped>

</style>
