<template>
  <span
    class="iconfont"
    :class="[twMerge('text-[32rpx]', props.type, props.class)]"
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
import { twMerge } from 'tailwind-merge'

const props = defineProps<{
  class?: any
  type: `icon-${string}`
}>()
</script>
