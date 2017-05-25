import config from '../config'

export default {
  makeUrl (resource, url = null) {
    return url ? url.replace(':resource', resource) : config.URL.replace(':resource', resource)
  }
}
