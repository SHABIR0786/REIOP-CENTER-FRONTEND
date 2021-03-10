<template>
  <div id="app">
    <side-bar></side-bar>
    <nav-bar></nav-bar>
    <Footer></Footer>
    <router-view></router-view>
    <loader></loader>
  </div>  
</template>

<script>
import SideBar from "@/components/shared/SideBar"
import NavBar from "@/components/shared/NavBar"
import Footer from "@/components/shared/Footer"
import Loader from "@/components/shared/Loader"

export default {
  name: 'App',
  components: {
    "side-bar": SideBar,
    "nav-bar": NavBar,
    Footer,
    "loader": Loader
  }
}
</script>
