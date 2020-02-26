<template>
  <a-layout class="layout layout-content-white">
    <a-layout-header class="layout-header">
      <LayoutHeader />
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="layout-sider">
        <LayoutSider />
      </a-layout-sider>
      <a-layout-content class="layout-content-white">
        <LayoutContent />
      </a-layout-content>
    </a-layout>
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
  padding: 0;
}
.layout-sider {
  background: #fff;
}
.layout-footer {
  background-color: #444;
}
</style>
