import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    base: `${BASE_URL}`,
    routes: [
        {
            path: '/print',
            component: () => import(/** */ '../shared/print/printv2.vue'),
            name: 'Editar hoja de impresión',
            meta: {
                typeMenu: 'print'
            }  
        },
        {
            path: '/mainPrint/:date',
            component: () => import(/** */ '../shared/print/mainPrint.vue'),
            name: 'imprimir',
            meta: {
                typeMenu: 'print'
            }
        },
        {
            path: '/auth',
            component: () => import(/** */ '../views/authentication/main.vue'),
            children: [
                {
                    path: '',
                    component: () => import(/** */ '../views/authentication/components/logIn.vue')
                },
                {
                    path: 'forgotPwd',
                    component: () => import(/** */ '../views/authentication/components/rememberPassword.vue')
                }
            ]
        }, //patients
        {
            path: '/',
            component: () => import(/** */ '../views/patients/main.vue'),
            children: [
                {
                    path: '',
                    component: () => import(/** */ '../views/patients/patientList/patientList.vue'),
                    name: 'Pacientes',
                    meta: {
                        showPatientInfo: false,
                        breadcrumb: []
                    }
                },
                {
                    path: 'newPatient',
                    component: () => import(/** */ '../views/patients/newPatient/newPatient.vue'),
                    name: 'Nuevo paciente',
                    meta: { 
                        breadcrumb: [
                            { text: 'Pacientes', to: '/' },
                            { text: 'Nuevo paciente', to: '#', active: true }
                        ]
                    }
                },
                {
                    path: 'newPatientAssoc',
                    component: () => import(/** */ '../views/patients/newPatientAssociation/newPatient.vue'),
                    name: 'Nuevo paciente',
                    meta: { 
                        breadcrumb: [
                            { text: 'Pacientes', to: '/' },
                            { text: 'Nuevo paciente', to: '#', active: true }
                        ]
                    }
                },
                {
                    path: 'externalRegister/:id',
                    component: () => import(/** */ '../views/patients/externalRegister/externalRegister.vue'),
                    name: 'Registro de paciente'
                },
                {
                    path: 'successfulRegistration',
                    component: () => import(/** */ '../views/patients/externalRegister/components/successfulRegistration.vue')
                }
            ]
        }, //doctor
        {
            path: '/register',
            component: () => import(/**  */ '../views/doctor/main.vue'),
            children: [
                {
                    path: '',
                    component: () => import(/** */ '../views/doctor/register/main.vue'),
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
            component: () => import(/** */ '../views/consults/main.vue'),
            meta: {
                menu: 'consults'
            },
            children: [
                {
                    path: '',
                    component: () => import(/** */ '../views/consults/general/main.vue'),
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
                    component: () => import(/** */ '../views/consults/gynecology/main.vue'),
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
                    component: () => import(/** */ '../views/consults/obstetric/main.vue'),
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
    let authRequired = !publicPages.includes(to.path)
    if (authRequired) {
        if (to.path.includes('externalRegister') || to.path.includes('successfulRegistration'))
            authRequired = false
    }
    const loggedIn = store.getters.isAuthenticated

    if (authRequired && !loggedIn) {
        return next('/auth')
    } else if (loggedIn && to.path === '/auth') {
        return next(from.path)
    }

    next()
})