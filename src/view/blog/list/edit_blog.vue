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
            <editor ref="editor" :cache="false" v-model="blogInfo.content"/>
        </FormItem>
    </Form>
    <Button type="primary" @click="saveHandler">保存</Button>
  </div>
</template>

<script>
import Editor from "_c/editor";
import { readBlogList, readBlogById, updateBlogById } from "@/api/blog";
export default {
  name: "edit_blog_page",
  components: {
    Editor
  },
  data() {
    return {
      blogInfo: {
        title: "",
        groupId: "1",
        content: ""
      }
    };
  },
  mounted() {
    readBlogById(this.$route.params.id).then(resData => {
      if (resData.data.ret === 0) {
        this.blogInfo = resData.data.blog[0];
        this.$refs.editor.setHtml(this.blogInfo.content);
      } else {
        this.$Message.success(resData.data.msg);
      }
    });
  },
  methods: {
    changeHandler(html, text) {
      this.blogInfo.content = html;
    },
    saveHandler() {
      updateBlogById(this.$route.params.id, this.blogInfo).then(resData => {
        if (resData.data.ret === 0) {
          this.$Message.success("操作成功");
          this.$router.push({
            name: "blog_list_page"
          });
        } else {
          this.$Message.success(resData.data.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
