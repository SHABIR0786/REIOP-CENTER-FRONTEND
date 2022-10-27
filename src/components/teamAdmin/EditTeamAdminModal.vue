<template>
    <b-modal v-model="showModal" size="md" centered no-close-on-backdrop scrollable>
        <template #modal-header>
            <div class="w-100">
                Edit Team
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
                    
                <b-row>
                    <b-col cols="12">
                        
                        <b-input-group prepend="Team Name" class="mb-2">
                            <b-form-input v-model="team.name"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
                <b-button variant="primary" size="sm" class="float-right mr-2"  @click="edit()">
                    Save
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>

    export default {
        name: 'EditTeamAdminModal',
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
                if(this.team.name!=''&&this.team!==null){
                    this.$emit('save', this.team);
                }else{
                    this.$bvToast.toast('please enter team name', {
                        title: "Validate",
                        variant: 'warning',
                        autoHideDelay: 5000,
                    });
                }
            },
        },
        data() {
            return {
                team: {
                    name: ''
                },            }
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
