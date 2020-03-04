<template>
  <div>
    <div>
      <!-- Search for keywords -->
      <form @submit="searchAndUpdate" style="max-width:400px;margin:20px auto;">
        <a-input
          @input="handleInputChange"
          type="text"
          placeholder="搜索关键字"
        />
      </form>
      <!-- Problem List -->
      <a-table
        style="max-width:1280px;margin:0 auto;box-sizing:content-box;"
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="name" slot-scope="titleAndUrl">
          <a :href="titleAndUrl.url" target="_blank">
            {{ titleAndUrl.title }}
          </a>
        </template>
        <template slot="tags" slot-scope="tags">
          <a-tag
            v-for="tag in tags"
            :key="tag.id"
            :color="
              tag.name === 'Daily Question'
                ? 'volcano'
                : tag.name === 'Easy'
                ? 'green'
                : tag.name === 'LeetCode'
                ? 'brown'
                : tag.name === 'Medium'
                ? 'cyan'
                : tag.name === 'Hard'
                ? 'cyan'
                : 'magenta'
            "
          >
            {{ tag.name }}
          </a-tag>
        </template>
        <template slot="locked" slot-scope="lock">
          {{ lock ? '🔒' : '' }}
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

// const - Column names for the table header
const columns = [
  {
    title: '题名',
    dataIndex: 'titleAndUrl',
    width: '40%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '标签',
    dataIndex: 'labels',
    scopedSlots: { customRender: 'tags' },
    width: '40%'
  },
  {
    title: '🔒',
    dataIndex: 'locked',
    scopedSlots: { customRender: 'locked' }
  }
]

export default {
  components: {},
  data() {
    return {
      keyword: '',
      problems: [],
      totalPages: 0,
      data: [],
      pagination: {
        defaultPageSize: 20,
        total: 0
      },
      loading: false,
      columns
    }
  },
  methods: {
    handleInputChange(e) {
      this.keyword = e.target.value
    },
    async searchAndUpdate(e) {
      e.preventDefault()
      this.loadData(0)
    },
    getProblems: async (pageNumber, keyword) => {
      const config = {
        params: {
          state: 'all'
        }
      }
      const url = keyword
        ? `https://api.github.com/search/issues?q=%E6%AF%8F%E6%97%A5%E4%B8%80%E9%A2%98+${keyword}+repo:azl397985856/leetcode&page=${pageNumber}&per_page=20`
        : `https://api.github.com/search/issues?q=%E6%AF%8F%E6%97%A5%E4%B8%80%E9%A2%98+repo:azl397985856/leetcode&page=${pageNumber}&per_page=20`
      const result = await axios.get(url, config)
      const {
        // eslint-disable-next-line @typescript-eslint/camelcase
        data: { items, total_count }
      } = result
      // eslint-disable-next-line @typescript-eslint/camelcase
      const totalCount = total_count
      return {
        data: items.map(item => {
          return {
            ...item,
            locked: item.title.includes('🔒'),
            titleAndUrl: {
              title: item.title.replace('【每日一题】- ', ''),
              url: item.html_url
            }
          }
        }),
        totalCount
      }
    },
    async loadData(current) {
      this.loading = true
      const { data, totalCount } = await this.getProblems(
        current ? current : 0,
        this.keyword
      )
      this.data = data.map(item => {
        console.log(item)
        return {
          ...item,
          title: item.title.replace('【每日一题】- ', '')
        }
      })
      this.pagination.total = totalCount
      this.loading = false
    },
    async handleTableChange(pagination, filters, sorter) {
      const { current } = pagination
      this.loadData(current)
    }
  },
  mounted: async function() {
    // initialize our data
    this.loadData(0)
  }
}
</script>

<style>
.ant-tag {
  margin-bottom: 8px;
}
</style>
