let currentLoader = null
import { loader } from '@/helper/loader'
import api from '@/api/patient-service'
import { onlyLetter } from '@/helper/utilities'
import formValidation from '@/helper/formValidation'
import $ from 'jquery'
import model from '../helper/model'

export default {
    mounted() {
        const _vue = this
        this.$nextTick(function () {
            $('#formPatients .form-control*').on('keyup', function () {
                if (_vue.isPatientRegisterSend) {
                    formValidation.inputSelected = $(this)
                    if ($(this).hasClass('f-text')) formValidation.typeValidations.text()
                    else if ($(this).hasClass('f-email')) formValidation.typeValidations.email()
                }
            })
        })
    },
    data() {
        return {
            isPatientRegisterSend: false,
            options: [
                { value: 'F', text: 'Mujer' },
                { value: 'M', text: 'Hombre' }
            ],
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
                password: '',
                confirmPassword: '',
            }
        }
    },
    methods: {
        format(evt) {
            onlyLetter(evt)
        },
        birthDateSelected() {
            if (this.isPatientRegisterSend) {
                formValidation.inputSelected = $('#formPatients .f-date')
                formValidation.typeValidations.date(this.form.birthDate)
            }
        },
        register() {
            this.isPatientRegisterSend = true
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
        }
    }
}