import Layzr from 'layzr.js'
import ImagesLoaded from 'imagesloaded'
import * as gsap from 'gsap'
import classie from 'classie'

import BootstrapComp from './bootstrap-comp'

export default class Loader extends BootstrapComp {
  constructor (domSelector) {
    super(domSelector)

    this.$els.loader = this.$el.querySelector(this.options.loader)
    this.$els.progress = this.$el.querySelector(this.options.progress)
    this.$els.loaderBar = this.$el.querySelector(this.options.loaderBar)
  }
  getDefaultOptions () {
    return {
      loader: '.m_loader__wrapper',
      loaderBar: '[data-bar]',
      progress: '[data-progress]'
    }
  }

  init (images) {
    this.allDone = null
    this.preload()
    this.load(images)

    return new Promise((resolve) => {
      this.allDone = resolve
    })
  }

  preload () {
    this.layzr = Layzr({
      normal: 'data-normal',
      threshold: 50
    })

    this.layzr.on('src:after', (element) => {
      classie.removeClass(element.parentElement, 'unload')
      classie.addClass(element.parentElement, 'toload')
    })

    this.layzr
      .update()
      .check()
      .handlers(true)
  }

  load (images) {
    this.loader = new ImagesLoaded(document.querySelectorAll(images))

    gsap.set(this.$els.loader, {
      width: 0
    })

    this.loader.on('progress', (instance, image) => {
      classie.removeClass(image.img.parentElement, 'toload')
      classie.addClass(image.img.parentElement, 'loaded')
      if (image.isLoaded === false) { image.img.classList.add('broke') }
      var progress = parseInt((instance.progressedCount / instance.elements.length) * 100)
      var progressInt = progress

      gsap.to(this.$els.loader, 1.2, {
        width: `${progress}%`
      })

      this.$els.progress.innerHTML = progressInt
    })

    this.loader.on('always', () => {
      this.destroy()
    })
  }

  destroy () {
    var time = 0.6
    var tween = new gsap.TimelineMax({
      onComplete: () => {
        document.documentElement.classList.remove('loading')
        document.body.removeChild(this.$el)
        this.allDone()
      }
    })

    tween
      .to(this.$els.loaderBar, time, {
        scaleX: 0,
        delay: 2,
        ease: gsap.Power4.easeOut
      })
      .to('.m_loader__text', 0.4, {
        xPercent: 100,
        autoAlpha: 0,
        ease: gsap.Power4.easeOut
      })
      .to(this.$el, 0.8, {
        opacity: 0
      })
  }
}
