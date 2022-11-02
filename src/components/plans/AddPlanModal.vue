<template>
    <b-modal v-model="showModal" no-close-on-backdrop scrollable>
        <template #modal-header>
            <div class="w-100">
                Add Plan
            </div>
        </template>
        <b-container fluid>
            <b-row >
                <b-row >
                    <b-col cols="12">
                        <b-input-group prepend="Name" title="Plan Name" class="mb-2" id="name" label="Name" label-for="name">
                            <b-form-input :state="validateState('name')" aria-describedby="name" type="text" v-model="$v.plan.name.$model" required></b-form-input>
                            <b-form-invalid-feedback id="name">Plan Name Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12">
                        <b-input-group prepend="No. of Users" title="Number Of Users" class="mb-2" id="number_of_users" label="Number Of Users" label-for="number_of_users">
                            <b-form-input id="number_of_users" name="number_of_users" :state="validateState('number_of_users')"  type="text" v-model="$v.plan.number_of_users.$model" required></b-form-input>
                            <b-input-group-append>
                                <b-input-group-text title="Unlimited Users" role="button"  @click="plan.number_of_users='Unlimited'" ><span class="text-danger">Unlimited</span></b-input-group-text>
                            </b-input-group-append>
                            <b-form-invalid-feedback id="number_of_users">Number Of Users Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                </b-col>
                <b-col cols="12">
                        <b-input-group prepend="No. of Teams" title="Number Of Teams" class="mb-2" id="number_of_teams" label="Number Of Teams" label-for="number_of_teams">
                            <b-form-input id="number_of_teams" name="number_of_teams" :state="validateState('number_of_teams')"  type="text" v-model="$v.plan.number_of_teams.$model" required></b-form-input>
                            <b-input-group-append>
                                <b-input-group-text title="Unlimited Teams" role="button"  @click="plan.number_of_teams='Unlimited'" ><span class="text-danger">Unlimited</span></b-input-group-text>
                            </b-input-group-append>
                            <b-form-invalid-feedback id="number_of_teams">Number Of Teams Field is Required.</b-form-invalid-feedback>
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
    required,
} from "vuelidate/lib/validators";
    export default {
        name: 'AddPlanModal',
        mixins: [validationMixin],
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
                plan: {
                    name: '',
                    number_of_users: '',
                    number_of_teams: '',
                },
                company_permission: [
                // {
                //     value: 3,
                //     text: "User"
                // },
                {
                    value: 2,
                    text: "Admin"
                }
            ],
            }
        },
        validations: {
            plan: {
                    name: {
                        required
                    },
                    number_of_users: {
                        required,
                    },
                    number_of_teams: {
                        required,
                    },
                }
            },
        methods: {
            validateState(name) {
            const { $dirty, $error } = this.$v.plan[name];
            return $dirty ? !$error : null;
        },
        onSubmit() {
            this.$v.plan.$touch();
            if (this.$v.plan.$anyError) {
                return;
            }
            if(isNaN(this.plan.number_of_users) && this.plan.number_of_users!="Unlimited"){
                this.$bvToast.toast("The No. of Users should be Number or Unlimited", {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
                return false;
            }
            if(isNaN(this.plan.number_of_teams) && this.plan.number_of_teams!="Unlimited"){
                this.$bvToast.toast("The No. of Teams should be Number or Unlimited", {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
                return false;
            }
           this.$emit('add', this.plan);


        },
        reset() {
            this.plan = {
                name: '',
                number_of_users: '',
                number_of_teams: '',
            };
            this.$v.plan.$reset();
        },
        },
        watch: {
            showModal() {
                if(this.showModal){
                    this.reset();
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
