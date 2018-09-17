<template>
  <div>
    <Form :model="formInfo" label-position="top">
        <FormItem label="分组">
            <Select v-model="formInfo.group">
                <Option value="work">工作</Option>
                <Option value="life">生活</Option>
            </Select>
        </FormItem>
        <FormItem label="标题">
            <Input v-model="formInfo.title"/>
        </FormItem>
        <FormItem label="内容">
            <editor ref="editor" :value="formInfo.content"/>
        </FormItem>
    </Form>
    <Button type="primary" @click="saveHandler">保存</Button>
  </div>
</template>

<script>
import Editor from '_c/editor'
export default {
  name: 'create_blog_page',
  components: {
    Editor
  },
  data () {
    return {
      formInfo: {
        title: '',
        group: 'work',
        content: '尽情发挥吧。。。。'
      }
    }
  },
  methods: {
    saveHandler () {
      this.$Message.info({
        content: '操作成功'
      })
      this.$router.push({
        name: 'blog_list_page'
      })
    }
  }
}
</script>

<style scoped>
</style>
