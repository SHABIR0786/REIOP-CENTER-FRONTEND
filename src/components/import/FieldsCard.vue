<template>
    <b-card header-tag="header" :header="title" header-bg-variant="light" header-text-variant="primary" class="card">
        <div v-if="!importedFields">
            <b-form-radio-group :options="tableFields" v-model="selected" stacked @change="$emit('selectItem', selected)"></b-form-radio-group>
        </div>

        <div v-if="importedFields">
            <b-form-radio-group class="mt-3" :options="importedFields.subject" text-field="label" value-field="field" v-model="selected" stacked @change="$emit('selectItem', selected)"></b-form-radio-group>
            <b-form-radio-group class="mt-3" :options="importedFields.list" text-field="label" value-field="field" v-model="selected" stacked @change="$emit('selectItem', selected)"></b-form-radio-group>
            <b-form-radio-group class="mt-3" :options="importedFields.seller" text-field="label" value-field="field" v-model="selected" stacked @change="$emit('selectItem', selected)"></b-form-radio-group>
            <b-form-radio-group class="mt-3" :options="importedFields.email" v-model="selected" text-field="label" value-field="field" stacked @change="$emit('selectItem', selected)"></b-form-radio-group>
            <b-form-radio-group class="mt-3" :options="importedFields.golden_address" text-field="label" value-field="field" v-model="selected" stacked @change="$emit('selectItem', selected)"></b-form-radio-group>
            <b-form-radio-group class="mt-3" :options="importedFields.phone" text-field="label" value-field="field" v-model="selected" stacked @change="$emit('selectItem', selected)"></b-form-radio-group>
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
