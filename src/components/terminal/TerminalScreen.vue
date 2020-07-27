<template>
  <div class="container-fluid terminal">
      <div id="history">
        <p v-for="(v,k) in activeSession.history" :key="k">
          <span class="text-host" v-if="typeof v.state.username != 'undefined' && typeof v.state.host != 'undefined'">{{ v.state.username }}@{{ v.state.host }}</span>
          <span class="text-pwd" v-if="typeof v.state.pwd != 'undefined'">{{ v.state.pwd }}</span>
          <span class="text-scope" v-if="typeof v.state.scope != 'undefined'">{{ v.state.scope }}</span>
          <span v-if="typeof v.state.typed != 'undefined'" class="ml-2">{{ v.state.typed }}</span>
          <br/>
          <span v-html="v.output"/>
        </p>
      </div>
      <div id="input_line">
        <span class="text-host">{{ activeSession.state.username }}@{{ activeSession.state.host }}</span>
        <span class="text-pwd">{{ activeSession.state.pwd }}</span>
        <span class="text-scope">{{ activeSession.state.scope }}</span>
        <input type="text" @blur="setInputCliFocus" @keyup.enter="submitCliCommand" v-model="typedText" ref="typedText">
      </div>
  </div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
export default {
  data(){
    return {
      typedText: "",
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters(["activeSession"])
  },
  methods: {
    ...mapActions(["inputToActiveSession", "submitToActiveSession", "switchActiveSession"]),
    setInputCliFocus(event){
      setTimeout(function() { event.target.focus() }, 0);
    },
    submitCliCommand(){
      this.submitToActiveSession()
      this.typedText = ""
      this.$nextTick(() => {
         this.$emit('needScroll')
      })
    }
  },
  mounted(){
    document.title = `${this.activeSession.name} | Web CLI | Arcphysx`
    this.$refs["typedText"].focus()
  },
  watch: {
    typedText(){
      this.inputToActiveSession(this.typedText)
    },
    '$route'(to){
      this.id = to.params.id
      this.switchActiveSession(this.id)
      this.typedText = this.activeSession.state.typed
    }
  }
}
</script>

<style lang="scss">
</style>