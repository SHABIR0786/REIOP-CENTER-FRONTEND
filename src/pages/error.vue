<template>
  <div class="error-sections">
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">

      <b-row class="mt-5">
        <b-tabs class="w-100" content-class="mt-3" fill>
          <b-tab title="Subject Errors" active>
            <b-table
                id="subject-table"
                small
                striped
                hover
                :busy="isBusy"
                :fields="subject_fields"
                :items="subjects"
                responsive
                :per-page="0"
                :current-page="currentPage"
                :sticky-header="true"
            >
              <template #table-busy>
                <div class="text-center" my-2>
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(id)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
              </template>
              <template #head(actions)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
              </template>
              <template #head(total_sellers)="scope">
                <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
              </template>
              <template #head(subject_state)="scope">
                <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
              </template>
              <template #head(subject_zip)="scope">
                <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
              </template>
              <template #head(subject_address)="scope">
                <div class="text-nowrap" style="width: 250px;">{{scope.label}}</div>
              </template>
              <template #head(user_id)="scope">
                <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
              </template>
              <template #head(created_at)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(updated_at)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head()="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
              </template>
              <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>
              </template>
            </b-table>
          </b-tab>
          <b-tab title="Phone Errors">
            <b-table
                id="phone-table"
                small
                striped
                hover
                :busy="isBusy"
                :fields="phone_fields"
                :items="phones"
                responsive
                :per-page="0"
                :current-page="currentPage"
                :sticky-header="true"
            >
              <template #table-busy>
                <div class="text-center" my-2>
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(id)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
              </template>
              <template #head(actions)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
              </template>
              <template #head(user_id)="scope">
                <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
              </template>
              <template #head(created_at)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(updated_at)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head()="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
              </template>
              <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>
              </template>
            </b-table>
          </b-tab>
          <b-tab title="Email Errors">
            <b-table
                id="email-table"
                small
                striped
                hover
                :busy="isBusy"
                :fields="email_fields"
                :items="emails"
                responsive
                :per-page="0"
                :current-page="currentPage"
                :sticky-header="true"
            >
              <template #table-busy>
                <div class="text-center" my-2>
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(id)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
              </template>
              <template #head(actions)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
              </template>
              <template #head(user_id)="scope">
                <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
              </template>
              <template #head(created_at)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(updated_at)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head()="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
              </template>
              <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>
              </template>
            </b-table>
          </b-tab>
          <b-tab title="Seller Errors">
            <b-table
                id="seller-table"
                small
                striped
                hover
                :busy="isBusy"
                :fields="seller_fields"
                :items="sellers"
                responsive
                :per-page="0"
                :current-page="currentPage"
                :sticky-header="true"
            >
              <template #table-busy>
                <div class="text-center" my-2>
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(id)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
              </template>
              <template #head(actions)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
              </template>
              <template #head(user_id)="scope">
                <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
              </template>
              <template #head(created_at)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(updated_at)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head()="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
              </template>
              <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>
              </template>
            </b-table>
          </b-tab>
          <b-tab title="Golden Addresses Errors">
            <b-table
                id="golden-table"
                small
                striped
                hover
                :busy="isBusy"
                :fields="golden_fields"
                :items="goldens"
                responsive
                :per-page="0"
                :current-page="currentPage"
                :sticky-header="true"
            >
              <template #table-busy>
                <div class="text-center" my-2>
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(id)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
              </template>
              <template #head(actions)="scope">
                <div class="text-nowrap" style="width: 60px;">{{scope.label}}</div>
              </template>
              <template #head(user_id)="scope">
                <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
              </template>
              <template #head(created_at)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(updated_at)="scope">
                <div class="text-nowrap" style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head()="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
              </template>
              <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>
              </template>
            </b-table>
          </b-tab>
        </b-tabs>
      </b-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"

export default {
  name: "Errors",
  components: {
    BIcon
  },
  data () {
    return {
      isBusy: false,
      showModal: false,
      perPage: 20,
      currentPage: 1,
      editedItem: {},
      showDeleteModal: false,
      itemToDelete: {},
      pageOptions: [10, 20, 50],
      searchSubject: '',
      showAddModal: false
    }
  },
  computed: {
    ...mapGetters({
      isCollapsed: 'uxModule/isCollapsed',
      subject_fields: 'errorModule/subject_fields',
      phone_fields: 'errorModule/phone_fields',
      email_fields: 'errorModule/email_fields',
      seller_fields: 'errorModule/seller_fields',
      golden_fields: 'errorModule/golden_fields',
      subjects: 'errorModule/subjects',
      emails: 'errorModule/emails',
      phones: 'errorModule/phones',
      sellers: 'errorModule/sellers',
      goldens: 'errorModule/goldens',
      total: 'errorModule/total'
    }),
    rows() { return this.total ? this.total : 1}
  },
  async created () {
    try {
      await this.$store.dispatch('uxModule/setLoading')
      await this.$store.dispatch("errorModule/getAllErrors", {page: 1, perPage: this.perPage})
      await this.$store.dispatch('uxModule/hideLoader')
    } catch (error) {
      await this.$store.dispatch('uxModule/hideLoader')
    }
  },
  methods: { },
  watch: { }
}
</script>

<style>
.b-table-sticky-header {
  max-height: calc(100vh - 372px) !important;
}

.error-sections {
  max-height: calc(100vh - 56px) !important;
  overflow-y: auto;
}
</style>
