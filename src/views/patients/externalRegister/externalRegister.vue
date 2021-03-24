<template>
    <b-row class="justify-content-lg-center mb-4">
        <b-col lg="8">
            <b-form id="formPatients" class="mt-5">
                <h5>M&eacute;dico</h5>
                <b-form-row>
                    <b-col md="6">
                        <b-form-group label="Seleccionar médico">
                            <b-input-group>
                                <b-form-select
                                v-model="doctor"
                                :options="doctors" />
                                <template v-slot:prepend>
                                    <b-input-group-text>
                                        <fa-icon :icon="['fas', 'user-md']" size="lg" />
                                    </b-input-group-text>
                                </template>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-alert class="text-center"
                :show="doctor === null && isPatientRegisterSend"
                variant="danger">
                    Debe seleccinar un m&eacute;dico
                </b-alert>
                <h5 class="mt-5">Informaci&oacute;n del paciente</h5>
                <b-form-row >
                    <b-col md="6">
                        <b-form-group label="Nombre(s)">
                            <b-input-group>
                                <b-form-input v-model="form.name" @keypress="format" class="f-text" />
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
                </b-form-row>
                <b-form-row>
                    <b-col md="6">
                        <b-form-group label="Nombre completo de la madre">
                            <b-form-input v-model="form.mothersName" @keypress="format" class="f-text" />
                            <div class="invalid-feedback">Este campo es requerido</div>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Nombre completo del padre">
                            <b-form-input v-model="form.fathersName" @keypress="format" class="f-text" />
                            <div class="invalid-feedback">Este campo es requerido</div>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col md="6">
                        <b-form-group label="Teléfono">
                            <b-input-group>
                                <b-form-input v-model="form.phone" class="f-text" />
                                <template v-slot:prepend>
                                    <b-input-group-text>
                                        <fa-icon :icon="['fas', 'phone']" size="lg" />
                                    </b-input-group-text>
                                </template>
                                <div class="invalid-feedback">Este campo es requerido</div>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Sexo">
                            <b-input-group>
                                <b-form-select
                                v-model="form.sex"
                                :options="options"></b-form-select>
                                <template v-slot:prepend>
                                    <b-input-group-text>
                                        <fa-icon :icon="['fas', 'venus-mars']" size="lg" />
                                    </b-input-group-text>
                                </template>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col md="6">
                        <b-form-group
                        description="Separar por coma más de una dirección de correo electrónico"
                        label="Correo electrónico">
                            <b-input-group>
                                <b-form-input v-model="form.email" class="f-email" />
                                <template v-slot:prepend>
                                    <b-input-group-text>
                                        <fa-icon :icon="['fas', 'at']" size="lg" />
                                    </b-input-group-text>
                                </template>
                                <div class="invalid-feedback">Este campo es requerido</div>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                        description="Puede cambiar el mes y año en la parte superior del calendario"
                        label="Fecha de nacimiento">
                            <b-input-group>
                                <v-date-picker
                                class="form-control p-0 f-date"
                                v-model="form.birthDate"
                                :input="birthDateSelected()"
                                :input-props="{ readonly: true }"
                                color="pink"
                                :popover="{ placement: 'bottom', visibility: 'click' }">
                                </v-date-picker>
                                <template v-slot:prepend>
                                    <b-input-group-text>
                                        <fa-icon :icon="['fas', 'calendar-alt']" size="lg" />
                                    </b-input-group-text>
                                </template>
                                <div class="invalid-feedback">Este campo es requerido</div>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <b-form-group label="Alergia(s)">
                            <b-form-input v-model="form.allergy" class="f-text" />
                            <div class="invalid-feedback">Este campo es requerido</div>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col md="6">
                        <b-form-group label="Contraseña">
                            <b-input-group>
                                <b-form-input
                                type="password"
                                class="f-text"
                                v-model="form.password" />
                                <template v-slot:prepend>
                                    <b-input-group-text>
                                        <fa-icon :icon="['fas', 'key']" size="lg" />
                                    </b-input-group-text>
                                </template>
                                <div class="invalid-feedback">Este campo es requerido</div>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Confirmar contraseña">
                            <b-input-group>
                                <b-form-input
                                type="password"
                                class="f-text"
                                v-model="form.confirmPassword" />
                                <template v-slot:prepend>
                                    <b-input-group-text>
                                        <fa-icon :icon="['fas', 'key']" size="lg" />
                                    </b-input-group-text>
                                </template>
                                <div class="invalid-feedback">Este campo es requerido</div>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-alert variant="danger" :show="showErrorPassword">
                    Las contrase&ntilde;as no coinciden
                </b-alert>
                <b-form-row class="mt-2 mb-2">
                    <b-col class="text-right">
                        <b-button
                        @click="register"
                        variant="success">Registrar paciente</b-button>
                    </b-col>
                </b-form-row>
            </b-form>
        </b-col>
    </b-row>
</template>

<script src='./externalRegister.js'></script>