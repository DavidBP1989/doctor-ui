import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

Vue.use(Router)

import auth from '../views/authentication/main.vue'
import logIn from '../views/authentication/components/logIn.vue'
import forgotPwd from '../views/authentication/components/rememberPassword.vue'

import patients from '../views/patients/main.vue'
import patientList from '../views/patients/patientList/patientList.vue'
import newPatient from '../views/patients/newPatient/newPatient.vue'

import register from '../views/doctor/register/main.vue'

import consults from '../views/consults/main.vue'
import generalConsult from '../views/consults/general/main.vue'
import gynecologyConsult from '../views/consults/gynecology/main.vue'
import obstetricConsult from '../views/consults/obstetric/main.vue'

export const router = new Router({
    mode: 'history',
    base: `${BASE_URL}`,
    routes: [
        {
            path: '/auth',
            component: auth,
            children: [
                {
                    path: '',
                    component: logIn
                },
                {
                    path: 'forgotPwd',
                    component: () => forgotPwd
                }
            ]
        }, //patients
        {
            path: '/',
            component: patients,
            children: [
                {
                    path: '',
                    component: patientList,
                    name: 'Pacientes',
                    meta: {
                        showPatientInfo: false,
                        breadcrumb: []
                    }
                },
                {
                    path: 'newPatient',
                    component: newPatient,
                    name: 'Nuevo paciente',
                    meta: { 
                        breadcrumb: [
                            { text: 'Pacientes', to: '/' },
                            { text: 'Nuevo paciente', to: '#', active: true }
                        ]
                    }
                }
            ]
        }, //doctor
        {
            path: '/register',
            component: register,
            children: [
                {
                    path: '',
                    component: register,
                    name: store.getters.isAuthenticated ? 'Mis datos médicos' : 'Registro médico',
                    meta: {
                        breadcrumb: [],
                        typeMenu: store.getters.isAuthenticated ? 'register': 'registerWithoutAuth'
                    }
                },
            ]
        }, //consults
        {
            path: '/consults/:id',
            component: consults,
            meta: {
                menu: 'consults'
            },
            children: [
                {
                    path: '',
                    component: generalConsult,
                    name: 'Consulta general',
                    meta: {
                        breadcrumb: [
                            { text: 'Pacientes', to: '/' },
                            { text: 'Consulta general', to: '#', active: true }
                        ],
                        typeMenu: 'consult'
                    }
                },
                {
                    path: 'gynecology',
                    component: gynecologyConsult,
                    name: 'Consulta ginecologica',
                    meta: {
                        breadcrumb: [
                            { text: 'Pacientes', to: '/' },
                            { text: 'Consulta ginecologica', to: '#', active: true }
                        ],
                        typeMenu: 'consult'
                    }
                },
                {
                    path: 'obstetric',
                    component: obstetricConsult,
                    name: 'Consulta obstétrica',
                    meta: {
                        breadcrumb: [
                            { text: 'Pacientes', to: '/' },
                            { text: 'Consulta obstétrica', to: '#', active: true }
                        ],
                        typeMenu: 'consult'
                    }
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    //redirect to login page if not logged in

    const publicPages = ['/auth', '/auth/forgotPwd', '/register']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = store.getters.isAuthenticated

    if (authRequired && !loggedIn) {
        return next('/auth')
    } else if (loggedIn && to.path === '/auth') {
        console.log('frompath')
        return next(from.path)
    }

    next()
})