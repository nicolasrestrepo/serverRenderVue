<template lang="pug">
  div
    article#scroll.page.homepage
      div.m-scroll
        div.m-scroll__section(data-active data-section="campaigns")
          project(v-for="(post, index) in posts" v-bind:key='index')
</template>
<script>
import Project from '~components/project'
import { Post } from '~/api'

export default {
  data () {
    return {
      posts: []
    }
  },
  components: {
    Project
  },
  created () {
    Post.getPosts()
      .then((posts) => {
        this.posts = posts
      })
  }
}
</script>
