<template>
    <b-container fluid 
        :class="`import main-content ${isCollapsed ? 'wide-content' : ''}`"
    >        
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
                <fields-card
                    :tableFields="uploadedFields"
                    :title="`Uploaded Fields`"
                    @selectItem="selectUploadedField"
                />
            </b-col>
            <b-col cols="12" md="2">
                <b-row class="text-center mt-5">
                    <b-col>
                        <b-dropdown  
                            text="Select target table"
                            variant="primary"
                        >
                            <b-dropdown-item
                                v-for="(item, index) in tableLabels"
                                :key="index"
                                @click="changeTable(item)"
                            >{{item}}</b-dropdown-item>
                        </b-dropdown>
                    </b-col>
                </b-row>
                <b-row class="text-center mt-5">
                    <b-col>
                        <b-button
                            variant="primary"
                            @click="mapFields"
                            :disabled="!(fromField && toField)"
                        >Map</b-button>
                    </b-col>                    
                </b-row>
                <b-row class="text-center mt-5">
                    <b-col>
                        <b-btn
                            variant="primary"
                            @click="upload"
                        >
                            Save
                        </b-btn>
                    </b-col>                    
                </b-row>
            </b-col>
            <b-col cols="12" md="3">
                <fields-card
                    :tableFields="selectedFields"
                    :title="`Target Fields`"
                    @selectItem="selectTargetField"
                />                
            </b-col>
            <b-col cols="12" md="4">
                <mapped-fields
                    :items="mappedItems"
                    @clearMappedItem="clearMappedItem"
                ></mapped-fields>
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
            jsonSheet: [],
            tableLabels: [
                'email',
                'golden address',
                'list',
                'phone number',
                'seller',
                'subject'
            ],
            uploadedFields: [],
            selectedFields: [],
            fromField: '',
            toField: '',
            mappedItems: []
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
            subjectFields: 'importModule/subjectFields'
        })
    },
    methods: {
        previewFile (e) {
            let $this = this
            let files = e.target.files, f = files[0]
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
                console.log(this.jsonSheet)
            };
            reader.readAsArrayBuffer(f);
        },
        changeTable(item){
            this.uploadedFields = []
            this.mappedItems = [] 
            if(this.jsonSheet.length > 0)             
                for(let k in this.jsonSheet[0]) this.uploadedFields.push(k)

            switch(item){
                case 'email':
                    this.selectedFields = [...this.emailFields]
                    break
                case 'golden address':
                    this.selectedFields = [...this.goldenAddressFields]
                    break
                case 'list':
                    this.selectedFields = [...this.listFields]
                    break
                case 'phone number':
                    this.selectedFields = [...this.phoneNumberFields]
                    break
                case 'seller':
                    this.selectedFields = [...this.sellerFields]
                    break
                default:
            }
            console.log(this.selectedFields)
        },
        selectUploadedField(field) {
            this.fromField = field
        },
        selectTargetField(field) {
            this.toField = field
        },
        mapFields() {
            this.mappedItems.push({
                fromField: this.fromField,
                toField: this.toField,
                action: "",
            })
            const fromIndex = this.uploadedFields.findIndex(item => item === this.fromField)
            this.uploadedFields.splice(fromIndex, 1)
            const toIndex = this.selectedFields.findIndex(item => item === this.toField)
            this.selectedFields.splice(toIndex, 1)
            this.fromField = ''
            this.toField = ''
        },
        clearMappedItem(index) {
            this.uploadedFields.push(this.mappedItems[index].fromField)
            this.selectedFields.push(this.mappedItems[index].toField)
            this.mappedItems.splice(index, 1)
        },
        async upload() {
            let data = []
            let obj = {}
            this.jsonSheet.forEach((item) => {
                this.mappedItems.forEach((field) => {
                    obj[field.toField] = item[field.fromField]
                })
                console.log(obj)
                data.push({...obj})
            })
            console.log(data)
            const res = await this.$store.dispatch('importModule/uploadExcelData', data)
            console.log(res)
        }
    }
}
</script>
