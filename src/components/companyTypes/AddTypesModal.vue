<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Type
            </div>
        </template>
        <b-container fluid>
            <b-row  class="text-center">
                <b-row class="mb-1 text-center col-12">
                    <b-col cols="12">
                        <b-input-group prepend="New Type" class="mb-2">
                            <b-form-input v-model="companyTypes.company_type"></b-form-input>
                        </b-input-group>
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
                        class="float-right mr-2"
                        @click="$emit('add', companyTypes)"
                >
                    Add
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    export default {
        name: 'AddTypeModal',
        props: {
            showModal: {
                type: Boolean
            },
            propsData: {
                type: Object
            }
        },
        data() {
            return {
              companyTypes: {
                company_type: '',
                },
            }
        },
    }
</script>

<style scoped>
    .input-helper {
        text-align: start;
    }
</style>
