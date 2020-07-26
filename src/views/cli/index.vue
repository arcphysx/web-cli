<template>
  <div id="app_container" class="container-fluid">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item v-b-toggle._leftbar>
            <b-icon icon="list" variant="light"></b-icon>
          </b-nav-item>
          <terminal-tab/>
        </b-navbar-nav>
      </b-navbar>
      <leftbar title="Web CLI"></leftbar>
      <router-view></router-view>
  </div>
</template>

<script>
import {
    mapActions
} from "vuex";
import Leftbar from './../../components/Leftbar'
import TerminalTab from './../../components/terminal/TerminalTab'
export default {
  components:{
    Leftbar,
    TerminalTab
  },
  methods: {
    ...mapActions(["initFirstSession"]),
  },
  created(){
    this.initFirstSession()
  },
}
</script>