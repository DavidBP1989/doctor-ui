<template>
    <div>
        <b-form @submit="onSubmit" autocomplete="off">
            <p class="brand-wrapper mb-3">Recordar contrase&ntilde;a</p>
            <b-form-group class="mb-4">
                <b-form-input v-model="email" placeholder="Correo electrónico" />
            </b-form-group>
            <b-button type="submit" class="w-100 mb-4 main-button">Recordar</b-button>
        </b-form>
        <b-alert :show="showError" variant="danger">
            Correo electrónico incorrecto
        </b-alert>
        <b-alert :show="showSuccess" variant="success">
            Se ha enviado la contrase&ntilde;a a su correo electr&oacute;nico
        </b-alert>
        <fa-icon :icon="['fas', 'chevron-left']" size="sm" class="align-middle"/>
        <b-button variant="link" class="pl-1" @click="$router.go(-1)">Volver a inicio de sesi&oacute;n</b-button>
    </div>
</template>

<script>
import api from '@/api/doctor-service'

export default {
    data() {
        return {
            email: '',
            showSuccess: false,
            showError: false
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()

            if (this.email !== '') {
                const email = encodeURI(this.email)
                console.log(email)
                api.forgotPwd(email).then(response => {
                    if (response.body.IsSuccess) {
                        this.showError = false
                        this.showSuccess = true
                        this.email = ''
                    } else this.onError()
                }).catch(() => this.onError())
            }
        },
        onError() {
            this.showSuccess = false
            this.showError = true
        }
    }
}
</script>