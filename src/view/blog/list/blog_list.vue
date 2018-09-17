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
                <Button type="primary" @click="createHandler">创建</Button>
            </FormItem>
      </Form>
      <Table :data="tableData" :columns="columns" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="tableData.length" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { getTableData } from '@/api/data'
import { mapMutations } from 'vuex'
export default {
  name: 'blog_list_page',
  components: {},
  data () {
    return {
      searchForm: {
        keyword: ''
      },
      columns: [
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '内容摘要',
          key: 'content_simple'
        },
        {
          title: '分组',
          key: 'group'
        },
        {
          title: '作者',
          key: 'author'
        },
        {
          title: '日期',
          key: 'createTime',
          sortable: true
        },
        {
          title: '操作',
          key: 'actions',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'default',
                    size: 'small'
                  },
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.viewHandler(params.row.id)
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'default',
                    size: 'small'
                  },
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.editHandler(params.row.id)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'default',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.deleteHandler(params.row.id)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    ...mapMutations(['addTag']),
    handleDelete (params) {
      console.log(params)
    },
    changePage () {},
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    createHandler () {
      this.$router.push('create_blog_page')
    },
    searchHandler () {
      if (this.searchForm.keyword.trim()) {
        this.tableData = this.tableData.filter((item, index) => {
          return (
            item.title.search(this.searchForm.keyword) !== -1 ||
            item.content_simple.search(this.searchForm.keyword) !== -1
          )
        })
      } else {
        this.tableData = this.oldTableData
      }
    },
    viewHandler (id) {
      const route = {
        name: 'view_blog_page',
        params: {
          id
        },
        meta: {
          title: `浏览博客-${id}`
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    deleteHandler (id) {
      this.tableData = this.tableData.filter(item => {
        return item.id !== id
      })
    },
    editHandler (id) {
      const route = {
        name: 'edit_blog_page',
        params: {
          id
        },
        meta: {
          title: `编辑博客-${id}`
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    }
  },
  mounted () {
    getTableData().then(res => {
      this.tableData = res.data
      this.oldTableData = res.data
    })
  }
}
</script>

<style>
</style>
