<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add List {{list}}
            </div>
        </template>
            <b-row class="px-0 mx-0">
                
                    <b-col cols="12" class="mx-0 px-0">
                        <b-input-group :prepend="list" class="mb-2 mx-0">
                            <b-form-input @keyup.enter="sendRequest()" v-model="listField"></b-form-input>
                        </b-input-group>
                    </b-col>
                

            </b-row>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
                <b-button variant="primary" size="sm" class="float-right mr-2" @click="sendRequest()">
                    Add
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    export default {
        name: 'AddListSettingsModal',
        props: {
            showModal: {
                type: Boolean
            },
            propsData: {
                type: String
            }
        },
        data() {
            return {
                list: '',
                listField: ''
            }
        },
        methods: {
            sendRequest () {
                this.$emit('save', this.listField);
                this.listField = '';
            }
        },
        watch: {
            showModal() {
                this.list= this.propsData
            }
        }

    }
</script>
