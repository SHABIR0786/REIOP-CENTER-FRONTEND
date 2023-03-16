import * as api from "../Services/api"
// import axios from "axios";

const defaultFields = [
    //Subject
    { key: "delete", label: "" },
    { key: "id", label: "Id", sortable: true },
    { key: "actions", label: "Actions" },
    { key: "total_sellers", label: "Total Sellers", sortable: false },
    { key: "list_stack", label: "List Stack", sortable: false },
    { key: "subject_address", stickyColumn: true, label: "Subject Address", sortable: true, visible: false },
    // {key: "subject_address_line2", label: "Subject Address Line 2", sortable: true},
    { key: "subject_city", label: "Subject City", sortable: true, visible: false },
    { key: "subject_state", label: "Subject State", sortable: true, visible: false },
    { key: "subject_zip", label: "Subject Zip", sortable: true },
    { key: "subject_county", label: "Subject County", sortable: true },
    // {key: "subject_market", label: "Market", sortable: true},
    { key: "subject_type", label: "Subject Type", sortable: true },
    { key: "subject_age", label: "Subject Age", sortable: true },
]
const state = {
    fields: [
        ...defaultFields
    ],
    sameRowSubjects: [],
    additionalFilterOptions:[],
    seperatedRowSubjects: [],
    total: 0,
    maxSellers: 0,
    maxPhones: 0,
    maxEmails: 0,
    maxGoldenAddresses: 0,
    allFields: [
        //Subject
        { key: "id", label: "Id", sortable: true },
        { key: "actions", label: "Actions" },
        { key: "total_sellers", label: "Total Sellers", sortable: true },
        { key: "list_stack", label: "List Stack", sortable: true },
        { key: "subject_address", stickyColumn: true, label: "Subject Address", sortable: true, visible: false },
        // {key: "subject_address_line2", label: "Subject Address Line 2", sortable: true},
        { key: "subject_city", label: "Subject City", sortable: true, visible: false },
        { key: "subject_state", label: "Subject State", sortable: true, visible: false },
        { key: "subject_zip", label: "Subject Zip", sortable: true },
        { key: "subject_country", label: "Subject County", sortable: true },
        // {key: "subject_market", label: "Market", sortable: true},
        { key: "subject_type", label: "Subject Type", sortable: true },
        { key: "subject_age", label: "Subject Age", sortable: true },

        // Custom Fields
        // {key: "subject_last_marked_date", label: "Last Marketed Date", sortable: true},
        // {key: "subject_last_exported_date", label: "Last Exported Date", sortable: true},
        // {key: "subject_pull_date", label: "Pull Date", sortable: true},
        // {key: "subject_skip_trace_date", label: "Skip Trace Date", sortable: true},

        { key: "created_at", label: "Created Date", sortable: true },
        { key: "updated_at", label: "Updated Date", sortable: true },
        { key: "user_id", label: "Uploaded By", sortable: true },

        //List
        { key: "list_market", label: "Markets", sortable: true, visible: false },
        { key: "list_group", label: "Group", sortable: true },
        { key: "list_type", label: "Type", sortable: true },
        { key: "list_source", label: "Source", sortable: true }
    ],
}

