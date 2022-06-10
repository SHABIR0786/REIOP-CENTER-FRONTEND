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
    <div class="mt-4 parent">
      <div class="child">
        <fields-card
            class="uploaded-fields-card"
            :fromField="fromField"
            :tableFields="uploadedFields"
            :title="`Uploaded Fields`"
            @selectItem="selectUploadedField"
        />
      </div>
      <div class="child">
        <fields-card class="target-section"
                     :toField="toField"
                     :importedFields="importedFields"
                     :title="`Target Fields`"
                     @selectItem="selectTargetField"
                     @dblclick="mapFields"
        />
      </div>
      <div class="map-button child">
        <b-button class="w-100" variant="primary" @click="mapFields" :disabled="!(fromField && toField)">Map</b-button>
      </div>
      <div class="child">
        <mapped-fields class="mapped-fields" :items="mappedItems"
                       @clearMappedItem="clearMappedItem"></mapped-fields>
        <b-row class="text-right mt-5">
        </b-row>
      </div>
    </div>
    <b-row>
      <b-col class="text-right" cols="12" md="12">
        <b-btn variant="primary" @click="confirm(mappedItems)">Import</b-btn>
      </b-col>
    </b-row>
    <confirm-modal :showModal="showConfirmModal"
                   :is-have-mapped-items="isHaveMappedItems"
                   :is-skip-validate="skipValidate"
                   :is-skip-trace="isSkippedData"
                   @modalResponse="confirmImport">
    </confirm-modal>
      <seller-modal :showModal="showSellerFillModal" @modalResponse="sellerFill">
        <template v-slot:sellerFill>
          <div v-if="!isSkippedData && sellerMapped ">
            <b-row>With two sellers mapped you must map two mailing addresses. You can use the same mailing address fields
              if your import has one address for both sellers.
            </b-row>
            <b-row>The target fields that would be required to map are:</b-row>
            <b-row>. seller_mailing_address,</b-row>
            <b-row>. seller_mailing_city,</b-row>
            <b-row>. seller_mailing_state,</b-row>
            <b-row> . seller_mailing_zip.</b-row>
          </div>
          <div>
            <div v-if="missingSellersData.length">
            <b>Missing fields to complete seller's mapping.</b><br>
            {{missingSellersData.join(', ')}}
            </div>
           <div v-if="missingSubjectsData.length">
             <b>Missing fields to complete subject's mapping.</b><br>
             {{missingSubjectsData.join(', ')}}
           </div>
           <div v-if="missingListData.length">
            <b>Missing fields to complete list mapping.</b><br>
            {{missingListData.join(', ')}}
           </div>
            <div v-if="missingValidateData.length">
              <b>Missing fields to complete validate mapping.</b><br>
              {{missingValidateData.join(', ')}}
            </div>
          </div>
        </template>
      </seller-modal>
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
  props: ['upload_type', 'list_settings', 'skip_variant', 'skip_data'],
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
      listPullSettings : '',
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
      missingSellersData: [],
      missingSubjectsData: [],
      missingListData: [],
      sellersNamesAdrCountEqual: [],
      requiredSellersFields: [],
      missingValidateData:[],
      skipValidate: false,
      isCombinedImport: false,
      sellerMapped:false,
      list: {
        list_market: '',
        list_group: '',
        list_type: '',
        list_source: '',
        list_skip_source: '',
        list_skip_date: '',
        list_pull_date: '',
        list_hash: '',
        user_id: '',
        team_id: '',
      },
      importTypes: {
        single: 'New Records From Single Pull Raw Data',
        appended: 'New Records From Single Pull Appended Data',
        combined: 'New Records From Combined Raw Data',
        skip_trace: 'Updating Records With Skip Trace Data',
        skip_validity: 'Updating Records With Phone and/or Email Validity',
      },
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
      listFields: 'importModule/listFields',
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
  created() {
    this.targetFields();
  },
  methods: {
    sellerFill() {
      this.showSellerFillModal = false
      this.missingSellersData = [];
      this.missingSubjectsData = [];
      this.missingListData = [];
      this.sellersNamesAdrCountEqual = [];
      this.requiredSellersFields = [];
      this.sellerMapped = false;
      this.missingValidateData = [];
    },
    confirm(item) {

      if (this.upload_type === 'combined') {
        this.isCombinedImport = true
      }
      // Check if all required Subjects field are mapped
      let requiredSubjectsFields = ['subject_address', 'subject_city', 'subject_state', 'subject_zip'];
      let mappedFields           = []
      item.forEach(item => {
        if (!(item['toField'].includes('subject_address_line2')) && !(item['toField'].includes('seller_mailing_address_line2')))
          mappedFields.push(item['toField'])
      })

      let requiredSubjectExist = requiredSubjectsFields.every(msub => mappedFields.includes(msub));

      // If User map Sellers, then check if all required Sellers field are mapped
      let requiredSellersFields = ['seller_mailing_address', 'seller_mailing_city', 'seller_mailing_state', 'seller_mailing_zip'];
      if (this.isSkippedData){
        requiredSellersFields.push('seller_first_name','seller_last_name');
      }
      let requiredSellersExist = requiredSellersFields.every(ms => mappedFields.includes(ms));
      if (this.isSkippedData && (requiredSubjectExist || requiredSellersExist)) {
        this.isHaveMappedItems = true;
      }
      const sellerMapped = mappedFields.find(element => {
        if (element.includes('seller')) {
          return true;
        }
      });
      const subjectMapped = mappedFields.find(element => {
        if (element.includes('subject')) {
          return true;
        }
      });

      if (this.isSkippedData && (requiredSubjectExist || requiredSellersExist)) {
        this.isHaveMappedItems = true;
      }

      var namesCounts    = [];
      namesCounts.push(mappedFields.filter(x => x.includes('seller_first_name')).length);
      namesCounts.push(mappedFields.filter(x => x.includes('seller_last_name')).length);
      namesCounts.push(mappedFields.filter(x => x.includes('seller_middle_name')).length);
      namesCounts.push(mappedFields.filter(x => x.includes('seller_full_name')).length);
      var sellersCount = Math.max.apply(null, namesCounts);
      var mappedSellerAddresses = [];
      mappedSellerAddresses.push(mappedFields.filter(x => x.includes('seller_mailing_address')));
      mappedSellerAddresses.push(mappedFields.filter(x => x.includes('seller_mailing_city')));
      mappedSellerAddresses.push(mappedFields.filter(x => x.includes('seller_mailing_state')));
      mappedSellerAddresses.push(mappedFields.filter(x => x.includes('seller_mailing_zip')));

      var addressLengths =  [];
      for(let i in mappedSellerAddresses) {
        addressLengths.push(mappedSellerAddresses[i].length)
      }
      var addressMaxLength = Math.max.apply(null, addressLengths);

      let missingSubjectData = requiredSubjectsFields.filter(ms => !mappedFields.includes(ms));
      let missingSellersData = requiredSellersFields.filter(ms => !mappedFields.includes(ms) );

      if (subjectMapped  && !this.skipValidate) {
          if (missingSubjectData.length ){
            this.missingSubjectsData = missingSubjectData;
            this.showSellerFillModal = true;
            if (!sellerMapped && !this.isCombinedImport){
              return;
            }
          }
          this.isHaveMappedItems = true;
      }

      if (sellerMapped) {
        this.sellerMapped = true;
        const sellersNamesAdrCountEqual = mappedSellerAddresses.filter(element => element.length !== sellersCount)
        if (requiredSellersExist && (sellersCount === 0 || !sellersNamesAdrCountEqual.length)) {
          this.showConfirmModal = true;
          return;
        } else if(!missingSellersData.length ) {
            if (sellersCount >= addressMaxLength){
              missingSellersData = sellersNamesAdrCountEqual
            }else if(sellersCount < addressMaxLength){
              for(let i in sellersNamesAdrCountEqual) {
                requiredSellersFields =  requiredSellersFields.filter(el => sellersNamesAdrCountEqual[i][0] !== el)
              }
              missingSellersData = requiredSellersFields;
            }
          }

        this.missingSellersData = missingSellersData;
        this.showSellerFillModal = true;
        if (this.missingSubjectsData && !this.isCombinedImport){
          return;
        }
      }
      // Validate data
      if (this.skipValidate && item.length) {

        let mappedValidateFields = [];
        item.forEach(item => {
          mappedValidateFields.push(item['toField'])
        })

        let requiredPhonesFields = ['phone_number', 'phone_validity'];
        let missingPhoneField   = requiredPhonesFields.filter(Ph => !mappedValidateFields.includes(Ph));

        let requiredEmailFields = ['email_address', 'email_validity'];
        let missingEmailFields  = requiredEmailFields.filter(Em => !mappedValidateFields.includes(Em));

        if (missingEmailFields.length !==2 && missingEmailFields.length ){
          this.missingValidateData.push(missingEmailFields);
          this.showSellerFillModal = true;
          if (missingPhoneField.length === 2){
            return;
          }
        }
        if (missingPhoneField.length !==2 && missingPhoneField.length ){
          this.missingValidateData.push(missingPhoneField);
          this.showSellerFillModal = true;
          return;
        }
        if (missingPhoneField || missingEmailFields) {
          this.isHaveMappedItems = true;
        }
      }

      // Combined data

      if (this.upload_type === 'combined') {

         let requiredListSettingsFields = ['list_type', 'list_group', 'list_market', 'list_source','list_pull_date'];
         let missingListData = requiredListSettingsFields.filter(ms => !mappedFields.includes(ms));
         if (missingListData){
           this.missingListData = missingListData;
           this.showSellerFillModal = true;
           return;
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
      this.mappedItems = []
      this.targetFields();
      let $this     = this
      let files     = e.target.files, f = files[0]
      this.file     = e.target.files[0];
      let reader    = new FileReader()
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
      if (!this.fromField || !this.toField) {
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

    setTimeout(() => {
      let element = document.querySelector('.mapped-fields .card-body');
      if(element) {
        // element.scrollTop = element.scrollHeight;
        element.scroll({ top: (element.scrollHeight + 150), behavior: 'smooth' });

      }
    }, 100);

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
      if (!this.list_settings){
        this.listPullSettings = 'Combined Data'
      }else {
        this.listPullSettings = this.list_settings
      }
      await this.$store.dispatch('importModule/uploadExcelDataV2', {
        file: this.file,
        mappedItems: mapping,
        url: this.url,
        list: this.listPullSettings,
        uploadType: this.importTypes[this.upload_type],
        skipSource: this.skip_variant,
        mapOrder: this.mappedItems,
        skipData: this.skip_data,
        skipValidate: this.skipValidate,
      })
       location.reload()
    },
    async targetFields(){
      await this.$store.dispatch('importModule/loadVisibleFields')
      if (this.upload_type && !this.skip_variant) {
        this.$store.dispatch('importV2Module/setSkipValidation', false)
        if (this.upload_type === 'single') {
          this.importedFields = {
            seller: this.sellerFields,
            subject: this.subjectFields,
          }
        } else if (this.upload_type === 'appended') {
          this.importedFields = {
            seller: this.sellerFields,
            subject: this.subjectFields,
            phone: this.phoneNumberFields.filter(function (el) {
              return el.field === "phone_number" || el.field === "phone_type"
            }),
            email: this.emailFields.filter(function (el) {
              return el.field === "email_address"
            }),
          }
        } else {
          this.importedFields = {
            seller: this.sellerFields,
            subject: this.subjectFields,
            list: this.listFields,
          }
        }
      } else if (this.skip_variant) {
        if (this.skip_variant === 'skip_trace') {
          this.$store.dispatch('importV2Module/setSkipValidation', true)
          this.importedFields = {
            email: this.emailFields.filter(function (el) {
              return el.field === "email_address"
            }),
            golden_address: this.goldenAddressFields,
            phone: this.phoneNumberFields.filter(function (el) {
              return el.field === "phone_number" || el.field === "phone_type"
            }),
            seller: this.sellerFields.filter(function (el) {
              return el.field !== "seller_company_owned"
            }),
            subject: this.subjectFields.filter(function (el) {
              return el.field !== "subject_type" && el.field !== "subject_age" && el.field !== "subject_county"
            }),
          }
        } else if (this.skip_variant === 'validate') {
          this.skipValidate = true;
          this.$store.dispatch('importV2Module/setSkipValidation', false)
          this.importedFields = {
            email: this.emailFields.filter(function (el) {
              return el.field !== "email_skip_source"
            }),
            phone: this.phoneNumberFields.filter(function (el) {
              return el.field === "phone_number" || el.field === "phone_validity"
            }),
          }
        }
      }
    }

  }
}
</script>
<style>
.target-section .required label > span:after {
  content: " *" !important;
  color: red !important;
}

.mapped-fields .card-body{
  max-height: 70vh;
  overflow: auto;
}

.map-button {
  /* margin-right: 0 !important; */
  height: 50px;
}

.import-container {
  height: calc(100vh - 56px) !important;
}

.parent {
  display: grid;
  grid-template-columns: 31% 30% 9% 30%;
}

.parent div:first-child {
  margin-left: 0px !important;
  /* margin-right:15px !important; */
}

.parent div:nth-child(4) {
  /* margin-left:20px !important; */
  margin-right: 0px !important;
}

.child {
  flex-grow: 1;
  margin-left: 1rem;
  margin-right: 1rem !important;
}
.import-container{
  height:100% !important;
}
.uploaded-fields-card .card-body,.field-section .card-body{
  max-height:70vh;
  overflow-y:scroll;

}
</style>
