<template>
    <b-card no-body :header="`Grupo de ${getTextType}s guardados`">
        <b-list-group flush>
            <b-list-group-item
            class="d-flex justify-content-between list-saved-data"
            button
            v-for="(x, index) in listOfSavedValues"
            :key="index"
            :class="(index % 2) == 0 ? 'bg-gray-list-group-item' : ''"
            :disabled="x.disabled"
            @click="add(x.id)">
                <span class="text-left">
                    {{ x.name }}
                    <br>
                    <b-button variant="link" class="p-0" @click.stop="seeListOf(index)">{{ `Ver ${getTextType}` }}</b-button>
                </span>
                <span class="delete" @click.stop="deleteItem(x.id)">Eliminar</span>
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<script>
import eventBus from '@/helper/event-bus'
import reqResources from '../../../helper/reqResources'

export default {
    props: ['isDiagnostic_andNot_treatment', 'savedValues', 'newValues'],
    data() {
        return {
            listOfSavedValues: this.savedValues,
            listOfNewValues: this.newValues
        }
    },
    computed: {
        getTextType() {
            return this.isDiagnostic_andNot_treatment ? 'diagnóstico' : 'tratamiento'
        }
    },
    methods: {
        add(id) {
            const index = this.listOfSavedValues.findIndex(x => x.id === id)
            this.listOfSavedValues[index].list.forEach(x => {
                this.listOfNewValues.push({
                    id: this.getLastId(),
                    idSavedData: id,
                    text: x,
                    edit: false,
                    exclusive: false
                })
            })
            this.listOfSavedValues[index].disabled = true
            eventBus.$emit('changeViewToNewValues')
        },
        getLastId() {
            let count = 1
            if (this.listOfNewValues.length > 0) {
                count = this.listOfNewValues[this.listOfNewValues.length - 1].id + 1
            }
            return count
        },
        deleteItem(id) {
            this.$bvModal.msgBoxConfirm('¿Estas seguro que deseas eliminarlo?', {
                okTitle: 'Eliminar',
                cancelTitle: 'Cancelar',
                centered: true,
                id: 'modal-delete'
            })
            .then(value => {
                if (value) {
                    if (this.isDiagnostic_andNot_treatment)
                        reqResources.deleteDiagnosticById(id).then(response => this.confirmDelete(response, id))
                    else reqResources.deleteTreatmentById(id).then(response => this.confirmDelete(response, id))
                }
            })
        },
        confirmDelete(status, id) {
            if (status === 200) {
                const index = this.listOfSavedValues.findIndex(x => x.id === id)
                this.listOfSavedValues.splice(index, 1)
            }
            else {
                this.$bvModal.msgBoxOk('No se puedo eliminar', {
                    title: 'Error',
                    centered: true,
                    id: 'modal-delete-error'
                })
            }
        },
        seeListOf(index) {
            const item = this.listOfSavedValues[index]

            const h = this.$createElement
            let list = []
            item.list.forEach(x => {
                list.push(
                    h('b-list-group-item', x)
                )
            })
            const message = h('b-list-group', list)

            this.$bvModal.msgBoxOk([message], {
                centered: true,
                title: item.name,
                okTitle: 'Cerrar',
                id: 'modal-list'
            })
        }
    }
}
</script>

<style scoped src="../../../styles/savedValues.scss"></style>