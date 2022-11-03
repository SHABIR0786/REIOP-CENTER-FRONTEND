<template>
<b-modal v-model="showModal" size="md" scrollable no-close-on-backdrop>
    <template #modal-header>
        <div class="w-100">
            Switch Company
        </div>
    </template>
        <b-container fluid>
                <b-row class="">
                <b-col cols="12" class="list-group-row" >
                    <!-- <h5 class="text-center">Company - Team List</h5> -->
                    <b-list-group class="w-100">
                        <b-list-group-item role="button" button @click="switchCompany(company)" :class="{ active: company.id == company_id }" v-for="company,index in user.companies_admin" :key="index">{{company.name }}</b-list-group-item>
                    </b-list-group>
                </b-col>
                </b-row>
           
        </b-container>
        <template #modal-footer>
            <div class="w-100">
                <b-button variant="primary" size="sm" class="float-right" @click="$emit('cancel')">
                    Close
                </b-button>
            </div>
        </template>
</b-modal>
</template>

<script>
import {
    mapGetters
} from "vuex";
export default {
    name: 'SwitchCompanyModal',
    props: {
        showModal: {
            type: Boolean
        },
        company_id: {
            default:''
        }
    },
    computed: {
        ...mapGetters({
            user: 'loginModule/getAuthUser',
        })
    },
    data() {
        return {
        }
    },
    methods: {
        switchCompany(company){
           this.$emit('switchCompany', company);
           this.$emit('cancel');


        }
    }
}
</script>

<style scoped>
.input-helper {
    text-align: start;
}
.list-group-row .list-group{
    overflow-y: auto;
    max-height:400px;
}
.trash-icon{
    float:right;
    cursor:pointer;
}
</style>
