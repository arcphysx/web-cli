<template>
    <b-button-group class="ml-2 overflow-auto" style="max-width: 80vw;">
        <b-button :variant="activeSession.id == v.id ? 'light' : 'outline-light'" class="text-nowrap" v-for="(v,k) in sessions" :key="k">
            <router-link tag="span" :to="{path: `${k}`}" class="mr-2">{{ v.name }}</router-link>
            <b-icon icon="trash" variant="gray" @click="removeSession(v.id)" v-if="sessions.length>1"></b-icon>
        </b-button>
        <b-button variant="outline-light text-nowrap" @click="makeSession">Add New Session</b-button>
    </b-button-group>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
export default {
    name: "TerminalTab",
    computed: {
        ...mapGetters(["sessions", "activeSessionIndex", "activeSession"])
    },
    created(){
        
    },
    methods: {
        ...mapActions(["addSession", "deleteSession", "switchActiveSession"]),
        makeSession(){
            this.addSession();
            this.$router.push(`${this.activeSessionIndex}`).catch(()=>{})
        },
        removeSession(id){
            this.deleteSession({ id: id })
            this.$router.push(`${this.activeSessionIndex}`).catch(()=>{})
        }
    },
}
</script>