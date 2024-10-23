<template>
  <div :class="twMerge('relative w-[320rpx] h-[240rpx] overflow-hidden', props.class)">
    <span
      v-if="!src || !loaded || isError"
      class="absolute inset-0 bg-[length:60%] bg-center bg-no-repeat"
      :style="{'background-image': `url(${altImg})`}"
    />

    <image
      v-if="src"
      class="j-image size-full transition-opacity duration-1000"
      :class="[loaded ? 'opacity-100' : 'opacity-0', imgClass]"
      :src="(!lazyLoad || loading || loaded) ? src : ''"
      :mode="mode"
      :fade-show="fadeShow"
      :webp="webp"
      :show-menu-by-longpress="showMenuByLongpress"
      :draggable="draggable"
      @load="loaded = true; onLoad?.($event)"
      @error="isError = true; onError?.($event)"
      @tap="onPreview"
    />
  </div>
</template>

<script lang="ts">
/**
 * ### 图片组件
 *
 * #### 自定义Props：
 * - imgClass: 图片类名
 * - preview: 是否预览图片
 * - altImg: 占位图
 *
 * #### uni-app 原生Props：
 * - https://uniapp.dcloud.net.cn/component/image.html
 * - mode: 图片裁剪、缩放的模式
 * - lazyLoad: 是否开启图片懒加载
 * - fadeShow: 是否使用图片显示动画效果
 * - webp: 在系统不支持 webp 的情况下是否单独启用 webp
 * - showMenuByLongpress: 是否开启长按图片显示识别小程序码菜单
 * - draggable: 是否能拖动图片
 */
export default {
  name: 'JImage',
  options: {
    // #ifdef MP-WEIXIN
    virtualHost: true
    // #endif
  }
}
</script>

<script setup lang="ts">
import type { ImageProps } from '@uni-helper/uni-app-types'
import { twMerge } from 'tailwind-merge'
import alt from './img/alt.png'

const props = withDefaults(defineProps<{
  class?: string
  /** 图片类名 */
  imgClass?: string
  /** 是否预览图片 */
  preview?: boolean
  /** 占位图 */
  altImg?: string

  /** 图片资源地址 */
  src: string;
  /**
   * 图片裁剪、缩放的模式
   *
   * ScaleToFill 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
   *
   * AspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来，可以完整地将图片显示出来
   *
   * AspectFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取
   *
   * WidthFix 宽度不变，高度自动变化，保持原图宽高比不变
   *
   * HeightFix 高度不变，宽度自动变化，保持原图宽高比不变
   *
   * Top 不缩放图片，只显示图片的顶部区域
   *
   * Bottom 不缩放图片，只显示图片的底部区域
   *
   * Center 不缩放图片，只显示图片的中间区域
   *
   * Left 不缩放图片，只显示图片的左边区域
   *
   * Right 不缩放图片，只显示图片的右边区域
   *
   * Top left 不缩放图片，只显示图片的左上边区域
   *
   * Top right 不缩放图片，只显示图片的右上边区域
   *
   * Bottom left 不缩放图片，只显示图片的左下边区域
   *
   * Bottom right 不缩放图片，只显示图片的右下边区域
   *
   * 默认为 aspectFit
   */
  mode?: ImageProps['mode'];
  /**
   * 是否开启图片懒加载
   *
   * 默认为 false
   */
  lazyLoad?: boolean;
  /**
   * 是否使用图片显示动画效果 - 仅App-nvue 2.3.4+ Android有效
   *
   * 默认为 true
   */
  fadeShow?: boolean;
  /**
   * 在系统不支持 webp 的情况下是否单独启用 webp - 微信小程序2.9.0
   *
   * 默认为 false
   */
  webp?: boolean;
  /**
   * 是否开启长按图片显示识别小程序码菜单 - 微信小程序2.7.0
   *
   * 默认为 false
   */
  showMenuByLongpress?: boolean;
  /**
   * 是否能拖动图片 - H5 3.1.1+、App（iOS15+）
   *
   * 默认为 true
   */
  draggable?: boolean;
  /** 图片加载错误时触发 */
  onError?: ImageProps['onError'];
  /** 图片加载完毕时触发 */
  onLoad?: ImageProps['onLoad'];
}>(), {
  class: undefined,
  imgClass: undefined,
  altImg: alt,
  preview: false,
  lazyLoad: false,
  mode: 'aspectFit',
  fadeShow: true,
  webp: false,
  showMenuByLongpress: false,
  draggable: true,
  onError: undefined,
  onLoad: undefined
})

const loading = ref(false)
const loaded = ref(false)
const isError = ref(false)

let observer: ReturnType<typeof uni.createIntersectionObserver> | undefined
onMounted(() => {
  if (!props.lazyLoad) return

  observer = uni.createIntersectionObserver(getCurrentInstance()?.proxy)
  observer.relativeToViewport({ bottom: 100 }).observe(`.j-image`, (res) => {
    if (res.intersectionRatio === 0) return

    loading.value = true
    observer?.disconnect()
  })
})
onUnmounted(() => {
  observer?.disconnect()
})

const onPreview = computed(
  () => props.preview
    ? () => uni.previewImage({
      current: props.src,
      urls: [props.src]
    })
    : undefined
)
</script>
