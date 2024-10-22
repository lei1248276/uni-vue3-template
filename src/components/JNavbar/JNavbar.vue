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
          <JIcon
            v-else-if="leftArrow &&leftIcon"
            :type="leftIcon"
            :class="arrowClass"
            class="btn-zoom ml-[20rpx] text-[40rpx]"
            @tap.stop="useNavigate(1)"
          />
          <cover-image
            v-else-if="leftArrow && isCoverView"
            :src="leftImg || iconBack"
            class="btn-zoom ml-[20rpx] size-[40rpx]"
            @tap="useNavigate(1)"
          />
          <image
            v-else-if="leftArrow"
            :src="leftImg || iconBack"
            :class="arrowClass"
            class="btn-zoom ml-[20rpx] size-[40rpx]"
            @tap.stop="useNavigate(1)"
          />
        </div>

        <div class="flex h-[44px] flex-[6] items-center justify-center text-center react-text-[32rpx]">
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
import iconBack from './img/back.png'

withDefaults(defineProps<{
  title?: string
  titleClass?: string
  leftArrow?: boolean
  arrowClass?: string
  leftIcon?: `icon-${string}`
  leftImg?: string
  color?: string
  backgroundColor?: string
  fixed?: boolean
  isCoverView?: boolean
}>(), {
  title: undefined,
  titleClass: undefined,
  leftArrow: false,
  arrowClass: undefined,
  leftIcon: undefined,
  leftImg: undefined,
  color: '#333',
  backgroundColor: '#fff',
  fixed: false,
  isCoverView: false
})

const statusBarHeight = useSystemInfo().statusBarHeight

</script>
