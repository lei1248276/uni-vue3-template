<template>
  <span
    class="iconfont"
    :class="type"
  >
    <slot v-if="$slots.default" />
  </span>
</template>

// #ifdef MP-WEIXIN
<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
}
</script>
// #endif

<script setup lang="ts">
defineProps<{
  type: `icon-${string}`
}>()
</script>
