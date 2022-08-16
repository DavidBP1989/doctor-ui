<template>
    <div class="main">
        <main-header />
        <b-container class="mb-5 mt-5">
            <b-row class="align-items-end">
                <b-col cols="2">
                    <b-img thumbnail fluid style="max-width:100%; height:170px" class="img" id="imgLogo" src="" />
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Cambiar logo">
                        <b-form-file accept="image/*" @change="previewFiles" v-model="logo" />
                    </b-form-group>
                </b-col>
                <b-col class="text-right">
                    <b-button @click="save" class="mb-3" variant="success">Guardar cambios</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
let currentLoader = null
import { loader } from '@/helper/loader'
import api from '@/api/print-service'
import model from './helper/model'
import { saved } from '@/helper/alerts'

export default {
    components: {
        'main-header': () => import('../header/header.vue')
    },
    created() {
        this.getPrintConfiguration()
    },
    data() {
        return {
            doctorId: this.$store.state.doctor.id,
            logo: null
        }
    },
    methods: {
        getPrintConfiguration() {
            api.getConfiguration(this.doctorId).then(response => {
                this.$store.dispatch('setDefaultPrintConfig', response.body)
                this.setLogo()
            })
        },
        previewFiles(evt) {
            const file = evt.target.files

            if (FileReader && file && file.length) {

                var fr = new FileReader()
                fr.onload = () => {
                    this.$store.commit('SET_LOGOTITLE_PRINTCONFIG', file[0].name)
                    this.$store.commit('SET_LOGOBASE64_PRINTCONFIG', fr.result.split('base64,')[1])
                    this.setLogo(fr.result)
                }

                fr.readAsDataURL(file[0])
            }
        },
        setLogo(base64 = null) {
            document.getElementById('imgLogo').src = base64 || this.$store.getters.getPrintConfigLogoUrl
        },
        save() {
            const req = new model()
            currentLoader = loader()

            const errorText = 'Error al guardar la configuración de la impresión'
            api.saveConfiguration(this.doctorId, req.__$).then(response => {
                let success = response.body.IsSuccess
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
</script>