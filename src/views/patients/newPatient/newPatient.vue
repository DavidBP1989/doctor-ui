<template>
    <div class="mt-4">
        <b-row class="justify-content-lg-center mb-4">
            <b-col lg="8">
                <b-row>
                    <b-col v-if="!visibleCollapse" md="6">
                        <p class="mb-0">N&uacute;mero de tarjeta EMECI</p>
                        <h5>{{ emeci }}</h5>
                    </b-col>
                    <b-col class="text-md-right">
                        <b-button variant="link" class="pl-0" v-b-toggle.collapse-1>{{ txtLink }}</b-button>
                        <fa-icon :icon="['fas', visibleCollapse ? 'caret-up' : 'caret-down']" size="lg"/>
                    </b-col>
                </b-row>
                <b-collapse class="mt-4 mb-4" id="collapse-1" v-model="visibleCollapse">
                    <b-card class="shadow rounded">
                        <existing-patient v-if="!isAssoc" />
                        <find-patient-by-assoc v-else />
                    </b-card>
                </b-collapse>
                <b-form id="formPatients" :class="!visibleCollapse ? 'mt-4' : ''">
                    <b-form-row>
                        <b-col md="6">
                            <b-form-group label="Nombre(s)">
                                <b-input-group>
                                    <b-form-input v-model="form.name" @keypress="format" :disabled="visibleCollapse" class="f-text" />
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
                                <b-form-input v-model="form.lastName" @keypress="format" :disabled="visibleCollapse" class="f-text" />
                                <div class="invalid-feedback">Este campo es requerido</div>
                            </b-form-group>
                        </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col md="6">
                            <b-form-group label="Nombre completo de la madre">
                                <b-form-input v-model="form.mothersName" @keypress="format" :disabled="visibleCollapse" class="f-text" />
                                <div class="invalid-feedback">Este campo es requerido</div>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group label="Nombre completo del padre">
                                <b-form-input v-model="form.fathersName" @keypress="format" :disabled="visibleCollapse" class="f-text" />
                                <div class="invalid-feedback">Este campo es requerido</div>
                            </b-form-group>
                        </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col md="6">
                            <b-form-group label="Teléfono">
                                <b-input-group>
                                    <b-form-input v-model="form.phone" :disabled="visibleCollapse" class="f-text" />
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
                                    :disabled="visibleCollapse"
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
                                    <b-form-input v-model="form.email" :disabled="visibleCollapse" class="f-email" />
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
                                    :input-props="{ disabled: visibleCollapse, readonly: true }"
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
                                <b-form-input v-model="form.allergy" :disabled="visibleCollapse" class="f-text" />
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
                                    v-model="form.password"
                                    :disabled="visibleCollapse" />
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
                                    v-model="form.confirmPassword"
                                    :disabled="visibleCollapse" />
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
                    <b-form-row class="mt-2 mb-2">
                        <b-col class="text-right">
                            <b-button
                            @click="activateCard"
                            :disabled="visibleCollapse"
                            variant="success">Activar tarjeta</b-button>
                        </b-col>
                    </b-form-row>
                </b-form>
            </b-col>
        </b-row>
    </div>
</template>

<script src="./newPatient.js"></script>