<template>
    <b-modal size="xl" v-model="showModal" scrollable no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Check Imports
            </div>
        </template>
        <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col cols="6">
                        <b-input-group prepend="Select Team" class="mb-2">
                            <b-form-select v-model="importModal.teamId" v-b-tooltip.hover title="Select Team" :searchable="true" :options="teams"></b-form-select>
                        </b-input-group>
                    </b-col>
                   <b-col cols="6">
                    <b-input-group prepend="Start Date" class="mb-2" id="start_date" label-for="start_date">
                    <b-form-datepicker
                    v-model="importModal.startDate"
                    placeholder="Select Start Date"
                    autocomplete="off">
                    </b-form-datepicker>
                    </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                <b-col cols="6">
                    <b-input-group prepend="End Date" class="mb-2" id="end_date" label-for="end_date">
                    <b-form-datepicker
                    v-model="importModal.endDate"
                    placeholder="Select End Date"
                    autocomplete="off">
                    </b-form-datepicker>
                    </b-input-group>
                    </b-col>
                <b-col cols="6">
                <b-button variant="primary" size="md" type="button" @click="onSubmit" class="w-100 mr-2">
                    Search
                </b-button>
                </b-col>
                </b-row>
                <b-row>
                    <b-col v-for="(item, index) in importsCards" :key="index" md="3">
                        <home-card :item="item" v-if="item.isVisible"></home-card>
                    </b-col>
        </b-row>
        </b-container>
    </b-modal>
</template>
<script>
import { mapGetters } from "vuex";
import HomeCard from "@/components/home/HomeCard"

    export default {
        name: 'CheckImportsModal',
        components: {
        "home-card": HomeCard,
        },
        props: {
            showModal: {
                type: Boolean
            },
        },
    computed: {
        ...mapGetters({
            teams: 'teamModule/allTeams',
            importsCards: 'homeModule/importsCards',
        }),
        },
        data() {
            return {
                importModal:{
                    teamId: null,
                    startDate: null,
                    endDate: null
                },
            }
        },
        watch: {
            showModal:async function() {
            this.$store.dispatch('uxModule/setLoading');
            await this.$store.dispatch("teamModule/getAllTeams");
            this.$store.dispatch('uxModule/hideLoader');
            }
        },
        methods:{
        async onSubmit() {
            this.$store.dispatch('uxModule/setLoading');
            await this.$store.dispatch("homeModule/getTotalImportsRows",this.importModal);
            this.$store.dispatch('uxModule/hideLoader'); 
        }
    }
    }
</script>
