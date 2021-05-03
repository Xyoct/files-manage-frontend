<template>
    <div class="layout">
        <el-container>
            <el-header class="_header">
                <div class="user_wrapper">
                    <el-button type="text" v-if="!userName" size="small" @click="showLoginDialog()">登录</el-button>
                    <el-button type="text" v-if="userName" size="small">{{userName}}</el-button>
                    <el-button type="text" v-if="userName" size="small" @click='logout()'>登出</el-button>
                </div>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
        <el-dialog
            title="登录"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <div class="login_dialog">
                <el-row class="account_row">
                    <el-input v-model="account" placeholder="请输入账号"></el-input>
                </el-row>
                <el-row>
                    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click="login()">登 录</el-button>
            </span>
        </el-dialog>
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
            return {
                centerDialogVisible: false,
                userName: '',
                account: '',
                password: ''
            }
        },
        created () {
            this.userName = localStorage.getItem('account') || ''
        },
        mounted () {
        },
        methods: {
            showLoginDialog() {
                this.centerDialogVisible = true
            },
            login() {
                if (!this.account) {
                    this.$alert('账号不能为空！', '警告', {
                        type: 'error',
                        confirmButtonText: '确定',
                        callback: action => { }
                    });
                    return 
                }
                if (!this.password) {
                    this.$alert('密码不能为空！', '警告', {
                        type: 'error',
                        confirmButtonText: '确定',
                        callback: action => { }
                    });
                    return 
                }
                this.$axios.post('/login', {account: this.account, password: this.password}).then(res => {
                    if (res.code == 0) {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('account', res.data.account)
                        window.location.reload()
                    } else {
                        this.$alert(res.msg || '登录失败！', '警告', {
                            type: 'error',
                            confirmButtonText: '确定',
                            callback: action => { }
                        });
                    }

                })
            },
            logout() {
                this.$confirm('登出?', '提醒', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '登出成功!'
                    });
                    this.userName = ''
                    localStorage.removeItem('token')
                    localStorage.removeItem('account')
                    window.location.reload()
                }).catch(() => { });
            }
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
.account_row {
    margin-bottom: 20px;
}
</style>
