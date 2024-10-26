<template>
  <div
    class="flex items-center"
    :class="{ 'pointer-events-none opacity-50': disabled }"
    @tap="!disabled && $emit('update:modelValue', !modelValue)"
  >
    <image
      v-if="iconSrc && modelValue"
      :src="iconSrc"
      mode="aspectFit"
      class="mr-[5rpx] inline-block size-[50rpx]"
      :class="iconClass"
    />
    <span
      v-else
      class="iconfont mr-[5rpx] inline-block size-[50rpx] rounded-full text-[50rpx]"
      :class="[iconClass, modelValue ? icon : 'icon-radio-unselect']"
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
 * - icon?: 选中时的图标，默认值为字体图标 `icon-radio`
 * - iconSrc?: 选中时的图标，图片路径
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
  label?: string
  disabled?: boolean
  icon?: `icon-${string}`
  iconSrc?: string
  iconClass?: string
  labelClass?: string
}>(), {
  icon: 'icon-radio'
})

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>
