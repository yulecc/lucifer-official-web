<template>
  <div>
    <div>
      <!-- Search for keywords -->
      <form @submit="searchAndUpdate" style="max-width:400px;margin:20px auto;">
        <a-input
          :value="keyword"
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
            :color="assignTagColor(tag.name)"
            @click="handleTagClick"
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
  computed: {},
  data() {
    return {
      keyword: '',
      problems: [],
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
    assignTagColor: function(str) {
      switch (str) {
        case 'Daily Question':
          return 'volcano'
        case 'Easy':
          return 'green'
        case 'LeetCode':
          return 'purple'
        case 'Medium':
          return 'cyan'
        case 'Hard':
          return 'brown'
        default:
          return '#bbb'
      }
    },
    handleInputChange(e) {
      this.keyword = e.target.value
    },
    handleTagClick(e) {
      const {
        target: { innerText }
      } = e
      this.loadData(0, `+label:"${innerText}"`)
    },
    async searchAndUpdate(e) {
      e.preventDefault()
      this.loadData(0)
    },
    getProblems: async (pageNumber, keyword, label) => {
      const config = {
        params: {
          state: 'all',
          githubClientSecret: '64ec9c15ee608c201f0b5f4b3fde881b07d2bc31',
          githubClientId: 'e6dafd54b96fcef74c56',
          page: pageNumber,
          // eslint-disable-next-line @typescript-eslint/camelcase
          per_page: 20
        }
      }
      keyword = keyword ? `+"${keyword}"` : ''
      const url = `https://api.github.com/search/issues?q=【每日一题】 ${keyword}${label ||
        ''}+repo:azl397985856/leetcode+in%3Atitle+is:issue`
      const result = await axios.get(url, config)
      const items = result.data.items
      const totalCount = result.data.total_count

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
    async loadData(current, label) {
      this.loading = true
      try {
        const { data, totalCount } = await this.getProblems(
          current || 0,
          this.keyword,
          label
        )
        this.data = data.map(item => {
          return {
            ...item,
            title: item.title.replace('【每日一题】- ', '')
          }
        })
        this.pagination.total = totalCount
        this.pagination.showTotal = total => `Total ${total} items`
        this.loading = false
      } catch (error) {
        alert(`Something went wrong: ${error.message}`)
        console.error(error.message)
        this.loading = false
      }
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

<style scoped>
.ant-tag {
  margin-bottom: 8px;
}
</style>
