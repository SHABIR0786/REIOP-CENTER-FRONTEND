<template>
  <b-modal size="xl" v-model="showModal" scrollable no-close-on-backdrop>
    <template #modal-header>
      <div class="w-100">Properties Filters</div>
      <div>
        <b-icon @click="closeFilterModal" class="close-icon" icon="x"></b-icon>
      </div>
    </template>
    <!-- New Filter -->
    <b-container fluid>
      <div>
        <div>
          <p v-for="(result, index) in ListFilters" :key="index">
            <span v-if="result.rule != null && result.option != null"
              ><b-icon
                title="Remove"
                @click="removeListFilter(index)"
                icon="x-circle-fill"
                class="cursor-pointer"
                variant="info"
              ></b-icon>
              <b-form-select
                class="w-auto mx-2"
                :options="AndOrStatement"
                v-model="result.statement"
              ></b-form-select>
              {{ result.name }} {{ result.rule }} {{result.rule == "range"? (result.before+' - '+result.after) : result.option }}</span
            >
          </p>
          <p v-for="(result, index) in StackFilters" :key="index">
            <span v-if="result.value != null && result.value != ''"
              ><b-icon
                title="Remove"
                @click="removeStackFilter(result)"
                icon="x-circle-fill"
                class="cursor-pointer"
                variant="info"
              ></b-icon>
              <b-form-select
                class="w-auto mx-2"
                :options="AndOrStatement"
                v-model="result.statement"
              ></b-form-select>
              {{ result.name }} {{ result.value }}</span
            >
          </p>
          <p v-for="(result, index) in StatementFilters" :key="index">
            <span v-if="result.value != null && result.value != ''"
              ><b-icon
                title="Remove"
                @click="removeStatementFilter(result)"
                icon="x-circle-fill"
                class="cursor-pointer"
                variant="info"
              ></b-icon>
              <b-form-select
                class="w-auto mx-2"
                :options="AndOrStatement"
                v-model="result.statement"
              ></b-form-select>
              {{ result.name }} {{ result.value }}</span
            >
          </p>
          <p v-for="(result, index) in additionalFilters" :key="index">
            <span v-if="result.value != null && result.value != ''"
              ><b-icon
                title="Remove"
                @click="removeAdditionalFilter(result)"
                icon="x-circle-fill"
                class="cursor-pointer"
                variant="info"
              ></b-icon>
              <b-form-select
                class="w-auto mx-2"
                :options="AndOrStatement"
                v-model="result.statement"
              ></b-form-select>
              {{ result.name }} {{result.rule}} {{ result.value }}</span
            >
          </p>
        </div>
        <h5 class="font-weight-bold mb-0">List Filters</h5>
        <hr class="m-0 border border-dark" />
        <p class="small">Choose filters related to lists.</p>
        <b-row class="p-0">
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="market">Market</label>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  id="market"
                  class="w-100"
                  :options="IncludesExcludes"
                  v-model="chooseListFilters.Market.rule"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  class="w-100"
                  :options="MarketList"
                  v-model="chooseListFilters.Market.option"
                  :disabled="chooseListFilters.Market.rule == null"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >Choose Option</b-form-select-option>
                  </template>
                </b-form-select>
              </b-col>
              <b-col cols="2">
                <b-button class="font-weight-bold pt-2" :disabled="chooseListFilters.Market.option == null || chooseListFilters.Market.option == ''" @click="addListFilter(chooseListFilters.Market)" for="market">Add</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="group">Group</label>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  id="group"
                  class="w-100"
                  :options="IncludesExcludes"
                  v-model="chooseListFilters.Group.rule"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  class="w-100"
                  :options="GroupList"
                  v-model="chooseListFilters.Group.option"
                  :disabled="chooseListFilters.Group.rule == null"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >Choose Option</b-form-select-option
                    >
                  </template>
                </b-form-select>
              </b-col>
              <b-col cols="2">
                <b-button class="font-weight-bold pt-2" :disabled="chooseListFilters.Group.option == null || chooseListFilters.Group.option == ''" @click="addListFilter(chooseListFilters.Group)" for="market">Add</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="type">Type</label>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  id="type"
                  class="w-100"
                  :options="IncludesExcludes"
                  v-model="chooseListFilters.Type.rule"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  class="w-100"
                  :options="TypeList"
                  v-model="chooseListFilters.Type.option"
                  :disabled="chooseListFilters.Type.rule == null"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >Choose Option</b-form-select-option
                    >
                  </template></b-form-select
                >
              </b-col>
              <b-col cols="2">
                <b-button class="font-weight-bold pt-2" :disabled="chooseListFilters.Type.option == null || chooseListFilters.Type.option == ''" @click="addListFilter(chooseListFilters.Type)" for="market">Add</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="source">Source</label>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  id="source"
                  class="w-100"
                  :options="IncludesExcludes"
                  v-model="chooseListFilters.Source.rule"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  class="w-100"
                  :options="SourceList"
                  v-model="chooseListFilters.Source.option"
                  :disabled="chooseListFilters.Source.rule == null"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >Choose Option</b-form-select-option
                    >
                  </template>
                </b-form-select>
              </b-col>
              <b-col cols="2">
                <b-button class="font-weight-bold pt-2" :disabled="chooseListFilters.Source.option == null || chooseListFilters.Source.option == ''" @click="addListFilter(chooseListFilters.Source)" for="market">Add</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="pull_date">Pull Date</label>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  id="pull_date"
                  class="w-100"
                  :options="dateTimeRules"
                  v-model="chooseListFilters.PullDate.rule"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
                <b-form-input type="date" v-if="chooseListFilters.PullDate.rule != 'range'" v-model="chooseListFilters.PullDate.option"/>
                <b-form-input type="date" v-if="chooseListFilters.PullDate.rule == 'range'" v-model="chooseListFilters.PullDate.before"/>
                -
                <b-form-input type="date" v-if="chooseListFilters.PullDate.rule == 'range'" v-model="chooseListFilters.PullDate.after"/>

              </b-col>
              <b-col cols="2">
                <b-button class="font-weight-bold pt-2" @click="addListFilter(chooseListFilters.PullDate)" for="market">Add</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="pull_date">Run Month/ Year</label>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  id="pull_date"
                  class="w-100"
                  :options="dateTimeRules"
                  v-model="chooseListFilters.RunMonthYear.rule"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
                  <b-form-select
                  id="pull_date"
                  class="w-100"
                  v-if="chooseListFilters.RunMonthYear.rule != 'range'"
                  :options="listRunMonthYear"
                  v-model="chooseListFilters.RunMonthYear.option"
                ></b-form-select>
                <b-form-select
                  id="pull_date"
                  class="w-100"
                  v-if="chooseListFilters.RunMonthYear.rule == 'range'"
                  :options="listRunMonthYear"
                  v-model="chooseListFilters.RunMonthYear.before"
                ></b-form-select>
                -
                <b-form-select
                  id="pull_date"
                  class="w-100"
                  v-if="chooseListFilters.RunMonthYear.rule == 'range'"
                  :options="listRunMonthYear"
                  v-model="chooseListFilters.RunMonthYear.after"
                ></b-form-select>
              </b-col>
              <b-col cols="2">
                <b-button class="font-weight-bold pt-2" :disabled="chooseListFilters.RunMonthYear.option == null || chooseListFilters.RunMonthYear.option == ''" @click="addListFilter(chooseListFilters.RunMonthYear)" for="market">Add</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="12" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="pull_date">Import File Name</label>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  id="ImportFileName"
                  class="w-100"
                  :options="IncludesExcludes"
                  v-model="chooseListFilters.ImportFileName.rule"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
              <b-form-select
                  id="ImportFileName"
                  class="w-100"
                  :options="importFilesNames"
                  v-model="chooseListFilters.ImportFileName.option"
                ></b-form-select>
              </b-col>
              <b-col cols="2">
                <b-button class="font-weight-bold pt-2" :disabled="chooseListFilters.ImportFileName.option == null || chooseListFilters.ImportFileName.option == ''" @click="addListFilter(chooseListFilters.ImportFileName)" for="ImportFileName">Add</b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <br />
        <h5 class="font-weight-bold mb-0">Stack Filters</h5>
        <hr class="m-0 border border-dark" />
        <p class="small">
          Input number statements in the format of a single number (Ex: 1),
          range (Ex: 1-4), or extended range (Ex: 3+ or 3-).
        </p>
        <b-row class="p-0">
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="list_stack"
                  >List Stack</label
                >
              </b-col>
              <b-col cols="7">
                <b-form-input
                  id="list_stack"
                  value="1+"
                  required
                  v-model="StackFilters.ListStack.value"
                  title="List Stack"
                  v-b-tooltip.hover
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_sellers"
                  >Total Sellers</label
                >
              </b-col>
              <b-col cols="7">
                <b-form-input
                  id="total_sellers"
                  value="1+"
                  required
                  title="Total Sellers"
                  v-model="StackFilters.TotalSellers.value"
                  v-b-tooltip.hover
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_subjects"
                  >Total Subjects</label
                >
              </b-col>
              <b-col cols="7">
                <b-form-input
                  id="total_subjects"
                  value="1+"
                  required
                  title="Total Subjects"
                  v-model="StackFilters.TotalSubjects.value"
                  v-b-tooltip.hover
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_phones"
                  >Total Phones</label
                >
              </b-col>
              <b-col cols="7">
                <b-form-input
                  id="total_phones"
                  value="1+"
                  required
                  title="Total Phones"
                  v-model="StackFilters.TotalPhones.value"
                  v-b-tooltip.hover
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_emails"
                  >Total Emails</label
                >
              </b-col>
              <b-col cols="7">
                <b-form-input
                  id="total_emails"
                  value="1+"
                  required
                  title="Total Emails"
                  v-model="StackFilters.TotalEmails.value"
                  v-b-tooltip.hover
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="total_goldens"
                  >Total Goldens</label
                >
              </b-col>
              <b-col cols="7">
                <b-form-input
                  id="total_goldens"
                  value="1+"
                  required
                  title="Total Goldens"
                  v-model="StackFilters.TotalGoldens.value"
                  v-b-tooltip.hover
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <br />
        <h5 class="font-weight-bold mb-0">Statement Filters</h5>
        <hr class="m-0 border border-dark" />
        <p class="small">Choose filters related to statement about the data.</p>
        <b-row class="p-0">
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="skip_trace"
                  >Has Skip Trace Data</label
                >
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="skip_trace"
                  class="w-100"
                  :options="YesNo_Option"
                  v-model="StatementFilters.hasSkipTraceData.value"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="attempted_skips"
                  >Has Attempted Skips</label
                >
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="attempted_skips"
                  class="w-100"
                  :options="statmentYesNo_Option"
                  v-model="StatementFilters.hasAttemtedSkips.value"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="p-0">
          <!-- <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="pull_date">Last Attempted Skip Trace Date</label>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  id="pull_date"
                  class="w-100"
                  :options="dateTimeRules"
                  v-model="StatementFilters.lastAttemptedSkipTraceDate.rule"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
                <b-form-input type="date" v-if="StatementFilters.lastAttemptedSkipTraceDate.rule != 'range'"  v-model="StatementFilters.lastAttemptedSkipTraceDate.option"/>
                <b-form-input type="date" v-if="StatementFilters.lastAttemptedSkipTraceDate.rule == 'range'"  v-model="StatementFilters.lastAttemptedSkipTraceDate.before"/>
                -
                <b-form-input type="date" v-if="StatementFilters.lastAttemptedSkipTraceDate.rule == 'range'"  v-model="StatementFilters.lastAttemptedSkipTraceDate.after"/>
              </b-col>
              <b-col cols="2">
                <b-button class="font-weight-bold pt-2" @click="addListFilter(StatementFilters.lastAttemptedSkipTraceDate)" for="market">Add</b-button>
              </b-col>
            </b-row>
          </b-col> -->

          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="attempted_skips">Skip Trace Attempts</label>
                <p>(1,1-4,3+, or 3-)</p>
              </b-col>  
              <b-col cols="5">
                <b-form-input
                  id="attempted_skips"
                  class="w-100"
                  v-model="StatementFilters.skipTraceAttempts.value"
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

       <b-row class="p-0">
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="skip_trace">Has Phone Number</label>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="skip_trace"
                  class="w-100"
                  :options="YesNo_Option"
                  v-model="StatementFilters.hasPhoneNumbers.value"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="skip_trace">Has Email Address</label>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="skip_trace"
                  class="w-100"
                  :options="YesNo_Option"
                  v-model="StatementFilters.hasEmailAddresses.value"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row class="p-0">
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="skip_trace">Has Golden Addresses</label>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="skip_trace"
                  class="w-100"
                  :options="YesNo_Option"
                  v-model="StatementFilters.hasGoldenAddresses.value"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="skip_trace">Has Been Exported For Marketing</label>
              </b-col>
              <b-col cols="5">
                <b-form-select
                  id="skip_trace"
                  class="w-100"
                  :options="YesNo_Option"
                  v-model="StatementFilters.hasBeenExported.value"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="2">
                <label class="font-weight-bold pt-2" for="pull_date">Last Marketed Date</label>
              </b-col>
              <b-col cols="4">
                <b-form-select
                  id="pull_date"
                  class="w-100"
                  :options="dateTimeRules"
                  v-model="StatementFilters.lastMarketedDate.rule"
                ></b-form-select>
              </b-col>
              <b-col cols="4">
                <b-form-input type="date" v-if="StatementFilters.lastMarketedDate.rule != 'range'" v-model="StatementFilters.lastMarketedDate.option"/>
                <b-form-input type="date" v-if="StatementFilters.lastMarketedDate.rule == 'range'" v-model="StatementFilters.lastMarketedDate.before"/>
                -
                <b-form-input type="date" v-if="StatementFilters.lastMarketedDate.rule == 'range'" v-model="StatementFilters.lastMarketedDate.after"/>

              </b-col>
              <b-col cols="2">
                <b-button class="font-weight-bold pt-2" @click="addListFilter(StatementFilters.lastMarketedDate)" for="market">Add</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="6" md="12" class="mb-3">
            <b-row>
              <b-col cols="5">
                <label class="font-weight-bold pt-2" for="attempted_skips">Marketing Attempts</label>
                <p>(1,1-4,3+, or 3-)</p>
              </b-col>  
              <b-col cols="5">
                <b-form-input
                  id="attempted_skips"
                  class="w-100"
                  v-model="StatementFilters.marketingAttempts.value"
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        
        <br />
        <h5 class="font-weight-bold mb-0">Additional Filters</h5>
        <hr class="m-0 border border-dark" />
        <p class="small">Add additional filters.</p>
        <b-row class="p-0">
          <b-col cols="12" lg="4" md="12" class="mb-3">
            <b-form-select
              class="w-auto"
              :options="chooseAdditionalFilters"
              v-model="additionalFilter"
            ></b-form-select>
          </b-col>
          <b-col v-if="additionalFilter.type == 'String'" cols="12" lg="3" md="12" class="mb-3">
            <b-form-select
              class="w-auto"
              :options="stringRules"
              v-model="additionalFilterRule"
            ></b-form-select>
          </b-col>
          <b-col v-if="additionalFilter.type == 'Date'" cols="12" lg="3" md="12" class="mb-3">
            <b-form-select
              class="w-auto"
              :options="dateTimeRules"
              v-model="additionalFilterRule"
            ></b-form-select>
          </b-col>
          <b-col v-if="additionalFilter.type == 'String'" cols="12" lg="3" md="12" class="mb-3">
            <b-form-input
            class="w-auto"
            v-model="additionalFilterValue"
            ></b-form-input>
          </b-col>
          <b-col v-if="additionalFilter.type == 'Date'" cols="12" lg="3" md="12" class="mb-3">
            <b-form-datepicker
            class="w-auto"
            v-model="additionalFilterValue"
            ></b-form-datepicker>
          </b-col>
            <b-col v-if="additionalFilter.type == 'Options'" cols="12" lg="3" md="12" class="mb-3">
            <b-form-select
              class="w-auto"
              :options="IncludesExcludes"
              v-model="additionalFilterRule"
            ></b-form-select>
          </b-col>
          <b-col v-if="additionalFilter.type == 'Options'" cols="12" lg="3" md="12" class="mb-3">
            <b-form-select
              class="w-auto"
              :options="additionalFilterOptions"
              v-model="additionalFilterValue"
            ></b-form-select>
          </b-col>
          <b-col v-if="additionalFilter.type == 'Number'" cols="12" lg="6" md="12" class="mb-3">
          <p>Input number statements in the format of a single number (Ex: 1),
          range (Ex: 1-4), or extended range (Ex: 3+ or 3-).</p>
                  <b-form-input
                  id="list_stack"
                  required
                  v-model="additionalFilterValue"
                  v-b-tooltip.hover
                ></b-form-input>
          </b-col>
          <b-col cols="12" lg="2" md="12" class="mb-3">
            <b-button  variant="primary"
              @click="addFilter()"
              :disabled="additionalFilterValue == '' || additionalFilterRule == ''"
              class="filter d-flex align-items-center">
              Add</b-button>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <!-- <hr> -->
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-start">
        <b-row class="w-100">
          <b-col cols="6">
            <b-button
              variant="primary"
              @click="showManageFiltersModas()"
              class="filter d-flex align-items-center mr-3">Manage Saved Filters</b-button>
          </b-col>
          <b-col cols="6" class="d-flex justify-content-end">
            <b-button
              :disabled="totalFilters == 0"
              variant="primary"
              @click="saveFilter()"
              class="filter d-flex align-items-center mr-3">Save Filter</b-button>
            <b-button
              variant="primary"
              @click="applyFilters()"
              class="filter d-flex align-items-center"><b-icon icon="filter" aria-hidden="true"></b-icon>Apply Filter</b-button>
          </b-col>
        </b-row>
      </div>
    </template>
    <save-filter-modal
      :showModal="showSaveFilterModal"
      @cancel="showSaveFilterModal = false"
      :allFilters="savedFilters"
      type="properties"
    ></save-filter-modal>
    <manage-filter-modal
      :showModal="showManageFilterModal"
      @cancel="showManageFilterModal = false"
      :allFilters="savedFilters"
      type="properties"
    ></manage-filter-modal>
  </b-modal>
