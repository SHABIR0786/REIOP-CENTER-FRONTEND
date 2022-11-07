<template>
    <b-modal v-model="showModal" no-close-on-backdrop scrollable>
        <template #modal-header>
            <div class="w-100">
                Add Team Member
            </div>
        </template>
        <b-container fluid>
            <b-row v-if="user_exist">
                <b-col cols="12">
                        <b-input-group prepend="Email" class="mb-2" id="email" label="Email" label-for="email">
                            <b-form-input :state="validateUserCheck('email')" type="email" v-model="$v.user_check.email.$model" aria-describedby="email" required></b-form-input>
                            <b-form-invalid-feedback id="email" v-if="$v.user_check.email.email">Email Field is required.</b-form-invalid-feedback>
                            <b-form-invalid-feedback id="email" v-if="$v.user_check.email.required">Enter valid Email.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12">
                        <b-input-group prepend="Role" id="role-id" label="Role" label-for="role-id" class="mb-2">
                            <b-form-select v-model="$v.user_check.role.$model" aria-describedby="role-id" :options="company_permission" :state="validateUserCheck('role')" required>
                            </b-form-select>
                            <b-form-invalid-feedback id="role-id" >Role Field is Required.</b-form-invalid-feedback>
                        </b-input-group>

                    </b-col>
            </b-row>
            <b-row v-else>
                <b-row >
                    <b-col cols="12">
                        <b-input-group prepend="Name" class="mb-2" id="name" label="Name" label-for="name">
                            <b-form-input :state="validateState('name')" aria-describedby="name" type="text" v-model="$v.user.name.$model" required></b-form-input>
                            <b-form-invalid-feedback id="name">Member Name Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12">
                        <b-input-group prepend="Email" class="mb-2" id="email" label="Email" label-for="email">
                            <b-form-input :state="validateState('email')" type="email" v-model="$v.user.email.$model" aria-describedby="email" required></b-form-input>
                            <b-form-invalid-feedback id="email" v-if="$v.user.email.email">Email Field is required.</b-form-invalid-feedback>
                            <b-form-invalid-feedback id="email" v-if="$v.user.email.required">Enter valid Email.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                
                    <b-col cols="12">
                        <b-input-group prepend="Password" label="password" label-for="password" class="mb-2">
                            <b-input v-model="$v.user.password.$model" aria-describedby="password" :state="validateState('password')" required></b-input>
                            <b-form-invalid-feedback id="role-id" v-if="$v.user.password.minLength">Password Field is Required.</b-form-invalid-feedback>
                            <b-form-invalid-feedback id="role-id" v-if="$v.user.password.required">At Least 6 character is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12">
                        <b-input-group prepend="Role" id="role-id" label="Role" label-for="role-id" class="mb-2">
                            <b-form-select v-model="$v.user.role.$model" aria-describedby="role-id" :options="company_permission" :state="validateState('role')" required>
                            </b-form-select>
                            <b-form-invalid-feedback id="role-id" v-if="$v.user.role.required">Role Field is Required.</b-form-invalid-feedback>
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
    minLength,
    email
} from "vuelidate/lib/validators";
    export default {
        name: 'AddTeamMemberModal',
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
                user: {
                    name: '',
                    email: '',
                    password: '',
                    role:''
                },
                user_check: {
                    email: '',
                    role:'',
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
            user_exist:true,
            }
        },
        validations: {
                user: {
                    name: {
                        required
                    },
                    email: {
                        required,
                        email
                    },
                    password: {
                        required,
                        minLength: minLength(6)
                    },
                    role: {
                        required
                    },
                },
                user_check: {
                    email: {
                        required,
                        email
                    },
                    role: {
                        required
                    },
                },

            },
        methods: {
            validateState(name) {
            const { $dirty, $error } = this.$v.user[name];
            return $dirty ? !$error : null;
        },
        validateUserCheck(name) {
            const { $dirty, $error } = this.$v.user_check[name];
            return $dirty ? !$error : null;
        },
       async onSubmit() {


        if(this.user_exist){
            try{
                this.$v.user_check.$touch();
                if (this.$v.user_check.$anyError) {
                    return;
                }
                this.$store.dispatch('uxModule/setLoading');
                let response = await this.$store.dispatch('userModule/userExist', this.user_check.email);
                if(response.success){
                    this.$emit('add', this.user_check);

                }else{
                    this.$bvToast.toast(response.message, {
                        title: "Warning",
                        variant: 'warning',
                        autoHideDelay: 5000,
                    });
                    this.user_exist = false;
                    this.user.email = this.user_check.email;
                    this.user.role = this.user_check.role;
                    this.$store.dispatch('uxModule/hideLoader')
                }
            }catch(e) {
                this.$store.dispatch('uxModule/hideLoader')
                console.log('error',e);
            }
            
        }else{

            this.$v.user.$touch();
            if (this.$v.user.$anyError) {
                return;
            }

            this.$emit('add', this.user);
        }



        },
        reset() {
            this.user = {
                role: '',
                name: '',
                email:'',
                password:'',
            };
            this.user_check = {
                role: '',
                email:'',
            };
            this.$v.user.$reset();
            this.$v.user_check.$reset();
            this.user_exist=true;

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
