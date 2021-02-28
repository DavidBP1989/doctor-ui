<template>
    <div>
        <b-row>
            <b-col>
                <b-form-checkbox v-model="form.hasAPartner" switch>¿Tiene pareja?</b-form-checkbox>
            </b-col>
        </b-row>
        <b-row v-if="form.hasAPartner" class="mt-3 mb-3">
            <b-col>
                <b-card no-body header="Datos de la pareja">
                    <b-card-body class="bg-gray">
                        <b-row>
                            <b-col md="8" lg="12">
                                <b-form-group label="Nombre y apellido">
                                    <b-form-input v-model="form.name" />
                                </b-form-group>
                            </b-col>
                            <b-col cols="6" sm="5" md="4">
                                <b-form-group label="Sexo">
                                    <b-input-group>
                                        <b-form-select :options="sexOptions" v-model="form.sex" />
                                        <template v-slot:prepend>
                                            <b-input-group-text>
                                                <fa-icon :icon="['fas', 'venus-mars']" size="lg" />
                                            </b-input-group-text>
                                        </template>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6" sm="4">
                                <b-form-group label="Estado civil">
                                    <b-form-select :options="maritalStatusOptions" v-model="form.maritalStatus" />
                                </b-form-group>
                            </b-col>
                            <b-col cols="6" sm="3" md="4">
                                <b-form-group label="Grupo y RH">
                                    <b-form-input v-model="form.groupRH" />
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="8" sm="9" md="4">
                                <b-form-group
                                description="Puede cambiar el mes y año en la parte superior del calendario"
                                label="Fecha de nacimiento">
                                    <b-input-group>
                                        <v-date-picker
                                        class="form-control p-0"
                                        v-model="form.birthDate"
                                        :input-props="{ readonly: true }"
                                        color="pink"
                                        :popover="{ placement: 'bottom', visibility: 'click' }">
                                        </v-date-picker>
                                        <template v-slot:prepend>
                                            <b-input-group-text>
                                                <fa-icon :icon="['fas', 'calendar-alt']" size="lg" />
                                            </b-input-group-text>
                                        </template>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4" sm="3" md="2" lg="4">
                                <b-form-group label="Edad">
                                    <b-form-input v-model="form.age" />
                                </b-form-group>
                            </b-col>
                            <b-col order-md="1" lg="8">
                                <b-form-group label="Ocupación">
                                    <b-form-input v-model="form.occupation" />
                                </b-form-group>
                            </b-col>
                            <b-col md="6" lg="4">
                                <b-form-group label="Teléfono(s)">
                                    <b-input-group>
                                        <b-form-input v-model="form.phone" />
                                        <template v-slot:prepend>
                                            <b-input-group-text>
                                                <fa-icon :icon="['fas', 'phone']" size="lg" />
                                            </b-input-group-text>
                                        </template>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    props: {
        partnerForm: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            form: this.partnerForm,
            sexOptions: [
                { text: 'Masculino', value: 'M' },
                { text: 'Femenino', value: 'F' }
            ],
            maritalStatusOptions: [
                { text: 'Casado', value: 0 },
                { text: 'Separado', value: 1 },
                { text: 'Soltero', value: 2 },
                { text: 'Union libre', value: 3 },
                { text: 'Viudo', value: 4 },
                { text: 'Divorciado', value: 5 }
            ]
        }
    }
}
</script>