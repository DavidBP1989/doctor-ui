let currentLoader = null
import { loader } from '@/helper/loader'
import api from '@/api/patient-service'
import existingPatient from './components/existingPatient.vue'
import findPatientByAssoc from './components/findPatientByAssoc.vue'
import { onlyLetter } from '@/helper/utilities'
import formValidation from '@/helper/formValidation'
import $ from 'jquery'
import model from '../helper/model'
import { saved } from '@/helper/alerts'

export default {
    mounted() {
        const _vue = this
        this.$nextTick(function () {
            $('#formPatients .form-control*').on('keyup', function () {
                if (_vue.$store.getters.isPatientRegisterSend) {
                    formValidation.inputSelected = $(this)
                    if ($(this).hasClass('f-text')) formValidation.typeValidations.text()
                    else if ($(this).hasClass('f-email')) formValidation.typeValidations.email()
                }
            })
        })
    },
    created() {
        this.$store.commit('SET_PATIENT_REGISTER_POST', false)
        this.getLastPatient()
    },
    components: {
        existingPatient,
        findPatientByAssoc
    },
    data() {
        return {
            isAssoc: this.$store.state.doctor.isAssociation,
            doctorId: this.$store.state.doctor.id,
            visibleCollapse: false,
            options: [
                { value: 'F', text: 'Mujer' },
                { value: 'M', text: 'Hombre' }
            ],
            emeci: null,
            form: {
                name: '',
                lastName: '',
                mothersName: '',
                fathersName: '',
                phone: '',
                sex: 'F',
                email: '',
                birthDate: null,
                allergy: '',
                contagiousDiseases: false,
                surgeries: false,
                trauma: false,
                other: false,
                alcohol: false,
                tobacco: false,
                drugs: false,
                password: '',
                confirmPassword: '',
                externalRegister: false
            }
        }
    },
    computed: {
        txtLink() {
            return this.visibleCollapse ? 'Cerrar' : 'Agregar paciente existente'
        }
    },
    methods: {
        getLastPatient() {
            api.getLastEmeci(this.doctorId).then(response => {
                this.emeci = response.body
            })
        },
        activateCard() {
            this.$store.commit('SET_PATIENT_REGISTER_POST', true)
            if (!formValidation.check('formPatients'))
                return
            
            const req = new model(this.form)
            currentLoader = loader()
            let success = false
            api.saveNewPatient(this.doctorId, req.__$).then(response => {
                success = response.body.IsSuccess
                currentLoader.hide()
                const title = success ? 'Paciente agregado' : 'Error al guardar el paciente'
                const param = success ? `/consults/${response.body.PatientId}` : null
                saved(title, success, param)
            })
            .catch(() => {
                currentLoader.hide()
                saved('Error al guardar el paciente', false)
            })
        },
        format(evt) {
            onlyLetter(evt)
        },
        birthDateSelected() {
            if (this.$store.getters.isPatientRegisterSend) {
                formValidation.inputSelected = $('#formPatients .f-date')
                formValidation.typeValidations.date(this.form.birthDate)
            }
        }
    }
}