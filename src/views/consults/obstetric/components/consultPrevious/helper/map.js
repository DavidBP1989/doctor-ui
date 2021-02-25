function getParturitionType(type) {
    let txt = ''
    switch(type) {
        case 0:
            txt = 'Eutócico'
            break
        case 1:
            txt = 'Distocico'
            break
    }
    return txt
}

function getDistociaType(type) {
    let txt = ''
    switch(type) {
        case 0:
            txt = 'Cesárea'
            break
        case 1:
            txt = 'Fórceps'
            break
        case 2:
            txt = 'Otro'
            break
    }
    return txt
}

function getDistociaReason(type) {
    let txt = ''
    switch(type) {
        case 0:
            txt = 'Sufrimiento fetal agudo'
            break
        case 1:
            txt = 'Postura anómala'
            break
        case 2:
            txt = 'Prematurez'
            break
        case 3:
            txt = 'Otro'
            break
    }
    return txt
}

export default {
    getParturitionType,
    getDistociaType,
    getDistociaReason
}