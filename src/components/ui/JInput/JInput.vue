<template>
  <div :class="['flex w-full items-center rounded-md border border-input bg-background px-3 py-2 text-[28rpx] ring-offset-background placeholder:text-muted-foreground', disabled && 'opacity-50']">
    <slot
      v-if="$slots.left"
      name="left"
    />
    <JIcon
      v-else-if="leftIcon"
      :icon="leftIcon"
      class="bg-full mr-[20rpx] text-[#999999]"
      :class="leftClass"
    />

    <slot v-if="$slots.default" />
    <!-- #ifndef MP -->
    <input
      v-else-if="!$slots.default"
      class="grow"
      :class="inputClass"
      :value="modelValue"
      v-bind="$props"
      @keyboardheightchange="$emit('keyboardheightchange', $event)"
      @input="$emit('update:modelValue', $event.detail.value); $emit('input', $event)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      @confirm="validation
        ? validation(modelValue)
          ? ($emit('confirm', $event), $emit('validate', true))
          : $emit('validate', false)
        : $emit('confirm', $event)"
    >
    <!-- #endif -->
    <!-- #ifdef MP -->
    <input
      v-else
      class="grow"
      :class="inputClass"
      :value="modelValue"
      :name="name"
      :type="type"
      :textContentType="textContentType"
      :password="password"
      :placeholder="placeholder"
      :placeholderStyle="placeholderStyle"
      :placeholderClass="placeholderClass"
      :disabled="disabled"
      :maxlength="maxlength"
      :cursorSpacing="cursorSpacing"
      :focus="focus"
      :autoFocus="autoFocus"
      :confirmType="confirmType"
      :confirmHold="confirmHold"
      :cursor="cursor"
      :selectionStart="selectionStart"
      :selectionEnd="selectionEnd"
      :adjustPosition="adjustPosition"
      :holdKeyboard="holdKeyboard"
      :autoBlur="autoBlur"
      :ignoreCompositionEvent="ignoreCompositionEvent"
      :alwaysEmbed="alwaysEmbed"
      :safePasswordCertPath="safePasswordCertPath"
      :safePasswordLength="safePasswordLength"
      :safePasswordTimeStamp="safePasswordTimeStamp"
      :safePasswordNonce="safePasswordNonce"
      :safePasswordSalt="safePasswordSalt"
      :safePasswordCustomHash="safePasswordCustomHash"
      :randomNumber="randomNumber"
      :controlled="controlled"
      :alwaysSystem="alwaysSystem"
      :inputMode="inputMode"
      @keyboardheightchange="$emit('keyboardheightchange', $event)"
      @input="$emit('update:modelValue', $event.detail.value); $emit('input', $event)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      @confirm="validation
        ? validation(modelValue)
          ? ($emit('confirm', $event), $emit('validate', true))
          : $emit('validate', false)
        : $emit('confirm', $event)"
    >
    <!-- #endif -->

    <slot
      v-if="$slots.right"
      name="right"
    />
    <JIcon
      v-else-if="showClear"
      icon="icon-clear"
      class="btn-zoom ml-[20rpx] !text-[38rpx] text-[#e6e6e6]"
      :class="{'hidden': !modelValue}"
      @tap.stop="$emit('update:modelValue', ''); $emit('clear');"
    />
  </div>
</template>

<script lang="ts">
/**
 * ### 输入框组件
 *
 * #### 自定义Props：
 * - showClear: 是否显示清除按钮
 * - inputClass: 输入框class
 * - leftIcon: 左侧图标名,可以为字体图标和图片路径
 * - leftClass: 左侧图标class
 * - validation: confirm 验证函数
 *
 * #### uni-app 原生Props：
 * - https://uniapp.dcloud.net.cn/component/input.html
 */
export default {
  name: 'JInput',
  options: {
    // #ifdef MP-WEIXIN
    virtualHost: true
    // #endif
  }
}
</script>

<script setup lang="ts">
import type { InputProps } from '@uni-helper/uni-app-types'

interface Props{
  // ! 自定义props
  className?: string
  /** 输入框的初始内容 */
  modelValue: string
  /** 是否显示clear图标 */
  showClear?: boolean
  /** 输入框class */
  inputClass?: string
  /** left插槽字体图标名,可以为字体图标和图片路径 */
  leftIcon?: `icon-${string}` | string
  /** left插槽class */
  leftClass?: string
  /** confirm 验证函数 */
  validation?: ((value: string) => boolean)

