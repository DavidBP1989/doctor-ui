<template>
    <div class="edit-print">
        <b-row class="align-items-end">
            <b-col cols="6" md="3" lg="4">
                <b-form-group label="Cambiar logo">
                    <b-form-file accept="image/*" @change="previewFiles" v-model="logo" />
                </b-form-group>
            </b-col>
            <b-col cols="6" md="4" class="d-flex justify-content-end">
                <b-form-group label="Cambiar color letra">
                    <b-form-input type="color" v-model="textColor" />
                </b-form-group>
            </b-col>
            <b-col md="5" lg="4" class="text-left text-md-right">
                <span>Cambiar color de fondo</span>
                <div class="d-flex justify-content-start justify-content-md-end">
                    <b-form-group label="Color principal">
                        <b-form-input type="color" v-model="bgPrimaryColor" />
                    </b-form-group>
                    <b-form-group class="ml-4" label="Color secundario">
                        <b-form-input type="color" v-model="bgSecondaryColor" />
                    </b-form-group>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import eventBus from '@/helper/event-bus'

export default {
    data() {
        return {
            logo: null
        }
    },
    computed: {
        textColor: {
            get() { return this.$store.state.printConfig.textColor },
            set(value) { 
                this.$store.commit('SET_TEXTCOLOR_PRINTCONFIG', value)
                eventBus.$emit('setColors')
            }
        },
        bgPrimaryColor: {
            get() { return this.$store.state.printConfig.bgPrimaryColor },
            set(value) { 
                this.$store.commit('SET_BGPRIMARYCOLOR_PRINTCONFIG', value)
                eventBus.$emit('setColors')
            }
        },
        bgSecondaryColor: {
            get() { return this.$store.state.printConfig.bgSecondaryColor },
            set(value) { 
                this.$store.commit('SET_BGSECONDARYCOLOR_PRINTCONFIG', value)
                eventBus.$emit('setColors')
            }
        }
    },
    methods: {
        previewFiles(evt) {
            const file = evt.target.files
            
            if (FileReader && file && file.length) {
                
                var fr = new FileReader()
                fr.onload = () => {
                    this.$store.commit('SET_LOGOTITLE_PRINTCONFIG', file[0].name)
                    this.$store.commit('SET_LOGOBASE64_PRINTCONFIG', fr.result.split('base64,')[1])
                    eventBus.$emit('setLogo', fr.result)
                }

                fr.readAsDataURL(file[0])
            }
        }
    }
}
</script>