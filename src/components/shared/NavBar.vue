<template>
    <b-navbar varint="info"
        :class="`mb-2 main-content ${isCollapsed ? 'wide-content' : ''}`"
    >
        <b-navbar-nav
            class="ml-auto">
            <b-nav-item-dropdown right>
                <template #button-content>
                    Brandin Petteren
                </template>
                <b-dropdown-item>
                    Profile
                </b-dropdown-item>
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
        })
    }
}
</script>