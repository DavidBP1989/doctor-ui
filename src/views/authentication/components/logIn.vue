<template>
    <div>
        <p class="brand-wrapper mb-3">Iniciar sesi&oacute;n en su cuenta</p>
        <p class="error" v-if="error">Correo electrónico o contrase&ntilde;a incorrecta</p>

        <b-form id="form-login" @submit="onSubmit" autocomplete="off">
            <b-form-group class="mb-3">
                <b-form-input v-model="user" class="f-email" placeholder="Correo electrónico" />
            </b-form-group>
            <b-form-group class="mb-4">
                <b-form-input v-model="password" type="password" class="f-text" placeholder="***********" />
            </b-form-group>
            <b-button type="submit" class="w-100 mb-4 main-button">Iniciar sesi&oacute;n</b-button>
        </b-form>
        <router-link to="/auth/forgotPwd">¿Se te olvido tu contrase&ntilde;a?</router-link>
        <p class="footer">
            <span class="n-link">¿No tienes una cuenta?.</span>
            <router-link to="/register">Registrarse como m&eacute;dico</router-link>
        </p>
        <b-nav class="mt-5">
            <b-nav-item target="_blank" href="https://www.emeci.com/ConsultaMedico/uso.pdf">T&eacute;rminos de uso</b-nav-item>
            <b-nav-item target="_blank" href="https://www.emeci.com/wsite/home/NoticeOfPrivacy">Aviso de privacidad</b-nav-item>
        </b-nav>
    </div>
</template>

<script>
let currentLoader = null
import { loader } from '@/helper/loader'
import api from '@/api/authentication-service'
import formValidation from '@/helper/formValidation'
import $ from 'jquery'

export default {
    mounted() {
        this.$nextTick(function () {
            $('.form-control*').on('keyup', function () {
                if ($(this).hasClass('f-email')) {
                    formValidation.inputSelected = $(this)
                    formValidation.typeValidations.email()
                }
            })
        })
    },
    data() {
        return {
            user: '',
            password: '',
            error: false
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()

            if (formValidation.check('form-login', false)) {
                currentLoader = loader(true)

                api.getToken({ username: this.user, password: this.password }).then(response => {
                    this.error = false
                    this.$store.dispatch('getDoctorInformation', this.$store.state.doctor.id)
                    currentLoader.hide()
                    this.$router.push('/')
                })
                .catch(e => {
                    currentLoader.hide()
                    this.error = true
                })
            }
        }
    }
}
</script>