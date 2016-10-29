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
                    <li @click="selectType('','不限')" :class="{hover:indexSearch.type==''}">不限</li>
                    <li v-for="item in typeList"
                        @click="selectType(item.id,item.t_name)"
                        :class="{hover:indexSearch.type==item.id}">
                        {{item.t_name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import * as types from '../store/mutation-types'
    export default{
        name: 'search-type',
        props: [],
        data(){
            return {
                selected: {
                    type: ''
                }
            }
        },
        computed: {
            ...mapState({
                typeList: state=>state.base.typeList,
                indexSearch: state=>state.base.indexSearch
            }),
            ...mapGetters({
                //baseInfo: 'baseInfo'
            })
        },
        methods: {
            ...mapActions([
                'setRoadList',
                'setMapList'
            ]),
            selectType(type, title){
                this.selected.type = type
                this.$store.commit(types.SET_INDEX_SEARCH_INFO, this.selected)
                this.$store.state.base.tempVm.$emit('closeSerchInfo')
                this.$store.state.base.tempVm.$emit('setSelectedName', {type:title})
            }
        },
        created(){
            this.selected.type = this.indexSearch.type
        }
    }
</script>
<style scoped>
    .navlist2 li.hover {
        background: #e2e2e2;
    }
</style>
