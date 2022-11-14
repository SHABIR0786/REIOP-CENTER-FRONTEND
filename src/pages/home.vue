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
        try {
            if (this.$route.query.id) {
                sessionStorage.setItem('teamAccessId', this.$route.query.id)
                this.$store.dispatch('teamModule/teamViewAccess');
                this.$store.dispatch('loginModule/switchToTeamView');
                this.$router.push({name: 'Home'}).catch(() => {})
            }
            this.$store.dispatch('uxModule/setLoading')
            await this.$store.dispatch('homeModule/getTotalRows').then(() => {
            })
            this.$store.dispatch('uxModule/hideLoader')
        } catch (error) {
            console.log('error',error);
            this.$store.dispatch('uxModule/hideLoader')
        }

    }
}
</script>
