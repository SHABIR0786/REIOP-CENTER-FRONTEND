<template>
    <nav :class="`navbar side-menu ${toggleClass}`">
        <div class="container-fluid">
<!--            <div-->
<!--                class="navbar-header"-->
<!--            >-->
<!--                <router-link -->
<!--                    to="/"-->
<!--                    class="navbar-brand"-->
<!--                >-->
<!--                    <img -->
<!--                        v-if="isCollapsed"-->
<!--                        src="@/assets/images/collapsed-logo.png">-->
<!--                    <img v-else-->
<!--                        src="@/assets/images/logo.png">-->
<!--                </router-link>-->
<!--            </div>-->
            <ul class="nav navbar-nav" v-if="isCollapsed">
                <li v-for="(item, index) in routeItems" :key="index" :class="$route.name===item.name ? 'active-tab' : ''">
                    <router-link :to="item.path">
                        <span :title="item.title"><b-icon :icon="item.icon"></b-icon></span>
                        <p v-if="!isCollapsed">{{item.title}}</p>
                    </router-link>
                </li>
            </ul>
            <ul class="nav navbar-nav" v-else>
                <li :class="$route.name==='HomePage' ? 'active-tab' : ''">
                    <router-link :to="'/'">
                        <span :title="'Home'"><b-icon :icon="'house-fill'"></b-icon></span>
                        <p v-if="!isCollapsed">Home</p>
                    </router-link>
                </li>
                <li :class="$route.name==='ImportPage' ? 'active-tab' : ''">
                    <router-link :to="'/import'">
                        <span :title="'Import'"><b-icon :icon="'upload'"></b-icon></span>
                        <p v-if="!isCollapsed">Import</p>
                    </router-link>
                </li>
                <li :class="$route.name==='PropertiesPage' ? 'active-tab' : ''">
                    <router-link :to="'/properties'">
                    <span :title="'Properties'">
                        <b-icon :icon="'gear'"></b-icon>
                    </span>
                        <p v-if="!isCollapsed">Properties</p>
                    </router-link>
                </li>
                <li :class="$route.name==='ListPage' ? 'active-tab' : ''">
                    <router-link :to="'/list'">
                    <span :title="'List'">
                        <b-icon :icon="'list-ul'"></b-icon>
                    </span>
                        <p v-if="!isCollapsed">List</p>
                    </router-link>
                </li>
                <li v-b-toggle.collapse-1 @click="changeCollapseStatus()">
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
                        <li :class="$route.name==='SubjectPage' ? 'active-tab' : ''">
                            <router-link :to="'/subjects'">
                            <span :title="'Subjects'" class="ml-4">
                                <b-icon :icon="'file-earmark-fill'"></b-icon>
                            </span>
                                <p v-if="!isCollapsed">Subjects</p>
                            </router-link>
                        </li>

                        <li :class="$route.name==='Seller' ? 'active-tab' : ''">
                            <router-link :to="'/sellers'">
                            <span :title="'Sellers'" class="ml-4">
                                <b-icon :icon="'graph-up'"></b-icon>
                            </span>
                                <p v-if="!isCollapsed">Sellers</p>
                            </router-link>
                        </li>

                        <li :class="$route.name==='PhoneNumberPage' ? 'active-tab' : ''">
                            <router-link :to="'/phones'">
                            <span :title="'Phone Numbers'" class="ml-4">
                                <b-icon :icon="'telephone-fill'"></b-icon>
                            </span>
                                <p v-if="!isCollapsed">Phone Numbers</p>
                            </router-link>
                        </li>

                        <li :class="$route.name==='EmailPage' ? 'active-tab' : ''">
                            <router-link :to="'/emails'">
                            <span :title="'Emails'" class="ml-4">
                                <b-icon :icon="'envelope-fill'"></b-icon>
                            </span>
                                <p v-if="!isCollapsed">Emails</p>
                            </router-link>
                        </li>

                        <li :class="$route.name==='GoldenAddressPage' ? 'active-tab' : ''">
                            <router-link :to="'/golden-addresses'">
                            <span :title="'Golden Addresses'" class="ml-4">
                                <b-icon :icon="'geo-alt-fill'"></b-icon>
                            </span>
                                <p v-if="!isCollapsed">Golden Addresses</p>
                            </router-link>
                        </li>
                    </ul>
                </b-collapse>
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
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
            console.log('sidebar', this.isSidebarCollapsed);
            this.$store.dispatch('uxModule/toggleSidebar')
        },
        changeCollapseStatus () {
            this.isCollapseOpen = !this.isCollapseOpen;
            this.collapseIcon = this.isCollapseOpen ? 'chevron-compact-up' : 'chevron-compact-down';
        }
    }
}
</script>

<style>
    .side-menu {
        background-color: #A2C4C9 !important;
    }
</style>
