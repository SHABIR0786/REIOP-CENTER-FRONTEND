<template>
    <b-modal
            v-model="showModal"
            no-close-on-backdrop
    >
        <template #modal-header>
            <div class="w-100">
                Labels
            </div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                <b-row
                        class="mb-1 text-center"
                >
                    <b-col cols="12">
                        <b-input-group
                                prepend="Label"
                                class="mb-2"
                        >
                            <b-form-input
                                    v-model="label.label"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group
                                prepend="Description"
                                class="mb-2"
                        >
                            <b-form-input
                                    v-model="label.description"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-row>
            <b-form-checkbox v-model="label.visible" size="lg">Visible</b-form-checkbox>
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
                        @click="$emit('save', label)"
                >
                    Save
                </b-button>
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
                    visible: '',
                },
            }
        },
        watch: {
            showModal() {
                this.label = {...this.propsData}
            }
        }
    }
</script>
