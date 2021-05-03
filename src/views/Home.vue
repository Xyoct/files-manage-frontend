<template>
    <div class="_table">
        <el-row>
            <el-col :span="10">
                <el-input v-model="keyWord" clearable size="mini" placeholder="关键字搜索（文件名，上传者）"></el-input>
            </el-col>
            <el-col :span="6" class="search">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="search()"></el-button>
            </el-col>
        </el-row>
        <el-row class="upload_wrapper">
            <el-upload
                ref="upload"
                class="upload-demo"
                :action="actionUrl"
                :headers="headerSet"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :on-error="handleError"
                :before-remove="beforeRemove"
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">上传文件</el-button>
            </el-upload>
        </el-row>
        <el-table
        :data="tableData"
        stripe
        style="width: 100%">
            <el-table-column
                prop="fileName"
                label="文件名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="uploadUserName"
                label="上传者"
                width="180">
            </el-table-column>
            <el-table-column
                prop="date"
                label="上传时间"
                :formatter="formatDate"
                >
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
        <div class="_pagination">
            <el-pagination
                layout="prev, pager, next"
                @current-change='pageNumChange'
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {

        name: '',
        components: {
        },
        props: {
        },
        data () {
            return {
                actionUrl:  this.$baseUrl + 'api/upload-file/',
                headerSet: {
                    "token": localStorage.getItem('token') || ''
                },
                fileList: [],
                tableData: [],
                total: 0,
                keyWord: '',
                pageNum: 1
            }
        },
        created () {
            this.getList()
        },
        mounted () {
        },
        methods: {
            initGetList() {
                this.pageNum = 1
                this.keyWord = ''
                this.getList()
            },
            formatDate(row, column, cellValue, index) {
                return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
            },
            pageNumChange(pageNum) {
                this.pageNum = pageNum
                this.getList()
            },
            search() {
                this.pageNum = 1
                this.getList()
            },
            getList() {
                let _paramObj = {}
                if (this.keyWord) {
                    _paramObj.keyWord = this.keyWord
                }
                _paramObj.pageSize = 10
                _paramObj.pageNum = this.pageNum
                this.$axios.get('/file-list', {params: _paramObj}).then(res => {
                    if (res.code == 0) {
                        let data = res.data
                        this.tableData = data.fileList
                        this.total = data.total
                    } else {
                        this.$message.error(data.msg || `请求失败！`);
                    }

                })
            },
            handleSuccess(response, file, fileList) {
                this.$refs.upload.clearFiles()
                this.fileList = []
                if (response.code == 0) {
                    this.initGetList()
                    this.$message({
                        message: response.msg,
                        type: 'success'
                    })
                } else {
                    this.$message.error(response.msg || `上传出错，请重新上传！`);
                }
            },
            handleError(err, file, fileList) {
                this.$refs.upload.clearFiles()
                this.fileList = []
                this.$message.error(err || `上传出错，请重新上传！`);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            downloadFile(row) {
                let _url = this.$baseUrl + 'api/download/?fileName=' + row.fileName + '&filePath=' + row.dir
                window.location.href = _url
            },
            deleteFile(row) {
                this.$confirm('确定删除?', '提醒', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _paramObj = {
                        fileId: row._id
                    }
                    this.$axios.delete('/file-del', {params: _paramObj}).then(res => {
                        if (res.code == 0) {
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            })
                            this.getList()
                        } else {
                            this.$message.error(data.msg || `请求失败！`);
                        }

                    })
                }).catch(() => { });
                
            }
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
    margin: 20px 0;
}
.user_wrapper {
    float: right;
    width: 100px;
}
._pagination {
    margin-top: 20px;
    text-align: right;
}
.search {
    text-align: left;
    margin: 0 10px;
}
</style>
