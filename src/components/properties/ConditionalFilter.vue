<template>
    <b-row>
        <b-col cols="5">
            <b-form-select class="select" v-model="fieldToFilter" :options="field_options"></b-form-select>
        </b-col>
        <b-col cols="3">
            <b-form-select v-if="fieldToFilter" v-model="containOption" :options="contains_options" class="select"></b-form-select>
        </b-col>
        <b-col cols="3">
            <b-form-input v-if="fieldToFilter" class="select"></b-form-input>
<!--            <b-form-select v-if="selected" class="select"></b-form-select>-->
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
                containOption: '',
                fieldToFilter: '',
                field_options: [
                    { value: 'list_type', text: 'List Type' },
                    { value: 'list_group', text: 'List Group' },
                    { value: 'list_market', text: 'List Market' },
                    { value: 'list_source', text: 'List Source' },
                    { value: 'subject_address', text: 'Subject Address' },
                    { value: 'subject_address_line2', text: 'Subject Address Line 2' },
                    { value: 'subject_city', text: 'Subject City' },
                    { value: 'subject_state', text: 'Subject State' },
                    { value: 'subject_zip', text: 'Subject Zip' },
                    { value: 'subject_county', text: 'Subject Country' },
                    { value: 'subject_market', text: 'Subject Market' },
                    { value: 'subject_age', text: 'Subject Age' },
                    { value: 'subject_type', text: 'Subject Type' },
                ],
                test: 'Hello world',
                contains_options: [
                    { value: 'contains', text: 'Contains' },
                    { value: 'not_contains', text: 'Not Contains' },
                    { value: 'is_empty', text: 'Is Empty' },
                    { value: 'is_not_empty', text: 'Is Not Empty' },

                ],
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
