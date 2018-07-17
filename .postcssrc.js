// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      browsers: [
        // 加这个后可以出现额外的兼容性前缀
        "> 0.01%"
      ]
    }
  }
}