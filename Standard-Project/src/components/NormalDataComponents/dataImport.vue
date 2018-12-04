<template>
<div>
    <el-dialog :title="tagName" :visible.sync="dialogVisible" :close-on-click-modal="false">
        <el-upload
                ref="upLoad"
                class="upload-demo ensure ensureButt"
                drag
                :action="importFileUrl"
                :on-success="uploadSuccess" 
                :before-upload="beforeAvatarUpload"
                :auto-upload="false"
                multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xls、xlsx文件，且不超过10MB</div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="closeModal">取 消</el-button>
            <el-button type="primary" @click.native="successModal">确 定</el-button>
        </div>
    </el-dialog>
    </div>
</template>
<script>
import Axios from 'axios'
import { Message } from 'element-ui'
export default {
    name:'data-import',
    props:{
        dialogVisible :Boolean,
        required: true
    },
    data(){
        return {
            tagName: '导入数据',
            childDialogVisible : this.dialogVisible,
            importFileUrl : '',
        }
    },
    methods:{
        // 上传前对文件的大小的判断
            beforeAvatarUpload (file) {
                var fileName=new Array()
                fileName =file.name.split('.');
                const extension = fileName[fileName.length-1] === 'xls'
                const extension2 =  fileName[fileName.length-1]=== 'xlsx'
                const isLt2M = file.size / 1024 / 1024 < 10
                if (!extension && !extension2) {
                    this.$message({
                        message: '上传模板只能是xls、xlsx格式!',
                        type: 'warning'
                    });
                }
                if (!isLt2M) {
                    this.$message({
                        message: '上传模板大小不能超过 10MB!',
                        type: 'warning'
                    });
                }
                if (extension || extension2 && isLt2M == true) {
                    let fd = new FormData()
                    fd.append('invoiceTypeId', this.invoice_type_id)//随文件上传的其他参数
                    fd.append('epid', this.epid)
                    fd.append('file', file)
                    this.newImport(fd)
                    return true
                }
                return extension || extension2 && isLt2M
            },
            newImport (data) {
                const loading = this.$loading({
                    lock: true,
                    text: '正在导入，请稍后',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                var self = this
                Axios.post('/type/import_standard', data).then(function (res) {//成功后回调
                    let code = res;//返回json结果
                    let msg = res.status;
                    if(msg === 200){
                        console.log(res);
                        if(res.data.code  == "0201003"){
                                loading.close();
                                self.$alert('数据异常，请检查文件信息是否正确！', '导入失败', {
                                confirmButtonText: '确定',
                                dangerouslyUseHTMLString:true,
                                type: 'error',
                                callback: action => {
                                    return
                                }
                            });
                        }
                        if(res.data[0].indexOf("成功导入") != -1){
                            loading.close();
                            self.$emit('closeModal', self.childDialogVisible)
                            self.$alert(res.data[0], '导入成功', {
                                confirmButtonText: '确定',
                                type: 'success',
                                callback: action => {
                                    self.dialogFormVisible = true;
                                    location.reload();
                                }
                            });
                        }else{
                            loading.close();
                            self.childDialogVisible = false
                            self.$emit('closeModal', self.childDialogVisible)
                            var str = ''
                            for (var i = 0; i < res.data.length; i++) {
                                str += "<p style='margin-bottom:13px;'>"+(i+1)+"、"+ res.data[i]+"</p>"
                            }
                            self.$alert(str, '导入失败', {
                                confirmButtonText: '确定',
                                dangerouslyUseHTMLString:true,
                                type: 'error',
                                callback: action => {
                                    }
                            });
                        }
                    }
                        
                });
            },// 上传成功后的回调
            uploadSuccess (response) {
                let code = response;
                let msg = response.data
                if(msg === true){
                    Message.success({
                        message: "导入成功"
                        });
                        this.dialogFormVisible = true;
                    }else{
                        Message.error({
                            message: "导入失败"
                        });
                        this.dialogFormVisible = true;
                    }
            },
            // 上传错误
            uploadError (response) {
                this.open(!response, "文件导入异常！");
            },
            closeModal () {
                this.childDialogVisible = false
                this.$emit('closeModal', this.childDialogVisible)
            },
            successModal(){
                this.$refs.upLoad.submit()
                this.$emit('closeModal', this.childDialogVisible)
            }
        }
    }
</script>
<style>
 .el-message-box {
     width: 600px;
 }
</style>
