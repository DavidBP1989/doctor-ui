let currentLoader = null
import edit from './components/edit.vue'
import Vue from 'vue'
import store from '@/store/store'
import api from '@/api/print-service'
import apiGeneralConsult from '@/api/general-consult-service'
import apiGinecologyConsult from '@/api/gynecology-consult-service'
import apiObstetricConsult from '@/api/obstetric-consult-service'
import model from './helper/model'
import { loader } from '@/helper/loader'
import { saved } from '@/helper/alerts'
import eventBus from '@/helper/event-bus'
import apiDoctor from '@/api/doctor-service'

import generalConsult from '@/views/consults/general/components/consultPrevious/consult.vue'
import gynecologyConsult from '@/views/consults/gynecology/components/consultPrevious/consult.vue'
import obstetricConsult from '@/views/consults/obstetric/components/consultPrevious/consult.vue'

export default {
    mounted() {
        this.initEdit()
    },
    beforeCreate() {
        document.body.className = 'main_body'
    },
    created() {
        eventBus.$on('setColors', () => this.setColors())
        eventBus.$on('setLogo', (base64) => this.setLogo(base64))
        if (!this.editPage) {
            if (this.printConsult) {
                switch (this.printingType) {
                    case 'general-consult': this.getGeneralConsult(); break;
                    case 'gynecology-consult': this.getGinecologyConsult(); break;
                    case 'obstetric-consult': this.getObstetricConsult(); break;
                }
            }

            setTimeout(() => this.print(), 1000)
        }
    },
    props: {
        editPage: {
            required: false,
            type: Boolean,
            default: true
        },
        printingType: {
            required: false,
            type: String
        },
        printConsult: {
            type: Boolean,
            required: false,
            default: false
        },
        consultPreviousId: {
            type: Number,
            required: false
        },
        arrayToPrint: {
            required: false,
            type: Array
        }
    },
    components: {      
        edit,
        'main-header': () => import('../header/header.vue'),
        generalConsult,
        gynecologyConsult,
        obstetricConsult
    },
    data() {
        return {
            doctorId: store.state.doctor.id,
            now: Vue.moment(new Date()).format('DD MMMM YYYY'),
            patientName: store.state.patient.name,
            professionalCertificate: null,
            address: null,
            colony: null,
            university: null,
            phone: null,
            consult: null
        }
    },
    computed: {
        doctorName() {
            return `Dr. ${store.state.doctor.name}`
        }
    },
    methods: {
        initEdit() {
            api.getConfiguration(this.doctorId).then(response => {
                store.dispatch('setDefaultPrintColors', response.body)
                this.setColors()
                this.setLogo()
            })

            apiDoctor.getRegister(this.doctorId).then(response => {
                if (response.body) {
                    this.professionalCertificate = response.body.NoSEP_ProfessionalCertificate
                    this.university = response.body.UniversitySpecialty
                    this.address = response.body.Address
                    this.colony = response.body.OfficeAddress
                    this.phone = response.body.OfficePhone
                }
            })
        },
        getGeneralConsult() {
            apiGeneralConsult.getConsultById(this.consultPreviousId).then(response => {
                this.consult = response.body
            })
        },
        getGinecologyConsult() {
            apiGinecologyConsult.getConsultById(this.consultPreviousId).then(response => {
                this.consult = response.body
            })
        },
        getObstetricConsult() {
            apiObstetricConsult.getConsultById(this.consultPreviousId).then(response => {
                this.consult = response.body
            })
        },
        print() {
            this.setColors()
            this.$htmlToPaper('print-content', null, () => {
                Vue.swal.close()
            })
        },
        setColors() {
            document.getElementById('header-print').style.backgroundImage =
            `linear-gradient(${store.getters.getPrintConfigBgPrimaryColor},${store.getters.getPrintConfigBgSecondaryColor})`

            document.getElementById('print-container').style.color = store.getters.getPrintConfigTextColor

            document.getElementById('hhr').style.color = store.getters.getPrintConfigBgPrimaryColor
            document.getElementById('hhr').style.backgroundColor = store.getters.getPrintConfigBgPrimaryColor
        },
        setLogo(base64 = null) {
            document.getElementById('imgLogo').src = base64 || store.getters.getPrintConfigLogoUrl
        },
        saveConfiguration() {
            const req = new model()
            currentLoader = loader()

            let success = false
            const errorText = 'Error al guardar la configuración de la impresión'
            api.saveConfiguration(this.doctorId, req.__$).then((response) => {
                success = response.body.IsSuccess
                currentLoader.hide()
                const title = success ? 'Configuración de impresión guardada' : errorText
                saved(title, success)
            })
            .catch(_error => {
                currentLoader.hide()
                saved(errorText, false)
            })
        }
    }
}
