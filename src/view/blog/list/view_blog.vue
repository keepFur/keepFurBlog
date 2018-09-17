<template>
  <div>
    <Card>
        <h2 slot="title" style="text-align:center">{{title}}</h2>
        <span slot="extra">
           作者：{{author}} 分组： {{group}} 日期：{{createTime}}
        </span>
        <div v-html="content">
        </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'view_blog_page',
  components: {},
  data () {
    return {
      title: '十一届全国代表大会闭幕式',
      author: 'keepfur',
      createTime: '2018-8-20',
      group: '生活',
      content: `<p>Content of card</p>
        <p>Content of card</p>
        <p>Content of card</p>`
    }
  },
  methods: {
    handleChange (html, text) {
      console.log(html, text)
    },
    save () {
      this.$refs.editor.setHtml('<p>powered by wangeditor</p>')
    }
  }
}
</script>

<style scoped>
</style>
