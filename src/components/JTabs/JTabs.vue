<template>
  <div class="flex min-h-[50vh] w-screen flex-col px-[20rpx]">
    <scroll-view
      scroll-x
      :scroll-into-view="'j-tab-' + scrollToIndex"
      scroll-with-animation
      class="relative z-10"
    >
      <div
        class="flex h-[80rpx] flex-nowrap justify-between"
        :class="tabContainerClass"
      >
        <span
          v-for="(item, index) in tabs"
          :id="'j-tab-' + index"
          :key="index"
          class="relative mr-[30rpx] inline-block whitespace-nowrap px-[24rpx] py-[20rpx] last:mr-0"
          :class="[
            tabClass,
            current === index && tabActiveClass,
            current === index && 'before:x-mid before:bottom-0 before:h-[4rpx] before:w-3/4 before:rounded-[2rpx] before:bg-[#333]'
          ]"
          @tap.stop="$emit('update:current', index); $emit('change', index)"
        >
          {{ item }}
        </span>
      </div>
    </scroll-view>

    <div class="relative mt-[20rpx] grow">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
/**
 * ### 标签页组件
 *
 * #### 自定义Props：
 * - tabs: 标签页内容数组
 * - current: 当前选中标签页的索引
 * - tabClass: 标签的class类
 * - tabActiveClass: 选中标签的class类
 * - tabContainerClass: 标签容器的class类
 */
export default {
  name: 'JTabs',
  options: {
    // #ifdef MP-WEIXIN
    virtualHost: true
    // #endif
  }
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** tab内容数组 */
  tabs: string[]
  /** 当前选中tab */
  current: number
  /** tab的class类 */
  tabClass?: string
  /** 选中tab的class类 */
  tabActiveClass?: string
  /** tab的根元素class类 */
  tabContainerClass?: string
}>(), {
  tabClass: '',
  tabActiveClass: '',
  tabContainerClass: ''
})
defineEmits<{
  (e: 'update:current', index: number): void
  (e: 'change', index: number): void
}>()

const scrollToIndex = ref(props.current)
watch(() => props.current, (val, oldVal = 0) => {
  scrollToIndex.value = val > (oldVal + 1) ? val + 1 : val - 1
}, { immediate: true })
</script>
