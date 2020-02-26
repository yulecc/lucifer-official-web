<template>
  <div class="footer-container">
    <div class="footer-upper">
      <div class="footer-col">
        <h4>常用链接</h4>
        <ul>
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/">每日一题</router-link>
          </li>
          <li>
            <router-link to="/">题解</router-link>
          </li>
          <li>
            <router-link to="/">力扣中国</router-link>
          </li>
          <li>
            <router-link to="/">下载专区</router-link>
          </li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>视频</h4>
        <ul>
          <li>
            <router-link to="/">今日更新</router-link>
          </li>
          <li>
            <router-link to="/">面试专题</router-link>
          </li>
          <li>
            <router-link to="/">算法分类</router-link>
          </li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>微信公众号</h4>
        <div class="image-container">
          <img src="../../assets/QRCode.jpg" alt="QR Code" />
        </div>
      </div>
    </div>
    <div class="footer-lower">
      © 2020 Lucifer. 保留所有权利
    </div>
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
img {
  width: 100%;
}
.footer-container {
  margin: 0 auto;
  max-width: 1200px;
  width: 90%;
  .footer-upper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .footer-col {
      width: 25%;
      min-width: 160px;
      margin-right: 5%;
      text-align: left;
      .image-container {
        max-width: 124px;
      }
      h4 {
        font-size: 20px;
        color: #ffffff;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
      }
      ul {
        padding-left: 0;
        list-style: none;
        li {
          margin-bottom: 6px;
        }
        a {
          color: #fff;
        }
        a:hover {
          color: #ccc;
        }
      }
    }
    .footer-col:last-child {
      margin-right: 0;
    }
    @media screen and (max-width: 768px) {
      .hidden-md {
        display: none;
      }
    }
    @media screen and (max-width: 520px) {
      .footer-col,
      .footer-col:last-child {
        text-align: center;
        margin: 0 auto 20px;
        .image-container {
          max-width: 100%;
        }
      }
    }
  }
  .footer-lower {
    margin-top: 40px;
    color: #e3e3e3;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>
