<template>
    <nav :class="`navbar side-menu d-block ${toggleClass}`">
        <div class="container-fluid">
            <ul class="nav navbar-nav" v-if="isCollapsed">
                <li v-for="(item, index) in routeItems" :key="index" :class="$route.name===item.name ? 'active-tab' : ''">
                    <router-link :to="item.path">
                        <span :title="item.title"><b-icon :icon="item.icon"></b-icon></span>
                        <p v-if="!isCollapsed">{{item.title}}</p>
                    </router-link>
                </li>
            </ul>
            <ul class="nav navbar-nav" v-else>
                <li :class="$route.name==='Home' ? 'active-tab' : ''">
                    <router-link :to="'/'">
                        <span :title="'Home'"><b-icon :icon="'house-fill'"></b-icon></span>
                        <p v-if="!isCollapsed">Home</p>
                    </router-link>
                </li>
                <li :class="$route.name==='Users' ? 'active-tab' : ''">
                    <router-link :to="'/users'">
                        <span :title="'Users'"><b-icon :icon="'person'"></b-icon></span>
                        <p v-if="!isCollapsed">Users</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div :class="`collapse-expend2 ${toggleClass}`" @click="toggleSidebar">
                <!-- <span class="white-arrow" :class="{'arrow-collapsed': isCollapsed}">
                    <b-icon icon="caret-left-fill"></b-icon>
                </span> -->
                <span class="coloured-bars">
                    <b-icon icon="list"></b-icon>
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
    data () {
        return {
            isCollapseOpen: true,
            collapseIcon: 'chevron-compact-up',
            isSidebarCollapsed: false
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed'
        }),
        routeItems () {
            let buf = []
            routes.map((item) => {
                if(item.meta && item.meta.admin){
                item.isNavbar && buf.push(item)
                }
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
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
            this.$store.dispatch('uxModule/toggleSidebar')
        },
        changeCollapseStatus () {
            this.isCollapseOpen = !this.isCollapseOpen;
            this.collapseIcon = this.isCollapseOpen ? 'chevron-compact-up' : 'chevron-compact-down';
        },
      clickDuringImport(){
        if(this.$route.path === '/import-v2') {
          this.$store.dispatch('importV2Module/showImportFirstPage', true)
        }
      }
    }
}
</script>

<style>
    .side-menu {
        background-color: #A2C4C9 !important;
    }
    .arrow-collapsed {
        display: none;
    }
</style>
