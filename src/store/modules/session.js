import { Session, History } from '../../utils/terminal'
import { processor } from '../../utils/commandHandler'
import { cliConfig } from '../../constant/cli_config';

export default {
    state: {
        'sessions': [],
        'activeSession': null,
    },
    getters: {
        // Session Part
        sessions: (state) => { return state.sessions},
        sessionByIndex: (state) => (index) => { return state.sessions[index] },
        sessionById: (state) => (id) => { return state.sessions.find(s => s.id === id) },
        // ActiveSession Part 
        activeSession: (state) => { return state.activeSession == null ? null : state.activeSession },
        activeSessionIndex: (state) => { return state.sessions.indexOf(state.activeSession) },
    },
    mutations: {
        createSession(state) {
            let session = new Session(undefined,cliConfig.USERNAME,cliConfig.HOSTNAME)
            state.sessions.push(session)
            state.activeSession = session
        },
        removeSession(state, payload) {
            let cIndex = 0, cActive = 0
            if(typeof payload.id !== 'undefined'){
                cIndex = state.sessions.indexOf(state.sessions.find(s => s.id === payload.id))
            }else if(typeof payload.index !== 'undefined'){
                cIndex = payload.index
            }else{
                cIndex = payload.index
            }
            cActive = state.sessions.indexOf(state.activeSession)
            if(cActive == cIndex){
                state.activeSession = state.sessions[cIndex-1 < 0 ? 1 : cIndex-1]
            }
            state.sessions.splice(cIndex, 1)
        },
        switchSession(state, payload) {
            if(typeof payload.id !== 'undefined'){
                state.activeSession = state.sessions.find(s => s.id === payload.id)
            }else if(typeof payload.index !== 'undefined'){
                state.activeSession = state.sessions[payload.index]
            }else{
                state.activeSession = state.sessions[payload]
            }
        },
        inputToSession(state, payload) {
            state.activeSession.state.typed = payload
        },
        createHistory(state, payload) {
            History.create(payload, state.activeSession)
        },
    },
    actions: {
        initFirstSession({ commit, getters }){
            if(getters.activeSession == null) commit('createSession')
        },
        addSession({ commit }){
            commit('createSession')
        },
        deleteSession({ commit }, payload){
            commit('removeSession', payload)
        },
        switchActiveSession({ commit }, payload){
            commit('switchSession', payload)
        },
        inputToActiveSession({ commit }, payload){
            commit('inputToSession', payload)
        },
        submitToActiveSession({ commit, getters }){
            commit('createHistory', processor(getters.activeSession))
        }
    }
}