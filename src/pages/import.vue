<template>
    <b-container fluid 
        :class="`import main-content ${isCollapsed ? 'wide-content' : ''}`"
    >
        <b-form-file
            v-model="uploadedFile"
            placeholder="Choose or drop a xlsx or csv file"
            drop-placeholder="Drop file here"
            accept=".xls, .xlsx, .csv"
            variant="primary"
            class="mt-5"
        ></b-form-file>
    </b-container>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    name: "Import",
    data () {
        return {
            uploadedFile: null
        }
    },
    computed: {
        ...mapGetters({
            cards: 'importModule/cards',
            isCollapsed: 'uxModule/isCollapsed'
        })
    },
    watch: {
        uploadedFile () {
            let data = new Uint8Array(this.uploadedFile)
            console.log(data)
        }
    }
}
</script>
