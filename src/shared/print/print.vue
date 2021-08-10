<template>
    <div class="main">
        <main-header v-if="editPage" />
        <b-container class="mb-5 mt-5">
            <div id="print-content">
                
                <edit v-if="editPage" />

                <div class="pageprint">
                    <div class="header-print">
                        <div id="header-print" class="header__bg"></div>
                        <div class="container-fluid mt-5 ml-md-5" id="print-container">
                            <div class="row">
                                <div class="col-md-3 text-center text-md-left">
                                    <img fluid style="max-width:100%; height:170px" class="img" id="imgLogo" src="" />
                                </div>
                                <div class="col-md-9">
                                    <h3>{{ doctorName }}</h3>
                                    <p>
                                        <!--Especialidad: <b>Medicina familiar y pediatriía</b><br>-->
                                        <b>{{ university }}</b><br>
                                        C&eacute;dula Profesional <b>{{ professionalCertificate }}</b>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container mt-5">
                        <div class="d-flex">
                            <span>Nombrel del paciente:<br> <b class="h5">{{ patientName }}</b></span>
                            <span class="ml-auto">Fecha de consulta: <br> <b>{{ now }}</b></span>
                        </div>
                        <b-row v-if="editPage" class="mt-4">
                            <b-col>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </b-col>
                        </b-row>
                        <b-row v-if="!printConsult" class="mt-5">
                            <b-col>
                                <p v-for="(a,index) in arrayToPrint" :key="index">
                                    <b>{{ a.name }}</b><br />
                                    <span v-for="s in a.studies" :key="s.id">- {{ s.name }} <br /></span>
                                </p>
                            </b-col>
                        </b-row>
                        
                        <general-consult
                        class="mt-5"
                        v-if="printingType == 'general-consult'"
                        :consult="consult" />

                        <gynecology-consult
                        v-if="printingType == 'gynecology-consult'" 
                        class="mt-5"
                        :consult="consult" />

                        <obstetric-consult
                        v-if="printingType == 'obstetric-consult'" 
                        class="mt-5"
                        :consult="consult" />

                        <b-row class="mt-5 mb-5">
                            <b-col cols="6" offset="3" class="text-center firma">
                                <div>
                                    <hr class="bg-dark">
                                    <strong>Firma</strong>
                                </div>
                            </b-col>
                        </b-row>
                    </div>

                    <footer>
                        <hr class="h5" id="hhr" />
                        <div class="d-flex">
                            <span>
                                <b>Domicilio del consultorio:</b>
                                <br> {{ address }}
                            </span>
                            <span class="ml-auto">
                                <b>Tel&eacute;fono del consultorio:</b>
                                <br />{{ phone }}
                            </span>
                        </div>
                    </footer>
                </div>
            </div>
            <b-row class="mt-3">
                <b-col class="text-right">
                    <b-button @click="saveConfiguration" variant="success">Guardar cambios</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script src="./print.js"></script>
<style scoped src="../../scss/print.css"></style>