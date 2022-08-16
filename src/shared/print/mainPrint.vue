<template>
    <div>
        <header>
            <div class="row mt-5 mb-2 ml-3 mr-3">
                <div class="col-md-3">
                    <img :src="logo" alt="" />
                </div>
                <div class="col-md-9 text-right">
                    <h4>{{ doctorName }}</h4>
                    <span>{{ medicalSpeciality }}</span><br />
                    <span>{{ subMedicalSpeciality }}</span>
                </div>
                <div class="col-md-12 mt-5">
                    <div class="row">
                        <div class="col-md-6">
                            <p class="mb-2"><b>{{ hospital }}</b></p>
                            <p class="mb-2"><b>{{ university }}</b></p>
                            <p>CED. PROF. <b>{{ sep }}</b></p>
                        </div>
                        <div class="col-md-6 text-right">
                            <p class="mb-2">REG SEP <b>{{ certificate }}</b></p>
                            <p class="mb-2"><b>S.S.A. {{ ssa }}</b></p>
                            <p>Recertificaci&oacute;n. <b>{{ cmcp }}</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div class="maincontent">
            <hr class="mb-0 mt-0">
            <div class="row mt-4 ml-3 mr-3">
                <div class="col-md-12">
                    <div class="d-flex">
                        <div>
                            <em>Nombre del paciente: <br /><b>{{ patientName }}</b></em>
                        </div>
                        <div class="ml-auto">
                            <em>Fecha de consulta: <br /><b>{{ now }}</b></em>
                        </div>
                    </div>
                    <div class="mt-5">
                        <!--contenido-->
                        <div v-html="content"></div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div class="row mt-5 mb-5 ml-3 mr-3 plist">
                <div class="col-md-6">
                    <p>{{ email }}</p>
                    <p>Tel. {{ phone }}</p>
                </div>
                <div class="col-md-6 text-right">
                    <p></p>
                    <p>{{ colony }}</p>
                    <p>{{ city }}, {{ state }}</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import store from '@/store/store'

export default {
    beforeCreate() {
        document.body.className = 'print_body'
    },
    created() {
        window.addEventListener('afterprint', this.onafterprint)
    },
    mounted() {
        window.print()
    },
    data() {
        return {
            doctorId: store.state.doctor.id,
            patientName: store.state.patient.name,
            now: this.$route.params.date,
            logo: store.state.printConfig.logo.url,
            phone: store.state.doctor.phone,
            colony: store.state.doctor.colony,
            email: store.state.doctor.email,
            city: store.state.doctor.city,
            state: store.state.doctor.state,
            medicalSpeciality: store.state.doctor.medicalSpeciality,
            subMedicalSpeciality: null,
            hospital: store.state.doctor.hospital,
            university: store.state.doctor.university,
            sep: store.state.doctor.sep,
            certificate: store.state.doctor.certificate,
            ssa: store.state.doctor.ssa,
            cmcp: store.state.doctor.cmcp
        }
    },
    computed: {
        doctorName() {
            return `Dr. ${store.state.doctor.name}`
        },
        content() {
            return store.state.printConfig.html
        }
    },
    methods: {
        onafterprint() {
            window.close()
        }
    }
}
</script>

<style>
    @media print {
        .maincontent {
            height: 100%;
            letter-spacing: 2px;
        }

        footer {
            position: absolute;
            bottom: 0;
            width:100%
        }

        html, body {
            font-size: 16px;
            height: 100%
        }

        img {
            width: 40%;
        }

        .plist p {
            margin-bottom: .2rem !important;
            font-size: 20px;
        }

        /* consulta anterior */
        .list-group-item {
            padding: 0.45rem 1rem 0 0 !important;
            border: none !important;
        }
    }
</style>