<template>
  <div class="flex items-center">
    <div
      v-for="option in options"
      :key="option.value"
      class="flex items-center"
      :class="{ 'pointer-events-none opacity-50': option.disabled }"
      @tap="!option.disabled && $emit('update:modelValue', option.value)"
    >
      <image
        v-if="iconSrc && modelValue === option.value"
        :src="iconSrc"
        mode="aspectFit"
        class="mr-[5rpx] inline-block size-[50rpx]"
        :class="iconClass"
      />
      <span
        v-else
        class="iconfont mr-[5rpx] inline-block size-[50rpx] rounded-full text-[50rpx]"
        :class="[iconClass, modelValue === option.value ? icon : 'icon-radio-unselect']"
      />
      <span :class="labelClass">{{ option.label }}</span>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * ### 单选按钮组件
 *
 * #### 自定义Props：
 * - modelValue: 选中值
 * - options: 选项列表
 * - icon?: 选中时的图标，默认值为字体图标 `icon-radio`
 * - iconSrc?: 选中时的图标，图片路径
 * - iconClass?: 图标类名
 * - labelClass?: 标签类名
 */
export default {
  name: 'JRadio',
  options: {
    // #ifdef MP-WEIXIN
    virtualHost: true
    // #endif
  }
}
</script>

<script setup lang="ts" generic="T">
withDefaults(defineProps<{
  modelValue: T
  options: {
    label: string
    value: T
    disabled?: boolean
  }[]
  icon?: `icon-${string}`
  iconSrc?: string
  iconClass?: string
  labelClass?: string
}>(), {
  icon: 'icon-radio'
})

defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()
</script>
