import * as gsap from 'gsap'
import 'gsap/ScrollToPlugin'
import ScrollReveal from 'scrollreveal'
import classie from 'classie'

import BoostrapComp from './bootstrap-comp'
import ScrollNavigator from './navigator'
import * as utils from './utils'

export default class Scroll extends BoostrapComp {
  constructor (DomSelector, options = {}) {
    super(DomSelector, options)

    this.$els.container = utils.qsa(this.options.scrollContainerClass, this.$el)
    this.$els.items = utils.qsa(this.options.sectionClass, this.$el)

    this.gridHeight = utils.viewportSize().y

    var $scrollNavigator = utils.qs('#scroll-navigator')
    this.setRef('navigator', ScrollNavigator, $scrollNavigator, {
      items: this.$els.items
    })

    console.log(this)
  }

  getDefaultOptions () {
    return {
      scrollContainerClass: '.m-scroll',
      sectionClass: '.m-scroll__section',
      startFrom: 0
    }
  }

  getInitialState () {
    return {
      currentPos: { y: 0 },

      itemsAmount: this.$els.items.length,

      current: this.options.startFrom,
      prev: this.options.startFrom - 1,
      next: this.options.startFrom + 1,

      isFirstAnim: true
    }
  }

  init () {
    super.init()

    this.initDone = null

    window.addEventListener('resize', this.resize.bind(this))

    this.scrollreveal = new ScrollReveal()

    this.calculateScrollPositions()

    this.setTo()
    this.start()
  }

  setTo () {
    for (var i = 0; i < this.$els.items.length; i++) {
      var item = this.$els.items[i]

      item.removeAttribute('data-active')
    }

    this.currentEl = this.$els.items[this.getState('current')]
    this.currentEl.setAttribute('data-active', '')
  }

  start () {
    var index = this.getState('current')

    this.scrollTo(index, true)
    this.setEvents()

    this.$refs.navigator.start(this.getState('current'))

    this.scrollreveal.reveal('section.project', {
      origin: 'bottom',
      distance: '100px',
      duration: 625,
      opacity: 0,
      reset: false,
      scale: 0.98,
      beforeReveal: (element) => {
        classie.removeClass(element, 'toload')
        classie.addClass(element, 'loaded')
      },
      afterReveal: (element) => {
        element.removeAttribute('style')
      }
    })
  }

  scrollTo (index, animate = false) {
    this.updateIndexes(index)
    this.animate(animate)
  }

  updateIndexes (index) {
    this.setState('current', index)
    this.setState('prev', index === 0 ? 0 : index - 1)
    this.setState('next', index < this.getState('itemsAmount') ? index + 1 : index)
  }

  animate (animate = false) {
    this.setState('animating', true)

    if (this.getState('isFirstAnim') && !animate) {
      this.setState('isFirstAnim', false)
      this.emit('animation:first')
    }

    var time = animate ? 0 : 2
    gsap.TweenLite.to(window, time, {
      scrollTo: {
        y: this.getState('sectionsRect')[this.getState('current')],
        offsetY: 0
      },
      onComplete: () => {
        if (this.$refs.navigator) {
          this.$refs.navigator.activeSectionMenu(this.getState('current'))
        }
      }
    })
  }

  resize () {
    this.calculateScrollPositions()
  }

  calculateScrollPositions () {
    this.setState('sectionsRect', utils.elementRect(this.$els.items))
  }

  setEvents () {
    this.$refs.navigator.$els.items.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.scrollTo(index)
      })
    })

    window.addEventListener('scroll', () => {
      // need scrollYposition and section position
      // console.log(window.pageYOffset, this.getState('sectionsRect')[this.getState('current')])
      var index

      if (window.pageYOffset < this.getState('sectionsRect')[this.getState('current')]) {
        index = this.getState('current') - 1
        this.updateIndexes(index)

        this.$refs.navigator.activeSectionMenu(this.getState('current'))
      } else if (window.pageYOffset >= this.getState('sectionsRect')[this.getState('next')]) {
        index = this.getState('current') + 1
        this.updateIndexes(index)

        this.$refs.navigator.activeSectionMenu(this.getState('current'))
      }
    })
  }

}
