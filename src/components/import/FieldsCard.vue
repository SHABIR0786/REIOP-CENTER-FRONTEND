<template>
    <b-card
        header-tag="header"
        :header="title"
        header-bg-variant="light"
        header-text-variant="primary"
    >
        <b-form-radio-group
            :options="tableFields"
            v-model="selected"
            stacked
            @change="$emit('selectItem', selected)"
        ></b-form-radio-group>
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
        }
    },
    data () {
        return {
            selected: ''
        }
    },
    
}
</script>