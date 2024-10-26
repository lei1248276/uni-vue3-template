<template>
  <span
    class="iconfont bg-full inline-block size-[32rpx] text-[32rpx]"
    :class="icon?.startsWith('icon-') ? icon : undefined"
    :style="{ 'background-image': !icon || icon.startsWith('icon-') ? undefined : `url(${icon})` }"
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
defineProps<{
  /** 可以为字体图标 `icon-${string}` 或图片路径 */
  icon: `icon-${string}` | string
}>()
</script>
