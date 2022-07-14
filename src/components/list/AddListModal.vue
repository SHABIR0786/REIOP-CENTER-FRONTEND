<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add List
            </div>
        </template>
        <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Type" class="mb-2" id="list_type" label="List Type" label-for="list_type">
                            <b-form-input :state="validateState('list_type')" aria-describedby="list_type" type="text" v-model="$v.list.list_type.$model" required></b-form-input>
                            <b-form-invalid-feedback id="list_type">List Type Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Group" class="mb-2" id="list_group" label-for="list_group">
                            <b-form-input :state="validateState('list_group')" aria-describedby="list_group" type="text" v-model="$v.list.list_group.$model" required></b-form-input>
                            <b-form-invalid-feedback id="list_group">List Group Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Market" class="mb-2" id="list_market" label-for="list_market">
                            <b-form-input :state="validateState('list_market')" aria-describedby="list_market" type="text" v-model="$v.list.list_market.$model" required></b-form-input>
                            <b-form-invalid-feedback id="list_market">List Market Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Source" class="mb-2" id="list_source" label-for="list_source">
                            <b-form-input :state="validateState('list_source')" aria-describedby="list_source" type="text" v-model="$v.list.list_source.$model" required></b-form-input>
                            <b-form-invalid-feedback id="list_source">List Source Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Stack" class="mb-2" id="list_stack" label-for="list_stack">
                            <b-form-input :state="validateState('list_stack')" aria-describedby="list_stack" type="text" v-model="$v.list.list_stack.$model" required></b-form-input>
                            <b-form-invalid-feedback id="list_stack">List Stack Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
                <b-button variant="primary" size="sm" type="button" @click="onSubmit" class="float-right mr-2">
                    Add
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
    export default {
        mixins: [validationMixin],
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
                    list_market: '',
                    list_source: '',
                    list_stack: '',
                },
            }
        },
        validations: {
            list:{
                list_type: {
                    required
                },
                list_group: {
                    required
                },
                list_market: {
                    required
                },
                list_source: {
                    required
                },
                list_stack: {
                    required
                }
            }
        },
        methods:{
        validateState(name) {
            const { $dirty, $error } = this.$v.list[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.list.$touch();
                if (this.$v.list.$anyError) {
                    return;
                }
            this. $emit('save', this.list);
            },
        },
        watch: {
            showModal() {
                this.list= {...this.propsData}
            }
        }

    }
</script>
