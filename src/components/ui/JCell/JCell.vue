<template>
  <div class="flex w-full items-center rounded-[12rpx] bg-white px-[32rpx] py-[26rpx] shadow-[0_2rpx_14rpx_0_#edeef1]">
    <JIcon
      v-if="icon"
      :icon="icon"
      class="mr-[20rpx] !size-[40rpx] !text-[40rpx]"
      :class="iconClass"
    />

    <span
      v-if="title"
      :class="titleClass"
    >{{ title }}</span>

    <slot v-if="$slots.default" />

    <JIcon
      v-if="arrow"
      icon="icon-arrow"
      class="ml-auto text-[#999]"
      :class="arrowClass"
    />
  </div>
</template>

<script lang="ts">
/**
 * ### 单元格组件
 *
 * #### 自定义Props：
 * - icon: 图标
 * - title: 标题
 * - arrow: 是否显示箭头
 * - iconClass: 图标样式
 * - arrowClass: 箭头样式
 * - titleClass: 标题样式
 */
export default {
  name: 'JCell',
  options: {
    // #ifdef MP-WEIXIN
    virtualHost: true
    // #endif
  }
}
</script>

<script setup lang="ts">
withDefaults(defineProps<{
  /** 可以是图片或字体图标，字体图标要求'icon-${string}'格式 */
  icon?: string
  /** 标题 */
  title?: string
  /** 是否显示箭头 */
  arrow?: boolean
  /** 图标样式 */
  iconClass?: string
  /** 箭头样式 */
  arrowClass?: string
  /** 标题样式 */
  titleClass?: string
}>(), {
  icon: '',
  arrow: false,
  title: '',
  iconClass: '',
  arrowClass: '',
  titleClass: ''
})
</script>
