<template>
  <div class="footer-container">
    <div class="footer-upper">
      <div class="footer-col">
        <h4>Product</h4>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/">Lorem ipsum </router-link>
          </li>
          <li>
            <router-link to="/">dolor sit amet</router-link>
          </li>
          <li>
            <router-link to="/">consectetur adipisicing </router-link>
          </li>
          <li>
            <router-link to="/">elit. Qui quis</router-link>
          </li>
        </ul>
      </div>
      <div class="footer-col hidden-md">
        <h4>Features</h4>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/">Lorem ipsum </router-link>
          </li>
          <li>
            <router-link to="/">dolor sit amet</router-link>
          </li>
          <li>
            <router-link to="/">consectetur adipisicing </router-link>
          </li>
          <li>
            <router-link to="/">elit. Qui quis</router-link>
          </li>
        </ul>
      </div>
      <div class="footer-col hidden-md">
        <h4>Videos</h4>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/">Lorem ipsum </router-link>
          </li>
          <li>
            <router-link to="/">dolor sit amet</router-link>
          </li>
          <li>
            <router-link to="/">consectetur adipisicing </router-link>
          </li>
          <li>
            <router-link to="/">elit. Qui quis</router-link>
          </li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>News</h4>
        <ul>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/">Lorem ipsum </router-link>
          </li>
          <li>
            <router-link to="/">dolor sit amet</router-link>
          </li>
          <li>
            <router-link to="/">consectetur adipisicing </router-link>
          </li>
          <li>
            <router-link to="/">elit. Qui quis</router-link>
          </li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact Us</h4>
        <div class="image-container">
          <img src="../../assets/QRCode.jpg" alt="QR Code" />
        </div>
      </div>
    </div>
    <div class="footer-lower">
      © 2020 Lucifer. All rights reserved
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
      width: 15%;
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
        margin: 0 auto;
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
