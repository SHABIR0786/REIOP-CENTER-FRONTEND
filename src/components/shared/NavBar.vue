<template>
    <b-navbar varint="info" :class="`mb-2 main-content ${isCollapsed ? 'wide-content' : ''}`">
        <b-navbar-nav
            class="ml-auto">
            <b-nav-item-dropdown right>
                <template #button-content> {{ user ? user.name : "User"}}</template>
                <b-dropdown-item href="/labels"><b-icon icon="tools"></b-icon> Labels</b-dropdown-item>
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
