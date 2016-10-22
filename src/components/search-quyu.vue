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
                        <li @click="selectQuyu('')" :class="{hover:selected.quyu==''}">不限</li>
                        <li v-for="item in baseInfo.quYuList"
                            :id="item.id"
                            @click="selectQuyu(item.id)"
                            :class="{hover:selected.quyu==item.id}">{{item.t_name}}
                        </li>
                    </ol>
                    <ol v-show="leftQuery.ditie">
                        <li @click="selectDitie('')" :class="{hover:selected.ditie==''}">不限</li>
                        <li v-for="item in baseInfo.diTieList"
                            :id="item.id"
                            @click="selectDitie(item.id)"
                            :class="{hover:selected.ditie==item.id}">{{item.t_name}}
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    export default{
        name: 'search-quyu',
        props: [],
        data(){
            return {
                leftQuery: {
                    quyu: true,
                    ditie: false
                },
                selected: {
                    quyu: '',
                    ditie: ''
                }
            }
        },
        computed: {
            ...mapGetters({
                baseInfo: 'baseInfo'
            })
        },
        methods: {
            ...mapActions([
                'setMapList'
            ]),
            chageLeft(type){
                for (let query in this.leftQuery)
                    this.leftQuery[query] = false
                this.leftQuery[type] = true
            },
            selectQuyu(type){
                this.selected.quyu = type
                this.setMapList(this.$store.state.base.indexSearch)
            },
            selectDitie(type){
                this.selected.ditie = type
                this.setMapList(this.$store.state.base.indexSearch)
            }
        }
    }
</script>
<style scoped>
    .navlist2 li.hover{ background:#e2e2e2;}
</style>
