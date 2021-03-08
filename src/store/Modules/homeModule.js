export const state = {
    cards: [
        {
            icon: "house-fill",
            path: "/subject",
            text: "Total Subjects",
            variant: "warning",
            counter: 97997
        },
        {
            icon: "person-circle",
            path: "/seller",
            text: "Total Sellers",
            variant: "secondary",
            counter: 122485
        },
        {
            icon: "envelope-fill",
            path: "/email",
            text: "Total Emails",
            variant: "danger",
            counter: 0
        },
        {
            icon: "telephone-fill",
            path: "/phone",
            text: "Total Phones",
            variant: "info",
            counter: 100350
        },
        {
            icon: "key-fill",
            path: "/golden-address",
            text: "Total Addresses",
            variant: "success",
            counter: 0
        }
    ]
}

export const mutations = {

}

export const actions = {

}

export const getters = {
    cards: ({ cards }) => cards,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}