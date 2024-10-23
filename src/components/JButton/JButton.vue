<template>
  <button
    :class="twMerge('inline-flex items-center justify-center whitespace-nowrap rounded-md text-[28rpx] font-medium ring-offset-background transition-colors bg-transparent leading-none after:hidden', variants.variant[props.variant], variants.size[props.size], props.class, props.disabled && 'opacity-50 pointer-events-none')"
    hover-class="none"
    :loading="loading"
    :form-type="formType"
    :open-type="openType"
    :app-parameter="appParameter"
    :hover-stop-propagation="hoverStopPropagation"
    :lang="lang"
    :session-from="sessionFrom"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    :group-id="groupId"
    :guild-id="guildId"
    :public-id="publicId"
    @getphonenumber="onGetphonenumber"
    @error="onError"
    @opensetting="onOpensetting"
    @launchapp="onLaunchapp"
    @chooseavatar="onChooseavatar"
    @addgroupapp="onAddgroupapp"
    @chooseaddress="onChooseaddress"
    @chooseinvoicetitle="onChooseinvoicetitle"
    @subscribe="onSubscribe"
    @login="onLogin"
  >
    <slot />
  </button>
</template>

<script lang="ts">
/**
 * ### 按钮组件
 *
 * #### 自定义Props：
 * - variant: 按钮的变体，可选值为 'default'、'destructive'、'outline'、'secondary'、'ghost'、'link'
 * - size: 按钮的大小，可选值为 'default'、'xs'、'sm'、'lg'、'icon'
 *
 * #### uni-app 原生Props：
 * - https://uniapp.dcloud.net.cn/component/button.html
 * - disabled: 是否禁用按钮
 * - loading: 是否显示加载状态
 * - formType: 用于 form 组件，点击分别会触发 form 组件的 submit / reset 事件
 * - openType: 开放能力
 * - appParameter: 打开 APP 时，向 APP 传递的参数
 * - hoverStopPropagation: 指定是否阻止本节点的祖先节点出现点击态
 * - lang: 返回用户信息的语言
 * - sessionFrom: 会话来源
 * - sendMessageTitle: 会话内消息卡片标题
 * - sendMessagePath: 会话内消息卡片点击跳转小程序路径
 * - sendMessageImg: 会话内消息卡片图片
 * - showMessageCard: 是否显示会话内消息卡片
 * - groupId: 打开群资料卡时，传递的群号
 * - guildId: 打开频道页面时，传递的频道号
 * - publicId: 打开公众号资料卡时，传递的号码
 */
export default {
  name: 'JButton',
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true
  }
  // #endif
}
</script>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ButtonProps } from '@uni-helper/uni-app-types'
import { twMerge } from 'tailwind-merge'

