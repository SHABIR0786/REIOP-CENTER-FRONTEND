<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Skip Source
            </div>
        </template>
        <b-container fluid>
            <b-row  class="text-center">
                <b-row class="mb-1 text-center col-12">
                    <b-col cols="12">
                        <b-input-group prepend="Source Name" class="mb-2" id="list_skip_source" label="Name">
                          <b-form-input v-model="source.list_skip_source" :state="validateState('list_skip_source')" required></b-form-input>
                            <b-form-invalid-feedback id="list_skip_source">Skip Source Name Field is Required.</b-form-invalid-feedback>

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
                        @click="onSubmit"
                >
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

        name: 'AddSourceModal',
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
              source: {
                    list_skip_source: '',
                    source_list_type: 'list_skip_source',

                },
                
                
            }
        },
            validations: {
        source: {
            list_skip_source: {
                required
            },
        }
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.source[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.source.$touch();
            if (this.$v.source.$anyError) {
                return;
            }
           this. $emit('add', this.source);
        },
    },
        watch: {
            showModal() {
                if(this.showModal){
                    this.source.list_skip_source = '';
                    this.source.source_list_type = 'list_skip_source';
                }

            }
        }
    }
</script>

<style scoped>
    .input-helper {
        text-align: start;
    }
</style>
