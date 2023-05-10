<template>
    <b-modal size="xl" v-model="showModal" scrollable no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Copy Teams Settings
            </div>
        </template>
        <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col cols="3">
                       Mapping Templates
                    </b-col>
                    <b-col cols="6">
                        <b-input-group prepend="Select Team" class="mb-2">
                            <b-form-select v-model="copySettings.mappingTemplate.teamId" v-b-tooltip.hover title="Select Team" :searchable="true" :options="teams"></b-form-select>
                        </b-input-group>
                    </b-col>
                    <b-col cols="3">
                    <b-button
                    :disabled="copySettings.mappingTemplate.teamId==null"
                    @click="MappingTeam()"
                        variant="primary"
                        size="sm"
                        class="float-right">
                    Copy
                    </b-button>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="3">
                       Properties Template
                    </b-col>
                    <b-col cols="6">
                        <b-input-group prepend="Select Team" class="mb-2">
                            <b-form-select v-model="copySettings.propertiesFilter.teamId" v-b-tooltip.hover title="Select Team" :searchable="true" :options="teams"></b-form-select>
                        </b-input-group>
                    </b-col>
                    <b-col cols="3">
                    <b-button
                        variant="primary"
                        size="sm"
                        class="float-right">
                    Copy
                    </b-button>
                    </b-col>
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
            </div>
        </template>
    </b-modal>
</template>
<script>
import { mapGetters } from "vuex";

    export default {
        name: 'CheckImportsModal',
        components: {
        },
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
            teams: 'teamModule/allTeams',
        }),
        },
        data() {
            return {
                copySettings:{
                    mappingTemplate: {teamId:null, copy:false},
                    propertiesFilter: {teamId:null, copy:false},
                },
                team:{}
            }
        },
        watch: {
            showModal:async function() {
            if(this.showModal && this.teams) {
                this.team= {...this.propsData}
            this.$store.dispatch('uxModule/setLoading');
            await this.$store.dispatch("teamModule/getAllTeams");
            this.$store.dispatch('uxModule/hideLoader');
            }
            }
        },
        methods:{
            MappingTeam(){
                
                if(this.copySettings.mappingTemplate.teamId!=null){
                    // console.log('this.team',this.team);
                // console.log('selected.team',this.copySettings.mappingTemplate.teamId);
                this.$emit('mappingTemplate', this.team,this.copySettings);
                }else{
                    this.$bvToast.toast("Please Select Team!", {
                    title: "Message",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
                }
                

                

            }
    }
    }
</script>
