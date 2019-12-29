const path = require('path')

module.exports = {
  skipComponentsWithoutExample: true,
  components: 'src/components/**/[A-Z]*.{js,jsx}',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguidist/Wrapper'),
  },
}
