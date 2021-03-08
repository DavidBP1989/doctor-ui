import $ from 'jquery'

function userFormat(evt, onceDash = false) {
    const value = $(evt.path[0]).val()
    let charCode = (evt.which) ? evt.which : evt.keyCode

    // 0 - 9 or dash
    if (onceDash && charCode === 45) // solo se puede agregar una vez el guion
        return evt.preventDefault()
    if ((charCode > 47 && charCode < 58) || charCode == 45)
        return true
    else evt.preventDefault()
}

function onlyNumber(evt, point = false) {
    let charCode = (evt.which) ? evt.which : evt.keyCode
    if (point && charCode === 46)
        return true
    if (charCode > 47 && charCode < 58)
        return true
    else evt.preventDefault()
}

function emeciNumber(val) {
    if (/^[0-9]{5}$/.test(val)) {
        val += '-'
    }
    else if (/^[0-9]{5}-[0-9]{4}$/.test(val)) {
        val += '-'
    }
    return val
}

function onlyLetter(evt) {
    const regex = new RegExp('^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$')
    const key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode)
    if (!regex.test(key)) {
        evt.preventDefault()
    } else return true
}

const urlFileEmeci = 'https://www.emeci.com/PacienteExpediente/AccesEmeci.aspx'

export {
    userFormat,
    onlyNumber,
    emeciNumber,
    onlyLetter,
    urlFileEmeci
}