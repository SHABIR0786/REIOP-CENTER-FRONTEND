<template>
<b-modal v-model="showModal" no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            User - Company Role
        </div>
    </template>
        <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Name" class="mb-2" id="name" label="Name" label-for="name">
                            <b-form-input id="name" name="name"  type="text" v-model="user.name" disabled></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Email" class="mb-2" id="email" label="Email" label-for="email">
                            <b-form-input type="email" v-model="user.email" disabled></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="list-group-row" v-show="user.role!='superadmin' && user.permissions.length > 0">
                    <b-col cols="12">
                        <h5>Companies Permission</h5>
                        <b-list-group class="w-100">
                            <b-list-group-item v-for="permission in user.permissions" :key="permission.id">
                            Company : {{permission.company.name}}
                            <b-input-group>
                                <b-input-group-prepend class="pr-2">
                                    Role : 
                                </b-input-group-prepend>
                                <b-form-radio-group v-model="permission.role" :options="company_permission"  :name="'company_role'+permission.id" disabled />

                            </b-input-group>

                            </b-list-group-item>
                        </b-list-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12 pt-2">

                        <b-form-checkbox
                            id="checkbox_role"
                            v-model="user.role"
                            name="checkbox_role"
                            value="superadmin"
                            unchecked-value=""
                            disabled
                            >
                            Make this user a superadmin
                        </b-form-checkbox>
                    </b-col>
                </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Close
                </b-button>
                
            </div>
        </template>
</b-modal>
</template>

<script>
import {
    mapGetters
} from "vuex";
export default {
    name: 'CompanyRoleUserModal',
    props: {
        showModal: {
            type: Boolean
        },
        propsData: {
            type: Object
        },
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            teams: 'teamModule/teams',
        }),
        rows() {
            return this.total ? this.total : 1
        }
    },
    data() {
        return {
            perPage: 20,
            user: {

            },
            teamitems: [],
            company_permission: [{
                    value: "user",
                    text: "User"
                },
                {
                    value: "admin",
                    text: "Admin"
                }
            ],
        }
    },

    methods: {

    },
    async created() {
        this.$store.dispatch('uxModule/setLoading')
        // this.$store.dispatch('teamModule/getTotal')
        // try {
        //     await this.$store.dispatch("teamModule/getTeams", {
        //         page: 1,
        //         perPage: this.perPage
        //     })
        //     this.teams.map((team) => {
        //         this.teamitems.push({
        //             value: team.id,
        //             text: team.name
        //         });
        //     });
        //     this.$store.dispatch('uxModule/hideLoader')
        // } catch (error) {
        //     this.$store.dispatch('uxModule/hideLoader')
        // }
    },
            watch: {
            showModal() {
                this.user= {...this.propsData}
                
            }
        }

    
}
</script>

<style scoped>
.input-helper {
    text-align: start;
}
</style>
