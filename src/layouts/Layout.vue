<template>
  <a-layout class="layout layout-content-white">
    <a-layout-header class="layout-header layout-content-white">
      <LayoutHeader />
    </a-layout-header>
    <a-layout-content class="layout-content layout-content-white">
      <LayoutContent class="w-1280" />
    </a-layout-content>
    <a-layout-footer class="layout-footer">
      <LayoutFooter />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import LayoutHeader from '@/components/LayoutHeader'
import LayoutContent from '@/components/LayoutContent'
import LayoutSider from '@/components/LayoutSider'
import LayoutFooter from '@/components/LayoutFooter'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: { LayoutHeader, LayoutContent, LayoutSider, LayoutFooter }
})
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
}
.layout-content-white {
  background: #fff;
}
.layout-header {
  display: flex;
  justify-content: center;
  padding: 0;
}
.layout-content {
  display: flex;
  justify-content: center;
}
.layout-footer {
  padding: 8px 20px 4px;
  background-color: #444;
}
</style>
