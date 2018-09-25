<template>
  <div>
        <Tabs v-model="materialType">
          <TabPane label="图文消息" name="pictureword">
          </TabPane>
          <TabPane label="图片" name="picture">
          </TabPane>
          <TabPane label="视频" name="video">
          </TabPane>
        </Tabs>
        <Form ref="searchForm" :model="searchForm"  inline>
            <FormItem prop="user">
                <i-input type="text" style="width:400px;" clearable v-model="searchForm.keyword" placeholder="输入关键字搜索">
                </i-input>
            </FormItem>
            <FormItem>
                <Button  @click="searchHandler('formInline')">搜索</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="showCreate = true">创建</Button>
            </FormItem>
      </Form>
      <Row :gutter="8" v-if="materialType==='pictureword'">
        <i-col :span="6">
          <Card :span="6">
            <p slot="title">The standard card</p>
            <div>
              <p>Content of card</p>
              <p>Content of card</p>
              <p>Content of card</p>
            </div>
            <div class="card-action">
              <Button size="small" icon="ios-create" shape="circle" @click="showCreate = true" ></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="showCreate = true"></Button>
            </div>
          </Card>
        </i-col>
        <i-col :span="6">
          <Card :span="6">
            <p slot="title">The standard card</p>
            <div>
              <p>Content of card</p>
              <p>Content of card</p>
              <p>Content of card</p>
            </div>
            <div class="card-action">
              <Button size="small" icon="ios-create" shape="circle" @click="showCreate = true" ></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="showCreate = true"></Button>
            </div>
          </Card>
        </i-col>
        <i-col :span="6">
          <Card :span="6">
            <p slot="title">The standard card</p>
            <div>
              <p>Content of card</p>
              <p>Content of card</p>
              <p>Content of card</p>
            </div>
            <div class="card-action">
              <Button size="small" icon="ios-create" shape="circle" @click="showCreate = true"></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="showCreate = true"></Button>
            </div>
          </Card>
        </i-col>
        <i-col :span="6">
          <Card :span="6">
            <p slot="title">The standard card</p>
            <div>
              <p>Content of card</p>
              <p>Content of card</p>
              <p>Content of card</p>
            </div>
            <div class="card-action">
              <Button size="small" icon="ios-create" shape="circle" @click="showCreate = true" ></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="showCreate = true"></Button>
            </div>
          </Card>
        </i-col>
      </Row>
      <Row :gutter="8" v-if="materialType==='picture'">
        <i-col :span="6">
          <Card style="width:350px">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                Classic film
            </p>
            <a href="#" slot="extra">
                <Icon type="ios-loop-strong"></Icon>
                Change
            </a>
            <ul>
                <li>123131</li>
            </ul>
          </Card>
        </i-col>
        <i-col :span="6">
          <Card :span="6">
            <p slot="title">
            Classic film
            </p>
            <a href="#" slot="extra">
            <Icon type="ios-loop-strong"></Icon>
            Change
            </a>
            <div>
              <img src="@/assets/images/qq-fance.jpg"  width="100%"  alt="图片">
            </div>
            <div class="card-action">
              <Button size="small" icon="ios-create" shape="circle" @click="showCreate = true" ></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="showCreate = true"></Button>
            </div>
          </Card>
        </i-col>
        <i-col :span="6">
          <Card :span="6">
            <div>
              <img src="@/assets/images/qq-fance.jpg" width="100%"  alt="图片">
            </div>
            <div class="card-action">
              <Button size="small" icon="ios-create" shape="circle" @click="showCreate = true"></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="showCreate = true"></Button>
            </div>
          </Card>
        </i-col>
        <i-col :span="6">
          <Card :span="6">
            <div>
              <img src="@/assets/images/qq-fance.jpg" width="100%" alt="图片">
            </div>
            <div class="card-action">
              <Button size="small" icon="ios-create" shape="circle" @click="showCreate = true" ></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="showCreate = true"></Button>
            </div>
          </Card>
        </i-col>
      </Row>
      <Row :gutter="8" v-if="materialType==='video'">
        <i-col :span="6">
          <Card :span="6">
            <p slot="title">The standard card</p>
            <div>
              <p>Content of card</p>
              <p>Content of card</p>
              <p>Content of card</p>
            </div>
            <div class="card-action">
              <Button size="small" icon="ios-create" shape="circle" @click="showCreate = true" ></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="showCreate = true"></Button>
            </div>
          </Card>
        </i-col>
        <i-col :span="6">
          <Card :span="6">
            <p slot="title">The standard card</p>
            <div>
              <p>Content of card</p>
              <p>Content of card</p>
              <p>Content of card</p>
            </div>
            <div class="card-action">
              <Button size="small" icon="ios-create" shape="circle" @click="showCreate = true"></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="showCreate = true"></Button>
            </div>
          </Card>
        </i-col>
        <i-col :span="6">
          <Card :span="6">
            <p slot="title">The standard card</p>
            <div>
              <p>Content of card</p>
              <p>Content of card</p>
              <p>Content of card</p>
            </div>
            <div class="card-action">
              <Button size="small" icon="ios-create" shape="circle" @click="showCreate = true"></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="showCreate = true"></Button>
            </div>
          </Card>
        </i-col>
        <i-col :span="6">
          <Card :span="6">
            <p slot="title">The standard card</p>
            <div>
              <p>Content of card</p>
              <p>Content of card</p>
              <p>Content of card</p>
            </div>
            <div class="card-action">
              <Button size="small" icon="ios-create" shape="circle" @click="showCreate = true" ></Button>
              <Button size="small" icon="ios-trash" shape="circle" @click="showCreate = true"></Button>
            </div>
          </Card>
        </i-col>
      </Row>
    <Modal
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
    </Modal>
    <Modal
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
    </Modal>
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
export default {
  name: "material_list_page",
  components: {},
  data() {
    return {
      searchForm: {
        keyword: ""
      },
      materialType: "pictureword",
      groupList: [],
      showCreate: false,
      showUpdate: false,
      todoInfo: {
        title: "",
        content: "",
        createdDate: "",
        groupId: 1
      },
      columns: [
        {
          title: "标题",
          key: "title"
        },
        {
          title: "内容",
          key: "content"
        },
        {
          title: "分组",
          key: "groupName"
        },
        {
          title: "作者",
          key: "author"
        },
        {
          title: "日期",
          key: "createdDate",
          sortable: true
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: params.row.status === 1 ? "#5cadff" : "#ed4014"
                }
              },
              params.row.status === 1 ? "已完成" : "未完成"
            );
          }
        },
        {
          title: "操作",
          key: "actions",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      readTodoById(params.row.id).then(resData => {
                        if (resData.data.ret === 0) {
                          this.showUpdate = true;
                          this.todoInfo = resData.data.todo[0];
                        } else {
                          this.$Message.error(resData.data.msg);
                        }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deleteHandler(
                        params.row.id,
                        params.row.status === 1 ? 0 : 1
                      );
                    }
                  }
                },
                params.row.status === 1 ? "未完成" : "已完成"
              )
            ]);
          }
        }
      ],
      tableData: [],
      total: 0
    };
  },
  methods: {
    changePage() {},
    readTodoList() {
      readTodoList({
        limit: 20,
        offset: 1,
        keyword: this.searchForm.keyword,
        isSuper: 1
      })
        .then(res => {
          if (res.data.ret === 0) {
            this.tableData = res.data.rows;
            this.total = res.data.total;
          } else {
            this.$Message.success(res.data.msg);
          }
        })
        .catch(err => {
          this.$Message.success(err.message);
        });
    },
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
    },
    readGroupList() {
      readGroupList({
        limit: 20,
        offset: 1,
        type: 2
      }).then(resData => {
        if (resData.data.ret === 0) {
          this.groupList = resData.data.rows;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card-action {
  margin-top: 8px;
  text-align: right;
  & button:first-child {
    margin-right: 8px;
  }
}
</style>
