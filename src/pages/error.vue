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
            <b-row>
              <b-col class="d-flex align-items-center">
                <b-form-group
                    label="Show"
                    label-for="show-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-size="xs"
                    class="mb-0"
                >
                  <b-form-select
                      id="show-select"
                      v-model="perPage"
                      :options="pageOptions"
                      size="xs"
                      class="ml-3"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col class="d-flex align-items-center justify-content-center">
                <p class="mb-0">Showing 1 to {{perPage}} of {{subjectTotal}} entries</p>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="subjectRows" :per-page="perPage" aria-controls="seller-table"></b-pagination>
              </b-col>
            </b-row>
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
            <b-row>
              <b-col class="d-flex align-items-center">
                <b-form-group
                    label="Show"
                    label-for="show-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-size="xs"
                    class="mb-0"
                >
                  <b-form-select
                      id="show-select"
                      v-model="perPage"
                      :options="pageOptions"
                      size="xs"
                      class="ml-3"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col class="d-flex align-items-center justify-content-center">
                <p class="mb-0">Showing 1 to {{perPage}} of {{phoneTotal}} entries</p>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="phoneRows" :per-page="perPage" aria-controls="seller-table"></b-pagination>
              </b-col>
            </b-row>
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
            <b-row>
              <b-col class="d-flex align-items-center">
                <b-form-group
                    label="Show"
                    label-for="show-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-size="xs"
                    class="mb-0"
                >
                  <b-form-select
                      id="show-select"
                      v-model="perPage"
                      :options="pageOptions"
                      size="xs"
                      class="ml-3"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col class="d-flex align-items-center justify-content-center">
                <p class="mb-0">Showing 1 to {{perPage}} of {{emailTotal}} entries</p>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="emailRows" :per-page="perPage" aria-controls="seller-table"></b-pagination>
              </b-col>
            </b-row>
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
            <b-row>
              <b-col class="d-flex align-items-center">
                <b-form-group
                    label="Show"
                    label-for="show-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-size="xs"
                    class="mb-0"
                >
                  <b-form-select
                      id="show-select"
                      v-model="perPage"
                      :options="pageOptions"
                      size="xs"
                      class="ml-3"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col class="d-flex align-items-center justify-content-center">
                <p class="mb-0">Showing 1 to {{perPage}} of {{sellerTotal}} entries</p>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="sellerRows" :per-page="perPage" aria-controls="seller-table"></b-pagination>
              </b-col>
            </b-row>
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
            <b-row>
              <b-col class="d-flex align-items-center">
                <b-form-group
                    label="Show"
                    label-for="show-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-size="xs"
                    class="mb-0"
                >
                  <b-form-select
                      id="show-select"
                      v-model="perPage"
                      :options="pageOptions"
                      size="xs"
                      class="ml-3"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col class="d-flex align-items-center justify-content-center">
                <p class="mb-0">Showing 1 to {{perPage}} of {{goldenTotal}} entries</p>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="goldenRows" :per-page="perPage" aria-controls="seller-table"></b-pagination>
              </b-col>
            </b-row>
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
      searchSeller: '',
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
      subjectTotal: 'errorModule/subjectTotal',
      emailTotal: 'errorModule/emailTotal',
      phoneTotal: 'errorModule/phoneTotal',
      sellerTotal: 'errorModule/sellerTotal',
      goldenTotal: 'errorModule/goldenTotal',
    }),
    subjectRows() { return this.subjectTotal ? this.subjectTotal : 1},
    phoneRows() { return this.phoneTotal ? this.phoneTotal : 1},
    emailRows() { return this.emailTotal ? this.emailTotal : 1},
    sellerRows() { return this.sellerTotal ? this.sellerTotal : 1},
    goldenRows() { return this.goldenTotal ? this.goldenTotal : 1}
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
  watch: {
    currentPage: {
      handler: function() {
        this.$store.dispatch('errorModule/getAllErrors', {page: this.currentPage, perPage: this.perPage, search: this.searchSeller})
      }
    },
    perPage: {
      handler: function () {
        this.$store.dispatch('errorModule/getAllErrors', {page: 1, perPage: this.perPage, search: this.searchSeller})
      }
    },
  }
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
