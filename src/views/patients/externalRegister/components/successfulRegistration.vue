<template>
    <b-row class="justify-content-center">
        <b-col class="text-center">
            <span>
                <fa-icon style="color:green" :icon="['fas', 'check']" class="fa-10x"  />
            </span>
            <h1 class="display-3">¡Registro exitoso!</h1>
            <h1 class="display-2">Bienvenido a EMECI</h1>
            <h6 class="mt-4">
                Ahora disfruta los beneficios de tu propio expediente
            </h6>
        </b-col>
        <b-col class="text-center mt-5" md="12">
            <b-button @click="$router.go(-1)" variant="info">Volver al registro de paciente</b-button>
        </b-col>
    </b-row>
</template>