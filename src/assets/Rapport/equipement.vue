<template>
    <Base #slot1>
    <div class="relative h-8/8 overflow-y-auto">
        <div class="w-screen relative flex justify-center my-2">
            <button
                class="w-12 h-12 flex justify-center items-center bg-sky-900 rounded-xl fixed bottom-30 right-6 shadow-[1px_1px_5px_1px_rgba(0,0,0,0.5)]"
                @click="this.isModalVisible = true">
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
        <!-- <div class="">
            <p class="font-poppins text-2xl text-sky-900  font-extralight mx-3 my-4">Statistique d'infrastructure</p>
            <Infrastructure></Infrastructure>
        </div> -->
        <div class="">
            <!-- <loading v-if="this.$store.state.is_loading" />  -->
            <Equipement></Equipement>
        </div>
        <!-- <div class="">
            <p class="font-poppins text-xl text-sky-900  font-extralight mx-3 my-4">Statistique de performance</p>
            <Performance></Performance>
        </div> -->
    </div>
    <VueFinalModal v-model="isModalVisible" :click-to-close="true" class=" !w-full flex flex-col justify-end"
        transition="vfm-fade-in-up">
        <div class="w-full bg-white rounded-t-4xl shadow-lg transition-transform duration-300 ease-in-out"
            :style="{ transform: isKeyboardVisible ? `translateY(-${keyboardHeight}px)` : 'translateY(0)' }">
            <div class=" p-2 flex justify-center items-center">
                <div class="w-[13vw] h-[5px] rounded-xl bg-sky-950" @click="isModalVisible = false"></div>
            </div>
            <div class="px-2 pt-0 space-y-2">
                <div class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" @click="isModalVisible = false"
                        viewBox="0 0 24 24">
                        <path fill="none" stroke="#0c4a6e" stroke-linecap="round" stroke-width="2"
                            d="M20 20L4 4m16 0L4 20" />
                    </svg>
                    <p class="font-poppins text-3xl text-sky-900  font-extralight">Filtre</p>
                </div>
                <input type="text"
                    class="w-[100%]  rounded-lg border-2 border-[rgb(116,175,209)] focus:border-2 focus:border-sky-900 focus:outline-none py-1 px-2"
                    placeholder="Nomanclature" v-model="nomenclature">
                <!-- <input type="text"
                    class="w-[100%]  rounded-lg border-2 border-[rgb(116,175,209)] focus:border-2 focus:border-sky-900 focus:outline-none py-1 px-2"
                    placeholder="Description"> -->
                <div class="w-[100%]  flex justify-between ">
                    <div class="w-[48%] relative flex items-center">
                        <input type="date" v-model="start_date"
                            class="relative w-full rounded-lg border-2 border-[rgb(116,175,209)] focus:border-2 focus:border-sky-900 focus:outline-none py-1 "
                            placeholder="code">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="absolute right-[2px]"
                            viewBox="0 0 24 24">
                            <path fill="#014268"
                                d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                        </svg>
                    </div>
                    <div class="w-[48%] relative flex items-center">
                        <input type="date" v-model="end_date"
                            class="relative w-full rounded-lg border-2 border-[rgb(116,175,209)] focus:border-2 focus:border-sky-900 focus:outline-none py-1 "
                            placeholder="code">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="absolute right-[2px]"
                            viewBox="0 0 24 24">
                            <path fill="#014268"
                                d="M12 14q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
                        </svg>
                    </div>
                </div>
                <div class="flex gap-5 ">
                    <button
                        class="py-1.5 my-1 rounded-lg border-1 border-[#014268] m-0 font-bold text-[#014268] active:text-[#fff] active:bg-[#014268] grow basis-1">Vider</button>
                    <button
                        class="py-1.5 my-1 rounded-lg bg-[#014268] font-bold text-white grow basis-1 active:text-[#014268] active:bg-[#ffff] active:border-1 active:border-[#014268]"
                        @click="FiltrerPerformance">Recherche</button>
                </div>
            </div>
        </div>
    </VueFinalModal>
    <!-- <VueFinalModal v-model="isQRcode" :click-to-close="true" class="flex items-center justify-center">
        <div class="h-100 w-80 bg-white shadow-lg overflow-hidden flex flex-col justify-center items-center">
            <video ref="video" class="w-full h-64 object-cover" autoplay></video>
            <canvas ref="canvas" class="hidden"></canvas>
            <div v-if="decodedContent" class="mt-4 text-green-600 font-semibold">
                QR Code détecté : {{ decodedContent }}
            </div>
        </div>
    </VueFinalModal> -->

    </Base>
</template>

<script>
import Base from '../../components/Base.vue'
import Equipement from '../../components/EquipementRapport.vue'
import Infrastructure from '../../components/InfrastructureRapport.vue'
import Performance from '../../components/Performance.vue'
import { VueFinalModal } from 'vue-final-modal';
import { Keyboard } from '@capacitor/keyboard';
import loading from '../../components/loading.vue'
import axios from 'axios';

export default {
    components: {
        Base, Equipement, Infrastructure, Performance, VueFinalModal, loading
    },
    data() {
        return {
            index: 0,
            slots: ['Equipement', 'Infrastructure', 'Performance'],
            transitionDirection: 'left',
            isModalVisible: false,
            activeSlot: 'Equipement',
            isKeyboardVisible: false,
            keyboardHeight: 0,
            keyword: '',
            items: [],
            nomenclature: this.$store.state.user.default_service_id,
            start_date: '2024-03-12',
            end_date: new Date().toISOString().split('T')[0],


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
                query: { numero: this.keyword }
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
        async FiltrerPerformance() {
            this.getStatics(this.start_date, this.end_date)
            this.isModalVisible = false

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