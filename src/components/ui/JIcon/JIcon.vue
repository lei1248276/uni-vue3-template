<template>
  <span
    class="iconfont bg-full inline-block size-[32rpx] text-[32rpx]"
    :class="icon.startsWith('icon-') ? icon : undefined"
    :style="!icon || icon.startsWith('icon-') ? undefined : `background-image: url(${icon})`"
  >
    <slot v-if="$slots.default" />
  </span>
</template>

<script lang="ts">
export default {
  name: 'JIcon',
  options: {
    // #ifdef MP-WEIXIN
    virtualHost: true
    // #endif
  }
}
</script>

<script setup lang="ts">
withDefaults(defineProps<{
  icon: `icon-${string}` | string
}>(), {
  icon: ''
})
</script>
