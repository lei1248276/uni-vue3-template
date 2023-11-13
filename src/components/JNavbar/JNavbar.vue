<template>
  <uni-nav-bar
    v-bind="$attrs"
    class="relative"
    :left-icon="leftArrow ? 'back' : undefined"
    background-color="transparent"
    color="#333333"
    :border="false"
    status-bar
    @clickLeft="$slots.left || leftArrow ? onClickLeft() : undefined"
    @clickRight="$slots.right ? onClickRight() : undefined"
  >
    <template #default>
      <view class="w-full h-full flex justify-center items-center text-[32rpx]">
        <slot v-if="$slots.default" />
        <template v-else>{{ $attrs.title as string || '' }}</template>
      </view>
    </template>

    <template
      v-if="$slots.left"
      #left
    >
      <slot name="left" />
    </template>

    <template
      v-if="$slots.right"
      #right
    >
      <slot name="right" />
    </template>
  </uni-nav-bar>
</template>

<script setup lang="ts">
import type { UniNavBarProps } from '@uni-helper/uni-ui-types'
interface NavBarProps extends UniNavBarProps {
  leftArrow?: boolean
}

defineProps<NavBarProps>()
const emit = defineEmits(['clickLeftIcon', 'clickRightIcon'])

function onClickLeft() {
  emit('clickLeftIcon')

  uni.navigateBack()
}

function onClickRight() {
  emit('clickRightIcon')
}
</script>
