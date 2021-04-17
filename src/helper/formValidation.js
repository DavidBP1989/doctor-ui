import $ from 'jquery'
const regEmail = /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?)+$/

const validate = {
    inputSelected: null,
    check: function (formId) {
        let success = true
        let firstInputWithError = null
        const elements = $(`#${formId}`).find('.form-control')
        elements.each((index) => {
            validate.inputSelected = $(elements[index])
            
            var inputStatus = true
            if (validate.inputSelected.hasClass('f-text'))
                inputStatus = validate.typeValidations.text()
            if (validate.inputSelected.hasClass('f-email'))
                inputStatus = validate.typeValidations.email()
            if (validate.inputSelected.hasClass('f-date'))
                inputStatus = validate.typeValidations.date()

            if (firstInputWithError == null && !inputStatus)
            {
                firstInputWithError = 'hacer scroll al row que contiene el primer input con error'
                validate.scrollToErrorInput()
            }
            
            success = (success && inputStatus)
        })

        //validar politicas
        validate.inputSelected = $('.politics :input')
        if (validate.inputSelected.length > 0 && !validate.inputSelected.prop('checked')) {
            success = false
            validate.statusClass.error()
        } else validate.statusClass.success()

        window.post = true
        return success
    },
    typeValidations: {
        date(v) {
            const value = validate.inputSelected.find('input').val()
            return (value !== '' || v !== null) ? validate.statusClass.success() : validate.statusClass.error()
        },
        text() {
            return validate.inputSelected.val() != '' ? validate.statusClass.success() : validate.statusClass.error()
        },
        email() {
            return regEmail.test(validate.inputSelected.val()) ? validate.statusClass.success() : validate.statusClass.error()
        }
    },
    statusClass: {
        success() {
            validate.inputSelected.removeClass('is-invalid')
            validate.inputSelected.addClass('is-valid')
            return true
        },
        error() {
            validate.inputSelected.removeClass('is-valid')
            validate.inputSelected.addClass('is-invalid')
            return false
        }
    },
    scrollToErrorInput() {
        $('html, body').animate({ scrollTop: this.inputSelected.closest('.form-row').offset().top }, 700)
    }
}

export default validate