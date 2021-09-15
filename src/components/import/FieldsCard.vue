<template>
    <b-card
        header-tag="header"
        :header="title"
        header-bg-variant="light"
        header-text-variant="primary"
        class="card"
    >
        <div v-if="!importedFields">
            <b-form-radio-group
                    :options="tableFields"
                    v-model="selected"
                    stacked
                    @change="$emit('selectItem', selected)"
            ></b-form-radio-group>
        </div>

        <div v-if="importedFields">
            <span>Email</span>
            <b-form-radio-group
                    :options="importedFields.email"
                    v-model="selected"
                    stacked
                    @change="$emit('selectItem', selected)"
            ></b-form-radio-group>
            <span>Golden Address</span>
            <b-form-radio-group
                    :options="importedFields.golden_address"
                    v-model="selected"
                    stacked
                    @change="$emit('selectItem', selected)"
            ></b-form-radio-group>
            <span>List</span>
            <b-form-radio-group
                    :options="importedFields.list"
                    v-model="selected"
                    stacked
                    @change="$emit('selectItem', selected)"
            ></b-form-radio-group>
            <span>Phone Number</span>
            <b-form-radio-group
                    :options="importedFields.phone"
                    v-model="selected"
                    stacked
                    @change="$emit('selectItem', selected)"
            ></b-form-radio-group>
            <span>Seller</span>
            <b-form-radio-group
                    :options="importedFields.seller"
                    v-model="selected"
                    stacked
                    @change="$emit('selectItem', selected)"
            ></b-form-radio-group>
            <span>Subject</span>
            <b-form-radio-group
                    :options="importedFields.subject"
                    v-model="selected"
                    stacked
                    @change="$emit('selectItem', selected)"
            ></b-form-radio-group>
        </div>

    </b-card>
</template>
<script>
export default {
    name: 'FieldsCard',
    props: {
        tableFields: {
            type: Array
        },
        title: {
            type: String
        },
        importedFields: {
            type: Object
        }
    },
    data () {
        return {
            selected: ''
        }
    },
    
}
</script>
<style>
    .card {
        word-break: break-word;
    }
</style>
