<template>
    <b-modal v-model="showModal" size="xl" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Edit Team
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row class="mb-1 text-center d-flex align-items-center p-3">
                    <div>Team Details</div>
                    <b-button
                            v-if="isReadOnly"
                            variant="primary"
                            size="md"
                            class="ml-3"
                            @click="isReadOnly = false"
                    >
                        Edit
                    </b-button>
                    <b-button
                            v-if="isReadOnly === false"
                            variant="primary"
                            size="md"
                            class="ml-3"
                            @click="edit()"
                    >
                        Save
                    </b-button>
                </b-row>
                <b-row>
                    <b-col>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Team Name" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="team.name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
<!--                        <b-row>-->
<!--                            <b-col cols="12">-->
<!--                                <b-input-group prepend="Team Owner" class="mb-2">-->
<!--                                    <b-form-input readonly v-model="team.owner"></b-form-input>-->
<!--                                </b-input-group>-->
<!--                            </b-col>-->
<!--                        </b-row>-->
                        <h3>Team Members</h3>
                        <b-row v-for="user in team.users" :key="user.name">
                            <b-col cols="12" class="d-flex justify-content-center align-items-center mb-2">
                                <b-form-input readonly  v-model="user.email"></b-form-input>
                                <b-button variant="outline-danger" @click="deleteMember(user.id)" class="ml-2">
                                    <b-icon icon="trash" aria-hidden="true"></b-icon>
                                </b-button>
                            </b-col>
                        </b-row>
                        <b-button variant="primary" class="add-member" @click="showAddMemberModal = true">
                            <b-icon icon="plus" aria-hidden="true"></b-icon>Add New Team Member</b-button>
                    </b-col>
                </b-row>
            </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
            </div>
        </template>
        <add-team-member-modal :showModal="showAddMemberModal" @cancel="showAddMemberModal=false" @add="addMember"></add-team-member-modal>
    </b-modal>
</template>
<script>
    import AddTeamMemberModal from "./AddTeamMemberModal";

    export default {
        name: 'EditTeamModal',
        components: {AddTeamMemberModal},
        props: {
            showModal: {
                type: Boolean
            },
            propsData: {
                type: Object
            }
        },
        methods: {
            edit() {
                this.isReadOnly = true;
                this.$emit('save', this.team);
            },
            addMember(response) {
                this.showAddMemberModal = false;
                if(response) {
                    response.team_id = this.team.id;
                    this.$store.dispatch('teamModule/addTeamMember', response);
                }
            },
            deleteMember(userId) {
                this.$store.dispatch('teamModule/deleteTeamMember', userId);
            },
        },
        data() {
            return {
                team: {
                    name: ''
                },
                isReadOnly: true,
                showAddMemberModal: false,
            }
        },
        watch: {
            showModal() {
                this.team= {...this.propsData}
            }
        }

    }
</script>
<style scoped>
    .close-icon {
        font-size: 30px;
        cursor: pointer;
    }
    .add-member {
        width: 250px;
    }
</style>
