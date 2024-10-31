<template>
  <div
    class="relative z-[999]"
    :class="{'before:block before:h-[44px] before:w-full': fixed,}"
    :style="{paddingTop: statusBarHeight + 'px', color: color}"
  >
    <!-- #ifdef MP-WEIXIN -->
    <view
      class="flex h-[44px] w-full items-center justify-between"
      :class="{'fixed inset-x-0 top-0 z-50': fixed}"
      :style="{
        backgroundColor: backgroundColor,
        paddingTop: fixed ? statusBarHeight + 'px' : 0
      }"
    >
      <!-- #endif -->

      <!-- #ifndef MP -->
      <component
        :is="isCoverView ? 'cover-view' : 'div'"
        class="flex min-h-[44px] w-full items-center justify-between"
        :class="{'fixed inset-x-0 top-0 z-50': fixed}"
        :style="{
          backgroundColor: backgroundColor,
          paddingTop: fixed ? statusBarHeight + 'px' : 0
        }"
      >
        <!-- #endif -->

        <div class="flex h-[44px] flex-[2] items-center">
          <slot
            v-if="$slots.left"
            name="left"
          />
          <cover-image
            v-else-if="isCoverView && leftArrow"
            :src="leftIcon"
            :class="arrowClass"
            class="btn-zoom ml-[20rpx] size-[40rpx]"
            @tap="useNavigate(1)"
          />
          <JIcon
            v-else-if="leftArrow"
            :icon="leftIcon"
            :class="arrowClass"
            class="btn-zoom ml-[20rpx] !size-[40rpx] !text-[40rpx]"
            @tap.stop="useNavigate(1)"
          />
        </div>

        <div class="flex h-[44px] flex-[6] items-center justify-center text-center">
          <slot v-if="$slots.default" />
          <cover-view
            v-else-if="isCoverView"
            :class="titleClass"
          >
            {{ title }}
          </cover-view>
          <span
            v-else
            :class="titleClass"
          >{{ title }}</span>
        </div>

        <div class="h-[44px] flex-[2]">
          <slot
            v-if="$slots.right"
            name="right"
          />
        </div>

      <!-- #ifndef MP -->
      </component>
      <!-- #endif -->

    <!-- #ifdef MP-WEIXIN -->
    </view>
    <!-- #endif -->
  </div>
</template>

<script lang="ts">
/**
 * ### 导航栏组件
 *
 * #### 自定义Props：
 * - title: 标题
 * - titleClass: 标题样式
 * - leftArrow: 是否显示左箭头
 * - arrowClass: 箭头样式
 * - leftIcon: 左箭头图标,可以为字体图标和图片路径
 * - color: 颜色
 * - backgroundColor: 背景颜色
 * - fixed: 是否固定
 * - isCoverView: 是否使用 cover-view
 */
export default {
  name: 'JNavbar',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true
  }
  // #endif
}
</script>

<script setup lang="ts">
import iconBack from './img/back.png'

withDefaults(defineProps<{
  /** 标题 */
  title?: string
  /** 标题样式 */
  titleClass?: string
  /** 是否显示左箭头 */
  leftArrow?: boolean
  /** 箭头样式 */
  arrowClass?: string
  /** 左箭头图标,可以为字体图标和图片路径 */
  leftIcon?: `icon-${string}` | string
  /** 颜色 */
  color?: string
  /** 背景颜色 */
  backgroundColor?: string
  /** 是否固定 */
  fixed?: boolean
  /** 是否使用 cover-view */
  isCoverView?: boolean
}>(), {
  title: '',
  titleClass: '',
  leftArrow: false,
  arrowClass: '',
  leftIcon: iconBack,
  color: '#333',
  backgroundColor: '#fff',
  fixed: false,
  isCoverView: false
})

const statusBarHeight = useSystemInfo().statusBarHeight

</script>
