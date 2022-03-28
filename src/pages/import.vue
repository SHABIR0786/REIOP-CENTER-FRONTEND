<template>
    <b-container fluid :class="`import-container import main-content ${isCollapsed ? 'wide-content' : ''}`">
        <b-row>
            <b-col>
                <b-form-file
                    v-model="uploadedFile"
                    @change="previewFile"
                    placeholder="Choose or drop a xlsx or csv file"
                    drop-placeholder="Drop file here"
                    accept=".xls, .xlsx, .csv"
                    variant="primary"
                    class="mt-2"
                ></b-form-file>
            </b-col>
        </b-row>
        <b-row  class="mt-4 mb-3">
            <b-col cols="12" md="3">
                <fields-card class="field-section h-100" :fromField="fromField" :tableFields="uploadedFields" :title="`Uploaded Fields`" @selectItem="selectUploadedField"/>
            </b-col>
            <b-col cols="12" md="4">
                <fields-card class="target-section h-100" :toField="toField"  :importedFields="importedFields" :title="`Target Fields`" @selectItem="selectTargetField"/>
            </b-col>
          <b-col cols="12" md="4" offset-md="1">
            <mapped-fields class="mapped-fields h-100" :items="mappedItems" @clearMappedItem="clearMappedItem"></mapped-fields>
            <b-row class="text-right mt-5">
            </b-row>
          </b-col>
        </b-row>
      <b-row>
        <b-col cols="12" md="8">
          <b-row class="map-button text-right">
            <b-col>
              <b-button variant="primary" @click="mapFields" :disabled="!(fromField && toField)">Map</b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="text-right" cols="12" md="4">
          <b-btn variant="primary" @click="confirm(mappedItems)" >Import</b-btn>
        </b-col>
      </b-row>
      <confirm-modal :showModal="showConfirmModal" :is-have-mapped-items="isHaveMappedItems" @modalResponse="confirmImport"></confirm-modal>
    </b-container>
</template>

<script>
import { mapGetters } from "vuex"
import XLSX from "xlsx"
import FieldsCard from "@/components/import/FieldsCard"
import MappedFields from '../components/import/MappedFields.vue'
import ConfirmModal from "../components/confirmModal/ConfirmModal";

const utf8 = require('utf8');

