import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],
    strict: true,
    state: {
        doctor: {
            id: null,
            emeci: null,
            name: null
        },
        token: (localStorage.getItem('emecitoken') || null),
        patient: {
            allergies: null,
            reserved: null,
            relevantPathologies: null,
            name: null,
            emeci: null,
            id: null,
            ageInMonths: 0,
            coordinate: null,
            coordinateValue: null,
            groupRH: null,
            birthDate: null,
            sex: 'M'
        },
        consults: {
            diagnostics: [],
            treatments: [],
            laboratory: [],
            cabinet: []
        }
    },
    actions,
    getters,
    mutations
})