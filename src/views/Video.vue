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
      <a-spin v-show="searchLoading" class="loading" size="large" />
      <li
        v-for="item in videoList"
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
              {{ item.play | getPlay }}
            </span>
            <span>
              <a-icon type="clock-circle" />
              {{ item.created | getTime }}
            </span>
          </p>
        </article>
      </li>
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
        .get('/userVideo/getSubmitVideos', {
          params: {
            mid,
            page,
            pagesize
          }
        })
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
        .catch(err => {
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
    min-height: 400px;
    margin: 0px auto;
    padding-bottom: 50px;
    .video-item {
      width: 180px;
      height: 100%;
      margin-bottom: 20px;
      border: 1px solid #e5e9ef;
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
      margin: 20px 15px;
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
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
  .ifram {
    width: 100%;
    height: 100%;
  }
}
</style>
