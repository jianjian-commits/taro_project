const path = require("path")
const { getDevConfig, getProConfig } = require("./utils")

const myConfig =
  process.env.BUILD_ENV === "development" ? getDevConfig() : getProConfig()

console.log(myConfig)

const config = {
  projectName: "taro_project",
  date: "2022-6-29",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [],
  defineConstants: {
    LOCATION_APIKEY: JSON.stringify('BLTBZ-BYNLK-EGBJR-AR5N4-HJZ5T-Z7FUT'),
    __BASE_PATH__: JSON.stringify(myConfig.basePath),
    __VERSION__: '"1.0.0"',
    // 用于src目录下的环境判断
    __BUILD_ENV__: `"${process.env.BUILD_ENV}"`,
  },
  copy: {
    patterns: [],
    options: {},
  },
  alias: {
    "@": path.resolve(__dirname, "../src"),
  },
  framework: "react",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"))
  }
  return merge({}, config, require("./prod"))
}
