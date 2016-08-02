require('babel-polyfill');

var exclude = [
  './main.js',
  './vendor.js'
];

var context = require.context('./src', true, /\.js$/);

context.keys().forEach(function(key) {
  if (exclude.indexOf(key) === -1) context(key);
});
