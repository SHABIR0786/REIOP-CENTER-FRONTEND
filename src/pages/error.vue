<template>
  <div class="error-sections">
    <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
      <b-row class="mt-5">
          <b-row class="mb-3">
            <b-col cols="12" class="d-flex align-items-center">
                <b-button variant="primary" class="filter d-flex align-items-center mr-2" @click="showFilterErrorsModal = true">
                    <b-icon class="filter-icon" icon="filter" aria-hidden="true"></b-icon>
                </b-button>
                <b-button v-if="totalFilters > 0" variant="outline-primary" @click="clearAllFilters()" class="filter d-flex float-right r-0 align-items-right mr-2">
                    <b-icon icon="x" aria-hidden="true"></b-icon> Clear All
                </b-button>
                <span v-if="totalFilters > 0" class="filter-count filter-top">{{ totalFilters }}</span>
            </b-col>
          </b-row>



        <b-tabs class="w-100" content-class="mt-3" fill>
          <b-tab :title="'Subject Errors '+ subjectTotal" @click="currentPage = 1; perPage = 20" active>
            <b-table
                id="subject-table"
                small
                striped
                hover
                sort-icon-left
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
              <template #head(subject_error_type)="scope">
                <div  style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head(file_name)="scope">
                <div  style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head(subject_address)="scope">
                <div  style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head(subject_address_line2)="scope">
                <div  style="width: 150px;">{{scope.label}}</div>
              </template>
                <template #head(subject_city)="scope">
                <div  style="width: 80px;">{{scope.label}}</div>
              </template>
              <template #head(subject_state)="scope">
                <div style="width: 60px;">{{scope.label}}</div>
              </template>
              <template #head(subject_county)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head(subject_market)="scope">
                <div style="width: 50px;">{{scope.label}}</div>
              </template>
              <template #head(subject_type)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(subject_age)="scope">
                <div style="width: 80px;">{{scope.label}}</div>
              </template>
              <template #head(subject_zip)="scope">
                <div class="text-nowrap" style="width: 80px;">{{scope.label}}</div>
              </template>
              <template #head(subject_last_marked_date)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(subject_last_exported_date)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(subject_pull_date)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(subject_skip_trace_date)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(created_at)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(user_name)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head()="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
              </template>
              <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>
              </template>
            <template v-slot:cell(file_name)="data">
                <div v-b-tooltip.hover :title="data.item.file_name">{{ data.item.file_name }}</div>
            </template>
           <template v-slot:cell(subject_address)="data">
                <div v-b-tooltip.hover :title="data.item.subject_address">{{ data.item.subject_address }}</div>
            </template>
            <template v-slot:cell(subject_city)="data">
                <div v-b-tooltip.hover :title="data.item.subject_city">{{ data.item.subject_city }}</div>
            </template>
            <template v-slot:cell(subject_zip)="data">
                <div v-b-tooltip.hover :title="data.item.subject_zip">{{ data.item.subject_zip }}</div>
            </template>
            <template v-slot:cell(subject_county)="data">
                <div v-b-tooltip.hover :title="data.item.subject_county">{{ data.item.subject_county }}</div>
            </template>
            <template v-slot:cell(subject_state)="data">
                <div v-b-tooltip.hover :title="data.item.subject_state">{{ data.item.subject_state }}</div>
            </template>
              <template v-slot:cell(subject_market)="data">
                <div v-b-tooltip.hover :title="data.item.subject_market">{{ data.item.subject_market }}</div>
            </template>
            <template v-slot:cell(subject_address_line2)="data">
                <div v-b-tooltip.hover :title="data.item.subject_address_line2">{{ data.item.subject_address_line2 }}</div>
            </template>
            <template v-slot:cell(subject_type)="data">
                <div v-b-tooltip.hover :title="data.item.subject_type">{{ data.item.subject_type }}</div>
            </template>
            <template v-slot:cell(subject_error_type)="data">
                <div v-b-tooltip.hover :title="data.item.subject_error_type">{{ data.item.subject_error_type }}</div>
            </template>
            <template v-slot:cell(user_name)="data">
                <div v-b-tooltip.hover :title="data.item.user_name">{{ data.item.user_name }}</div>
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
                <p class="mb-0">Showing {{currentPage == 1?1:(perPage * (currentPage - 1))}} to {{perPage * currentPage}} of {{subjectTotal}} entries</p>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="subjectRows" :per-page="perPage" aria-controls="subject-table"></b-pagination>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab :title="'Phone Errors '+ phoneTotal" @click="currentPage = 1; perPage = 20">
            <b-table
                id="phone-table"
                small
                striped
                sort-icon-left
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

              <template #head(phone_error_type)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
                  <template #head(file_name)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
                  <template #head(seller_id)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
                <template #head(phone_number)="scope">
                <div  style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(phone_type)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(phone_validity)="scope">
                <div style="width: 60px;">{{scope.label}}</div>
              </template>
              <template #head(phone_skip_source)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(created_at)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(user_name)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head()="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
              </template>
              <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>
              </template>
            <template v-slot:cell(phone_number)="data">
                <div v-b-tooltip.hover :title="data.item.phone_number">{{ data.item.phone_number }}</div>
            </template>
            <template v-slot:cell(phone_skip_source)="data">
                <div v-b-tooltip.hover :title="data.item.phone_skip_source">{{ data.item.phone_skip_source }}</div>
            </template>
            <template v-slot:cell(phone_error_type)="data">
                <div v-b-tooltip.hover :title="data.item.phone_error_type">{{ data.item.phone_error_type }}</div>
            </template>
            <template v-slot:cell(user_name)="data">
                <div v-b-tooltip.hover :title="data.item.user_name">{{ data.item.user_name }}</div>
            </template>
            <template v-slot:cell(phone_type)="data">
                <div v-b-tooltip.hover :title="data.item.phone_type">{{ data.item.phone_type }}</div>
            </template>
              <template v-slot:cell(file_name)="data">
                <div v-b-tooltip.hover :title="data.item.file_name">{{ data.item.file_name }}</div>
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
                <p class="mb-0">Showing {{currentPage == 1?1:(perPage * (currentPage - 1))}} to {{perPage * currentPage}} of {{phoneTotal}} entries</p>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="phoneRows" :per-page="perPage" aria-controls="phone-table"></b-pagination>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab :title="'Email Errors '+emailTotal" @click="currentPage = 1; perPage = 20">
            <b-table
                id="email-table"
                small
                striped
                hover
                sort-icon-left
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
             <template #head(email_error_type)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
                  <template #head(file_name)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
                  <template #head(seller_id)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
                <template #head(email_address)="scope">
                <div  style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head(email_validity)="scope">
                <div style="width: 60px;">{{scope.label}}</div>
              </template>
              <template #head(email_skip_source)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(created_at)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(user_name)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head()="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
              </template>
            <template v-slot:cell(email_address)="data">
                <div v-b-tooltip.hover :title="data.item.email_address">{{ data.item.email_address }}</div>
            </template>
            <template v-slot:cell(email_skip_source)="data">
                <div v-b-tooltip.hover :title="data.item.email_skip_source">{{ data.item.email_skip_source }}</div>
            </template>
            <template v-slot:cell(email_error_type)="data">
                <div v-b-tooltip.hover :title="data.item.email_error_type">{{ data.item.email_error_type }}</div>
            </template>
            <template v-slot:cell(user_name)="data">
                <div v-b-tooltip.hover :title="data.item.user_name">{{ data.item.user_name }}</div>
            </template>
              <template v-slot:cell(file_name)="data">
                <div v-b-tooltip.hover :title="data.item.file_name">{{ data.item.file_name }}</div>
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
                <p class="mb-0">Showing {{currentPage == 1?1:(perPage * (currentPage - 1))}} to {{perPage * currentPage}} of {{emailTotal}} entries</p>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="emailRows" :per-page="perPage" aria-controls="email-table"></b-pagination>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab :title="'Seller Errors '+sellerTotal" @click="currentPage = 1; perPage = 20">
            <b-table
                id="seller-table"
                small
                striped
                hover
                sort-icon-left
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
     
              <template #head(seller_error_type)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
                  <template #head(file_name)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
                  <template #head(seller_first_name)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
                <template #head(seller_middle_name)="scope">
                <div  style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(seller_last_name)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(seller_mailing_address)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head(seller_mailing_address_line2)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head(seller_mailing_state)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(seller_mailing_city)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(seller_mailing_zip)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(created_at)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(user_name)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head()="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
              </template>
              <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>
              </template>
              <template v-slot:cell(seller_error_type)="data">
                <div v-b-tooltip.hover :title="data.item.seller_error_type">{{ data.item.seller_error_type }}</div>
              </template>
              <template v-slot:cell(file_name)="data">
                  <div v-b-tooltip.hover :title="data.item.file_name">{{ data.item.file_name }}</div>
              </template>
              <template v-slot:cell(seller_first_name)="data">
                  <div v-b-tooltip.hover :title="data.item.seller_first_name">{{ data.item.seller_first_name }}</div>
              </template>
              <template v-slot:cell(seller_last_name)="data">
                  <div v-b-tooltip.hover :title="data.item.seller_last_name">{{ data.item.seller_last_name }}</div>
              </template>
              <template v-slot:cell(seller_middle_name)="data">
                  <div v-b-tooltip.hover :title="data.item.seller_middle_name">{{ data.item.seller_middle_name }}</div>
              </template>
              <template v-slot:cell(seller_mailing_address)="data">
                  <div v-b-tooltip.hover :title="data.item.seller_mailing_address">{{ data.item.seller_mailing_address }}</div>
              </template>
              <template v-slot:cell(seller_mailing_address_line2)="data">
                  <div v-b-tooltip.hover :title="data.item.seller_mailing_address_line2">{{ data.item.seller_mailing_address_line2 }}</div>
              </template>
              <template v-slot:cell(user_name)="data">
                  <div v-b-tooltip.hover :title="data.item.user_name">{{ data.item.user_name }}</div>
              </template>
              <template v-slot:cell(seller_mailing_zip)="data">
                  <div v-b-tooltip.hover :title="data.item.seller_mailing_zip">{{ data.item.seller_mailing_zip }}</div>
              </template>
              <template v-slot:cell(seller_mailing_city)="data">
                  <div v-b-tooltip.hover :title="data.item.seller_mailing_city">{{ data.item.seller_mailing_city }}</div>
              </template>
              <template v-slot:cell(seller_mailing_state)="data">
                <div v-b-tooltip.hover :title="data.item.seller_mailing_state">{{ data.item.seller_mailing_state }}</div>
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
                <p class="mb-0">Showing {{currentPage == 1?1:(perPage * (currentPage - 1))}} to {{perPage * currentPage}} of {{sellerTotal}} entries</p>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="sellerRows" :per-page="perPage" aria-controls="seller-table"></b-pagination>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab :title="'Golden Addresses Errors '+goldenTotal" @click="currentPage = 1; perPage = 20">
            <b-table
                id="golden-table"
                small
                striped
                sort-icon-left
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
              <template #head(golden_error_type)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
                  <template #head(file_name)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
                  <template #head(seller_id)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(golden_address_address)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head(golden_address_address_line2)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head(golden_address_state)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(golden_address_city)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(golden_address_zip)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(created_at)="scope">
                <div style="width: 100px;">{{scope.label}}</div>
              </template>
              <template #head(user_name)="scope">
                <div style="width: 150px;">{{scope.label}}</div>
              </template>
              <template #head()="scope">
                <div class="text-nowrap" style="width: 150px;">{{ scope.label }}</div>
              </template>
              <template v-slot:cell(actions)="data">
                <b-icon class="mr-2 cursor-pointer" icon="pencil" variant="primary" @click="editSubject(data.item)"></b-icon>
                <b-icon class="cursor-pointer" variant="danger" icon="trash" @click="deleteSubject(data.item)"></b-icon>
              </template>
              <template v-slot:cell(file_name)="data">
                <div v-b-tooltip.hover :title="data.item.file_name">{{ data.item.file_name }}</div>
              </template>
            <template v-slot:cell(golden_address_address)="data">
                <div v-b-tooltip.hover :title="data.item.golden_address_address">{{ data.item.golden_address_address }}</div>
            </template>
            <template v-slot:cell(golden_address_address_line2)="data">
                <div v-b-tooltip.hover :title="data.item.golden_address_address_line2">{{ data.item.golden_address_address_line2 }}</div>
            </template>
            <template v-slot:cell(golden_address_city)="data">
                <div v-b-tooltip.hover :title="data.item.golden_address_city">{{ data.item.golden_address_city }}</div>
            </template>
            <template v-slot:cell(golden_error_type)="data">
                <div v-b-tooltip.hover :title="data.item.golden_error_type">{{ data.item.golden_error_type }}</div>
            </template>
            <template v-slot:cell(user_name)="data">
                <div v-b-tooltip.hover :title="data.item.user_name">{{ data.item.user_name }}</div>
            </template>
            <template v-slot:cell(golden_address_state)="data">
                <div v-b-tooltip.hover :title="data.item.golden_address_state">{{ data.item.golden_address_state }}</div>
            </template>
            <template v-slot:cell(golden_address_zip)="data">
                <div v-b-tooltip.hover :title="data.item.golden_address_zip">{{ data.item.golden_address_zip }}</div>
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
                <p class="mb-0">Showing {{currentPage == 1?1:(perPage * (currentPage - 1))}} to {{perPage * currentPage}} of {{goldenTotal}} entries</p>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-pagination class="mb-0" v-model="currentPage" :total-rows="goldenRows" :per-page="perPage" aria-controls="golden-table"></b-pagination>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </b-row>
    </div>
    <error-filter ref="filterErrors" :queryFilter="queryFilter" :showModal="showFilterErrorsModal" @filter="filter" @cancel="showFilterErrorsModal=false"></error-filter>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import { BIcon } from "bootstrap-vue"
