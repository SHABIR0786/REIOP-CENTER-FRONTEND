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
    <b-row class="mt-4 mb-3">
      <b-col cols="12" md="4">
        <fields-card class="field-section h-100"
                     :fromField="fromField"
                     :tableFields="uploadedFields"
                     :title="`Uploaded Fields`"
                     @selectItem="selectUploadedField"

        />
      </b-col>
      <b-col cols="12" md="3">
        <fields-card class="target-section h-100"
                     :toField="toField"
                     :importedFields="importedFields"
                     :title="`Target Fields`"
                     @selectItem="selectTargetField"
                     @dblclick="mapFields"
                     />
      </b-col>
      <b-col cols="12" md="1">
        <b-row class="map-button text-right">
          <b-col>
            <b-button variant="primary" @click="mapFields" :disabled="!(fromField && toField)">Map</b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" md="4" >
        <mapped-fields class="mapped-fields h-100" :items="mappedItems"
                       @clearMappedItem="clearMappedItem"></mapped-fields>
        <b-row class="text-right mt-5">
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-right" cols="12" md="12">
        <b-btn variant="primary" @click="confirm(mappedItems)">Import</b-btn>
      </b-col>
    </b-row>
    <confirm-modal :showModal="showConfirmModal"
                   :is-have-mapped-items="isHaveMappedItems"
                   :is-skip-validate="skipValidate"
                   :is-skip-trace="isSkippedData"
                   @modalResponse="confirmImport"></confirm-modal>
    <div v-if="!isSkippedData">
      <seller-modal :showModal="showSellerFillModal" @modalResponse="sellerFill">
        <template v-slot:sellerFill>
          <b-row>With two sellers mapped you must map two mailing addresses. You can use the same mailing address fields
            if your import has one address for both sellers.
          </b-row>
          <b-row>The target fields that would be required to map are:</b-row>
          <b-row>. seller_mailing_address,</b-row>
          <b-row>. seller_mailing_city,</b-row>
          <b-row>. seller_mailing_state,</b-row>
          <b-row> . seller_mailing_zip.</b-row>
        </template>
      </seller-modal>
    </div>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex"
import XLSX from "xlsx"
import FieldsCard from "@/components/import/FieldsCard"
import MappedFields from '../components/import/MappedFields.vue'
import ConfirmModal from "../components/confirmModal/ConfirmModal";
import SellerModal from "../components/slotModal/SlotModal";

const utf8 = require('utf8');

