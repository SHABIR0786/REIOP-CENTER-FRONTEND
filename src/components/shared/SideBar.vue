<template>
    <nav :class="`navbar side-menu ${toggleClass}`">
        <div class="container-fluid">
            <div
                class="navbar-header"
            >
                <router-link 
                    to="/"
                    class="navbar-brand"
                >
                    <img 
                        v-if="isCollapsed"
                        src="@/assets/images/collapsed-logo.png">
                    <img v-else
                        src="@/assets/images/logo.png">
                </router-link>
            </div>
            <ul
                class="nav navbar-nav"
            >
                <li v-for="(item, index) in routeItems"
                    :key="index"
                    :class="$route.name===item.name ? 'active-tab' : ''"
                >
                    <router-link
                        :to="item.path"
                    >
                        <span
                            :title="item.title"
                        >
                            <b-icon
                                :icon="item.icon"
                            ></b-icon>
                        </span>
                        <p v-if="!isCollapsed">{{item.title}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div
            :class="`collapse-expend2 ${toggleClass}`"
            @click="toggleSidebar"
        >
                <span
                    class="white-arrow"
                >
                    <b-icon
                        icon="caret-left-fill"
                    ></b-icon>
                </span>
                <span
                    class="coloured-bars"
                >
                    <b-icon
                        icon="list"
                    ></b-icon>
                </span>
        </div>
    </nav>
    
</template>
<script>
import { BIcon } from "bootstrap-vue"
import { routes } from "@/router/routes"
import { mapGetters } from "vuex"

export default {
    name: "Sidebar",
    components: {
        BIcon,
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed'
        }),
        routeItems () {
            let buf = []
            routes.map((item) => {
                item.isNavbar && buf.push(item)
            })

            return buf
        },
        toggleClass () {
            if(this.isCollapsed)
                return 'collapsemenu'
            return ''
        }
    },
    methods: {
        toggleSidebar () {
            this.$store.dispatch('uxModule/toggleSidebar')
        } 
    }
}
</script>