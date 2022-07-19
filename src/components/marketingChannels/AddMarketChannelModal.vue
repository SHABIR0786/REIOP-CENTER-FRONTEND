<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Marketing Channel
            </div>
        </template>
        <b-container fluid>
            <b-row  class="text-center">
                <b-row class="mb-1 text-center col-12">
                    <b-col cols="12">
                        <b-input-group prepend="Channel Name" class="mb-2" id="marketing_channel_name" label="New Channel Name" label-for="marketing_channel_name">
                            <b-form-input :state="validateState('marketing_channel_name')" v-model="$v.marketingChannels.marketing_channel_name.$model" required aria-describedby="marketing_channel_name"></b-form-input>
                            <b-form-invalid-feedback id="marketing_channel_name">Channel Name Field is Required.</b-form-invalid-feedback>

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
                        @click="onSubmit">
                    Add
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
    required
    } from "vuelidate/lib/validators";
    export default {
        mixins: [validationMixin],
        name: 'AddChannelModal',
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
              marketingChannels: {
                marketing_channel_name: '',
                },
                
            }
        },
        validations: {
            marketingChannels: {
                marketing_channel_name: { required }
            },
        },
        methods:{
        validateState(name) {
            const { $dirty, $error } = this.$v.marketingChannels[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.marketingChannels.$touch();
            if (this.$v.marketingChannels.$anyError) {
                return;
            }
           this. $emit('add', this.marketingChannels);
           this.marketingChannels.marketing_channel_name = '';
           this.$v.marketingChannels.$reset();
        },
    },
    }
</script>

<style scoped>
    .input-helper {
        text-align: start;
    }
</style>
