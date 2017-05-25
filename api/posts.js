import axios from 'axios'
import helpers from '~/helpers/utils'

export default {
  getPosts () {
    return axios.get(helpers.makeUrl('posts'))
      .then((res) => res.data)
  }
}
