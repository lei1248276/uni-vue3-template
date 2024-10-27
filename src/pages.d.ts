export type Pages = [
  "pages/index/index",
  "pages/profile/profile"
]
export type TabBarPages = [
  "pages/index/index",
  "pages/profile/profile"
]
export type PagesConfig = {
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/profile/profile",
      "style": {
        "navigationStyle": "custom"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  },
  "tabBar": {
    "color": "#707070",
    "selectedColor": "#080341",
    "backgroundColor": "#FFFFFF",
    "fontSize": "12px",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "",
        "selectedIconPath": ""
      },
      {
        "pagePath": "pages/profile/profile",
        "text": "我的",
        "iconPath": "",
        "selectedIconPath": ""
      }
    ]
  },
  "easycom": {
    "autoscan": false
  }
}