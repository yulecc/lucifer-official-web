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
    />
  </div>
</template>

<script>
import axios from 'axios'

const USERLIST = [511477625, 36074883]

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
      pageSize: 2
    }
  },
  created() {
    this.getAllUserAllVideo()
  },
  methods: {
    // 获取一组用户的作品
    getAllUserAllVideo() {
      this.videoList = []
      USERLIST.map(item => {
        this.getUserAllVideo(item)
      })
    },
    // 获取某一用户的全部视频作品
    getUserAllVideo(mid) {
      axios
        .get('/userVideo/getSubmitVideos', {
          params: {
            mid
          }
        })
        .then(res => {
          const data = res.data.data
          this.videoList.push(...data.vlist)
          let videoSum = 0
          // 将当前已有的分类存为map结构
          const tagMap = {}
          this.tagList.map((item, index) => {
            if (!tagMap[item.name]) {
              tagMap[item.name] = index
            }
          })
          // 遍历分类数组
          Object.keys(data.tlist).map(key => {
            const item = data.tlist[key]
            videoSum += item.count
            // 判断这个分类是否已经存在,已经存在则数量累计就好
            const tagIndex = tagMap[item.name]
            if (tagIndex) {
              this.tagList[tagIndex].count += item.count
            } else {
              // 不存在,则将这个新分类存入
              this.tagList.push(item)
            }
          })
          this.tagList[0].count += videoSum
          // 获取当前页数据
          this.getCurrentPageList()
        })
        .catch(rej => {
          console.log('err : ' + rej)
        })
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
      this.setIframe()
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
        const target = this.searchWorld.toLowerCase()
        this.videoList = this.videoList.filter(item => {
          return item.title.toLowerCase().indexOf(target) >= 0
        })
        this.getCurrentPageList()
      } else {
        this.getAllUserAllVideo()
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
    position: relative;
    margin: 50px 0px;
  }
}
</style>
