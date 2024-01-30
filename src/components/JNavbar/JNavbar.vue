<template>
  <view :style="{paddingTop: statusBarHeight + 'px', color: color || '#333'}">
    <view
      v-if="fixed"
      class="w-full h-[44px]"
    />

    <view
      class="box-content w-full h-[44px] flex items-center justify-between"
      :class="{'z-50 fixed !top-0 left-0 right-0': fixed}"
      :style="{
        backgroundColor: backgroundColor || 'transparent',
        top: statusBarHeight + 'px',
        paddingTop: fixed ? statusBarHeight + 'px' : 0
      }"
    >
      <view class="flex-[2]">
        <slot
          v-if="$slots.left"
          name="left"
        />
        <image
          v-else-if="leftArrow || leftIcon"
          :src="leftIcon || iconBack"
          class="w-[40rpx] h-[40rpx] ml-[20rpx] btn-zoom"
          @tap.stop="onBack"
        />
      </view>

      <view class="flex-[6] text-[32rpx] text-center">
        <slot v-if="$slots.default" />
        <text v-else>{{ title || '' }}</text>
      </view>

      <view class="flex-[2]">
        <slot
          v-if="$slots.right"
          name="right"
        />
      </view>
    </view>
  </view>
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
import iconBack from './icon-back.png'

interface NavBarProps {
  title?: string
  leftArrow?: boolean
  leftIcon?: string
  color?: string
  backgroundColor?: string
  fixed?: boolean
}

defineProps<NavBarProps>()

const statusBarHeight = useStatusBarHeight()

function onBack() {
  uni.navigateBack()
}
</script>
