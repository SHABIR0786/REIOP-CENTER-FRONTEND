<template>
<div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <b-tabs pills class="activity-tabs">
        <b-tab title="Imports" :active="tab == 'import'">
        <import-v2 />
        </b-tab>
        <b-tab title="Exports" :active="tab == 'export'">
        <exports />
        </b-tab>
    </b-tabs>
</div>
</template>
<script>
import importV2 from "../pages/importV2";
import exports from "../pages/exports";
import {
    mapGetters
} from "vuex";
export default {
    name: "Activity",
    components: {
        importV2,
        exports
    },
    data() {
        return {
            tab: 'import',
        }
    },
    computed: {
        ...mapGetters({
            isCollapsed: 'uxModule/isCollapsed',
        }),
        rows() {
            return this.total ? this.total : 1
        }
    },
    async created() {
        if (this.$route.query.export_id) {
            this.tab = "export";
        }
    },
    methods: {}
}
</script>

<style>
.activity-tabs .nav-pills {
    background:#a2c4c9;
    border-radius: 5px;
}
.activity-tabs .nav-pills li {
    width:50%;
}
</style>
