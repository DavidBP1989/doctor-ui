<template>
    <div>
        <h5 class="mt-3 mb-4">Domicilio particular</h5>
        <b-form-row>
            <b-col md="6" lg="4">
                <b-form-group label="Estado">
                    <vue-bootstrap-typeahead
                    v-model="stateSelected"
                    :data="autocompleteStates"
                    class="ec"
                    @hit="hitState"
                    ref="stateTypeahead"
                    placeholder="Escoge un estado">
                        <template slot="prepend">
                            <b-input-group-text>
                                <fa-icon :icon="['fa', 'search']" size="lg" />
                            </b-input-group-text>
                        </template>
                        <div class="invalid-feedback">Este campo es requerido</div>
                    </vue-bootstrap-typeahead>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Ciudad">
                    <vue-bootstrap-typeahead
                    v-model="citySelected"
                    :data="autocompleteCities"
                    class="ec"
                    @hit="hitCity"
                    ref="cityTypeahead"
                    placeholder="Escoge una ciudad">
                        <template slot="prepend">
                            <b-input-group-text>
                                <fa-icon :icon="['fa', 'search']" size="lg" />
                            </b-input-group-text>
                        </template>
                    </vue-bootstrap-typeahead>
                    <div class="invalid-feedback">Este campo es requerido</div>
                </b-form-group>
            </b-col>
            <b-col md="12" lg="4">
                <b-form-group label="Colonia">
                    <b-form-input v-model="form.colony" />
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="8" lg="6">
                <b-form-group label="Calles">
                    <b-form-input v-model="form.address" />
                </b-form-group>
            </b-col>
            <b-col md="4" lg="3">
                <b-form-group label="Código postal">
                    <b-form-input v-model="form.cp" @keypress="numberFormat" class="f-text" />
                    <div class="invalid-feedback">Este campo es requerido</div>
                </b-form-group>
            </b-col>
            <b-col md="6" lg="3">
                <b-form-group label="Teléfono de consultorio">
                    <b-input-group>
                        <b-form-input v-model="form.officePhone" @keypress="numberFormat" class="f-text" />
                        <template v-slot:prepend>
                            <b-input-group-text>
                                <fa-icon :icon="['fas', 'phone']" size="lg" />
                            </b-input-group-text>
                        </template>
                        <div class="invalid-feedback">Este campo es requerido</div>
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col md="6" lg="12">
                <b-form-group label="Domicilio del consultorio">
                    <b-input-group>
                        <b-form-input v-model="form.officeAddress" />
                        <template v-slot:prepend>
                            <b-input-group-text>
                                <fa-icon :icon="['fas', 'address-book']" size="lg" />
                            </b-input-group-text>
                        </template>
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-form-row>
    </div>
</template>

<script src="./homeAddress.js"></script>