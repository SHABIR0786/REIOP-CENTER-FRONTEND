<template>
<b-modal v-model="showModal" size="md" no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            Edit User
        </div>
    </template>
        <b-container fluid>
            <b-row class="mb-1">
                    <b-col cols="12">
                        <b-input-group prepend="Name" class="mb-2" id="name" label="Name" label-for="name">
                            <b-form-input :state="validateState('name')" aria-describedby="name" type="text" v-model="$v.user.name.$model" required></b-form-input>
                            <b-form-invalid-feedback id="name">User Name Field is Required.</b-form-invalid-feedback>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12">
                        <b-input-group prepend="Email" class="mb-2" >
                            <b-form-input type="email" :value="user.email" disabled></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="12">
                        <b-input-group prepend="Password" class="mb-2">
                            <b-input v-model="user.password" ></b-input>
                        </b-input-group>
                        <small class="text-primary">If Empty, By Default set Previous Password.</small>

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
                <b-button
                    variant="transparent"
                    size="sm"
                    class="mr-3 float-left"
                    @click="$emit('status')"
                    v-b-tooltip.hover title="Deactivate User"
                    >
                    <b-icon class="cursor-pointer" variant="danger" icon="gear" ></b-icon> Status
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
import {
    mapGetters
} from "vuex";
export default {
    mixins: [validationMixin],
    name: 'EditUserModal',
    props: {
        showModal: {
            type: Boolean
        },
        propsData: {
            type: Object
        },
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',

        }),
    },
    data() {
        return {
            perPage: 20,
            user: {
                name: '',
                email: '',
                password: '',

            },
        }
    },
    validations: {
        user: {
            name: {
                required
            },
            // password: {
            //     required,
            //     minLength: minLength(6)
            // }
            // email: {
            //     required,
            //     email
            // },
            // team_id: {
            //     required
            // },
            // role: {
            //     required
            // }
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
            if(this.user.password.length > 0 && this.user.password.length < 6) {

                this.$bvToast.toast("Password Field should be minimum 6 character", {
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
    async created() {

    },
            watch: {
            showModal() {
                if(this.showModal){
                    this.user= {...this.propsData};
                    this.user.password = '';
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
