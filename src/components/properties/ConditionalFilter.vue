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
                    { value: 'a', text: 'This is First option' },
                    { value: 'b', text: 'Selected Option' },
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
