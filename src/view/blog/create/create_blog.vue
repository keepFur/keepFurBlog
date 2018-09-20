<template>
  <div>
    <Form :model="blogInfo" label-position="top">
        <FormItem label="分组">
            <Select v-model="blogInfo.groupId">
                <Option value="1">生活</Option>
                <Option value="2">工作</Option>
            </Select>
        </FormItem>
        <FormItem label="标题">
            <Input v-model="blogInfo.title"/>
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
export default {
  name: "create_blog_page",
  components: {
    Editor
  },
  data() {
    return {
      blogInfo: {
        title: "",
        groupId: "1",
        authorId: 1,
        content: "尽情发挥吧。。。。"
      }
    };
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
    }
  }
};
</script>

<style scoped>
</style>
