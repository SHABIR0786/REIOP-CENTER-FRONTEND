<template>
<b-modal v-model="showModal" size="md" no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            Company Admin Role
        </div>
    </template>
        <b-container fluid>
            <b-row class="mb-1">
                    <b-col cols="12">
                        <b-input-group prepend="Name" class="mb-2" id="name" label="Name" label-for="name">
                            <b-form-input type="text" :value="user.name" readonly></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12">
                        <b-input-group prepend="Email" class="mb-2" >
                            <b-form-input type="email" :value="user.email" disabled readonly></b-form-input>
                        </b-input-group>
                    </b-col>

                    <b-col cols="12">
                        <b-input-group prepend="Company Role" id="role-id" label="Role" label-for="role-id" class="mb-2">
                            <b-form-select v-model="user.company_role" aria-describedby="role-id" :options="company_permission" required>
                            </b-form-select>
                        </b-input-group>
                      <small class="text-primary">Make this user Company Admin (Optional)</small>


                    </b-col>
                </b-row>

        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Cancel
                </b-button>
                <b-button variant="primary" size="sm" type="button" @click="onSubmit" class="float-right mr-2">
                    Update Role
                </b-button>
            </div>
        </template>
</b-modal>
</template>

<script>
import { validationMixin } from "vuelidate";
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
            user: {
                id:null,
                company_id:null,
                company_role:null,
            },
            company_permission: [
                // {
                //     value: 3,
                //     text: "User"
                // },
                {
                    value: null,
                    text: "Select Role"
                },
                {
                    value: 2,
                    text: "Company Admin"
                },
                {
                    value: 3,
                    text: "Remove Company Admin Access"
                },
            ],
        }
    },
    methods: {
        onSubmit() {
            if(!(this.user?.id && this.user?.company_id && this.user?.company_role)){
                this.$bvToast.toast("Please Select Role", {
                    title: "Validate",
                    variant: "warning",
                    autoHideDelay: 5000,
                });
                return ;

            }            
           this. $emit('updateRole', this.user);
        },
    },
    async created() {

    },
    watch: {
    showModal() {
        if(this.showModal){
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
