<template>
    <div class="_table">
        <el-row class="upload_wrapper">
            <el-button type="primary" size="mini">上传文件</el-button>
        </el-row>
        <el-table
        :data="tableData"
        stripe
        style="width: 100%">
            <el-table-column
                prop="UploadFileName"
                label="文件名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="uploadUser"
                label="上传者"
                width="180">
            </el-table-column>
            <el-table-column
                prop="uploadTime"
                label="上传时间">
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="downloadFile(scope.row)" >下载</el-button>
                    <el-button type="text" size="small" style="color: red;" @click="deleteFile(scope.row)">删除</el-button>
                </template>
                </el-table-column>
        </el-table>
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
                tableData: [{
                    UploadFileName: 'a.txt',
                    uploadUser: '王小虎',
                    uploadTime: '2021-04-23 10:23:33'
                }]
            }
        },
        created () {
        },
        mounted () {
        },
        methods: {
            downloadFile(row) {},
            deleteFile(row) {}
        }
    }

</script>
<style scoped lang="scss">
.home {
    width: 100%;
    height: 100%;
}
._table {
    width: 700px;
    margin: 0 auto;
}
.upload_wrapper {
    text-align: left;
    margin-bottom: 20px;
}
.user_wrapper {
    float: right;
    width: 100px;
}
</style>
