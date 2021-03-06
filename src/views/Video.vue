<template>
  <div class="wrapper">
    <ul v-show="!isShowVideo" class="tag-list">
      <li
        v-for="item in tagList"
        :key="item.tid"
        :class="[{ active: item.tid == currentTagId }, 'tag-item']"
        @click="handleTag(item.tid)"
      >
        <span>{{ item.name }}</span>
        <span class="tag-num">{{ item.count }}</span>
      </li>
      <li class="tag-item search">
        <a-input-search
          @input="handleInputChange"
          @search="onSearch"
          type="text"
          placeholder="搜索关键字"
        />
      </li>
    </ul>
    <ul v-show="!isShowVideo" class="video-list">
      <a-spin v-show="searchLoading" class="loading" size="large" />
      <li
        v-for="item in videoList"
        :key="item.aid"
        @click="handleVideo(item.aid)"
        class="video-item"
      >
        <img class="video-item-cover" :src="item.pic" />
        <article class="video-item-descript">
          <p class="video-item-p video-item-title">{{ item.title }}</p>
          <p class="video-item-p video-item-detail">
            <span class="video-item-detail-play">
              <a-icon type="caret-right" />
              {{ item.play | getPlay }}
            </span>
            <span>
              <a-icon type="clock-circle" />
              {{ item.created | getTime }}
            </span>
          </p>
        </article>
      </li>
      <li class="video-item empty-video-item" />
    </ul>
    <a-spin v-show="videoLoading" class="loading" size="large" />
    <a-pagination
      v-show="!isShowVideo"
      v-model="currentPage"
      :total="count"
      :pageSize="pageSize"
      @change="pageChange"
      size="normal"
      class="pagination"
    />
    <a-icon
      v-show="isShowVideo"
      @click="handleClose"
      type="close"
      class="close"
    />
    <iframe
      v-show="isShowVideo"
      :src="videoSrc"
      class="ifram"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
      @load="videoOnLoad"
    />
  </div>
</template>

<script>
import axios from 'axios'

// 需要采集视频的b站账号id
const USERID = 519510412
// 每页数据的长度
const PAGESIZE = 30
// b站访问成功时的code
const REQUEST_CODE = 200

export default {
  data() {
    return {
      tagList: [], // 标签列表
      currentTagId: -1, // 当前所在的标签id
      searchWorld: null, // 搜索词
      searchLoading: true, // 作品是否搜索中
      videoList: [], // 视频列表
      videoSrc: '', // 当前正在播放的视频地址
      isShowVideo: false, // 是否播放视频
      count: 0, // 视频总量
      currentPage: 1, // 当前页数
      pageSize: PAGESIZE, // 每页数量
      videoLoading: true // 视频是否加载中
    }
  },
  created() {
    // 获取首页的数据
    this.getUserPageVideo(USERID, this.currentPage, this.pageSize)
  },
  methods: {
    initData() {
      this.videoList = []
      this.tagList = [
        {
          name: '全部',
          tid: -1,
          count: 0
        }
      ]
    },
    /**获取某一用户分页后的视频作品
     * @param{Number} mid 需要采集的b用户id
     * @param{Number} page 第多少页的数据
     * @param{Number} pagesize 每页数据的长度
     * @return{Promise} 获取并处理分页后数据的promise
     */
    getUserPageVideo(mid, page, pagesize) {
      // 开启loading
      this.searchLoading = true
      return axios
        .get(
          'https://5e86f5d3d29490bd12ac9aa5--leetcode-jing.netlify.app/api/getVideoList',
          {
            params: {
              mid,
              page,
              pagesize
            }
          }
        )
        .then(res => {
          const {
            data: { data },
            status
          } = res
          // 判断请求是否成功
          if (status === REQUEST_CODE) {
            this.calculatUserPageData(data)
          }
        })
        .catch(() => {
          // 超时以及错误处理
        })
        .finally(() => {
          // 关闭loading
          this.searchLoading = false
        })
    },
    // 处理用户的某一页视频数据
    calculatUserPageData(data) {
      const { tlist, vlist, count } = data
      this.initData()
      // 调整标签数据的格式
      const tagList = [
        {
          name: '全部',
          tid: -1,
          count
        }
      ]
      Object.keys(tlist).forEach(key => {
        tagList.push(tlist[key])
      })
      // 设置标签列表,视频列表,总页数
      this.tagList = tagList
      this.videoList = vlist
      this.count = count
    },
    handleInputChange(e) {
      this.searchWorld = e.target.value
    },
    handleTag(tid) {
      this.currentTagId = tid
    },
    // 点击某一作品,打开iframe开始播放视频
    handleVideo(aid) {
      this.videoSrc = `//player.bilibili.com/player.html?aid=${aid}`
      this.isShowVideo = true
      this.videoLoading = true
    },
    // 视频加载完毕时
    videoOnLoad() {
      this.videoLoading = false
    },
    // 关闭ifram播放的视频
    handleClose() {
      this.isShowVideo = false
      this.videoSrc = ''
    },
    // 根据标题关键字搜索
    onSearch() {
      if (this.searchWorld) {
        this.getUserPageVideo(USERID, this.currentPage, this.pageSize).then(
          () => {
            const target = this.searchWorld.toLowerCase()
            this.videoList = this.videoList.filter(item => {
              return item.title.toLowerCase().indexOf(target) >= 0
            })
          }
        )
      } else {
        this.getUserPageVideo(USERID, this.currentPage, this.pageSize)
      }
    },
    pageChange(currentPage) {
      this.currentPage = currentPage
      // 获取某一页的数据
      this.initData()
      this.getUserPageVideo(USERID, this.currentPage, this.pageSize)
    }
  },
  filters: {
    getTime(time) {
      const date = new Date(time * 1000)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    getPlay(play) {
      return play >= 10000 ? `${(play / 10000).toFixed(1)}万` : play
    }
  }
}
</script>

<style lang="less" scoped>
@import './Video.pc.less';
@import './Video.mobile.less';
</style>
