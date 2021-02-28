<template>
    <div>
        <hr>
        <h5>Control de embarazo</h5>
        <b-row class="mt-3">
            <b-col cols="6" lg="3">
                <b-form-group label="Semanas de gestación">
                    <span>{{ getGestationWeek }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" lg="3">
                <b-form-group label="Fecha probable de parto">
                    <span>{{ getEstimateDueDate }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="3" lg="2">
                <b-form-group label="F.U. (CM)">
                    <span>{{ consult.PregnancyControl.FU }}</span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="F.C.F.">
                    <span>{{ consult.PregnancyControl.FCF }}</span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="C.C.">
                    <span>{{ consult.PregnancyControl.CC }}</span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="C.A.">
                    <span>{{ consult.PregnancyControl.CA }}</span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="L.F.">
                    <span>{{ consult.PregnancyControl.LF }}</span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="D.B.P.">
                    <span>{{ consult.PregnancyControl.DBP }}</span>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="Posición">
                    <span>{{ consult.PregnancyControl.Position }}</span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Presentación">
                    <span>{{ consult.PregnancyControl.Presentation }}</span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Situación">
                    <span>{{ consult.PregnancyControl.Situtation }}</span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Actitud">
                    <span>{{ consult.PregnancyControl.Attitude }}</span>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6" md="4" lg="3">
                <b-form-group label="Movimientos fetales">
                    <span>{{ consult.PregnancyControl.FetalMovements }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="4" lg="3">
                <b-form-group label="Peso aproximado producto">
                    <span>{{ consult.PregnancyControl.ApproximateProductWeight }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="4" lg="3">
                <b-form-group label="Peso de la madre">
                    <span>{{  }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="3">
                <b-form-group label="T/A">
                    <span>{{ consult.PregnancyControl.TA }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="3">
                <b-form-group label="F.C.M.">
                    <span>{{ consult.PregnancyControl.FCM }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3">
                <b-form-group label="Edema">
                    <span>{{ consult.PregnancyControl.Edema }}</span>
                </b-form-group>
            </b-col>
            <b-col cols="6" md="3">
                <b-form-group label="Se hizo us">
                    <span>{{ consult.PregnancyControl.MadeUf }}</span>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="Reporte de ultrazonido realizado">
                    <span>{{ consult.PregnancyControl.Ultrasound }}</span>
                </b-form-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import operations from '../../../helper/operations'

export default {
    props: ['consult'],
    computed: {
        getGestationWeek() {
            return operations.calculeGestationWeek(this.consult.FirstDayOfLastMenstruation)
        },
        getEstimateDueDate() {
            return operations.estimatedDueDate(this.consult.FirstDayOfLastMenstruation)
        }
    }
}
</script>