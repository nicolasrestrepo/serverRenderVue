import Loader from './vendor/loader'
import Scroll from './vendor/scroll'

window.addEventListener('DOMContentLoaded', function () {
  new Loader('#loader').init('.toload').then(function () {
    var indexSection = 0
    var slider = new Scroll('#scroll', { startFrom: indexSection })

    slider.init()
    slider.on('animation:first', function () {
      console.log('transition start')
    })
  })
})
