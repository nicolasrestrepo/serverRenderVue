import BootstrapComp from './bootstrap-comp'
import * as utils from './utils'

export default class ScrollNavigator extends BootstrapComp {
  constructor (DomSelector, options = {}) {
    super(DomSelector, options)
  }

  getDefaultOptions () {
    return {
      containerClass: '.m-navigator__menu',
      itemsClass: 'm-navigator__item'
    }
  }

  getInitialState () {
    return {}
  }

  init () {
    super.init()

    this.$els.items = utils.qsa(`.${this.options.itemsClass}`, this.$el)
  }

  start (index) {
    // console.log(index)
  }

  activeSectionMenu (index) {
    for (var i = 0; i < this.$els.items.length; i++) {
      var element = this.$els.items[i]

      element.removeAttribute('data-active')
      if (index === i) {
        element.setAttribute('data-active', '')
      }
    }
  }
}
