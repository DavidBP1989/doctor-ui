<template>
    <div>
        <h5 class="mt-3 mb-4">Contacto</h5>
        <b-form-row>
            <b-col md="6" lg="4">
                <b-form-group label="Teléfono">
                    <b-input-group>
                        <b-form-input v-model="form.phone" @keypress="numberFormat" class="f-text" />
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
                <b-form-group label="Celular">
                    <b-input-group>
                        <b-form-input v-model="form.cellphone" @keypress="numberFormat" class="f-text" />
                        <template v-slot:prepend>
                            <b-input-group-text>
                                <fa-icon :icon="['fas', 'phone']" size="lg" />
                            </b-input-group-text>
                        </template>
                        <div class="invalid-feedback">Este campo es requerido</div>
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col md="12" lg="4">
                <b-form-group label="Correo(s) electrónico(s)" description="Separar por coma más de una dirección de correo electrónico">
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
        </b-form-row>
    </div>
</template>

<script>
import { onlyNumber } from '@/helper/utilities'

export default {
    props: {
        form: {
            type: Object,
            required: true
        }
    },
    methods: {
        numberFormat(evt) {
            onlyNumber(evt)
        }
    }
}
</script>