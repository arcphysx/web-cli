<template>
  <div id="cli_container" class="container-fluid h-100 overflow-auto" ref="cliContainer">
      <terminal-screen @needScroll="scrollToEnd"/>
      <div class="h-25"></div>
  </div>
</template>

<script>
import TerminalScreen from '../../components/terminal/TerminalScreen'
export default {
  components: {
    TerminalScreen
  },
  methods: {
    scrollToEnd(){
      let container = this.$refs.cliContainer
      container.scrollTop = container.scrollHeight + 1000
    },
  },
}
</script>

<style lang="scss">
</style>