<template>
    <div>
        <h5 class="mt-3 mb-4">Informaci&oacute;n del m&eacute;dico</h5>
        <b-form-row>
            <b-col sm="6" lg="3">
                <b-form-group label="Nombre(s)">
                    <b-input-group>
                        <b-form-input class="f-text" @keypress="format" v-model="form.name" />
                        <template v-slot:prepend>
                            <b-input-group-text>
                                <fa-icon :icon="['fas', 'user']" size="lg" />
                            </b-input-group-text>
                        </template>
                        <div class="invalid-feedback">Este campo es requerido</div>
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" lg="3">
                <b-form-group label="Apellido(s)">
                    <b-form-input v-model="form.lastName" @keypress="format" class="f-text" />
                    <div class="invalid-feedback">Este campo es requerido</div>
                </b-form-group>
            </b-col>
            <b-col md="6" lg="3">
                <b-form-group label="RFC">
                    <b-form-input v-model="form.rfc" class="f-text" />
                    <div class="invalid-feedback">Este campo es requerido</div>
                </b-form-group>
            </b-col>
            <b-col md="6" lg="3">
                <b-form-group label="CURP">
                    <b-form-input v-model="form.curp" class="f-text" />
                    <div class="invalid-feedback">Este campo es requerido</div>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="6" lg="3">
                <b-form-group label="No. Cédula profesional SEP">
                    <b-form-input v-model="form.sepCertificate" class="f-text" />
                    <div class="invalid-feedback">Este campo es requerido</div>
                </b-form-group>
            </b-col>
            <b-col cols="6" lg="2">
                <b-form-group label="No. S.S.A.">
                    <b-form-input v-model="form.ssa" class="f-text" />
                    <div class="invalid-feedback">Este campo es requerido</div>
                </b-form-group>
            </b-col>
            <b-col sm="6" lg="4">
                <b-form-group label="Consejo Méxicano de Certificación">
                    <b-form-input v-model="form.cmcp" />
                </b-form-group>
            </b-col>
            <b-col md="6" lg="3">
                <b-form-group label="Especialidad médica">
                    <b-form-select
                    class="form-control f-select"
                    @change="changeMedicalSpeciality" 
                    :options="medicalSpecialties" v-model="form.medicalSpeciality" />
                    <div class="invalid-feedback">Este campo es requerido</div>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col sm="6" lg="3">
                <b-form-group label="Subespecialidad médica">
                    <b-form-select :options="submedicalSpecialties" v-model="form.submedicalSpeciality" />
                </b-form-group>
            </b-col>
            <b-col sm="6" lg="3">
                <b-form-group label="Hospital de residencia">
                    <b-form-input v-model="form.hospital" />
                </b-form-group>
            </b-col>
            <b-col sm="6" lg="3">
                <b-form-group label="Universidad que avala">
                    <b-form-input v-model="form.university" />
                </b-form-group>
            </b-col>
            <b-col sm="6" lg="3">
                <b-form-group label="Cédula de especialidad SEP">
                    <b-form-input v-model="form.certificate" class="f-text" />
                    <div class="invalid-feedback">Este campo es requerido</div>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col sm="6" md="6">
                <b-form-group label="Nombre de Agrupación Médica Nacional">
                    <b-form-input v-model="form.school" />
                </b-form-group>
            </b-col>
            <b-col sm="6">
                <b-form-group label="Nombre de Agrupación Médica Estatal">
                    <b-form-input v-model="form.grouping" />
                </b-form-group>
            </b-col>
        </b-form-row>
    </div>
</template>

<script>
import { onlyLetter } from '@/helper/utilities'
import api from '@/api/doctor-service'
import eventBus from '@/helper/event-bus'

export default {
    props: {
        form: {
            type: Object,
            required: true
        }
    },
    created() {
        this.getMedicalSpecialties()
        eventBus.$on('setSubmedicalSpecialties', v => this.getSubmedicalSpecialties(v))
    },
    data() {
        return {
            medicalSpecialties: [],
            submedicalSpecialties: []
        }
    },
    methods: {
        format(evt) {
            onlyLetter(evt)
        },
        getMedicalSpecialties() {
            this.medicalSpecialties.push({
                text: '-- seleccione --',
                value: '0'
            })

            api.getMedicalSpecialties().then(response => {
                if (response.body) {
                    response.body.forEach(element => {
                        this.medicalSpecialties.push({
                            text: element.Name,
                            value: element.Id
                        })
                    })
                }
            })
        },
        getSubmedicalSpecialties(id) {
            this.submedicalSpecialties = []

            api.getSubmedicalSpecialties(id).then(response => {
                if (response.body && response.body.length > 0) {
                    this.submedicalSpecialties.push({
                        text: '-- seleccione --',
                        value: '0'
                    })

                    response.body.forEach(element => {
                        this.submedicalSpecialties.push({
                            text: element.Name,
                            value: element.Id
                        })
                    })
                }
            })
        },
        changeMedicalSpeciality() {
            this.form.submedicalSpeciality = '0'
            this.getSubmedicalSpecialties(this.form.medicalSpeciality)
        }
    }
}
</script>