</template>
<script>
import { mapGetters } from "vuex";
import SaveFilterModal from "./../filters/saveFilterModal";
import ManageFilterModal from "./../filters/ManageFilterModal";

export default {
  name: "FilterSubjects",
  components: {
    SaveFilterModal,
    ManageFilterModal,
  },
  props: {
    showModal: {
      type: Boolean,
    },
    propsData: {
      type: Array,
      default: null,
    },
    search: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showSaveFilterModal: false,
      showManageFilterModal: false,
      lists: [],
      allData: {
        Market: [],
        Group: [],
        Type: [],
        Source: [],
      },
      allFilters: {
        Market: [],
        Group: [],
        Type: [],
        Source: [],
        Errors: [],
        Error: [],
        RunDate: [],
        TotalSellers: [],
        ListStack: [],
        list_custom_field_1: [],
        list_custom_field_2: [],
        list_custom_field_3: [],
        list_custom_field_4: [],
        list_custom_field_5: [],
      },
      searchSubject: "",
      activeTab: "allFilters",
      filtered: [],
      perPage: 20,
      appliedFilters: false,
      filtersAlreadyApplied: null,
      additionalFilter: {type:"", value:""},
      additionalFilterRule: "",
      additionalFilterValue: "",
      IncludesExcludes: [
        { value: null, text: "Choose Rule", disabled: true },
        { value: "include", text: "Includes" },
        { value: "exclude", text: "Excludes" },
      ],
      stringRules: [
        { value: null, text: "Choose Rule", disabled: true },
        { value: "Contains", text: "Contains" },
        { value: "=", text: "Equal To" },
      ],
      dateTimeRules: [
        { value: null, text: "Choose Rule", disabled: true },
        { value: "=", text: "Equal" },
        { value: "before", text: "On or Before" },
        { value: "after", text: "On or After" },
        { value: "range", text: "Range" }
      ],
      YesNo_Option: [
        { value: null, text: "Choose Option", disabled: true },
        { value: "Yes", text: "Yes" },
        { value: "No", text: "No" },
      ],
      statmentYesNo_Option: [
        { value: null, text: "Choose Option", disabled: true },
        { value: 1, text: "Yes" },
        { value: 0, text: "No" },
      ],
      AndOrStatement: [
        { value: "And", text: "And" },
        { value: "Or", text: "Or" },
      ],
      chooseAdditionalFilters: [
        { value: null, text: "Choose Additional Filters", disabled: true },
      ],
      additionalFilters:[],
      listRunMonthYear: [],
      chooseListFilters: {
        Market: { rule: null, option: null, statement: "And", name: "Market" },
        Group: { rule: null, option: null, statement: "And", name: "Group" },
        Type: { rule: null, option: null, statement: "And", name: "Type" },
        Source: { rule: null, option: null, statement: "And", name: "Source" },
        PullDate: { rule: null, option: null, before:null, after:null, statement: "And", name: "PullDate"},
        ImportFileName: { rule: null, option: null, statement: "And", name: "ImportFileName"},
        RunMonthYear: { rule: null, option: null, before:null, after:null, statement: "And", name: "RunMonthYear"}
      },
      ListFilters: [],
      StackFilters: {
        ListStack: { statement: "And", value: null, name: "List Stack", key: "ListStack" },
        TotalSubjects: { statement: "And", value: null, name: "Total Subjects", key: "TotalSubjects"},
        TotalSellers: { statement: "And", value: null, name: "Total Sellers", key: "TotalSellers" },
        TotalEmails: { statement: "And", value: null, name: "Total Emails", key: "TotalEmails" },
        TotalPhones: { statement: "And", value: null, name: "Total Phones", key: "TotalPhones" },
        TotalGoldens: { statement: "And", value: null, name: "Total Goldens", key: "TotalGoldens" }
      },
      StatementFilters: {
        lastAttemptedSkipTraceDate: {
           rule: null,
           option: null,
           before: null,
           after: null,
           statement: "And",
           name: "lastAttemptedSkipTraceDate"
        },
        lastMarketedDate: {
          rule: null,
          option: null,
          before: null,
          after: null,
          statement: "And",
          name: "lastMarketedDate"
        },
        hasSkipTraceData: {
          statement: "And",
          value: "",
          name: "has SkipTrace Data",
          key: "hasSkipTraceData"
        },
        hasAttemtedSkips: {
          statement: "And",
          value: "",
          name: "has Attemted Skips",
          key: "hasAttemtedSkips"
        },
        skipTraceAttempts: {
          statement: "And",
          value: "",
          name: "Skip Trace Attempts",
          key: "skipTraceAttempts"
        },
        hasPhoneNumbers: {
          statement: "And",
          value: "",
          name: "Has Phone Numbers",
          key: "hasPhoneNumbers"
        },
        hasEmailAddresses: {
          statement: "And",
          value: "",
          name: "Has Email Addresses",
          key: "hasEmailAddresses"
        },
        hasGoldenAddresses: {
          statement: "And",
          value: "",
          name: "Has Golden Address",
          key: "hasGoldenAddresses"
        },
        hasBeenExported: {
          statement: "And",
          value: "",
          name: "has Been Exported",
          key: "hasBeenExported"
        },
        marketingAttempts: {
          statement: "And",
          value: "",
          name: "Marketing Attempts",
          key: "marketingAttempts"
        }
      },
    };
  },
  computed: {
    ...mapGetters({
      filterList: "subjectModule/filterList",
      customViewVisibleFields: "importModule/customViewVisibleFields",
      additionalFilterFieldsTypes: "importModule/additionalFilterFieldsTypes",
      additionalFilterOptions: "propertyModule/additionalFilterOptions",
      importFilesNames: "importModule/importFilesNames"
    }),
    savedFilters() {
      /* eslint-disable  no-unused-vars */
      let stackFilters = Object.fromEntries(Object.entries(this.StackFilters).filter(([key, value]) => value.value != null && value.value != ""));
      let statementFilters = Object.fromEntries(Object.entries(this.StatementFilters).filter(([key, value]) => value.value != null && value.value != ""));
      return {listFilters:this.ListFilters, stackFilters: stackFilters, statementFilters: statementFilters, additionalFilters: this.additionalFilters};
    },
    totalFilters() {
       /* eslint-disable  no-unused-vars */
      let stackFilters = Object.fromEntries(Object.entries(this.StackFilters).filter(([key, value]) => value.value != null && value.value != ""));
      let statementFilters = Object.fromEntries(Object.entries(this.StatementFilters).filter(([key, value]) => value.value != null && value.value != ""));
      let filterNames =  {listFilters:this.ListFilters, stackFilters: stackFilters, statementFilters: statementFilters, additionalFilters: this.additionalFilters};
      let filterValue = 0;
      for (let i in filterNames) {
        if(filterNames[i].length) {
        filterValue += filterNames[i].length
        } else {
        filterValue += Object.keys(filterNames[i]).length
        }
      }
      this.$emit("filtersCount", filterValue);
      return filterValue;
    },
    MarketList() {
      return this.allData["Market"];
    },
    GroupList() {
      return this.allData["Group"];
    },
    TypeList() {
      return this.allData["Type"];
    },
    SourceList() {
      return this.allData["Source"];
    },
  },
  async mounted() {
    try {
      this.subject = this.propsData;
      const instance = this;
      // Load Import files Names
      await this.$store.dispatch("importModule/getFilesName");
      await this.$store.dispatch("importModule/loadVisibleFields");
      this.customViewVisibleFields.forEach(function(item) {
      const defaultField = instance.additionalFilterFieldsTypes.find(x=>x.column == item.field);
      if(item.type || defaultField) {
      let type = item.type?item.type:defaultField.type;      
      instance.chooseAdditionalFilters.push({text:item.label,value:{type:type, text: item.label,column: item.field}});
      }
      });
      let response = await this.$store.dispatch(
        "subjectModule/SubjectfilterList",
        { filter: this.allFilters, search: this.search }
      );
      if(response.lists) {
        response.lists.forEach(function(item) {
          if(instance.listRunMonthYear.findIndex(x=>x == item.list_run_month+"/"+item.list_run_year) == -1) {
            instance.listRunMonthYear.push(item.list_run_month+"/"+item.list_run_year);
          }
        })
      }
      await this.MapFilters(response);
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    async showModal() {
      if (this.showModal) {
        this.activeTab = "allFilters";
      }
    },
    additionalFilter() {
      if(this.additionalFilter.type == "Options") {
        this.$store.dispatch('uxModule/setLoading')
        // get options of additional field..
        this.$store.dispatch("propertyModule/additionalFilterOptions", {field:this.additionalFilter.column});
        this.$store.dispatch('uxModule/hideLoader')

      }
      this.additionalFilterRule = null;
      this.additionalFilterValue = null;
    },
  },
  methods: {
    addListFilter(filterName) {
      if(this.ListFilters.findIndex(x=>x.name == filterName.name && x.rule == filterName.rule) == -1){
          this.ListFilters.push(JSON.parse(JSON.stringify(filterName)));
      }
    },
    removeListFilter(index) {
      this.ListFilters.splice(index,1);
    },
    removeStackFilter(result) {
      this.StackFilters[result.key] = {
        value: null,
        name: result.name,
        statement: "And",
        key: result.key,
      };
    },
    removeStatementFilter(result) {
      this.StatementFilters[result.key] = {
        value: null,
        name: result.name,
        statement: "And",
        key: result.key,
      };
    },
    removeAdditionalFilter(result) {
      let index = this.additionalFilters.findIndex(x=>x.name == result.name);
      this.additionalFilters.splice(index,1);
    },
    showManageFiltersModas() {
      this.showManageFilterModal = true;
    },
    saveFilter() {
      this.showSaveFilterModal = true;
    },
    tab(currentTub) {
      this.activeTab = currentTub;
    },
    MapFilters(response) {
      try {
        this.allData = {
          Market: [],
          Group: [],
          Type: [],
          Source: [],
        };

        if (response?.lists?.length > 0) {
          response.lists.forEach((el) => {
            if (
              el.list_market &&
              !this.allData.Market.includes(el.list_market) &&
              !this.allFilters.Market.includes(el.list_market)
            ) {
              this.allData.Market.push(el.list_market);
            }
            if (
              el.list_group &&
              !this.allData.Group.includes(el.list_group) &&
              !this.allFilters.Group.includes(el.list_group)
            ) {
              this.allData.Group.push(el.list_group);
            }
            if (
              el.list_type &&
              !this.allData.Type.includes(el.list_type) &&
              !this.allFilters.Type.includes(el.list_type)
            ) {
              this.allData.Type.push(el.list_type);
            }
            if (
              el.list_source &&
              !this.allData.Source.includes(el.list_source) &&
              !this.allFilters.Source.includes(el.list_source)
            ) {
              this.allData.Source.push(el.list_source);
            }
          });
        }

        if (response?.lists?.length > 0) {
          let AllFilters = Object.keys(this.allData);
          AllFilters.forEach((item) => {
            if (this.allFilters[item].findIndex((x) => x == "Blank") == -1) {
              this.allData[item].unshift("Blank");
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    addFilter() {
      if(this.additionalFilter.type == "Number") {
      this.additionalFilters.push({ rule: "Number", value: this.additionalFilterValue, statement: "And", name: this.additionalFilter.column });
      } else {
      this.additionalFilters.push({ rule: this.additionalFilterRule, value: this.additionalFilterValue, statement: "And", name: this.additionalFilter.column });
      }
      this.additionalFilterValue = "";
      this.additionalFilterRule = "";
    },
    applyFilters() {
       /* eslint-disable  no-unused-vars */
      let stackFilters = Object.fromEntries(Object.entries(this.StackFilters).filter(([key, value]) => value.value != null && value.value != ""));
      let statementFilters = Object.fromEntries(Object.entries(this.StatementFilters).filter(([key, value]) => value.value != null && value.value != ""));
      let filterNames = {listFilters:this.ListFilters, stackFilters: stackFilters, statementFilters: statementFilters, additionalFilters: this.additionalFilters};
      this.$emit('filterProperties', JSON.parse(JSON.stringify(filterNames)));
    },
    closeFilterModal() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.filter-count {
  border-radius: 50%;
  background-color: #808080a6;
  color: #ffffff;
  font-size: 13px;
  text-align: center;
  width: 20px;
  height: 20px;
}
.filter-category >>> .nav-pills {
  padding: 0;
}
.filter-category >>> .col-auto {
  width: 20% !important;
}
.filter-category >>> .active {
  border-radius: unset;
}
.filter-category >>> .list-group-item {
  cursor: pointer;
}
</style>
