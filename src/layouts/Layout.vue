<template>
  <a-layout style="min-height:100vh">
    <a-layout-header class="layout-header">
      <LayoutHeader />
    </a-layout-header>
    <a-layout>
      <a-layout-sider>
        <LayoutSider />
      </a-layout-sider>
      <a-layout-content>
        <LayoutContent />
      </a-layout-content>
    </a-layout>
    <a-layout-footer>
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
.layout-header {
  background: #fff;
}
</style>
