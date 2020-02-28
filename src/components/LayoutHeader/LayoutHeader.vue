<template>
  <div class="header w-1280">
    <div class="logo-area">
      <router-link to="/">
        <img src="../../assets/logo.png" alt="路西法" />
      </router-link>
    </div>
    <nav>
      <a-row type="flex" justify="start" align="middle">
        <a-col :span="4">
          <router-link to="/solution">题解</router-link>
        </a-col>
        <a-col :span="4">
          <router-link to="/everyday">每日一题</router-link>
        </a-col>
        <a-col :span="4">
          <router-link to="/download">下载专区</router-link>
        </a-col>
        <a-col :span="4">
          <router-link to="/video">视频专区</router-link>
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
    font: 600 20px 'Google Sans Display', Arial, Helvetica, sans-serif;
    text-shadow: 0px 0px 30px #00bcd4;
    color: #122c30;
    @keyframes hue {
      0% {
        filter: hue-rotate(0deg);
      }
      100% {
        filter: hue-rotate(-360deg);
      }
    }
    > div {
      flex: 0 0 70%;
      color: #156386;
      background-image: linear-gradient(92deg, #eb5628 0%, #feab3a 100%);
      animation: hue 100s infinite linear;
      background-clip: text;
    }
  }
}
</style>
