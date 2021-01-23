<template>
    <div>
        <h5 class="mt-3 mb-4">Informaci&oacute;n del m&eacute;dico</h5>
        <b-form-row>
            <b-col md="6" lg="3">
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
            <b-col>
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
            <b-col>
                <b-form-group label="CURP">
                    <b-form-input v-model="form.curp" class="f-text" />
                    <div class="invalid-feedback">Este campo es requerido</div>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="6" lg="4">
                <b-form-group label="No. Cédula profesional SEP">
                    <b-form-input v-model="form.sepCertificate" class="f-text" />
                    <div class="invalid-feedback">Este campo es requerido</div>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="No. S.S.A.">
                    <b-form-input v-model="form.ssa" class="f-text" />
                    <div class="invalid-feedback">Este campo es requerido</div>
                </b-form-group>
            </b-col>
            <b-col md="12" lg="4">
                <b-form-group label="CMCP">
                    <b-form-input v-model="form.cmcp" />
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="6" lg="4">
                <b-form-group label="Hospital de residencia">
                    <b-form-input v-model="form.hospital" />
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Universidad que avala">
                    <b-form-input v-model="form.university" />
                </b-form-group>
            </b-col>
            <b-col md="12" lg="4">
                <b-form-group label="Cédula de especialidad SEP">
                    <b-form-input v-model="form.certificate" class="f-text" />
                    <div class="invalid-feedback">Este campo es requerido</div>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="6">
                <b-form-group label="Nombre del colegio estatal">
                    <b-form-input v-model="form.school" />
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Nombre de agrupación estatal">
                    <b-form-input v-model="form.grouping" />
                </b-form-group>
            </b-col>
        </b-form-row>
    </div>
</template>

<script>
import { onlyLetter } from '@/helper/utilities'
export default {
    props: {
        form: {
            type: Object,
            required: true
        }
    },
    methods: {
        format(evt) {
            onlyLetter(evt)
        }
    }
}
</script>