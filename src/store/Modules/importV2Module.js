const state = {
    fields: [
        {key:"file_name", label: "File Name", sortable: true},
        {key:"actions", stickyColumn: true, label: "Actions"},

        {key:"is_processing", label: "Is Processing"},
        {key:"is_processed", label: "Is Processed"},
        {key:"created_records", label: "Created Records", sortable: true},

        {key:"error_lines", label: "Error Lines", sortable: true},

        {key:"created_at", label: "Created Date", sortable: true},
        {key:"process_id", label: "Process ID", sortable: true},
    ],
    imports: [],
    total: 0,
}

const getters = {
    fields: ({ fields }) => fields,
    imports: ({ imports }) => imports,
}

export default {
    namespaced: true,
    state,
    getters
}
