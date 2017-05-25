<template lang="pug">
 div
   #loader
     .m_loader
       .m_loader__wrapper
         .m_loader__label Loading
         div(data-bar='')
       span.m_loader__text(data-progress='') 0
   #blackbar
     figure.logo
       img(src='', alt='monoE')

   main
    main-nav
    nuxt
</template>

<script>
  import MainNav from '~components/nav'
  export default {
    components: {
      MainNav
    }
  }
</script>
