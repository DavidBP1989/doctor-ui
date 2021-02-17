<template>
    <div class="main">
        <main-header />
        <b-container class="mt-4">
            <b-sidebar
            title="Paciente"
            id="sidebar-info-patient"
            v-model="sidebar"
            backdrop
            shadow
            backdrop-variant="dark">
                <pacient-info />
            </b-sidebar>

            <b-row class="align-items-end">
                <b-col class="mb-2" md="6">
                    <p class="mb-1 title-patient">
                        <strong>Paciente: </strong>{{ $store.state.patient.name }}
                    </p>
                    <b-button variant="link" class="pl-0" v-b-toggle.sidebar-info-patient>Ver datos del paciente</b-button>
                </b-col>
                <b-col class="text-md-right mt-2 mb-2">
                    <b-form-group v-if="showConsultType" class="mb-2" label="Cambiar tipo de consulta">
                        <b-form-select v-model="consultType" @change="changeRoute" :options="options" />
                    </b-form-group>
                </b-col>
            </b-row>
            <router-view class="mt-1 card-consult" />
        </b-container>
    </div>
</template>

<script>
import api from '@/api/patient-service'
import header from '@/shared/header/header.vue'
import pacientInfo from './shared/pacientInfo.vue'

export default {
    beforeCreate() {
        document.body.className = 'main_body'
    },
    created() {
        this.getPatient()
        const path = this.$route.path
        this.consultType = path.split('/')[path.split('/').length - 1]
    },
    components: {
        'main-header': header,
        pacientInfo
    },
    data() {
        return {
            sidebar: false,
            patientId: this.$route.params.id,
            options: [
                { value: 'gynecology', text: 'Ginecología' },
                { value: 'obstetric', text: 'Obstétrica' },
                { value: '', text: 'General' }
                
            ],
            consultType: 'gynecology'
        }
    },
    computed: {
        showConsultType() {
            const years = Math.trunc(this.$store.state.patient.ageInMonths / 12)
            return (years >= 12 && this.$store.state.patient.sex === 'F')
        }
    },
    methods: {
        getPatient() {
            api.getById(this.patientId).then(response => {
                this.$store.commit('SET_PATIENT_INFORMATION', response.body)
            })
        },
        changeRoute(value) {
            this.$router.push({ path: `/consults/${this.patientId}/${value}` })
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            /**
             * si agregaron un nuevo paciente
             * abrir la informacion del paciente al iniciar
             * la consulta
             */
            if (from.path === '/newPatient') {
                vm.sidebar = true
            }
        })
    }
}
</script>