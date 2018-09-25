<template>
  <div>
      <Tabs v-model="materialType">
        <TabPane label="图片" name="picture">
        </TabPane>
        <TabPane label="音频" name="mp3">
        </TabPane>
        <TabPane label="视频" name="video">
        </TabPane>
        <Button size="small" slot="extra" type="primary">创建</Button>
      </Tabs>
      <Row>
        <Tabs>
          <TabPane label="全部"></TabPane>
          <TabPane label="分组1"></TabPane>
          <TabPane label="分组1"></TabPane>
          <TabPane label="分组1"></TabPane>
          <Button size="small" slot="extra" icon="md-add"></Button>
        </Tabs>
      </Row>
      <Row :gutter="8" v-if="materialType==='picture'">
        <i-col :span="6" v-for="(item,index) in picture" :key="index">
          <Card>
            <p slot="title">{{item.name}}</p>
            <div>
              <img :src="item.path" width="100%" alt="picture">
            </div>
            <div class="card-action" slot="extra">
              <Button size="small" icon="md-swap" shape="circle" @click="showCreate = true"></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="showDelete = true"></Button>
            </div>
          </Card>
        </i-col>
      </Row>
      <Row :gutter="8" v-if="materialType==='mp3'">
        <i-col :span="8" v-for="(item,index) in mp3" :key="index">
          <Card>
            <p slot="title">{{item.name}}</p>
            <div style="text-align:center;">
              <audio :src="item.path" controls="controls">
                您的浏览器不支持音频功能，建议更新到新版本。
              </audio>
            </div>
            <div class="card-action" slot="extra">
              <Button size="small" icon="md-swap" shape="circle" @click="showCreate = true"></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="showDelete = true"></Button>
            </div>
          </Card>
        </i-col>
      </Row>
      <Row :gutter="8" v-if="materialType==='video'">
        <i-col :span="6" v-for="(item,index) in video" :key="index">
          <Card>
            <p slot="title">{{item.name}}</p>
            <div>
              <video :src="item.path" controls="controls" width="100%" height="200px">
                您的浏览器不支持 video 标签。
              </video>
            </div>
            <div class="card-action" slot="extra">
              <Button size="small" icon="ios-trash" shape="circle" @click="showDelete = true"></Button>
            </div>
          </Card>
        </i-col>
      </Row>
      <Modal v-model="showDelete" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>确认删除</span>
        </p>
        <div style="text-align:center">
            <p>删除之后数据将会丢失</p>
            <p>确定删除吗？</p>
        </div>
        <div slot="footer">
            <Button size="small" @click="showDelete=false">取消</Button>
            <Button type="error" size="small" @click="deleteHandler">确认</Button>
        </div>
    </Modal>
    <!-- <Modal
        v-model="showCreate"
        title="创建"
        @on-ok="createHandler"
        @on-cancel="showCreate=false">
        <Form :model="todoInfo" :label-width="80">
            <FormItem label="标题">
                <Input v-model="todoInfo.title" />
            </FormItem>
            <FormItem label="分组">
                <Select v-model="todoInfo.groupId">
                    <Option  v-for="(item,index) in groupList" :key="index" :value="item.id">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="日期">
                <Row>
                    <i-col span="11">
                        <DatePicker type="datetime" v-model="todoInfo.createdDate" format="yyyy-MM-dd HH:mm"></DatePicker>
                    </i-col>
                </Row>
            </FormItem>
            <FormItem label="内容">
                <Input v-model="todoInfo.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
            </FormItem>
        </Form>
    </Modal> -->
    <!-- <Modal
        v-model="showUpdate"
        title="修改"
        @on-ok="updateHandler"
        @on-cancel="showUpdate=false">
        <Form :model="todoInfo" :label-width="80">
            <FormItem label="标题">
                <Input v-model="todoInfo.title" />
            </FormItem>
            <FormItem label="分组">
                <Select v-model="todoInfo.groupId">
                    <Option  v-for="(item,index) in groupList" :key="index" :value="item.id">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="日期">
                 <DatePicker type="datetime" v-model="todoInfo.createdDate" format="yyyy-MM-dd HH:mm"></DatePicker>
            </FormItem>
            <FormItem label="内容">
                <Input v-model="todoInfo.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
            </FormItem>
        </Form>
    </Modal> -->
  </div>
</template>

<script>
import {
  readTodoList,
  readTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById
} from "@/api/todo";
import { mapMutations } from "vuex";
import { readGroupList } from "@/api/group";
import img from "@/assets/images/qq-fance.jpg";
import mp4 from "@/assets/videos/test.mp4";
import mp3 from "@/assets/audios/test.mp3";
// 1,图文素材不需要
export default {
  name: "material_list_page",
  components: {},
  data() {
    return {
      searchForm: {
        keyword: ""
      },
      materialType: "picture",
      groupList: [],
      mp3: [
        {
          id: 1,
          name: "马云",
          path: mp3
        },
        {
          id: 2,
          name: "李彦宏.mp3",
          path: mp3
        },
        {
          id: 3,
          name: "习近平.mp3",
          path: mp3
        }
      ],
      picture: [
        {
          id: 1,
          name: "马云.jpg",
          path: img
        },
        {
          id: 2,
          name: "刘强东.jpg",
          path: img
        },
        {
          id: 3,
          name: "马化腾.jpg",
          path: img
        }
      ],
      video: [
        {
          id: 1,
          name: "刘强东.mp4",
          path: mp4
        },
        {
          id: 2,
          name: "马云.mp4",
          path: mp4
        },
        {
          id: 3,
          name: "马云.mp4",
          path: mp4
        }
      ],
      showCreate: false,
      showUpdate: false,
      showDelete: false
    };
  },
  methods: {
    createHandler() {
      createTodo(this.todoInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.readTodoList();
          this.$Message.success("操作成功");
          this.todoInfo = {};
          this.showCreate = false;
        } else {
          this.$Message.error(resData.data.msg);
        }
      });
    },
    searchHandler() {
      this.readTodoList();
    },
    deleteHandler(id, status) {
      deleteTodoById(id, status).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success("操作成功");
          this.readTodoList();
        } else {
          this.$Message.success(resData.data.msg);
        }
      });
    },
    updateHandler() {
      updateTodoById(this.todoInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success("操作成功");
          this.todoInfo = {};
          this.showUpdate = false;
          this.readTodoList();
        } else {
          this.$Message.success(resData.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card-action {
  & button:first-child {
    margin-right: 8px;
  }
}
</style>