export default {
    name: "Import",
    props: ['upload_type', 'list_settings', 'skip_source'],
    components: {
        FieldsCard,
        MappedFields,
        ConfirmModal,
    },
    data () {
        return {
            uploadedFile: null,
            file: null,
            jsonSheet: [],
            tableLabels: ['emails', 'golden_addresses', 'lists', 'phones', 'sellers', 'subjects'],
            uploadedFields: [],
            uploadedAllFields: [],
            selectedFields: [],
            fromField: '',
            toField: '',
            url: '',
            mappedItems: [],
            importedFields: {},
            showConfirmModal: false,
            isHaveMappedItems: false
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
            emailFields: 'importModule/emailFields',
            goldenAddressFields: 'importModule/goldenAddressFields',
            phoneNumberFields: 'importModule/phoneNumberFields',
            sellerFields: 'importModule/sellerFields',
            subjectFields: 'importModule/subjectFields',
            schemas: 'importModule/schemas',
            importFields: 'importModule/importFields'
        })
    },
    async created () {
        await this.$store.dispatch('importModule/loadVisibleFields')
        if (this.upload_type) {
            if(this.upload_type === 'single') {
                this.importedFields = {
                    seller: this.sellerFields,
                    subject: this.subjectFields,
                }
            } else if(this.upload_type === 'appended') {
                this.importedFields = {
                    seller: this.sellerFields,
                    subject: this.subjectFields,
                    phone: this.phoneNumberFields,
                }
            } else {
                this.importedFields = {
                    email: this.emailFields,
                    golden_address: this.goldenAddressFields,
                    phone: this.phoneNumberFields,
                    seller: this.sellerFields,
                    subject: this.subjectFields,
                }
            }
        } else if (this.skip_source) {
            this.importedFields = {
                email: this.emailFields,
                golden_address: this.goldenAddressFields,
                phone: this.phoneNumberFields,
            }
        }
    },
    methods: {
        confirm(item) {
          let requiredFields = ['subject_address', 'subject_city', 'subject_state', 'subject_zip'];
          let mappedFields = []
          item.forEach(item => {
            mappedFields.push(item['toField'])
          })
          let requiredExist = requiredFields.every( ai => mappedFields.includes(ai) );
          this.showConfirmModal  = true;
          this.isHaveMappedItems = !!requiredExist;
        },
        confirmImport (response) {
          this.showConfirmModal = false;
          if(response) {
            this.upload();
          }
        },
        previewFile (e) {
            let $this = this
            let files = e.target.files, f = files[0]
            this.file = e.target.files[0];

            let reader = new FileReader()
            this.$store.dispatch('uxModule/setLoading')
            reader.onload = (e) => {
              var data = new Uint8Array(e.target.result);
              var workbook = XLSX.read(data, {type: 'array'});
              let sheetName = workbook.SheetNames[0]
              let sheetsList = workbook.SheetNames
              let sheetDataV2 = XLSX.utils.sheet_to_json(workbook.Sheets[sheetsList[0]], {header: 1, defval: '', blankrows: true});

              let worksheet = workbook.Sheets[sheetName];
              $this.jsonSheet = XLSX.utils.sheet_to_json(worksheet);
              this.uploadedFields = []
              this.uploadedAllFields = []
              if (sheetDataV2 && sheetDataV2[0] && sheetDataV2[0].length > 0) {
                   for(let i = 0; i < sheetDataV2[0].length; i++) {
                     var sheetHeader = utf8.decode(sheetDataV2[0][i]);
                      $this.uploadedFields.push(sheetHeader)
                      $this.uploadedAllFields.push(sheetHeader)
                  }
                }
              this.$store.dispatch('uxModule/hideLoader')
            };
            reader.readAsArrayBuffer(f);
        },
        selectUploadedField(field) {
            this.fromField = field
        },
        selectTargetField(field) {
            this.toField = field
        },
        mapFields() {
            let lastElementId = 0;
            let status = false;
            this.mappedItems.forEach(item => {
                if (item.toField.includes(this.toField)) {
                    status = true;

                    const sections = item.toField.split('_');
                    const id = sections[sections.length - 1];

                    if (!isNaN(id) && id > lastElementId) { lastElementId = +id; }
                }
            })

            if (status) {
                let suffix = lastElementId + 1;
                this.toField = this.toField + '_' + suffix;
            }

            this.mappedItems.push({fromField: this.fromField, toField: this.toField, action: ""})

            let table = this.toField.split('_')[0];
            if (table === 'golden') { table = 'golden_address' }


            if (table !== 'seller' && table !== 'email' && table !== 'phone') {
                const toIndex = this.importedFields[table].findIndex(item => item.field === this.toField)
                this.importedFields[table].splice(toIndex, 1)
            }

            this.fromField = null
            this.toField = null
        },
        clearMappedItem(index) {
          let table = this.mappedItems[index].toField.split('_')[0];
          if (table === 'golden') { table = 'golden_address' }
          this.uploadedFields.push(this.mappedItems[index].fromField)
          if (table !== 'seller' && table !== 'email' && table !== 'phone') {
              this.importedFields[table].push({'label': this.mappedItems[index].toField,'field': this.mappedItems[index].toField})
          }
          this.mappedItems.splice(index, 1)
        },
        async upload() {
          await this.$store.dispatch('uxModule/setLoading')

          const mapping = [];
          this.uploadedAllFields.forEach(fromF => {
            let toItem = '';
            this.mappedItems.forEach(mappedI => {
              if (mappedI.fromField === fromF) {
                  toItem = mappedI.toField;
              }
            })

            mapping.push({fromField: fromF, toField: toItem, action: ""});
          })

          await this.$store.dispatch('importModule/uploadExcelDataV2', {
            file: this.file,
            mappedItems: mapping,
            url: this.url,
            list: this.list_settings,
            skipSource: this.skip_source,
          })
          location.reload()
        }
    }
}
</script>
<style>
.target-section .required label>span:after {
  content: " *"!important;
  color: red!important;
}
    .field-section,.target-section {
        max-height: 70vh;
        overflow: auto;
    }
    .mapped-fields {
        max-height: 70vh;
        overflow: auto;
    }
    .map-button{
      margin-right: 0!important;
    }
    .import-container {
        height: calc(100vh - 56px) !important;
    }
</style>