const props = withDefaults(defineProps<Partial<{
  class: HTMLAttributes['class']
  variant: keyof typeof variants.variant
  size: keyof typeof variants.size

  /** 是否禁用 */
  disabled: boolean;
  /**
   * 是否带 loading 图标
   *
   * 默认为 false
   */
  loading: boolean;
  /**
   * 用于 form 组件，点击分别会触发 form 组件的 submit / reset 事件
   *
   * Submit 点击会触发 form 的 submit 事件
   *
   * Reset 点击会触发 form 的 reset 事件
   *
   * 没有默认值
   */
  formType: ButtonProps['formType'];
  /**
   * 开放能力
   *
   * Feedback 打开“意见反馈”页面，用户可提交反馈内容并上传日志
   *
   * Share 触发用户转发
   *
   * GetUserInfo 获取用户信息，可以从 `@getuserinfo` 回调中获取到用户信息
   *
   * Contact 打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 `@contact` 回调中获得具体信息
   *
   * GetPhoneNumber 获取用户手机号，可以从 `@getphonenumber` 回调中获取到用户信息
   *
   * LaunchApp 小程序中打开APP，可以通过 `app-parameter` 属性设定向 APP 传的参数
   *
   * OpenSetting 打开授权设置页
   *
   * ChooseAvatar 获取用户头像，可以从 `@chooseavatar` 回调中获取到头像信息
   *
   * GetAuthorize 支持小程序授权
   *
   * Lifestyle 关注生活号
   *
   * ContactShare 分享到通讯录好友
   *
   * OpenGroupProfile 呼起 QQ 群资料卡页面，可以通过 group-id 属性设定需要打开的群资料卡的群号，同时
   * manifest.json 中必须配置 groupIdList
   *
   * OpenGuildProfile 呼起频道页面，可以通过 guild-id 属性设定需要打开的频道 ID
   *
   * OpenPublicProfile 打开公众号资料卡，可以通过 public-id 属性设定需要打开的公众号资料卡的号码，同时
   * manifest.json 中必须配置 publicIdList
   *
   * ShareMessageToFriend 在自定义开放数据域组件中，向指定好友发起分享
   *
   * AddFriend 添加好友，对方需要通过该小程序进行授权，允许被加好友后才能调用成功用户授权
   *
   * AddColorSign 添加彩签，点击后添加状态有用户提示，无回调
   *
   * AddGroupApp 添加群应用（只有管理员或群主有权操作），添加后给 button 绑定 `@addgroupapp` 事件接收回调数据
   *
   * AddToFavorites 收藏当前页面，点击按钮后会触发 Page.onAddToFavorites 方法
   *
   * ChooseAddress 选择用户收货地址，可以从 `@chooseaddress` 回调中获取到用户选择的地址信息
   *
   * ChooseInvoiceTitle 选择用户发票抬头，可以从 `@chooseinvoicetitle` 回调中获取到用户选择发票抬头信息
   *
   * Login 登录，可以从 `@login` 回调中确认是否登录成功
   *
   * Subscribe 订阅类模板消息，需要用户授权才可发送
   *
   * Favorite 触发用户收藏
   *
   * WatchLater 触发用户稍后再看
   *
   * OpenProfile 触发打开用户主页
   */
  openType: ButtonProps['openType'];
  /**
   * 打开 APP 时，向 APP 传递的参数
   *
   * Open-type="launchApp" 时有效
   */
  appParameter: string;
  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   *
   * 默认为 false
   */
  hoverStopPropagation: boolean;
  /**
   * 返回用户信息的语言
   *
   * Zh_CN 简体中文
   *
   * Zh_TW 繁体中文
   *
   * En 英文
   *
   * 默认为 en
   */
  lang: ButtonProps['lang'];
  /**
   * 会话来源
   *
   * Open-type="contact" 时有效
   */
  sessionFrom: string;
  /**
   * 会话内消息卡片标题
   *
   * Open-type="contact" 时有效
   *
   * 默认为当前标题
   */
  sendMessageTitle: string;
  /**
   * 会话内消息卡片点击跳转小程序路径
   *
   * Open-type="contact" 时有效
   *
   * 默认为当前分享路径
   */
  sendMessagePath: string;
  /**
   * 会话内消息卡片图片
   *
   * Open-type="contact" 时有效
   *
   * 默认为截图
   */
  sendMessageImg: string;
  /**
   * 是否显示会话内消息卡片
   *
   * 设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息
   *
   * Open-type="contact" 时有效
   *
   * 默认为 false
   */
  showMessageCard: boolean;
  /**
   * 打开群资料卡时，传递的群号
   *
   * Open-type="openGroupProfile" 时有效
   */
  groupId: string;
  /**
   * 打开频道页面时，传递的频道号
   *
   * Open-type="openGuildProfile" 时有效
   */
  guildId: string;
  /**
   * 打开公众号资料卡时，传递的号码
   *
   * Open-type="openPublicProfile" 时有效
   */
  publicId: string;
  /**
   * 获取用户手机号时回调
   *
   * Open-type="getPhoneNumber" 时有效
   */
  onGetphonenumber: ButtonProps['onGetphonenumber'];
  /** 使用开放能力发生错误时回调 */
  onError: ButtonProps['onError'];
  /**
   * 在打开授权设置页并关闭后回调
   *
   * Open-type="openSetting" 时有效
   */
  onOpensetting: ButtonProps['onOpensetting'];
  /**
   * 从小程序成功打开 APP 回调
   *
   * Open-type="launchApp" 时有效
   */
  onLaunchapp: ButtonProps['onLaunchapp'];
  /**
   * 获取用户头像回调
   *
   * Open-type="chooseAvatar" 时有效
   */
  onChooseavatar: ButtonProps['onChooseavatar'];
  /**
   * 添加群应用回调
   *
   * Open-type="addGroupApp" 时有效
   */
  onAddgroupapp: ButtonProps['onAddgroupapp'];
  /**
   * 用户编辑并选择收货地址回调
   *
   * Open-type="chooseAddress" 时有效
   */
  onChooseaddress: ButtonProps['onChooseaddress'];
  /**
   * 用户选择发票抬头回调
   *
   * Open-type="chooseInvoiceTitle" 时有效
   */
  onChooseinvoicetitle: ButtonProps['onChooseinvoicetitle'];
  /**
   * 订阅消息授权回调
   *
   * Open-type="subscribe" 时有效
   */
  onSubscribe: ButtonProps['onSubscribe'];
  /**
   * 登录回调
   *
   * Open-type="login" 时有效
   */
  onLogin: ButtonProps['onLogin'];
  /**
   * 用户同意隐私协议回调
   *
   * Open-type="agreePrivacyAuthorization" 时有效
   */
  onAgreeprivacyauthorization: ButtonProps['onAgreeprivacyauthorization'];
}>>(), {
  variant: 'default',
  size: 'default'
})

const variants = {
  variant: {
    default: 'bg-primary text-primary-foreground active:bg-primary/80',
    destructive: 'bg-destructive text-destructive-foreground active:bg-destructive/80',
    outline: 'border border-input bg-background active:bg-accent active:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground active:bg-secondary/80',
    ghost: 'active:bg-accent active:text-accent-foreground',
    link: 'text-primary underline-offset-4 active:underline'
  },
  size: {
    default: 'h-10 px-4 py-2',
    xs: 'h-7 rounded px-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10'
  }
}
</script>
