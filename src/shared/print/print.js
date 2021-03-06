let currentLoader = null
import edit from './components/edit.vue'
import Vue from 'vue'
import store from '@/store/store'
import api from '@/api/print-service'
import api_consult from '@/api/general-consult-service'
import model from './helper/model'
import { loader } from '@/helper/loader'
import { saved } from '@/helper/alerts'
import eventBus from '@/helper/event-bus'
import apiDoctor from '@/api/doctor-service'
import consultPrevious from '@/views/consults/general/components/consultPrevious/consult.vue'

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
            if (this.printConsult) this.getConsult()
            setTimeout(() => this.print(), 1000)
        }
    },
    props: {
        editPage: {
            required: false,
            type: Boolean,
            default: true
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
        consultPrevious
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
                    this.colony = response.body.Colony
                    this.phone = response.body.CellPhone
                }
            })
        },
        getConsult() {
            api_consult.getConsultById(this.consultPreviousId).then(response => {
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
