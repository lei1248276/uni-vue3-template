<template>
  <view class="j-tags grow">
    <scroll-view
      scroll-x
      :scroll-into-view="'j-tag-' + current"
      scroll-with-animation
      class="tag-container"
    >
      <view
        class="w-full flex justify-between items-center flex-nowrap space-x-[20rpx]"
        :class="tagContainerClass"
      >
        <text
          v-for="(item, index) in tags"
          :id="'j-tag-' + index"
          :key="index"
          class="tag-container__tag"
          :class="{
            [tagActiveClass + ' tag-container__tag--active']: current === index,
            [tagClass]: !!tagClass
          }"
          @tap="$emit('update:current', index); $emit('change', index)"
        >
          {{ item }}
        </text>
      </view>
    </scroll-view>

    <view class="grow relative">
      <slot />
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
withDefaults(defineProps<{
  /** tag内容数组 */
  tags: string[]
  /** 当前选中tag */
  current: number
  /** tag的class类 */
  tagClass?: string
  /** 选中tag的class类 */
  tagActiveClass?: string
  /** tag的根元素class类 */
  tagContainerClass?: string
}>(), {
  tagClass: '',
  tagActiveClass: '',
  tagContainerClass: ''
})
defineEmits<{
  (e: 'update:current', index: number): void
  (e: 'change', index: number): void
}>()
</script>

<style scoped lang="scss">
.j-tags{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .tag-container{
    box-sizing: border-box;
    width: 100%;
    height: 90rpx;
    padding: 20rpx 30rpx 10rpx;
    &__tag{
      position: relative;
      display: inline-block;
      font-size: 28rpx;
      color: #fff;
      white-space: nowrap;
    }
    &__tag--active::before{
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -12rpx;
      width: 100%;
      height: 4rpx;
      border-radius: 2rpx;
      background-color: #fff;
    }
  }
}
</style>
