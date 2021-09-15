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
            <span class="target-label">Subject</span>
            <b-form-radio-group
                    :options="importedFields.subject"
                    text-field="label"
                    v-model="selected"
                    stacked
                    @change="$emit('selectItem', selected)"
            ></b-form-radio-group>
            <span class="target-label">List</span>
            <b-form-radio-group
                    :options="importedFields.list"
                    text-field="label"
                    v-model="selected"
                    stacked
                    @change="$emit('selectItem', selected)"
            ></b-form-radio-group>
            <span class="target-label">Seller</span>
            <b-form-radio-group
                    :options="importedFields.seller"
                    text-field="label"
                    v-model="selected"
                    stacked
                    @change="$emit('selectItem', selected)"
            ></b-form-radio-group>
            <span class="target-label">Email</span>
            <b-form-radio-group
                    :options="importedFields.email"
                    v-model="selected"
                    text-field="label"
                    stacked
                    @change="$emit('selectItem', selected)"
            ></b-form-radio-group>
            <span class="target-label">Golden Address</span>
            <b-form-radio-group
                    :options="importedFields.golden_address"
                    text-field="label"
                    v-model="selected"
                    stacked
                    @change="$emit('selectItem', selected)"
            ></b-form-radio-group>
            <span class="target-label">Phone Number</span>
            <b-form-radio-group
                    :options="importedFields.phone"
                    text-field="label"
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
    }
}
</script>
<style>
    .card {
        word-break: break-word;
    }
    .target-label {
        display: inline-block;
        margin-top: 12.5px;
        font-weight: bold;
    }
</style>
