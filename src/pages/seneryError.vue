<template>
  <div :class="`list-page main-content ${isCollapsed ? 'wide-content' : ''}`">
    <div>
      <h3>Senery Error</h3>
      <div>
        <b-row>
         
       </b-row>
      </div>
      
      <b-row>
      <b-col class="d-flex justify-content-center">
        <p>Error thowed. Please check issues</p>
      </b-col>
      </b-row>
    </div>
    

  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "seneryError",
  computed: {
    ...mapGetters({
      isCollapsed: 'uxModule/isCollapsed',
    }),
  },
  async created () {
    this.$store.dispatch('uxModule/hideLoader');
    throw new Error('Sentry Test Error by routes');
  },
}
</script>

<style scoped>
  
</style>