export default {
  name: "Import",
  props: ['upload_type', 'list_settings', 'skip_variant','skip_data'],
  components: {
    FieldsCard,
    MappedFields,
    ConfirmModal,
    SellerModal
  },
  data() {
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
      isHaveMappedItems: false,
      showSellerFillModal: false,
      skipValidate: false,
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
      importFields: 'importModule/importFields',
      skippedValidation: 'importV2Module/isSkipValidation'
    }),
    isSkippedData: {
      get() {
        return this.skippedValidation
      },
      set(newVal) {
        return newVal
      }
    }
  },
  async created() {
    await this.$store.dispatch('importModule/loadVisibleFields')
    if (this.upload_type && !this.skip_variant) {
      this.$store.dispatch('importV2Module/setSkipValidation',false)
      if (this.upload_type === 'single') {
        this.importedFields = {
          seller: this.sellerFields,
          subject: this.subjectFields,
        }
      } else if (this.upload_type === 'appended') {
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
    } else if (this.skip_variant) {
      if (this.skip_variant === 'skip_trace'){
        this.$store.dispatch('importV2Module/setSkipValidation',true)
        this.importedFields = {
          email: this.emailFields.filter(function(el) { return el.field === "email_address" }),
          golden_address: this.goldenAddressFields,
          phone: this.phoneNumberFields.filter(function(el) { return el.field === "phone_number" || el.field === "phone_type"}),
          seller: this.sellerFields.filter(function(el) { return el.field !== "seller_company_owned" }),
          subject: this.subjectFields.filter(function(el) { return el.field !== "subject_type" &&  el.field !== "subject_age" && el.field !== "subject_county"}),
        }
      }else if(this.skip_variant === 'validate'){
        this.skipValidate = true;
        this.$store.dispatch('importV2Module/setSkipValidation',false)
        this.importedFields = {
          email: this.emailFields.filter(function(el) { return el.field !== "email_skip_source" }),
          phone: this.phoneNumberFields.filter(function(el) { return el.field === "phone_number" || el.field === "phone_validity"}),
        }
      }

    }
  },
  methods: {

    sellerFill() {
      this.showSellerFillModal = false
    },
    confirm(item) {
      // Check if all required Subjects field are mapped
      let requiredSubjectsFields = ['subject_address', 'subject_city', 'subject_state', 'subject_zip'];
      let mappedFields           = []
      item.forEach(item => {
        if (!(item['toField'].includes('subject_address_line2')) && !(item['toField'].includes('seller_mailing_address_line2')))
        mappedFields.push(item['toField'])
      })

      let requiredSubjectExist = requiredSubjectsFields.every(msub => mappedFields.includes(msub));
      if (!this.isSkippedData){
        this.isHaveMappedItems   = !!requiredSubjectExist;
      }

      // If User map Sellers, then check if all required Sellers field are mapped
      let requiredSellersFields = ['seller_mailing_address', 'seller_mailing_city', 'seller_mailing_state', 'seller_mailing_zip'];

      if (this.isSkippedData && ( !requiredSubjectExist && !requiredSellersFields)){
        this.isHaveMappedItems  = false;
      }
      const sellerMapped        = mappedFields.find(element => {
        if (element.includes('seller')) {
          return true;
        }
      });
      var namesCounts   = [];
      namesCounts.push(mappedFields.filter(x => x.includes('seller_first_name')).length);
      namesCounts.push(mappedFields.filter(x => x.includes('seller_last_name')).length);
      namesCounts.push(mappedFields.filter(x => x.includes('seller_middle_name')).length);
      namesCounts.push(mappedFields.filter(x => x.includes('seller_full_name')).length);
      var sellersCount = Math.max.apply(null, namesCounts);
      var addressCount  = [];
      addressCount.push(mappedFields.filter(x => x.includes('seller_mailing_address')).length);
      addressCount.push(mappedFields.filter(x => x.includes('seller_mailing_city')).length);
      addressCount.push(mappedFields.filter(x => x.includes('seller_mailing_state')).length);
      addressCount.push(mappedFields.filter(x => x.includes('seller_mailing_zip')).length);
      if (sellerMapped) {
        let requiredSellersExist = requiredSellersFields.every(ms => mappedFields.includes(ms));

        if (this.isSkippedData && (requiredSubjectExist || requiredSellersExist)){
          this.isHaveMappedItems  = true;
        }

        const sellersNamesAdrCountEqual = addressCount.filter(element => element !== sellersCount)
        if (requiredSellersExist && !sellersNamesAdrCountEqual.length) {
          this.showConfirmModal = true;
        } else if (!this.isSkippedData){
          this.showSellerFillModal = true;
          return;
        }
      }
      if (this.skipValidate && item.length){

        let mappedValidateFields = [];
        item.forEach(item => {
            mappedValidateFields.push(item['toField'])
        })

        let requiredPhonesFields = ['phone_number', 'phone_validity'];
        let requiredPhoneExist = requiredPhonesFields.every(Ph => mappedValidateFields.includes(Ph));

        let requiredEmailFields = ['email_address', 'email_validity'];
        let requiredEmailExist = requiredEmailFields.every(Em => mappedValidateFields.includes(Em));

        if (requiredPhoneExist || requiredEmailExist){
          this.isHaveMappedItems  = true;
        }
      }
      this.showConfirmModal = true;
    },
    confirmImport(response) {
      this.showConfirmModal = false;
      if (response) {
        this.upload();
      }
    },
    previewFile(e) {
      this.$store.dispatch('uxModule/setLoading')
      let $this = this
      let files = e.target.files, f = files[0]
      this.file = e.target.files[0];
      let reader = new FileReader()
      reader.onload = (e) => {
        var data        = new Uint8Array(e.target.result);
        var workbook    = XLSX.read(data, {type: 'array'});
        let sheetName   = workbook.SheetNames[0]
        let sheetsList  = workbook.SheetNames
        let sheetDataV2 = XLSX.utils.sheet_to_json(workbook.Sheets[sheetsList[0]], {
          header: 1,
          defval: '',
          blankrows: true
        });

        let worksheet          = workbook.Sheets[sheetName];
        $this.jsonSheet        = XLSX.utils.sheet_to_json(worksheet);
        this.uploadedFields    = []
        this.uploadedAllFields = []
        if (sheetDataV2 && sheetDataV2[0] && sheetDataV2[0].length > 0) {
          for (let i = 0; i < sheetDataV2[0].length; i++) {
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
      if (!this.fromField || !this.toField){
        return
      }
      let lastElementId = 0;
      let status        = false;
      this.mappedItems.forEach(item => {
        if (item.toField.includes(this.toField)) {
          status = true;

          const sections = item.toField.split('_');
          const id       = sections[sections.length - 1];

          if (!isNaN(id) && id > lastElementId) {
            lastElementId = +id;
          }
        }
      })

      if (status) {
        let suffix   = lastElementId + 1;
        this.toField = this.toField + '_' + suffix;
      }

      this.mappedItems.push({fromField: this.fromField, toField: this.toField, action: ""})
      let table = this.toField.split('_')[0];
      if (table === 'golden') {
        table = 'golden_address'
      }


      if (table !== 'seller' && table !== 'email' && table !== 'phone') {
        const toIndex = this.importedFields[table].findIndex(item => item.field === this.toField)
        this.importedFields[table].splice(toIndex, 1)
        const fromIndex = this.uploadedFields.indexOf(this.fromField)
        this.uploadedFields.splice(fromIndex, 1)
      }

      this.fromField = null
      this.toField   = null
    },
    clearMappedItem(index) {
      let table = this.mappedItems[index].toField.split('_')[0];
      if (table === 'golden') {
        table = 'golden_address'
      }
      this.uploadedFields.push(this.mappedItems[index].fromField)
      if (table !== 'seller' && table !== 'email' && table !== 'phone') {
        this.importedFields[table].push({
          'label': this.mappedItems[index].toField,
          'field': this.mappedItems[index].toField
        });
        this.uploadedFields.unshift(
          this.mappedItems[index].fromField
       )
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
        skipSource: this.skip_variant,
        mapOrder: this.mappedItems,
        skipData: this.skip_data,
        skipValidate: this.skipValidate,
      })
      location.reload()
    }
  }
}
</script>
<style>
.target-section .required label > span:after {
  content: " *" !important;
  color: red !important;
}

.field-section, .target-section {
  max-height: 70vh;
  overflow: auto;
}

.mapped-fields {
  max-height: 70vh;
  overflow: auto;
}

.map-button {
  margin-right: 0 !important;
}

.import-container {
  height: calc(100vh - 56px) !important;
}
</style>
