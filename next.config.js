const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
// const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([
  [withImages, { esModule: true, inlineImageLimit: 1 }]
  // [
  //   optimizedImages,
  //   {
  //     /* config for next-optimized-images */
  //   }
  // ]

  // your other plugins here
])
