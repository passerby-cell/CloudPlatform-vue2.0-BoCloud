<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>数据服务</el-breadcrumb-item>
        <el-breadcrumb-item>数据集</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-row>
      <el-col :span="3">
        <el-card class="left-card" :body-style="{ padding: '0px' }"
          ><Transition
            appear
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <el-button
              style="margin-top: 10px; margin-left: 10px"
              type="primary"
              icon="el-icon-circle-plus-outline"
              size="mini"
              @click="parentFileDialogVisible = true"
              >新建</el-button
            >
          </Transition>
          <el-dialog
            title="新建数据集"
            :visible.sync="parentFileDialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-input
              placeholder="请输入新建的数据集名称"
              size="small"
              v-model="newParentFileName"
            ></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="parentFileDialogVisible = false" size="small"
                >取 消</el-button
              >
              <el-button type="primary" @click="createParentFile" size="small"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <el-divider></el-divider>
          <Transition
            appear
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <el-row>
              <el-table
              highlight-current-row
                :show-header="false"
                style="width: 100%"
                max-height="600px"
                :row-style="{ height: 0 + 'px' }"
                :cell-style="{ padding: 0 + 'px' }"
                :data="parentFileList"
              >
                <el-table-column
                  prop="name"
                  label="文件名"
                  align="left"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span
                      @click="updateFileList(scope.row.id, pageNum, null)"
                      class="parentIcon"
                      >{{ scope.row.name }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="right" width="60px">
                  <template slot-scope="scope">
                    <i
                      class="el-icon-edit-outline parentIcon"
                      @click="updateParentFileNameDialogVisible(scope.row)"
                    ></i>

                    <i
                      class="el-icon-delete parentIcon"
                      style="margin-left: 10px"
                      @click="deleteParentFile(scope.row.id)"
                    ></i>
                  </template>
                </el-table-column> </el-table
              ><el-dialog
                title="重命名数据集"
                :visible.sync="parentFileNameDialogVisible"
                width="30%"
                :before-close="handleClose"
              >
                <el-input
                  placeholder="请输入重命名的数据集名称"
                  size="small"
                  v-model="newParentFileName"
                ></el-input>
                <span slot="footer" class="dialog-footer">
                  <el-button
                    @click="parentFileNameDialogVisible = false"
                    size="small"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="updateParentFileName()"
                    size="small"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-row>
          </Transition>
        </el-card>
      </el-col>
      <el-col :span="21">
        <el-card
          :body-style="{ padding: '0px' }"
          style="height: 680px; margin-top: 10px; margin-left: 10px"
        >
          <el-row>
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-button
                style="margin-top: 10px; margin-left: 10px"
                type="primary"
                icon="el-icon-d-arrow-left"
                size="small"
                @click="goBack"
                >返回</el-button
              ></Transition
            >
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-button
                style="margin-top: 10px; margin-left: 10px"
                type="primary"
                icon="el-icon-folder-add"
                size="small"
                @click="fileDialogVisible = true"
                >新建文件夹</el-button
              >
            </Transition>
            <el-dialog
              title="新建文件夹"
              :visible.sync="fileDialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <el-input
                placeholder="请输入新建的文件名"
                size="small"
                v-model="newDirName"
              ></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="fileDialogVisible = false" size="small"
                  >取 消</el-button
                >
                <el-button type="primary" @click="newDir" size="small"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-dropdown
                @command="handleUpload"
                style="margin-top: 10px; margin-left: 10px"
              >
                <el-button type="primary" size="small" icon="el-icon-upload">
                  上传
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="uploadFile"
                    >上传文件</el-dropdown-item
                  >
                  <el-dropdown-item command="uploadFiles"
                    >上传文件夹</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </Transition>
            <el-dialog
              title="上传"
              :visible.sync="uploadDialogVisible"
              width="433px"
              :before-close="handleClose"
            >
              <el-upload
                style="margin-left: 15px"
                drag
                action
                :http-request="uploadFile"
                multiple
                :auto-upload="false"
                ref="upload"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip"></div>
              </el-upload>
              <span slot="footer" class="dialog-footer">
                <el-button @click="uploadDialogVisible = false" size="small"
                  >取 消</el-button
                >
                <el-button type="primary" size="small" @click="submitUpload"
                  >上 传</el-button
                >
              </span>
            </el-dialog>
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <a
                :href="
                  files == 'http://localhost:10086/data'
                    ? ''
                    : 'http://localhost:8080/file/downloadfiles?token=' +
                      localtoken +
                      '&name=' +
                      files +
                      '&dirpath=' +
                      dirpath
                "
              >
                <el-button
                  style="margin-top: 10px; margin-left: 10px"
                  type="primary"
                  icon="el-icon-download"
                  size="small"
                  >下载文件</el-button
                >
              </a></Transition
            >
            <!-- @click="downloadFiles" -->
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-button
                style="margin-top: 10px; margin-left: 10px"
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="deleteFiles"
                >删除选中</el-button
              ></Transition
            >
          </el-row>
          <el-row>
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-table
                ref="table"
                :data="childFileList"
                style="width: 100%; margin-left: 10px"
                max-height="600px"
                @select-all="selectTableAll"
                @select="selectFile"
              >
                <el-table-column width="80" type="selection">
                  <!-- <template slot-scope="scope">
            <el-checkbox @change="selectFile(scope.row)"></el-checkbox>
          </template>-->
                </el-table-column>
                <el-table-column
                  prop="fileName"
                  label="文件名"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-row>
                      <el-col :span="1">
                        <i
                          class="el-icon-folder"
                          v-if="(scope.row.fileType == 1)"
                        ></i>
                        <i
                          class="el-icon-document"
                          v-if="!(scope.row.fileType == 1)"
                        ></i>
                      </el-col>
                      <el-col :span="22" :offset="1">
                        <el-input
                          v-focus
                          size="mini"
                          v-model="scope.row.name"
                          v-if="isShow[scope.$index]"
                          :placeholder="scope.row.fileName"
                          @blur="updatename(scope.$index, scope.row)"
                          @focus="oldname = scope.row.fileName"
                          style="margin-left: 5px"
                        ></el-input>
                        <span
                          style="margin-left: 5px"
                          v-show="!isShow[scope.$index]"
                          @click="changeIsShow(scope.$index)"
                          >{{ scope.row.fileName }}</span
                        >
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="modifyTime"
                  label="修改时间"
                  width="300"
                ></el-table-column>
                <el-table-column
                  prop="fileSize"
                  label="大小"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column label="操作" width="400" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-button
                      style="margin-left: 10px"
                      type="primary"
                      icon="el-icon-view"
                      size="small"
                      v-if="scope.row.isfile == 1"
                      @click="previewFile(scope.row.name)"
                      >预览</el-button
                    >
                    <a
                      :href="
                        'http://localhost:8080/file/downloadfile?token=' +
                        localtoken +
                        '&name=' +
                        scope.row.name +
                        '&dirpath=' +
                        dirpath
                      "
                    >
                      <el-button
                        style="margin-left: 10px"
                        type="warning"
                        icon="el-icon-download"
                        size="small"
                        v-if="scope.row.isfile == 1"
                        >下载</el-button
                      >
                    </a>
                    <!-- @click="downloadFile(scope.row.name)" -->
                    <el-button
                      style="margin-left: 10px"
                      type="success"
                      icon="el-icon-folder-opened"
                      size="small"
                      v-if="!(scope.row.isfile == 1)"
                      @click="openDir(scope.row)"
                      >打开</el-button
                    >
                    <el-button
                      style="margin-left: 10px"
                      type="danger"
                      icon="el-icon-delete"
                      size="small"
                      @click="deleteFile(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </Transition>
          </el-row>
          <el-col style="text-align: center">
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-pagination
                :background="true"
                :page-sizes="[10, 20, 30]"
                :page-size="page"
                layout="prev, pager, next,sizes"
                :total="Number(totalRecord)"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              ></el-pagination>
            </Transition>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  reqParentFile,
  reqCreateParentFile,
  reqDeleteParentFile,
  reqUpdateParentFileName,
} from "@/api";
export default {
  name: "Data",
  data() {
    return {
      page: 10,
      isShow: [],
      //路径
      path: [],
      idpath: [],
      //选中的文件名
      checkedfile: [],
      //选中的文件id
      checkedfileid: [],
      // 新建文件夹的对话框
      fileDialogVisible: false,
      // 上传文件对话框
      uploadDialogVisible: false,
      parentFileDialogVisible: false,
      parentFileNameDialogVisible: false,
      // 新建文件夹的名称
      newDirName: "",
      // 旧文件的名称
      oldname: "",
      newParentFileName: "",
      newParentFileId: "",
    };
  },
  directives: {
    //注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        el.querySelector("input").focus();
      },
    },
  },
  computed: {
    ...mapState("File", [
      "parentFileList",
      "childFileList",
      "pageNum",
      "filePath",
      "totalRecord",
    ]),
    dirpath() {
      let dirpath = "";
      this.path.forEach((item) => {
        dirpath = dirpath + "/" + item;
      });
      return dirpath;
    },
    ids() {
      let ids = "";
      for (const element of this.checkedfileid) {
        ids += "/" + element;
      }
      return ids;
    },
    localtoken() {
      return localStorage.getItem("token");
    },
    files() {
      let files = "";
      for (const element of this.checkedfile) {
        files += "/" + element;
      }
      return files;
    },
  },
  methods: {
    updateParentFileNameDialogVisible(row) {
      this.parentFileNameDialogVisible = true;
      this.newParentFileName = row.name;
      this.newParentFileId = row.id;
    },
    async updateParentFileName() {
      let result = await reqUpdateParentFileName(
        this.newParentFileId,
        this.newParentFileName,
        "",
        6,
        1
      );
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "更新成功",
        });
        this.parentFileNameDialogVisible = false;
        this.updateParentFileList();
        this.newParentFileName = "";
      } else {
        this.$message.error("更新失败");
      }
    },
    async deleteParentFile(id) {
      alert("是否确认删除?");
      let result = await reqDeleteParentFile(id);
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.updateParentFileList();
      } else {
        this.$message.error("删除失败");
      }
    },
    async createParentFile() {
      //TODO:storageId type
      let result = await reqCreateParentFile(this.newParentFileName, "", 6, 1);
      if (result.code == "200") {
        this.parentFileDialogVisible = false;
        this.$message({
          type: "success",
          message: "新建成功",
        });
        this.updateParentFileList();
        this.newParentFileName = "";
      } else {
        this.$message.error("新建失败");
      }
    },
    changeIsShow(index) {
      let flag = !this.isShow[index];
      this.isShow.splice(index, 1, flag);
    },
    initShow() {
      if (this.childFileList != null) {
        for (let i = 0; i < this.childFileList.length; i++) {
          this.isShow.push(false);
        }
      }
    },
    previewFile(name) {
      let url = "http://127.0.0.1:8080/preview" + this.dirpath + "/" + name;
      // let url =
      //   'http://localhost:8080/file/downloadfile?token=' +
      //   this.localtoken +
      //   '&name=' +
      //   name +
      //   '&dirpath=' +
      //   this.dirpath
      // console.log(url)
      let Base64 = require("js-base64").Base64;
      window.open(
        "http://127.0.0.1:8012/onlinePreview?url=" +
          encodeURIComponent(Base64.encode(url))
      );
    },
    async deleteFiles() {
      let result = await reqDeleteFiles(
        this.localtoken,
        this.files,
        this.ids,
        this.dirpath
      );
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: result.message,
        });
      }
      let parentdirid = this.idpath[this.idpath.length - 1];
      this.updateFileList(this.pagenum, parentdirid);
      this.checkedfile = [];
      this.checkedfileid = [];
    },
    async deleteFile(row) {
      let result = await reqDeleteFile(
        this.localtoken,
        row.name,
        row.id,
        this.dirpath,
        row.isfile
      );
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: result.message,
        });
      }
      let parentdirid = this.idpath[this.idpath.length - 1];
      this.updateFileList(this.pagenum, parentdirid);
    },
    async uploadFile(files) {
      let dirpath = "";
      this.path.forEach((item) => {
        dirpath = dirpath + "/" + item;
      });
      let parentdirid = this.idpath[this.idpath.length - 1];

      const formData = new FormData();
      formData.append("file", files.file);
      let result = await reqUploadFile(
        localStorage.getItem("token"),
        localStorage.getItem("userid"),
        dirpath,
        parentdirid,
        formData
      );
      if (result.code == "200") {
        this.updateFileList(this.pagenum, parentdirid);
      } else {
        this.$message.error("上传失败");
      }
    },

    submitUpload() {
      this.$refs.upload.submit();
    },
    handleUpload(command) {
      this.uploadDialogVisible = true;
      if (command == "uploadFile") {
        this.$nextTick(() => {
          this.$refs.upload.$children[0].$refs.input.webkitdirectory = false;
        });
      } else {
        this.$nextTick(() => {
          this.$refs.upload.$children[0].$refs.input.webkitdirectory = true;
        });
      }
    },
    async newDir() {
      let dirpath = "";
      this.path.forEach((item) => {
        dirpath = dirpath + "/" + item;
      });
      let parentdirid = this.idpath[this.idpath.length - 1];
      let result = await reqMKDir(
        localStorage.getItem("token"),
        localStorage.getItem("userid"),
        this.newDirName,
        dirpath,
        parentdirid
      );
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "新建成功",
        });
        this.updateFileList(this.pagenum, parentdirid);
      } else {
        this.$message.error("新建失败:文件名重复!");
      }
      this.fileDialogVisible = false;
      this.newDirName = "";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    selectTableAll() {
      if (this.checkedfile.length >= this.filelist.length) {
        this.checkedfile = [];
        this.checkedfileid = [];
      } else {
        this.checkedfile = [];
        this.checkedfileid = [];
        this.filelist.forEach((item) => {
          this.checkedfileid.push(item.id);
          this.checkedfile.push(item.name);
        });
      }
    },
    selectFile(selection, row) {
      if (this.checkedfileid.includes(row.id)) {
        this.checkedfileid.forEach(function (item, index, arr) {
          if (item == row.id) {
            arr.splice(index, 1);
          }
        });
        this.checkedfile.forEach(function (item, index, arr) {
          if (item == row.name) {
            arr.splice(index, 1);
          }
        });
      } else {
        this.checkedfile.push(row.name);
        this.checkedfileid.push(row.id);
      }
      if (this.checkedfileid.length == this.filelist.length) {
        this.checkedall = true;
      } else {
        this.checkedall = false;
      }
    },
    goBack() {
      this.updateFileList(1, this.idpath[this.idpath.length - 2]);
      this.idpath.pop();
      this.path.pop();
    },
    openDir(row) {
      this.path.push(row.name);
      this.idpath.push(row.id);
      this.updateFileList(1, row.id);
    },
    updateFileList(parentId, val, filePath) {
      if (parentId == null && this.parentFileList.length > 0) {
        parentId = this.parentFileList[0].id;
      }
      this.$store.dispatch("File/getChildFileList", {
        dataId: parentId,
        filePath: filePath,
        current: val,
        size: this.page,
      });
      this.initShow();
    },
    async updateParentFileList() {
      let result = await reqParentFile(1, 0, 0);
      if (result.code == "200") {
        this.$store.dispatch("File/getParentFileList", result.data);
      }
      if (this.parentFileList != null) {
        this.updateFileList(this.parentFileList[0].id, this.pageNum, null);
      }
    },
    async updatename(index, row) {
      this.changeIsShow(index);
      let dirpath = "";
      this.path.forEach((item) => {
        dirpath = dirpath + "/" + item;
      });
      let result = await reqUpdataFileName(
        localStorage.getItem("token"),
        localStorage.getItem("userid"),
        row.name,
        this.oldname,
        row.id,
        dirpath
      );
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "修改成功",
        });
      } else {
        this.$message.error(result.message);
      }
    },
    handleCurrentChange(val) {
      let parentdirid = this.idpath[this.idpath.length - 1];
      this.updateFileList(val, parentdirid);
    },
    handleSizeChange(val) {
      this.page = val;
      let parentdirid = this.idpath[this.idpath.length - 1];
      this.updateFileList(1, parentdirid);
    },
  },
  async mounted() {
    let result = await reqParentFile(1, 0, 0);
    this.$store.dispatch("File/getParentFileList", result.data);
    if (result.code == "200" && result.data.length > 0) {
      this.$store.dispatch("File/getChildFileList", {
        dataId: result.data[0].id,
        filePath: null,
        current: 1,
        size: this.page,
      });
    }
    this.initShow();
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}
.left-card {
  margin-top: 10px;
  margin-left: 10px;
  height: 680px;
}
.el-button {
  padding-right: 10px;
  padding-left: 5px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.el-divider {
  background-color: #bcbfc8;
  height: 2px;
  margin: 4px 0;
}
.parentIcon {
  cursor: pointer;
}
</style>
