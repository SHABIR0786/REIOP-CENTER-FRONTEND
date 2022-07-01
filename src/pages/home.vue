<template>
    <b-container fluid :class="`home main-content ${isCollapsed ? 'wide-content' : ''}`">
        <b-row v-if="!adminMode">
            <b-col v-for="(item, index) in cards" :key="index" md="3">
                <home-card :item="item" v-if="item.isVisible"></home-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from "vuex"
import HomeCard from "@/components/home/HomeCard"

export default {
    name: "Home",
    components: {
        "home-card": HomeCard
    },
    computed: {
        ...mapGetters({
            cards: 'homeModule/cards',
            isCollapsed: 'uxModule/isCollapsed',
            adminMode: 'loginModule/getAdminMode',
        })
    },
    async created () {
        await this.$store.dispatch('homeModule/getTotalRows').then(() => {
          this.$store.dispatch('uxModule/hideLoader')
        })
    }
}
</script>
