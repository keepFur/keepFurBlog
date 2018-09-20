<template>
  <div>
    <Card>
      <Form ref="searchForm" :model="searchForm"  inline>
            <FormItem prop="user">
                <i-input type="text" style="width:400px;" clearable v-model="searchForm.keyword" placeholder="输入关键字搜索">
                </i-input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="searchHandler('formInline')">搜索</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="showCreate=true">创建</Button>
            </FormItem>
      </Form>
      <Table :data="tableData" :columns="columns" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="tableData.length" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </Card>
    <Modal
        v-model="showCreate"
        title="创建"
        @on-ok="createHandler"
        @on-cancel="showCreate=false">
        <Form ref="createForm" :model="createForm">
            <FormItem>
                <i-input type="text" autofocus clearable v-model="createForm.name" placeholder="输入名称"/>
            </FormItem>
      </Form>
    </Modal>
    <Modal
        v-model="showUpdate"
        title="编辑"
        @on-ok="updateHandler"
        @on-cancel="showUpdate=false">
        <Form ref="updateForm" :model="updateForm">
            <FormItem>
                <i-input type="text" autofocus clearable v-model="updateForm.name"/>
            </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  readGroupList,
  createGroup,
  deleteGroupById,
  updateGroupById
} from "@/api/group";
import { mapMutations } from "vuex";
export default {
  name: "group_list_page",
  components: {},
  data() {
    return {
      searchForm: {
        keyword: ""
      },
      createForm: {
        name: ""
      },
      updateForm: {
        name: ""
      },
      showCreate: false,
      showUpdate: false,
      columns: [
        {
          title: "名称",
          key: "name"
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
              params.row.status === 1 ? "启用" : "禁用"
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
                      this.showUpdate = true;
                      this.updateForm.name = params.row.name;
                      this.updateForm.id = params.row.id;
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
                params.row.status === 1 ? "禁用" : "启用"
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  mounted() {
    this.readGroupList();
  },
  methods: {
    changePage() {},
    readGroupList() {
      readGroupList({
        limit: 20,
        offset: 1,
        keyword: this.searchForm.keyword,
        isSuper: 1,
        type: 1
      })
        .then(res => {
          if (res.data.ret === 0) {
            this.tableData = res.data.rows;
          } else {
            this.$Message.success(res.data.msg);
          }
        })
        .catch(err => {
          this.$Message.success(err.message);
        });
    },
    createHandler() {
      createGroup({
        name: this.createForm.name,
        type: 1,
        userId: 1
      }).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success("操作成功");
          this.readGroupList();
        } else {
          this.$Message.error(resData.data.msg);
        }
      });
    },
    searchHandler() {
      this.readGroupList();
    },
    deleteHandler(id, status) {
      deleteGroupById(id, status).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success("操作成功");
          this.readGroupList();
        } else {
          this.$Message.error(resData.data.msg);
        }
      });
    },
    updateHandler() {
      updateGroupById(this.updateForm.id, this.updateForm.name).then(
        resData => {
          if (resData.data.ret === 0) {
            this.$Message.success("操作成功");
            this.readGroupList();
          } else {
            this.$Message.error(resData.data.msg);
          }
        }
      );
    }
  }
};
</script>

<style>
</style>
