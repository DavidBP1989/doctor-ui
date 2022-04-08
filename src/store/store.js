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
            expirationDate: null,
            sex: 'M'
        },
        doctorRegister: false,
        patientRegister: false,
        printConfig: {
            textColor: '#ffffff',
            bgPrimaryColor: '#ffffff',
            bgSecondaryColor: '#418AE0',
            logo: {
                url: '',
                base64: null,
                title: null
            },
            html: null
        }
    },
    actions,
    getters,
    mutations
})