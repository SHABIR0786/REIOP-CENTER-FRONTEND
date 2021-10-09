<template>
  <div id="app">
    <div v-if="isLogged">
      <b-row class="nav-bar">
        <nav-bar></nav-bar>
      </b-row>
      <side-bar></side-bar>
<!--      <Footer></Footer>-->
      <router-view></router-view>
      <loader></loader>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import SideBar from "@/components/shared/SideBar"
import NavBar from "@/components/shared/NavBar"
// import Footer from "@/components/shared/Footer"
import Loader from "@/components/shared/Loader"
import { mapGetters } from "vuex"

export default {
  name: 'App',
  components: {
    "side-bar": SideBar,
    "nav-bar": NavBar,
    // Footer,
    "loader": Loader
  },
  computed: {
    ...mapGetters({
      isLogged: 'loginModule/isLogged'
    })
  },
  created () {
    if(localStorage.getItem('accessToken') && localStorage.getItem('authUser')){
      this.$store.commit('loginModule/SIGN_IN', {
        vm : this,
        user: JSON.parse(localStorage.getItem('authUser')),
        token: localStorage.getItem('accessToken')
      })
    }
  }
}
</script>

<style>
  .nav-bar {
    height: 56px;
  }
</style>
