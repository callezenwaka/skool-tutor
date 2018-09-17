<template>
    <header class="header" id="header">
        <div class="logo" id="logo"><h3>&vellip;&hellip;&vellip;</h3></div>
        <nav>
          <ul class="nav_menu" id="nav_menu">
            <li class="nav_item"><router-link class="nav_link" :to="{ name: 'Index' }">Home</router-link></li>
            <li class="nav_item"><router-link class="nav_link" :to="{ name: 'About' }">About</router-link></li>
            <li class="nav_item"><router-link class="nav_link" :to="{ name: 'Posts' }">Newsletter</router-link></li>
            <li class="nav_item"><router-link class="nav_link" :to="{ name: 'Tutorials' }">Tutorials</router-link></li>
            <li class="nav_item"><router-link class="nav_link" :to="{ name: 'Courses' }">Courses</router-link></li>
          </ul>
        </nav>
        <div class="nav_menu_toggle" id="nav_menu_toggle" @click.stop.prevent="toggleNavMenu">
          <div class="nav_menu_bar1"></div>
          <div class="nav_menu_bar2"></div>
          <div class="nav_menu_bar3"></div>
          <div class="nav_menu_toggle_name" id="nav_menu_toggle_name">menu</div>
        </div>
    </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      isActive: false
    }
  },
  // computed { v-bind:class="{ active: isActive }"
  // isActive() {
  //   return this.$route.name === 'children1' || this.$route.name === 'children2';
  // },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('click', this.toggleNav)

      // Init
      this.toggleNav()
    })
  },
  methods: {
    toggleNavMenu () {
      const navMenuToggle = document.querySelector('#nav_menu_toggle')
      const container = document.querySelector('#container')
      const logo = document.querySelector('#logo')
      const navMenuToggleName = document.querySelector('#nav_menu_toggle_name')
      const pageOverlay = document.querySelector('#page_overlay')
      navMenuToggle.classList.toggle('change')
      navMenuToggle.classList.toggle('nav_menu_toggle_fixed')
      container.classList.toggle('container_hide')
      logo.classList.toggle('logo_hide')
      navMenuToggleName.classList.toggle('nav_menu_toggle_name_hide')
      pageOverlay.classList.toggle('page_overlay_active')
    },
    toggleNav (event) {
      const pageOverlay = document.querySelector('#page_overlay')
      if (pageOverlay.classList.contains('page_overlay_active')) {
        this.toggleNavMenu()
      }
    }
  }
  // beforeDestroy () {
  //   window.removeEventListener('click', this.toggleNav)
  // }
}
</script>
<style scoped>
</style>
