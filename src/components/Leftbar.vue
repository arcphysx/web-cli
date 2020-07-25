<template>
    <b-sidebar id="_leftbar" :title="title" shadow lazy backdrop>
        <div class="px-3 py-2">
            <strong>Example Command</strong>
            <b-nav vertical>
                <b-nav-item @click="helpCommand()" v-b-toggle._leftbar>Help</b-nav-item>
            </b-nav>
        </div>
        <template v-slot:footer>
            <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
                <strong class="mr-auto">&copy;{{ (new Date()).getFullYear() }} <a href="https://arcphysx.com/" target="_blank">Arcphysx</a></strong>
            </div>
        </template>
    </b-sidebar>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    name: "Leftbar",
    props: ['title'],
    methods:{
        ...mapActions(["inputToActiveSession", "submitToActiveSession"]),
        helpCommand(){
            this.inputToActiveSession('help')
            this.submitToActiveSession()
            this.inputToActiveSession('')
        },
    }
}
</script>