<template>
  <div>
    <LayoutHeader />
    <LayoutFooter />
  </div>
</template>

<script>
import LayoutHeader from '@/components/LayoutHeader'
import LayoutFooter from '@/components/LayoutFooter'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: { LayoutHeader, LayoutFooter }
})
</script>

<style></style>
