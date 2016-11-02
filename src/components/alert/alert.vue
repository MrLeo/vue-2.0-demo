/**
* @Date: 2016/11/1  0001  23:46
* @Author: lxbin
* Created with JetBrains WebStorm.
*/
<template>
    <transition name="l-alert-pop" >
        <div class="l-alert mask" v-show="visible">
            <section class="l-alert-content">
                <div><p>{{message}}</p></div>
                <footer class="l-alert-btns">
                    <a class="l-alert-btns__submit" @click="onClose">确定</a>
                </footer>
            </section>
        </div>
    </transition>
</template>
<script>
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
    import * as types from '../../store/mutation-types'
    export default{
        name: 'alert',
        components: {},
        props: {
            message: String
        },
        data(){
            return {
                visible:false
            }
        },
        watch: {},
        computed: {
            ...mapState({}),
            ...mapGetters({})
        },
        methods: {
            onClose(){
                const _vm = this
                console.log('[Leo] => onClose')
                _vm.visible = false
            }
        },
        created(){
        },
        mounted(){
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    .l-alert {
        &.mask {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 99999999999;
            background-color: rgba(0, 0, 0, .3);
        }
        &-content {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            min-width: 200px;
            min-height: 100px;
            display: flex;
            flex-flow: column;
            justify-content: center;
            background-color: #FFF;
            border-radius: 5px;
            & > div {
                position: relative;
                flex: 1;
                text-align: center;
            }
            p {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        &-btns {
            display: flex;
            text-align: center;
            border-top: 1px solid #efefef;
            &__submit {
                flex: 1;
                line-height: 35px;
                text-decoration: none;
                color: #1192d4;
            }
        }
        &-pop-enter-active, &-pop-leave-active {
            transition: opacity .3s
        }
        &-pop-enter, &-pop-leave-active {
            opacity: 0;
        }
    }
</style>
