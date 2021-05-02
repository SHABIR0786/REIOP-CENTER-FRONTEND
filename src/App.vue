<template>
  <div id="app">
    <div v-if="isLogin">
      <side-bar></side-bar>
      <nav-bar></nav-bar>
      <Footer></Footer>
      <router-view></router-view>
      <loader></loader>
    </div>
    <router-view v-else></router-view>
  </div>  
</template>

<script>
import SideBar from "@/components/shared/SideBar"
import NavBar from "@/components/shared/NavBar"
import Footer from "@/components/shared/Footer"
import Loader from "@/components/shared/Loader"
import { mapGetters } from "vuex"

export default {
  name: 'App',
  components: {
    "side-bar": SideBar,
    "nav-bar": NavBar,
    Footer,
    "loader": Loader
  },
  computed: {
    ...mapGetters({
      isLogin: 'loginModule/isLogin'
    })
  },
  created () {
    if(localStorage.getItem('accessToken')){
      this.$store.commit('loginModule/SET_LOGIN', true)
    }
  }
}
</script>
