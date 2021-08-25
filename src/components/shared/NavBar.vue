<template>
    <b-navbar varint="info" :class="`mb-2 main-content ${isCollapsed ? 'wide-content' : ''}`">
        <b-navbar-nav
            class="ml-auto">
            <b-nav-item-dropdown right>
                <template #button-content> {{ user ? user.name : "User"}}</template>
                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
</template>
<script>
import { mapGetters } from "vuex"

export default {
    name: "Navbar",
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
