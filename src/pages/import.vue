<template>
    <b-container fluid 
        :class="`import main-content ${isCollapsed ? 'wide-content' : ''}`"
    >
        <b-row>
            <b-col v-for="(item, index) in cards"
                :key="index"
                md="4"
            >
                <import-card
                    :item="item"
                ></import-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from "vuex"
import ImportCard from "@/components/import/ImportCard"

export default {
    name: "Import",
    components: {
        "import-card": ImportCard
    },
    computed: {
        ...mapGetters({
            cards: 'importModule/cards',
            isCollapsed: 'uxModule/isCollapsed'
        })
    },
}
</script>
