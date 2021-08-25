<template>
    <b-card header-tag="header" header-bg-variant="light" header="Mapped Fields">
        <b-table small striped hover :busy="isBusy" :fields="headers" :items="items" responsive="md">
            <template #table-busy>
                <div class="text-center" my-2>
                    <b-spinner
                        class="align-middle"
                    ></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template #cell(action)="data">
                <b-icon variant="primary" icon="x-circle" @click="$emit('clearMappedItem', data.index)"></b-icon>
            </template>
        </b-table>
    </b-card>
</template>
<script>
import { BIcon } from "bootstrap-vue"
import { mapGetters } from "vuex"

export default {
    name: 'FieldsCard',
    props: {
        items: {
            type: Array
        }
    },
    components: {
        BIcon
    },
    data () {
        return {
            isBusy: false
        }
    },
    computed: {
        ...mapGetters({
            headers: 'importModule/mappedHeader'
        })
    }

}
</script>
