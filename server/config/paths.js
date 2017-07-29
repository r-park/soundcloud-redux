const path = require('path');


module.exports = {
  favicon: path.resolve(__dirname, '../static/favicon.ico'),
  indexHtml: path.resolve(__dirname, '../../build/index.html'),
  static: path.resolve(__dirname, '../../build')
};
