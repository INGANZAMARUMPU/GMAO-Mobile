<template>
    <Base #slot1>
    <div class="relative h-8/8 overflow-y-auto">
        <div class="w-screen relative flex justify-center my-2">
            <button
                class="w-12 h-12 flex justify-center items-center bg-sky-900 rounded-xl fixed bottom-17 right-6 shadow-[1px_1px_5px_1px_rgba(0,0,0,0.5)]" @click="this.isModalVisible = true"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 7h3M3 17h6m9 0h3M15 7h6M6 7c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C7.602 4 8.068 4 9 4s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C12 5.602 12 6.068 12 7s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C10.398 10 9.932 10 9 10s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C6 8.398 6 7.932 6 7m6 10c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C13.602 14 14.068 14 15 14s1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C18 15.602 18 16.068 18 17s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C16.398 20 15.932 20 15 20s-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C12 18.398 12 17.932 12 17"
                        color="#ffffff" />
                </svg>
            </button>
        </div>
        <!-- <transition :name="`fade-slide-${transitionDirection}`" mode="out-in">
            <component :is="currentSlot" :key="currentSlot" />
        </transition> -->
        <div class="">
            <p class="font-poppins text-2xl text-sky-900  font-extralight mx-6 my-4">Statistique d'infrastructure</p>
            <Infrastructure></Infrastructure>
        </div>
        <div class="">
            <p class="font-poppins text-2xl text-sky-900  font-extralight mx-3 my-4">Statistique d'equipement</p>
            <Equipement></Equipement>
        </div>
        <div class="">
            <p class="font-poppins text-xl text-sky-900  font-extralight mx-6 my-4">Statistique de performance</p>
            <Performance></Performance>
        </div>
    </div>
    <VueFinalModal v-model="isModalVisible" :click-to-close="true" class="flex items-end vfm-fullscreen"
        transition="vfm-fade-in-up">
        <div class="bg-white rounded-t-4xl shadow-lg transition-transform duration-300 ease-in-out"
            :style="{ transform: isKeyboardVisible ? `translateY(-${keyboardHeight}px)` : 'translateY(0)' }">
            <div class=" p-2 flex justify-center items-center">
                <div class="w-[13vw] h-[5px] rounded-xl bg-sky-950" @click="isModalVisible = false"></div>
            </div>
            <div class="p-4 pt-0 space-y-4">
                <div class="flex items-center">
                    <p class="font-poppins text-3xl text-sky-900  font-extralight">Filtre</p>
                </div>
                <input type="text"
                    class="w-2/2  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                    placeholder="Nomanclature">
                <input type="text"
                    class="w-2/2  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                    placeholder="Description">
                <div class="flex space-x-7 ">
                    <input type="date"
                        class="w-1/2  rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Nomanclature">
                    <input type="date"
                        class="w-1/2 rounded-lg border-2 border-sky-900 focus:border-3 focus:border-sky-900 focus:outline-none p-2"
                        placeholder="Nomanclature">
                </div>
                <div class="flex gap-5 ">
                    <button class="py-3 rounded-lg bg-sky-950 m-0 font-bold text-white grow basis-1">Vider</button>
                    <button class="py-3 rounded-lg bg-sky-950 font-bold text-white grow basis-1">Recherche</button>
                </div>
            </div>
        </div>
    </VueFinalModal>
    <VueFinalModal v-model="isQRcode" :click-to-close="true" class="flex items-center justify-center">
        <div class="h-100 w-80 bg-white shadow-lg overflow-hidden flex flex-col justify-center items-center">
            <video ref="video" class="w-full h-64 object-cover" autoplay></video>
            <canvas ref="canvas" class="hidden"></canvas>
            <div v-if="decodedContent" class="mt-4 text-green-600 font-semibold">
                QR Code détecté : {{ decodedContent }}
            </div>
        </div>
    </VueFinalModal>

    </Base>
</template>

<script>
import Base from '../../components/Base.vue'
import Equipement from '../../components/EquipementRapport.vue'
import Infrastructure from '../../components/InfrastructureRapport.vue'
import Performance from '../../components/Performance.vue'
import { VueFinalModal } from 'vue-final-modal';
import { Keyboard } from '@capacitor/keyboard'
import axios from 'axios';

export default {
    components: {
        Base, Equipement, Infrastructure, Performance, VueFinalModal,
    },
    data() {
        return {
            index: 0,
            slots: ['Equipement', 'Infrastructure', 'Performance'],
            transitionDirection: 'left',
            isModalVisible: false,
            activeSlot: 'Equipement',
            isQRcode: false,
            isKeyboardVisible: false,
            keyboardHeight: 0,
            search_equipement: '',
            items: []

        }
    },
    computed: {
        currentSlot() {
            return this.slots[this.index]
        }
    },
    methods: {
        redirectionAvecDonnees() {
            this.$router.push({
                path: '/equipement',
                query: { numero: this.search_equipement }
            })
        },
        nextSlot() {
            this.transitionDirection = 'left'
            this.index = (this.index + 1) % this.slots.length
        },
        prevSlot() {
            this.transitionDirection = 'right'
            this.index = (this.index - 1 + this.slots.length) % this.slots.length
        },
        Getinventaire() {
            axios.get(`/oc_assets/?oc_asset_code=${this.search_equipement}`)
                .then((reponse) => {
                    this.$store.state.equipement_inventaire = reponse.data.results
                    this.$router.push({ path: '/Inventaire' })
                    console.log(this.items)
                })
            axios.get(`/oc_assetshistory/?oc_asset_code=${this.search_equipement}`)
                .then((reponse) => {
                    this.$store.state.Operation = reponse.data.results
                    console.log(this.items)
                })
            axios.get(`/oc_maintenanceplanshistory/?oc_maintenanceplan_assetuid=${this.search_equipement}`)
                .then((reponse) => {
                    this.$store.state.PlanMaintance = reponse.data.results
                    console.log(this.items)
                })
        },
        handleResize() {
            const currentHeight = window.innerHeight;
            const heightDiff = this.windowHeight - currentHeight;

            if (heightDiff > 150) {
                this.isKeyboardVisible = true;
                this.keyboardHeight = heightDiff;
            } else {
                this.isKeyboardVisible = false;
                this.keyboardHeight = 0;
            }
        },
        handleKeyboardShow(event) {
            if (event?.keyboardHeight) {
                this.keyboardHeight = event.keyboardHeight;
            }
            this.isKeyboardVisible = true;
        },
        handleKeyboardHide() {
            this.isKeyboardVisible = false;
            this.keyboardHeight = 0;
        },

    },
    watch: {
        isQRcode(newVal) {
            if (newVal) {
                this.startScanner()
            } else {
                this.stopScanner()
            }
        }
    },
    mounted() {
        this.windowHeight = window.innerHeight;
        window.addEventListener('resize', this.handleResize);
        Keyboard.addListener('keyboardWillShow', this.handleKeyboardShow);
        Keyboard.addListener('keyboardWillHide', this.handleKeyboardHide);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
        Keyboard.removeAllListeners();
    },
}
</script>

<style scoped>
.fade-slide-left-enter-active,
.fade-slide-left-leave-active,
.fade-slide-right-enter-active,
.fade-slide-right-leave-active {
    transition: all 2 ease;
    position: absolute;
    width: 100%;
}

.fade-slide-left-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.fade-slide-left-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}

.fade-slide-right-enter-from {
    opacity: 0;
    transform: translateX(-100%);
}

.fade-slide-right-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>