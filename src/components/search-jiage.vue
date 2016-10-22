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
                    <li @click="selectJiage('')" :class="{hover:selected.jiage==''}">不限</li>
                    <li @click="selectJiage('1-1.5万')" :class="{hover:selected.jiage==['1-1.5万']}">1-1.5万</li>
                    <li @click="selectJiage('1.5-2.5万')" :class="{hover:selected.jiage=='1.5-2.5万'}">1.5-2.5万</li>
                    <li @click="selectJiage('2.5-3.5万')" :class="{hover:selected.jiage=='2.5-3.5万'}">2.5-3.5万</li>
                    <li @click="selectJiage('3.5-5万')" :class="{hover:selected.jiage=='3.5-5万'}">3.5-5万</li>
                    <li @click="selectJiage('5-6.5万')" :class="{hover:selected.jiage=='5-6.5万'}">5-6.5万</li>
                    <li @click="selectJiage('6.5-8万')" :class="{hover:selected.jiage=='6.5-8万'}">6.5-8万</li>
                    <li @click="selectJiage('8万以上')" :class="{hover:selected.jiage=='8万以上'}">8万以上</li>
                    <h6>自定义价格（元/平）
                        <input type="text" placeholder="最小" v-model="min">
                        <input type="text" placeholder="最大" v-model="max">
                        <button @click="inputJiage">确定</button>
                    </h6>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    export default{
        name: 'search-jiage',
        data(){
            return {
                selected: {
                    jiage: ''
                },
                min: '',
                max: ''
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
            selectJiage(type){
                this.selected.jiage = type
                this.setMapList(this.$store.state.base.indexSearch)
            },
            inputJiage(){
                this.selected.jiage = this.min + '-' + this.max
                this.setMapList(this.$store.state.base.indexSearch)
            }
        }
    }
</script>
<style scoped>
    .navlist2 li.hover {
        background: #e2e2e2;
    }
</style>
