<template>
  <div class="myDiv">
    <p>
      我們的使命是<span class="blue">匯整</span>全球<span class="red">資訊</span
      >，<span class="green">供大眾使用</span>，<span class="yellow"
        >使人人受惠</span
      >。
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  watch: {},
  computed: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.myDiv {
  font-size: 18px;
  p {
    color: #202124;
    font-family: 'Google Sans Display', Arial, Helvetica, sans-serif;
    font-weight: 400;
    .blue {
      color: #4285f4;
    }
    .red {
      color: #ea4335;
    }
    .green {
      color: #34a853;
    }
    .yellow {
      color: #f9ab00;
    }
  }
}
</style>
