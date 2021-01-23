<template>
    <b-container class="text-left">
        <b-form @submit="onSubmit" autocomplete="off">
            <b-row>
                <b-col md="6">
                    <b-form-group label="Contraseña actual">
                        <b-form-input v-model="currentPwd" type="password" placeholder="Contraseña" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6">
                    <b-form-group label="Nueva contraseña">
                        <b-form-input v-model="newPwd" type="password" placeholder="Contraseña" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Confirmar contraseña">
                        <b-form-input v-model="confirmNewPwd" type="password" placeholder="Contraseña" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row v-if="error !== ''">
                <b-col>
                    <b-alert :show="true" variant="danger">
                        {{ error }}
                    </b-alert>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="text-right">
                    <b-button variant="success" type="submit">Cambiar contraseña</b-button>
                </b-col>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
let currentLoader = null
import { loader } from '@/helper/loader'
import Vue from 'vue'
import { saved } from '@/helper/alerts'
import store from '../store/store'
import api from '@/api/doctor-service'

export default {
    data() {
        return {
            doctorId: store.state.doctor.id,
            currentPwd: '',
            newPwd: '',
            confirmNewPwd: '',
            error: ''
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()

            this.valid()
            if (this.error === '') {
                currentLoader = loader()
                const req = {
                    CurrentPassword: this.currentPwd,
                    NewPassword: this.newPwd
                }

                api.changePwd(this.doctorId, req).then(response => {
                    if (response.body.Error === '') {
                        currentLoader.hide()
                        Vue.swal.close()
                        store.dispatch('logout')
                        saved('Contraseña actualizada', true, '/auth')
                    } else {
                        this.error = response.body.Error
                        currentLoader.hide()
                    }
                }).catch(_error => {
                    this.error = _error
                    currentLoader.hide()
                })
            }
        },
        valid() {
            this.error = ''
            if (!this.currentPwd || !this.newPwd || !this.confirmNewPwd) {
                this.error = 'Todos los campos son necesarios'
                return
            }

            if (this.newPwd !== this.confirmNewPwd) {
                this.error = 'La nueva contraseña no coincide'
                return
            }
        }
    }
}
</script>