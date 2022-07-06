<template>
    <nav :class="`navbar side-menu ${toggleClass}`">
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
             <li v-for="(item, index) in routeItems.filter(route => route.meta.collapse == false)" :key="index" :class="$route.name===item.name ? 'active-tab' : ''">
                    <router-link :to="item.path">
                        <span :title="item.title"><b-icon :icon="item.icon"></b-icon></span>
                        <p v-if="!isCollapsed">{{item.title}}</p>
                    </router-link>
                </li>
                <li v-b-toggle.collapse-1 @click="changeCollapseStatus()" v-if="authUser.role != 'user'">
                    <router-link :to="''">
                    <span :title="'Data'">
                        <b-icon :icon="'clipboard-data'"></b-icon>
                    </span>
                        <p v-if="!isCollapsed">Data</p>
                        <span class="float-right">
                        <b-icon :icon=collapseIcon></b-icon>
                    </span>
                    </router-link>

                </li>
                <b-collapse visible id="collapse-1">
                    <ul class="nav navbar-nav">
                                <li v-for="(item, index) in routeItems.filter(route => route.meta.collapse == true)" :key="index" :class="$route.name===item.name ? 'active-tab' : ''">
                    <router-link :to="item.path">
                        <span :title="item.title"><b-icon :icon="item.icon"></b-icon></span>
                        <p v-if="!isCollapsed">{{item.title}}</p>
                    </router-link>
                    </li>
                    </ul>
                </b-collapse>
            </ul>
        </div>
        <div :class="`collapse-expend2 ${toggleClass}`" @click="toggleSidebar">
                <span class="white-arrow" :class="{'arrow-collapsed': isCollapsed}">
                    <b-icon icon="caret-left-fill"></b-icon>
                </span>
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
            isSidebarCollapsed: false,
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            adminMode: 'loginModule/getAdminMode',
            authUser: 'loginModule/getAuthUser',

        }),
        routeItems () {
            let buf = []
            routes.map((item) => {
                if(item.isNavbar && item.meta.roles && item.meta.roles.findIndex(x=>x == this.authUser.role) != -1 && item.meta.adminMode == this.adminMode) {
                 buf.push(item)
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
    },
    created () {
    if(localStorage.getItem('accessToken') && localStorage.getItem('authUser')){
      this.$store.commit('loginModule/SIGN_IN', {
        vm : this,
        user: JSON.parse(localStorage.getItem('authUser')),
        token: localStorage.getItem('accessToken')
      })
    }
  },
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
