const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());

const getDevConfig = () => {
  return require(appDirectory + "/config/local");
};

const getProConfig = () => {
  return require(appDirectory + "/config/deploy");
};

module.exports = { getDevConfig, getProConfig };
