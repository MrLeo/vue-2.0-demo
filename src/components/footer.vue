<template>
    <footer class="mainmenu">
        <ul>
            <router-link to="/map" tag="li" active-class="hover">
                <em></em>
                <p>首页</p>
            </router-link>
            <router-link to="/tehui" tag="li" active-class="hover">
                <em></em>
                <p>特惠</p>
            </router-link>
            <router-link to="/kuaixun" tag="li" active-class="hover">
                <em></em>
                <p>快讯</p>
            </router-link>
            <router-link to="/wode" tag="li" active-class="hover">
                <em></em>
                <p>我的</p>
            </router-link>
        </ul>
    </footer>
</template>
<script>
    export default{
        name: 'footer',
        props: [],
        data(){
            return {}
        }
    }
</script>
<style scoped></style>