import ErrorFilter from '@/components/error/FilterError'

export default {
  name: "Errors",
  components: {
    BIcon,
    ErrorFilter
  },
  data () {
    return {
      isBusy: false,
      showModal: false,
      queryFilter: null,
      totalFilters: 0,
      perPage: 20,
      currentPage: 1,
      editedItem: {},
      filtersName: {
        Import: []
      },
      showDeleteModal: false,
      itemToDelete: {},
      pageOptions: [10, 20, 50],
      searchSeller: '',
      showAddModal: false,
      showFilterErrorsModal: false
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
      await this.$store.dispatch("errorModule/getAllErrors", {page: 1, perPage: this.perPage, search: this.$route.query.id});
      if(this.$route.query.id) {
        this.totalFilters = 1;
        this.queryFilter = this.$route.query.id;
        this.filtersName.Import.push(this.$route.query.id);
      }
      await this.$store.dispatch('uxModule/hideLoader')
    } catch (error) {
      await this.$store.dispatch('uxModule/hideLoader')
    }
  },
  methods: { 
     async clearAllFilters() {
            this.$refs.filterErrors.clearAllFilters();
            this.$refs.filterErrors.filtersAlreadyApplied = null;
            this.filtersName = {
                    Import: []
            },
        this.$store.dispatch('uxModule/setLoading');
        await this.$store.dispatch('errorModule/getAllErrors', {page: this.currentPage, perPage: this.perPage, search: this.searchSeller});
        this.$store.dispatch('uxModule/hideLoader');
        this.totalFilters = 0;
      },
      async filter(data, filterValue) {
        let errors = [];
        data?.Import.forEach(element => {
          errors.push(element.id);
        });
            this.$store.dispatch('uxModule/setLoading');
            try {
                this.filtersName.Import = errors
                await this.$store.dispatch("errorModule/filterErrors", {
                    page: 1,
                    perPage: this.perPage,
                    filter: errors
                })
                if (!filterValue) {
                    if (!this.items.length) {
                        await this.$store.dispatch("errorModule/getAllErrors", {
                            page: 1,
                            perPage: this.perPage,
                            search: this.searchSeller
                        })
                    }
                }
                this.totalFilters = filterValue;
                this.showFilterErrorsModal = false;
                this.$store.dispatch('uxModule/hideLoader');
            } catch (error) {
                this.$store.dispatch('uxModule/hideLoader');
            }
        },
  },
  watch: {
    currentPage: {
      handler: async function() {
        this.$store.dispatch('uxModule/setLoading');
        if(this.totalFilters > 0) {
            await this.$store.dispatch("errorModule/filterErrors", {
                    page: this.currentPage,
                    perPage: this.perPage,
                    filter: this.filtersName?.Import
            })
        } else {
        this.$store.dispatch('errorModule/getAllErrors', {page: this.currentPage, perPage: this.perPage, search: this.searchSeller})
        }
        this.$store.dispatch('uxModule/hideLoader');
      }
    },
    perPage: {
      handler: async function () {
        this.$store.dispatch('uxModule/setLoading');
        if(this.totalFilters > 0) {
            await this.$store.dispatch("errorModule/filterErrors", {
                    page: this.currentPage,
                    perPage: this.perPage,
                    filter: this.filtersName?.Import
            })
        } else {
        this.$store.dispatch('errorModule/getAllErrors', {page: 1, perPage: this.perPage, search: this.searchSeller});
        }
        this.$store.dispatch('uxModule/hideLoader');
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
table td div{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
    cursor:pointer;
}
.tooltip-inner {
   background-color: #45818E !important;
}
.bs-tooltip-top .arrow::before {
    border-top-color: #45818E !important;
}
.bs-tooltip-bottom .arrow::before {
    border-bottom-color: #45818E !important;
}
.bs-tooltip-left .arrow::before {
    border-left-color: #45818E !important;
}
.bs-tooltip-right .arrow::before {
    border-right-color: #45818E !important;
}
</style>
