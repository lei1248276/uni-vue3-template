<template>
  <div class="flex items-center">
    <div
      v-for="option in options"
      :key="option.value"
      class="flex items-center"
      :class="{ 'pointer-events-none opacity-50': option.disabled }"
      @tap="!option.disabled && $emit('update:modelValue', option.value)"
    >
      <JIcon
        :icon="modelValue === option.value ? icon : 'icon-radio-unselect'"
        class="mr-[5rpx] !size-[50rpx] rounded-full !text-[50rpx]"
        :class="iconClass"
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
 * - icon?: 选中时的图标，可以为字体图标和图片路径，默认值为字体图标 `icon-radio`
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
  /** 选项列表 */
  options: {
    label: string
    value: T
    disabled?: boolean
  }[]
  /** 选中时的图标，可以为字体图标和图片路径，默认值为字体图标 `icon-radio` */
  icon?: `icon-${string}` | string
  /** 图标类名 */
  iconClass?: string
  /** 标签类名 */
  labelClass?: string
}>(), {
  icon: 'icon-radio'
})

defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()
</script>
