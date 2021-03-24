let currentLoader = null
import { loader } from '@/helper/loader'
import api from '@/api/patient-service'
import api_doctor from '@/api/doctor-service'
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
                if (_vue.isPatientRegisterSend) {
                    formValidation.inputSelected = $(this)
                    if ($(this).hasClass('f-text')) formValidation.typeValidations.text()
                    else if ($(this).hasClass('f-email')) formValidation.typeValidations.email()
                }
            })
        })
    },
    created() {
        this.getListOfDoctors()
    },
    data() {
        return {
            associationId: this.$route.params.id,
            isPatientRegisterSend: false,
            doctor: null,
            doctors: [],
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
            },
            showErrorPassword: false
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
        getListOfDoctors() {
            api_doctor.getListOfDoctorByAssociation(this.associationId).then((response) => {
                if (response.body) {
                    let array = [{
                        value: null,
                        text: '-- Seleccionar --'
                    }]
                    response.body.forEach(element => {
                        array.push({
                            value: element.DoctorId,
                            text: element.Name
                        })
                    })
                    this.doctors = array
                }
            })
        },
        register() {
            this.isPatientRegisterSend = true
            if (!formValidation.check('formPatients'))
                return
            if (this.doctor === null)
                return
            if (this.form.password !== this.form.confirmPassword) {
                this.showErrorPassword = true
                return
            }

            const req = new model(this.form)
            currentLoader = loader()
            api.saveNewPatientFromExternalRegister(this.doctor, req.__$).then(response => {
                currentLoader.hide()
                if (response.body.IsSuccess)
                    this.$router.push('/successfulRegistration')
                else this.error()     
            })
            .catch(() => {
                currentLoader.hide()
                this.error()
            })
        },
        error() {
            saved('Error al guardar el paciente', false)
        }
    }
}