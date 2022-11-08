<template>
    <div class="mt-4">
        <b-row class="justify-content-lg-center mb-4">
            <b-col lg="8">
                <b-row class="align-items-center">
                    <b-col md="9">
                        <b-form-group class="mb-0" description="Búsqueda por nombre | EMECI" label="Buscar paciente">
                            <b-input-group>
                                <b-form-input debounce="500" v-model="paciente" />
                                <template v-slot:prepend>
                                    <b-input-group-text>
                                        <fa-icon :icon="['fas', 'search']" size="lg" />
                                    </b-input-group-text>
                                </template>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-button variant="info" @click="findPatient" class="font-weight-bold mt-2">
                            Buscar
                        </b-button>
                    </b-col>
                </b-row>

                <b-table></b-table>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                paciente: ''
            }
        },
        methods: {
            findPatient() {
                
            }
        }
    }
</script>