  /** 在 form 中作为 key */
  name?: string
  /**
   * input 类型
   *
   * text 文本输入键盘
   *
   * number 数字输入键盘
   *
   * idcard 身份证输入键盘
   *
   * digit 带小数点的数字键盘
   *
   * tel 电话输入键盘
   *
   * safe-password 密码安全输入键盘
   *
   * nickname 昵称输入键盘
   *
   * 默认为 text
   */
  type?: InputProps['type']
  /**
   * 文本区域的语义，根据类型自动填充
   *
   * oneTimeCode 一次性验证码
   */
  textContentType?: InputProps['textContentType']
  /**
   * 是否是密码类型
   *
   * 默认为 false
   */
  password?: boolean
  /** 输入框为空时占位符 */
  placeholder?: string
  /** 指定 placeholder 的样式 */
  placeholderStyle?: string
  /**
   * 指定 placeholder 的样式类
   *
   * 默认为 input-placeholder
   */
  placeholderClass?: string
  /**
   * 是否禁用
   *
   * 默认为 false
   */
  disabled?: boolean
  /**
   * 最大输入长度
   *
   * 设置为 -1 的时候不限制最大长度
   *
   * 默认为 140
   */
  maxlength?: number
  /**
   * 指定光标与键盘的距离
   *
   * 取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
   *
   * 单位为 px
   *
   * 默认为 0
   */
  cursorSpacing?: number
  /**
   * 是否获取焦点
   *
   * 默认为 false
   */
  focus?: boolean
  /**
   * 是否自动聚焦，拉起键盘
   *
   * 默认为 false
   */
  autoFocus?: boolean
  /**
   * 设置键盘右下角按钮的文字
   *
   * send 发送
   *
   * search 搜索
   *
   * next 下一个
   *
   * go 前往
   *
   * type="text" 时有效
   *
   * 默认为 done
   *
   * @decs done 完成
   */
  confirmType?: InputProps['confirmType']
  /**
   * 点击键盘右下角按钮时是否保持键盘不收起
   *
   * 默认为 false
   */
  confirmHold?: boolean
  /** 指定 focus 时的光标位置 */
  cursor?: number
  /**
   * 光标起始位置，自动聚焦时有效，需与 selection-end 搭配使用
   *
   * 默认为 -1
   */
  selectionStart?: number
  /**
   * 光标结束位置，自动聚焦时有效，需与 selection-start 搭配使用
   *
   * 默认为 -1
   */
  selectionEnd?: number
  /**
   * 键盘弹起时，是否自动上推页面
   *
   * 默认为 false
   */
  adjustPosition?: boolean
  /**
   * 聚焦时，点击页面的时候是否不收起键盘
   *
   * 默认为 false
   */
  holdKeyboard?: boolean
  /**
   * 键盘收起时，是否自动失焦
   *
   * 默认为 false
   */
  autoBlur?: boolean
  /**
   * 是否忽略组件内对文本合成系统事件的处理
   *
   * 为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件
   *
   * 默认为 true
   */
  ignoreCompositionEvent?: boolean
  /**
   * 是否强制 input 处于同层状态，仅在 iOS 生效
   *
   * 默认聚焦时 input 会切到非同层状态
   *
   * 默认为 false
   */
  alwaysEmbed?: boolean
  /** 安全键盘加密公钥的路径，只支持包内路径 */
  safePasswordCertPath?: string
  /** 安全键盘输入密码长度 */
  safePasswordLength?: number
  /** 安全键盘加密时间戳 */
  safePasswordTimeStamp?: number
  /** 安全键盘加密盐值 */
  safePasswordNonce?: string
  /** 安全键盘计算 hash 盐值，若指定 custom-hash 则无效 */
  safePasswordSalt?: string
  /** 安全键盘计算 hash 的算法表达式 */
  safePasswordCustomHash?: string
  /**
   * 当 type 为 number、digit、idcard 时，数字键盘是否随机排列
   *
   * 默认为 false
   */
  randomNumber?: boolean
  /**
   * 是否为受控组件
   *
   * 为 true 时，value 内容会完全受 setData 控制
   *
   * 默认为 false
   */
  controlled?: boolean
  /**
   * 是否强制使用系统键盘和 Web-div 创建的 input 元素
   *
   * 为 true 时，confirm-type、confirm-hold 可能失效
   *
   * 默认为 false
   */
  alwaysSystem?: boolean
  /**
   * 枚举属性，提供了用户在编辑元素或其内容时可能输入的数据类型的提示
   *
   * none 无虚拟键盘，常用于实现自己的键盘输入控件
   *
   * text 使用用户本地区域设置的标准文本输入键盘
   *
   * decimal 小数输入键盘，包含数字和分隔符，减号键的显示与否因设备而异
   *
   * numeric 数字输入键盘，减号键的显示与否因设备而异
   *
   * tel 电话输入键盘，表单内电话输入框应使用 type="tel"
   *
   * search 搜索输入键盘
   *
   * email 邮件地址输入键盘，表单内邮件地址输入框应使用 type="email"
   *
   * url 网址输入键盘，表单内网址输入因 type="url"
   */
  inputMode?: InputProps['inputMode']
}

withDefaults(defineProps<Props>(), {
  showClear: true,
  type: 'text',
  password: false,
  placeholderClass: 'input-placeholder',
  disabled: false,
  maxlength: 140,
  cursorSpacing: 0,
  focus: false,
  confirmType: 'done',
  confirmHold: false,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  autoBlur: false,
  ignoreCompositionEvent: true,
  alwaysEmbed: false,
  holdKeyboard: false,
  randomNumber: false,
  controlled: false,
  alwaysSystem: false,
  inputMode: 'text'
})
defineEmits<{
  /** 输入框内容变化时触发 */
  (e: 'update:modelValue', value: string): void
  /** 点击清除按钮时触发 */
  (e: 'clear'): void
  /** 验证函数 */
  (e: 'validate', isValid: boolean): void
  /** 点击完成按钮时触发 */
  (e: 'confirm', event: UniHelper.InputOnConfirmEvent): void
  /** 聚焦时触发 */
  (e: 'focus', event: UniHelper.InputOnFocusEvent): void
  /** 失焦时触发 */
  (e: 'blur', event: UniHelper.InputOnBlurEvent): void
  /** 输入时触发 */
  (e: 'input', event: UniHelper.InputOnInputEvent): void
  /** 键盘高度变化时触发 */
  (e: 'keyboardheightchange', event: UniHelper.InputOnKeyboardheightchangeEvent): void
}>()
</script>
