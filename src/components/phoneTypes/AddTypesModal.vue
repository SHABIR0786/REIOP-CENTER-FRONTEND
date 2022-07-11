<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Type
            </div>
        </template>
        <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Type In File" class="mb-2" id="type_in_file" label="Type In File" label-for="type_in_file">
                            <b-form-input :state="validateState('type_in_file')" aria-describedby="type_in_file" type="text" v-model="$v.types.type_in_file.$model" required></b-form-input>
                            <b-form-invalid-feedback id="type_in_file">Type In File Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
              <b-row class="mb-1 text-center">
                <b-col  cols="12">
                    <b-input-group prepend="Type In Web" class="mb-2" id="type_in_web" label="Type In Web" label-for="type_in_web">
                            <b-form-input :state="validateState('type_in_web')" aria-describedby="type_in_web" type="text" v-model="$v.types.type_in_web.$model" required></b-form-input>
                            <b-form-invalid-feedback id="type_in_web">Type In Web Field is Required.</b-form-invalid-feedback>
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
                types: {
                    type_in_file: '',
                    type_in_web: '',
                },
            }
        },
        validations: {
        types: {
            type_in_file: {
                required
            },
            type_in_web: {
                required
            }
        }
    },
    methods:{
        validateState(name) {
            const { $dirty, $error } = this.$v.types[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.types.$touch();
            if (this.$v.types.$anyError) {
                return;
            }
           this. $emit('add', this.types);
        },
    }
    }
</script>

<style scoped>
    .input-helper {
        text-align: start;
    }
</style>
