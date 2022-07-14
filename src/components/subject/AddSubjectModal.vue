<template>
    <b-modal v-model="showModal" no-close-on-backdrop>
        <template #modal-header>
            <div class="w-100">
                Add Subject
            </div>
        </template>
        <b-container fluid>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Subject Address" class="mb-2" id="subject_address" label="Subject Address" label-for="subject_address">
                            <b-form-input :state="validateState('subject_address')" aria-describedby="subject_address" type="text" v-model="$v.subject.subject_address.$model" required></b-form-input>
                            <b-form-invalid-feedback id="subject_address">Subject Address Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Subject City" class="mb-2" id="subject_city" label="Subject City" label-for="subject_city">
                             <b-form-input :state="validateState('subject_city')" aria-describedby="subject_city" type="text" v-model="$v.subject.subject_city.$model" required></b-form-input>
                            <b-form-invalid-feedback id="subject_city">Subject City Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Subject State" class="mb-2" id="subject_state" label="Subject State" label-for="subject_state">
                            <b-form-input :state="validateState('subject_state')" aria-describedby="subject_state" type="text" v-model="$v.subject.subject_state.$model" required></b-form-input>
                            <b-form-invalid-feedback id="subject_state">Subject State Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Subject Zip" class="mb-2" id="subject_zip" label="subject zip" label-for="subject_zip">
                            <b-form-input :state="validateState('subject_zip')" aria-describedby="subject_zip" type="text" v-model="$v.subject.subject_zip.$model" required></b-form-input>
                            <b-form-invalid-feedback id="subject_zip">Subject Zip Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Subject County" class="mb-2" id="subject_county" label="Subject County" label-for="subject_county">
                            <b-form-input :state="validateState('subject_county')" aria-describedby="subject_county" type="text" v-model="$v.subject.subject_county.$model" required></b-form-input>
                            <b-form-invalid-feedback id="subject_county">Subject County Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Subject Age" class="mb-2" id="subject_age" label="Subject Age" label-for="subject_age">
                            <b-form-input :state="validateState('subject_age')" aria-describedby="subject_age" type="text" v-model="$v.subject.subject_age.$model" required></b-form-input>
                            <b-form-invalid-feedback id="subject_age">Subject Age Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="mb-1 text-center">
                    <b-col cols="12">
                        <b-input-group prepend="Subject Type" class="mb-2" id="subject_type" label="Subject Type" label-for="subject_type">
                            <b-form-input :state="validateState('subject_type')" aria-describedby="subject_type" type="text" v-model="$v.subject.subject_type.$model" required></b-form-input>
                            <b-form-invalid-feedback id="subject_type">Subject Type Field is Required.</b-form-invalid-feedback>
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
        name: 'AddSubjectModal',
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
                subject: {
                    subject_address: '',
                    subject_city: '',
                    subject_state: '',
                    subject_zip: '',
                    subject_county: '',
                    subject_age: '',
                    subject_type: '',
                },
            }
        },
        validations: {
            subject:{
                subject_address: {
                    required
                },
                subject_city: {
                    required
                },
                subject_state: {
                    required
                },
                subject_zip: {
                    required
                },
                subject_county: {
                    required
                },
                subject_age: {
                    required
                },
                subject_type: {
                    required
                }
            }
        },
        methods:{
        validateState(name) {
            const { $dirty, $error } = this.$v.subject[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.subject.$touch();
                if (this.$v.subject.$anyError) {
                    return;
                }
            this. $emit('save', this.subject);
            },
        },
        watch: {
            showModal() {
                this.subject = {...this.propsData}
            }
        }

    }
</script>
