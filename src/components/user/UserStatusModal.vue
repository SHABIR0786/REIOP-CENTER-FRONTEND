<template>
<b-modal v-model="showModal" size="md" no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            User Status
        </div>
    </template>
        <b-container fluid>
            <b-row class="mb-1">
                    <b-col cols="12">
                        <b-input-group prepend="Status" class="mb-2" id="status" label="Status" label-for="status">
                            <b-form-select :state="validateState('status')" aria-describedby="status" :options="isActiveStatus" v-model="$v.user.status.$model" required></b-form-select>
                            <b-form-invalid-feedback id="name">User Status Field is Required.</b-form-invalid-feedback>
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
                    Update
                </b-button>
            </div>
        </template>
</b-modal>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
    required,
    // minLength,
    // email
} from "vuelidate/lib/validators";
export default {
    mixins: [validationMixin],
    name: 'UserStatusModal',
    props: {
        showModal: {
            type: Boolean
        },
        propsData: {
            type: Object
        },
    },
    data() {
        return {
            user: {
                status: null,

            },
            isActiveStatus: [
                { value: 1, text: 'Active' },
                { value: 0, text: 'Deactive' },
            ]
        }
    },
    validations: {
        user: {
            status: {
                required
            },

        }
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.user[name];
            return $dirty ? !$error : null;
        },

        onSubmit() {
            this.$v.user.$touch();
            if (this.$v.user.$anyError) {
                console.log('validation error');
                
                return;
            }
            if(this.user.status==null) {

                this.$bvToast.toast("User Status Field is required.", {
                    title: "Validate",
                    variant: 'warning',
                    autoHideDelay: 5000,
                });
                return;

            }
            // console.log('this.user', this.user);
            
           this. $emit('save', this.user);
        },
    },
            watch: {
            showModal() {
                if(this.showModal){
                    console.log('this.propsData',this.propsData);
                    
                    this.user= {...this.propsData};
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
