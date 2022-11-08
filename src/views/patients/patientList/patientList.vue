<template>
    <div>
        <b-card no-body class="mt-4 mb-3 no-border">
            <b-row class="align-items-center">
                <b-col md="6" lg="4" order="2" order-md="1">
                    <b-form-group description="Búsqueda por nombre | EMECI" label="Buscar paciente">
                        <b-input-group>
                            <b-form-input debounce="500" v-model="filter" />
                            <template v-slot:prepend>
                                <b-input-group-text>
                                    <fa-icon :icon="['fas', 'search']" size="lg" />
                                </b-input-group-text>
                            </template>
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col order="1">
                    <b-button variant="success" @click="goToNewPatient" class="font-weight-bold float-right">
                        Agregar paciente
                    </b-button>
                </b-col>
            </b-row>
        </b-card>

        <b-table
        hover
        striped
        :fields="fields"
        :items="provider"
        :per-page="itemsPerPage"
        :current-page="currentPage"
        :filter="filter"
        :busy.sync="isBusy">
            <template v-slot:cell(fullname)="data">
                <router-link :to="to(data.item.AgeInMonths, data.item.Sex, data.item.Id)">
                    {{ data.item.Name }} {{ data.item.LastName }}
                </router-link>
            </template>
            <template v-slot:table-busy>
                <div class="text-center p-3">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Cargando...</strong>
                </div>
            </template>
        </b-table>

        <b-row class="mt-4 mb-2 align-items-center">
            <b-col md="6" class="mb-2">
                <span>Mostrando del {{ currentPage }} al {{ totalPages }} de {{ totalRow }} pacientes</span>
            </b-col>
            <b-col>
                <b-pagination class="float-md-right"
                :total-rows="totalRow"
                :per-page="itemsPerPage"
                v-model="currentPage" />
            </b-col>
        </b-row>
    </div>
</template>

<script src="./patientList.js"></script>