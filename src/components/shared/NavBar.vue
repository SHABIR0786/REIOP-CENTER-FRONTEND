<template>
    <b-navbar varint="info" :class="`mb-2 main-content ${isCollapsed ? 'wide-content' : ''}`" class="nav-bar">
        <b-navbar-brand href="/" left>
            <div>
                <img class="logo" src="@/assets/images/REI OPCENTER_v3-02.png">
            </div>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
                <template #button-content> {{ user ? user.name : "User"}}</template>
                <b-dropdown-item>
                    <router-link class="link-label" to="/labels"><b-icon icon="tools"></b-icon> Labels</router-link>
                </b-dropdown-item>
<!--                <b-dropdown-item>-->
<!--                    <router-link class="link-label" to="/background-processes"><b-icon icon="gear-fill"></b-icon> Background Processes</router-link>-->
<!--                </b-dropdown-item>-->
              <b-dropdown-item>
                <router-link class="link-label" to="/errors"><b-icon icon="exclamation-circle-fill" variant="warning"></b-icon> Errors</router-link>
              </b-dropdown-item>
                <b-dropdown-item @click="logout"><b-icon icon="power"></b-icon> Logout</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
</template>
<script>
import { BIcon } from "bootstrap-vue"
import { mapGetters } from "vuex"

export default {
    name: "Navbar",
    components: {
        BIcon,
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            user: 'loginModule/getAuthUser'
        })
    },
    methods: {
        async logout () {
            await this.$store.dispatch('loginModule/logout')
            this.$router.push({name: "Login"}).catch(() => {})
        }
    }
}
</script>

<style>
    .link-label {
        text-decoration: none;
        color: #000;
        text-underline: none;
    }
    .link-label:hover {
        text-decoration: none;
    }
</style>
<style>
    .nav-bar {
        width: 100% !important;
        background-color: #45818E !important;
    }
    .logo {
        width: 230px;
    }
    .navbar-expand .navbar-nav .nav-item .nav-link {
        color: white !important;
    }
</style>
