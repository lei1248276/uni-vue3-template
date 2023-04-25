export default {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
    require('postcss-rem-to-responsive-pixel')({
      rootValue: 32,
      propList: ['*'],
      transformUnit: 'rpx'
    })
    // ...(process.env.UNI_PLATFORM !== 'h5'
    //   ? [
    //     require('postcss-class-rename-postcss8')({
    //       '\\\\:': '-',
    //       '\\\\/': '-',
    //       '\\\\.': '-',
    //       '\\*': '-'
    //     })
    //   ]
    //   : []
    // ),
  ]
}
