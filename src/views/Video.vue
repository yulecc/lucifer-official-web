<template>
  <div class="wrapper" ref="wrapper">
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
      <li class="tag-item">
        <a-input-search
          @input="handleInputChange"
          @search="onSearch"
          type="text"
          placeholder="搜索关键字"
        />
      </li>
    </ul>
    <ul v-show="!isShowVideo" class="video-list">
      <a-spin v-show="!currentVideoList.length" class="loading" size="large" />
      <li
        v-for="item in currentVideoList"
        :key="item.aid"
        @click="handleVideo(item.aid)"
        class="video-item"
      >
        <img :src="item.pic" />
        <article>
          <p class="video-item-title">{{ item.title }}</p>
          <p class="video-item-detail">
            <span style="margin-right:25px;">
              <a-icon type="caret-right" />
              {{ item.play }}
            </span>
            <span>
              <a-icon type="clock-circle" />
              {{ item.created | getTime }}
            </span>
          </p>
        </article>
      </li>
    </ul>
    <a-spin v-show="videoLoad" class="loading" size="large" />
    <a-pagination
      v-show="!isShowVideo"
      v-model="currentPage"
      :total="total"
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
      ref="ifr"
      :src="videoSrc"
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

const USERLIST = [511477625, 36074883]
const PAGESIZE = 20

export default {
  data() {
    return {
      tagList: [
        {
          name: '全部',
          tid: -1,
          count: 0
        }
      ],
      currentTagId: -1,
      searchWorld: null,
      videoList: [],
      currentVideoList: [],
      videoSrc: '',
      isShowVideo: false,
      currentPage: 1,
      pageSize: PAGESIZE,
      videoLoad: true // 视频是否加载中
    }
  },
  created() {
    this.getAllUserVideo(USERLIST)
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
    // 获取一组用户的作品
    getAllUserVideo(userList) {
      const taskList = userList.map(item => this.getUserAllVideo(item))
      return axios.all(taskList).then(res => {
        this.calculatVideoTags(res)
      })
    },
    // 获取某一用户的全部视频作品
    getUserAllVideo(mid) {
      return axios.get('/userVideo/getSubmitVideos', {
        params: {
          mid
        }
      })
    },
    // 计算用户的全部作品以及标签
    calculatVideoTags(res) {
      this.initData()
      // 获取全部的视频以及标签
      const videoList = [],
        tagList = []
      res.map(item => {
        const data = item.data.data
        videoList.push(...data.vlist)
        Object.keys(data.tlist).map(key => {
          tagList.push(data.tlist[key])
        })
      })
      /**
       * 对标签进行去重处理,同时计算视频总数量
       */
      // 将当前已有的标签存为map结构
      const tagMap = {}
      let videoSum = 0 // 视频的总个数
      tagList.map((item, index) => {
        // 累加视频数量
        videoSum += item.count
        // 判断这个分类是否已经存在,
        const tagIndex = tagMap[item.name]
        if (tagIndex) {
          // 已经存在则数量累加,同时在标签数组里删除这个重复的标签
          tagList[tagIndex].count += item.count
          tagList.splice(index, 1)
        } else {
          // 不存在,则将这个新标签存入map
          tagMap[item.name] = index
        }
      })
      // 在标签数组头部添加'全部'标签
      tagList.unshift({
        name: '全部',
        tid: -1,
        count: videoSum
      })
      this.videoList = videoList
      this.getCurrentPageList()
      this.tagList = tagList
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
      this.videoLoad = true
      this.setIframe()
    },
    // 视频加载完毕时
    videoOnLoad() {
      this.videoLoad = false
    },
    // 关闭ifram播放的视频
    handleClose() {
      this.isShowVideo = false
      this.videoSrc = ''
    },
    // 设置ifram的宽高
    setIframe() {
      const iframe = this.$refs.ifr
      if (iframe) {
        iframe.height = this.$refs.wrapper.clientHeight
        iframe.width = this.$refs.wrapper.clientWidth - 20
      }
    },
    // 根据标题关键字搜索
    onSearch() {
      if (this.searchWorld) {
        this.getAllUserVideo(USERLIST).then(res => {
          const target = this.searchWorld.toLowerCase()
          this.videoList = this.videoList.filter(item => {
            return item.title.toLowerCase().indexOf(target) >= 0
          })
          this.getCurrentPageList()
        })
      } else {
        this.getAllUserVideo(USERLIST)
      }
    },
    pageChange(currentPage) {
      this.currentPage = currentPage
    },
    // 获取当前页的数据
    getCurrentPageList() {
      this.currentVideoList = this.videoList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
    }
  },
  computed: {
    total() {
      return this.tagList[0].count
    }
  },
  watch: {
    currentPage() {
      this.getCurrentPageList()
    }
  },
  filters: {
    getTime(time) {
      const date = new Date(time * 1000)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  ul {
    list-style: none;
  }
  .close {
    position: absolute;
    font-size: 25px;
    top: 80px;
    right: 30px;
    color: #ccc;
  }
  .loading {
    position: absolute;
    top: 170px;
    left: 50%;
  }
  .tag-list {
    width: 80%;
    margin: 10px auto;
    display: flex;
    text-indent: 2rem;
    line-height: 36px;
    background: rgb(237, 242, 249);
    border-radius: 4px;
    padding: 0px 20px;
    .tag-item {
      display: inline-block;
      cursor: pointer;
      .tag-num {
        color: #aaa;
        margin-left: 8px;
      }
    }
    .active {
      color: rgb(0, 161, 214);
    }
  }
  .video-list {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    width: 85%;
    margin: 20px auto;
    .video-item {
      width: 180px;
      height: 100%;
      margin-bottom: 20px;
      border: 1px solid #e5e9ef;
      border-radius: 4px;
      background: #fff;
      margin: 20px 10px;
      img {
        border-radius: 4px;
        width: 180px;
        height: 100px;
        display: block;
      }
      article {
        width: 90%;
        margin: 0 auto;
        color: #222;
        font: 12px Helvetica Neue, Helvetica, Arial, Microsoft Yahei,
          Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;
        p {
          color: #99a2aa;
          text-align: start;
          margin: 7px auto;
        }
        .video-item-title {
          display: block;
          line-height: 20px;
          height: 38px;
          margin-top: 6px;
          overflow: hidden;
          color: #222;
        }
        .video-item-detail {
          width: 100%;
          font-size: 12px;
        }
      }
    }
  }
  .pagination {
    position: absolute;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
