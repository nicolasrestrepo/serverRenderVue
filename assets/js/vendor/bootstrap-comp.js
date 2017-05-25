import EventEmitter from 'events'

export default class BootstrapComp extends EventEmitter {
  constructor (domSelector, options = {}) {
    super()

    this.$el = (typeof domSelector === 'string')
      ? document.querySelector(domSelector)
      : domSelector
    this.setMaxListeners(0)
    this.$els = {}
    this.options = Object.assign({}, this.getDefaultOptions(), options)
    this.$refs = {}

    this.state = new Map()
  }

  setState (key, value) {
    var currentState = this.state.get(key)

    if (currentState !== value) {
      this.state.set(key, value)
    }

    return value
  }

  getState (key) {
    return this.state.get(key)
  }

  init (state = {}) {
    var initialState = Object.assign({}, this.getInitialState(), state)
    for (var i = 0; i < Object.keys(initialState).length; i++) {
      var key = Object.keys(initialState)[i]
      this.setState(key, initialState[key])
    }

    this._active = false
  }

  setRef (refId, Class) {
    var params = arguments.length
    var classParams = Array(params > 2 ? params - 2 : 0)

    for (var s = 2; s < params; s++) {
      classParams[s - 2] = arguments[s]
    }

    var refClass = Class instanceof BootstrapComp
      ? Class
      : new (Function.prototype.bind.apply(Class, [null].concat(classParams))) // eslint-disable-line  new-parens

    var refExist = this.$refs[refId]
    this.$refs[refId] = refClass

    refExist
      ? refExist.destroy().then(function () { console.warn('ref Destroy') })
      : Promise.resolve(refClass.init())
  }
}
