<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">Custom Field</div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Field" class="mb-2">
                            <b-form-input v-model="label.field"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>

                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Name" class="mb-2">
                            <b-form-input v-model="label.label"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Description" class="mb-2">
                            <b-form-input v-model="label.description"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Section" class="mb-2">
                            <b-form-select id="show-select"
                                v-model="label.section"
                                :options="sections"
                                size="xs"
                                class=""></b-form-select>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-row>

            <div>
                <b-form-checkbox v-model="label.visible">Show this field in Import section</b-form-checkbox>
            </div>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">Cancel</b-button>
                <b-button variant="primary" size="sm" class="float-right mr-2" @click="addLabel()">Add</b-button>
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
        },
        data() {
            return {
                sections:[
                    {value:"subject",text:"Subject"},
                    {value:"seller",text: "Seller"},
                    {value:"phone", text: "Phone"},
                    {value: "email", text: "Email"},
                    {value: "golden_address", text: "Golden Address"},
                    {value: "list", text: "List"}
                    ],
                label: {
                    label: '',
                    description: '',
                    section: '',
                    visible: false,
                },
            }
        },
        methods: {
           async addLabel() {
             this.$store.dispatch('uxModule/setLoading')
            try {
               await this.$store.dispatch('labelModule/addLabel', this.label)
                this.$store.dispatch('uxModule/hideLoader');
                this.showModal = false;
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader')
            }
            }
        },
        watch: {
            showModal() {
                this.label = {
                    label: '',
                    description: '',
                    section: '',
                    visible: false,
                };
            }
        }
    }
</script>
