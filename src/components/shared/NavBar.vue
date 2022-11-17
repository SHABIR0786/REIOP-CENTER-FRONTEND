<template>
    <div>
    <b-navbar varint="info" :class="`mb-2 main-content ${isCollapsed ? 'wide-content' : ''}`" class="nav-bar">
        <b-navbar-brand href="/" left>
            <div>
                <img class="logo" src="@/assets/images/REI OPCENTER_v3-02.png">
            </div>
        </b-navbar-brand>
        <b-navbar-nav v-if="isTeamViewAccess == true">
        <b-nav-text class="h6 text-white m-auto" title="Company name - Team name">Team view Access : {{companyTeamName}} <b-icon icon="x-square" role="button" class="text-warning ml-2" title="Close Team View" @click="closeTeamView()"></b-icon></b-nav-text>
      </b-navbar-nav>
        <b-navbar-nav class="ml-auto">


      <b-form-select
      v-if="isTeamViewAccess == false"
      v-b-tooltip.hover
      title="Switch Company/Team"
      @change="activeTeam(team)"
      v-model="team.id"
      class=" mr-3 bg-transparent text-white border-0 cursor-pointer"
    >
        <b-form-select-option class="text-dark" :value="team.id" v-for="team,index in user.teams" :key="index">{{team.company.name }} - {{team.name}}</b-form-select-option>
    </b-form-select>


            <b-nav-item-dropdown right>
                <template #button-content> {{ (user && user.name) ? user.name : "User"}}</template>
                <b-dropdown-item v-if="user && (user.role == 1 || user.role == 2) && user.teams.length > 0 && (user.teams.length > 1 || user.team_id==null)" @click="switchTeamViewList()">
                    <div title="Switch Company/Team Modal"><b-icon icon="person-lines-fill"></b-icon> Switch Team</div>
                </b-dropdown-item>
                <b-dropdown-item v-if="user && (user.role == 1 || user.role == 2) && user.companies_admin.length > 0" to="/companyAdmin">
                    <router-link class="link-label" to="/companyAdmin" ><b-icon title="Company Admin" icon="person-check-fill"></b-icon> Company Admin</router-link>
                </b-dropdown-item>
                <b-dropdown-item v-if="user && (user.role == 1 || user.role == 2) && user.teams.length > 0" to="/teamAdmin">
                    <router-link class="link-label" to="/teamAdmin"><b-icon title="Team Admin" icon="person-check-fill"></b-icon> Team Admin</router-link>
                </b-dropdown-item>
                <b-dropdown-item v-if="user && user.role == 1 && adminMode == false" @click="switchToAdminView()">
                    <div><b-icon icon="person-bounding-box"></b-icon> Switch to Admin View</div>
                </b-dropdown-item>
                <b-dropdown-item v-if="user && (user.role == 1 || user.role == 2) && adminMode == true" @click="switchToTeamView()">
                    <div><b-icon icon="person-bounding-box"></b-icon> Switch to Team View</div>
                </b-dropdown-item>
              <b-dropdown-item @click="closeTeamView()" v-if="isTeamViewAccess == true && adminMode == true"><b-icon icon="x-square"></b-icon> Close Team View</b-dropdown-item>
                <b-dropdown-item v-if="adminMode == false" to="/labels">
                    <router-link class="link-label" to="/labels"><b-icon icon="tools"></b-icon> Custom Fields</router-link>
                </b-dropdown-item>
                 <!--v-if="user && user.role === 'admin'"-->
                <!-- <b-dropdown-item v-if="adminMode == false">
                <router-link class="link-label" to="/teams"><b-icon icon="card-list"></b-icon> Teams</router-link>
              </b-dropdown-item> -->
              <b-dropdown-item  v-if="adminMode == false" to="/phoneTypes">
                <router-link class="link-label" to="/phoneTypes"><b-icon icon="phone"></b-icon> Phone Types</router-link>
              </b-dropdown-item>
              <b-dropdown-item v-if="adminMode == false" to="/subjectTypes">
                <router-link class="link-label" to="/subjectTypes"><b-icon icon="house"></b-icon> Subject Types</router-link>
              </b-dropdown-item>
              <b-dropdown-item v-if="adminMode == false" to="/companyTypes">
                <router-link class="link-label" to="/companyTypes"><b-icon icon="building"></b-icon> Company Types</router-link>
              </b-dropdown-item>
              <b-dropdown-item  v-if="adminMode == false" to="/listSources">
                <router-link class="link-label" to="/listSources"><b-icon icon="folder-check"></b-icon> List Sources</router-link>
              </b-dropdown-item>
              <b-dropdown-item v-if="adminMode == false" to="/skipSourceLists">
                <router-link class="link-label" to="/skipSourceLists"><b-icon icon="folder-symlink"></b-icon> Skip Source Lists</router-link>
              </b-dropdown-item>
              <b-dropdown-item v-if="adminMode == false" to="/marketingChannels">
                <router-link class="link-label" to="/marketingChannels"><b-icon icon="building"></b-icon> Marketing Channels</router-link>
              </b-dropdown-item>
              <b-dropdown-item v-if="adminMode == false" to="/errors">
                <router-link class="link-label" to="/errors"><b-icon icon="exclamation-circle-fill" variant="warning"></b-icon> Errors</router-link>
              </b-dropdown-item>
              <b-dropdown-item @click="logout"><b-icon icon="power"></b-icon> Logout</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
    <switch-team-modal :showModal="showModal"  @cancel="showModal=false"></switch-team-modal>

    </div>
</template>
<script>
import { BIcon } from "bootstrap-vue"
import { mapGetters } from "vuex"
import SwitchTeamModal from "../teams/SwitchTeamModal";

export default {
    name: "Navbar",
    components: {
        BIcon,
        SwitchTeamModal

    },
    data() {
        return {
            showModal: false,
            team:{
                id:null
            },
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            user: 'loginModule/getAuthUser',
            adminMode: 'loginModule/getAdminMode',
            isTeamViewAccess: 'teamModule/isTeamViewAccess',
            companyTeamName: 'teamModule/companyTeamName',


        })
    },
    methods: {
        async logout () {
            await this.$store.dispatch('loginModule/logout')
        },
        async closeTeamView () {
            sessionStorage.removeItem("teamAccessId");
            this.$store.dispatch('teamModule/CloseTeamViewAccess')
            this.$router.go();
        },
        switchToAdminView() {
            this.$store.dispatch('loginModule/switchToAdminView')
        },
        switchToTeamView() {
            this.$store.dispatch('loginModule/switchToTeamView');
        },
        switchTeamViewList() {
            this.showModal = true;

        },
        async activeTeam(team){            
            team.user_id = this.user.id;
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch('loginModule/switchCompanyTeam', {
                    ...team
                });
                this.$router.go();
            this.$store.dispatch('uxModule/hideLoader')
        }
    },
    mounted() {
    this.team.id = this.user.team_id;    
    },
}
</script>

<style scoped>
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
