const state = {
    headers: [
        {
            key: "listId",
            label: "ListId",
            sortable: true
        },
        {
            key: "dept",
            label: "Dept",
            sortable: true
        },
        {
            key: "type",
            label: "Type",
            sortable: true
        },
        {
            key: "group",
            label: "Group",
            sortable: true
        },
        {
            key: "code",
            label: "Code",
            sortable: true
        },
        {
            key: "source",
            label: "Source",
            sortable: true
        },
        {
            key: "totalSubjects",
            label: "Total Subjects",
            sortable: true
        },
        {
            key: "totalIndividualList",
            label: "Total Individual List",
            sortable: true
        },
        {
            key: "createDate",
            label: "Create Date",
            sortable: true
        },
        {
            key: "actions",
            label: "Actions"
        },
        {
            key: "markets",
            label: "Markets",
            sortable: true
        }
    ]
}

const mutations = {

}

const actions = {

}

const getters = {
    headers: ({ headers }) => headers
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}