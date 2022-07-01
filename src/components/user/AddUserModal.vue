<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add User
            </div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Name" class="mb-2">
                            <b-form-input type="email" v-model="user.name"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Email" class="mb-2">
                            <b-form-input :state="user.email.length > 0" type="email" v-model="user.email"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                <b-col cols="12">
                        <b-input-group prepend="Select Team" class="mb-2">
                <b-form-select
                    v-model="user.team_id"
                    :options="teamitems">
                </b-form-select>
                </b-input-group>
                </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Password" class="mb-2">
                            <b-input v-model="user.password"></b-input>
                        </b-input-group>
                        <b-form-text class="input-helper">At Least 6 Characters</b-form-text>
                    </b-col>
                </b-row>
            </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button
                        variant="primary"
                        size="sm"
                        class="float-right"
                        @click="$emit('cancel')"
                >
                    Cancel
                </b-button>
                <b-button
                        variant="primary"
                        size="sm"
                        :disabled="user.password.length < 6"
                        class="float-right mr-2"
                        @click="$emit('add', user)"
                >
                    Add
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
import {mapGetters} from "vuex";
    export default {
        name: 'AddTeamMemberModal',
        props: {
            showModal: {
                type: Boolean
            },
            propsData: {
                type: Object
            }
        },
        computed: {
            ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            teams: 'teamModule/teams',
            }),
            rows() { return this.total ? this.total : 1 }
        },
        data() {
            return {
                perPage: 20,
                user: {
                    name:'',
                    email: '',
                    password: '',
                    team_id: ''
                },
                teamitems:[],
            }
        },
        async created () {
            this.$store.dispatch('uxModule/setLoading')
            this.$store.dispatch('teamModule/getTotal')
            try {
            await this.$store.dispatch("teamModule/getAllTeams", {page: 1, perPage: this.perPage})
            this.teams.map((team) => {
               this.teamitems.push( { value: team.id, text: team.name });
            });
            this.$store.dispatch('uxModule/hideLoader')
            } catch (error) {
            this.$store.dispatch('uxModule/hideLoader')
            }
        }
}
</script>

<style scoped>
    .input-helper {
        text-align: start;
    }
</style>
