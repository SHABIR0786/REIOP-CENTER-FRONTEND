<template>
    <b-modal v-model="showModal" size="xl" centered no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Edit Import
            </div>
            <div>
                <b-icon @click="$emit('cancel')" class="close-icon" icon="x"></b-icon>
            </div>
        </template>
        <b-container fluid>
            <b-row class="d-flex flex-column">
                <b-row class="mb-1 text-center d-flex align-items-center p-3">
                    <div>Import Details</div>
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
                                <b-input-group prepend="File Name" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="file.file_name"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Error Lines" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="file.error_number"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="Total Lines" class="mb-2">
                                    <b-form-input :readonly="isReadOnly" v-model="file.total_row_number"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Created Date" class="mb-2">
                            <b-form-input  :readonly="isReadOnly" v-model="file.created_at"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Is Processing" class="mb-2">
                            <b-form-input :readonly="isReadOnly" v-model="file.is_processing"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12">
                          <b-input-group prepend="Is Processed" class="mb-2">
                            <b-form-input :readonly="isReadOnly" v-model="file.is_processed"></b-form-input>
                          </b-input-group>
                        </b-col>
                      </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-input-group prepend="User Id" class="mb-2">
                                    <b-form-input readonly v-model="file.user_id"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
<!--                        <b-row>-->
<!--                            <b-col cols="12">-->
<!--                                <b-input-group prepend="Stack" class="mb-2">-->
<!--                                    <b-form-input :readonly="isReadOnly" v-model="list.list_stack"></b-form-input>-->
<!--                                </b-input-group>-->
<!--                            </b-col>-->
<!--                        </b-row>-->
<!--                        <b-row>-->
<!--                            <b-col cols="12">-->
<!--                                <b-input-group prepend="Subject Id" class="mb-2">-->
<!--                                    <b-form-input readonly v-model="list.subject_id"></b-form-input>-->
<!--                                </b-input-group>-->
<!--                            </b-col>-->
<!--                        </b-row>-->
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
    name: 'EditImportModal',
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
            this.$emit('save', this.file);
        }
    },
    data() {
        return {
            file: {
                file_name: '',
                is_processed: '',
                is_processing: '',
                error_number: '',
                total_row_number: '',
                created_at: '',
                user_id: '',
            },
            isReadOnly: true
        }
    },

    watch: {
        showModal() {
            this.file = {...this.propsData}
        }
    },
}
</script>
<style>
    .close-icon {
        font-size: 30px;
        cursor: pointer;
    }
</style>
