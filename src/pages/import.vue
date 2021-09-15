<template>
    <b-container fluid :class="`import main-content ${isCollapsed ? 'wide-content' : ''}`">
        <b-row>
            <b-col>
                <b-form-file
                    v-model="uploadedFile"
                    @change="previewFile"
                    placeholder="Choose or drop a xlsx or csv file"
                    drop-placeholder="Drop file here"
                    accept=".xls, .xlsx, .csv"
                    variant="primary"
                    class="mt-5"
                ></b-form-file>
            </b-col>
        </b-row>
        <b-row  class="mt-5">
            <b-col cols="12" md="3">
                <fields-card class="field-section" :tableFields="uploadedFields" :title="`Uploaded Fields`" @selectItem="selectUploadedField"/>
            </b-col>
            <b-col cols="12" md="1">
<!--                <b-row class="text-center mt-5">-->
<!--                    <b-col>-->
<!--                        <b-dropdown text="Select target table" variant="primary">-->
<!--                            <b-dropdown-item v-for="(item, index) in tableLabels" :key="index" @click="changeTable(item)">-->
<!--                                {{item}}-->
<!--                            </b-dropdown-item>-->
<!--                        </b-dropdown>-->
<!--                    </b-col>-->
<!--                </b-row>-->
                <b-row class="text-center">
                    <b-col>
                        <b-button variant="primary" @click="mapFields" :disabled="!(fromField && toField)">Map</b-button>
                    </b-col>
                </b-row>
<!--                <b-row class="text-center mt-5">-->
<!--                    <b-col>-->
<!--                        <b-btn variant="primary" @click="upload">Save</b-btn>-->
<!--                    </b-col>-->
<!--                </b-row>-->
            </b-col>
            <b-col cols="12" md="4">
                <fields-card class="field-section" :importedFields="importedFields" :title="`Target Fields`" @selectItem="selectTargetField"/>
            </b-col>
            <b-col cols="12" md="4">
                <mapped-fields class="mapped-fields" :items="mappedItems" @clearMappedItem="clearMappedItem"></mapped-fields>
                <b-row class="text-right mt-5">
                    <b-col>
                        <b-btn variant="primary" @click="upload">Save</b-btn>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from "vuex"
import XLSX from "xlsx"
import FieldsCard from "@/components/import/FieldsCard"
import MappedFields from '../components/import/MappedFields.vue'

export default {
    name: "Import",
    components: {
        FieldsCard,
        MappedFields
    },
    data () {
        return {
            uploadedFile: null,
            file: null,
            jsonSheet: [],
            tableLabels: ['emails', 'golden_addresses', 'lists', 'phones', 'sellers', 'subjects'],
            uploadedFields: [],
            selectedFields: [],
            fromField: '',
            toField: '',
            url: '',
            mappedItems: [],
            importedFields: {},
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            emailFields: 'importModule/emailFields',
            goldenAddressFields: 'importModule/goldenAddressFields',
            listFields: 'importModule/listFields',
            phoneNumberFields: 'importModule/phoneNumberFields',
            sellerFields: 'importModule/sellerFields',
            subjectFields: 'importModule/subjectFields',
            schemas: 'importModule/schemas',
            importFields: 'importModule/importFields'
        })
    },
    async created () {
        await this.$store.dispatch('importModule/loadVisibleFields')
        this.importedFields = {
            email: this.emailFields,
            golden_address: this.goldenAddressFields,
            list: this.listFields,
            phone: this.phoneNumberFields,
            seller: this.sellerFields,
            subject: this.subjectFields,
        }
    },
    methods: {
        previewFile (e) {
            let $this = this
            let files = e.target.files, f = files[0]
            this.file = e.target.files[0];

            let reader = new FileReader()
            reader.onload = (e) => {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, {type: 'array'});
                let sheetName = workbook.SheetNames[0]

                let worksheet = workbook.Sheets[sheetName];
                $this.jsonSheet = XLSX.utils.sheet_to_json(worksheet);
                this.uploadedFields = []
                if($this.jsonSheet.length > 0) {
                    for(let k in $this.jsonSheet[0]) $this.uploadedFields.push(k)
                }
            };
            reader.readAsArrayBuffer(f);
        },
        changeTable(item){
            this.uploadedFields = []
            this.mappedItems = []
            if(this.jsonSheet.length > 0)
                for(let k in this.jsonSheet[0]) this.uploadedFields.push(k)

            switch(item){
                case 'emails':
                    this.selectedFields = [...this.emailFields]
                    this.url = 'emails'
                    break
                case 'golden_addresses':
                    this.selectedFields = [...this.goldenAddressFields]
                    this.url = 'golden-addresses'
                    break
                case 'lists':
                    this.selectedFields = [...this.listFields]
                    this.url = 'list'
                    break
                case 'phones':
                    this.selectedFields = [...this.phoneNumberFields]
                    this.url = 'phones'
                    break
                case 'sellers':
                    this.selectedFields = [...this.sellerFields]
                    this.url = 'sellers'
                    break
                default:
                    this.selectedFields = [...this.subjectFields]
                    this.url = 'subjects'
            }
        },
        selectUploadedField(field) {
            this.fromField = field
        },
        selectTargetField(field) {
            this.toField = field
        },
        mapFields() {
            this.mappedItems.push({fromField: this.fromField, toField: this.toField, action: ""})

            const fromIndex = this.uploadedFields.findIndex(item => item === this.fromField)
            this.uploadedFields.splice(fromIndex, 1)
            const table = this.toField.split('_')[0];
            const toIndex = this.importedFields[table].findIndex(item => item === this.toField)
            this.importedFields[table].splice(toIndex, 1)
            this.fromField = ''
            this.toField = ''
        },
        clearMappedItem(index) {
            const table = this.mappedItems[index].toField.split('_')[0];
            this.uploadedFields.push(this.mappedItems[index].fromField)
            this.importedFields[table].push(this.mappedItems[index].toField)
            this.mappedItems.splice(index, 1)
        },
        async upload() {
            await this.$store.dispatch('uxModule/setLoading')
            // await this.$store.dispatch('importModule/uploadExcelData', {data: data, url: this.url})
            await this.$store.dispatch('importModule/uploadExcelDataV2', {file: this.file, mappedItems: this.mappedItems, url: this.url})

            await this.$store.dispatch('uxModule/hideLoader')
            this.$router.push({path: this.url}).catch(() => {})
        }
    }
}
</script>
<style>
    .field-section {
        max-height: 70vh;
        overflow: auto;
    }
    .mapped-fields {
        max-height: 60vh;
        overflow: auto;
    }
</style>
