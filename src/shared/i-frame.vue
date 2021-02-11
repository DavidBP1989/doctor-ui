<template>
    
</template>

<script>
import Vue from 'vue'

export default {
    render(h) {
        return h('iframe', {
            on: {
                load: this.renderChildren()
            }
        })
    },
    beforeUpdate() {
        this.iApp.children = Object.freeze(this.$slots.default)
    },
    methods: {
        renderChildren() {
            const children = this.$slots.default
            const body = this.$el.contentDocument.body
            const el = document.createElement('div')

            body.appendChild(el)

            const iApp = new Vue({
                name: 'iApp',
                data: {
                    children: Object.freeze(children)
                },
                render(h) {
                    return h('div', this.children)
                }
            })

            iApp.$mount(el)

            this.iApp = iApp
        }
    }
}
</script>