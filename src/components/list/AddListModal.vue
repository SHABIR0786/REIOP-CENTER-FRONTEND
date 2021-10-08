<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add List
            </div>
        </template>
        <b-container fluid>
            <b-row class="text-center">
<!--                <b-row class="mb-1 text-center">-->
<!--                    <b-col cols="12">-->
<!--                        <b-input-group prepend="Dept" class="mb-2">-->
<!--                            <b-form-input v-model="list.dept"></b-form-input>-->
<!--                        </b-input-group>-->
<!--                    </b-col>-->
<!--                </b-row>-->
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="List Type" class="mb-2">
                            <b-form-input v-model="list.list_type"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Group" class="mb-2">
                            <b-form-input v-model="list.list_group"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Code" class="mb-2">
                            <b-form-input v-model="list.list_code"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Source" class="mb-2">
                            <b-form-input v-model="list.list_source"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-input-group prepend="Stack" class="mb-2">
                            <b-form-input v-model="list.list_stack"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
                <b-button variant="primary" size="sm" class="float-right mr-2" @click="$emit('save', list)">
                    Add
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
    export default {
        name: 'AddListModal',
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
                list: {
                    list_type: '',
                    list_group: '',
                    list_code: '',
                    list_source: '',
                    list_stack: '',
                },
            }
        },
        watch: {
            showModal() {
                this.list= {...this.propsData}
            }
        }

    }
</script>
