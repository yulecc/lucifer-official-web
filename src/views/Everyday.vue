<template>
  <div>
    <h1>每日一题</h1>
    <div>
      <!-- Problem List -->
      <!-- <ProblemList problems="problems" /> -->
      <a-table
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="tags" slot-scope="tags">
          <a-tag v-for="tag in tags" :key="tag.id">
            {{ tag.name }}
          </a-tag>
        </template>
        <template slot="locked" slot-scope="lock">
          {{ lock ? '🔒' : '' }}
        </template>
      </a-table>
      <!-- Problem List Pagination -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import ProblemList from '../components/ProblemList/ProblemList'

const regex = /page=[0-9]+/g // This is for parsing the total number of pages needed
const parseTotalPageNumber = str => {
  return [...str.matchAll(regex)][2][0].replace(/\D/g, '') - 0
}
const columns = [
  {
    title: '题名',
    dataIndex: 'title',
    width: '40%'
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
  components: {
    // ProblemList
  },
  data() {
    return {
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
    getProblems: async pageNumber => {
      const config = {
        params: {
          state: 'all'
        }
      }
      const result = await axios.get(
        `https://api.github.com/repos/azl397985856/leetcode/issues?page=${pageNumber}&per_page=20&client_id=e6dafd54b96fcef74c56&client_secret=64ec9c15ee608c201f0b5f4b3fde881b07d2bc31`,
        config
      )
      const { data, headers } = result

      const totalPageNumber = headers.link
        ? parseTotalPageNumber(headers.link)
        : data.length < 1
        ? 0
        : 1

      console.log({
        data,
        totalPageNumber
      })
      return {
        data: data.map(item => {
          return {
            ...item,
            locked: item.title.includes('🔒')
          }
        }),
        totalPageNumber
      }
    },
    async handleTableChange(pagination, filters, sorter) {
      console.log(pagination)
      this.loading = true
      const { current } = pagination
      const { data, totalPageNumber } = await this.getProblems(current)
      this.data = data
      this.pagination.total = totalPageNumber * 30
      this.loading = false
    }
  },
  mounted: async function() {
    // initialize our data
    this.loading = true
    const { data, totalPageNumber } = await this.getProblems(0)
    this.data = data
    this.pagination.total = totalPageNumber * 30
    this.loading = false
  }
}
</script>

<style></style>
