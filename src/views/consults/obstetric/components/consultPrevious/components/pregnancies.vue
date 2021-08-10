<template>
    <b-row class="align-items-center">
        <b-col cols="12"
        :sm="consult.EctopicPregnancies ? 12 : 6"
        :md="mdEctopicPregnancies"
        :lg="lgEctopicPregnancies">
            <b-form-group label="Embarazos ectópicos">
                <span>{{ consult.EctopicPregnancies ? 'Si' : 'No' }}</span>
            </b-form-group>
            <b-row v-if="consult.EctopicPregnancies">
                <b-col>
                    <b-form-group label="Especificación">
                        <span>{{ consult.SpecifyEctopicPregnancies }}</span>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="12" order-sm="1" order-md="0"
        :md="mdPreviousPregnacyComplications"
        :lg="lgPreviousPregnacyComplications">
            <b-form-group label="Complicaciones de embarazo previo">
                <span>{{ consult.PreviousPregnacyComplications ? 'Si' : 'No' }}</span>
            </b-form-group>
            <b-row v-if="consult.PreviousPregnacyComplications">
                <b-col>
                    <b-form-group label="Especificación">
                        <span>{{ consult.SpecifyPreviousPregnacyComplications }}</span>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="12" :sm="consult.PerinatalComplications ? 12 : 6" :md="mdPerinatalComplications">
            <b-form-group label="Complicaciones perinatales">
                <span>{{ consult.PerinatalComplications ? 'Si' : 'No' }}</span>
            </b-form-group>
            <b-row v-if="consult.PerinatalComplications">
                <b-col>
                    <b-form-group label="Especificación">
                        <span>{{ consult.SpecifyPerinatalComplications }}</span>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="12" order-sm="0" :md="mdAbnormalPregnancies">
            <b-form-group label="Embarazos anormales: Mola H, Anembriónicos, etc.">
                <span>{{ consult.AbnormalPregnancies ? 'Si' : 'No' }}</span>
            </b-form-group>
            <b-row v-if="consult.AbnormalPregnancies">
                <b-col>
                    <b-form-group label="Especificación">
                        <span>{{ consult.SpecifyAbnormalPregnancies }}</span>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
export default {
    props: ['consult'],
    computed: {
        mdEctopicPregnancies() {
            return this.consult.EctopicPregnancies
            ? 12 :
            (!this.consult.EctopicPregnancies && !this.consult.PreviousPregnacyComplications)
            ? 6 : 12

        },
        lgEctopicPregnancies() {
            return (this.consult.EctopicPregnancies && !this.consult.PreviousPregnacyComplications)
            ? 12 :
            ((this.consult.EctopicPregnancies && this.consult.PreviousPregnacyComplications) || (!this.consult.EctopicPregnancies && !this.consult.PreviousPregnacyComplications))
            ? 6 : 12
        },
        mdPreviousPregnacyComplications() {
            return this.PreviousPregnacyComplications
            ? 12 :
            (!this.consult.EctopicPregnancies && !this.consult.PreviousPregnacyComplications)
            ? 6 :
            (!this.consult.PreviousPregnacyComplications && !this.consult.PerinatalComplications)
            ? 6 : 12
        },
        lgPreviousPregnacyComplications() {
            return (this.consult.PreviousPregnacyComplications && !this.consult.EctopicPregnancies) ?
            12 : ((this.consult.PreviousPregnacyComplications && this.consult.EctopicPregnancies) || (!this.consult.PreviousPregnacyComplications && !this.consult.EctopicPregnancies)) ?
            6 : (!this.consult.PreviousPregnacyComplications && !this.consult.PerinatalComplications) ?
            6 : 12
        },
        mdPerinatalComplications() {
            return this.consult.PerinatalComplications
            ? 12 : 6
        },
        mdAbnormalPregnancies() {
            return this.consult.AbnormalPregnancies
            ? 12 :
            (!this.consult.AbnormalPregnancies && !this.consult.PerinatalComplications)
            ? 6 : 12
        }
    }
}
</script>