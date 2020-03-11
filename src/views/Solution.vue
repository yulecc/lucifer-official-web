<template>
  <div>
    <div v-if="loading" class="spinner-container">
      <a-spin size="large"></a-spin>
    </div>
    <div v-if="!loading" class="container">
      <div class="max-width-600-center">
        <a-alert
          v-if="hasError"
          message="很抱歉，目前请求无法执行，请稍候再试。"
          type="error"
        />
      </div>
      <h1>{{ title }}</h1>
      <div class="desc">
        <pre style="text-align: left;">
             {{ desc }}
        </pre>
      </div>
      <div style="text-align: left;" class="solution" v-html="solution"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MarkdownIt from 'markdown-it'
export default {
  data() {
    return {
      loading: true,
      hasError: false,
      title: '',
      desc: '',
      createDate: '',
      issueUrl: '',
      solution: ''
    }
  },
  methods: {
    showError() {
      this.hasError = true
      setTimeout(() => {
        this.hasError = false
      }, 5000)
    },
    async getProlem() {
      try {
        const res = await axios.get(
          `https://api.github.com/repos/azl397985856/leetcode/issues/${this.$route.params.id}?githubClientId=e6dafd54b96fcef74c56&githubClientSecret=64ec9c15ee608c201f0b5f4b3fde881b07d2bc31`
        )
        this.loading = false
        console.warn(res)
        this.title = res.data.title
        this.desc = res.data.body
        this.createDate = res.data.created_at
        this.issueUrl = res.data.comments_url
        return
      } catch (error) {
        this.showError()
        this.loading = false
      }
    },
    async getSolution() {
      try {
        const res = await axios.get(this.issueUrl)
        this.loading = false
        this.solution = (res.data[0] && res.data[0].body) || ''

        const md = new MarkdownIt()
        this.solution = md.render(this.solution)
        // console.warn(result)

        return
      } catch (error) {
        this.showError()
        this.loading = false
      }
    }
  },
  async mounted() {
    console.warn(this.$route.params.id)
    await this.getProlem()
    if (this.title) {
      this.getSolution()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  max-width: 1080px;
  margin: 30px auto;
}
.desc,
.solution {
  max-width: 800px;
  margin: 20px auto;
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
