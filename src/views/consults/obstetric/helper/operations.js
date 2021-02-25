import Vue from 'vue'

function calculeGestationWeek(firstDayMenstruation) {
    if (firstDayMenstruation !== null) {
        firstDayMenstruation = Vue.moment(firstDayMenstruation).add(15, 'days')
        const diffDays = Vue.moment(new Date()).diff(firstDayMenstruation, 'days')

        if (diffDays > 0) {
            const weeks = Math.floor(diffDays / 7)
            const days = diffDays % 7
            let s = ''
            if (weeks > 0 && days > 0) s = `${weeks} semana(s) / ${days} día(s)`
            else if (weeks > 0 && days <= 0) s = `${weeks} semana(s)`
            else if (weeks <= 0 && days > 0) s = `${days} día(s)`

            return s
        }
    }
    return null
}

function estimatedDueDate(firstDayMenstruation) {
    if (firstDayMenstruation !== null) {
        firstDayMenstruation = Vue.moment(firstDayMenstruation).add(9, 'months')
        firstDayMenstruation = Vue.moment(firstDayMenstruation).add(7, 'days')

        return Vue.moment(firstDayMenstruation).format('D MMMM YYYY')
    }
    return null
}

function calculeMothersWeight(weight, pregnancyWeight) {
    if (!isNaN(weight) && !isNaN(pregnancyWeight)) {
        const _weight = parseFloat(weight)
        let productWeight = parseFloat(pregnancyWeight)
        if (_weight > 0 && productWeight > 0) {
            productWeight = productWeight / 1000
            return (_weight + productWeight).toFixed(2)
        }
    }
    return null
}

export default {
    calculeGestationWeek,
    estimatedDueDate,
    calculeMothersWeight
}