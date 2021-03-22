<template>
    <b-container fluid 
        :class="`import main-content ${isCollapsed ? 'wide-content' : ''}`"
    >
        <b-form-file
            v-model="uploadedFile"
            @change="previewFile"
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
import XLSX from "xlsx"

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
    methods: {
        previewFile (e) {
            let files = e.target.files, f = files[0]
            let reader = new FileReader()
            reader.onload = (e) => {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, {type: 'array'});
                let sheetName = workbook.SheetNames[0]
                /* DO SOMETHING WITH workbook HERE */
                console.log(workbook);
                let worksheet = workbook.Sheets[sheetName];
                console.log(XLSX.utils.sheet_to_json(worksheet));
            };
            reader.readAsArrayBuffer(f);
        }
    }
}
</script>
