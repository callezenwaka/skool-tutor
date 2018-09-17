<template>
  <div class="container" id="container">
    <Header />
    <div class="message" id="message">
      <h2>Welcome Home</h2>
      <h1>Firebase Hosting Setup Complete</h1>
      <p>You're seeing this because you've successfully setup Firebase Hosting. Now it's time to go build something extraordinary!</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <a target="_blank" href="https://firebase.google.com/docs/hosting/">Open Hosting Documentation</a>
      <p id="load">Firebase SDK Loading&hellip;</p>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
export default {
  name: 'Index',
  components: {
    Header,
    Footer
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#message {
  margin: 100px auto 16px;
  padding: 32px 24px;
  border-radius: 3px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
