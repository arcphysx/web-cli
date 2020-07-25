<template>
  <div id="app_container" class="container-fluid">
      <router-view></router-view>
  </div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
export default {
  computed: {
    ...mapGetters(["activeSessionIndex"])
  },
  methods: {
    ...mapActions(["initFirstSession"]),
  },
  created(){
    this.initFirstSession()
    // this.$router.push(`/tab/${this.activeSessionIndex}`)
  },
}
</script>