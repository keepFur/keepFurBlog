<template>
  <div>
    <Form :model="blogInfo" label-position="top">
        <FormItem label="分组">
            <Select v-model="blogInfo.groupId">
              <Option  v-for="(item,index) in groupList" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
        </FormItem>
        <FormItem label="标题">
            <Input v-model="blogInfo.title" placeholder="记得为你的博客取个好名字"/>
        </FormItem>
        <FormItem label="内容">
            <editor ref="editor" v-model="blogInfo.content"/>
        </FormItem>
    </Form>
    <Button type="primary" @click="saveHandler">保存</Button>
  </div>
</template>

<script>
import Editor from "_c/editor";
import { createBlog } from "@/api/blog";
import { readGroupList } from "@/api/group";
export default {
  name: "create_blog_page",
  components: {
    Editor
  },
  data() {
    return {
      blogInfo: {
        title: "",
        groupId: 1,
        authorId: 1,
        content: "尽情发挥吧。。。。"
      },
      groupList: []
    };
  },
  mounted() {
    this.readGroupList();
  },
  methods: {
    saveHandler() {
      createBlog(this.blogInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success("操作成功");
          this.$router.push({
            name: "blog_list_page"
          });
        } else {
          this.$Message.error(resData.data.msg);
        }
      });
    },
    readGroupList() {
      readGroupList({
        limit: 20,
        offset: 1,
        type: 1
      }).then(resData => {
        if (resData.data.ret === 0) {
          this.groupList = resData.data.rows;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
