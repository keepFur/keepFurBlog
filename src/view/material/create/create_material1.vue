<style lang="less">
@import "./common.less";
</style>
<template>
  <div>
    <Form :model="martialInfo" label-position="top">
        <FormItem label="类型">
            <Select v-model="martialInfo.type" ref="type">
              <Option value="1">图片</Option>
              <Option value="2">音频</Option>
              <Option value="3">视频</Option>
            </Select>
        </FormItem>
        <FormItem label="分组">
            <Select v-model="martialInfo.groupId">
              <Option value="1">生活</Option>
              <Option value="2">工作</Option>
              <Option value="3">爱情</Option>
            </Select>
        </FormItem>
        <FormItem label="文件">
            <Row>
              <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
                    <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
              </div>
              <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :on-success="handleSuccess"
                  :format="getFormat()"
                  :accept="getAccept()"
                  :max-size="maxSize"
                  :data="martialInfo"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  :headers="uploadHeader"
                  type="drag"
                  name="material"
                  action="/api/material/create_material"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                      <Icon type="ios-cloud-upload-outline" size="40"  color="#2d8cf0"/>
                  </div>
              </Upload>
              <Modal title="图片预览" v-model="visible">
                  <img :src="imgName" style="width: 100%">
              </Modal>
            </Row>
        </FormItem>
    </Form>
    <Button type="primary" @click.native="saveHandler">保存</Button>
  </div>
</template>
<script>
// todo
// 1，素材类型的接口
// 2，新建素材接口
// 3，素材展示接口，按照类别，支持分页
// 4，素材的删除
// 5，素材的分组转移
import { createMaterial, readMaterialList } from "@/api/material";
export default {
  name: "create_material",
  data() {
    return {
      martialInfo: {
        type: "1",
        groupId: "1"
      },
      uploadHeader: {
        "Content-Type": "multipart/form-data"
      },
      maxSize: 4096,
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  methods: {
    getFormat() {
      var f = [["PNG", "JPEG", "SVG", "JPG"], ["MP3"], ["MP4"]];
      return f[(this.martialInfo.type - 1) | 0];
    },
    getAccept() {
      var a = [".PNG,.JPEG,.SVG,.JPG", ".MP3", ".MP4"];
      return a[(this.martialInfo.type - 1) | 0];
    },
    handleView(name) {
      const dir = ["images", "audios", "videos"];
      this.imgName = require(`@/assets/${dir[this.type - 1]}/${name}`);
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "格式错误",
        desc:
          "文件" +
          file.name +
          "格式错误，请选择" +
          this.getAccept() +
          "类型的文件"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "大小不符",
        desc: "文件  " + file.name + " 太大了, 不得大于" + this.maxSize
      });
    },
    handleBeforeUpload(file) {
      const check = this.uploadList.length < 9;
      if (!check) {
        this.$Notice.warning({
          title: "一次最多最多上传9张"
        });
      } else {
        this.uploadList.push(file);
      }
      return check;
    },
    saveHandler() {
      debugger;
      createMaterial({
        file: this.uploadList,
        groupId: this.martialInfo.groupId,
        authorId: 1,
        type: this.martialInfo.type
      }).then(resData => {
        console.log(resData);
      });
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    readMaterialList({
      isSuper: 1,
      limit: 20,
      offset: 1
    }).then(resData => {
      console.log(resData);
    });
  }
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>