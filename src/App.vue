<template>
<div id="app">
    <div v-if="isLogged">
        <b-row class="nav-bar">
            <nav-bar></nav-bar>
        </b-row>
        <side-bar></side-bar>
        <router-view :key="$route.path"></router-view>
        <loader></loader>
    </div>
    <router-view v-else></router-view>
</div>
</template>

<script>
import SideBar from "@/components/shared/SideBar";
import NavBar from "@/components/shared/NavBar";
import Loader from "@/components/shared/Loader";
import {
    mapGetters
} from "vuex";

export default {
    name: 'App',
    components: {
        "side-bar": SideBar,
        "nav-bar": NavBar,
        "loader": Loader
    },
    computed: {
        ...mapGetters({
            isLogged: 'loginModule/isLogged',
            authUser: 'loginModule/getAuthUser',
        })
    },
    data() {
        return {
            moduleName: '',
        }
    },
    created() {
        if (localStorage.getItem('accessToken') && localStorage.getItem('authUser')) {
            this.$store.commit('loginModule/SIGN_IN', {
                vm: this,
                user: JSON.parse(localStorage.getItem('authUser')),
                token: localStorage.getItem('accessToken')
            })
        }
    },
    watch: {
        '$route'(to, from) {
            switch (from.name) {
                case "Import":
                    this.moduleName = 'importModule'
                    break;
                case "Subject":
                    this.moduleName = 'subjectModule'
                    break;
                case "Seller":
                    this.moduleName = 'sellerModule'
                    break;
                case "PhoneNumber":
                    this.moduleName = 'phoneNumberModule'
                    break;
                case "Properties":
                    this.moduleName = 'propertyModule'
                    break;
                case "List":
                    this.moduleName = 'listModule'
                    break;
                case "Email":
                    this.moduleName = 'emailModule'
                    break;
                case "GoldenAddress":
                    this.moduleName = 'goldenAddressModule'
                    break;
            }
            if (this.moduleName) {
                this.$store.dispatch(`${this.moduleName}/deleteVuexStore`)
            }
        }
    }
}
</script>

<style>
.nav-bar {
    height: 56px;
}

.modal .modal-huge {
    max-width: 90%;
    width: 90%;
}

.modal .modal-large {
    max-width: 80%;
    width: 80%;
}
</style>
