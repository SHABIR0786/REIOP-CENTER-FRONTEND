<template>
    <b-modal size="huge" v-model="showModal" centered no-close-on-backdrop scrollable>
        <template #modal-header>
            <div class="w-100">
                Export
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row>
                    <b-col>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Export Id" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.id"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Team Name" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.team_name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="User Name" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.user"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Exported Subjects" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.exported_subjects"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Exported Sellers" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.exported_sellers"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Exported Phones" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.exported_phones"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Exported Emails" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.exported_emails"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Exported Golden Addresses" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.exported_golden_addresses"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Export Type" class="mb-2">
                                    <b-form-input v-if="isNaN(exportItem.export_type)" readonly v-model="exportItem.export_type"></b-form-input>
                                    <b-form-input v-if="!isNaN(exportItem.export_type)" readonly :value="this.exportTypes[exportItem.export_type]"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center" v-if="exportItem.export_type=='To Market'">
                            <b-col cols="12">
                                <b-input-group prepend="Marketing Channel" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.marketing_channel.marketing_channel_name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Status" class="mb-2">
                                    <b-form-input readonly disabled :value="statusText[exportItem.status]"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Marketing Start Date" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.marketing_start_date"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Marketing End Date" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.marketing_end_date"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Skip Source" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.skip_source"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Skip Date" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.skip_date"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Custom View" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.custom_view"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Filter" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.filter"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Notes" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.notes"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 text-center">
                            <b-col cols="12">
                                <b-input-group prepend="Created At" class="mb-2">
                                    <b-form-input readonly v-model="exportItem.created_at"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
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
    </b-modal>
</template>
<script>
export default {
    name: "Companies",
    props: {
        exportItem :{
            type: Object,
        },
        showModal: {
            type: Boolean
        },
    },
    data() {
        return {
            exportTypes: [
            "",
            "To Market",
            "To SkipTrace",
            "Miscellaneous Reason" ],
            statusText:['','In Progress','Completed','Failed'],
        }
    },
    mounted(){

    }
}
</script>