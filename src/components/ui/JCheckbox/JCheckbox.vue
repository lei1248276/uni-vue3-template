<template>
  <div
    class="flex items-center"
    :class="{ 'pointer-events-none opacity-50': disabled }"
    @tap="!disabled && $emit('update:modelValue', !modelValue)"
  >
    <JIcon
      :icon="modelValue ? icon : 'icon-radio-unselect'"
      class="mr-[5rpx] !size-[50rpx] rounded-full !text-[50rpx]"
      :class="iconClass"
    />
    <span :class="labelClass">{{ label }}</span>
  </div>
</template>

<script lang="ts">
/**
 * ### 多选按钮组件
 *
 * #### 自定义Props：
 * - modelValue: 选中值
 * - label?: 标签
 * - disabled?: 是否禁用
 * - icon?: 选中时的图标，可以为字体图标和图片路径，默认值为字体图标 `icon-radio`
 * - iconClass?: 图标类名
 * - labelClass?: 标签类名
 */
export default {
  name: 'JCheckbox',
  options: {
    // #ifdef MP-WEIXIN
    virtualHost: true
    // #endif
  }
}
</script>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: boolean
  /** 标签 */
  label?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 选中时的图标，可以为字体图标和图片路径，默认值为字体图标 `icon-radio` */
  icon?: `icon-${string}` | string
  /** 图标类名 */
  iconClass?: string
  /** 标签类名 */
  labelClass?: string
}>(), {
  modelValue: false,
  label: '',
  disabled: false,
  icon: 'icon-radio',
  iconClass: '',
  labelClass: ''
})

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>