const mutations = {
    SET_ADDITIONAL_FILTERS_OPTIONS(state, payload) {
        try {
            state.additionalFilterOptions = payload;
        } catch(err) {
            console.log(err);
        }
    },
    SET_ALL_SUBJECTS(state, payload) {
        try {
        state.sameRowSubjects = [];
        state.seperatedRowSubjects = [];
        const data = JSON.parse(JSON.stringify([...payload.subjects.data]));
        state.maxSellers = 0;
        state.maxPhones = 0;
        state.maxEmails = 0;
        state.maxGoldenAddresses = 0;
        data.forEach(e => {
            if (e.lists) {
                let list_market = [];
                let list_group = [];
                let list_type = [];
                let list_source = [];

                //list Custom Fields
                let list_custom_field_1 = [];
                let list_custom_field_2 = [];
                let list_custom_field_3 = [];
                let list_custom_field_4 = [];
                let list_custom_field_5 = [];

                e.lists.forEach(list => {
                    if (list.list_market && (list_market.findIndex(x=>x == list.list_market) == -1)) {
                        list_market.push(list.list_market);
                    } 
                    if (list.list_group && (list_group.findIndex(x=>x == list.list_group) == -1)) {
                        list_group.push(list.list_group);
                    }
                    
                    if (list.list_type && (list_type.findIndex(x=>x == list.list_type) == -1)) {
                        list_type.push(list.list_type);
                    }
                    if (list.list_source && (list_source.findIndex(x=>x == list.list_source) == -1)) {
                        list_source.push(list.list_source);
                    } 

                    //list Custom Fields
                    if (list.list_custom_field_1 && (list_custom_field_1.findIndex(x=>x == list.list_custom_field_1) == -1)) {
                        list_custom_field_1.push(list.list_custom_field_1);
                    } 
                    if (list.list_custom_field_2 && (list_custom_field_2.findIndex(x=>x == list.list_custom_field_2) == -1)) {
                        list_custom_field_2.push(list.list_custom_field_2);
                    } 
                    if (list.list_custom_field_3 && (list_custom_field_3.findIndex(x=>x == list.list_custom_field_3) == -1)) {
                        list_custom_field_3.push(list.list_custom_field_3);
                    }
                    if (list.list_custom_field_4 && (list_custom_field_4.findIndex(x=>x == list.list_custom_field_4) == -1)) {
                        list_custom_field_4.push(list.list_custom_field_4);
                    } 
                    if (list.list_custom_field_5 && (list_custom_field_5.findIndex(x=>x == list.list_custom_field_5) == -1)) {
                        list_custom_field_5.push(list.list_custom_field_5);
                    } 
                });

                e.list_market = list_market.join(', ');
                e.list_group = list_group.join(', ');
                e.list_type = list_type.join(', ');
                e.list_source = list_source.join(', ');

                e.list_custom_field_1 = list_custom_field_1.join(', ');
                e.list_custom_field_2 = list_custom_field_2.join(', ');
                e.list_custom_field_3 = list_custom_field_3.join(', ');
                e.list_custom_field_4 = list_custom_field_4.join(', ');
                e.list_custom_field_5 = list_custom_field_5.join(', ');
            }

            if (e.sellers) {
                    // Seller Custom Fields
                    let seller_custom_field_1 = [];
                    let seller_custom_field_2 = [];
                    let seller_custom_field_3 = [];
                    let seller_custom_field_4 = [];
                    let seller_custom_field_5 = [];
                    let seller_custom_field_6 = [];
                    let seller_custom_field_7 = [];
                    let seller_custom_field_8 = [];
                    let seller_custom_field_9 = [];
                    let seller_custom_field_10 = [];
                    let seller_custom_field_11 = [];
                    let seller_custom_field_12 = [];
                    let seller_custom_field_13 = [];
                    let seller_custom_field_14 = [];
                    let seller_custom_field_15 = [];
                    let seller_custom_field_16 = [];
                    let seller_custom_field_17 = [];
                    let seller_custom_field_18 = [];
                    let seller_custom_field_19 = [];
                    let seller_custom_field_20 = [];


                    // Seller Phone Custom Fields

                    let phone_custom_field_1 = [];
                    let phone_custom_field_2 = [];
                    let phone_custom_field_3 = [];
                    let phone_custom_field_4 = [];
                    let phone_custom_field_5 = [];


                    let email_custom_field_1 = [];
                    let email_custom_field_2 = [];
                    let email_custom_field_3 = [];
                    let email_custom_field_4 = [];
                    let email_custom_field_5 = [];

                    let golden_address_custom_field_1 = [];
                    let golden_address_custom_field_2 = [];
                    let golden_address_custom_field_3 = [];
                    let golden_address_custom_field_4 = [];
                    let golden_address_custom_field_5 = [];

                e.sellers.forEach((seller, index) => {
                    let sellerCount = index + 1;
                    e[sellerCount + '_seller_full_name'] = seller.seller_full_name;
                    e[sellerCount + '_seller_first_name'] = seller.seller_first_name;
                    e[sellerCount + '_seller_last_name'] = seller.seller_last_name;
                    e[sellerCount + '_seller_middle_name'] = seller.seller_middle_name;
                    e[sellerCount + '_seller_mailing_address'] = seller.seller_mailing_address;
                    e[sellerCount + '_seller_mailing_state'] = seller.seller_mailing_state;
                    e[sellerCount + '_seller_mailing_city'] = seller.seller_mailing_city;
                    e[sellerCount + '_seller_mailing_zip'] = seller.seller_mailing_zip;
                    

                    // Seller Custom Fields

                    if (seller.seller_custom_field_1) seller_custom_field_1.push(seller.seller_custom_field_1);
                    if (seller.seller_custom_field_2) seller_custom_field_2.push(seller.seller_custom_field_2);
                    if (seller.seller_custom_field_3) seller_custom_field_3.push(seller.seller_custom_field_3);
                    if (seller.seller_custom_field_4) seller_custom_field_4.push(seller.seller_custom_field_4);
                    if (seller.seller_custom_field_5) seller_custom_field_5.push(seller.seller_custom_field_5);
                    if (seller.seller_custom_field_6) seller_custom_field_6.push(seller.seller_custom_field_6);
                    if (seller.seller_custom_field_7) seller_custom_field_7.push(seller.seller_custom_field_7);
                    if (seller.seller_custom_field_8) seller_custom_field_8.push(seller.seller_custom_field_8);
                    if (seller.seller_custom_field_9) seller_custom_field_9.push(seller.seller_custom_field_9);
                    if (seller.seller_custom_field_10) seller_custom_field_10.push(seller.seller_custom_field_10);
                    if (seller.seller_custom_field_11) seller_custom_field_11.push(seller.seller_custom_field_11);
                    if (seller.seller_custom_field_12) seller_custom_field_12.push(seller.seller_custom_field_12);
                    if (seller.seller_custom_field_13) seller_custom_field_13.push(seller.seller_custom_field_13);
                    if (seller.seller_custom_field_14) seller_custom_field_14.push(seller.seller_custom_field_14);
                    if (seller.seller_custom_field_15) seller_custom_field_15.push(seller.seller_custom_field_15);
                    if (seller.seller_custom_field_16) seller_custom_field_16.push(seller.seller_custom_field_16);
                    if (seller.seller_custom_field_17) seller_custom_field_17.push(seller.seller_custom_field_17);
                    if (seller.seller_custom_field_18) seller_custom_field_18.push(seller.seller_custom_field_18);
                    if (seller.seller_custom_field_19) seller_custom_field_19.push(seller.seller_custom_field_19);
                    if (seller.seller_custom_field_20) seller_custom_field_20.push(seller.seller_custom_field_20);

                    

                    // Seller Phones
                    seller.phones.forEach((phone, phoneIndex) => {
                        let phoneCount = phoneIndex + 1;
                        e['seller_' + sellerCount + '_phone_' + phoneCount + '_phone_number'] = phone.phone_number;
                        e['seller_' + sellerCount + '_phone_' + phoneCount + '_phone_type'] = phone.phone_type;
                        e['seller_' + sellerCount + '_phone_' + phoneCount + '_phone_validity'] = phone.phone_validity;
                        e['seller_' + sellerCount + '_phone_' + phoneCount + '_phone_skip_source'] = phone.phone_skip_source;

                        // Seller Phone Custom Fields

                        if (phone.phone_custom_field_1) phone_custom_field_1.push(phone.phone_custom_field_1);
                        if (phone.phone_custom_field_2) phone_custom_field_2.push(phone.phone_custom_field_2);
                        if (phone.phone_custom_field_3) phone_custom_field_3.push(phone.phone_custom_field_3);
                        if (phone.phone_custom_field_4) phone_custom_field_4.push(phone.phone_custom_field_4);
                        if (phone.phone_custom_field_5) phone_custom_field_5.push(phone.phone_custom_field_5);


                    });

                    // Seller Emails
                    seller.emails.forEach((email, emailIndex) => {
                        let emailCount = emailIndex + 1;
                        e['seller_' + sellerCount + '_email_' + emailCount + '_email_address'] = email.email_address;
                        e['seller_' + sellerCount + '_email_' + emailCount + '_email_validity'] = email.email_validity;
                        e['seller_' + sellerCount + '_email_' + emailCount + '_email_skip_source'] = email.email_skip_source;

                        if (email.email_custom_field_1) email_custom_field_1.push(email.email_custom_field_1);
                        if (email.email_custom_field_2) email_custom_field_2.push(email.email_custom_field_2);
                        if (email.email_custom_field_3) email_custom_field_3.push(email.email_custom_field_3);
                        if (email.email_custom_field_4) email_custom_field_4.push(email.email_custom_field_4);
                        if (email.email_custom_field_5) email_custom_field_5.push(email.email_custom_field_5);

                    });

                    // Seller Golden Addresses
                    seller.golden_addresses.forEach((golden, goldenIndex) => {
                        let goldenCount = goldenIndex + 1;
                        e['seller_' + sellerCount + '_golden_' + goldenCount + '_golden_address_address'] = golden.golden_address_address;
                        e['seller_' + sellerCount + '_golden_' + goldenCount + '_golden_address_city'] = golden.golden_address_city;
                        e['seller_' + sellerCount + '_golden_' + goldenCount + '_golden_address_state'] = golden.golden_address_state;
                        e['seller_' + sellerCount + '_golden_' + goldenCount + '_golden_address_zip'] = golden.golden_address_zip;

                        if (golden.golden_address_custom_field_1) golden_address_custom_field_1.push(golden.golden_address_custom_field_1);
                        if (golden.golden_address_custom_field_2) golden_address_custom_field_2.push(golden.golden_address_custom_field_2);
                        if (golden.golden_address_custom_field_3) golden_address_custom_field_3.push(golden.golden_address_custom_field_3);
                        if (golden.golden_address_custom_field_4) golden_address_custom_field_4.push(golden.golden_address_custom_field_4);
                        if (golden.golden_address_custom_field_5) golden_address_custom_field_5.push(golden.golden_address_custom_field_5);

                    });

                    // get Max counts for Phones, Emails and Golden addresses
                    if (seller.phones.length > state.maxPhones) {
                        state.maxPhones = seller.phones.length;
                    }

                    if (seller.emails.length > state.maxEmails) {
                        state.maxEmails = seller.emails.length;
                    }

                    if (seller.golden_addresses.length > state.maxGoldenAddresses) {
                        state.maxGoldenAddresses = seller.golden_addresses.length;
                    }
                });

                    // Seller Custom Fields
                e.seller_custom_field_1 = seller_custom_field_1.join(', ');
                e.seller_custom_field_2 = seller_custom_field_2.join(', ');
                e.seller_custom_field_3 = seller_custom_field_3.join(', ');
                e.seller_custom_field_4 = seller_custom_field_4.join(', ');
                e.seller_custom_field_5 = seller_custom_field_5.join(', ');
                e.seller_custom_field_6 = seller_custom_field_6.join(', ');
                e.seller_custom_field_7 = seller_custom_field_7.join(', ');
                e.seller_custom_field_8 = seller_custom_field_8.join(', ');
                e.seller_custom_field_9 = seller_custom_field_9.join(', ');
                e.seller_custom_field_10 = seller_custom_field_10.join(', ');
                e.seller_custom_field_11 = seller_custom_field_11.join(', ');
                e.seller_custom_field_12 = seller_custom_field_12.join(', ');
                e.seller_custom_field_13 = seller_custom_field_13.join(', ');
                e.seller_custom_field_14 = seller_custom_field_14.join(', ');
                e.seller_custom_field_15 = seller_custom_field_15.join(', ');
                e.seller_custom_field_16 = seller_custom_field_16.join(', ');
                e.seller_custom_field_17 = seller_custom_field_17.join(', ');
                e.seller_custom_field_18 = seller_custom_field_18.join(', ');
                e.seller_custom_field_19 = seller_custom_field_19.join(', ');
                e.seller_custom_field_20 = seller_custom_field_20.join(', ');



                // Seller Phone Custom Fields
                e.phone_custom_field_1 = phone_custom_field_1.join(', ');
                e.phone_custom_field_2 = phone_custom_field_2.join(', ');
                e.phone_custom_field_3 = phone_custom_field_3.join(', ');
                e.phone_custom_field_4 = phone_custom_field_4.join(', ');
                e.phone_custom_field_5 = phone_custom_field_5.join(', ');

                // Seller Email Custom Fields
                e.email_custom_field_1 = email_custom_field_1.join(', ');
                e.email_custom_field_2 = email_custom_field_2.join(', ');
                e.email_custom_field_3 = email_custom_field_3.join(', ');
                e.email_custom_field_4 = email_custom_field_4.join(', ');
                e.email_custom_field_5 = email_custom_field_5.join(', ');

                // Seller golden_address Custom Fields
                e.golden_address_custom_field_1 = golden_address_custom_field_1.join(', ');
                e.golden_address_custom_field_2 = golden_address_custom_field_2.join(', ');
                e.golden_address_custom_field_3 = golden_address_custom_field_3.join(', ');
                e.golden_address_custom_field_4 = golden_address_custom_field_4.join(', ');
                e.golden_address_custom_field_5 = golden_address_custom_field_5.join(', ');

                





            }
            e.created_at = e.created_at.split('T')[0];
            e.updated_at = e.updated_at.split('T')[0];
            e.list_stack = e.lists.length;
            e.total_sellers = e.sellers.length;
            if (e.sellers.length > state.maxSellers) {
                state.maxSellers = e.sellers.length;
            }
        })
        state.sameRowSubjects = JSON.stringify(data);
        

        // Mapping date for seperate row subjects.
        const seperatedRowSubjects = JSON.parse(JSON.stringify([...payload.subjects.data]));
        seperatedRowSubjects.forEach(e => {
            if (e.sellers) {
                let seperatedRowSubject = JSON.parse(JSON.stringify({ ...e }));
                e.sellers.forEach((seller) => {
                    if (e.lists) {
                        let list_market = [];
                        let list_group = [];
                        let list_type = [];
                        let list_source = [];

                        e.lists.forEach(list => {
                            if (list.list_market) list_market.push(list.list_market);
                            if (list.list_group) list_group.push(list.list_group);
                            if (list.list_type) list_type.push(list.list_type);
                            if (list.list_source) list_source.push(list.list_source);
                        });

                        seperatedRowSubject.list_market = list_market.join(', ');
                        seperatedRowSubject.list_group = list_group.join(', ');
                        seperatedRowSubject.list_type = list_type.join(', ');
                        seperatedRowSubject.list_source = list_source.join(', ');
                    }
                    seperatedRowSubject['seller_id'] = seller.id;
                    seperatedRowSubject['seller_full_name'] = seller.seller_full_name;
                    seperatedRowSubject['seller_first_name'] = seller.seller_first_name;
                    seperatedRowSubject['seller_last_name'] = seller.seller_last_name;
                    seperatedRowSubject['seller_middle_name'] = seller.seller_middle_name;
                    seperatedRowSubject['seller_mailing_address'] = seller.seller_mailing_address;
                    seperatedRowSubject['seller_mailing_state'] = seller.seller_mailing_state;
                    seperatedRowSubject['seller_mailing_city'] = seller.seller_mailing_city;
                    seperatedRowSubject['seller_mailing_zip'] = seller.seller_mailing_zip;

                    let maxCount = Math.max((payload.customViewHasPhone?seller.phones.length:0), (payload.customViewHasEmail?seller.emails.length:0), (payload.customViewHasGolden?seller.golden_addresses.length:0));
                    if ((payload.customViewHasPhone || payload.customViewHasEmail || payload.customViewHasGolden ) && maxCount > 0) {
                        for (let x = 0; x < maxCount; x++) {
                            if (seller.phones && seller.phones[x]) {
                                let phone = seller.phones[x];
                                // Seller Phones
                                seperatedRowSubject['phone_id'] = phone.id;
                                seperatedRowSubject['phone_number'] = phone.phone_number;
                                seperatedRowSubject['phone_type'] = phone.phone_type;
                                seperatedRowSubject['phone_validity'] = phone.phone_validity;
                                seperatedRowSubject['phone_skip_source'] = phone.phone_skip_source;
                            } else {
                                seperatedRowSubject['phone_id'] = "";
                                seperatedRowSubject['phone_number'] = "";
                                seperatedRowSubject['phone_type'] = "";
                                seperatedRowSubject['phone_validity'] = "";
                                seperatedRowSubject['phone_skip_source'] = "";  
                            } 
                            if (seller.emails && seller.emails[x]) {
                                let email = seller.emails[x];
                                // Seller Emails
                                seperatedRowSubject['email_id'] = email.id;
                                seperatedRowSubject['email_address'] = email.email_address;
                                seperatedRowSubject['email_validity'] = email.email_validity;
                                seperatedRowSubject['email_skip_source'] = email.email_skip_source;
                            } else {
                                seperatedRowSubject['email_id'] = "";
                                seperatedRowSubject['email_address'] = "";
                                seperatedRowSubject['email_validity'] = "";
                                seperatedRowSubject['email_skip_source'] = "";
                            }
                            if (seller.golden_addresses && seller.golden_addresses[x]) {
                                let golden = seller.golden_addresses[x];
                                // Seller Golden Addresses
                                seperatedRowSubject['golden_id'] = golden.id;
                                seperatedRowSubject['golden_address_address'] = golden.golden_address_address;
                                seperatedRowSubject['golden_address_city'] = golden.golden_address_city;
                                seperatedRowSubject['golden_address_state'] = golden.golden_address_state;
                                seperatedRowSubject['golden_address_zip'] = golden.golden_address_zip;
                            } else {
                                seperatedRowSubject['golden_id'] = "";
                                seperatedRowSubject['golden_address_address'] = "";
                                seperatedRowSubject['golden_address_city'] = "";
                                seperatedRowSubject['golden_address_state'] = "";
                                seperatedRowSubject['golden_address_zip'] = "";
                            }
                            state.seperatedRowSubjects.push(JSON.parse(JSON.stringify(seperatedRowSubject)));
                        }
                    } else {
                        state.seperatedRowSubjects.push(JSON.parse(JSON.stringify(seperatedRowSubject)));
                    }
                });
            } else {
                let seperatedRowSubject = JSON.parse(JSON.stringify({ ...e }));
                if (e.lists) {
                    let list_market = [];
                    let list_group = [];
                    let list_type = [];
                    let list_source = [];

                    e.lists.forEach(list => {
                        if (list.list_market) list_market.push(list.list_market);
                        if (list.list_group) list_group.push(list.list_group);
                        if (list.list_type) list_type.push(list.list_type);
                        if (list.list_source) list_source.push(list.list_source);
                    });

                    seperatedRowSubject.list_market = list_market.join(', ');
                    seperatedRowSubject.list_group = list_group.join(', ');
                    seperatedRowSubject.list_type = list_type.join(', ');
                    seperatedRowSubject.list_source = list_source.join(', ');
                }
                state.seperatedRowSubjects.push(JSON.parse(JSON.stringify(seperatedRowSubject)));
            }
        });
        state.total = payload.subjects.total;
    }catch(error){
        console.log('error',error);
        
    }
    },
    ADD_EXPORT(state, payload) {
        console.log(state, payload);
    },
    EDIT_SUBJECT(state, payload) {
        const SUBJECTS = JSON.parse(state.sameRowSubjects)
        const findIndex = SUBJECTS.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && SUBJECTS.splice(findIndex, 1, { ...payload })
        // Remove and add subjects to seperatedRowSubjects
        const SEPERATED_ROW_SUBJECTS = state.seperatedRowSubjects;
        let sepIndex = true;
        while (sepIndex) {
            const seperatedRowSubjectfindIndex = SEPERATED_ROW_SUBJECTS.findIndex(({ id }) => id === payload.id);
            seperatedRowSubjectfindIndex !== -1 && SEPERATED_ROW_SUBJECTS.splice(seperatedRowSubjectfindIndex, 1, { ...payload })
            if (seperatedRowSubjectfindIndex == -1) {
                sepIndex = false;
            }
        }
    },
    DELETE_SUBJECT(state, payload) {
        const SUBJECTS = JSON.parse(state.sameRowSubjects)
        const findIndex = SUBJECTS.findIndex(({ id }) => id === payload)
        findIndex !== -1 && SUBJECTS.splice(findIndex, 1)

        // Remove and add subjects to seperatedRowSubjects
        const SEPERATED_ROW_SUBJECTS = state.seperatedRowSubjects;
        let sepIndex = true;
        while (sepIndex) {
            const seperatedRowSubjectfindIndex = SEPERATED_ROW_SUBJECTS.findIndex(({ id }) => id === payload.id);
            seperatedRowSubjectfindIndex !== -1 && SEPERATED_ROW_SUBJECTS.splice(seperatedRowSubjectfindIndex, 1)
            if (seperatedRowSubjectfindIndex == -1) {
                sepIndex = false;
            }
        }
    },
    GET_TOTAL(state, payload) {
        state.total = payload;
    },
    GET_TOTALS(state, payload) {
        state.totals = payload;
    },
    ADD_SUBJECT(state, payload) {
        const SUBJECTS = JSON.parse(state.sameRowSubjects)
        const findIndex = SUBJECTS.findIndex(({ id }) => id === payload.id)
        findIndex !== -1 && SUBJECTS.splice(findIndex, 1, { ...payload })
    },
    DELETE_MULTIPLE_SUBJECTS(state, payload) {
        const SUBJECTS = JSON.parse(state.sameRowSubjects)
        const findIndex = SUBJECTS.findIndex(({ id }) => id === payload)
        findIndex !== -1 && SUBJECTS.splice(findIndex, 1)
    },
    VUEX_STORE(state) {
        state.sameRowSubjects = [];
        state.total = 0;
        state.totals = {};
        state.maxSellers = 0;
        state.template = {};
        state.maxPhones = 0;
        state.maxEmails = 0;
        state.maxGoldenAddresses = 0;
    },

}

