<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add {{ modalTitle }}

            </div>
        </template>
        <b-container fluid>
            <b-row  class="text-center">
                <b-row class="mb-1 text-center col-12">
                    <b-col cols="12">
                        <b-input-group :prepend="modalTitle" class="mb-2" id="list_source" label="Name" label-for="name">
                          <b-form-input v-model="source.list_source" :state="validateState('list_source')" required></b-form-input>
                            <b-form-invalid-feedback id="list_source">{{ modalTitle }} Name Field is Required.</b-form-invalid-feedback>

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
            },
            modalTitle: {
              type: String
            },
            sourceType: {
              type: String
          }
        },
        data() {
            return {
              source: {
                    list_source: '',
                    source_list_type: '',

                },
                
                
            }
        },
            validations: {
        source: {
            list_source: {
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
            if(this.source.source_list_type === 'list_skip_source'){
               this.source.list_skip_source = this.source.list_source;
               delete this.source.list_source;
            }
           this. $emit('add', this.source);
        },
    },
        watch: {
            showModal() {
                if(this.showModal){
                    this.source.list_source = '';
                    this.source.source_list_type = this.sourceType;
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
