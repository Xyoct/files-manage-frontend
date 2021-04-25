<template>
    <div class="layout">
        <el-container>
            <el-header class="_header">
                <div class="user_wrapper">
                    <!-- <el-button type="text" size="small">登录</el-button> -->
                    <el-button type="text" size="small">admin</el-button>
                    <el-button type="text" size="small" @click='logout()'>登出</el-button>
                </div>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>
<script>

    export default {

        name: '',
        components: {
        },
        props: {
        },
        data () {
            return {}
        },
        created () {
        },
        mounted () {
        },
        methods: {
            logout() {}
        }
    }

</script>
<style scoped lang="scss">
.layout {
    width: 100%;
    height: 100%;
}
.user_wrapper {
    float: right;
    width: 100px;
}
</style>