const actions = {
    async getAllSubjects({ commit, dispatch }, { page, perPage, search, sortBy, sortDesc }) {
        return await api.get(`/subjects?page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, { root: true })
            }

            if (response && response.subjects && response.subjects.data) {
                commit('SET_ALL_SUBJECTS', {subjects: response.subjects,customViewHasPhone:false, customViewHasEmail:false, customViewHasGolden: false})
            }

            return response
        })
    },
    async getAllSubjectsV2({ commit, dispatch }, data) {
        let customViewHasPhone = false;
        let customViewHasEmail = false;
        let customViewHasGolden = false;

        if(data.custom) {
        let customView = Object.keys(data.custom);
        customView.forEach(function(item) {
            if(item.includes('phone')) {
                customViewHasPhone = true;
            }
            if(item.includes('email')) {
                customViewHasEmail = true;
            } 
            if(item.includes('golden')) {
                customViewHasGolden = true;
            }
        });
    }
        return await api.post(`/subjectsV2`, { ...data }).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, { root: true })
            }

            if (response && response.subjects && response.subjects.data) {
                commit('SET_ALL_SUBJECTS', {subjects: response.subjects, customViewHasPhone:customViewHasPhone, customViewHasEmail:customViewHasEmail, customViewHasGolden: customViewHasGolden  })
            }
            return response
        })
    },
    async filterProperties({ commit, dispatch }, data) {
        let customViewHasPhone = false;
        let customViewHasEmail = false;
        let customViewHasGolden = false;

        if(data.custom) {
        let customView = Object.keys(data.custom);
        customView.forEach(function(item) {
            if(item.includes('phone')) {
                customViewHasPhone = true;
            }
            if(item.includes('email')) {
                customViewHasEmail = true;
            } 
            if(item.includes('golden')) {
                customViewHasGolden = true;
            }
        });
    }
        return await api.post(`/properties/filter`, { ...data }).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, { root: true })
            }
            if (response && response.subjects && response.subjects.data) {
                commit('SET_ALL_SUBJECTS', {subjects: response.subjects, customViewHasPhone:customViewHasPhone, customViewHasEmail:customViewHasEmail, customViewHasGolden: customViewHasGolden  })
                // commit('GET_TOTAL', response.subjects.total)
            }
            if(response) {
                commit('GET_TOTALS', response);
            }
            return response
        })
    },
    async getTotalsCount({ commit, dispatch }, data) {
        return await api.post(`/properties/getTotals`, { ...data }).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, { root: true })
            }
            if(response) {
                commit('GET_TOTALS', response);
            }
            return response
        })
    },
    async searchSubjects({ commit, dispatch }, { page, perPage, search, sortBy, sortDesc }) {
        return await api.get(`/subjects?page=${page}&perPage=${perPage}&search=${search}&sortBy=${sortBy}&sortDesc=${sortDesc}`).then((response) => {
            if (response && response.response && response.response.status === 401) {
                dispatch('loginModule/logout', null, { root: true })
            }

            if (response && response.subjects && response.subjects.data) {
                commit('SET_ALL_SUBJECTS', {subjects: response.subjects,customViewHasPhone:false, customViewHasEmail:false, customViewHasGolden: false })
            }

            return response
        })
    },
    async editSubject({ commit }, data) {
        return await api.put(`/subjects/${data.id}`, { ...data }).then((response) => {
            commit('EDIT_SUBJECT', data)
            return response
        })
    },
    async addSubject({ commit }, data) {
        return await api.post(`/subjects`, { ...data }).then((response) => {
            commit('ADD_SUBJECT', data)
            return response
        })
    },
    async deleteSubject({ commit }, data) {
        return await api.deleteAPI(`/subjects/${data}`).then((response) => {
            commit('DELETE_SUBJECT', data)
            return response
        })
    },
    async deleteMultipleSubjects({ commit }, data) {
        return await api.deleteAPI(`/subjects/deleteAll/${data}`).then((response) => {
            commit('DELETE_MULTIPLE_SUBJECTS', data)
            return response
        })
    },
    async getTotal({ commit }) {
        return await api.get(`/totals/subjects`).then((response) => {
            if (response && response.count > -1) {
                commit('GET_TOTAL', response.count);
            }
            return response
        })
    },
    // eslint-disable-next-line no-empty-pattern
    async exportProperties({ commit }, data) {
        // return await api.post(`/properties/export`, { ...data }).then(async (response) => {
        //     commit('ADD_EXPORT', response.export);
        //     return response
        // })
        return await api.post(`/properties/export`, { ...data }).then(async (response) => {
            commit('ADD_EXPORT', response.export);
            return response
        })
    },
    async deleteVuexStore({ commit }) {
        commit('VUEX_STORE');
    },
    async additionalFilterOptions({ commit }, data) {
        return await api.post('/additionalFilterOptions', {...data}).then(async (response) => {
            commit('SET_ADDITIONAL_FILTERS_OPTIONS', response.options);
        });
    }
}

const getters = {
    fields: ({ fields }) => fields,
    sameRowSubjects: ({ sameRowSubjects }) => {
        if (typeof sameRowSubjects === 'string') {
            return JSON.parse(sameRowSubjects);
        }
        return [];
    },
    seperatedRowSubjects: ({ seperatedRowSubjects }) => seperatedRowSubjects,
    total: ({ total }) => total,
    totals: ({ totals }) => totals,
    maxSellers: ({ maxSellers }) => maxSellers,
    maxPhones: ({ maxPhones }) => maxPhones,
    maxEmails: ({ maxEmails }) => maxEmails,
    maxGoldenAddresses: ({ maxGoldenAddresses }) => maxGoldenAddresses,
    template: ({ template }) => template,
    additionalFilterOptions: ({ additionalFilterOptions }) => additionalFilterOptions,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
