export default defineAppConfig({
  // 页面路径列表
  pages: ["pages/task/index", "pages/management/index", "pages/my/index"],
  // 底部 tab 栏的表现
  tabBar: {
    color: "#888888",
    selectedColor: "#1677FF",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/task/index",
        iconPath: "img/task.png",
        selectedIconPath: "img/task-active.png",
        text: "任务",
      },
      {
        pagePath: "pages/management/index",
        iconPath: "img/manage.png",
        selectedIconPath: "img/manage-active.png",
        text: "管理",
      },
      {
        pagePath: "pages/my/index",
        iconPath: "img/my.png",
        selectedIconPath: "img/my-active.png",
        text: "我的",
      },
    ],
  },
  // 权限
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于定位",
    },
  },
  window: {
    // navigationStyle: 'custom',
    navigationBarBackgroundColor: "#1677FF",
  },
  subpackages: [
    {
      root: "pages/location/",
      pages: ["index"],
    },
  ],
})
