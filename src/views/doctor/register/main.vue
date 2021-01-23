<template>
    <b-row :class="isAuthenticated ? 'mb-2' : ''">
        <b-col v-if="!isAuthenticated" md="3" class="contact-us">
            <b-row>
                <b-col md="12" cols="3" class="img-content">
                    <img :src="emailImage" />
                </b-col>
                <b-col>
                    <h3 class="mb-3">Contactanos</h3>
                    <h6>
                        Cualquier duda o aclaraci&oacute;n no dude en enviar correo a 
                        <a href="mailto:soporte@emeci.com">soporte@emeci.com</a>
                    </h6>
                    <div>
                        <fa-icon :icon="['fas', 'chevron-left']" size="sm" class="align-middle"/>
                        <b-button variant="link" class="pl-1" @click="$router.push('/auth')">Volver a inicio de sesi&oacute;n</b-button>
                    </div>
                </b-col>
            </b-row>
        </b-col>
        <b-col>
            <b-card :class="isAuthenticated ? 'no-border' : ''" class="register">
                <b-form id="form_doctorregister" @submit="onSubmit" autocomplete="off">
                    <doctor-information :form="form.doctorInformation" />
                    <home-address :form="form.homeAddress" />
                    <contact :form="form.contact" />

                    <b-form-group class="text-right mb-3 mt-2" v-if="!isAuthenticated">
                        <b-form-checkbox v-model="checkPolitics" class="politics">
                            Acepta las <a target="_blank" href="https://www.emeci.com/ConsultaMedico/uso.pdf">politicas de uso de EMECI</a> y haber leido
                            nuestras <a target="_blank" href="https://www.emeci.com/wsite/home/NoticeOfPrivacy">politicas de privacidad.</a>
                        </b-form-checkbox>
                    </b-form-group>
                    
                    <b-button type="submit" class="float-right" variant="success">{{ textButton }}</b-button>
                </b-form>
            </b-card>
        </b-col>
    </b-row>
</template>

<script src="./main.js"></script>
<style scoped src="./style/custom.scss"></style>