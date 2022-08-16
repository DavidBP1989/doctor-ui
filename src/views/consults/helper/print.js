import store from '@/store/store'
import { router } from '@/router/router'
import Vue from 'vue'

function printLaboratoryCabinet(toPrint) {

    console.log(toPrint)
    let html = '<div>'
    toPrint.forEach(x => {
        html += '<div>'
        html += '<b>' + x.name + '</b>'
        html += '<br />'
        x.studies.forEach(n => {
            html += '<p class="plist">' + n.name + '</p>'
        })
        html += '</div>'
    })
    html += '</div>'

    store.commit('SET_HTML_PRINTCONFIG', html)
    let routeData = router.resolve({ name: 'imprimir', params: { date: Vue.moment(new Date()).format('dddd DD [de] MMMM [de] YYYY') } })
    window.open(routeData.href, '_blank')
}

export default {
    printLaboratoryCabinet
}