<template>
  <div class="header w-1280">
    <div class="logo-area">
      <router-link to="/">
        <img src="../../assets/logo.png" alt="路西法" />
      </router-link>
    </div>
    <nav>
      <a-row class="nav-row" type="flex" justify="start" align="middle">
        <a-col :span="4">
          <router-link to="/solution" class="nav-font">题解</router-link>
        </a-col>
        <a-col :span="4">
          <router-link to="/everyday" class="nav-font">每日一题</router-link>
        </a-col>
        <a-col :span="4">
          <router-link to="/download" class="nav-font">下载专区</router-link>
        </a-col>
        <a-col :span="4">
          <router-link to="/video" class="nav-font">视频专区</router-link>
        </a-col>
        <a-col :span="4" class="icon-new">
          <router-link to="/book" class="nav-font">我的新书</router-link>
        </a-col>
      </a-row>
    </nav>
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
.header {
  display: flex;
  align-items: center;
  height: 100%;
  .logo-area {
    flex: 0 0 100px;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  nav {
    display: flex;
    flex: 1;
    height: 100%;
    .nav-row {
      flex: 0 0 70%;
      .nav-font {
        color: #156386;
        font: 600 20px 'Google Sans Display', Arial, Helvetica, sans-serif;
        color: #156386;
      }
    }
  }
  .icon-new::after {
    content: 'new';
    position: absolute;
    top: -16px;
    right: -8px;
    font-size: 18px;
    font-weight: bold;
    color: red;
  }
}
</style>
