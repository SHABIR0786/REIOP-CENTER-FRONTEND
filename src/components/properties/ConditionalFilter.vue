<template>
    <b-row>
        <b-col cols="5">
            <b-form-select class="select" v-model="selected" :options="field_options"></b-form-select>
        </b-col>
        <b-col cols="3">
            <b-form-select v-if="selected" class="select"></b-form-select>
        </b-col>
        <b-col cols="3">
            <b-form-select v-if="selected" class="select"></b-form-select>
        </b-col>
        <b-col cols="1" class="d-flex align-items-center">
            <b-icon v-if="is_single" @click="deleteFilter()" icon="trash"></b-icon>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: 'ConditionalFilter',
        props: ['index', 'is_single'],
        data() {
            return {
                selected: '',
                field_options: [
                    { value: null, text: 'Please select an option' },
                    { value: 'subject_address', text: 'Subject Address' },
                    { value: 'subject_city', text: 'Subject City' },
                    { value: 'subject_state', text: 'Subject State' },
                    { value: 'subject_zip', text: 'Subject Zip' },
                    { value: 'subject_age', text: 'Subject Age' },
                    { value: 'subject_type', text: 'Subject Type' },
                    { value: 'list_stack', text: 'List stack' },
                    { value: 'seller_full_name', text: 'Seller Full Name' },
                    { value: 'seller_first_name', text: 'Seller First Name' },
                    { value: 'seller_middle_name', text: 'Seller Middle Name' },
                    { value: 'seller_last_name', text: 'Seller Last Name' },
                    { value: 'seller_mailing_address', text: 'Seller Mailing Address' },
                    { value: 'seller_mailing_city', text: 'Seller Mailing City' },
                    { value: 'seller_mailing_state', text: 'Seller Mailing State' },
                    { value: 'seller_mailing_zip', text: 'Seller Mailing Zip' },
                    { value: 'seller_company_owned', text: 'Seller Company Owned' },
                    { value: 'total_subjects', text: 'Total Subjects' },
                    { value: 'phone_number', text: 'Phone Number' },
                    { value: 'phone_type', text: 'Phone Type' },
                    { value: 'phone_validity', text: 'Phone Validity' },
                    { value: 'phone_skip_source', text: 'Phone Skip Source' },
                    { value: 'email_address', text: 'Email Address' },
                    { value: 'email_validity', text: 'Email Validity' },
                    { value: 'email_skip_source', text: 'Email Skip Source' },
                    { value: 'golden_address', text: 'Golden Address' },
                    { value: 'golden_city', text: 'Golden City' },
                    { value: 'golden_state', text: 'Golden State' },
                    { value: 'golden_zip', text: 'Golden Zip' },
                ],
                test: 'Hello world',
            }
        },
        methods: {
            deleteFilter() {
                this.$emit('deleteConditionalFilter', this.index)
            }
        },
    }
</script>

<style>
    .select {
        width: 70% !important;
    }
</style>
