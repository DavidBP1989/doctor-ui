<template>
    <div>
        <header>
            <div class="row mt-5 mb-5 ml-3 mr-3">
                <div class="col-md-3">
                    <img src="https://emeci.com/images/logo-emeci.png" alt="" />
                </div>
                <div class="col-md-9 text-right">
                    <h4>{{ doctorName }}</h4>
                </div>
            </div>
        </header>
        <div class="maincontent">
            <div class="row mt-5 ml-3 mr-3">
                <div class="col-md-12">
                    <div class="d-flex">
                        <div>
                            <em>Nombre del paciente: <b>{{ patientName }}</b></em>
                        </div>
                        <div class="ml-auto">
                            <em>Fecha de consulta: <b>{{ now }}</b></em>
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
            <div class="row mt-5 mb-5 ml-3 mr-3">
                <div class="col-md-6">
                    <p>{{ email }}</p>
                    <p>Tel. {{ phone }}</p>
                    <p>www.emeci.com</p>
                </div>
                <div class="col-md-6 text-right">
                    <p></p>
                    <p>{{ colony }}</p>
                    <p></p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import Vue from 'vue'
import store from '@/store/store'
import apiDoctor from '@/api/doctor-service'

export default {
    beforeCreate() {
        document.body.className = 'print_body'
    },
    created() {
        window.addEventListener('afterprint', this.onafterprint)
        this.init()
    },
    mounted() {
        window.print()
    },
    data() {
        return {
            doctorId: store.state.doctor.id,
            patientName: store.state.patient.name,
            now: Vue.moment(new Date()).format('DD MMMM YYYY'),
            phone: null,
            colony: null,
            email: null
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
        },
        init() {
            apiDoctor.getRegister(this.doctorId).then(response => {
                this.phone = response.body.OfficePhone
                this.colony = response.body.OfficeAddress,
                this.email = response.body.Email
            })
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
            font-size: 19px;
            height: 100%
        }

        img {
            width: 80%;
        }

        p {
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