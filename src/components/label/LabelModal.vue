<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">Custom Field</div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Field" class="mb-2">
                            <b-form-input v-model="label.field" disabled></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12">
                        <b-input-group prepend="Name" class="mb-2">
                            <b-form-input v-model="label.label"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12">
                        <b-input-group prepend="Description" class="mb-2">
                            <b-form-input v-model="label.description"></b-form-input>
                        </b-input-group>
                    </b-col>
            </b-row>

            <div>
                <b-form-checkbox v-model="label.visible">Show this field in Import section</b-form-checkbox>
            </div>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">Cancel</b-button>
                <b-button variant="primary" size="sm" class="float-right mr-2" @click="$emit('save', label)">Save</b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    export default {
        name: 'EmailModal',
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
                label: {
                    label: '',
                    description: '',
                    visible: false,
                },
            }
        },
        watch: {
            showModal() {
                this.label = {...this.propsData}
                if (this.propsData.visible ===  1) {
                    this.label.visible = true;
                }
            }
        }
    }
</script>
